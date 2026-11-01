# ShutterWise AI — Phase 0 Report: Technical Architecture and Development Plan

**Project:** ShutterWise AI  
**Tagline:** Understand Light. Master Your Camera. Capture Better.  
**Phase:** Phase 0 — Technical Architecture and Documentation  
**Status:** Completed  
**Author:** Senior Software Architect & Technical Lead  

---

## 1. Objective and Scope

The objective of Phase 0 is to establish an accurate, lightweight, zero-cost technical architecture, documentation structure, and implementation roadmap for **ShutterWise AI**. 

ShutterWise AI is an AI-powered photography learning assistant designed to help beginners master camera controls, understand lighting, calculate exposure values deterministically, and troubleshoot photographic errors. Rather than functioning as a black-box settings generator, the application is designed around the core principle: **"Explain the *Why*, not just the *What*."**

The scope of Phase 0 is strictly limited to architectural analysis, risk mitigation, documentation design, and planning. No application code, UI components, API routes, or external package installations are authorized during this phase.

---

## 2. Project Requirements and Constraints

### Target Users
- Beginner photographers transitioning from smartphone auto-mode to manual or semi-manual mirrorless/DSLR camera controls.
- Novice hobbyists struggling with the exposure triangle, blurry photos, noise/grain, or lighting conditions.

### Hardware Constraints
- **Hardware Profile:** ASUS Vivobook Go 15, AMD Ryzen processor, integrated graphics, 8 GB RAM, Windows OS.
- **Development Tool:** Antigravity IDE.
- **Resource Management:** 
  - Strictly avoid local LLM inference or background model weights that exceed RAM boundaries.
  - Avoid Docker containers, heavy virtualization layers, or background database services.
  - Rely on cloud-based AI inference via the Google Gemini API.
  - Use lightweight tooling (Vitest for testing, native Next.js compilation).

### Financial & Infrastructure Constraints
- **Budget Target:** ₹0 (Zero development, infrastructure, database, or API subscription costs).
- **Hosting Tier:** Vercel Hobby plan (Serverless Node.js / Edge functions).
- **Target MVP Timeline:** 2 days (an ambitious timeline requiring strict prioritization of core MVP capabilities: working chatbot, photography knowledge engine, exposure calculator, basic settings recommendations, testing, and deployment).

---

## 3. Technology Stack & Architectural Boundaries

| Layer | Approved Technology | Responsibility & Scope | Constraints / Explicit Exclusions |
|---|---|---|---|
| **Frontend Framework** | Next.js (App Router) | File-system routing, React Server Components (RSC) for static content, Client Components for interactive tools. | No heavy external UI component frameworks. |
| **Language** | TypeScript | Strict compile-time type safety across optical calculations, data models, and API payloads. | `strict: true`, no untyped `any`. |
| **Styling** | Tailwind CSS | Utility-first styling with dark theme tokens (Dark Charcoal, Warm Cream, Subtle Amber). | Configuration method (v3 `tailwind.config.ts` vs. v4 CSS `@theme`) depends on the installed version. |
| **AI Inference** | Google Gemini API (`@google/genai`) | Cloud-based conversational mentor and structured photography troubleshooting. | Must use official `@google/genai` SDK. Dynamic model configuration with free-tier verification. No paid billing. |
| **Backend** | Next.js Route Handlers | Server-side execution for API key isolation, request validation, and timeout handling. | Serverless Node.js runtime. No standalone Express/Fastify server. |
| **Knowledge Base** | Static JSON & Markdown | Curated camera presets, concept explanations, and offline troubleshooting fallbacks. | Zero external database; no vector databases or RAG pipelines in MVP. |
| **Chat Persistence** | Browser `localStorage` | Client-side session storage under key `shutterwise_chat_history_v1`. | Bounded to 50 messages. No server-side chat persistence or SQLite databases. |
| **Testing** | Vitest | Deterministic math unit testing, storage adapter tests, and validation tests. | Fast execution, low memory (~100 MB RAM vs 600 MB+ for Jest). |
| **Version Control** | Git & GitHub | Branch management, conventional commits, and automated Vercel CI/CD. | Strict `.gitignore` preventing secret leaks. |
| **Deployment** | Vercel Hobby Plan | Global Edge CDN and serverless API execution. | Must verify execution limits and avoid exceeding free quotas. |

