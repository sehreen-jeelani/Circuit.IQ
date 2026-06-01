# Circuit IQ — Python Backend Server

> **Virtual Physics Lab** · Python Backend · Serves the 3D frontend and provides circuit calculation APIs.

---

## 📁 Project Structure

```
Circuit-IQ/                       ← Python Backend Root
│
├── main.py                       ← 🚀 ENTRY POINT — Run this to start the server
│
├── server.py                     ← 🌐 HTTP Server — Serves frontend & REST API routes
│                                    Endpoints: POST /api/validate, POST /api/calculate
│
├── physics_engine.py             ← ⚡ Physics Engine — Circuit simulation calculations
│                                    Handles: Ohm's Law, LCR, RC experiments
│
├── ai_guide.py                   ← 🤖 AI Guide Module — Experiment data, hints, viva Q&A
│                                    Contains: theory text, step-by-step instructions, viva answers
│
├── experiments/                  ← 📂 Experiments Directory — dynamic plugin experiment modules
│   ├── __init__.py               ← Package loader and registry builder
│   ├── base_experiment.py       ← Abstract Base Experiment class
│   ├── ohms.py                   ← Ohm's Law experiment calculations
│   ├── lcr.py                    ← Series LCR Resonance calculations
│   └── rc.py                     ← RC charging/discharging calculations
│
└── test_physics.py               ← 🧪 Unit Tests — Physics engine verification tests
```

---

## 🚀 How to Run

```bash
# From the project phy folder:
python Circuit-IQ/main.py

# This will:
# 1. Start the Python HTTP server on http://localhost:5000
# 2. Automatically open the browser with the 3D frontend
# 3. Make API endpoints available at /api/validate and /api/calculate
```

> **Note:** The frontend (Circuit-IQ-3D) must be built first using `npm run build` inside the `Circuit-IQ-3D` folder.

---

## 🌐 API Endpoints

### `POST /api/calculate`
Calculates circuit values (V, I, Z, P, XL, XC, phi, f0) for a given experiment.

**Request Body:**
```json
{
  "params": { "V": 12, "R": 100, "L": 50, "C": 100, "f": 50, "T": 25 },
  "active_experiment": "ohms",
  "button_pressed": true
}
```

### `POST /api/validate`
Validates if the circuit topology forms a valid closed loop.

**Request Body:**
```json
{
  "placed_components": [{"type": "source", "id": 0, "terminals": [0, 1]}],
  "wires": [[[0, 1], [1, 0]]],
  "required_types": ["source", "resistor"]
}
```

---

## ⚡ Supported Experiments

| Key    | Name                   | Required Components             |
|--------|------------------------|---------------------------------|
| `ohms` | Ohm's Law Verification | source, resistor                |
| `lcr`  | Series LCR Resonance   | source, resistor, inductor, cap |
| `rc`   | RC Time Constant       | source, resistor, capacitor     |

---

## 🔧 Dependencies

No external dependencies are required. Python 3.8+ built-in packages are used.
