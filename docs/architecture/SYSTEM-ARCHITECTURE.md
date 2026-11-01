# ShutterWise AI — System Architecture Specification

**Project:** ShutterWise AI  
**Tagline:** Understand Light. Master Your Camera. Capture Better.  
**Document:** System Architecture Specification  
**Status:** Architecture Baseline Approved  
**Author:** Senior Software Architect & Technical Lead  

---

## 1. High-Level System Architecture

ShutterWise AI is a modular, zero-cost web application built with the Next.js App Router (React Server Components + targeted Client Components) and deployed as a serverless application on the Vercel Hobby plan.

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT TIER (User Browser)                      │
│                                                                        │
│   Next.js App Router                                                   │
│   ├── Static Server Components (HTML / Fast Initial Paint)             │
│   ├── Interactive Client Components ('use client')                     │
│   │   ├── Chat UI (MessageList, ChatInput, QuickPrompts)               │
│   │   ├── Exposure Calculator (EV dials, sliders, visual meter)        │
│   │   ├── Scenario Recommendations (Tabs, camera dial cards)           │
│   │   └── Beginner Quiz Engine (Answer reveals, score tally)           │
│   ├── Pure TypeScript Optical Math Engine (`src/lib/calculator.ts`)    │
│   │   └── Evaluates EV100 and Reciprocity without external APIs        │
│   ├── Safe Markdown Parser (No arbitrary HTML or innerHTML injection)  │
│   └── Browser Persistence (`localStorage` key: 'shutterwise_chat_v1')  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTPS (Internal Same-Origin Calls)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   SERVERLESS BACKEND TIER (Vercel)                     │
│                                                                        │
│   Next.js Route Handlers (`src/app/api/chat/route.ts`)                 │
│   ├── Security Gate: Reads GEMINI_API_KEY from server environment      │
│   │   └── Never exposed to client bundles or browser DOM               │
│   ├── Request Guard: Type validation, character cap (500 chars max)    │
│   ├── Serverless Rate Limiting: Best-effort in-memory sliding window   │
│   ├── Static Knowledge Base: Curated JSON & Markdown (`src/data/`)     │
│   │   └── Injected as grounding context for the AI prompt              │
│   ├── Prompt Assembler: Enforces 6-part troubleshooting structure      │
│   └── Execution Timeout: AbortController (9s timeout guard)            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTPS Encrypted API Calls
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        EXTERNAL AI SERVICE TIER                        │
│                                                                        │
│   Google Gemini API Free Tier                                          │
│   ├── SDK: Official @google/genai JavaScript SDK                       │
│   └── Model: Configurable via GEMINI_MODEL (Verified Free Tier)        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Frontend Architecture

### Rendering Strategy: Server Components vs. Client Components
To maximize performance and keep the client bundle size minimal on low-spec hardware, the application uses a hybrid rendering architecture:

1. **React Server Components (RSC - Default):**
   - Concept documentation pages (`/learn`, `/learn/[topicSlug]`).
   - Lighting reference guides (`/lighting`).
   - Root page layout, headers, footers, and static marketing copy.
   - **Benefit:** Rendered to static HTML at build time; zero JavaScript hydration overhead for readers.
2. **Client Components (`'use client'`):**
   - `src/components/chat/*`: Message state management, real-time typing indicators, local storage synchronization.
   - `src/components/calculator/*`: Interactive aperture, shutter speed, and ISO sliders; real-time recalculation of Exposure Value ($EV_{100}$).
   - `src/components/quiz/*`: Interactive selection, score tracking, and immediate rationale feedback.
   - **Benefit:** Interactive state is isolated to the specific components that require it.

