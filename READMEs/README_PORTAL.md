# ⚛️ Circuit.IQ — React Website Portal

The main frontend application handles user profiles, support tickets, admin dashboards, and dynamic experiment launches. It acts as the container for the 3D lab iframe.

---

## 🛠️ Tech Stack & Dependencies
* **Framework**: React 19
* **Language**: TypeScript 5.8
* **Build System**: Vite 6
* **Styling**: TailwindCSS 4 + Vanilla CSS variables for glassmorphic elements and dark mode.
* **State Manager**: Zustand 5
* **Animations**: GSAP (ScrollTrigger) + Framer Motion
* **Scroll Controller**: Lenis smooth scrolling (synchronized to the GSAP ticker)
* **Face Tracking**: TensorFlow.js (COCO-SSD) loaded dynamically from a secure CDN

---

## 📂 Project Directory Map
```
LABfront-IQ-Portal/
├── src/
│   ├── main.tsx             # React entry point
│   ├── App.tsx              # Dynamic router & lazy-loaded suspense wrapper
│   ├── index.css            # Styles, glassmorphic layout properties, & animation keys
│   │
│   ├── store/
│   │   └── useAppStore.ts   # Zustand global store:
│   │                           - currentExperiment (ohms, lcr, boyle, etc.)
│   │                           - activeTab (home, experiments, contact, attendance)
│   │                           - isLabOpen (whether fullscreen simulator is active)
│   │                           - theme (dark / light, defaulting to dark mode)
│   │
│   ├── pages/
│   │   ├── LandingPage.tsx  # Interactive catalog, GSAP scrolling, & suggestion chips
│   │   ├── LabStudio.tsx    # Iframe container, postMessage bridge, & WebGL cleanup
│   │   └── ContactPage.tsx  # Support ticketing form with Framer Motion entries
│   │
│   └── components/
│       ├── Navbar.tsx       # Glassmorphic top navigation bar
│       ├── AntigravityHero.tsx # Floating 3D components hero header (R3F)
│       ├── PhysicsBotPanel.tsx # Premium glassmorphic chat tutor panel overlay
│       ├── AttendanceSystem.tsx # Camera attendance form, webcam canvas, & TF.js controller
│       ├── InteractiveBreadboard.tsx # 2D Sandbox breadboard (BFS electrical trace)
│       ├── InteractiveCircuitLines.tsx # Shimmering animated vector backgrounds
│       ├── CyberpunkLedMatrix.tsx # Glowing LED grid header matrix
│       └── TeamRolesSection.tsx # Founder showcase cards
```

---

## 🚀 Key Functional Systems

### 1. Code Splitting & Dynamic Imports
To ensure fast initial page loads, [App.tsx](file:///c:/Users/anaya/OneDrive/Desktop/final%20project%20ready/Circuit.IQ/LABfront-IQ-Portal/src/App.tsx) uses dynamic imports (`React.lazy()`) for major pages and components. This splits heavy libraries (like Three.js, React Three Fiber, and ScrollTrigger) into separate bundles loaded only when needed.
* **Initial bundle weight**: Reduced from `711 kB` down to `369 kB`.
* **Loader Fallback**: Renders a glassmorphic skeleton layout with a spinner while dynamic components finish importing.

### 2. The postMessage Integration Bridge
[LabStudio.tsx](file:///c:/Users/anaya/OneDrive/Desktop/final%20project%20ready/Circuit.IQ/LABfront-IQ-Portal/src/pages/LabStudio.tsx) hosts the fullscreen WebGL simulator inside a sandbox `iframe`. It handles the postMessage interface:
* Toggling themes inside the React Navbar dispatches a `postMessage({ type: 'theme-change', theme }, '*')` into the iframe to sync colors.
* Reclaiming WebGL memory when closing the lab modal is handled by sending context loss commands, avoiding browser-wide WebGL crashes.
* Assets progress reports are intercepted to update the loading progress bar.

### 3. Zustand Global State Management
The Zustand store ([useAppStore.ts](file:///c:/Users/anaya/OneDrive/Desktop/final%20project%20ready/Circuit.IQ/LABfront-IQ-Portal/src/store/useAppStore.ts)) keeps components decoupled:
```typescript
interface AppState {
  isLabOpen: boolean;
  currentExperiment: string | null;
  activeTab: 'home' | 'experiments' | 'contact' | 'attendance';
  theme: 'dark' | 'light';
  setLabOpen: (open: boolean) => void;
  setCurrentExperiment: (exp: string | null) => void;
  setActiveTab: (tab: 'home' | 'experiments' | 'contact' | 'attendance') => void;
  toggleTheme: () => void;
}
```

### 4. Classroom Attendance & Face-Lock
[AttendanceSystem.tsx](file:///c:/Users/anaya/OneDrive/Desktop/final%20project%20ready/Circuit.IQ/LABfront-IQ-Portal/src/components/AttendanceSystem.tsx) coordinates webcam access and passes streams to TensorFlow.js COCO-SSD.
* **Safety Safeguard**: When student face count falls below the registered session threshold, the component triggers `onLabPause()`.
* It renders a lock screen overlay, pauses simulation loops, and posts a `paused` status to `/api/session/<id>/presence`. It resumes immediately when the students return to the camera view.

## 🔌 Full-Stack Connection & Integration Flow (Frontend ↔ Backend ↔ Database)

Circuit.IQ leverages a tightly integrated client-server pipeline to synchronize UI controls, WebGL rendering states, backend physics calculations, and database backups.

* **Frontend-to-Backend Connection (API Layer)**:
  * **API Endpoints**: All page requests and telemetry payloads travel over standardized REST endpoints (`/api/*`).
  * **Development Mode Proxying**: In development, Vite hosts the React portal on Port `3001` and reverse-proxies all `/api/*` endpoints to the Flask backend running on Port `5000` via the proxy configuration defined in `vite.config.ts`.
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
If you want to run the portal separately from the Flask backend (note: API calls will fail):
```bash
cd LABfront-IQ-Portal
npm install
npm run dev
```
Open `http://localhost:3000` to view the local server.
