# 🤖 Circuit.IQ — AI Handover & Context Guide

Copy-paste the prompt below into any new AI assistant (Cursor, Windsurf, ChatGPT, Claude, etc.) to immediately bring them up to speed on this codebase and continue working seamlessly.

---

## 📋 Prompt to Copy-Paste into a New AI Chat:

```markdown
You are an expert AI software engineer. I am working on a project called **Circuit.IQ**, a 3D Virtual Physics Laboratory. 

Please review the codebase structure and key rules below before we start:

### 1. Project Architecture
*   **React Portal** (`LABfront-IQ-Portal/`): Main portal/website using React 19, TypeScript, Zustand, and TailwindCSS 4.
*   **3D Simulator** (`LABfront-IQ-3D/`): Interactive WebGL breadboard built using Three.js (r184) and Vanilla JS, bundled with Vite 8. It is embedded into the React portal via a fullscreen `iframe` (`/lab.html?exp=<experiment_type>`).
*   **Flask Backend** (`LABback-IQ/`): Python server handling physics calculations (`physics_engine.py`), database persistence, and Google Gemini API integration (`routes/physicsbot.py`).

### 2. Databases & Persistence
*   **Dual DB Abstraction**: The server automatically writes/loads to Supabase (if keys are in `.env`) or falls back to a local SQLite database (`circuit_iq.db` in the project root).
*   **Tables**: `profiles` (students), `circuits` (saved designs), `experiment_logs` (attempts and grades).
*   **JSONB Circuit Structure**: Circuits are saved as JSON strings/JSONB columns containing:
    *   `placedComponents`: Coordinates, types, and terminal pins of placed components.
    *   `wires`: Connective nodes (hole indices 0 to 883).
    *   `params`: User parameters from sliders (V, R, L, C, etc.).

### 3. Critical Wire Persistence Rule
*   When a user clicks to draw a wire manually, the 3D lab uses:
    ```js
    create3DWire(startHole, endHole, true); // true = enables auto-snap/redirection logic
    ```
*   When the database restores a saved circuit layout on page reload, it MUST use:
    ```js
    create3DWire(w.fromHole, w.toHole, false); // false = bypasses auto-snapping
    ```
    *Why?* Passing `false` prevents wires from jumping, snapping, or overlapping with the power source upon reload, ensuring the circuit matches the exact state it was saved in.

### 4. Progress Save & Restore
*   **Checking for saved layout**: `checkForSavedCircuit(expKey)` runs an asynchronous check. If layout configuration exists in the database, it presents the `#modal-load-confirm` dialog.
*   **Restoring progress**: If the user confirms restore, it triggers `applySavedCircuit` which wipes current board group children and reconstructs meshes, wires (restored using `create3DWire(..., false)`), and updates UI.
*   **Starting fresh**: If the user clicks "Start From New", the system calls `saveCircuitToBackend` with empty components to reset DB status.
*   **Manual Save Progress Button**: A button `btn-save-progress` in the topbar triggers `saveCircuitToBackend()` manually and displays a custom `showToastNotification()` message.

### 5. Build Pipeline
*   `python build_all.py` compiles the 3D Simulator, moves output HTML/JS/CSS assets to the React portal public assets, and compiles the React production bundle.
*   `python start_dev.py` launches Flask on port 5000 and React on port 3000 concurrently.

Confirm you understand this architecture and are ready to assist me with debugging, adding new experiments, or building new features.
```

---

## 🛠️ Key Reference Files for the AI

If the new AI needs to edit specific code sections, direct them to:
1.  **3D Logic & Wire snapping**: [main.js](file:///c:/Users/anaya/OneDrive/Desktop/working%20folder%20new/Circuit.IQ/LABfront-IQ-3D/src/main.js)
2.  **Physics Math & Solvers**: [physics_engine.py](file:///c:/Users/anaya/OneDrive/Desktop/working%20folder%20new/Circuit.IQ/LABback-IQ/physics_engine.py)
3.  **Local SQLite & Cloud DB client**: [database.py](file:///c:/Users/anaya/OneDrive/Desktop/working%20folder%20new/Circuit.IQ/LABback-IQ/database.py)
4.  **React Routing & State Management**: [useAppStore.ts](file:///c:/Users/anaya/OneDrive/Desktop/working%20folder%20new/Circuit.IQ/LABfront-IQ-Portal/src/store/useAppStore.ts)