### Design System & Visual Direction
- **Background Canvas:** Dark Charcoal (`#121212`) — reduces eye strain and mimics professional photography editing suites.
- **Card Surfaces:** Elevated Charcoal (`#1E1E1E`) with subtle borders (`border-neutral-800`).
- **Primary Typography:** Warm Cream (`#F5F5F0`) — softer contrast than harsh pure white.
- **Secondary Typography:** Muted Stone (`#A3A398`) — clear visual hierarchy for metadata, camera settings, and explanations.
- **Accent Highlight:** Subtle Amber/Orange (`#F59E0B`, active: `#D97706`) — inspired by classic camera dial markings.
- **Responsive Strategy:** Mobile-first layout with minimum tap target sizes of 44px for sliders, buttons, and scenario pills.

---

## 3. Backend Architecture & Route Handlers

The backend uses Next.js Route Handlers executing in a serverless Node.js environment:

### `POST /api/chat`
Handles all conversational photography queries:
1. **Method Check:** Rejects non-POST requests with HTTP 405.
2. **Payload Parsing & Validation:**
   - Body must be valid JSON with a `message` string ($1 \le \text{length} \le 500$ characters).
   - Optional `history` array capped at a maximum of 6 prior messages (3 user/assistant turns) to avoid prompt bloat.
   - Total request payload must be under 10 KB.
3. **Best-Effort Rate Limiting:**
   - Evaluates an IP-keyed in-memory sliding window limiter (e.g., maximum 10 requests per rolling 60-second window).
   - **Documented Reality:** Serverless functions are ephemeral and do not share memory across instances. This limiter acts as a best-effort client throttle, not a multi-region DDoS barrier.
4. **Context & System Prompt Assembly:**
   - Injects the Photography Mentor system instructions.
   - Scans the user's message against keywords in `src/data/troubleshooting/` to ground the model with accurate camera data.
5. **Gemini API Dispatch:**
   - Calls the Gemini API using the official `@google/genai` SDK.
   - Wraps the call in an `AbortController` timeout (9 seconds) to fail gracefully before the Vercel platform function terminates.
6. **Error Masking & Fallback:**
   - If the API call fails (quota exhausted, timeout, service disruption), the handler catches the error, logs it privately on the server, and returns a graceful educational fallback from the local static knowledge base without exposing stack traces or API keys.

### `GET /api/health`
- Simple endpoint reporting `{ status: "ok", timestamp: number, aiConfigured: boolean }`.
- Verifies server-side configuration without exposing secret keys.

---

## 4. Gemini API Integration Flow

```text
[ User Browser ]
       │
       │ 1. POST /api/chat { message: "Why are my night photos blurry?", history: [...] }
       ▼
[ Next.js Route Handler (`src/app/api/chat/route.ts`) ]
       │
       │ 2. Validate input length & structure
       │ 3. Check best-effort rate limiter
       │ 4. Read process.env.GEMINI_API_KEY & process.env.GEMINI_MODEL
       │ 5. Assemble system instruction + troubleshooting structure
       │
       │ 6. HTTPS request with 9s AbortController
       ▼
[ Google Gemini API Free Tier ]
       │
       │ 7. Return generated response
       ▼
[ Next.js Route Handler ]
       │
       │ 8. Catch errors / apply offline fallback if failed
       │ 9. Return JSON { reply: string, source: 'ai' | 'fallback' }
       ▼
[ User Browser ]
       │
       │ 10. Render reply with safe Markdown parser
       │ 11. Append to localStorage ('shutterwise_chat_history_v1')
```

### System Prompt & Persona
The Gemini model is instructed as an encouraging, expert photography educator. It is guided to:
- Explain the physical reason behind camera settings.
- Use simple language and define technical terms with analogies.
- Use the **6-Part Troubleshooting Structure** for photo problem questions:
  1. Problem identification.
  2. Likely causes.
  3. Recommended camera settings.
  4. Why the recommendation works.
  5. Practical field tip.
  6. Clarifying question.
- Politely redirect questions unrelated to photography.

---

## 5. API Key Security & Safety Engineering

1. **Server-Side Isolation:**
   - `GEMINI_API_KEY` is loaded strictly by server-side Route Handlers via `process.env.GEMINI_API_KEY`.
   - Never prefixed with `NEXT_PUBLIC_`.
   - Stripped completely from client-side JavaScript bundles by the Next.js compiler.
