# Circuit IQ — Virtual Physics Lab

> A full-stack 3D virtual physics laboratory for learning and verifying circuit laws through interactive simulation.

---

## 📁 Full Project Structure

```
project phy/
│
├── Circuit-IQ/                        ← 🐍 PYTHON BACKEND
│   │
│   ├── main.py                        ← 🚀 Entry Point — Run this to launch everything
│   │                                     → Starts HTTP server on http://localhost:5000
│   │                                     → Auto-opens the 3D lab in your browser
│   │
│   ├── server.py                      ← 🌐 HTTP Server
│   │                                     → Serves Circuit-IQ-3D/dist/ (built frontend)
│   │                                     → API: POST /api/calculate (physics calc)
│   │                                     → API: POST /api/validate  (circuit check)
│   │
│   ├── physics_engine.py              ← ⚡ Physics Engine
│   │                                     → Circuit calculation delegator & validator
│   │                                     → Temperature-corrected resistance
│   │                                     → DFS circuit topology validation
│   │
│   ├── ai_guide.py                    ← 🤖 AI Guide Module
│   │                                     → Experiment theory, steps, viva Q&A
│   │                                     → Contextual hints, progress tracking
│   │
│   ├── experiments/                   ← 📂 Experiments Package
│   │   ├── __init__.py                ← Dynamic module discovery & registry
│   │   ├── base_experiment.py         ← Abstract Base Experiment class
│   │   ├── ohms.py                    ← Ohm's Law calculations
│   │   ├── lcr.py                     ← LCR Resonance calculations
│   │   └── rc.py                      ← RC charging/discharging calculations
│   │
│   ├── test_physics.py                ← 🧪 Unit Tests for physics engine
│   └── README.md                      ← Python backend documentation
│
└── Circuit-IQ-3D/                     ← 🌐 3D WEB FRONTEND (Vite + Three.js)
    │
    ├── index.html                     ← 🏠 HTML Shell — All UI layout, panels
    │
    ├── src/                           ← 🧠 Source Code
    │   ├── main.js                    ← ⭐ MAIN APP — All 3D logic
    │   │                                 Three.js, experiments, UI, PDF report, API
    │   └── style.css                  ← 🎨 All styles — Layout, components, theming
    │
    ├── public/                        ← 📂 Static Assets
    │   ├── favicon.svg                ← App icon
    │   ├── icons.svg                  ← UI icon sprite
    │   ├── DefaultMaterial_baseColor.jpg  ← Breadboard PBR texture
    │   └── models/                    ← 3D GLTF Models
    │       ├── breadboard/
    │       ├── resistor/
    │       └── electronic_components/
    │
    ├── dist/                          ← 📦 Production Build Output (auto-generated)
    ├── package.json                   ← NPM: Vite + Three.js
    └── README.md                      ← Frontend documentation
```

---

## 🚀 Quick Start

### Option 1 — Full Stack (Python + 3D Frontend)

```bash
# Step 1: Build the frontend first (only needed once or after changes)
cd Circuit-IQ-3D
npm install
npm run build

# Step 2: Launch the Python backend server
cd ..
python Circuit-IQ/main.py

# → Opens http://localhost:5000 in your browser automatically
```

### Option 2 — Frontend Dev Mode (hot-reload)

```bash
cd Circuit-IQ-3D
npm run dev
# → Opens http://localhost:5173 (uses local JS calculations, no Python needed)
```

---

## 🔬 Experiments Available

| # | Experiment | Type | What's Verified |
|---|-----------|------|----------------|
| 1 | **Ohm's Law** | DC | V = I×R, V-I linear graph |
| 2 | **Series LCR Resonance** | AC | Z=√(R²+(XL−XC)²), f₀=1/(2π√LC) |
| 3 | **RC Time Constant** | AC | τ=RC, V_C=V_s(1−e^(−t/τ)) |

---

## 🗂️ Where to Make Changes

### Change Experiment Theory / Steps / Viva
→ Edit `Circuit-IQ-3D/src/main.js`  
→ Find `const experiments = {` (line ~186)  
→ Find `const assessmentQuestions = {` for viva questions

### Change Experiment Physics Calculations
→ Edit `Circuit-IQ/physics_engine.py`  
→ Method: `calculate(exp_type, button_pressed)`

### Change UI Layout / Colors
→ Edit `Circuit-IQ-3D/src/style.css`  
→ CSS Variables in `:root {}` for theme colors  
→ Edit `Circuit-IQ-3D/index.html` for structural changes

### Change AI Mentor Hints
→ Edit `Circuit-IQ/ai_guide.py` (Python data)  
→ Or edit `updateAIMentor()` in `main.js` (JS inline hints)

### Add a New Experiment
1. Add entry to `experiments{}` in `main.js`
2. Add questions to `assessmentQuestions{}` in `main.js`
3. Create a new subclass in `Circuit-IQ/experiments/` (e.g. `faraday.py`) inheriting from `BaseExperiment`
4. Add experiment key to the `<select>` dropdown in `index.html`

---

## 🏗️ Architecture

```
Browser (Three.js 3D Lab)
        │
        ├── Local JS simulation (calculateCircuitLocal)  ← used in dev
        │
        └── POST /api/calculate  ──→  Python HTTP Server (server.py)
            POST /api/validate   ──→      └── PhysicsEngine (physics_engine.py)
```

---

## 🔧 Dependencies

### Python Backend
- Python 3.8+
- No external packages required (uses built-in standard library)

### JavaScript Frontend
- Node.js 18+
- `npm install` (installs Three.js + Vite from package.json)

---

## 📄 Lab Report Download

The app generates a full **PDF lab report** via the browser print dialog:
- Aim, Apparatus, Theory, Formulas
- Step-by-step Procedure
- Observation Table with recorded data
- Graph instructions
- All Viva Q&A with correct answers and explanations
- Auto-generated scientific Conclusion
- Grade badge and score bar

---

## 📊 HD Downloads

| Button | What it downloads |
|--------|------------------|
| 📥 Graph HD | 2000×1500px PNG — V-I or f-Z plot with readings, labels, grid |
| 📥 Oscilloscope HD | 2000×1200px PNG — Dual-channel AC waveform with scale |
| 📄 Download Lab Report | Opens printable HTML → Save as PDF via browser |
