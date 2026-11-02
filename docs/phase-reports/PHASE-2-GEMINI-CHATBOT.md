# ShutterWise AI — Phase 2 Report: Gemini AI Chatbot Integration & Production Readiness

**Project:** ShutterWise AI  
**Phase:** Phase 2 — Gemini AI Chatbot Integration  
**Date:** 2026-11-02  
**Status:** Completed & Production Ready (Vercel Compatible)  
**Author:** Senior Software Architect & Technical Lead  

---

## 1. Executive Summary

Phase 2 integrates Google Gemini AI into ShutterWise AI as an interactive photography learning mentor ("Explain the *Why*, not just the *What*"). 

During post-integration testing, a local request timeout (`GATEWAY_TIMEOUT: Gemini API request timed out` at 25.4s) was diagnosed and permanently resolved. The root causes were an overly strict 25-second client timeout coupled with heavy server-side queueing on experimental candidate models. Through empirical benchmarking of Google's active model endpoints, `gemini-3.5-flash-lite` was selected and verified as the optimal model (responding in ~2.3s–3.9s within Google's free tier). The timeout architecture was centralized at 55 seconds, conservative retry logic was implemented for transient errors, Vercel Hobby serverless configuration (`runtime = "nodejs"`, `maxDuration = 60`) was exported, and frontend retry deduplication was established.

---

## 2. Requirements and Scope

- **R1: Zero-Cost & Free-Tier Verification:** Identify and verify a candidate Gemini model that officially supports the Gemini Developer API free tier ($0 / ₹0 cost).
- **R2: Secure API Key Isolation:** Ensure `GEMINI_API_KEY` remains exclusively server-side. Never expose via client JavaScript; enforce `.gitignore` rules on `.env.local`; provide `.env.example` with blank placeholders.
- **R3: Server-Side Route Handler:** Build `src/app/api/chat/route.ts` with JSON validation, 500-character input caps, 10 KB payload caps, history windowing (max 6 messages), client system-role rejection, and structured JSON responses.
- **R4: Photography System Instruction:** Implement `PHOTOGRAPHY_MENTOR_SYSTEM_INSTRUCTION` teaching camera settings (Aperture, Shutter Speed, ISO, Exposure Triangle, Depth of Field, Lighting) with trade-offs, baseline caveats, a 6-part troubleshooting framework, and prompt-injection safeguards.
- **R5: Connected Frontend Interface:** Connect `src/app/chat/page.tsx` with real API dispatch, message display, loading indicators, error handling with 1-click retry actions, disabled submit states, and Enter/Shift+Enter key controls while preserving the dark photography UI.
- **R6: Conversation History Persistence:** Persist user and assistant messages in browser `localStorage` under `shutterwise_chat_history_v1` (bounded to 50 messages) with a safe clear-chat action and SSR safety.
- **R7: Vercel Hobby Production Readiness:** Configure max serverless execution duration (`maxDuration = 60`), 55s internal request timeout to allow graceful 504 JSON error handling, and safe diagnostic logging without leaking keys.
- **R8: Verification & Quality:** Pass `npx tsc --noEmit`, `npm run lint`, `npm run build`, and live end-to-end API verification.

---

## 3. Gemini API Research, Model Benchmarking & Selection

### A. Deprecation Notice & Empirical Latency Benchmarks
During verification against the live Google Gemini Developer API on 2026-11-02, model availability and latency were empirically evaluated:

| Model Tested | API Response / Status | Measured Latency | Free Tier Support | Recommendation Status |
|---|---|---|---|---|
| `gemini-2.5-flash` | `404 NOT_FOUND` ("No longer available to new users") | 0.86s | Deprecated for new users | ❌ Deprecated by Google |
| `gemini-2.5-flash-lite` | `404 NOT_FOUND` ("No longer available to new users") | 0.47s | Deprecated for new users | ❌ Deprecated by Google |
| `gemini-3.8-flash` | `200 OK` (Heavy queueing / congestion) | 297.55s (~5 min) | Free tier enabled | ⚠️ Caused 25s timeout |
| `gemini-flash-latest` | `504 DEADLINE_EXCEEDED` | 13.82s | Free tier enabled | ❌ Flaky under load |
| `gemini-3.1-flash-lite` | `200 OK` | 1.44s | Free tier enabled | ✅ Fast candidate |
| `gemini-3.5-flash-lite` | `200 OK` (High quality & consistent) | **1.41s – 3.95s** | Free tier enabled | ⭐ **Selected Default** |

Google's API officially returned this instruction:
> *"This model models/gemini-2.5-flash-lite is no longer available to new users. Please update your code to use models/gemini-3.5-flash-lite for the latest features and improvements."*

`gemini-3.5-flash-lite` was selected as the default model because it responds in under 4 seconds, produces comprehensive educational explanations adhering strictly to the ShutterWise Mentor persona, and is completely free under Google AI Studio's Developer API. Runtime model overrides are also supported via `process.env.GEMINI_MODEL`.