2. **Git Hygiene:**
   - `.gitignore` explicitly excludes `.env`, `.env.local`, `.env.*.local`.
   - `.env.example` provides empty placeholders and setup instructions only.
3. **Prompt Injection Mitigations:**
   - User inputs are treated as untrusted text.
   - System instructions define boundaries, but are documented as safeguards rather than absolute security guarantees.
   - Internal credentials, server paths, and private configuration are never placed in prompt context.
4. **Safe Markdown Rendering:**
   - Markdown output is rendered using secure, vetted parsers (e.g., standard Markdown component libraries).
   - Arbitrary HTML execution and unrestricted `dangerouslySetInnerHTML` are strictly forbidden.

---

## 6. Photography Knowledge-Base Architecture

The knowledge base is built from static, strongly typed JSON files located in `src/data/`:

```text
src/data/
├── knowledge/
│   ├── iso.json                # ISO values, noise thresholds, daylight rules
│   ├── aperture.json           # f-stops, depth of field, light-gathering scales
│   ├── shutter-speed.json      # Speeds, motion freeze, reciprocal handholding rule
│   └── exposure-triangle.json  # Interdependency rules and stop trade-offs
├── scenarios/
│   ├── portraits.json          # Portrait presets (outdoor, indoor, shallow DOF)
│   ├── landscapes.json         # Landscape presets (f/8-f/11, deep focus, tripod)
│   ├── night.json              # Night & astrophotography starting points
│   ├── street.json             # Fast action, zone focus, 1/250s baselines
│   ├── sports.json             # High shutter speeds (1/1000s+), continuous AF
│   └── indoor.json             # Low light without flash, wide aperture settings
├── lighting/
│   └── lighting-scenarios.json # Quality (hard/soft), direction (front/side/back)
├── troubleshooting/
│   └── common-problems.json    # Dark, blurry, grainy, washed-out diagnosis mappings
└── quiz/
    └── questions.json          # Graded beginner multiple-choice questions
```

**Benefits:**
- 100% zero-cost storage.
- Sub-millisecond lookup times.
- Available offline even when external AI APIs are unreachable.
- Enforced at compile time by TypeScript interfaces in `src/types/knowledge.ts`.

---

## 7. Chat History Storage & Privacy Strategy

- **Storage Target:** Browser `localStorage`.
- **Storage Key:** `shutterwise_chat_history_v1`.
- **Data Contract:**
  ```typescript
  interface StoredChatSession {
    version: number;
    updatedAt: number;
    messages: {
      id: string;
      role: 'user' | 'assistant';
      content: string;
      timestamp: number;
    }[];
  }
  ```
- **Capacity Management:** Sliding window capped at the last 50 messages. Older messages are automatically evicted, keeping total storage well under 100 KB.
- **Defensive Error Handling:** All reads and writes are wrapped in `try...catch`. If `localStorage` is disabled (e.g., strict private browsing) or corrupted, the UI degrades gracefully to an in-memory session without crashing.
- **Privacy Disclosure:** History is stored locally on the user's device. It is not transmitted to external analytics, but it is not "100% private" against local device access. An explicit "Clear Chat History" button allows users to purge all stored data at any time.

---

## 8. Exposure Calculator Mathematics

The Exposure Calculator is implemented as a **deterministic, pure TypeScript engine** (`src/lib/calculator.ts`). It does not rely on AI for arithmetic calculations.

### Optical Formula
Standard Exposure Value at ISO 100 ($EV_{100}$) is calculated as:
$$EV_{100} = \log_2\left(\frac{N^2}{t}\right)$$

Where:
- $N$ = Lens relative aperture f-number (e.g., $1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22$).
- $t$ = Shutter time in seconds (e.g., $1/4000, 1/1000, 1/250, 1/60, 1, 2$).

