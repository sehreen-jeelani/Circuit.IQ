# ⚡ Circuit.IQ — 3D Lab Simulator

> The interactive 3D breadboard where students build circuits, draw wires, and run physics experiments.

---

## What This Does

This is the **heart** of Circuit.IQ — a Three.js application that renders a photorealistic breadboard and lets students:

- 🔌 **Drag and drop** components (resistors, capacitors, LEDs, diodes, etc.)
- 🔗 **Draw wires** between breadboard holes with automatic color coding
- ⚡ **Simulate circuits** with live voltage, current, and power meters
- 📊 **View waveforms** on an oscilloscope and plot V-I graphs
- 📄 **Generate PDF lab reports** with recorded data and grading
- 💾 **Auto-save** circuits to the database (restored exactly on reload)
- 🤖 **Redesigned AI Mentor Panel** — a premium glassmorphic interface with pulsing custom avatars, time logging, horizontal prompt suggestion chips, and a bouncing wave typing indicator.

This app runs inside an **iframe** embedded in the React website.

---

## 🚀 How to Run

### Development (standalone):
```bash
cd LABfront-IQ-3D
npm install
npm run dev        # → http://localhost:5173
```

### With the full app:
```bash
# From project root:
python start_dev.py    # Starts everything
```

### Build for production:
```bash
npm run build     # Outputs to dist/
# Then run build_all.py from project root to copy files
```

---

## 📁 File Guide

```
LABfront-IQ-3D/
├── index.html             ← UI layout (panels, meters, sliders, chat)
├── package.json           ← Dependencies (Three.js + Vite)
├── vite.config.js         ← Build settings + API proxy
│
├── src/
│   ├── main.js            ← ⭐ EVERYTHING (11,000 lines — see map below)
│   └── style.css          ← All visual styling (dark theme, glass panels)
│
├── public/
│   ├── models/            ← 3D models (GLTF format)
│   │   ├── breadboard/    ←   Breadboard base
│   │   ├── resistor/      ←   Ceramic resistor
│   │   └── electronic_components/  ← Capacitor, inductor, LED
│   ├── favicon.svg        ← App icon
│   └── icons.svg          ← UI icon sprites
│
└── dist/                  ← Built files (don't edit — auto-generated)
```

---

## 🗺️ Finding Code in main.js

The entire app is in one file. Search for `// ---` markers to jump between sections:

| What you're looking for | Search for | ~Line |
|------------------------|-----------|-------|
| App state variables | `STATE MANAGEMENT` | 107 |
| Experiment definitions (aim, steps, theory) | `EXPERIMENT DATA` | 267 |
| Viva questions & answers | `assessmentQuestions` | 617 |
| Physics math (local JS solver) | `calculateCircuitLocal` | 703 |
| Meter display updates | `updateMeters` | 1000 |
| Experiment initialization | `setupExperiment` | 1800 |
| Component sidebar chips | `updateComponentSidebar` | 2200 |
| PDF lab report generation | `generateLabReportPDF` | 3000 |
| Circuit validation (union-find) | `validateCircuitLocal` | 4000 |
| Auto-build preset circuits | `autoSetupExperiment` | 4500 |
| Three.js scene setup | `initScene` | 5000 |
| Breadboard 3D model | `createBreadboard3D` | 5500 |
| Wire drawing & curves | `create3DWire` | 10000 |
| Component 3D meshes | `createComponentVisuals` | 6500 |
| Animation loop | `anim()` | 7500 |
| Graph drawing (V-I plot) | `drawGraph` | 8000 |
| Oscilloscope waveform | `drawOscilloscope` | 8500 |
| Save circuit to database | `saveCircuitToBackend` | 10500 |
| Load circuit from database | `loadCircuitFromBackend` | 10730 |

---

## 🔧 How the Breadboard Works

### Snap Points (Holes)

The breadboard is a grid of **holes** indexed 0–883:

```
snap index = row × 14 + column

Row 0–29, Column 0–13 = 420 main holes
Special: snap 882 = positive rail, snap 883 = negative rail
```

### Component Types

| Component | What it looks like | Holes it spans |
|-----------|-------------------|---------------|
| `source` | DC Power Supply | 2 holes |
| `resistor` | Ceramic with color bands | 5 holes |
| `capacitor` | Electrolytic cylinder | 4 holes |
| `inductor` | Toroid coil | 5 holes |
| `led` | Light Emitting Diode | 2 holes |
| `diode` | PN Junction | 3 holes |
| `ammeter` | Current meter | 5 holes |
| `voltmeter` | Voltage meter | 5 holes |
| `button` | Push switch | Crosses center ravine |

### How Components Get Placed

```
Drag chip from sidebar → ghost preview follows mouse → drop on hole
    → placeComponent3D(type, snap1, snap2)
    → 3D mesh appears in scene
    → auto-saves to database
```

---

## 🔗 How Wires Work

### Drawing a Wire

```
Select "Wire" tool → click start hole → click end hole
    → create3DWire(snap1, snap2, isUserClick=true)
    → Bézier curve calculated → colored tube rendered
    → 4 electron particles added for animation
```

