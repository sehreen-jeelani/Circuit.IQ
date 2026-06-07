<![CDATA[# Circuit.IQ — React Main Portal

> **React 19 + TypeScript + TailwindCSS 4** · Landing page · Experiment catalog · AI console · Lab launcher

---

## 📑 Table of Contents

- [Overview](#overview)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Pages](#-pages)
- [Components](#-components)
- [State Management](#-state-management)
- [Routing](#-routing)
- [3D Lab Integration](#-3d-lab-integration)
- [AI PhysicsBot](#-ai-physicsbot)
- [Tech Stack](#-tech-stack)
- [Build & Deploy](#-build--deploy)
- [Configuration](#-configuration)
- [Troubleshooting](#-troubleshooting)

---

## Overview

This is the **main web portal** for Circuit.IQ — a React single-page application that serves as the entry point for students. It provides:

- 🏠 **Landing page** with animated hero, experiment catalog, and domain navigation
- 🔬 **Lab launcher** that embeds the 3D simulator in a fullscreen iframe
- 🤖 **PhysicsBot AI Console** for asking physics questions (powered by Gemini)
- 📞 **Contact page** for support tickets
- 🎓 **Attendance system** for student tracking
- 🎨 **Premium UI** with glassmorphism, 3D animations, and micro-interactions

---

## 📁 Project Structure

```
circuit.iq (1)final/
│
├── index.html                         ← Root HTML template
├── package.json                       ← NPM config & dependencies
├── vite.config.ts                     ← Vite build config + API proxy (→ port 5000)
├── tsconfig.json                      ← TypeScript configuration
├── .env.example                       ← Environment template
├── .gitignore                         ← Git ignore rules
├── metadata.json                      ← App metadata
│
├── src/                               ← 🧠 SOURCE CODE
│   ├── main.tsx                       ←   React DOM entry point
│   ├── App.tsx                        ←   🧭 Router & page transition shell
│   ├── index.css                      ←   Global styles & Tailwind imports
│   │
│   ├── store/                         ← 📦 STATE MANAGEMENT
│   │   └── useAppStore.ts             ←   Zustand global store
│   │                                       • currentPage (landing/lab/contact)
│   │                                       • currentExperiment (selected exp key)
│   │                                       • isLabOpen (lab visibility flag)
│   │
│   ├── pages/                         ← 📄 PAGE COMPONENTS
│   │   ├── LandingPage.tsx            ←   🏠 Homepage
│   │   │                                   • Hero section with animated 3D components
│   │   │                                   • 6-domain experiment catalog (26 experiments)
│   │   │                                   • Category filtering & search
│   │   │                                   • PhysicsBot AI console
│   │   │                                   • Team section & showcases
│   │   │
│   │   ├── LabStudio.tsx              ←   🔬 Lab Launcher
│   │   │                                   • Fullscreen iframe container
│   │   │                                   • Loads /lab.html?exp=<experiment_key>
│   │   │                                   • Handles WebGL context lifecycle
│   │   │
│   │   └── ContactPage.tsx            ←   📞 Contact & Support
│   │                                       • Ticket submission form
│   │                                       • Call scheduler
│   │                                       • FAQ accordion
│   │
│   ├── components/                    ← 🧩 REUSABLE COMPONENTS
│   │   ├── Navbar.tsx                 ←   Navigation bar (Home, Experiments, Lab, Contact)
│   │   ├── AntigravityHero.tsx        ←   3D floating components animation (R3F)
│   │   ├── PhysicsBotPanel.tsx        ←   AI chat interface (terminal-style)
│   │   ├── PhysicsShowcase.tsx        ←   Interactive demo widgets
│   │   ├── InteractiveCircuitLines.tsx ←  Mouse-reactive neural plexus canvas
│   │   ├── InteractiveBreadboard.tsx  ←   2D breadboard visualization
│   │   ├── CyberpunkLedMatrix.tsx     ←   LED matrix animation effect
│   │   ├── AttendanceSystem.tsx       ←   Student attendance tracking UI
│   │   └── TeamRolesSection.tsx       ←   Team member cards & demo consoles
│   │
│   └── lib/                           ← 🔧 UTILITY LIBRARIES
│       └── utils.ts                   ←   Helper functions (clsx, cn)
│
└── public/                            ← 📂 STATIC ASSETS
    ├── lab.html                       ←   Built 3D lab (from LABfront-IQ-3D/dist)
    └── assets/                        ←   Built lab bundles (JS, CSS)
```

---

## 🚀 Quick Start

### Development

```bash
cd "circuit.iq (1)final"

# Install dependencies
npm install

# Start dev server
npm run dev
# → Opens at http://localhost:3000
```

> **Note:** The dev server proxies `/api/*` requests to `http://localhost:5000` (Flask backend). Make sure the backend is running for full functionality.

### With Backend (Recommended)

```bash
# From project root:
python start_dev.py
# → Backend on :5000, Frontend on :3000
```

---

## 📄 Pages

### LandingPage (`pages/LandingPage.tsx`)

The homepage contains multiple sections:

| Section | Description |
|---------|-------------|
| **Hero** | Animated 3D floating components (via `AntigravityHero`) |
| **Domain Catalog** | 6 physics domains with expandable experiment cards |
| **Interactive Showcases** | Live mini-demos (breadboard, LED matrix, circuit lines) |
| **PhysicsBot** | AI-powered terminal for physics Q&A |
| **Team Section** | Founder cards with role descriptions |

**Experiment Domains (26 experiments):**

| Domain | Experiments |
|--------|-------------|
| ⚡ Electricity & Circuits | Ohm's Law, KVL, KCL, LCR, RC, Series/Parallel, Wheatstone, Dividers |
| 🔌 Semiconductors | Diode I-V, Arduino LED, Planck's LED |
| 🧲 Electromagnetism | Faraday, Lenz, Solenoid, Transformer, Biot-Savart |
| 🔥 Thermodynamics | Ideal Gas, Boyle, Charles, Specific Heat, Stefan's Law |
| ⚛️ Modern Physics | Photoelectric, Radioactive Decay, de Broglie, Bohr, Planck's Photocell |
| 🔬 Advanced Topics | Additional specialized experiments |

### LabStudio (`pages/LabStudio.tsx`)

- Renders a **fullscreen iframe** pointing to `/lab.html?exp=<experiment_key>`
- Handles WebGL context lifecycle (prevents double-disposal crashes)
- Uses a 300ms render delay to avoid context conflicts with the hero animation
- Passes experiment ID dynamically via URL parameters

### ContactPage (`pages/ContactPage.tsx`)

- Support ticket submission form (sends via `/api/contact`)
- Email and phone contact options
- FAQ section with expandable answers

---

## 🧩 Components

| Component | File | Description |
|-----------|------|-------------|
| `Navbar` | `Navbar.tsx` | Top navigation with page links and experiment dropdown |
| `AntigravityHero` | `AntigravityHero.tsx` | React-Three-Fiber 3D scene with floating electronic components |
| `PhysicsBotPanel` | `PhysicsBotPanel.tsx` | Terminal-style AI chat with typing animation and suggestion chips |
| `PhysicsShowcase` | `PhysicsShowcase.tsx` | Interactive mini-demos (oscilloscope sim, circuit animations) |
| `InteractiveCircuitLines` | `InteractiveCircuitLines.tsx` | Mouse-reactive neural plexus background canvas |
| `InteractiveBreadboard` | `InteractiveBreadboard.tsx` | 2D breadboard visualization with component highlighting |
| `CyberpunkLedMatrix` | `CyberpunkLedMatrix.tsx` | Animated LED matrix with cyberpunk aesthetics |
| `AttendanceSystem` | `AttendanceSystem.tsx` | Student attendance tracker with table and reports |
| `TeamRolesSection` | `TeamRolesSection.tsx` | Team member cards with waveform visualizations |

---

## 📦 State Management

Uses **Zustand** for global state (`store/useAppStore.ts`):

```typescript
interface AppState {
  currentPage: 'landing' | 'lab' | 'contact';
  currentExperiment: string;   // e.g., 'ohms', 'lcr', 'rc'
  isLabOpen: boolean;
  
  setCurrentPage: (page: string) => void;
  setCurrentExperiment: (exp: string) => void;
  openLab: (experiment: string) => void;
  closeLab: () => void;
}
```

**Usage:**
```tsx
const { currentExperiment, openLab } = useAppStore();
openLab('ohms');  // Navigate to lab with Ohm's Law
```

---

## 🧭 Routing

The app uses **state-based routing** (no React Router):

| State | Page Rendered | URL |
|-------|-------------|-----|
| `currentPage = 'landing'` | `LandingPage` | `/` |
| `currentPage = 'lab'` | `LabStudio` | `/` (iframe) |
| `currentPage = 'contact'` | `ContactPage` | `/` |

Navigation is handled by `Navbar` buttons that call `setCurrentPage()`.

---

## 🔬 3D Lab Integration

The 3D Lab simulator is loaded as an **iframe** inside `LabStudio.tsx`:

```
                React Portal (Port 3000)
                         │
                    LabStudio.tsx
                         │
                    <iframe src="/lab.html?exp=ohms" />
                         │
                         ▼
          LABfront-IQ-3D/dist/index.html
           (bundled Three.js application)
```

### How it works:

1. User clicks **"Launch Lab"** on an experiment card
2. `useAppStore.openLab('ohms')` sets the experiment and shows lab
3. `LabStudio` renders `<iframe src="/lab.html?exp=ohms" />`
4. The 3D lab reads `?exp=ohms` from URL and initializes that experiment
5. The lab communicates with Flask backend independently via `/api/*`

### WebGL Context Management:

- The `AntigravityHero` (homepage) and the 3D Lab both use WebGL
- A 300ms delay (`shouldRender` state) prevents context allocation conflicts
- `WebGLContextDisposer` runs in try-catch to handle double-disposal safely

---

## 🤖 AI PhysicsBot

The `PhysicsBotPanel` component provides an AI chat interface:

| Feature | Description |
|---------|-------------|
| **Terminal UI** | Dark glassmorphism terminal with `operator:~$` prompts |
| **Typing animation** | Word-by-word bot response rendering |
| **Suggestion chips** | Quick-ask physics topics with hover animations |
| **Formula display** | Formatted formula cards in bot responses |
| **Experiment links** | Bot can recommend relevant experiments to launch |

**API:** `POST /api/physicsbot/ask` → Uses Gemini AI (or local fallback)

---

## 🛠️ Tech Stack

| Tool | Version | Role |
|------|---------|------|
| [React](https://react.dev) | 19.0 | UI framework |
| [TypeScript](https://typescriptlang.org) | 5.8 | Type safety |
| [Vite](https://vitejs.dev) | 6.2 | Build tool + dev server |
| [TailwindCSS](https://tailwindcss.com) | 4.1 | Utility-first styling |
| [Zustand](https://zustand-demo.pmnd.rs/) | 5.0 | Lightweight state management |
| [Three.js](https://threejs.org) | 0.184 | 3D hero animation |
| [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | 9.6 | React wrapper for Three.js |
| [GSAP](https://gsap.com) | 3.15 | Advanced animations |
| [Lucide React](https://lucide.dev) | 0.546 | Icon library |
| [Motion](https://motion.dev) | 12.23 | Animation library |
| [Lenis](https://lenis.darkroom.engineering/) | 1.3 | Smooth scrolling |

---

## 🏗️ Build & Deploy

### Development Build

```bash
npm run dev        # Hot-reload dev server on port 3000
```

### Production Build

```bash
npm run build      # Compiles to dist/
npm run preview    # Preview production build locally
```

### Type Checking

```bash
npm run lint       # TypeScript type checking (tsc --noEmit)
```

### Full Project Build

```bash
# From project root:
python build_all.py   # Builds 3D lab → copies → builds React portal
```

The Flask backend serves `dist/` contents in production.

---

## ⚙️ Configuration

### Vite Config (`vite.config.ts`)

Key settings:
- **Port:** `3000` (dev server)
- **API Proxy:** `/api/*` → `http://localhost:5000` (Flask backend)
- **Plugins:** `@vitejs/plugin-react`, `@tailwindcss/vite`

### Environment Variables

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Google Gemini key (for client-side AI, if used) |

---

## ❓ Troubleshooting

| Problem | Solution |
|---------|----------|
| Blank page after build | Check `npm run build` output for errors |
| API calls returning CORS errors | Ensure Flask backend is running on port 5000 |
| 3D hero animation not showing | Check browser WebGL support; look for console errors |
| Lab iframe blank | Verify `public/lab.html` exists (run `python build_all.py`) |
| TypeScript errors | Run `npm run lint` to check types |
| TailwindCSS styles missing | Ensure `@tailwindcss/vite` plugin is in vite config |
| State not persisting across pages | Check Zustand store — state resets on full page reload |
| WebGL context lost | Happens when switching between hero and lab rapidly; auto-recovers |
]]>