### Conceptual Separation
1. **$EV_{100}$ (Camera Setting Exposure):** Measures the physical light volume admitted by the lens and shutter speed.
2. **ISO Sensitivity:** Electronic sensor amplification. While higher ISO allows shooting in lower scene luminance, the optical light admission ($EV_{100}$) remains a property of aperture and shutter speed.
3. **Exposure Compensation:** Relative stop adjustment ($\pm 1, \pm 2, \pm 3$ EV) applied to intentional scene metering.
4. **Reciprocal Equivalence:**
   $$\frac{N_1^2}{t_1} = \frac{N_2^2}{t_2}$$
   Demonstrating that opening the aperture by 1 stop ($f/4 \rightarrow f/2.8$) allows doubling the shutter speed ($1/125s \rightarrow 1/250s$) while maintaining identical total light exposure.

### Implementation Logic
```typescript
/**
 * Calculates standard EV100 from aperture f-number and shutter time in seconds.
 */
export function calculateEV100(aperture: number, shutterTimeSec: number): number {
  if (aperture <= 0 || shutterTimeSec <= 0) {
    throw new Error('Aperture and shutter time must be positive numbers');
  }
  return Math.log2((aperture * aperture) / shutterTimeSec);
}

/**
 * Checks if two camera settings admit equivalent optical light within a tolerance.
 */
export function areSettingsEquivalent(
  aperture1: number,
  shutter1: number,
  aperture2: number,
  shutter2: number,
  tolerance = 0.05
): boolean {
  return Math.abs(calculateEV100(aperture1, shutter1) - calculateEV100(aperture2, shutter2)) <= tolerance;
}
```

---

## 9. Testing Strategy

The project uses **Vitest** for unit and integration testing. Vitest provides fast startup (<500 ms) and a minimal RAM footprint (~100 MB), preventing memory contention on 8 GB RAM hardware.

### Planned Test Suites
1. `tests/unit/calculator.test.ts`:
   - Validates standard $EV_{100}$ values across full-stop scales (e.g., Sunny 16 rule: $f/16, 1/125s \approx EV 15$).
   - Validates reciprocity equivalence across matching stop shifts.
   - Validates error throwing on invalid inputs (zero or negative values).
2. `tests/unit/recommendations.test.ts`:
   - Validates that scenario lookups return complete starting settings and rationale breakdowns.
   - Validates handling of custom lighting modifier tags.
3. `tests/unit/storage.test.ts`:
   - Validates `localStorage` serialization, retrieval, and 50-message quota truncation.
   - Validates graceful fallback when JSON parsing fails.
4. `tests/unit/rate-limiter.test.ts`:
   - Validates sliding-window request counting and blocking above thresholds.
5. `tests/integration/api-chat.test.ts`:
   - Validates request payload length enforcement (rejecting >500 chars).
   - Validates error masking when `GEMINI_API_KEY` is missing.

---

## 10. Deployment & Hosting Architecture

- **Platform:** Vercel Hobby Plan.
- **Runtime:** Serverless Node.js / Edge runtime for Route Handlers.
- **Build Pipeline:** `npm run build` runs Next.js static site generation (SSG) for static learning pages and bundles client assets.
- **Edge Caching:** Static assets and pre-rendered pages are cached on Vercel's global CDN.
- **Environment Management:** Production `GEMINI_API_KEY` and `GEMINI_MODEL` are configured in Vercel Project Settings; never exposed in the source repository.

---

## 11. Known Limitations and External Dependencies

1. **Gemini Free-Tier Rate Limits:** The free tier of Gemini has platform-imposed rate limits (RPM, TPM, RPD). The application mitigates this with request debouncing, bounded contexts, and offline knowledge base fallbacks.
2. **Serverless Concurrency:** In-memory rate limiting does not persist across separate serverless execution lambdas. It provides best-effort protection against individual client loops, not distributed attacks.
3. **Hardware Limitations:** The development environment (8 GB RAM) requires running lightweight tooling without local AI models, Docker containers, or heavy background daemons.
4. **Pre-Implementation Verification Items:**
   - Active Google AI Studio model identifier.
   - Installed Tailwind CSS version (v3 vs. v4 configuration structure).
   - Current Vercel Hobby function timeout limits.

