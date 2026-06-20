# ⚡ Circuit.IQ — 3D Lab Simulator Engine

This directory contains the 3D Virtual Physics Lab simulator. The application is built using Vanilla ES6 JavaScript and Three.js (r184) to render a photorealistic circuit prototyping board that runs in a dedicated browser `iframe`.

---

## 🛠️ Technology Stack
* **Graphics Engine**: Three.js (r184 WebGL Renderer)
* **Code Structure**: Vanilla JavaScript (ES6 Modules)
* **Build System**: Vite 8
* **Styling**: `style.css` (Glassmorphic cards, custom dark theme sliders, and neon grid layouts)
* **Telemeters & Graphs**: HTML5 2D Canvas Contexts
* **PDF Exporter**: `jsPDF` Library

---

## 📂 Project Directory Map
```
LABfront-IQ-3D/
├── index.html       # UI panels (meters, sliders, instructions, AI panel sidebar)
├── package.json     # Node packages (Three.js and Vite)
├── vite.config.js   # Dev config and reverse proxy options (/api -> :5000)
│
├── src/
│   ├── main.js      # ⭐ The core simulator logic file (~14,000 lines)
│   └── style.css    # Neon scrollbars, glass layout frames, and HUD overrides
│
└── public/
    └── models/      # 3D models (GLTF/GLB) loaded dynamically
```

---

## 🔬 Core Graphics & Mathematics Systems

### 1. The Rendering Loop & WebGL Context Protection
* **`anim()` Loop**: Utilizes `requestAnimationFrame` to update orbital camera controls, update the positions of electrical charges flowing along wires, and render frames.
* **Context Protection**: Chrome restricts the maximum number of WebGL contexts. To avoid browser crashes on repeated iframe reloads, `main.js` hooks into window `unload` events:
  ```javascript
  window.addEventListener('unload', () => {
    if (renderer) {
      const gl = renderer.getContext();
      if (gl) {
        const ext = gl.getExtension('WEBGL_lose_context');
        if (ext) ext.loseContext();
      }
      renderer.dispose();
    }
  });
  ```

### 2. Procedural Mesh Generation & Dynamic Materials
* **Chassis Extrusion**: Rather than downloading heavy models, the breadboard chassis, PCB plate, and Gold contact borders are generated on-the-fly using `THREE.ExtrudeGeometry` and `THREE.Shape` curves.
* **Procedural Canvas Textures**: Grid details and labels are drawn onto 2D canvases, converted into `THREE.CanvasTexture` maps, and applied as color and normal maps. This keeps the initial download under 50KB.
* **Dynamic Resistor Color Bands**: Resistors modify material color parameters of specific rings in their model hierarchy to reflect their active value in real-time.

### 3. Grid Coordinate Snapping
The breadboard is mapped onto a coordinate system of 830 sockets (indexes 0 to 883).
* The 3D position of any index is calculated dynamically:
  $$\text{position}(x, z) = \left( (c - \frac{\text{cols} - 1}{2}) \times 0.1522, \; \text{offset}(r) \right)$$
* Raycasters calculate intersection vectors against the breadboard proxy mesh during drag-and-drop operations, snapping component leads to the nearest socket.
* **Expected Tool Filter**: The helper `getCurrentExpectedTool()` prevents students from placing incorrect components during guided experiments.

### 4. Vector Projections (Guide Pins A & B)
Guided experiments project floating instruction bubbles from 3D targets directly to 2D HTML overlays.
* **Mathematical Formula**:
  * Extracts the world matrix position of the target socket ring: `ring.getWorldPosition(tempV)`
  * Projects it onto Normalized Device Coordinates (NDC) using the camera projection matrix: `tempV.project(camera)` (producing $X, Y$ in range $[-1, 1]$)
  * Translates coordinates to container pixel coordinates:
    $$x_{px} = (x_{ndc} \times 0.5 + 0.5) \times \text{width}$$
    $$y_{px} = (-y_{ndc} \times 0.5 + 0.5) \times \text{height}$$
