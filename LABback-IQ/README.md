# 🐍 Circuit.IQ — Python Backend Server

> Flask API server that handles physics calculations, AI tutoring, circuit storage, and serves the built website.

---

## What This Does

This is the **brain** of Circuit.IQ. It:

- 🧮 **Calculates physics** — voltage, current, impedance, power for all 26 experiments
- ✅ **Validates circuits** — checks if wired components form a valid loop
- 🤖 **Powers the AI mentor** — connects to Google Gemini for intelligent Q&A
- 💾 **Saves/loads circuits** — stores student work in SQLite or Supabase
- 📧 **Handles contact forms** — sends support emails via Resend
- 🌐 **Serves the website** — hosts the built React + 3D lab files

---

## 🚀 How to Run

### With the full app (recommended):
```bash
# From project root:
python start_dev.py
```

### Standalone:
```bash
cd LABback-IQ
pip install -r requirements.txt
cp .env.example .env          # Add your API keys
python main.py                # → http://localhost:5000
```

---

## 📁 File Guide

```
LABback-IQ/
├── main.py                ← Start here (runs the server)
├── app.py                 ← Flask setup, CORS, registers all routes
├── config.py              ← Reads .env file into Config class
├── physics_engine.py      ← All the math (V=IR, impedance, resonance, etc.)
├── ai_guide.py            ← Built-in tutoring hints (no AI key needed)
├── database.py            ← Save/load circuits (SQLite or Supabase)
├── test_physics.py        ← Unit tests for calculations
├── requirements.txt       ← Python packages to install
├── .env                   ← Your private API keys
├── .env.example           ← Template — copy to .env
│
├── experiments/           ← Modular calculation plugins
│   ├── base_experiment.py ←   Base class all experiments extend
│   ├── ohms.py            ←   Ohm's Law: V = IR
│   ├── lcr.py             ←   LCR Resonance: Z, XL, XC, φ, f₀
│   └── rc.py              ←   RC Time Constant: τ = RC
│
└── routes/                ← API endpoints (one file per feature)
    ├── physics.py         ←   /api/calculate, /api/validate
    ├── physicsbot.py      ←   /api/physicsbot/ask (Gemini AI)
    ├── contact.py         ←   /api/contact (email)
    ├── database_routes.py ←   /api/db/* (save/load circuits)
    └── attendance.py      ←   /api/attendance/* (student tracking)
```

---

## 🔑 Environment Variables

Copy `.env.example` → `.env` and fill in what you need:

| Variable | What it does | Without it... |
|----------|-------------|---------------|
| `GEMINI_API_KEY` | AI mentor & PhysicsBot | Uses built-in formulas instead |
| `SUPABASE_URL` | Cloud database connection | Uses local SQLite file |
| `SUPABASE_ANON_KEY` | Cloud database auth | Uses local SQLite file |
| `RESEND_API_KEY` | Sends contact form emails | Logs to console |
| `FLASK_DEBUG` | Shows detailed errors | Defaults to `false` |
| `PORT` | Server port | Defaults to `5000` |

> **The server works with zero API keys configured.** Everything has a local fallback.

---

## 🌐 All API Endpoints

### Physics Calculations

**`POST /api/calculate`** — Compute circuit values

```json
// Request:
{
  "params": { "V": 12, "R": 100, "L": 50, "C": 100, "f": 50, "T": 25 },
  "active_experiment": "ohms",
  "button_pressed": false
}

// Response:
{
  "status": "success",
  "metrics": { "V": 12, "I": 0.12, "Z": 100, "P": 1.44 }
}
```

**`POST /api/validate`** — Check if circuit is wired correctly

```json
// Request:
{
  "placed_components": [{ "type": "source", "id": 0, "terminals": [0, 1] }],
  "wires": [[[0, 1], [1, 0]]],
  "required_types": ["source", "resistor"]
}

// Response:
{ "valid": true, "message": "Circuit forms a valid closed loop." }
```

---

### AI PhysicsBot

**`POST /api/physicsbot/ask`** — Ask a contextual question from inside the 3D simulation panel.
```json
// Request:
{
  "question": "Why is my diode not conducting?",
  "experiment": "diode_iv",
  "circuit_state": {
    "placed_components": [{"type": "diode", "id": "d1"}],
    "wires": [],
    "params": {"V": 5},
    "readings": {"I": 0}
  }
}

// Response:
{
  "answer": "Your diode is reverse-biased because the anode is connected to the negative terminal..."
}
```

