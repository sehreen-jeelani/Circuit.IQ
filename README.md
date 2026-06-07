<![CDATA[<div align="center">

# ⚡ Circuit.IQ

### AI-Powered 3D Virtual Physics Laboratory

> A premium, full-stack interactive 3D physics simulation portal with AI tutoring,
> real-time circuit building on virtual breadboards, and automated lab report generation.

[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?logo=python&logoColor=white)](#prerequisites)
[![Flask](https://img.shields.io/badge/Flask-3.1-000000?logo=flask&logoColor=white)](#backend-server)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](#react-portal)
[![Three.js](https://img.shields.io/badge/Three.js-r184-000000?logo=threedotjs&logoColor=white)](#3d-lab-simulator)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](#build-tooling)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite&logoColor=white)](#database)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase&logoColor=white)](#database)

</div>

---

## 📑 Table of Contents

- [Overview](#overview)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [Build Pipeline](#-build-pipeline)
- [Physics Experiments (26 Total)](#-physics-experiments-26-total)
- [Architecture](#-architecture)
- [API Reference](#-api-reference)
- [Database Schema](#-database-schema)
- [Key Scripts](#-key-scripts)
- [Troubleshooting](#-troubleshooting)
- [Sub-Project READMEs](#-sub-project-readmes)

---

## Overview

Circuit.IQ is a **three-part** full-stack application:

| Component | Directory | Tech | Port |
|-----------|-----------|------|------|
| **React Portal** | `circuit.iq (1)final/` | React 19 + TypeScript + TailwindCSS 4 | `3000` |
| **3D Lab Simulator** | `LABfront-IQ-3D/` | Three.js r184 + Vite 8 + Vanilla JS | Embedded via iframe |
| **Python Backend** | `LABback-IQ/` | Flask 3.1 + Gemini AI + SQLite/Supabase | `5000` |

**Key features:**
- 🔬 **26 interactive physics experiments** across 6 domains
- 🧪 **3D breadboard** with drag-and-drop components, real-time wiring, and electron animation
- 🤖 **AI Mentor** powered by Google Gemini (with local rule-based fallback)
- 📊 **Live meters** (V, I, Z, P), oscilloscope, V-I graph, and observation table
- 📄 **Automated PDF lab reports** with aim, theory, data, graphs, viva Q&A, and grading
- 💾 **Circuit persistence** — auto-saves to SQLite (local) or Supabase (cloud)
- 🎓 **Assessment engine** with viva questions, scoring, and grade calculation

---

## 📁 Project Structure

```
Circuit.IQ/
│
├── README.md                         # ← You are here (root documentation)
├── DEVELOPER_GUIDE.md                # Developer recipes & architecture guide
├── start_dev.py                      # 🚀 Unified dev startup (runs backend + frontend)
├── build_all.py                      # 🏗️ Production build automation script
├── schema.sql                        # Supabase PostgreSQL schema (tables, RLS, seeds)
├── customise.sql                     # Database column extensions & customizations
├── circuit_iq.db                     # Local SQLite database file (auto-created)
├── .gitignore                        # Git ignore rules
│
├── LABback-IQ/                       # 🐍 PYTHON BACKEND SERVER
│   ├── main.py                       #   Startup entrypoint (delegates to app.py)
│   ├── app.py                        #   Flask factory — CORS, blueprints, static serving
│   ├── config.py                     #   Environment config loader (.env → Config class)
│   ├── physics_engine.py             #   ⚡ Rigid physics solver & DFS topology checker
│   ├── ai_guide.py                   #   🤖 Local rule-based tutoring & quiz engine
│   ├── database.py                   #   💾 Dual DB interface (Supabase + SQLite fallback)
│   ├── test_physics.py               #   🧪 Unit tests for physics calculations
│   ├── requirements.txt              #   Python dependencies
│   ├── .env                          #   API keys & secrets (DO NOT COMMIT)
│   ├── .env.example                  #   Template for .env
│   ├── experiments/                   #   📂 Modular experiment calculation plugins
│   │   ├── __init__.py               #     Package loader & registry
│   │   ├── base_experiment.py        #     Abstract base class
│   │   ├── ohms.py                   #     Ohm's Law calculations
│   │   ├── lcr.py                    #     LCR resonance calculations
│   │   └── rc.py                     #     RC time constant calculations
│   └── routes/                       #   📂 Flask API blueprints
│       ├── __init__.py               #     Package init
│       ├── physics.py                #     POST /api/calculate, /api/validate
│       ├── physicsbot.py             #     POST /api/physicsbot/ask (Gemini AI)
│       ├── contact.py                #     POST /api/contact (Resend email)
│       ├── database_routes.py        #     GET/POST /api/db/* (circuit CRUD)
│       └── attendance.py             #     GET/POST /api/attendance/* (tracking)
│
├── LABfront-IQ-3D/                   # ⚡ 3D WEBGL VIRTUAL LAB SIMULATOR
│   ├── index.html                    #   HTML shell (topbar, panels, meters, AI chat)
│   ├── package.json                  #   NPM config (Three.js + Vite)
│   ├── vite.config.js                #   Vite build config with API proxy
│   ├── src/
│   │   ├── main.js                   #   ⭐ Core app (11,000+ lines — all frontend logic)
│   │   └── style.css                 #   🎨 Complete design system & panel styling
│   ├── public/                       #   Static assets (models, textures, icons)
│   │   ├── models/                   #     GLTF 3D models (breadboard, resistor, etc.)
│   │   └── *.svg, *.jpg              #     Icons, favicon, textures
│   └── dist/                         #   Built output (auto-generated by Vite)
│
└── circuit.iq (1)final/              # ⚛️ REACT MAIN PORTAL & WEBSITE
    ├── index.html                    #   Root HTML template
    ├── package.json                  #   NPM config (React, TailwindCSS, Three.js, Zustand)
    ├── vite.config.ts                #   Vite config with API proxy to port 5000
    ├── tsconfig.json                 #   TypeScript configuration
    ├── src/
    │   ├── main.tsx                  #   React DOM entry point
    │   ├── App.tsx                   #   🧭 Router & page transition shell
    │   ├── index.css                 #   Global styles & Tailwind imports
    │   ├── store/
    │   │   └── useAppStore.ts        #   📦 Zustand global state store
    │   ├── pages/
    │   │   ├── LandingPage.tsx       #   🏠 Homepage — catalog, domains, AI console
    │   │   ├── LabStudio.tsx         #   🔬 Fullscreen iframe wrapper for 3D lab
    │   │   └── ContactPage.tsx       #   📞 Support portal & ticket submission
    │   ├── components/
    │   │   ├── Navbar.tsx            #   Navigation bar
    │   │   ├── AntigravityHero.tsx   #   3D floating hero animation
    │   │   ├── PhysicsBotPanel.tsx   #   AI PhysicsBot chat panel
    │   │   ├── PhysicsShowcase.tsx   #   Interactive showcase widgets
    │   │   ├── InteractiveCircuitLines.tsx  # Neural plexus background
    │   │   ├── InteractiveBreadboard.tsx    # Breadboard visualization
    │   │   ├── CyberpunkLedMatrix.tsx       # LED matrix animation
    │   │   ├── AttendanceSystem.tsx  #   Student attendance tracker
    │   │   └── TeamRolesSection.tsx  #   Team cards & demo consoles
    │   └── lib/                      #   Utility libraries
    └── public/                       #   Static assets
        ├── lab.html                  #   Built 3D lab (copied from LABfront-IQ-3D/dist)
        └── assets/                   #   Built lab JS/CSS bundles
```

---

## 📋 Prerequisites

| Tool | Version | Required For |
|------|---------|-------------|
| **Python** | 3.8+ | Backend server, physics engine |
| **Node.js** | 18+ | Frontend builds, dev servers |
| **npm** | 9+ | Package management |
| **Git** | Any | Version control |

---

## 🚀 Quick Start

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/SYEDTUFAILANDRABI/Circuit.IQ.git
cd Circuit.IQ

# Install Python dependencies
cd LABback-IQ
pip install -r requirements.txt
cd ..

# Install 3D Lab dependencies
cd LABfront-IQ-3D
npm install
cd ..

# Install React Portal dependencies
cd "circuit.iq (1)final"
npm install
cd ..
```

### 2. Configure Environment

```bash
# Copy example environment file
cp LABback-IQ/.env.example LABback-IQ/.env

# Edit .env and add your API keys (see Environment Variables section)
```

### 3. Run in Development Mode

```bash
# Single command to start everything:
python start_dev.py
```

This launches:
- **Python backend** on [http://localhost:5000](http://localhost:5000)
- **React dev server** on [http://localhost:3000](http://localhost:3000) (proxies `/api` → port 5000)
- Auto-opens Chrome to the portal

Press `Ctrl+C` to stop both servers.

### 4. Open the App

Navigate to **http://localhost:3000** → Select an experiment → Click **"Launch Lab"**

---

## 🔑 Environment Variables

All environment variables are stored in `LABback-IQ/.env`. Copy from `.env.example`:

| Variable | Required | Description |
|----------|----------|-------------|
| `SECRET_KEY` | No | Flask session secret (defaults to dev key) |
| `FLASK_DEBUG` | No | Enable debug mode (`true`/`false`) |
| `GEMINI_API_KEY` | **Recommended** | Google Gemini API key for AI Mentor & PhysicsBot |
| `SUPABASE_URL` | No | Supabase project URL (for cloud DB) |
| `SUPABASE_ANON_KEY` | No | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Supabase service role key |
| `RESEND_API_KEY` | No | Resend.com key for contact form emails |
| `CONTACT_TO_EMAIL` | No | Email address for contact notifications |
| `PORT` | No | Backend port (default: `5000`) |

> **Graceful Fallbacks:**
> - No `GEMINI_API_KEY` → AI uses local rule-based formulas and guidance
> - No `SUPABASE_*` keys → Database falls back to local SQLite (`circuit_iq.db`)
> - No `RESEND_API_KEY` → Contact form logs to console instead of sending email

---

## 🏗️ Build Pipeline

### Development (Hot Reload)

```bash
python start_dev.py     # Runs backend + frontend concurrently
```

### Production Build

```bash
# Option A: Automated (recommended)
python build_all.py

# Option B: Manual step-by-step
# Step 1: Build the 3D Lab
cd LABfront-IQ-3D
npm run build

# Step 2: Copy lab assets to React public folder
# (build_all.py does this automatically)

# Step 3: Build the React Portal
cd "../circuit.iq (1)final"
npm run build
```

**Build flow:**
```
LABfront-IQ-3D/src/ ──► Vite build ──► dist/index.html + dist/assets/
                                              │
                              Copy as lab.html + assets/ to:
                                              │
                                              ▼
                    circuit.iq (1)final/public/lab.html
                    circuit.iq (1)final/public/assets/
                                              │
                              React Vite build │
                                              ▼
                    circuit.iq (1)final/dist/   ← Served by Flask
```

### Running Production Build

```bash
cd LABback-IQ
python main.py          # Serves built files from dist/ on port 5000
```

---

## 🔬 Physics Experiments (26 Total)

### ⚡ Electricity & Circuits (8 experiments)

| # | Key | Experiment | Key Formula | Components |
|---|-----|-----------|-------------|------------|
| 1 | `ohms` | Ohm's Law Verification | `V = I × R` | Source, Resistor |
| 2 | `kvl` | Kirchhoff's Voltage Law | `ΣV = 0` | Source, Resistor |
| 3 | `kcl` | Kirchhoff's Current Law | `ΣI_in = ΣI_out` | Source, Resistor |
| 4 | `rc_rl_rlc` | LCR AC Impedance | `Z = √[R² + (XL−XC)²]` | Source, R, L, C |
| 5 | `lcr` | Series LCR Resonance | `f₀ = 1/(2π√LC)` | Source, R, L, C |
| 6 | `rc` | RC Time Constant | `τ = R × C` | Source, R, C |
| 7 | `series_parallel` | Series & Parallel Loads | `1/R_eq = 1/R1 + 1/R2` | Source, Resistor |
| 8 | `wheatstone` | Wheatstone Bridge | `Rx = R3 × (R2/R1)` | Source, Resistor |

### 🔌 Semiconductor & Components (3 experiments)

| # | Key | Experiment | Key Formula | Components |
|---|-----|-----------|-------------|------------|
| 9 | `diode_iv` | Diode I-V Characteristics | `I = Is(e^(Vd/nVt) − 1)` | Source, R, Diode |
| 10 | `voltage_divider` | Voltage & Current Divider | `Vout = Vin × R2/(R1+R2)` | Source, Resistor |
| 11 | `arduino_led` | Arduino LED Control | `I = (Vpin − Vled)/R` | Source, Button, LED, R |

### 🧲 Electromagnetism (5 experiments)

| # | Key | Experiment | Key Formula |
|---|-----|-----------|-------------|
| 12 | `faraday` | Faraday's Induction Law | `E = −N(ΔΦ/Δt)` |
| 13 | `lenz` | Lenz's Law Demonstration | Direction opposes `dΦ/dt` |
| 14 | `solenoid` | Solenoid Magnetic Field | `B = μ₀nI` |
| 15 | `transformer` | AC Transformer Ratio | `Vs/Vp = Ns/Np` |
| 16 | `biot_savart` | Biot-Savart's Law | `B = μ₀I/(2πr)` |

### ⚛️ Modern & Quantum Physics (6 experiments)

| # | Key | Experiment | Key Formula |
|---|-----|-----------|-------------|
| 17 | `planck_led` | Planck's Constant (LEDs) | `h = (eVthλ)/c` |
| 18 | `planck_photocell` | Planck's Constant (Photocell) | `eVs = hf − Φ` |
| 19 | `photoelectric` | Photoelectric Effect | `Kmax = hν − Φ` |
| 20 | `radioactive` | Radioactive Decay | `N(t) = N₀e^(−λt)` |
| 21 | `de_broglie` | de Broglie Matter Wave | `λ = h/(mv)` |
| 22 | `bohr_model` | Bohr Hydrogen Atom | `ΔE = 13.6(1/nf² − 1/ni²) eV` |

### 🔥 Thermodynamics (4 experiments)

| # | Key | Experiment | Key Formula |
|---|-----|-----------|-------------|
| 23 | `stefan_law` | Stefan's Law | `P = σεAT⁴` |
| 24 | `ideal_gas` | Ideal Gas Equation | `PV = nRT` |
| 25 | `boyle` | Boyle's Law | `P₁V₁ = P₂V₂` |
| 26 | `charles` | Charles's Law | `V₁/T₁ = V₂/T₂` |

> **Note:** Experiments 1–11 use the **interactive 3D breadboard** with drag-and-drop components.
> Experiments 12–26 use **parameter sliders** and specialized visualization widgets.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser (User's Machine)                  │
│                                                              │
│  ┌──────────────────────┐    ┌───────────────────────────┐  │
│  │   React Portal        │    │   3D Lab Simulator        │  │
│  │   (Port 3000)         │    │   (Embedded iframe)       │  │
│  │                       │    │                           │  │
│  │  • Landing Page       │    │  • Three.js breadboard    │  │
│  │  • Experiment Catalog │    │  • Wire drawing engine    │  │
│  │  • PhysicsBot AI      │◄──►│  • Component placement   │  │
│  │  • Contact Page       │    │  • Oscilloscope/Graph     │  │
│  │  • Attendance System  │    │  • PDF report generation  │  │
│  └──────────┬───────────┘    └──────────┬────────────────┘  │
│             │                           │                    │
└─────────────┼───────────────────────────┼────────────────────┘
              │  /api/*                   │  /api/*
              ▼                           ▼
┌─────────────────────────────────────────────────────────────┐
│              Flask Backend Server (Port 5000)                │
│                                                              │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ physics.py   │  │ physicsbot.py│  │ database_routes  │   │
│  │  /calculate  │  │  /ask        │  │  /save-circuit   │   │
│  │  /validate   │  │  (Gemini AI) │  │  /load-circuit   │   │
│  └──────┬──────┘  └──────┬───────┘  └──────┬───────────┘   │
│         │                │                  │                │
│         ▼                ▼                  ▼                │
│  physics_engine.py  Google Gemini     database.py           │
│  (DFS solver)       (AI responses)    (SQLite / Supabase)   │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User selects experiment** → React Portal loads the 3D Lab iframe with `?exp=<key>`
2. **User builds circuit** → Drag components, draw wires on 3D breadboard
3. **User clicks "Initialize"** → Frontend calls `POST /api/validate` + `POST /api/calculate`
4. **Results display** → Live meters update, oscilloscope draws waveforms, graph plots data
5. **Auto-save** → Circuit layout auto-persists to SQLite/Supabase every change
6. **Reload** → `loadCircuitFromBackend()` restores exact component + wire positions

---

## 🌐 API Reference

### Physics Calculation

```
POST /api/calculate
```

| Field | Type | Description |
|-------|------|-------------|
| `params` | `object` | `{ V, R, L, C, f, T }` — slider values |
| `active_experiment` | `string` | Experiment key (e.g., `"ohms"`) |
| `button_pressed` | `boolean` | Tactile switch state |

**Response:** `{ V, I, Z, P, XL, XC, phi, f0 }`

---

### Circuit Validation

```
POST /api/validate
```

| Field | Type | Description |
|-------|------|-------------|
| `placed_components` | `array` | `[{ type, id, terminals }]` |
| `wires` | `array` | Wire connection pairs |
| `required_types` | `array` | Required component types for experiment |

**Response:** `{ valid: true/false, message: "..." }`

---

### AI PhysicsBot

```
POST /api/physicsbot/ask
```

| Field | Type | Description |
|-------|------|-------------|
| `question` | `string` | User's physics question |

**Response:** `{ answer, formulas[], recommended_experiment }`

---

### Circuit Persistence

```
POST /api/db/save-circuit    — Save/update circuit layout
GET  /api/db/load-circuit    — Load saved circuit (query: experiment_type, user_id)
GET  /api/db/experiment-logs — Get experiment attempt history
POST /api/db/experiment-log  — Save experiment result log
GET  /api/db/profile         — Get user profile
POST /api/db/profile         — Create/update user profile
```

---

### Contact Form

```
POST /api/contact
```

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Sender name |
| `email` | `string` | Sender email |
| `message` | `string` | Support message |

---

## 💾 Database Schema

The app uses **dual database support**: Supabase (PostgreSQL) for production, SQLite for local development.

### Tables

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `profiles` | User profiles | `id`, `full_name`, `university`, `semester`, `graduation_year`, `role`, `phone` |
| `circuits` | Saved circuit layouts | `id`, `user_id`, `name`, `circuit_data` (JSONB), `status`, `is_public`, `tags` |
| `experiment_logs` | Experiment attempt records | `id`, `user_id`, `circuit_id`, `experiment_type`, `results`, `score`, `duration_seconds` |

### Circuit Data Format (JSONB)

```json
{
  "placedComponents": [
    { "type": "source", "snap1": 14, "snap2": 15 },
    { "type": "resistor", "snap1": 130, "snap2": 200 }
  ],
  "wires": [
    { "fromHole": 14, "toHole": 130 },
    { "fromHole": 200, "toHole": 15 }
  ],
  "params": { "V": 12, "R": 100, "L": 50, "C": 100, "f": 50, "T": 25 },
  "experiment_type": "ohms"
}
```

### SQL Files

| File | Purpose |
|------|---------|
| `schema.sql` | Base Supabase schema — tables, triggers, RLS policies, seed data |
| `customise.sql` | Column extensions — adds `graduation_year`, `role`, `phone`, `tags`, `score`, etc. |

---

## 🔧 Key Scripts

| Script | Command | What It Does |
|--------|---------|-------------|
| `start_dev.py` | `python start_dev.py` | Runs Flask backend + React dev server concurrently |
| `build_all.py` | `python build_all.py` | Builds 3D lab → copies to React → builds React portal |
| `test_physics.py` | `python LABback-IQ/test_physics.py` | Runs physics engine unit tests |

---

## ❓ Troubleshooting

| Problem | Solution |
|---------|----------|
| `ModuleNotFoundError: flask` | Run `pip install -r LABback-IQ/requirements.txt` |
| `npm ERR! missing script: dev` | Run `npm install` in the relevant directory first |
| 3D models not loading | Check `LABfront-IQ-3D/public/models/` paths |
| API calls returning 404 | Ensure Python backend is running on port 5000 |
| White screen in lab | Open browser DevTools console for JS errors |
| Database not saving | Check `.env` Supabase keys or verify `circuit_iq.db` exists |
| AI Mentor not responding | Add `GEMINI_API_KEY` to `LABback-IQ/.env` |
| Build fails after code changes | Run `python build_all.py` to rebuild everything |
| Port already in use | Kill processes on ports 3000/5000, then restart |

---

## 📖 Sub-Project READMEs

Each sub-project has its own detailed README:

| Sub-Project | README Location |
|-------------|----------------|
| Python Backend | [`LABback-IQ/README.md`](LABback-IQ/README.md) |
| 3D Lab Simulator | [`LABfront-IQ-3D/README.md`](LABfront-IQ-3D/README.md) |
| React Portal | [`circuit.iq (1)final/README.md`](circuit.iq%20(1)final/README.md) |
| Developer Guide | [`DEVELOPER_GUIDE.md`](DEVELOPER_GUIDE.md) |

---

<div align="center">

**Built with ❤️ by the Circuit.IQ Team**

*Python · Flask · React · Three.js · Gemini AI · Supabase*

</div>
]]>