### Prohibited Technologies
- **No Agent Frameworks:** LangChain, LlamaIndex, AutoGen, CrewAI.
- **No Vector Databases:** Pinecone, Chroma, Weaviate, Milvus, Qdrant.
- **No Server Databases:** SQLite, PostgreSQL, MySQL, MongoDB, Firebase Firestore.
- **No Paid APIs:** OpenAI, Anthropic, paid rate-limiting services (Upstash/Redis paid tiers).
- **No Heavy Containers:** Docker, Kubernetes.

---

## 4. Corrected Architectural Decisions

In reviewing the initial architectural proposals, multiple assumptions and potential risks were identified and corrected:

### A. Gemini SDK & Model Selection
- **SDK:** Standardized on the official `@google/genai` JavaScript SDK.
- **Configurability:** Model identifiers must never be hardcoded. The application will read `process.env.GEMINI_MODEL` with a documented server fallback.
- **Verification Rule:** Older model identifiers (e.g., `gemini-1.5-flash`) or free-tier quotas (RPM, TPM, RPD) will not be assumed. The active model and its free-tier eligibility will be verified in Google AI Studio before Phase 2 implementation. Paid billing will remain disabled.

### B. API Key Security & Isolation
- **Variable Name:** `GEMINI_API_KEY`.
- **Environment Isolation:** Kept exclusively in `.env.local` for local development and Vercel Project Environment Variables for production.
- **Client Shielding:** Never prefixed with `NEXT_PUBLIC_`. The key is never referenced in client-side bundles or browser code.
- **Repository Cleanliness:** `.env.local` is strictly ignored in `.gitignore`. `.env.example` provides empty placeholders only.
- **Access Pattern:** All requests originate from the server-side Route Handler (`src/app/api/chat/route.ts`).

### C. Rate Limiting Realities in Serverless Environments
- **Best-Effort Architecture:** An in-memory sliding window or token bucket limiter in a Next.js serverless route handler is **best-effort only**. In Vercel's serverless environment, requests may be routed to multiple independent lambda instances with isolated memory.
- **Practical Mitigations:**
  1. Input character limit: User prompt capped at 500 characters.
  2. Request body limit: Total payload capped at 10 KB.
  3. Bounded history: Client sends at most the last 6 conversation turns in the request body.
  4. Client-side throttling: Submit button disabled while a request is in flight.
  5. Safe error masking: Generic, user-friendly error messages returned without leaking internal system state.

### D. Prompt Injection & Output Safety
- **Untrusted Input:** User prompts and conversation histories are treated as untrusted data.
- **Safeguards vs. Guarantees:** System instructions provide guardrails to focus the AI on photography, but are documented as safeguards rather than absolute security guarantees against prompt injection.
- **Rendering Safety:** AI markdown responses will be parsed safely using vetted Markdown parsers. Arbitrary HTML from model output and unrestricted `dangerouslySetInnerHTML` are strictly forbidden.
- **Context Isolation:** System secrets, internal routes, and environment variables are strictly excluded from prompt text.

### E. Client Storage & Privacy Realities
- **Key:** `shutterwise_chat_history_v1`.
- **Quota Management:** Bounded to the last 50 messages to keep storage under 100 KB (well within browser ~5 MB limits).
- **Defensive Engineering:** All `localStorage` calls are wrapped in `try...catch` blocks to gracefully handle disabled storage, private browsing restrictions, or malformed JSON.
- **Privacy Reality:** Storage is local to the user's browser. It is not transmitted to external telemetry databases, but it is not "100% private" against physical device access or untrusted browser extensions. Users have access to an explicit "Clear Chat History" action.