* **Frustum Culling**: If the target goes behind the camera plane (`z > 1`), the bubbles automatically hide to prevent floating UI artifacts.

### 5. Bézier Jumper Wires & Particle Flows
* **Bezier Curves**: Wires are generated using 3D tubes (`THREE.TubeGeometry`) mapped along quadratic or cubic Bezier curves:
  $$\mathbf{B}(t) = (1-t)^2\mathbf{P}_0 + 2(1-t)t\mathbf{P}_1 + t^2\mathbf{P}_2, \quad t \in [0, 1]$$
* **Stacking Offsets**: Wires track shared connection points and increase their control point heights to prevent intersecting other wires.
* **Fidelity Lock**: Manual wire drawing snaps to holes (`create3DWire(..., true)`). Wires loaded from the database bypass snapping (`create3DWire(..., false)`) to prevent layout shifts.
* **Animation**: Charges are animated along the Bezier tube pathways using interpolation.

---

## 🔌 Full-Stack Connection & Integration Flow (Frontend ↔ Backend ↔ Database)

Circuit.IQ leverages a tightly integrated client-server pipeline to synchronize UI controls, WebGL rendering states, backend physics calculations, and database backups.

* **Frontend-to-Backend Connection (API Layer)**:
  * **API Endpoints**: All page requests and telemetry payloads travel over standardized REST endpoints (`/api/*`).
  * **Development Mode Proxying**: In development, Vite hosts the React portal on Port `3001` (or `3000`) and reverse-proxies all `/api/*` endpoints to the Flask backend running on Port `5000` via the proxy configuration defined in `vite.config.js`.
  * **Production Static Serving**: In production, the React frontend is compiled into static assets and placed in the backend's `dist/` directory. Flask serves the static bundle and the API endpoints concurrently on Port `5000`.

* **Website-to-Iframe Handshake (Simulation Integration)**:
  * **Decoupled Embedding**: The React website ([LabStudio.tsx](file:///c:/Users/anaya/OneDrive/Desktop/working%20folder%20new/Circuit.IQ/LABfront-IQ-Portal/src/pages/LabStudio.tsx)) embeds the WebGL simulation by loading the static shell `lab.html` inside an `iframe` with URL parameters (`/lab.html?exp=<experiment_key>&theme=<theme>`).
  * **State Passing via postMessage**: Communication bypasses origin restrictions using HTML5 message parsing for theme sync, asset loading progress, and webcam face pause signals.

* **Database Sync & Layout Persistence (Storage Integration)**:
  * **Dual Database Routing**: The backend `database.py` evaluates credentials. It redirects saving states to Supabase (PostgreSQL) if variables are set, otherwise it defaults to local SQLite file databases (`circuit_iq.db`).
  * **Debounced Auto-Saving**: Dropping a 3D model or completing a Bezier wire triggers a debounced background POST request to `/api/db/save-circuit`, serializing the layout (placed components, snap pin connections, and slider parameters) to the database.
  * **Layout Reconstruction**: On launch, the simulator queries `/api/db/load-circuit`. If a save state exists, it presents a restore prompt. Confirming reconstructs the WebGL meshes and restores wires with the snapping-bypass flag (`create3DWire(from, to, false)`) to prevent positions from shifting.

---

## 📄 PDF Lab Report Generator
The "Download Lab Report" button gathers:
* Student Profile details (Registration, name, university).
* Experiment Aim, Apparatus lists, and Physics formulas.
* Observation tables populated from active telemetry readings.
* Graded Assessment scores and feedback logs.

These are compiled and saved using `jsPDF` to generate a formatted PDF report.

---

## 🛠️ How to Run Standalone
To run the simulator independently from the React portal:
```bash
cd LABfront-IQ-3D
npm install
npm run dev
```
Open `http://localhost:5173` to access the simulator workspace.