**`POST /api/physics-bot`** — Ask a general physics question on the landing page portal.
```json
// Request:
{
  "question": "Tell me about Ohm's Law."
}

// Response (JSON mode):
{
  "explanation": "Ohm's Law states that the current through a conductor...",
  "formulas": [{"name": "Ohm's Law", "expr": "V = I × R"}],
  "recommendedExp": "ohms"
}
```

---

### Circuit & User Database

| Endpoint | Method | Role / Description |
|----------|--------|--------------------|
| `/api/db/save-circuit` | POST | Saves components list, wire paths, and slider parameters to DB |
| `/api/db/load-circuit` | GET | Fetches the saved layout (query parameters: `user_id`, `experiment_type`) |
| `/api/db/save-log` | POST | Records a new experiment attempt (duration, score, feedback, notes) |
| `/api/db/get-logs` | GET | Lists past attempts for a user (query parameters: `user_id`, optional `experiment_type`) |
| `/api/db/profile` | GET | Retrieves student profile (university, semester, graduation year) |
| `/api/db/profile` | POST | Creates or updates student profile details |

---

### Attendance & Session Management

| Endpoint | Method | Role / Description |
|----------|--------|--------------------|
| `/api/admin/login` | POST | Authenticates professor and returns a UUID auth token |
| `/api/admin/session/create` | POST | Creates a lab session for a group (returns session join code) |
| `/api/admin/session/list` | GET | Lists all active and past sessions managed by the admin |
| `/api/admin/session/<session_id>/delete` | DELETE | Deletes a session from the list |
| `/api/session/join` | POST | Checks a student in to the session using join code and registration number |
| `/api/session/<session_id>/status` | GET | Polls the current session state (waiting, active, paused, ended) |
| `/api/session/<session_id>/presence` | POST | Receives webcam person count from client-side TensorFlow.js loop |
| `/api/session/<session_id>/end` | POST | Concludes session and compiles attendance logs |
| `/api/session/<session_id>/log` | GET | Exports final student audit timeline log |

---

### Support Ticket System

| Endpoint | Method | Role / Description |
|----------|--------|--------------------|
| `/api/contact` | POST | Accepts contact form submission and dispatches notification via Resend API |

---

## ⚡ Physics Engine

The solver in `physics_engine.py` handles calculations per experiment:

| Experiment | What it computes |
|-----------|-----------------|
| Ohm's Law | V, I = V/R, P = VI |
| KVL / KCL | Voltage drops, branch currents |
| LCR / RC_RL_RLC | XL, XC, Z, phase angle φ, resonant frequency f₀ |
| RC | Time constant τ = RC |
| Wheatstone | Bridge balance point |
| Diode | Shockley equation, barrier voltage 0.7V |
| Transformer | Voltage ratio Vs/Vp = Ns/Np |
| Solenoid | Magnetic field B = μ₀nI |
| Faraday / Lenz | Induced EMF pulses |
| Arduino LED | I = (Vpin − Vled) / R |

---

## 💾 Database

Two backends, automatically selected:

| If... | Then uses... |
|-------|-------------|
| `SUPABASE_URL` is set | Supabase PostgreSQL (cloud) |
| No Supabase keys | SQLite file (`circuit_iq.db`) |

**Tables:**
- `profiles` — student name, university, semester
- `circuits` — saved circuit layouts (JSON with components, wires, params)
- `experiment_logs` — experiment results, scores, duration

---

## 🧪 Running Tests

```bash
python test_physics.py
```

Tests Ohm's Law, LCR impedance, RC time constant, and edge cases.

---

## 📦 Dependencies

| Package | Version | Why |
|---------|---------|-----|
| flask | 3.1.0 | Web server |
| flask-cors | 5.0.0 | Allow cross-origin API calls |
| python-dotenv | 1.0.1 | Load .env file |
| google-generativeai | 0.8.3 | Gemini AI integration |
| supabase | 2.10.0 | Cloud database client |

Plus Python's built-in `sqlite3` (no install needed).

---

## ❓ Common Problems

| Problem | Fix |
|---------|-----|
| `ModuleNotFoundError` | `pip install -r requirements.txt` |
| Port 5000 in use | Change `PORT` in `.env` or kill the process |
| AI not responding | Check `GEMINI_API_KEY` in `.env` |
| Database errors | Delete `circuit_iq.db` and restart (auto-recreates) |
| CORS errors | Make sure the dev server URL is in `app.py` CORS origins |
