<![CDATA[# Circuit.IQ — 3D Virtual Lab Simulator

> **Three.js + Vite** · Interactive 3D breadboard · Component placement · Wire drawing · Real-time simulation

---

## 📑 Table of Contents

- [Overview](#overview)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Key Files Reference](#-key-files-reference)
- [main.js Section Map](#-mainjs-section-map)
- [Experiments](#-experiments)
- [3D Breadboard System](#-3d-breadboard-system)
- [Wire Drawing Engine](#-wire-drawing-engine)
- [Circuit Persistence](#-circuit-persistence)
- [API Communication](#-api-communication)
- [PDF Lab Report](#-pdf-lab-report)
- [Tech Stack](#-tech-stack)
- [Build & Deploy](#-build--deploy)
- [Troubleshooting](#-troubleshooting)

---

## Overview

This is the **3D WebGL virtual lab simulator** — the core interactive experience of Circuit.IQ. It renders a photorealistic breadboard using Three.js and lets students:

- **Drag and drop** electronic components (resistors, capacitors, inductors, LEDs, diodes, etc.)
- **Draw wires** between breadboard holes with automatic color coding
- **Simulate circuits** with live voltage/current/power meters
- **View waveforms** on an oscilloscope and plot V-I graphs
- **Generate PDF lab reports** with recorded data and assessments

The simulator is embedded as an **iframe** inside the React Portal and communicates with the Flask backend via REST APIs.

---

## 📁 Project Structure

```
LABfront-IQ-3D/
│
├── index.html                 ← 🏠 HTML Shell — Complete UI layout
│                                 • Topbar with experiment selector
│                                 • Left panel (theory, steps, protocol)
│                                 • Center 3D canvas workspace
│                                 • Right panel (meters, sliders, diagnostics)
│                                 • AI Mentor chat panel
│                                 • Floating oscilloscope & graph panels
│                                 • Component sidebar chips
│                                 • Status bar with DB indicator
│
├── package.json               ← 📦 NPM config (Three.js ^0.184 + Vite ^8.0)
├── vite.config.js             ← ⚙️ Vite build config with API proxy → port 5000
├── .gitignore                 ← Git ignore rules
│
├── src/                       ← 🧠 SOURCE CODE
│   ├── main.js                ← ⭐ CORE APPLICATION (11,000+ lines)
│   │                              All rendering, logic, simulation, and UI
│   │                              See Section Map below for navigation
│   │
│   └── style.css              ← 🎨 COMPLETE DESIGN SYSTEM
│                                  CSS variables, glassmorphism panels,
│                                  dark theme, responsive layout
│
├── public/                    ← 📂 STATIC ASSETS (served as-is)
│   ├── favicon.svg            ←   App favicon
│   ├── icons.svg              ←   SVG sprite sheet for UI icons
│   ├── DefaultMaterial_baseColor.jpg ← Breadboard PBR texture
│   └── models/                ←   3D GLTF Model Files
│       ├── breadboard/        ←     Breadboard base model
│       ├── resistor/          ←     Ceramic resistor model
│       └── electronic_components/ ← Capacitor, inductor, LED models
│
└── dist/                      ← 📦 BUILT OUTPUT (auto-generated)
    ├── index.html             ←   Bundled HTML
    └── assets/                ←   Bundled JS, CSS, textures
        ├── index-[hash].js    ←   Minified application bundle
        └── index-[hash].css   ←   Minified styles
```

---

## 🚀 Quick Start

### Development Mode

```bash
cd LABfront-IQ-3D

# Install dependencies (first time only)
npm install

# Start Vite dev server with hot-reload
npm run dev
# → Opens at http://localhost:5173
```

> **Note:** In dev mode, circuit calculations run **locally in JavaScript** via `calculateCircuitLocal()`. The Python backend is optional but recommended for full features.

### Production Build

```bash
npm run build     # Outputs to dist/
npm run preview   # Preview the production build locally
```

After building, the `dist/` contents are copied to the React Portal's `public/` folder by `build_all.py`.

---

## 📋 Key Files Reference

| File | Lines | What To Edit |
|------|-------|-------------|
| `src/main.js` | ~11,000 | Experiments, 3D visuals, UI logic, API calls, PDF generation |
| `src/style.css` | ~900 | Colors, layout, typography, panel styling, animations |
| `index.html` | ~1,600 | Add new UI panels, change HTML structure, add controls |
| `public/models/` | — | Replace or add GLTF 3D models |
| `vite.config.js` | ~50 | Build settings, API proxy configuration |

---

## 🗺️ main.js Section Map

Navigate the monolithic `main.js` by searching for `// ---` section markers:

| Line Range | Section | Description |
|-----------|---------|-------------|
| `~1–80` | Imports & Templates | Three.js imports, GLTF model templates |
| `~107–167` | State Management | `state` object — all app state variables |
| `~169–175` | Electron Animation | Flowing electron particle system |
| `~177–265` | DOM Elements | `elements` object — all DOM references |
| `~267–615` | Experiment Data | `experiments{}` schemas — aim, apparatus, steps, theory, formulas |
| `~617–700` | Assessment Questions | `assessmentQuestions{}` — viva Q&A with explanations |
| `~702–850` | Circuit Simulation | `calculateCircuitLocal()` — local JS physics solver |
| `~850–1000` | Polling Engine | `startPollingCalculations()` — timed recalculation |
| `~1000–1400` | UI Updates | `updateUI()`, `updateMeters()`, meter displays |
| `~1400–1800` | Tab Router | Tab switching, observation table, AI mentor |
| `~1800–2200` | Setup Experiment | `setupExperiment(expKey)` — full experiment initialization |
| `~2200–2600` | Component Sidebar | Sidebar chip rendering, search, drag start |
| `~2600–3000` | Floating Panels | Oscilloscope/graph panels, draggable logic |
| `~3000–3500` | PDF Lab Report | `generateLabReportPDF()` — full printable report |
| `~3500–4000` | Event Listeners | Click, drag, drop, keyboard, slider events |
| `~4000–4500` | Circuit Validation | `validateCircuitLocal()` — union-find closed loop check |
| `~4500–5000` | Auto-Build | `autoSetupExperiment()` — auto-place components & wires |
| `~5000–5500` | 3D Scene Setup | `initScene()` — Three.js renderer, camera, lights |
| `~5500–6000` | Breadboard 3D | `createBreadboard3D()` — holes, rails, labels |
| `~6000–6500` | Wire Visuals | `createWireCurve()`, `create3DWire()`, wire layering |
| `~6500–7500` | Component Visuals | `createComponentVisuals()` — all 3D component meshes |
| `~7500–8000` | Animation Loop | `anim()` — requestAnimationFrame, electron motion |
| `~8000–8500` | Graph Drawing | `drawGraph()` — V-I plot, f-Z resonance curve |
| `~8500–9000` | Oscilloscope | `drawOscilloscope()` — real-time waveform display |
| `~9000–9500` | Inspector Panel | Component info, right-click context |
| `~9500–10000` | Resistor Bands | Color band calculator for resistance values |
| `~10000–10500` | Wire System | `create3DWire()`, snapping, redirection, overlap prevention |
| `~10500–11000` | DB Persistence | `saveCircuitToBackend()`, `loadCircuitFromBackend()` |
| `~11000–11337` | Main Init | `window.addEventListener('load', ...)` — bootstrap |

---

## 🔬 Experiments

### Breadboard-Based (Interactive Components)

| Key | Name | Graph Type | Components |
|-----|------|-----------|------------|
| `ohms` | Ohm's Law | V vs I (linear) | Source, Resistor |
| `kvl` | Kirchhoff's Voltage Law | — | Source, Resistor |
| `kcl` | Kirchhoff's Current Law | — | Source, Resistor |
| `rc_rl_rlc` | LCR AC Impedance | f vs Z (U-curve) | Source, R, L, C |
| `lcr` | Series LCR Resonance | f vs Z (U-curve) | Source, R, L, C |
| `rc` | RC Time Constant | t vs Vc (exponential) | Source, R, C |
| `series_parallel` | Series & Parallel | — | Source, Resistor |
| `wheatstone` | Wheatstone Bridge | — | Source, Resistor |
| `diode_iv` | Diode I-V Curve | V vs I (exponential) | Source, R, Diode |
| `voltage_divider` | Voltage Divider | — | Source, Resistor |
| `planck_led` | Planck's Constant | — | Source, R, LED |
| `arduino_led` | Arduino LED | R vs I (hyperbola) | Source, Button, LED, R |

### Slider-Based (Parameter Visualization)

| Key | Name | Key Formula |
|-----|------|-------------|
| `faraday` | Faraday's Induction | E = −N(ΔΦ/Δt) |
| `lenz` | Lenz's Law | Direction opposes dΦ/dt |
| `solenoid` | Solenoid Field | B = μ₀nI |
| `transformer` | AC Transformer | Vs/Vp = Ns/Np |
| `biot_savart` | Biot-Savart's Law | B = μ₀I/(2πr) |
| `planck_photocell` | Photocell Method | eVs = hf − Φ |
| `stefan_law` | Stefan's Law | P = σεAT⁴ |
| `ideal_gas` | Ideal Gas | PV = nRT |
| `boyle` | Boyle's Law | P₁V₁ = P₂V₂ |
| `charles` | Charles's Law | V₁/T₁ = V₂/T₂ |
| `specific_heat` | Specific Heat | Q = mcΔT |
| `photoelectric` | Photoelectric Effect | Kmax = hν − Φ |
| `radioactive` | Radioactive Decay | N(t) = N₀e^(−λt) |
| `de_broglie` | de Broglie Wave | λ = h/(mv) |
| `bohr_model` | Bohr Atom | ΔE = 13.6(1/nf²−1/ni²) eV |

---

## 🔧 3D Breadboard System

### Snap Point Grid

The breadboard uses a **grid of snap points** (holes) indexed 0–883:

```
Rows 0–29 (columns)  ×  14 positions per row  =  420 holes
+ Power rail holes (positive: snap 882, negative: snap 883)
```

**Snap index formula:** `snapIndex = row × 14 + column`

### Component Types

| Type | Display | Span (holes) |
|------|---------|------|
| `source` | DC Power Supply | 2 |
| `resistor` | Ceramic Resistor (with color bands) | 5 |
| `capacitor` | Electrolytic Capacitor | 4 |
| `inductor` | Toroid Inductor | 5 |
| `led` | Light Emitting Diode | 2 |
| `diode` | PN Junction Diode | 3 |
| `ammeter` | Current Meter | 5 |
| `voltmeter` | Voltage Meter | 5 |
| `button` | Tactile Push Switch | crosses center ravine |
| `toggle_switch` | Toggle On/Off Switch | 3 |

### Component Placement Flow

```
User drags chip from sidebar
        │
        ▼
Ghost preview follows mouse
        │
        ▼
Drop on breadboard hole
        │
        ▼
placeComponent3D(type, snap1, snap2)
        │
        ▼
3D mesh created in scene + state.placedComponents[] updated
        │
        ▼
Auto-save to database
```

---

## 🔌 Wire Drawing Engine

### Wire Creation Flow

```
User selects "Wire" tool → clicks start hole → clicks end hole
        │
        ▼
create3DWire(snap1, snap2, isUserClick)
        │
        ├── isUserClick = true:  Apply getRedirectedSnap() (avoid occupied holes)
        └── isUserClick = false: Use exact coordinates (database restore)
        │
        ▼
createWireCurve(p1, p2, seed, wireIndex)
        │
        ├── Auto-calculates Bézier curve height
        ├── Wire index layering (prevents overlap)
        └── Avoids power supply bounding box
        │
        ▼
TubeGeometry + MeshStandardMaterial
        │
        ▼
4 electron spheres added for animation
```

### Wire Color Coding

| Condition | Color | Meaning |
|-----------|-------|---------|
| Connected to positive rail | 🔴 Red | Power positive |
| Connected to negative rail | ⚫ Dark | Ground / negative |
| Signal wire (1st) | 🔵 Blue | General signal |
| Signal wire (2nd) | 🟢 Green | General signal |
| Signal wire (3rd) | 🟠 Orange | General signal |
| Signal wire (4th) | 🟣 Purple | General signal |

---

## 💾 Circuit Persistence

### Save Flow

```
Component placed or wire drawn
        │
        ▼
saveCircuitToBackend() (auto-triggered)
        │
        ▼
POST /api/db/save-circuit
{
  "experiment_type": "ohms",
  "user_id": "a1b2c3d4-...",
  "circuit_data": {
    "placedComponents": [{ type, snap1, snap2 }],
    "wires": [{ fromHole, toHole }],
    "params": { V, R, L, C, f, T }
  }
}
```

### Load Flow

```
Page load / experiment switch
        │
        ▼
loadCircuitFromBackend(expKey)
        │
        ▼
GET /api/db/load-circuit?experiment_type=ohms&user_id=...
        │
        ▼
Rebuild components: placeComponent3D(type, snap1, snap2)
Rebuild wires: create3DWire(fromHole, toHole, false)  ← exact positions
Restore sliders: updateParameterValue(key, value)
```

> **Important:** Wires are loaded with `isUserClick = false` to bypass snap redirection and preserve exact saved positions.

---

## 🌐 API Communication

| Method | Endpoint | Purpose | When Called |
|--------|----------|---------|-------------|
| `POST` | `/api/calculate` | Get V, I, Z, P, XL, XC, φ, f₀ | Simulation running (polling) |
| `POST` | `/api/validate` | Check circuit topology | Before simulation start |
| `POST` | `/api/db/save-circuit` | Persist circuit layout | Auto on every change |
| `GET` | `/api/db/load-circuit` | Restore saved layout | On page load / experiment switch |

> **Dev mode fallback:** When running standalone (`npm run dev`), all calculations use `calculateCircuitLocal()` in JavaScript — no backend needed.

---

## 📄 PDF Lab Report

The **"Download Lab Report"** button generates a comprehensive printable PDF containing:

| Section | Content |
|---------|---------|
| 1. Header | Experiment name, student info, date |
| 2. Aim | Experiment objective |
| 3. Apparatus | Required equipment list |
| 4. Theory | Physics background & explanations |
| 5. Formulas | Key mathematical relationships |
| 6. Procedure | Step-by-step instructions |
| 7. Observation Table | Recorded data points |
| 8. Graph | V-I or f-Z plot instructions |
| 9. Viva Voce | Questions with detailed answers |
| 10. Conclusion | Auto-generated summary |
| 11. Assessment | Score and letter grade |

---

## 🛠️ Tech Stack

| Tool | Version | Role |
|------|---------|------|
| [Three.js](https://threejs.org) | ^0.184 | 3D WebGL rendering engine |
| [Vite](https://vitejs.dev) | ^8.0 | Build tool + dev server |
| Vanilla JS (ESM) | — | No framework — pure ES modules |
| HTML5 Canvas | — | Oscilloscope + graph rendering |
| CSS Variables | — | Design token system (dark theme) |
| GLTF Models | — | 3D component models |

---

## 🏗️ Build & Deploy

### Build for Production

```bash
npm run build     # Compiles to dist/
```

### Copy to React Portal

The `build_all.py` script (in project root) automates this:

```bash
python build_all.py
```

This:
1. Runs `npm run build` in `LABfront-IQ-3D/`
2. Copies `dist/index.html` → `circuit.iq (1)final/public/lab.html`
3. Copies `dist/assets/*` → `circuit.iq (1)final/public/assets/`
4. Runs `npm run build` in `circuit.iq (1)final/`

### Serving

In production, Flask serves the built lab from:
```
circuit.iq (1)final/dist/lab.html   → accessed via /lab.html
circuit.iq (1)final/dist/assets/*   → accessed via /assets/*
```

---

## ❓ Troubleshooting

| Problem | Solution |
|---------|----------|
| 3D models not loading | Verify `public/models/` has GLTF files; check browser console |
| API calls failing (404) | Ensure Python backend is running on port 5000 |
| Build errors | Run `npm install` then `npm run build` |
| White screen | Open DevTools console — look for JS runtime errors |
| PDF not downloading | Allow pop-ups for localhost in browser settings |
| Wires shifting on reload | Ensure `create3DWire` receives `false` flag during load |
| Components overlapping | Check `getOccupiedHoles()` bounding box calculations |
| Electron animation frozen | Verify `setElectronsActive(true)` is called when simulation starts |
| Textures missing | Check `public/DefaultMaterial_baseColor.jpg` exists |
]]>
