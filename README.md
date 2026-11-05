# ShutterWise AI

> **Understand Light. Master Your Camera. Capture Better.**

ShutterWise AI is an AI-powered photography learning platform designed to help beginners master camera settings, understand optical exposure, evaluate lighting quality, and troubleshoot shooting mistakes. Built around the core principle **"Explain the *Why*, not just the *What*,"** ShutterWise AI guides photographers transitioning from automatic smartphone mode to confident manual camera control.

---

## 1. Project Objectives

- **Demystify Exposure Mechanics:** Provide clear, intuitive mental models of how Aperture, Shutter Speed, and ISO interact optically.
- **Explain the *Why*:** Never present black-box camera numbers without teaching the optical principles, sensor tradeoffs, and ambient lighting conditions behind them.
- **Interactive Knowledge Engine:** Six comprehensive learning modules with real-world scenarios, settings breakdowns, common mistake corrections, and self-scoring knowledge checks.
- **Contextual AI Mentorship:** An integrated Groq-powered AI assistant (`openai/gpt-oss-20b`) capable of contextual advice directly from lessons and troubleshooting cards.
- **Provide Deterministic Tools:** Supply precision exposure calculators ($EV_{100}$ and reciprocity) using verified optical formulas rather than fabricated AI math.
- **Zero-Cost Architecture:** Maintain ₹0 development and operational infrastructure costs by leveraging modern serverless runtimes and free-tier cloud AI services.

---

## 2. Platform Features & Phase Status

| Feature | Description | Status |
|---|---|---|
| **Frontend Foundation** | Premium dark-themed UI, responsive navbar, footer, and modern route views. | **Completed (Phase 1)** |
| **AI Photography Mentor** | Conversational tutor powered by Groq (`openai/gpt-oss-20b`) with 6-part troubleshooting. | **Completed (Migrated to Groq)** |
| **Knowledge Engine** | 6 deep-dive modules (ISO, Aperture, Shutter, Triangle, Lighting, Troubleshooting) with quizzes. | **Completed (Phase 3)** |
| **Optical EV Calculator** | Deterministic $EV_{100}$ computation, scene luminance matching, and reciprocal equivalents. | **Completed (Phase 3)** |
| **Camera Settings Guide** | Starting baseline presets for Portraits, Landscapes, Street, Night, Sports, and Indoors. | **Completed (Phase 3)** |
| **Lesson Progress Tracking** | Client-side progress persistence tracking mastered lessons across the curriculum. | **Completed (Phase 3)** |

---

## 3. Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) 16 (App Router, Server Components & SSG)
- **Library:** [React](https://react.js.org/) 19
- **Language:** [TypeScript](https://www.typescriptlang.org/) 5 (Strict mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4 (`@tailwindcss/postcss`)
- **AI Engine:** [Groq SDK](https://www.npmjs.com/package/groq-sdk) (`openai/gpt-oss-20b`)
- **Code Quality:** [ESLint](https://eslint.org/) 9 with `eslint-config-next`
- **Hosting / Runtime:** [Vercel](https://vercel.com/) Hobby Serverless (`maxDuration: 60`)

---

## 4. Getting Started & Installation

### Prerequisites
- **Node.js:** v20.x or v22.x (Recommended: v22.17.0)
- **npm:** v10.x (Recommended: 10.9.2)

### Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/sivaguru200529/shutterwise-ai.git
cd ShutterWise-AI
npm install
```

### Environment Configuration
Copy `.env.example` to `.env.local` and configure your Groq API key:

```bash
cp .env.example .env.local
```

Inside `.env.local`:
```env
# Obtain your free API key from Groq Console: https://console.groq.com/keys
GROQ_API_KEY=your_actual_groq_api_key_here
GROQ_MODEL=openai/gpt-oss-20b
```

> **Note:** Never commit `.env.local` or expose `GROQ_API_KEY` to client-side code.

---

## 5. Local Development & Verification

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Verification Scripts
To verify code quality, types, and build integrity:

```bash
# Type-check with TypeScript
npx tsc --noEmit

# Lint code with ESLint
npm run lint

# Compile production build
npm run build
```

---

## 6. Architecture & Groq AI Integration

### AI Inference Architecture
- **Provider:** Groq Cloud LPU™ Inference Engine
- **SDK:** `groq-sdk`
- **Default Model:** `openai/gpt-oss-20b` (configurable via `GROQ_MODEL`)
- **Serverless API Route:** `POST /api/chat`
- **Request Timeout:** 25 seconds with client-safe timeout error responses (`GATEWAY_TIMEOUT`, 504)
- **Rate Limiting:** Best-effort sliding window IP throttling (15 req/min)
- **Payload Protection:** 10 KB max request body, 500-character input cap, and client system-role injection prevention
- **Error Handling:** Graceful status code mapping without exposing internal headers, API keys, or stack traces

### Available Application Routes:
- `/` — Modernized Landing Page (Hero, Viewfinder HUD, Core Elements, CTAs)
- `/learn` — Photography Knowledge Hub Dashboard with Curriculum Progress Tracker
- `/learn/iso` — Module 1: ISO Sensitivity & Sensor Signal Gain
- `/learn/aperture` — Module 2: Aperture, Depth of Field & Bokeh
- `/learn/shutter-speed` — Module 3: Shutter Speed & Motion Control
- `/learn/exposure-triangle` — Module 4: The Exposure Triangle & Reciprocity
- `/learn/lighting-fundamentals` — Module 5: Quality, Direction & Color Temperature
- `/learn/photography-troubleshooting` — Module 6: 10-Point Diagnostic Troubleshooting
- `/calculator` — Optical Exposure Value ($EV_{100}$) and Reciprocity Calculator
- `/recommendations` — Filterable Camera Settings Preset Guide with Lens Recommendations
- `/chat` — Interactive AI Mentor with intelligent conversation scrolling and retry deduplication
- `/api/chat` — Secure serverless Groq endpoint with rate limiting and timeout guards
