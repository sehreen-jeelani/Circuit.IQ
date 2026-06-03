# Circuit.IQ — AI-Powered 3D Virtual Physics Laboratory

> A premium, full-stack interactive 3D physics simulation portal and AI-tutoring environment designed for learning, building, and verifying physical and electrical laws on virtual breadboards.

---

## 📁 Full Project Structure

The project is organized into three decoupled, cohesive components:

```
Circuit.IQ/
│
├── LABback-IQ/                   # 🐍 FLASK BACKEND & PHYSICS SOLVER
│   ├── main.py                   # Startup entrypoint (delegates to app.py)
│   ├── app.py                    # Flask server initialization & configuration
│   ├── physics_engine.py         # ⚡ Rigorous calculation solver & DFS topological checker
│   ├── ai_guide.py               # Local rule-based tutoring definitions & quiz checks
│   ├── routes/                   # Flask Router Blueprints (/api/validate, /api/calculate, etc.)
│   │   ├── physics.py            # Physics calculations endpoints
│   │   ├── physicsbot.py         # real Gemini AI physicsbot ask handler
│   │   └── contact.py            # resend mailer ticket endpoint
│   ├── .env                      # API keys & local config (GEMINI_API_KEY)
│   └── requirements.txt          # Python dependencies
│
├── LABfront-IQ-3D/               # ⚡ 3D WEBGL VIRTUAL LAB SIMULATOR (Vite + Three.js)
│   ├── index.html                # 3D Lab template shell
│   ├── src/
│   │   ├── main.js               # ⭐ Core rendering, component layouts, and math logic
│   │   └── style.css             # Glassmorphic lab overlays & panel styling
│   └── package.json              # Three.js & builder tooling
│
├── circuit.iq (1)final/          # ⚛️ MAIN REACT PORTAL & WEBSITE (Port 3000)
│   ├── src/
│   │   ├── App.tsx               # Main routing shell & Tab Manager
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx   # Homepage, Domain Card Deck & AI Console
│   │   │   ├── LabStudio.tsx     # Fullscreen iframe wrapper for the 3D WebGL simulator
│   │   │   └── ContactPage.tsx   # Support portal & ticketing panel
│   │   ├── components/
│   │   │   ├── InteractiveCircuitLines.tsx # Mouse-responsive neural plexus background
│   │   │   └── AntigravityHero.tsx         # 3D floating components animation
│   │   └── store/
│   │       └── useAppStore.ts    # Zustand global state store
│   └── package.json              # React, Tailwind, Lucide, Motion dependencies
│
└── start_dev.py                  # 🚀 Unified startup runner
```

---

## 🔑 AI Mentor Gemini API Key Setup

To enable the **AI Mentor** in the 3D Lab and the **PhysicsBot AI Console** on the homepage to provide intelligent step-by-step guidance and math calculations using Google's Gemini models:

