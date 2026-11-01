<<<<<<< HEAD
# ShutterWise AI

> **Understand Light. Master Your Camera. Capture Better.**

ShutterWise AI is an AI-powered photography learning assistant designed to help beginners master camera settings, understand exposure, evaluate lighting quality, and troubleshoot shooting mistakes. Built around the core principle **"Explain the *Why*, not just the *What*,"** ShutterWise AI guides photographers transitioning from automatic smartphone mode to confident manual camera control.

---

## 1. Project Objectives

- **Demystify Exposure Mechanics:** Provide clear, intuitive mental models of how Aperture, Shutter Speed, and ISO interact optically.
- **Explain the *Why*:** Never present black-box camera numbers without teaching the optical principles, sensor tradeoffs, and ambient lighting conditions behind them.
- **Provide Deterministic Tools:** Supply precision exposure calculators ($EV_{100}$ and reciprocity) using verified optical formulas rather than fabricated AI math.
- **Zero-Cost Architecture:** Maintain ₹0 development and operational infrastructure costs by leveraging modern serverless runtimes and free-tier cloud AI services.
- **Hardware-Friendly Design:** Keep codebases lightweight, fast, and responsive across low-spec developer and user environments.

---

## 2. Planned Features Across Development Phases

| Feature | Description | Status |
|---|---|---|
| **Frontend Foundation** | Premium dark-themed UI, responsive navbar, footer, and 5 core route views. | **Completed (Phase 1)** |
| **AI Photography Tutor** | Conversational photography mentor explaining techniques and troubleshooting mistakes. | Planned (Phase 2) |
| **Learning Catalog** | Interactive visual lessons on ISO, Aperture, Shutter Speed, Exposure Triangle, and Light. | Planned (Phase 3) |
| **Exposure Calculator** | Deterministic $EV_{100}$ calculator, reciprocity visualizer, and exposure meter. | Planned (Phase 4) |
| **Camera Settings Guide** | Starting baseline presets for Portraits, Landscapes, Street, Night, Sports, and Indoors. | Planned (Phase 3) |
| **Lighting Tutor** | Directional light quality (hard vs soft), angle diagrams, and Golden/Blue hour dynamics. | Planned (Phase 5) |
| **Beginner Quiz** | Interactive self-scoring quiz with instant educational feedback and score tracking. | Planned (Phase 6) |

---

## 3. Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React Server Components)
- **Library:** [React](https://react.js.org/) 19
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4 (`@tailwindcss/postcss`)
- **Code Quality:** [ESLint](https://eslint.org/) 9 with `eslint-config-next`
- **Package Manager:** npm

### Architectural Boundaries
- ₹0 Development Budget.
- Zero paid APIs or heavy UI frameworks.
- No vector databases or local LLM inference engines.
- Safe client-side storage with defensive error handling.

---

## 4. Getting Started & Installation

### Prerequisites
- **Node.js:** v20.x or v22.x (Recommended: v22.17.0)
- **npm:** v10.x (Recommended: 10.9.2)

### Installation
Clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd ShutterWise-AI
npm install
```

---

## 5. Local Development Instructions

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

## 6. Current Development Status

- **Phase Completed:** Phase 1 — Project Initialization & Frontend Foundation.
- **Available Routes:**
  - `/` — Homepage (Hero, Viewfinder Visual, Core Features, How It Works)
  - `/learn` — Photography Learning Modules (ISO, Aperture, Shutter Speed, Exposure Triangle, Lighting)
  - `/chat` — AI Photography Tutor Interface (Frontend-only preview, zero API connections)
  - `/calculator` — Exposure Calculator Interface (Input controls, optical formula guide, disabled preview)
  - `/recommendations` — Camera Settings Guide (6 scenario baselines with educational caveats)
- **Next Phase:** Phase 2 — Gemini AI Chatbot Integration.
=======
# shutterwise-ai
An AI-powered photography learning assistant that helps beginners master ISO, aperture, shutter speed, exposure, and lighting through interactive lessons, AI guidance, and practical camera-setting recommendations.
>>>>>>> origin/main
