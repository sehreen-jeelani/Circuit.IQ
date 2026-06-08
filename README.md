<div align="center">

# ⚡ Circuit.IQ

### AI-Powered 3D Virtual Physics Laboratory

A full-stack 3D physics simulation platform where students build circuits on virtual breadboards, run experiments, and get AI-powered guidance — all in the browser.

[![Python 3.8+](https://img.shields.io/badge/Python-3.8+-3776AB?logo=python&logoColor=white)](#-prerequisites)
[![Flask 3.1](https://img.shields.io/badge/Flask-3.1-000000?logo=flask&logoColor=white)](#overview)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](#overview)
[![Three.js r184](https://img.shields.io/badge/Three.js-r184-000000?logo=threedotjs&logoColor=white)](#overview)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase&logoColor=white)](#-database)

</div>

---

## Overview

Circuit.IQ is a premium, interactive WebGL-based physics sandbox. Students can drag components onto a virtual 3D breadboard, draw wires to build circuits, and run simulations. An AI Mentor is embedded to provide real-time guidance.

### Architecture At A Glance

| Component | Directory | Tech Stack | Role | Port |
| :--- | :--- | :--- | :--- | :--- |
| **React Website** | `circuit.iq (1)final/` | React 19, TypeScript, Zustand, Tailwind | Portal, Landing Page, AI Mentor | `3000` |
| **3D Simulator** | `LABfront-IQ-3D/` | Three.js (r184), HTML5 Canvas, Vite | WebGL Breadboard, Oscilloscope, Graph | Iframe |
| **Python Server** | `LABback-IQ/` | Flask 3.1, Gemini API, SQLite, Supabase | Calculations, AI endpoints, DB persistence | `5000` |

---

## Key Features

*   **26 Interactive Experiments**: Spanning Electricity, Semiconductors, Electromagnetism, Modern Physics, and Thermodynamics.
*   **3D Breadboard Simulator**: Full drag-and-drop workflow for resistors, capacitors, LEDs, diodes, and switches.
*   **Intelligent AI Assistant**: Context-aware [PhysicsBotPanel.tsx](file:///c:/Users/anaya/OneDrive/Desktop/working%20folder%20new/Circuit.IQ/circuit.iq%20(1)final/src/components/PhysicsBotPanel.tsx) inside the lab simulator reads your current components, wires, and parameters, using Gemini AI to diagnose faults.
*   **Global PhysicsBot AI Console**: Homepage terminal-like AI playground ([LandingPage.tsx](file:///c:/Users/anaya/OneDrive/Desktop/working%20folder%20new/Circuit.IQ/circuit.iq%20(1)final/src/pages/LandingPage.tsx)) featuring command suggestions (`$ ohms-solver`, `$ lcr-resonance`) and smart matching that recommends and auto-loads specific 3D simulations.
*   **Rich Measurements**: Integrated digital meters (V, I, Z, P), a functional dual-channel oscilloscope, and live V-I graphs.
*   **Automated Lab Reports**: Click to print a formatted PDF report with aim, apparatus, theory, key formulas, observation tables, graded viva Q&A, and auto-generated grade.
*   **Dual-Database Adapter Engine**: Automatic zero-setup synchronization between local SQLite (`circuit_iq.db`) and cloud Supabase (PostgreSQL), pre-seeded with student profiles and circuit data.
*   **Live Attendance & Presence Lock**: Webcam session manager utilizing client-side TensorFlow.js (COCO-SSD) to automatically verify student presence, lock/unlock the lab workspace, and auto-pause simulations when a student leaves the camera frame.
*   **Offline Heuristic Fallback**: Intelligent keyword-based tutoring fallback that ensures students get structured formulas and guidance even without a configured `GEMINI_API_KEY`.
*   **Support & Diagnostics Portal**: Multi-category ticketing system for bug reports and feature requests with Resend API email dispatching.

---

## 👥 Live Attendance & Security System

Circuit.IQ includes a professional, classroom-grade attendance and presence verification system designed to help professors monitor group lab sessions and prevent unattended simulations.

### System Workflow
1. **Professor Portal (Admin)**: 
   * Professors log in using an admin password to create active lab sessions.
   * They specify the target experiment, group names, expected group size, and registered student registration numbers.
2. **Student Portal (Join)**:
   * Students enter the generated **Session Code** and their registration numbers.
   * Once checked in, they are queued to enter the lab.
3. **Computer Vision Presence Lock**:
   * The system gains access to the local webcam and dynamically loads **TensorFlow.js (COCO-SSD)** from a secure CDN.
   * A local object detection loop runs every 1.5 seconds to count the number of students/people present in front of the camera.
   * **Active Pause/Resume Safeguard**: If a student leaves the frame, the system detects the discrepancy, pauses the session status, and locks/pauses the 3D physics simulation instantly. When they re-enter, the lab resumes.
4. **Audit Logs & Export**:
   * The backend logs every state change: check-in timestamps, presence count drops, pause/resume timeline milestones, and final student grades.
   * Professors can monitor active sessions in real-time, end them, and download a detailed `.txt` text log file for academic auditing.

---

## 🤖 Global PhysicsBot AI Console

The homepage features a terminal-style chatbot interface dedicated to general physics tutoring:
*   **Structured Queries**: Calls the `/api/physics-bot` endpoint to retrieve concise explanations, formulas, and recommended simulation modules.
*   **Quick Shortcuts**: Students can click pre-set command buttons (like `ohms-solver`, `lcr-resonance`, `ideal-gas`, and `photoelectric-effect`) to instantly query common physics topics.
*   **Interactive Simulation Launch**: If a query is related to one of the 26 simulator experiments, the AI provides a button to automatically load and launch that simulation inside the virtual lab.
*   **Offline Keyword Parser**: If `GEMINI_API_KEY` is not set, a local keyword parser evaluates questions (matching words like "ohm", "lcr", "pendulum", "snell", "gas") and responds with structured formulas and local instructions.

---

## 💾 Database Sync & Dual Adapters

The Flask backend is equipped with a hybrid database layer ([database.py](file:///c:/Users/anaya/OneDrive/Desktop/working%20folder%20new/Circuit.IQ/LABback-IQ/database.py)) that provides a zero-setup local dev experience while remaining cloud-ready:
*   **SQLite Fallback**: If no Supabase environment variables are configured in `.env`, the app automatically initializes `circuit_iq.db` locally.
*   **Automatic Seeding**: Seeds a default student profile (Aisha Rahman) and a sample series circuit layout on first boot so the lab is fully usable immediately.
*   **Table Schemas**:
    *   `profiles`: Tracks student names, universities, semesters, graduation years, roles, and active statuses.
    *   `circuits`: Stores coordinate coordinates, tag arrays, placement configurations, and wire arrays as JSONB.
    *   `experiment_logs`: Records experiment duration, scores, and feedback for grading.

---

## 📞 Support & Ticketing System

A modular contact page ([ContactPage.tsx](file:///c:/Users/anaya/OneDrive/Desktop/working%20folder%20new/Circuit.IQ/circuit.iq%20(1)final/src/pages/ContactPage.tsx)) is integrated into the client portal to handle feedback and bug submissions:
*   **Form Validation**: Validates client-side inputs (valid email checks, minimum message length).
*   **API Ticket Logging**: Sends a request to `/api/contact` which creates a unique UUID-based Ticket ID.
*   **Resend API Integration**: If `RESEND_API_KEY` is provided, emails the submission to the designated administrative email (`CONTACT_TO_EMAIL`), falling back to standard stdout logging in the Flask terminal on empty keys.

## 🚀 Quick Start (3 Steps)

### 1. Install Dependencies
Ensure you have [Node.js (18+)](https://nodejs.org/) and [Python (3.8+)](https://www.python.org/) installed.

```bash
# Clone the repository
git clone https://github.com/SYEDTUFAILANDRABI/Circuit.IQ.git
cd Circuit.IQ

# Install Python requirements
pip install -r LABback-IQ/requirements.txt

# Install 3D Simulator packages
cd LABfront-IQ-3D && npm install && cd ..

# Install React Website packages
cd "circuit.iq (1)final" && npm install && cd ..
```

### 2. Configure Environment (Optional)
Copy the example environment file:
```bash
cp LABback-IQ/.env.example LABback-IQ/.env
```
Open `LABback-IQ/.env` and optionally add your `GEMINI_API_KEY` for AI tutoring. If left blank, the app will gracefully fall back to local rule-based physics formulas.

### 3. Run in Development Mode
Start both frontend and backend servers simultaneously:
```bash
python start_dev.py
```
This automatically opens **http://localhost:3000** in your browser. Choose an experiment and click **Launch Lab** to start!

---

## 📁 Project Directory Structure

```
Circuit.IQ/
├── start_dev.py              # Startup dev script (runs Flask + React)
├── build_all.py              # Production build pipeline compiler
├── schema.sql                # Supabase database table definitions
├── customise.sql             # DB extensions and customization columns
├── circuit_iq.db             # Local SQLite database file (auto-created)
│
├── LABback-IQ/               # 🐍 Python Flask Backend
│   ├── main.py               # Main production entrypoint
│   ├── app.py                # Server configuration, static files, blueprints
│   ├── physics_engine.py     # Rigorous math solver for all 26 experiments
│   ├── database.py           # SQLite/Supabase abstraction layer
│   ├── routes/               # API endpoint blueprints (physics, db, AI)
│   └── experiments/          # Modular physics calculation plugins
│
├── LABfront-IQ-3D/           # ⚡ 3D Simulator (Three.js)
│   ├── index.html            # Lab UI structure, meters, panels
│   ├── src/main.js           # Main WebGL rendering, wire-drawing, and logic
│   └── public/models/        # GLTF 3D electronic components
│
└── circuit.iq (1)final/      # ⚛️ React Web Portal
    ├── src/pages/            # Landing page, contact page, iframe wrapper
    ├── src/components/        # UI components (Hero, AI panel, showcases)
    └── public/                # Built 3D Lab assets copied during build
```

---

## 🔬 Physics Experiments (26 Total)

### ⚡ Electricity & Circuits (Breadboard Interactive)
1. **Ohm's Law Verification** – Find the linear relationship between voltage and current (`V = I × R`).
2. **Kirchhoff's Voltage Law (KVL)** – Verify that the sum of voltages around any closed loop is zero (`ΣV = 0`).
3. **Kirchhoff's Current Law (KCL)** – Prove that current entering a junction equals current leaving it (`ΣI_in = ΣI_out`).
4. **LCR AC Impedance** – Analyze impedance `Z` under alternating current (`Z = √[R² + (XL−XC)²]`).
5. **Series LCR Resonance** – Find the frequency where inductive and capacitive reactances cancel (`f₀ = 1/(2π√LC)`).
6. **RC Time Constant** – Charge and discharge a capacitor to observe transient response (`τ = R × C`).
7. **Series & Parallel Loads** – Observe how equivalent resistance changes based on circuit topology.
8. **Wheatstone Bridge** – Determine an unknown resistance by balancing bridge branches (`Rx = R3 × R2 / R1`).

### 🔌 Semiconductor & Components (Breadboard Interactive)
9. **Diode I-V Characteristics** – Graph the exponential forward bias current and reverse block behavior.
10. **Voltage & Current Divider** – Learn how series and parallel resistor networks divide electric energy.
11. **Arduino LED Control** – Interactive push-button LED switcher simulating microcontroller logic.

### 🧲 Electromagnetism (Visualizer Widget)
12. **Faraday's Induction Law** – Induce voltage pulses by moving a magnet through a multi-turn coil.
13. **Lenz's Law Demonstration** – Observe how the direction of induced current opposes the magnetic change.
14. **Solenoid Magnetic Field** – Calculate field strength inside a current-carrying coil (`B = μ₀nI`).
15. **AC Transformer Ratio** – Change primary/secondary turns to step-up or step-down voltage.
16. **Biot-Savart's Law** – Plot magnetic flux density at varying distances from a straight wire.

### ⚛️ Modern & Quantum Physics (Visualizer Widget)
17. **Planck's Constant (LEDs)** – Determine `h` by finding the threshold voltage of different color LEDs.
18. **Planck's Constant (Photocell)** – Measure stopping potential under different monochromatic light wavelengths.
19. **Photoelectric Effect** – Eject electrons from metal targets by varying light intensity and frequency.
20. **Radioactive Decay** – Watch unstable nuclei decay exponentially over time (`N(t) = N₀e^(−λt)`).
21. **de Broglie Matter Wave** – Study wave-particle duality by calculating particle wavelengths (`λ = h/p`).
22. **Bohr Hydrogen Atom** – Simulate energy level transitions and emission spectral lines.

### 🔥 Thermodynamics (Visualizer Widget)
23. **Stefan-Boltzmann Law** – Verify radiated energy scales with the fourth power of temperature (`P = σϵAT⁴`).
24. **Ideal Gas Equation** – Interlink Pressure, Volume, and Temperature variables (`PV = nRT`).
25. **Boyle's Law** – Compress a gas at a constant temperature to see pressure change (`P₁V₁ = P₂V₂`).
26. **Charles's Law** – Heat a gas at constant pressure to watch it expand (`V₁/T₁ = V₂/T₂`).

---

## 🏗️ Production Build & Deploy

To build the entire project for production deployment, run the automated build script:
```bash
python build_all.py
```
This builds the 3D Simulator, copies the bundles to the React public assets folder, compiles the React portal into `circuit.iq (1)final/dist/`, and primes the backend server to serve it directly.

Once built, launch the production server:
```bash
cd LABback-IQ
python main.py
```
Go to **http://localhost:5000** to access the production build.

## 📖 Developer Guides & Easy Access Links

For quick access to code sections, integration details, and guides:
*   🤖 **AI Context Guide**: [AI_HANDOVER.md](file:///c:/Users/anaya/OneDrive/Desktop/working%20folder%20new/Circuit.IQ/AI_HANDOVER.md) — Prompt template & reference file mappings for AI assistants.
*   🛠️ **Integration Details**: [DEVELOPER_GUIDE.md](file:///c:/Users/anaya/OneDrive/Desktop/working%20folder%20new/Circuit.IQ/DEVELOPER_GUIDE.md) — Comprehensive developer notes on database structures, wire persistence, and state.
*   🐍 **Backend Server**: [LABback-IQ/README.md](file:///c:/Users/anaya/OneDrive/Desktop/working%20folder%20new/Circuit.IQ/LABback-IQ/README.md) — Python Flask architecture, API endpoints, and schemas.
*   ⚡ **3D Simulator**: [LABfront-IQ-3D/README.md](file:///c:/Users/anaya/OneDrive/Desktop/working%20folder%20new/Circuit.IQ/LABfront-IQ-3D/README.md) — Three.js scene architecture and WebGL configurations.
*   ⚛️ **React Website**: [circuit.iq (1)final/README.md](file:///c:/Users/anaya/OneDrive/Desktop/working%20folder%20new/Circuit.IQ/circuit.iq%20(1)final/README.md) — React portal state, store hooks, and component guide.

---

## 🛠️ Performance & Troubleshooting

### WebGL Context Management (Memory Leaks Fixed)
To ensure the application runs smoothly without crashing the browser:
*   **WebGL Context Limits**: Chrome limits active WebGL contexts per session. We have implemented clean disposal logic where the `THREE.WebGLRenderer` context is explicitly lost (`WEBGL_lose_context` extension) and disposed of immediately when the simulator iframe is reloaded or unmounted.
*   **React Post-Processing Bloom**: If you encounter low framerates on low-end machines, toggle **High Fidelity Mode** in the settings panel to disable resource-heavy post-processing bloom.

---

<div align="center">

**Circuit.IQ Team**
*Interactive Virtual Laboratories for Modern Physics Education*

</div>
