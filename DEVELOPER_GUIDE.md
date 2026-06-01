# Circuit.IQ Developer & Architecture Guide

Welcome to the Developer Guide for **Circuit.IQ**. If you need to update the codebase, add a new experiment, integrate new visual assets, or modify the interactive showcases and team card telemetry views, this guide details exactly how the system is structured and where to make your changes.

---

## 📂 Workspace Directory Map

The repository is divided into three core sub-projects:

```
final physics project/
├── LABback-IQ/                  # Python API & Simulation Backend
│   ├── main.py                  # Backend startup entrypoint
│   ├── server.py                # HTTP Server handling APIs (Port 5000)
│   └── physics_engine.py        # Rigid solver calculation engine
│
├── LABfront-IQ-3D/              # 3D WebGL Virtual Lab Simulator
│   ├── index.html               # Lab index template 
│   ├── vite.config.js           # 3D Lab build bundle configurations
│   └── src/
│       └── main.js              # Three.js rendering, wires, and assessments
│
└── circuit.iq (1)final/         # React Main Portal & AI Console (Port 3000)
    ├── vite.config.ts           # Frontend bundle config with HMR & API Proxy
    ├── index.html               # Main index HTML
    └── src/
        ├── App.tsx              # View router and page transition casings
        ├── store/
        │   └── useAppStore.ts   # Zustand state management
        ├── pages/
        │   ├── LandingPage.tsx  # Hero landing page, Catalog card deck, & AI Console
        │   ├── LabStudio.tsx    # Fullscreen simulator container hosting iframe
        │   └── ContactPage.tsx  # Inbound support ticketing & call scheduler
        └── components/
            ├── Navbar.tsx             # Page layout navigation headers
            ├── PhysicsShowcase.tsx    # Home page interactive showcase widgets
            └── TeamRolesSection.tsx   # Team details & prototype video consoles
```

---

## 🛠️ Summary of Recent Upgrades