### F. Exposure Calculator Mathematics
- **Standard Formula:** Standard Exposure Value at ISO 100 ($EV_{100}$) is calculated using the established optical formula:
  $$EV_{100} = \log_2\left(\frac{N^2}{t}\right)$$
  Where $N$ is the relative aperture f-number and $t$ is the shutter time in seconds.
- **Formula Rejection:** The previously proposed unverified formula $EV_S = EV_{100} + \log_2(S/100)$ is explicitly rejected for camera setting calculations.
- **Separation of Concepts:**
  1. **Camera Setting Exposure ($EV_{100}$):** The optical light admission determined by lens aperture ($N$) and shutter speed ($t$).
  2. **ISO Sensitivity:** Amplification factor applied to sensor signals. A higher ISO enables capturing a lower-luminance scene, but the optical camera setting $EV$ remains referenced to ISO 100.
  3. **Exposure Compensation:** Intentional EV stop adjustments ($\pm 1, \pm 2, \pm 3$ EV) to adjust image brightness against standard metering.
  4. **Equivalent Exposure (Reciprocity):** Demonstrating that $f/2.8$ at $1/500s$ admits the same total light volume as $f/4$ at $1/250s$.
- **Implementation:** Pure, deterministic TypeScript math functions in `src/lib/calculator.ts`. Zero AI arithmetic.

### G. Vercel Execution Limits
- Vercel Hobby serverless functions have platform-imposed execution duration and payload limits.
- The API route will configure an `AbortController` timeout (e.g., 9 seconds) to fail gracefully and return a fallback response before the platform forcibly terminates the function.

### H. Tailwind CSS Configuration Flexibility
- Tailwind CSS v4 removes the strict requirement for `tailwind.config.ts`, adopting direct CSS `@import "tailwindcss";` and `@theme` directives.
- The project will verify the installed Tailwind major version during Phase 1 initialization and apply the appropriate official configuration structure.

---

## 5. MVP Feature Scope (Planned vs. Implemented)

