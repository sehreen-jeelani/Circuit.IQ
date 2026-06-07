<![CDATA[# 🛠️ Circuit.IQ – Developer Guide

> A quick‑start reference for contributors who want to extend the platform (new experiments, components, APIs, or UI).

---

## 1️⃣ Project Overview (One‑sentence)

Circuit.IQ = **React portal** → **iframe** (3D lab) → **Flask server** → **SQLite/Supabase**. All three pieces talk over `/api/*` endpoints.

---

## 2️⃣ Getting Started Locally

```bash
# Clone and install everything (once)
git clone https://github.com/SYEDTUFAILANDRABI/Circuit.IQ.git
cd Circuit.IQ

# Python backend
pip install -r LABback-IQ/requirements.txt
cp LABback-IQ/.env.example LABback-IQ/.env   # optional keys

# 3D lab
cd LABfront-IQ-3D && npm install && cd ..

# React portal
cd "circuit.iq (1)final" && npm install && cd ..
```

Run everything with a single command:
```bash
python start_dev.py
```

---

## 3️⃣ Adding a New Physics Experiment

1. **Create a plugin** in `LABback-IQ/experiments/`:
   - Copy `base_experiment.py` → `my_experiment.py`.
   - Implement `calculate(params)` and `validate(circuit)` methods.
   - Export the class in `__init__.py`.
2. **Add metadata** to `LABfront-IQ-3D/src/main.js` under the `EXPERIMENT_DATA` block:
   - `key`, `name`, `description`, `aim`, `componentsRequired`.
3. **Add a card** in `LandingPage.tsx` (React) – copy an existing `<ExperimentCard>` and change the `expKey`.
4. **Update README** (root) – the Experiments table automatically reflects the new entry.

> **Tip:** Run `python test_physics.py` after adding to ensure the new plugin passes basic tests.

---

## 4️⃣ Adding a New 3D Component (Breadboard)

1. **Add the 3D model** to `LABfront-IQ-3D/public/models/` (GLTF/GLB). Name it `my_component.glb`.
2. **Register the component** in `src/main.js` inside the `COMPONENT_LIBRARY` object:
   ```js
   "my_component": {
     model: "models/my_component.glb",
     span: 5,               // how many holes it occupies
     pins: [0, 4]           // snap indices for connections
   },
   ```
3. **Create a sidebar chip** – find the `createComponentChip` function and add a new entry with the icon and label.
4. **Wire handling** works automatically – just ensure `span` matches the number of holes.

---

## 5️⃣ Adding a New API Route (Flask)

1. **Create a new blueprint** in `LABback-IQ/routes/` (e.g., `my_feature.py`).
2. **Register the blueprint** in `app.py`:
   ```python
   from .routes.my_feature import my_feature_bp
   app.register_blueprint(my_feature_bp, url_prefix="/api/my_feature")
   ```
3. **Write unit tests** in `LABback-IQ/test_my_feature.py` and run `pytest` to verify.
4. **Document the endpoint** in `LABback-IQ/README.md` – use the table format already present.

---

## 6️⃣ Extending the Database (`customise.sql`)

`customise.sql` adds extra columns to the default Supabase schema. To add a new column:

```sql
ALTER TABLE circuits ADD COLUMN "my_extra" TEXT;
-- or for SQLite (same syntax works)
```

After editing, **run the migration**:
```bash
# If using Supabase CLI
supabase db push
# For local SQLite – nothing needed; the column appears on next run
```

Update the JSON circuit payload handling in `database.py` if the new column should be populated automatically.

---

## 7️⃣ Build & Deploy

### Development (hot‑reload)
```bash
python start_dev.py
```

### Production (single command)
```bash
python build_all.py   # builds 3D lab, copies assets, builds React portal
# Then serve with Flask:
cd LABback-IQ && python main.py   # serves on :5000
```

The built site is in `circuit.iq (1)final/dist/` and can be deployed to any static‑file host (Netlify, Vercel) while Flask can run on any PaaS (Render, Railway).

---

## 8️⃣ Testing

- **Physics engine**: `python LABback-IQ/test_physics.py`
- **Flask routes**: `pytest LABback-IQ/` (install `pytest` if missing)
- **React UI**: `npm test` inside the portal folder (uses Jest + React Testing Library)

---

## 9️⃣ Common Issues & Fixes

| Issue | Quick Fix |
|-------|----------|
| `ModuleNotFoundError: flask` | `pip install -r LABback-IQ/requirements.txt` |
| `npm ERR! missing script: dev` | Run `npm install` in the folder first |
| 3D models not loading | Verify file path & case‑sensitivity in `public/models/` |
| API 404 on `/api/*` | Ensure `python start_dev.py` is running; Flask default port is 5000 |
| Wire positions shift after reload | The `false` flag in `loadCircuitFromBackend()` (already applied) |
| Build fails (large chunks) | Add a manual chunk split in `vite.config.js` under `build.rollupOptions.output.manualChunks` |
| PDF generation blank | Allow pop‑ups for localhost; check console for `jspdf` errors |

---

## 🔧 Useful Scripts

| Script | What it does |
|--------|--------------|
| `python start_dev.py` | Starts Flask + React dev servers together |
| `python build_all.py` | Full production build (3D lab → React → Flask) |
| `python test_physics.py` | Runs physics engine unit tests |
| `npm run lint` | Checks TypeScript types & ESLint rules |
| `npm run preview` | Serves the built React app locally |

---

## 📚 Further Reading

- **API Reference** – see `LABback-IQ/README.md`
- **3D Lab Code Map** – see `LABfront-IQ-3D/README.md`
- **React Component Tree** – see `circuit.iq (1)final/README.md`
- **Database Schema** – see `schema.sql` and `customise.sql`

---

## 🎉 Thank You!

Contributions are welcome – feel free to open a Pull Request, add tests, and update the documentation sections above.

<div align="center">
Built with ❤️ by the Circuit.IQ Team – Python, Flask, React, Three.js, Gemini AI.
</div>
]]>
