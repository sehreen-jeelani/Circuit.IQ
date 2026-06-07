<![CDATA[# Circuit.IQ — Python Backend Server

> **Flask API server** · Physics engine · AI mentor · Database interface · Static file server

---

## 📑 Table of Contents

- [Overview](#overview)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Physics Engine](#-physics-engine)
- [AI Mentor System](#-ai-mentor-system)
- [Database Layer](#-database-layer)
- [Supported Experiments](#-supported-experiments)
- [Testing](#-testing)
- [Dependencies](#-dependencies)
- [Troubleshooting](#-troubleshooting)

---

## Overview

The backend is a **Flask 3.1** application that:

1. **Serves the built React + 3D Lab** static files from `circuit.iq (1)final/dist/`
2. **Provides REST API endpoints** for physics calculations, circuit validation, AI guidance, and database operations
3. **Runs a physics solver** that computes V, I, Z, P, XL, XC, phase angle, and resonant frequency
4. **Manages circuit persistence** via SQLite (local) or Supabase (cloud PostgreSQL)
5. **Integrates Google Gemini AI** for the PhysicsBot and AI Mentor (with local fallback)

---

## 📁 Project Structure

```
LABback-IQ/
│
├── main.py                     ← 🚀 ENTRY POINT — delegates to app.py
├── app.py                      ← 🌐 Flask factory — CORS, blueprints, static serving
├── config.py                   ← ⚙️ Environment config loader (.env → Config class)
├── physics_engine.py           ← ⚡ Rigid physics solver & DFS topology checker
├── ai_guide.py                 ← 🤖 Local rule-based tutoring, hints, viva Q&A
├── database.py                 ← 💾 Dual DB interface (Supabase + SQLite fallback)
├── test_physics.py             ← 🧪 Unit tests for physics calculations
├── requirements.txt            ← 📦 Python dependencies
│
├── .env                        ← 🔐 API keys & secrets (DO NOT COMMIT)
├── .env.example                ← 📝 Template for .env setup
│
├── experiments/                ← 📂 Modular experiment calculation plugins
│   ├── __init__.py             ←   Package loader & experiment registry
│   ├── base_experiment.py      ←   Abstract base experiment class
│   ├── ohms.py                 ←   Ohm's Law: V = IR, P = VI
│   ├── lcr.py                  ←   LCR Resonance: Z, XL, XC, φ, f₀
│   └── rc.py                   ←   RC Time Constant: τ = RC
│
└── routes/                     ← 📂 Flask API route blueprints
    ├── __init__.py             ←   Package init
    ├── physics.py              ←   POST /api/calculate, POST /api/validate
    ├── physicsbot.py           ←   POST /api/physicsbot/ask (Gemini AI chat)
    ├── contact.py              ←   POST /api/contact (Resend email tickets)
    ├── database_routes.py      ←   GET/POST /api/db/* (circuit CRUD, profiles, logs)
    └── attendance.py           ←   GET/POST /api/attendance/* (student tracking)
```

---

## 🚀 Quick Start

### Standalone (Backend Only)

```bash
cd LABback-IQ

# Install dependencies
pip install -r requirements.txt

# Copy and configure environment
cp .env.example .env
# Edit .env with your API keys

# Start the server
python main.py

# → Flask running on http://localhost:5000
# → Auto-opens browser
```

### With Frontend (Recommended)

```bash
# From the project root:
python start_dev.py

# → Backend on :5000, React dev server on :3000
# → API calls from :3000 are proxied to :5000
```

---

## 🔑 Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `SECRET_KEY` | No | `dev-secret-...` | Flask session encryption key |
| `FLASK_DEBUG` | No | `false` | Enable Flask debug mode |
| `GEMINI_API_KEY` | Recommended | — | [Google AI Studio](https://aistudio.google.com/) API key |
| `SUPABASE_URL` | No | — | Supabase project URL |
| `SUPABASE_ANON_KEY` | No | — | Supabase anonymous public key |
| `SUPABASE_SERVICE_ROLE_KEY` | No | — | Supabase service role key |
| `RESEND_API_KEY` | No | — | [Resend.com](https://resend.com) email API key |
| `CONTACT_TO_EMAIL` | No | `team@circuitiq.dev` | Contact form recipient email |
| `PORT` | No | `5000` | Server listening port |

**Fallback Behavior:**
- No Gemini key → AI uses local rule-based physics formulas
- No Supabase keys → Database uses local SQLite (`circuit_iq.db`)
- No Resend key → Contact form logs to console

---

## 🌐 API Endpoints

### Physics Routes (`routes/physics.py`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/calculate` | Compute circuit values for given parameters |
| `POST` | `/api/validate` | Validate circuit topology (DFS closed-loop check) |

#### `POST /api/calculate`

**Request:**
```json
{
  "params": { "V": 12, "R": 100, "L": 50, "C": 100, "f": 50, "T": 25 },
  "active_experiment": "ohms",
  "button_pressed": false
}
```

**Response:**
```json
{
  "status": "success",
  "metrics": {
    "V": 12, "I": 0.12, "Z": 100, "P": 1.44,
    "XL": 0, "XC": 0, "phi": 0, "f0": 0
  }
}
```

#### `POST /api/validate`

**Request:**
```json
{
  "placed_components": [
    { "type": "source", "id": 0, "terminals": [0, 1] },
    { "type": "resistor", "id": 1, "terminals": [1, 2] }
  ],
  "wires": [[[0, 1], [1, 0]]],
  "required_types": ["source", "resistor"]
}
```

**Response:**
```json
{ "valid": true, "message": "Circuit forms a valid closed loop." }
```

---

### PhysicsBot AI Routes (`routes/physicsbot.py`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/physicsbot/ask` | AI-powered physics Q&A (Gemini or local) |

**Request:**
```json
{ "question": "What is Ohm's Law?" }
```

**Response:**
```json
{
  "answer": "Ohm's Law states that V = IR...",
  "formulas": [{ "name": "Ohm's Law", "expr": "V = I × R" }],
  "recommended_experiment": "ohms"
}
```

---

### Database Routes (`routes/database_routes.py`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/db/save-circuit` | Save/update a circuit layout |
| `GET` | `/api/db/load-circuit` | Load a saved circuit by experiment type |
| `GET` | `/api/db/experiment-logs` | Get experiment attempt history |
| `POST` | `/api/db/experiment-log` | Log an experiment result |
| `GET` | `/api/db/profile` | Retrieve user profile |
| `POST` | `/api/db/profile` | Create/update user profile |

---

### Contact Routes (`routes/contact.py`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/contact` | Submit a support ticket (via Resend email) |

---

### Attendance Routes (`routes/attendance.py`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/attendance/students` | List all student records |
| `POST` | `/api/attendance/mark` | Mark attendance for a student |
| `GET` | `/api/attendance/report` | Get attendance report |

---

## ⚡ Physics Engine

The solver in `physics_engine.py` handles all circuit computations:

| Experiment | Computed Values |
|-----------|----------------|
| `ohms` | V, I = V/R, P = VI |
| `kvl` / `kcl` | V, I, R, P (Kirchhoff networks) |
| `lcr` / `rc_rl_rlc` | XL = ωL, XC = 1/ωC, Z = √(R²+(XL−XC)²), φ, f₀ |
| `rc` | τ = RC, charging curve |
| `series_parallel` | R_series = R1+R2, R_parallel |
| `wheatstone` | Bridge balance: Rx = R3·R2/R1 |
| `diode_iv` | Shockley equation, barrier voltage |
| `faraday` / `lenz` | EMF = −N(ΔΦ/Δt), pulse waveform |
| `solenoid` | B = μ₀nI |
| `transformer` | Vs = Vp·(Ns/Np) |
| `arduino_led` | I = (Vpin − Vled)/R |

---

## 🤖 AI Mentor System

Two levels of intelligence:

1. **Google Gemini AI** (when API key is configured)
   - Natural language physics explanations
   - Step-by-step problem solving
   - Context-aware experiment recommendations

2. **Local Rule-Based Engine** (`ai_guide.py`) — always available
   - Keyword-matched physics formulas
   - Experiment-specific hints and theory
   - Viva voce questions with explanations

---

## 💾 Database Layer

`database.py` provides a **dual-backend** interface:

| Feature | Supabase (Cloud) | SQLite (Local) |
|---------|-------------------|----------------|
| **When used** | `SUPABASE_URL` + `SUPABASE_ANON_KEY` set | Default fallback |
| **Database** | PostgreSQL | `circuit_iq.db` file |
| **Auth** | Row-Level Security (RLS) | None (single user) |
| **Initialization** | Manual via `schema.sql` + `customise.sql` | Auto-created on first run |

**Tables:** `profiles`, `circuits`, `experiment_logs`

**Key functions:**
- `save_circuit()` — Upsert circuit layout by experiment type
- `load_circuit()` — Retrieve saved circuit for restore
- `save_experiment_log()` — Record experiment attempt with score
- `get_profile()` / `upsert_profile()` — User profile CRUD

---

## 🔬 Supported Experiments

| Key | Name | Required Components |
|-----|------|---------------------|
| `ohms` | Ohm's Law Verification | source, resistor |
| `kvl` | Kirchhoff's Voltage Law | source, resistor |
| `kcl` | Kirchhoff's Current Law | source, resistor |
| `rc_rl_rlc` | LCR AC Impedance | source, resistor, inductor, capacitor |
| `lcr` | Series LCR Resonance | source, resistor, inductor, capacitor |
| `rc` | RC Time Constant | source, resistor, capacitor |
| `series_parallel` | Series & Parallel Loads | source, resistor |
| `wheatstone` | Wheatstone Bridge | source, resistor |
| `diode_iv` | Diode I-V Characteristics | source, resistor, diode, ammeter, voltmeter |
| `voltage_divider` | Voltage & Current Divider | source, resistor |
| `planck_led` | Planck's Constant (LEDs) | source, resistor, led |
| `arduino_led` | Arduino LED Control | source, button, led, resistor |
| `faraday` | Faraday's Induction | — (slider-based) |
| `lenz` | Lenz's Law | — (slider-based) |
| `solenoid` | Solenoid Field | — (slider-based) |
| `transformer` | AC Transformer | — (slider-based) |
| `biot_savart` | Biot-Savart's Law | — (slider-based) |
| `planck_photocell` | Planck's Photocell | — (slider-based) |
| `stefan_law` | Stefan's Law | — (slider-based) |
| `ideal_gas` | Ideal Gas Equation | — (slider-based) |
| `boyle` | Boyle's Law | — (slider-based) |
| `charles` | Charles's Law | — (slider-based) |
| `specific_heat` | Specific Heat | — (slider-based) |
| `photoelectric` | Photoelectric Effect | — (slider-based) |
| `radioactive` | Radioactive Decay | — (slider-based) |
| `de_broglie` | de Broglie Wave | — (slider-based) |
| `bohr_model` | Bohr Hydrogen Atom | — (slider-based) |

---

## 🧪 Testing

```bash
cd LABback-IQ
python test_physics.py
```

Tests cover:
- Ohm's Law calculations (V/I/R relationships)
- LCR impedance and resonant frequency
- RC time constant computation
- Edge cases (zero resistance, zero frequency)

---

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `flask` | 3.1.0 | Web framework |
| `flask-cors` | 5.0.0 | Cross-origin request handling |
| `python-dotenv` | 1.0.1 | Environment variable loading |
| `google-generativeai` | 0.8.3 | Gemini AI integration |
| `supabase` | 2.10.0 | Supabase client SDK |

> **Note:** Python's built-in `sqlite3` is used for local database — no extra install needed.

---

## ❓ Troubleshooting

| Problem | Solution |
|---------|----------|
| `ModuleNotFoundError` | Run `pip install -r requirements.txt` |
| Port 5000 already in use | `lsof -ti:5000 \| xargs kill` or change `PORT` in `.env` |
| Gemini AI not responding | Verify `GEMINI_API_KEY` in `.env` is valid |
| Database errors | Delete `circuit_iq.db` and restart (auto-recreated) |
| Supabase connection failed | Verify `SUPABASE_URL` and keys, or remove them to use SQLite |
| CORS errors in browser | Ensure CORS origins include your dev server URL |
| Contact form not sending | Add `RESEND_API_KEY` to `.env` |
]]>
