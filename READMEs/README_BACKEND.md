# 🐍 Circuit.IQ — Python Backend Server

This is the backend server for Circuit.IQ. It is built using Python and Flask to handle physics calculations, persist saved configurations, manage classroom sessions, and integrate with the Google Gemini AI tutoring API.

---

## 🛠️ Technology Stack
* **Language**: Python 3
* **Web Server**: Flask 3.1.0 with Flask-CORS 5.0.0
* **AI Engine**: Google Generative AI SDK (`google-generativeai==0.8.3`)
* **Persistence**: SQLite (via standard `sqlite3`) and Supabase PostgreSQL client (`supabase==2.10.0`)

---

## 📂 Project Directory Map
```
LABback-IQ/
├── main.py              # Launch script (delegates to app.py)
├── app.py               # Flask app configurations, CORS, & Blueprint definitions
├── config.py            # Environment configurations (reads .env variables)
├── physics_engine.py    # Main calculations solver
├── ai_guide.py          # Offline keywords lookup & assessor
├── database.py          # Database controller (SQLite/Supabase sync adapter)
├── test_physics.py      # Automated physics unit tests
├── requirements.txt     # Python requirements manifest
│
├── experiments/         # Modular experiment calculations
│   ├── base_experiment.py # Base class all calculations extend
│   ├── ohms.py          # Ohm's Law: V = IR
│   ├── lcr.py           # LCR Resonance impedance solver
│   └── rc.py            # RC transient time constant solver
│
└── routes/              # Route controllers
    ├── physics.py       # Handles /api/calculate and /api/validate
    ├── physicsbot.py    # Handles AI chatbot prompts & Gemini API calls
    ├── database_routes.py # Handles saving, loading, profile, & logs sync
    ├── attendance.py    # Handles class attendance sessions & camera presence
    └── contact.py       # Handles support forms & Resend emails
```

---

## 🔬 Core Backend Subsystems

### 1. Physics Engine Solver ([physics_engine.py](file:///c:/Users/anaya/OneDrive/Desktop/final%20project%20ready/Circuit.IQ/LABback-IQ/physics_engine.py))
Handles numerical computations for experiments. Calculations are structured as plugins inside the `experiments/` directory:
* **Ohm's Law**: Calculates current and power, accounting for resistance shifts due to temperature coefficients:
  $$R_{eff} = R_{nominal} \times [1 + \alpha(T - 25^\circ C)]$$
* **LCR AC Resonance**: Resolves inductive Reactance ($X_L$), capacitive Reactance ($X_C$), phase angles ($\phi$), total impedance ($Z$), and resonant frequencies ($f_0$):
  $$Z = \sqrt{R^2 + (X_L - X_C)^2}, \quad f_0 = \frac{1}{2\pi\sqrt{LC}}$$
* **RC Transient charging**: Computes charge levels ($V_c$) over charging intervals ($t$):
  $$V_c(t) = V_s \times (1 - e^{-t/RC})$$

### 2. Dual Database Sync Adapter ([database.py](file:///c:/Users/anaya/OneDrive/Desktop/final%20project%20ready/Circuit.IQ/LABback-IQ/database.py))
Circuit.IQ is compatible with local and cloud databases out of the box:
* If `SUPABASE_URL` and `SUPABASE_ANON_KEY` are defined, the application routes data to Supabase (PostgreSQL).
* If keys are missing, it falls back to a local SQLite database (`circuit_iq.db`), initializing and seeding default student profiles and circuits.

### 3. Context-Aware AI Mentor Prompting
The chatbot endpoint `POST /api/physicsbot/ask` provides context-aware guidance by passing the state of the student's virtual breadboard to Google Gemini:
* **Prompt Construction**:
  ```text
  You are PhysicsBot, an AI tutor. A student is working on the experiment: {experiment_type}.
  Active components on the board: {placed_components}
  Placed wire nodes: {wires}
  Current slider adjustments: {params}
  Active meter readouts: {readings}
  
  Student question: "{question}"
  
  Provide a concise, helpful response (max 3 sentences). Guide the student to identify errors themselves. Do not give direct solutions.
  ```
