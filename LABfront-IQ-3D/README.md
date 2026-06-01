# Circuit IQ — 3D Frontend

> **Virtual Physics Lab** · Three.js + Vite · Interactive 3D breadboard simulation

---

## 📁 Project Structure

```
Circuit-IQ-3D/                         ← 3D Frontend Root
│
├── index.html                         ← 🏠 HTML Shell — All UI panels, layout, font links
│                                         Contains: topbar, left panel, workspace, lab panel,
│                                                   meters panel, AI chat panel, modals
│
├── package.json                       ← 📦 NPM config — Vite + Three.js dependencies
├── .gitignore                         ← Git ignore rules
│
├── src/                               ← 🧠 SOURCE CODE (edit these files)
│   ├── main.js                        ← ⭐ MAIN APP (8000+ lines, all frontend logic)
│   │                                     Sections: 3D scene, experiments, UI, API, PDF
│   │                                     See file header for full section index
│   │
│   ├── style.css                      ← 🎨 ALL STYLES — Design system + every component
│   │                                     Sections: layout, sidebar, lab, meters, AI chat
│   │                                     See file header for CSS section index
│   │
│   └── counter.js                     ← (Vite starter file — not used, can ignore)
│
├── public/                            ← 📂 STATIC ASSETS (served as-is, no bundling)
│   ├── favicon.svg                    ← App favicon
│   ├── icons.svg                      ← SVG sprite sheet (used in topbar + UI)
│   ├── DefaultMaterial_baseColor.jpg  ← Breadboard texture map (PBR color)
│   └── models/                        ← 3D Model Files (GLTF format)
│       ├── breadboard/                ← Breadboard base model
│       ├── resistor/                  ← Resistor 3D model
│       └── electronic_components/     ← Capacitor, inductor, LED models
│
└── dist/                              ← 📦 BUILT OUTPUT (auto-generated, don't edit)
    ├── index.html
    └── assets/                        ← Bundled JS, CSS, assets
        ├── index-[hash].js
        └── index-[hash].css
```

---

## 🚀 How to Run (Development)

```bash
# Install dependencies (only needed once)
npm install

# Start the Vite dev server (hot-reload)
npm run dev
# → Opens at http://localhost:5173
```

## 🏗️ How to Build (Production)

```bash
# Build for production (outputs to dist/)
npm run build

# Preview the production build
npm run preview
```

> **Note:** After building, the Python backend (Circuit-IQ) serves the `dist/` folder at http://localhost:5000

---

## 🧩 Key Files to Edit

| File | What to change |
|------|----------------|
| `src/main.js` | Add/modify experiments, UI logic, 3D visuals, API calls |
| `src/style.css` | Change colors, layout, typography, component styles |
| `index.html` | Add new UI panels, change HTML structure |
| `public/models/` | Replace or add 3D GLTF models |

---

## 🔬 Experiments

| Key | Name | Measured | Graph |
|-----|------|----------|-------|
| `ohms` | Ohm's Law Verification | V, I, R, P | V vs I (linear) |
| `lcr` | Series LCR Resonance | XL, XC, Z, φ, f₀ | f vs Z (U-curve) |
| `rc` | RC Time Constant | τ=RC, charging | t vs Vc (exponential) |
| `arduino_led` | Arduino LED Button | I_LED, P | R vs I (hyperbola) |

---

## 🌐 API Communication

The frontend calls the Python backend (when running via `python main.py`):

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/api/calculate` | Get V, I, Z, P, XL, XC, phi, f0 |
| `POST` | `/api/validate` | Validate circuit topology |

In dev mode (`npm run dev`), calculations are done **locally in JS** via `calculateCircuitLocal()`.

---

## 📄 Lab Report PDF

The **Download Lab Report** button generates a complete printable PDF with:
1. Aim & Apparatus
2. Theory + Formulas  
3. Step-by-Step Procedure
4. Observation Table (recorded data)
5. Graph Instructions
6. Viva Voce Q&A + Answers
7. Conclusion
8. Assessment Grade

---

## 🛠️ Tech Stack

| Tool | Version | Role |
|------|---------|------|
| [Three.js](https://threejs.org) | ^0.184 | 3D WebGL engine |
| [Vite](https://vitejs.dev) | ^8.0 | Build tool + dev server |
| Vanilla JS (ESM) | — | No framework needed |
| HTML5 Canvas | — | Graphs + oscilloscope |
| CSS Variables | — | Design token system |

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| 3D models not loading | Check `public/models/` GLTF paths in `main.js` |
| API calls failing | Make sure Python server is running on port 5000 |
| Build errors | Run `npm install` then `npm run build` |
| White screen | Open browser console — check for JS errors |
| PDF not downloading | Allow pop-ups for localhost |