> [!NOTE]
> All features below are **planned** for implementation across Phases 1 through 6. None are implemented during Phase 0.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SHUTTERWISE AI MVP FEATURES                     │
├──────────────────────────┬─────────────────────────────────────────────┤
│ 1. AI Photography Chat   │ Context-aware mentor explaining the "Why".   │
│                          │ 6-part troubleshooting structure.           │
├──────────────────────────┼─────────────────────────────────────────────┤
│ 2. Learning Modules      │ ISO, Aperture, Shutter Speed, Exposure      │
│                          │ Triangle, Depth of Field, Focal Length.     │
├──────────────────────────┼─────────────────────────────────────────────┤
│ 3. Exposure Calculator   │ Deterministic EV100 calculator, reciprocity │
│                          │ visualizer, analog exposure meter.          │
├──────────────────────────┼─────────────────────────────────────────────┤
│ 4. Camera Settings       │ Starting baselines for Portraits, Landscape,│
│    Recommendations       │ Night, Street, Sports, Indoors + caveats.   │
├──────────────────────────┼─────────────────────────────────────────────┤
│ 5. Lighting Tutor        │ Hard/Soft, Directional (Front/Side/Back),   │
│                          │ Golden/Blue Hour visual guides.             │
├──────────────────────────┼─────────────────────────────────────────────┤
│ 6. Beginner Quiz         │ Interactive self-scoring quiz with instant  │
│                          │ educational feedback and score tracking.    │
└──────────────────────────┴─────────────────────────────────────────────┘
```

### Educational Caveat Requirement
Camera settings recommendations must always be presented as **starting points**, never universal rules. The UI and AI must explicitly teach that settings depend on:
1. Ambient light levels.
2. Subject motion speed.
3. Lens maximum aperture and focal length.
4. Camera sensor size (Full Frame vs. APS-C vs. Micro Four Thirds).

### Structured Troubleshooting Framework (6 Parts)
When diagnosing photographic mistakes (dark, blurry, grainy, washed-out images), the AI and local knowledge base must follow this structure:
1. **Problem Identification:** Clear diagnosis of the issue.
2. **Likely Causes:** Physical reasons (e.g., shutter speed slower than reciprocal focal length).
3. **Recommended Settings:** Concrete baseline values for ISO, Aperture, and Shutter Speed.
4. **Why It Works:** Explanation of how the settings solve the physical issue.
5. **Practical Field Tip:** Actionable technique (e.g., bracing against a wall, using a 2-second timer).
6. **Clarifying Question:** Follow-up prompt to understand camera hardware or shooting context.

---

## 6. Proposed Project Structure (Planned)

The complete proposed project directory structure for the Next.js App Router implementation is:

```text
ShutterWise-AI/
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── README.md
├── docs/
│   ├── PHASE-REPORT-TEMPLATE.md
│   ├── architecture/
│   │   └── SYSTEM-ARCHITECTURE.md
│   └── phase-reports/
│       └── PHASE-0-ARCHITECTURE.md
├── public/
│   ├── favicon.ico
│   └── images/
│       └── diagrams/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Planned: Root layout, Navbar, Footer
│   │   ├── page.tsx                    # Planned: Landing page
│   │   ├── globals.css                 # Planned: Global Tailwind styling
│   │   ├── chat/page.tsx               # Planned: AI Chatbot page
│   │   ├── learn/page.tsx              # Planned: Learning catalog
│   │   ├── learn/[topicSlug]/page.tsx  # Planned: Deep-dive concept lessons
│   │   ├── calculator/page.tsx         # Planned: EV & Reciprocity calculator
│   │   ├── recommendations/page.tsx    # Planned: Camera settings assistant
│   │   ├── lighting/page.tsx           # Planned: Lighting tutor & angles
│   │   ├── quiz/page.tsx               # Planned: Beginner quiz page
│   │   └── api/
│   │       ├── chat/route.ts           # Planned: Gemini API route handler
│   │       └── health/route.ts         # Planned: Service health check
│   ├── components/
│   │   ├── layout/                     # Planned: Navbar, Footer, Container
│   │   ├── ui/                         # Planned: Button, Card, Slider, Modal
│   │   ├── chat/                       # Planned: ChatContainer, MessageList, Input
│   │   ├── calculator/                 # Planned: EVCalculator, Reciprocity
│   │   ├── recommendations/            # Planned: ScenarioSelector, SettingsCard
│   │   ├── learn/                      # Planned: ModuleCard, TriangleGraphic
│   │   ├── lighting/                   # Planned: LightingCard, AngleVisualizer
│   │   └── quiz/                       # Planned: QuizEngine, QuestionCard
│   ├── data/
│   │   ├── knowledge/                  # Planned: ISO, Aperture, Shutter JSON
│   │   ├── scenarios/                  # Planned: Portrait, Landscape presets JSON
│   │   ├── lighting/                   # Planned: Lighting scenarios JSON
│   │   ├── troubleshooting/            # Planned: Offline common problems JSON
│   │   └── quiz/                       # Planned: Quiz questions JSON
│   ├── lib/
│   │   ├── gemini.ts                   # Planned: @google/genai client
│   │   ├── calculator.ts               # Planned: Pure TS optical math engine
│   │   ├── storage.ts                  # Planned: Safe localStorage adapter
│   │   ├── rate-limiter.ts             # Planned: Best-effort rate limiter
│   │   └── utils.ts                    # Planned: UI helper functions
│   └── types/                          # Planned: TypeScript interfaces
└── tests/
    ├── unit/                           # Planned: Calculator, storage, rate limiter tests
    └── integration/                    # Planned: API route validation tests