* **Offline Fallback**: If the Gemini API key is missing, the backend uses a local keyword processor ([ai_guide.py](file:///c:/Users/anaya/OneDrive/Desktop/final%20project%20ready/Circuit.IQ/LABback-IQ/ai_guide.py)) that parses queries to return structured tutoring steps.

### 4. Classroom Attendance Sessions
The attendance blueprint ([attendance.py](file:///c:/Users/anaya/OneDrive/Desktop/final%20project%20ready/Circuit.IQ/LABback-IQ/routes/attendance.py)) tracks classroom lab sessions:
* Professors authenticate using `ADMIN_PASSWORD` (default: `circuitiq@admin2025`) and create a session code.
* Students enter the join code and register their details to enter a check-in queue.
* The endpoint `/api/session/<session_id>/presence` receives webcam person count reports from the client-side TensorFlow.js tracker to log status changes.

### 5. API Core Mechanics & Lab Verification Flow
To ensure that all student lab experiments run perfectly and correctly, the backend implements detailed topology validation and calculation pipelines:

#### A. Circuit Topology Verification (`POST /api/validate`)
The validation blueprint ([physics.py](file:///c:/Users/anaya/OneDrive/Desktop/final%20project%20ready/Circuit.IQ/LABback-IQ/routes/physics.py)) receives active breadboard coordinate states from the frontend:
1. **Format Conversion**: Translates placed wire structures into index tuples mapping component connections.
2. **Component Completeness**: Checks if all mandatory components for the specific experiment are placed.
3. **Graph Construction**: Constructs an adjacency list representing the circuit graph:
   * Internal connections are automatically created between terminals `0` and `1` for active components (resistors, inductors, capacitors, power source).
   * Voltmeters are treated as infinite impedance (acting as an open circuit) so no internal path is bridged through them.
   * Connection links are added corresponding to all placed jumper wires.
4. **Short-Circuit Detection**: Prohibits direct wire links between the positive and negative terminals of the power source.
5. **Depth First Search (DFS) Traversal**: Traverses the constructed graph starting from the positive terminal `(source_idx, 0)` with the goal of reaching the negative terminal `(source_idx, 1)`.
6. **Path Integrity**: Ensures all mandatory series components were visited along the successful path. Parallel elements (voltmeters) are verified to have both terminals wired.

#### B. Physics Calculations (`POST /api/calculate`)
The calculation blueprint executes mathematical solvers for active experiments:
1. **Unit Conversions**: Maps UI parameters to physical units ($L \times 10^{-3}$ for mH $\to$ H, $C \times 10^{-6}$ for $\mu\text{F} \to \text{F}$).
2. **Thermal Adjustments**: Applies temperature coefficient scaling to resistance nominal values:
   $$R_{eff} = R_{nominal} \times [1 + 0.00393 \times (T - 25)]$$
3. **Impedance & Currents**: Resolves equivalent circuit metrics using the modular plugins:
   * **DC Mode**: Calculates current ($I = V/R_{eff}$) and power dissipation ($P = V \times I$).
   * **AC Resonance**: Calculates complex impedances ($X_L = 2\pi f L$, $X_C = \frac{1}{2\pi f C}$), phase shifts ($\phi = \arctan\frac{X_L - X_C}{R}$), and resonant frequencies ($f_0 = \frac{1}{2\pi\sqrt{LC}}$).
   * **Transient Decays**: Evaluates exponential RC time decays ($V_c(t) = V_s \times (1 - e^{-t/RC})$).

---

## 🔌 Full-Stack Connection & Integration Flow (Frontend ↔ Backend ↔ Database)

Circuit.IQ leverages a tightly integrated client-server pipeline to synchronize UI controls, WebGL rendering states, backend physics calculations, and database backups.

* **Frontend-to-Backend Connection (API Layer)**:
  * **API Endpoints**: All page requests and telemetry payloads travel over standardized REST endpoints (`/api/*`).
  * **Development Mode Proxying**: In development, Vite hosts the React portal on Port `3001` (or `3000`) and reverse-proxies all `/api/*` endpoints to the Flask backend running on Port `5000` via the proxy configuration defined in `vite.config.ts`.
  * **Production Static Serving**: In production, the React frontend is compiled into static assets and placed in the backend's `dist/` directory. Flask serves the static bundle and the API endpoints concurrently on Port `5000`.

* **Website-to-Iframe Handshake (Simulation Integration)**:
  * **Decoupled Embedding**: The React website ([LabStudio.tsx](file:///c:/Users/anaya/OneDrive/Desktop/final%20project%20ready/Circuit.IQ/LABfront-IQ-Portal/src/pages/LabStudio.tsx)) embeds the WebGL simulation by loading the static shell `lab.html` inside an `iframe` with URL parameters (`/lab.html?exp=<experiment_key>&theme=<theme>`).
  * **State Passing via postMessage**: Communication bypasses origin restrictions using HTML5 message parsing for theme sync, asset loading progress, and webcam face pause signals.

* **Database Sync & Layout Persistence (Storage Integration)**:
  * **Dual Database Routing**: The backend `database.py` evaluates credentials. It redirects saving states to Supabase (PostgreSQL) if variables are set, otherwise it defaults to local SQLite file databases (`circuit_iq.db`).
  * **Debounced Auto-Saving**: Dropping a 3D model or completing a Bezier wire triggers a debounced background POST request to `/api/db/save-circuit`, serializing the layout (placed components, snap pin connections, and slider parameters) to the database.
  * **Layout Reconstruction**: On launch, the simulator queries `/api/db/load-circuit`. If a save state exists, it presents a restore prompt. Confirming reconstructs the WebGL meshes and restores wires with the snapping-bypass flag (`create3DWire(from, to, false)`) to prevent positions from shifting.

---

## 🛠️ How to Run Standalone
To start the Flask server independently from the React portal:
```bash
cd LABback-IQ
pip install -r requirements.txt
cp .env.example .env     # Define your API keys
python main.py
```
Open `http://localhost:5000` to access the API server.