1. **Experiments Spacing Banner Removal**:
   - Removed the `PhysicsPlexusCanvas` rendering container and its vertical margin offset from the Experiments tab in [LandingPage.tsx](file:///c:/Users/anaya/OneDrive/Desktop/final%20physics%20project/circuit.iq%20%281%29final/src/pages/LandingPage.tsx).
   - This resolves the blank horizontal banner gap, allowing the category navigation and cards to align directly below the top navigation bar.

2. **`PhysicsBot` AI Console UI [Aesthetic Redesign]**:
   - Elevated the console style with a dark-glass glassmorphism theme, backdrop radial glow blurs, a pulsing neon green status light, and custom capsule message bubble structures.
   - Integrated an animated SVG signal frequency wave visualizer into the terminal header to make it feel responsive and alive.
   - Upgraded suggestion chips with dynamic scaling transitions and glow effects on hover.
   - Refined the word-by-word `BotMessage` typing animation and terminal prompts (`operator:~$` and `physicsbot:~$`).

3. **WebGL Stability & Virtual Lab Launch Fixes**:
   - Modified `WebGLContextDisposer` inside [AntigravityHero.tsx](file:///c:/Users/anaya/OneDrive/Desktop/final%20physics%20project/circuit.iq%20%281%29final/src/components/AntigravityHero.tsx) to run inside try-catch blocks to prevent double-disposal and context loss exceptions from halting the React unmount cycle.
   - Implemented a 300ms delay (`shouldRender` state) on the home page's React-Three-Fiber `<Canvas />` to prevent context allocation conflicts with the exiting 3D lab iframe context.
   - Dynamic parameters inside [LabStudio.tsx](file:///c:/Users/anaya/OneDrive/Desktop/final%20physics%20project/circuit.iq%20%281%29final/src/pages/LabStudio.tsx) append target experiment IDs (`/lab.html?exp=${currentExperiment}`) when loading.


---

## 🚀 Recipe: How to Add a New Physics Experiment

To add a new experiment (e.g., `faraday_cage`), follow these four steps across the codebase:

### Step 1: Add to the React Portal Catalog
Open [LandingPage.tsx](file:///c:/Users/anaya/OneDrive/Desktop/final%20physics%20project/circuit.iq%20%281%29final/src/pages/LandingPage.tsx) and add your experiment configuration inside the `PHYSICS_DOMAINS` array under the matching category:
```typescript
{
  id: "faraday_cage",
  name: "Faraday Cage Shielding",
  desc: "Study electrostatic field isolation inside conductors.",
  aim: "Verify electric fields equal zero inside a conductor.",
  formula: "E_inside = 0"
}
```

### Step 2: Configure the Physics Math Backend
Open [physics_engine.py](file:///c:/Users/anaya/OneDrive/Desktop/final%20physics%20project/LABback-IQ/physics_engine.py) and update the calculation methods to return variables for your new experiment key:
```python
if active_experiment == 'faraday_cage':
    # Perform math calculations
    return {
        'status': 'success',
        'metrics': {
            'E_outside': v_input * 1.5,
            'E_inside': 0.0
        }
    }
```

### Step 3: Integrate inside the 3D WebGL Lab Simulator
Open [main.js](file:///c:/Users/anaya/OneDrive/Desktop/final%20physics%20project/LABfront-IQ-3D/src/main.js):
1. Add the experiment schemas to the `experiments` dictionary (around line 265) defining aim, formulas, instructions, and quiz assessments:
   ```javascript
   faraday_cage: {
     aim: "Observe electrostatic shielding inside hollow spheres.",
     formulas: [{ name: "Gauss Law", expr: "∮ E · dA = Q_enclosed / ε₀" }],
     steps: [{ id: 1, text: "Charge the sphere and measure internal electric fields." }],
     quiz: [{ q: "What is the electric field inside a charged conductor?", options: ["Infinity", "Zero", "E = V/R"], correct: 1 }]
   }
   ```
2. Modify `setupExperiment(expKey)` (around line 2030) or `initProceduralVisuals(expKey)` (around line 2075) to instantiate Three.js meshes representing the cage or charged sphere models.

### Step 4: Add AI Assistant Reference
Open [server.py](file:///c:/Users/anaya/OneDrive/Desktop/final%20physics%20project/LABback-IQ/server.py) and add matching keywords in `handle_physics_bot()` (around line 192) to recommend the simulation when users ask related questions:
```python
elif 'cage' in question or 'shielding' in question or 'electrostatic' in question:
    formulas = [{"name": "Gauss Shielding", "expr": "E_inside = 0"}]
    explanation = "A Faraday cage shields its interior by distributing external charges across its outer boundary."
    recommended_exp = "faraday_cage"
```

---

## 📹 Recipe: How to Embed Videos in the Team Cards

If you want to replace the mock `<SimulatedWaveform />` in the founder panels with actual product videos or mp4 demonstrations:

### Step 1: Place Video Assets
Save your video file (e.g. `ai_architect_demo.mp4`) in the public assets directory:
- `circuit.iq (1)final/public/assets/videos/`

### Step 2: Edit `TeamRolesSection.tsx`
Open [TeamRolesSection.tsx](file:///c:/Users/anaya/OneDrive/Desktop/final%20physics%20project/circuit.iq%20%281%29final/src/components/TeamRolesSection.tsx):
1. In the `TeamMember` interface, you can add a `videoUrl` parameter:
   ```typescript
   interface TeamMember {
     id: number;
     role: string;
     ...
     videoUrl?: string; // Add this line
   }
   ```
2. Map your video URLs to members inside the `team` array:
   ```typescript
   videoUrl: "/assets/videos/ai_architect_demo.mp4"
   ```
3. Locate the `Sandbox-Player` simulation area inside `TeamMemberCard` (around line 312):
   ```tsx
   {/* Replace SimulatedWaveform with HTML5 Video element */}
   <div className="flex-1 flex items-center justify-center relative">
     {member.videoUrl ? (
       <video 
         src={member.videoUrl} 
         controls 
         autoPlay 
         loop 
         muted 
         className="w-full h-full object-cover rounded-xl border border-slate-800"
       />
     ) : (
       <SimulatedWaveform index={index} />
     )}
   </div>
   ```

---

## 💻 Development Commands

### Start Server
Run the unified developer environment python script in the project root:
```powershell
python start_dev.py
```
This runs the Python backend API (Port 5000) and the React Vite dev server (Port 3000) concurrently with active proxy routing.

### Production Build
Whenever you make updates to the React components or frontend code, compile the production distribution:
```powershell
cd "circuit.iq (1)final"
npm run build
```
The built pages, styles, and js bundles will compile into `dist/` where they are served automatically by the Python handler.
