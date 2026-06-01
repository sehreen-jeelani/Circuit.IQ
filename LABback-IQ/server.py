"""
================================================================================
 Circuit IQ — Virtual Physics Lab
 FILE: server.py
 ROLE: HTTP Server — Serves frontend static files + REST API endpoints
================================================================================
 ARCHITECTURE:
    • Uses Python's built-in http.server (no external framework needed)
    • Extends SimpleHTTPRequestHandler to serve from Circuit-IQ-3D/dist/
    • Handles two POST API routes for frontend-backend communication

 API ROUTES:
    POST /api/validate   → Validates circuit topology (closed loop check)
                           Called by: frontend when user clicks "Simulate"
                           Handler: handle_validate() → PhysicsEngine.validate_circuit()

    POST /api/calculate  → Computes V, I, Z, P, XL, XC, phi, f0 for experiment
                           Called by: frontend polling every 250ms while running
                           Handler: handle_calculate() → PhysicsEngine.calculate()

    GET  /*              → Serves static files from Circuit-IQ-3D/dist/
                           (index.html, JS bundles, CSS, assets, models)

 DEPENDENCIES:
    → physics_engine.py  (PhysicsEngine class for all calculations)
    → Circuit-IQ-3D/dist/ (built frontend — run 'npm run build' first)

 USAGE:
    Called from main.py: start_server(port=5000)
================================================================================
"""

import os
import json
import webbrowser
import random
import datetime
from http.server import SimpleHTTPRequestHandler, HTTPServer
from physics_engine import PhysicsEngine

# Base directory paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST_DIR = os.path.join(BASE_DIR, "circuit.iq (1)final", "dist")

class CircuitIQRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        # Initialize SimpleHTTPRequestHandler serving from target dist directory
        super().__init__(*args, directory=DIST_DIR, **kwargs)

    def do_POST(self):
        if self.path == '/api/validate':
            self.handle_validate()
        elif self.path == '/api/calculate':
            self.handle_calculate()
        elif self.path == '/api/contact':
            self.handle_contact()
        elif self.path == '/api/physics-bot':
            self.handle_physics_bot()
        else:
            self.send_error(404, "API endpoint not found")

    def handle_validate(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            placed_components = data.get('placed_components', [])
            wires = data.get('wires', [])
            required_types = data.get('required_types', [])

            # Convert wire format from list-of-lists to list-of-tuples for engine
            wires_tuples = []
            for w in wires:
                # w is: [[c1, t1], [c2, t2]]
                wires_tuples.append((
                    (int(w[0][0]), int(w[0][1])),
                    (int(w[1][0]), int(w[1][1]))
                ))

            engine = PhysicsEngine()
            is_valid, msg = engine.validate_circuit(placed_components, wires_tuples, required_types)

            response = {
                'status': 'success' if is_valid else 'fail',
                'message': msg
            }

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode('utf-8'))
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'error', 'message': str(e)}).encode('utf-8'))

    def handle_calculate(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            params = data.get('params', {})
            active_experiment = data.get('active_experiment', 'ohms')

            engine = PhysicsEngine()
            
            # Map parameters to physical standard values
            if 'R' in params:
                engine.set_param('R', float(params['R']))
            if 'L' in params:
                # UI is mH, physical is H
                engine.set_param('L', float(params['L']) * 1e-3)
            if 'C' in params:
                # UI is uF, physical is F
                engine.set_param('C', float(params['C']) * 1e-6)
            if 'V' in params:
                engine.set_param('V', float(params['V']))
            if 'f' in params:
                engine.set_param('f', float(params['f']))
            if 'T' in params:
                engine.set_param('T', float(params['T']))

            button_pressed = data.get('button_pressed', True)
            results = engine.calculate(active_experiment, button_pressed)

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(results).encode('utf-8'))
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'error', 'message': str(e)}).encode('utf-8'))

    def handle_contact(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            # Extract fields
            name = data.get('name', '')
            email = data.get('email', '')
            request_type = data.get('requestType', '')
            subject = data.get('subject', '')
            message = data.get('message', '')

            ticket_id = f"CIQ-{random.randint(100000, 999999)}"
            ticket_data = {
                'ticketId': ticket_id,
                'timestamp': datetime.datetime.now().isoformat(),
                'name': name,
                'email': email,
                'requestType': request_type,
                'subject': subject,
                'message': message
            }

            # Save to tickets.json in workspace root
            tickets_file = os.path.join(BASE_DIR, "tickets.json")
            tickets = []
            if os.path.exists(tickets_file):
                try:
                    with open(tickets_file, 'r', encoding='utf-8') as f:
                        tickets = json.load(f)
                except Exception:
                    tickets = []
            tickets.append(ticket_data)
            with open(tickets_file, 'w', encoding='utf-8') as f:
                json.dump(tickets, f, indent=2, ensure_ascii=False)

            response = {
                'status': 'success',
                'ticketId': ticket_id,
                'message': 'Support ticket filed successfully inside the database!'
            }

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode('utf-8'))
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'error', 'message': str(e)}).encode('utf-8'))

    def handle_physics_bot(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            question = data.get('question', '').lower().strip()

            formulas = []
            explanation = ""
            recommended_exp = None

            if 'ohm' in question or 'circuit' in question or 'voltage' in question or 'resistor' in question:
                formulas = [
                    {"name": "Ohm's Law", "expr": "V = I × R"},
                    {"name": "Current Rate", "expr": "I = V / R"},
                    {"name": "Electrical Power", "expr": "P = V × I = I²R"}
                ]
                explanation = "Ohm's Law states that current is directly proportional to voltage and inversely proportional to resistance. In the lab, you can place a source and resistor and watch loop currents scale in real-time."
                recommended_exp = "ohms"
            elif 'lcr' in question or 'resonance' in question or 'reactance' in question or 'impedance' in question:
                formulas = [
                    {"name": "Impedance Z", "expr": "Z = √[R² + (XL - XC)²]"},
                    {"name": "Resonant Freq f₀", "expr": "f₀ = 1 / (2π√(LC))"},
                    {"name": "Reactances", "expr": "XL = 2πfL, XC = 1/(2πfC)"}
                ]
                explanation = "Series LCR resonance occurs when inductive and capacitive reactances are perfectly equal ($X_L = X_C$), minimizing loop impedance to R and maximizing the peak current amplitude."
                recommended_exp = "lcr"
            elif 'rc' in question or 'capacitor' in question or 'decay' in question or 'charging' in question:
                formulas = [
                    {"name": "Time Constant τ", "expr": "τ = R × C"},
                    {"name": "Charging Curve", "expr": "Vc(t) = Vs(1 - e^(-t/τ))"},
                    {"name": "Stored Energy E", "expr": "E = ½ C V²"}
                ]
                explanation = "An RC circuit stores energy electrostatically. The charge rate is defined by time constant $\\tau = RC$, taking approximately $5\\tau$ to reach full capacity."
                recommended_exp = "rc"
            elif 'pendulum' in question or 'gravity' in question or 'bob' in question or 'string' in question:
                formulas = [
                    {"name": "Oscillation Period T", "expr": "T = 2π √(L / g)"},
                    {"name": "Angular Motion", "expr": "θ(t) = θ₀ cos(√(g/L) t)"},
                    {"name": "Restoring Force", "expr": "F = -m g sin(θ)"}
                ]
                explanation = "A simple pendulum executes simple harmonic motion under small angle approximations. Its period depends solely on length $L$ and local gravity $g$, remaining completely independent of the bob mass."
                recommended_exp = "pendulum"
            elif 'snell' in question or 'refraction' in question or 'refract' in question or 'optical' in question or 'lens' in question or 'tir' in question or 'prism' in question:
                formulas = [
                    {"name": "Snell's Law", "expr": "n₁ sin(θ₁) = n₂ sin(θ₂)"},
                    {"name": "Critical Angle θc", "expr": "θc = arcsin(n₂ / n₁)"},
                    {"name": "Lens Equation", "expr": "1/f = 1/v + 1/u"}
                ]
                explanation = "Optics rules dictate how light bends at media boundaries. Refraction matches Snell's law. Total Internal Reflection (TIR) locks the ray if incident angle exceeds critical $\\theta_c$."
                recommended_exp = "snell"
            elif 'gas' in question or 'boyle' in question or 'charles' in question or 'piston' in question or 'thermo' in question:
                formulas = [
                    {"name": "Ideal Gas Law", "expr": "P V = n R T"},
                    {"name": "Boyle's Law (const T)", "expr": "P₁ V₁ = P₂ V₂"},
                    {"name": "Charles's Law (const P)", "expr": "V₁ / T₁ = V₂ / T₂"}
                ]
                explanation = "Thermodynamics describes thermal behavior. The Ideal Gas Law combines Boyle's and Charles's laws. You can study these relations in our pressurized chamber simulation."
                recommended_exp = "ideal_gas"
            elif 'photoelectric' in question or 'planck' in question or 'quantum' in question or 'photon' in question:
                formulas = [
                    {"name": "Einstein's Equation", "expr": "Kmax = h ν - Φ"},
                    {"name": "Stopping Voltage", "expr": "Vs = Kmax / e"},
                    {"name": "Threshold Freq", "expr": "ν₀ = Φ / h"}
                ]
                explanation = "The photoelectric effect demonstrates the particle nature of light. Photons eject electrons only if their energy exceeds work function $\\Phi$. Higher light intensity ejects more electrons, but doesn't increase kinetic energy."
                recommended_exp = "photoelectric"
            elif 'decay' in question or 'radioactive' in question or 'half-life' in question or 'nuclear' in question:
                formulas = [
                    {"name": "Decay Law", "expr": "N(t) = N₀ e^(-λ t)"},
                    {"name": "Half-Life T₁/₂", "expr": "T₁/₂ = ln(2) / λ"},
                    {"name": "Activity A", "expr": "A(t) = λ N(t)"}
                ]
                explanation = "Radioactive decay is a random quantum event following exponential probability curves. The remaining nuclei count drops by half after every time block equal to the half-life."
                recommended_exp = "radioactive"
            elif 'bohr' in question or 'hydrogen' in question or 'atomic' in question or 'orbit' in question:
                formulas = [
                    {"name": "Bohr Energy Levels", "expr": "En = -13.6 / n² (eV)"},
                    {"name": "Rydberg Formula", "expr": "1/λ = R_H (1/n_f² - 1/n_i²)"},
                    {"name": "De Broglie Orbit", "expr": "2π r = n λ"}
                ]
                explanation = "The Bohr model organizes electrons in quantized orbits. Jumps between shells emit or absorb photons whose energy equals the exact step difference."
                recommended_exp = "bohr_model"
            else:
                formulas = [
                    {"name": "Mass-Energy Equivalent", "expr": "E = m c²"},
                    {"name": "Newton's 2nd Law", "expr": "F = m a"},
                    {"name": "Wave Speed", "expr": "v = f λ"}
                ]
                explanation = "Hello! I am PhysicsBot, your AI tutor. You can ask me questions about circuits (Ohm's, LCR, RC), Electromagnetism, Optics, Mechanics, Thermodynamics, or Modern Physics. I will provide formulas and suggest interactive simulations!"

            response = {
                'status': 'success',
                'formulas': formulas,
                'explanation': explanation,
                'recommendedExp': recommended_exp
            }

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode('utf-8'))
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'error', 'message': str(e)}).encode('utf-8'))

def start_server(port=5000):
    # Ensure dist folder exists
    if not os.path.exists(DIST_DIR):
        print(f"[ERROR] Production dist folder not found at: {DIST_DIR}")
        print("Please build the frontend project using 'npm run build' inside 'Circuit-IQ-3D' first.")
        return

    server_address = ('', port)
    httpd = HTTPServer(server_address, CircuitIQRequestHandler)
    print(f"\n========================================================")
    print(f"   [Circuit.IQ 3D Virtual Lab Python Backend Server]")
    print(f"========================================================")
    print(f"Serving frontend from: {DIST_DIR}")
    print(f"API Endpoints active: /api/validate, /api/calculate")
    print(f"Listening on: http://localhost:{port}")
    print(f"Press Ctrl+C to stop the server.")
    print(f"========================================================\n")
    
    # Automatically launch browser window
    webbrowser.open(f"http://localhost:{port}")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping Python backend server...")
        httpd.server_close()

if __name__ == '__main__':
    start_server()