### Wire Colors

| Wire connects to... | Color |
|---------------------|-------|
| Positive power rail | 🔴 Red |
| Negative/ground rail | ⚫ Black |
| Signal (1st wire) | 🔵 Blue |
| Signal (2nd wire) | 🟢 Green |
| Signal (3rd wire) | 🟠 Orange |
| Signal (4th wire) | 🟣 Purple |

### Overlap Prevention

Wires automatically stack vertically so they don't cross through each other or through components.

### Reload Fidelity

When loading saved circuits:
- `create3DWire(fromHole, toHole, false)` — the `false` flag **skips** snap redirection
- This means wires appear in the **exact same position** they were saved in
- User-drawn wires use `true` so snapping to valid holes still works

---

## 💾 Save & Load System

### Saving (automatic)

Every time you place a component or draw a wire:
```
→ POST /api/db/save-circuit
  {
    experiment_type, user_id,
    circuit_data: { placedComponents, wires, params }
  }
```

### Loading (on page load)

```
→ GET /api/db/load-circuit?experiment_type=ohms&user_id=...
  → Rebuild each component: placeComponent3D(type, snap1, snap2)
  → Rebuild each wire: create3DWire(fromHole, toHole, false)
  → Restore slider values: updateParameterValue(key, value)
```

---

## 📄 PDF Lab Report

The "Download Lab Report" button generates a printable PDF with:

| Section | Content |
|---------|---------|
| Header | Experiment name, date |
| Aim | What the experiment proves |
| Apparatus | Equipment list |
| Theory | Physics background |
| Formulas | Key equations |
| Procedure | Step-by-step instructions |
| Observations | Recorded data table |
| Viva Q&A | Questions with answers |
| Conclusion | Auto-generated summary |
| Grade | Score and letter grade |

---

## 🎯 3D-to-2D Coordinate Projections & Dynamic Themes

### 1. Vector Projection System
The 3D simulator projects instructions and guide labels directly from WebGL space coordinates to HTML overlays:
- **`updateGuideLabels()`**: Runs inside the main render loop to track the world position of snap targets (`targetHighlightRing1`/`targetHighlightRing2`).
- **Mathematical Formula**:
  - Extracts the world position of the target mesh: `ring.getWorldPosition(tempV)`
  - Projects it to Normalized Device Coordinates (NDC): `tempV.project(camera)` (resulting in coordinates where $X, Y \in [-1, 1]$)
  - Multiplies coordinates by container dimensions to map to CSS pixel coordinates:
    $x_{px} = (x_{ndc} \times 0.5 + 0.5) \times \text{width}$
    $y_{px} = (-y_{ndc} \times 0.5 + 0.5) \times \text{height}$
- **Frustum Culling**: Checks if the target is behind the camera plane (`z > 1`) and automatically adds the `.hidden` class to prevent rendering out-of-bounds artifacts.
- **Float Alignment**: Leverages CSS offsets (`transform: translate(-50%, -100%)` and `margin-top: -8px`) to make guide pin bubbles hover precisely above active breadboard holes.

### 2. Live Theme Overrides
- **Message Listener**: Receives a `theme-change` postMessage event from the parent React website and triggers `setTheme(theme)`.
- **CSS Variable Injection**: Adds or removes the `.light-theme` class from `document.body` to adjust the colors of sidebars, panels, sliders, multimeters, and code blocks using pre-defined CSS variables.
- **WebGL Background Adjustments**: Dynamically changes `scene.background` and `scene.fog` hex values on-the-fly (`0xf1f5f9` in light mode, `0x070a13` in dark mode) to blend the 3D environment seamlessly into the page.

---

## 🛠️ Tech Stack

| Tool | Version | What it does |
|------|---------|-------------|
| Three.js | ^0.184 | 3D rendering (WebGL) |
| Vite | ^8.0 | Build tool + dev server |
| Vanilla JS | — | No framework — pure ES modules |
| HTML5 Canvas | — | Oscilloscope + graph drawing |

---

## ❓ Common Problems

| Problem | Cause / Symptom | Fix |
|---------|-----------------|-----|
| White screen / WebGL Crash | Chrome limits active WebGL contexts per session; frequent reloads exceed limit. | Reload the page or close other WebGL tabs. We have added `unload` handlers in `main.js` and React `unmount` dispatches to call `loseContext()` and `renderer.dispose()` automatically. |
| 3D models missing | GLTF/GLB models failed to load. | Verify files exist in `/public/models/` and paths are correct. |
| API calls failing | Flask server is not responding. | Make sure backend is running on port 5000 (`python start_dev.py`). |
| Wires shifting on reload | Snapping logic snaps wires to nearby pins on load. | Ensure `create3DWire` is called with the `false` flag during DB load (`loadCircuitFromBackend`) to bypass snapping. |
| PDF won't download | Browser blocks pop-up windows. | Allow pop-ups for localhost in your browser settings. |
| Build errors | Missing dependencies or outdated bundle. | Run `npm install` and `npm run build` in the directory. |