1. **Get an API Key**:
   - Go to [Google AI Studio](https://aistudio.google.com/) and create a free API key.

2. **Create / Edit `.env`**:
   - Navigate to the `LABback-IQ/` directory.
   - Create or open the `.env` file (you can copy from `.env.example`).
   - Add your Gemini API key:
     ```env
     GEMINI_API_KEY="AIzaSyYourActualKeyHere..."
     FLASK_DEBUG=true
     ```

*Note: If no API key is provided, the application will automatically fall back to local rule-based physics formulas and guidance, ensuring a graceful user experience.*

---

## 🚀 How to Run the Project

### Development Mode (Concurrent Hot-Reload)

To run both the Python Flask Backend and the React Frontend simultaneously under a single terminal command:

```bash
# In the root workspace directory:
python start_dev.py
```

- This starts the **Python backend** on [http://localhost:5000](http://localhost:5000).
- This starts the **Vite React dev server** on [http://localhost:3000](http://localhost:3000) (with automatic proxying of `/api` requests to port 5000).
- Opens the portal in Google Chrome automatically!

---

## 📦 How to Build the Code

### 1. Compile the 3D WebGL Simulator
If you make changes to files under `LABfront-IQ-3D/src/`:
```bash
cd LABfront-IQ-3D
npm install
npm run build
```
Vite will compile the assets into `LABfront-IQ-3D/dist/`. 
Copy the generated index.html and assets folder from `LABfront-IQ-3D/dist/` into the React portal's public folder so they are hosted correctly:
- Rename `dist/index.html` to `lab.html` and copy to `circuit.iq (1)final/public/lab.html`.
- Copy `dist/assets/*` into `circuit.iq (1)final/public/assets/`.

### 2. Compile the React Frontend Portal
If you make changes to files under `circuit.iq (1)final/src/`:
```bash
cd "circuit.iq (1)final"
npm install
npm run build
```
Vite will compile the entire optimized single-page application into `circuit.iq (1)final/dist/` where it is served statically by the Flask server.

---

## 🔬 Physics Experiments Available

The laboratory covers **6 core domains** containing **26 interactive simulations**:

### ⚡ Electricity & Circuits
1. **Ohm's Law Verification**: Verify the relationship between Voltage, Current, and Resistance ($V = I \times R$).
2. **Kirchhoff's Voltage Law (KVL)**: Verify that the sum of potential drops in a closed loop is zero ($\Sigma V = 0$).
3. **Kirchhoff's Current Law (KCL)**: Verify charge conservation at junctions ($\Sigma I_{in} = \Sigma I_{out}$).
4. **RC/RL/RLC AC Circuits**: Measure reactance and phase angles in series/parallel AC circuits.
5. **Series & Parallel Loads**: Compare additive series vs. reciprocal parallel resistor configurations.
6. **Wheatstone Bridge**: Balance a resistor array to measure an unknown resistance ($R_1/R_2 = R_3/R_4$).

### 🧲 Electromagnetism
7. **Faraday's Induction Law**: Induce electromotive force via a moving magnetic field ($E = -N \frac{\Delta\Phi}{\Delta t}$).
8. **Lenz's Law Demonstration**: Observe direction of induced current opposing flux changes.
9. **Solenoid Magnetic Field**: Calculate flux density ($B = \mu_0 n I$) inside a copper coil.
10. **AC Transformer Ratio**: Verify step-up and step-down voltage turn ratios ($V_s/V_p = N_s/N_p$).

### 🔍 Optics & Light
11. **Snell's Law of Refraction**: Map index boundaries of dense media ($n_1 \sin\theta_1 = n_2 \sin\theta_2$).
12. **Thin Lens Equation**: Trace images and focal points using convex and concave lenses ($1/f = 1/v + 1/u$).
13. **Total Internal Reflection**: Find critical angle boundaries where light reflects entirely internally.
14. **Prism Dispersion Spectrum**: Observe white light disperse into a color spectrum on refraction.

### ⚙️ Mechanics & Waves
15. **Simple Pendulum Motion**: Study period length independence from weight masses ($T = 2\pi \sqrt{L/g}$).
16. **Hooke's Law & Springs**: Measure spring constant extensions under load weights ($F = -kx$).
17. **Projectile Firing Path**: Launch balls in parabolic trajectories under varying angles and speeds.
18. **Doppler Shift Simulation**: Observe wave crest compressions ahead of moving wave sources.

### 🔥 Thermodynamics
19. **Ideal Gas State Equation**: Map pressure, volume, temperature, and mole states ($PV = nRT$).
20. **Boyle's Constant Temp Law**: Verify inverse P-V pressure-volume relationships ($P_1V_1 = P_2V_2$).
21. **Charles's Constant Pres Law**: Verify linear V-T volume-temperature relationships ($V_1/T_1 = V_2/T_2$).
22. **Specific Heat Capacity**: Find thermal capacities of metals using beakers and calorimeters.

### ⚛️ Modern & Quantum Physics
23. **Photoelectric Effect**: Eject electrons by overcoming metal work functions ($K_{max} = h\nu - \Phi$).
24. **Radioactive Decay Half-Life**: Measure parent isotope decay times ($N(t) = N_0 e^{-\lambda t}$).
25. **de Broglie matter wave**: Study wave-particle duality wavelengths of moving masses ($\lambda = h/p$).
26. **Bohr Hydrogen Atom**: Trigger orbital shell jumps emitting discrete photon wavelengths.

---

## 🏗️ Technical Architecture

```
                       Browser (React UI Portal)
                                │
        ┌───────────────────────┴───────────────────────┐
        ▼                                               ▼
3D Lab (Iframe)                                 PhysicsBot AI Panel
  │                                                     │
  ├─► Local JS Calc (Dev fallback)                      ▼
  │                                              Flask Backend Server
  └─► POST /api/calculate                       (routes/physicsbot.py)
      POST /api/validate                                │
              │                                         ▼
              ▼                                   Gemini AI API
       Flask Backend API                      (gemini-1.5-flash model)
     (routes/physics.py)
              │
              ▼
        Physics Solver
    (physics_engine.py)
```
