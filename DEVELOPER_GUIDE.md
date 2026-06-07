<![CDATA[# Circuit.IQ — Developer & Architecture Guide

> Complete reference for contributors — how to add experiments, modify components, debug issues, and understand the codebase.

---

## 📑 Table of Contents

- [Workspace Directory Map](#-workspace-directory-map)
- [Development Workflow](#-development-workflow)
- [How to Add a New Experiment](#-how-to-add-a-new-experiment)
- [How to Add a New 3D Component](#-how-to-add-a-new-3d-component)
- [How to Add a New API Route](#-how-to-add-a-new-api-route)
- [How to Modify the Database Schema](#-how-to-modify-the-database-schema)
- [How to Embed Videos in Team Cards](#-how-to-embed-videos-in-team-cards)
- [Key Architecture Decisions](#-key-architecture-decisions)
- [Wire System Internals](#-wire-system-internals)
- [Common Debugging Recipes](#-common-debugging-recipes)
- [Development Commands](#-development-commands)

---

## 📂 Workspace Directory Map

```
Circuit.IQ/
├── LABback-IQ/                  # Python Flask API & Physics Solver (Port 5000)
│   ├── main.py                  # Backend startup entrypoint
│   ├── app.py                   # Flask factory — CORS, blueprints, static serving
│   ├── config.py                # Environment config (.env → Config class)
│   ├── physics_engine.py        # Rigid solver: V, I, Z, P, XL, XC, φ, f₀
│   ├── ai_guide.py              # Local rule-based tutoring & quiz engine
│   ├── database.py              # Dual DB: Supabase (PostgreSQL) + SQLite fallback
│   ├── test_physics.py          # Unit tests for physics calculations
│   ├── experiments/             # Modular experiment calculation plugins
│   │   ├── base_experiment.py   # Abstract base class
│   │   ├── ohms.py, lcr.py, rc.py
│   └── routes/                  # Flask API blueprints
│       ├── physics.py           # /api/calculate, /api/validate
│       ├── physicsbot.py        # /api/physicsbot/ask (Gemini AI)
│       ├── contact.py           # /api/contact (Resend email)
│       ├── database_routes.py   # /api/db/* (circuit CRUD, profiles, logs)
│       └── attendance.py        # /api/attendance/* (student tracking)
│
├── LABfront-IQ-3D/              # 3D WebGL Virtual Lab Simulator (Three.js + Vite)
│   ├── index.html               # Complete UI shell (panels, meters, chat)
│   ├── vite.config.js           # Build config + API proxy
│   └── src/
│       ├── main.js              # ⭐ Core app (11,000+ lines — all logic)
│       └── style.css            # Complete design system (dark theme)
│
├── circuit.iq (1)final/         # React Main Portal (Port 3000)
│   ├── vite.config.ts           # Build config with API proxy → :5000
│   └── src/
│       ├── App.tsx              # Router & page transitions
│       ├── store/useAppStore.ts # Zustand state (page, experiment, lab)
│       ├── pages/
│       │   ├── LandingPage.tsx  # Homepage — catalog, domains, AI console
│       │   ├── LabStudio.tsx    # Fullscreen iframe → /lab.html?exp=<key>
│       │   └── ContactPage.tsx  # Support portal
│       └── components/
│           ├── Navbar.tsx, AntigravityHero.tsx, PhysicsBotPanel.tsx
│           ├── PhysicsShowcase.tsx, InteractiveCircuitLines.tsx
│           ├── InteractiveBreadboard.tsx, CyberpunkLedMatrix.tsx
│           ├── AttendanceSystem.tsx, TeamRolesSection.tsx
│
├── start_dev.py                 # 🚀 Unified dev launcher (backend + frontend)
├── build_all.py                 # 🏗️ Production build automation
├── schema.sql                   # Supabase PostgreSQL schema + RLS + seeds
├── customise.sql                # Database column extensions
└── circuit_iq.db                # Local SQLite database (auto-created)
```

---

## 🛠️ Development Workflow

### Daily Development

```bash
python start_dev.py    # Start both servers, auto-opens browser
```

### After Changing 3D Lab Code

```bash
python build_all.py    # Rebuild lab → copy to portal → rebuild portal
```

### After Changing React Portal Code Only

```bash
cd "circuit.iq (1)final"
npm run build
```

### Running Tests

```bash
python LABback-IQ/test_physics.py
```

---

## 🚀 How to Add a New Experiment

Adding a new experiment (e.g., `faraday_cage`) requires changes in **4 files** across the codebase:

### Step 1: Add to React Portal Catalog

**File:** `circuit.iq (1)final/src/pages/LandingPage.tsx`

Find the `PHYSICS_DOMAINS` array and add your experiment under the matching category:

```typescript
{
  id: "faraday_cage",
  name: "Faraday Cage Shielding",
  desc: "Study electrostatic field isolation inside conductors.",
  aim: "Verify electric fields equal zero inside a conductor.",
  formula: "E_inside = 0"
}
```

### Step 2: Add Experiment Data to 3D Lab

**File:** `LABfront-IQ-3D/src/main.js`

**a)** Add the experiment schema to the `experiments` dictionary (~line 267):

```javascript
faraday_cage: {
  name: "Faraday Cage Shielding",
  aim: "Observe electrostatic shielding inside hollow conductors.",
  apparatus: "Hollow sphere, voltage source, Gaussmeter probe.",
  req: ['source'],  // required component types
  steps: [
    { id: 1, text: "Charge the outer sphere and measure internal E-field." },
    { id: 2, text: "Verify E = 0 inside the conductor." }
  ],
  theory: "<h3>Faraday Cage</h3><p>A hollow conductor shields its interior...</p>",
  formulas: [
    { name: "Gauss's Law", expr: "∮ E · dA = Q_enc / ε₀" },
    { name: "Interior Field", expr: "E_inside = 0" }
  ]
}
```

**b)** Add viva questions to `assessmentQuestions` (~line 617):

```javascript
faraday_cage: [
  {
    q: "What is the electric field inside a charged hollow conductor?",
    options: ["Infinity", "Zero", "Equal to external field", "Depends on material"],
    correct: 1,
    explanation: "By Gauss's Law, no net charge inside → E = 0."
  }
]
```

**c)** Add calculation logic to `calculateCircuitLocal()` (~line 703):

```javascript
} else if (activeExperiment === 'faraday_cage') {
  V = params.V;
  I = 0;  // No current inside the cage
  Z = Infinity;
  P = 0;
}
```

**d)** Add auto-setup components in `autoSetupExperiment()` (~line 4500):

```javascript
} else if (expKey === 'faraday_cage') {
  placeComponent3D('source', 7 * 14 + 0, 7 * 14 + 1);
  create3DWire(7 * 14 + 0, 7 * 14 + 4);
  // ... wire and component placement
}
```

### Step 3: Add Backend Physics Calculation

**File:** `LABback-IQ/physics_engine.py`

```python
elif active_experiment == 'faraday_cage':
    return {
        'status': 'success',
        'metrics': {
            'V': params.get('V', 0),
            'I': 0.0,
            'Z': float('inf'),
            'P': 0.0,
            'E_outside': params.get('V', 0) * 1.5,
            'E_inside': 0.0
        }
    }
```

### Step 4: Add AI PhysicsBot Keywords

**File:** `LABback-IQ/routes/physicsbot.py`

```python
elif 'cage' in question or 'shielding' in question or 'electrostatic' in question:
    formulas = [{"name": "Gauss Shielding", "expr": "E_inside = 0"}]
    explanation = "A Faraday cage shields its interior from external electric fields."
    recommended_exp = "faraday_cage"
```

### Step 5: Rebuild

```bash
python build_all.py
```

---

## 🧩 How to Add a New 3D Component

To add a new component type (e.g., `transistor`) to the 3D breadboard:

### Step 1: Define Component in State

**File:** `LABfront-IQ-3D/src/main.js`

Add the type to the `state.selectedTool` comment (~line 110):

```javascript
selectedTool: null,  // ..., 'transistor'
```

### Step 2: Add Sidebar Chip

**File:** `LABfront-IQ-3D/index.html`

Add a chip button in the component sidebar:

```html
<button class="comp-chip" data-type="transistor">
  <span class="chip-icon">🔌</span>
  <span>Transistor</span>
</button>
```

### Step 3: Create 3D Mesh

**File:** `LABfront-IQ-3D/src/main.js`

In `createComponentVisuals()` (~line 6500), add a case:

```javascript
case 'transistor': {
  // Create Three.js meshes for the transistor
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.12, 0.3, 16),
    new THREE.MeshStandardMaterial({ color: 0x333333 })
  );
  // Add leads, labels, etc.
  group.add(body);
  break;
}
```

### Step 4: Add Snap Logic

Define how many holes the component spans and update `placeComponent3D()`.

---

## 🌐 How to Add a New API Route

### Step 1: Create Blueprint

**File:** `LABback-IQ/routes/my_feature.py`

```python
from flask import Blueprint, request, jsonify

my_feature_bp = Blueprint('my_feature', __name__)

@my_feature_bp.route('/api/my-feature/endpoint', methods=['POST'])
def my_endpoint():
    data = request.get_json()
    # Process...
    return jsonify({"status": "success", "data": result})
```

### Step 2: Register in App Factory

**File:** `LABback-IQ/app.py`

```python
from routes.my_feature import my_feature_bp
app.register_blueprint(my_feature_bp)
```

### Step 3: Add Frontend Proxy (if needed)

**File:** `circuit.iq (1)final/vite.config.ts`

The proxy is already configured for `/api/*` → `:5000`, so new routes under `/api/` work automatically.

---

## 💾 How to Modify the Database Schema

### For Supabase (Production)

1. Write your SQL in a new migration file or append to `customise.sql`
2. Run in Supabase SQL Editor
3. Update `database.py` functions to use the new columns

### For SQLite (Local Development)

1. Update `init_sqlite_db()` in `LABback-IQ/database.py` with the new columns
2. Delete `circuit_iq.db` and restart (auto-recreated with new schema)

### Current Tables

| Table | Key Columns |
|-------|-------------|
| `profiles` | id, full_name, university, semester, graduation_year, role, phone, is_active |
| `circuits` | id, user_id, name, circuit_data (JSON), status, is_public, tags, view_count |
| `experiment_logs` | id, user_id, circuit_id, experiment_type, results, score, duration_seconds, attempt_number, feedback |

---

## 📹 How to Embed Videos in Team Cards

### Step 1: Place Video Assets

Save your video (e.g., `demo.mp4`) in:
```
circuit.iq (1)final/public/assets/videos/
```

### Step 2: Edit TeamRolesSection.tsx

**File:** `circuit.iq (1)final/src/components/TeamRolesSection.tsx`

Add `videoUrl` to the `TeamMember` interface and member data:

```typescript
interface TeamMember {
  // ... existing fields
  videoUrl?: string;
}

// In team array:
videoUrl: "/assets/videos/demo.mp4"
```

Replace the `SimulatedWaveform` with a video element:

```tsx
{member.videoUrl ? (
  <video src={member.videoUrl} controls autoPlay loop muted
    className="w-full h-full object-cover rounded-xl" />
) : (
  <SimulatedWaveform index={index} />
)}
```

---

## 🏗️ Key Architecture Decisions

### Why a Monolithic main.js?

The 3D lab uses a single 11,000+ line file because:
- **Three.js scenes** require shared state (scene, camera, renderer)
- **Component interactions** are tightly coupled (wires reference holes, holes reference components)
- **Section markers** (`// ---`) make navigation easy via search
- Vite's tree-shaking eliminates dead code in production builds

### Why iframe for the 3D Lab?

- **WebGL context isolation** — prevents React-Three-Fiber (hero) and raw Three.js (lab) conflicts
- **Independent lifecycle** — lab can load/unload without affecting React state
- **Performance** — heavy 3D rendering doesn't block React's render cycle

### Why Dual Database?

- **SQLite** for zero-config local development (no Supabase account needed)
- **Supabase** for production with Row-Level Security and PostgreSQL features
- **Automatic fallback** — if Supabase keys are missing, SQLite is used transparently

---

## 🔌 Wire System Internals

### Key Functions

| Function | Purpose |
|----------|---------|
| `create3DWire(snap1, snap2, isUserClick)` | Creates a wire between two holes |
| `createWireCurve(p1, p2, seed, wireIndex)` | Generates Bézier curve for wire path |
| `getRedirectedSnap(snap, occupied, otherSnap)` | Finds nearest unoccupied hole |
| `getOccupiedHoles()` | Calculates bounding boxes for all placed components |
| `updateWireVisuals(wireObj, idx)` | Refreshes wire mesh geometry |

### Wire Overlap Prevention

```
Wire creation → check wire index → calculate height boost
                                        │
                  height = baseHeight + (wireIndex * 0.15)
                                        │
                                        ▼
                  Wires stack vertically, never intersecting
```

### Wire Color System

```
snap matches positive rail → Red (0xef4444)
snap matches negative rail → Black (0x111827)
else → Cycle through: Blue → Green → Orange → Purple
```

### Reload Fidelity

When loading from database:
- Components: `placeComponent3D(type, snap1, snap2)` — exact positions
- Wires: `create3DWire(fromHole, toHole, false)` — `false` bypasses redirection
- This ensures **pixel-perfect restoration** of saved circuits

---

## 🐛 Common Debugging Recipes

### Wire Positions Shifting on Reload

**Cause:** `create3DWire` was called without `isUserClick = false`
**Fix:** Ensure `loadCircuitFromBackend()` passes `false` as the third argument

### Components Overlapping

**Cause:** `getOccupiedHoles()` missing bounding box for a component type
**Fix:** Add the component type to the bounding box calculation in `getOccupiedHoles()`

### 3D Scene Not Rendering

**Check:**
1. Browser console for WebGL errors
2. `initScene()` is called on page load
3. GLTF models exist in `public/models/`

### API 404 Errors

**Check:**
1. Flask backend is running (`python main.py` or `python start_dev.py`)
2. Route blueprint is registered in `app.py`
3. Vite proxy is configured for `/api/*`

### Database Not Persisting

**Check:**
1. `circuit_iq.db` exists in project root
2. `saveCircuitToBackend()` is called after component/wire changes
3. No errors in browser console network tab

---

## 💻 Development Commands

| Command | Directory | Description |
|---------|-----------|-------------|
| `python start_dev.py` | Root | Start backend + frontend together |
| `python build_all.py` | Root | Full production build pipeline |
| `python main.py` | `LABback-IQ/` | Start Flask backend only |
| `npm run dev` | `LABfront-IQ-3D/` | Start 3D lab dev server (port 5173) |
| `npm run dev` | `circuit.iq (1)final/` | Start React portal dev server (port 3000) |
| `npm run build` | Either frontend | Production build to `dist/` |
| `npm run preview` | Either frontend | Preview production build |
| `npm run lint` | `circuit.iq (1)final/` | TypeScript type checking |
| `python test_physics.py` | `LABback-IQ/` | Run physics unit tests |
]]>