```

---

## 7. Known Risks and Mitigations

| Identified Risk | Impact | Architectural Mitigation |
|---|---|---|
| **Gemini Free-Tier Rate Limits** | 429 Too Many Requests error during high usage. | Client-side debouncing; bounded request payloads; offline knowledge base fallback returning curated advice if the API fails. |
| **Model Deprecation / Name Drift** | API failures if a specific model identifier is retired. | Configurable model identifier via `GEMINI_MODEL`; pre-implementation verification in Google AI Studio. |
| **Serverless Memory Isolation** | In-memory rate limiting not shared across instances. | Treat in-memory limiter as best-effort; enforce strict payload size checks (<10 KB) and character caps (500 chars). |
| **Browser Storage Quota & Privacy** | `localStorage` quota exceeded or disabled in private browsing. | Cap history at 50 messages; wrap all storage calls in `try...catch`; provide user with clear-history button. |
| **8 GB RAM Hardware Contention** | Dev machine freezing or thrashing during development. | Vitest for testing (~100 MB RAM); cloud AI inference; zero Docker; single Next.js development server process. |
| **2-Day MVP Timeline Pressure** | Scope creep preventing completion of a polished deliverable. | Ruthless prioritization of Core Pillars (Chatbot, Knowledge, Calculator, Recommendations, Tests, Deployment); optional UI features simplified if time runs short. |

---

## 8. Nine-Phase Implementation Roadmap

```
Day 1: Foundation, AI Core & Photography Engine
├── Phase 0: Technical Architecture & Development Plan (COMPLETED)
├── Phase 1: Project Initialization & Frontend Foundation (~2.0 hrs)
├── Phase 2: Gemini AI Chatbot Integration (~2.5 hrs)
├── Phase 3: Photography Knowledge Engine (~2.0 hrs)
└── Phase 4: Exposure Calculator (~2.5 hrs)

Day 2: Features, Polish, Testing & Deployment
├── Phase 5: Camera Settings Recommendation Assistant (~2.0 hrs)
├── Phase 6: Lighting Tutor & Beginner Quiz (~2.5 hrs)
├── Phase 7: Testing, Security & Quality Assurance (~2.0 hrs)
└── Phase 8: GitHub Documentation & Vercel Deployment (~1.5 hrs)
```

- **Phase 0 (Current):** Technical Architecture, Boundary Verification, Documentation.
- **Phase 1:** Project Initialization (Next.js, TypeScript, Tailwind, Layout, Navbar, Footer).
- **Phase 2:** Gemini AI Chatbot (`@google/genai`, Route Handler, Chat UI, localStorage persistence).
- **Phase 3:** Photography Knowledge Engine (Typed JSON data, learning module pages, exposure triangle guide).
- **Phase 4:** Exposure Calculator (Deterministic TypeScript math, EV sliders, reciprocity explainer).
- **Phase 5:** Camera Settings Recommendation Assistant (Scenario selector, preset cards, "Why it works" logic).
- **Phase 6:** Lighting Tutor & Beginner Quiz (Lighting guides, angle visualizer, quiz engine, score tracking).
- **Phase 7:** Testing, Security & QA (Vitest unit tests, input validation tests, accessibility audit).
- **Phase 8:** GitHub Documentation & Vercel Deployment (README, `.env.example`, production deploy, live verification).

---

## 9. External Dependencies Requiring Verification Before Implementation

1. **Google AI Studio Model Verification:** Confirm the active Gemini model identifier and its free-tier rate limits (RPM/TPM/RPD).
2. **Tailwind CSS Version Verification:** Check whether Next.js template installs Tailwind v3 (requiring `tailwind.config.ts`) or Tailwind v4 (using CSS `@theme`).
3. **Vercel Hobby Serverless Execution Limits:** Confirm the current serverless function execution timeout limits on the Vercel Hobby plan.

---

## 10. Phase 0 Completion Status & Phase 1 Readiness

- **Status:** **Phase 0 is complete.**
- **Project Root Verified:** `C:\Users\91934\.gemini\antigravity\scratch\ShutterWise-AI`.
- **Documentation Structure Created:**
  - `docs/phase-reports/PHASE-0-ARCHITECTURE.md`
  - `docs/PHASE-REPORT-TEMPLATE.md`
  - `docs/architecture/SYSTEM-ARCHITECTURE.md`
- **Application Code Status:** Zero application code, dependencies, or `.env` secrets created.
- **Phase 1 Readiness:** **Ready for review.** Phase 1 implementation will not begin until explicit approval is received.