### B. Free-Tier Quotas on Developer API
- **Cost:** $0.00 / ₹0 (No credit card or billing required in Google AI Studio).
- **Rate Limits (Per Project):**
  - **RPM:** 15 Requests Per Minute
  - **TPM:** 1,000,000 Tokens Per Minute
  - **RPD:** 1,500 Requests Per Day (resets at midnight Pacific Time)
- **Official Documentation Sources:**
  - Gemini API Pricing: [https://ai.google.dev/gemini-api/docs/pricing](https://ai.google.dev/gemini-api/docs/pricing)
  - Rate Limits & Quotas: [https://ai.google.dev/gemini-api/docs/rate-limits](https://ai.google.dev/gemini-api/docs/rate-limits)
  - API Key Creation: [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)
  - General Documentation: [https://ai.google.dev/gemini-api/docs](https://ai.google.dev/gemini-api/docs)

---

## 4. Timeout Diagnosis and Resolution

### A. Root Cause Analysis of 25.4s Timeout
The local error `[ShutterWise /api/chat error]: GATEWAY_TIMEOUT: Gemini API request timed out. POST /api/chat 503 in 25.4s` occurred due to two contributing factors:
1. **Hardcoded 25-Second Application Timeout:** `src/lib/gemini.ts` enforced `timeoutMs = 25000` inside a `Promise.race()` block.
2. **Upstream Model Congestion:** Testing with larger models (`gemini-3.8-flash`) suffered from heavy Google server-side queuing (taking up to 297s), immediately hitting the 25.0s race condition.

### B. Architecture Fixes Implemented
1. **Centralized 55-Second Timeout:**
   - Established `GEMINI_REQUEST_TIMEOUT_MS = 55000` in `src/lib/gemini.ts`.
   - 55 seconds gives the upstream model sufficient time during transient congestion while providing a 5-second buffer before Vercel Hobby's 60-second serverless execution ceiling.
   - Initialized `GoogleGenAI` with `httpOptions: { timeout: GEMINI_REQUEST_TIMEOUT_MS }` for native SDK enforcement alongside defensive `Promise.race()` cleanup.
2. **Token Output Cap:**
   - Enforced `GEMINI_MAX_OUTPUT_TOKENS = 800` to prevent token bloat, reduce latency, and preserve free-tier TPM.
3. **Conservative Retry Logic:**
   - Added automatic single-retry (`isTransientError`) with jittered exponential backoff (1000–1500ms) strictly for transient 503 (UNAVAILABLE) or 429 (RESOURCE_EXHAUSTED) responses.
   - Retries are explicitly prevented if the error was a timeout or if the remaining time budget is under 10 seconds.
4. **Vercel Hobby Serverless Configuration:**
   - Added `export const runtime = "nodejs";` and `export const maxDuration = 60;` to `src/app/api/chat/route.ts`.
   - Structured timeout errors to return HTTP 504 with `{ error: "The AI photography mentor timed out while generating a response. Please try again.", code: "GATEWAY_TIMEOUT" }`.
5. **Safe Diagnostic Logging:**
   - Added execution duration tracking (`durationMs`) and sanitized logging in `route.ts`.
   - Zero sensitive keys, environment variables, or full user payloads are ever logged.
6. **Frontend Retry Deduplication:**
   - Enhanced `handleSendMessage(textToSend, isRetry)` in `src/app/chat/page.tsx` to detect retried messages and prevent duplicating user bubbles in the conversation state.

---

## 5. Files Created or Modified

```text
ShutterWise-AI/
├── .env.example                                (Updated: GEMINI_MODEL=gemini-3.5-flash-lite, empty key placeholder)
├── package.json                                (Updated: @google/genai ^2.32.0, webpack build script)
├── package-lock.json                           (Locked: @google/genai dependencies)
├── docs/
│   └── phase-reports/
│       └── PHASE-2-GEMINI-CHATBOT.md           (Updated: Comprehensive Phase 2 & Timeout Resolution Report)
└── src/
    ├── app/
    │   ├── api/
    │   │   └── chat/
    │   │       └── route.ts                    (Updated: Vercel maxDuration=60, 504 timeout mapping, timing logs)
    │   └── chat/
    │       └── page.tsx                        (Updated: connected chat UI, storage, retry deduplication)
    ├── lib/
    │   ├── gemini.ts                           (Updated: centralized 55s timeout, 800 tokens, retry logic, gemini-3.5-flash-lite)
    │   ├── rate-limiter.ts                     (Maintained: best-effort in-memory sliding window rate limiter)
    │   ├── storage.ts                          (Maintained: defensive localStorage persistence adapter)
    │   └── system-prompt.ts                    (Maintained: ShutterWise Mentor photography instructions)
    └── types/
        └── chat.ts                             (Updated: added GATEWAY_TIMEOUT error code)
```

---

## 6. Verification & Automated Test Suite Results

### A. TypeScript Type Check
```bash
$ npx tsc --noEmit
# Exit Code: 0 (Zero type errors)
```

### B. ESLint Check
```bash
$ npm run lint
> shutterwise-ai@0.1.0 lint
> eslint
# Exit Code: 0 (Zero lint errors)
```

### C. Production Build
```bash
$ npm run build
> shutterwise-ai@0.1.0 build
> next build --webpack

▲ Next.js 16.3.7 (webpack)
- Environments: .env.local
✓ Compiled successfully in 14.4s
  Running TypeScript ...
  Finished TypeScript in 6.5s ...
✓ Generating static pages using 7 workers (9/9) in 2.2s
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/chat
├ ○ /calculator
├ ○ /chat
├ ○ /learn
└ ○ /recommendations

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
# Exit Code: 0
```

### D. Live End-to-End API Test Suite
Executed against local production server (`http://127.0.0.1:3005`) with real Gemini API dispatch:

```text
--- TEST 1: Live Gemini Photography Query ---
Query: "Explain the exposure triangle in simple English."
[ShutterWise /api/chat] Success: generated response in 2640ms
Status: 200 (2719ms)
SUCCESS: Received reply (1940 chars)
Snippet: Welcome to ShutterWise Mentor! Let’s demystify the Exposure Triangle. Think of it as a three-way balancing act that your camera uses to collect light...

--- TEST 2: Multi-turn History Context ---
Query: "What should I set my ISO to on a sunny day?"
[ShutterWise /api/chat] Success: generated response in 2295ms
Status: 200 (2303ms)
SUCCESS: Received multi-turn reply (1719 chars)
Snippet: On a bright, sunny day, a great starting baseline for your ISO is 100 (or ISO 200, depending on your camera's base ISO)...

--- TEST 3: Validation - Empty Message ---
Payload: { "message": "   " }
Status: 400 (8ms) Expected: 400
Response: { error: 'Message cannot be empty.', code: 'INVALID_REQUEST' }

--- TEST 4: Validation - Message > 500 characters ---
Payload: 539 characters
Status: 400 (11ms) Expected: 400
Response: { error: 'Message exceeds the 500-character limit (539 characters).', code: 'INVALID_REQUEST' }

--- TEST 5: Security - Disallow System Role Injection ---
Payload: history with role="system"
Status: 400 (8ms) Expected: 400
Response: { error: 'Client is not authorized to inject system-role messages.', code: 'INVALID_REQUEST' }

--- TEST 6: Method Guard - GET /api/chat ---
Status: 405 Expected: 405
Response: { error: 'Method Not Allowed. Use POST for chat queries.' }

--- ALL TESTS COMPLETED: 100% PASS ---
```

---

## 7. Vercel Hobby Deployment Instructions

To deploy ShutterWise AI to Vercel's free Hobby plan:

1. **Push Changes to GitHub:**
   - Commit changes on `main`.
   - Push to `https://github.com/sivaguru200529/shutterwise-ai`.
2. **Import Repository in Vercel:**
   - Navigate to [https://vercel.com/new](https://vercel.com/new).
   - Select `shutterwise-ai`.
   - Framework Preset: **Next.js** (automatically detected).
   - Root Directory: `./`
3. **Configure Environment Variables in Vercel:**
   - Under **Environment Variables**, add:
     - `GEMINI_API_KEY`: *(Your Google AI Studio API key)*
     - `GEMINI_MODEL`: `gemini-3.5-flash-lite`
4. **Deploy:**
   - Click **Deploy**. Vercel will run `npm run build` and provision serverless routes.
   - The `/api/chat` function will honor `maxDuration = 60` with a 55s internal Gemini timeout, ensuring 100% serverless compatibility.

---

## 8. Git Commit Log

- **Target Branch:** `main`
- **Previous Commits:**
  - `fa62b80`: `docs(phase-2): record final commit hash d6abc88`
  - `d6abc88`: `feat(phase-2): integrate Gemini photography chatbot`
- **Current Fix Commit:**
  - `d1fa874`: `fix(phase-2): resolve Gemini API timeout and add Vercel configuration`

---

## 9. Final Status & Sign-off

- [x] Timeout diagnosed, tested, and resolved (response time reduced from >25s to ~2.6s).
- [x] Official Google model sunset notice researched and addressed (`gemini-3.5-flash-lite`).
- [x] Centralized 55s timeout with SDK enforcement and conservative retry.
- [x] Vercel Hobby serverless configuration (`maxDuration = 60`, `runtime = "nodejs"`).
- [x] Safe diagnostic logging (no keys or payload leaked).
- [x] Frontend retry deduplication implemented.
- [x] TypeScript, ESLint, and Production Build passed with 0 errors.
- [x] All 6 live automated test scenarios passed.
- [x] Ready for production deployment on Vercel Hobby plan.
