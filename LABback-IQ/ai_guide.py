"""
================================================================================
 Circuit IQ — Virtual Physics Lab
 FILE: ai_guide.py
 ROLE: AI Guide Module — Experiment content, AI hints, viva Q&A, step guidance
================================================================================
 WHAT THIS FILE DOES:
    • Contains all experiment educational content (theory, steps, viva, conclusion)
    • AIGuide class evaluates user progress and returns contextual guidance
    • Used by the Python backend to inject structured content into API responses

 EXPERIMENT KEYS:
    'ohms'   → Ohm's Law Verification (DC)
    'lcr'    → Series LCR Resonance (AC)
    'rc'     → RC Time Constant (AC)
    (arduino_led is handled in JS frontend directly)

 KEY METHODS:
    set_experiment(key)             → Set current experiment, reset progress
    get_hint()                      → Returns next contextual hint string
    evaluate_steps_progress(...)    → Returns (progress%, score, current_step_msg)

 DATA STRUCTURE PER EXPERIMENT:
    name      → Display name
    mode      → 'DC' or 'AC'
    req       → Required component types list
    theory    → HTML theory text
    formulas  → List of formula strings
    steps     → List of step instruction strings
    viva      → List of {question, options[], answer_index} dicts
    conclusion → Summary conclusion text

 CALLED BY:
    server.py (optional) — for advanced AI integration
    frontend JS accesses its own inline copy of experiments data
================================================================================
"""

class AIGuide:
    EXPERIMENTS = {
        'ohms': {
            'name': "Ohm's Law Verification",
            'mode': 'DC',
            'req': ['source', 'resistor'],
            'theory': (
                "<b>Ohm's Law</b> states that the current through a conductor is directly "
                "proportional to the voltage across it, provided temperature remains constant.<br><br>"
                "<b>Formula:</b> V = I × R<br><br>"
                "In this experiment we verify this by varying resistance R while keeping voltage V constant, "
                "and observing that current I = V/R changes accordingly.<br><br>"
                "<b>Key Principles:</b><br>"
                "• Direct proportionality: I ∝ V<br>"
                "• Inverse relationship: I ∝ 1/R<br>"
                "• Slope of V-I graph = Resistance R"
            ),
            'formulas': ['V = I × R', 'R = V / I', 'P = V × I = I²R'],
            'steps': [
                "Mount the <b>DC Power Source</b> on the lab board by clicking the parts inventory and clicking the board.",
                "Mount a <b>Ceramic Resistor</b> on the board.",
                "Connect Source (+) terminal to Resistor terminal 1 by clicking both terminals in Wiring Mode.",
                "Connect Resistor terminal 2 back to Source (−) terminal to close the loop.",
                "Click <b>Initialize System</b> and vary R using the slider to observe the inverse relationship.",
                "Record multiple data points using the Graph panel, then analyze the V-I plot."
            ],
            'viva': [
                {
                    'question': "Ohm's Law states that current is:",
                    'options': [
                        "Directly proportional to voltage and resistance",
                        "Directly proportional to voltage and inversely proportional to resistance",
                        "Inversely proportional to voltage and directly proportional to resistance",
                        "Independent of both voltage and resistance"
                    ],
                    'answer': 1
                },
                {
                    'question': "What does the slope of a V-I graph represent?",
                    'options': ["Conductance", "Capacitance", "Resistance", "Inductance"],
                    'answer': 2
                },
                {
                    'question': "How does increasing temperature affect resistance in a metal conductor?",
                    'options': ["Decreases", "Increases", "Remains constant", "First decreases then increases"],
                    'answer': 1
                },
                {
                    'question': "Which of the following is a non-ohmic conductor?",
                    'options': ["Copper wire", "Carbon resistor", "Semiconductor diode", "Iron filament"],
                    'answer': 2
                }
            ],
            'conclusion': "The experiment successfully verified Ohm's Law. The V-I graph produced a straight line passing through the origin, confirming that current is directly proportional to voltage for a constant resistance. The calculated resistance from the slope matched the set resistance value within experimental tolerance."
        },
        'lcr': {
            'name': "Series LCR Circuit",
            'mode': 'AC',
            'req': ['source', 'resistor', 'inductor', 'capacitor'],
            'theory': (
                "A <b>Series LCR Circuit</b> combines Resistance (R), Inductance (L) and Capacitance (C) in series with an AC source.<br><br>"
                "<b>Impedance:</b> Z = √(R² + (X<sub>L</sub> − X<sub>C</sub>)²)<br>"
                "<b>X<sub>L</sub></b> = 2πfL &nbsp; <b>X<sub>C</sub></b> = 1/(2πfC)<br><br>"
                "<b>Resonance</b> occurs when X<sub>L</sub> = X<sub>C</sub>, giving f₀ = 1/(2π√LC).<br>"
                "At resonance, Z = R (minimum), and current is maximum."
            ),
            'formulas': ['Z = √(R² + (XL-XC)¹)', 'XL = 2πfL', 'XC = 1/(2πfC)', 'f₀ = 1/(2π√LC)', 'φ = arctan((XL-XC)/R)'],
            'steps': [
                "Mount the <b>AC Power Source</b> on the lab board.",
                "Mount a <b>Ceramic Resistor</b> on the board.",
                "Mount a <b>Copper Inductor</b> on the board.",
                "Mount an <b>Electrolytic Capacitor</b> to complete the roster.",
                "Select the Wiring Harness and wire all components in a series loop.",
                "Initialize System and tune frequency toward resonance frequency f₀ to observe peak current."
            ],
            'viva': [
                {
                    'question': "At resonance in a series LCR circuit, the impedance is:",
                    'options': ["Maximum", "Minimum", "Zero", "Infinite"],
                    'answer': 1
                },
                {
                    'question': "The resonance frequency formula is:",
                    'options': ["f₀ = 1 / (2πLC)", "f₀ = 1 / (2π√LC)", "f₀ = 2π / √LC", "f₀ = √LC / 2π"],
                    'answer': 1
                },
                {
                    'question': "What is the phase difference between voltage and current at resonance?",
                    'options': ["90° (V leads)", "-90° (I leads)", "0° (in phase)", "180° (out of phase)"],
                    'answer': 2
                },
                {
                    'question': "If inductance L is increased, the resonance frequency f₀ will:",
                    'options': ["Increase", "Decrease", "Remain the same", "Double"],
                    'answer': 1
                }
            ],
            'conclusion': "The LCR circuit experiment demonstrated AC impedance behavior. At resonance frequency f₀, impedance was minimized to R and current peaked. Increasing f beyond f₀ made the circuit inductive (X_L > X_C), while below f₀ it became capacitive."
        },
        'rc': {
            'name': "RC Time Constant",
            'mode': 'AC',
            'req': ['source', 'resistor', 'capacitor'],
            'theory': (
                "An <b>RC Circuit</b> exhibits a phase difference between voltage and current due to the capacitor's reactive behavior.<br><br>"
                "<b>Impedance:</b> Z = √(R² + X<sub>C</sub>²)<br>"
                "<b>Phase Angle:</b> φ = −arctan(X<sub>C</sub>/R)<br><br>"
                "The <b>Time Constant</b> τ = RC determines how quickly the capacitor charges/discharges. At t = τ, the capacitor reaches 63.2% of its final voltage."
            ),
            'formulas': ['Z = √(R² + XC²)', 'XC = 1/(2πfC)', 'τ = R × C', 'φ = -arctan(XC/R)', 'V_C(t) = V(1 - e^(-t/τ))'],
            'steps': [
                "Mount the <b>AC Power Source</b> on the lab board.",
                "Mount a <b>Ceramic Resistor</b> on the board.",
                "Mount an <b>Electrolytic Capacitor</b> on the board.",
                "Select the Wiring Harness and wire in a series loop.",
                "Initialize System. Vary frequency and observe phase angle change in the oscilloscope.",
                "Record the time constant τ = RC and verify with the displayed values."
            ],
            'viva': [
                {
                    'question': "What is the time constant (τ) of a circuit with R = 10kΩ and C = 10μF?",
                    'options': ["0.01 seconds", "0.1 seconds", "1.0 seconds", "10.0 seconds"],
                    'answer': 1
                },
                {
                    'question': "In a pure capacitive circuit, the current:",
                    'options': ["Leads voltage by 90°", "Lags voltage by 90°", "Is in phase with voltage", "Lags voltage by 45°"],
                    'answer': 0
                },
                {
                    'question': "After a time period equal to one time constant (t = τ), a charging capacitor reaches:",
                    'options': ["50% voltage", "63.2% voltage", "90% voltage", "36.8% voltage"],
                    'answer': 1
                },
                {
                    'question': "What type of filter is a series RC circuit if output is taken across the capacitor?",
                    'options': ["High-pass filter", "Low-pass filter", "Band-pass filter", "Band-stop filter"],
                    'answer': 1
                }
            ],
            'conclusion': "The RC circuit experiment confirmed the frequency-dependent behavior of capacitive reactance. The phase angle φ decreased with increasing frequency, and the time constant τ = RC was verified experimentally. The oscilloscope clearly showed the phase lag of current behind voltage."
        }
    }

    HINTS = {
        'ohms': [
            "Try adjusting the Resistance slider to see current change inversely.",
            "Connect source (+) to resistor and back to source (−) to form a closed loop.",
            "V-I graph slope = R. Record 5+ data points for best-fit line."
        ],
        'lcr': [
            "Tune frequency toward f₀ (shown in Analysis tab) for maximum current.",
            "Ensure all 4 components are wired in series — same current flows through all.",
            "Resonance is when XL = XC. Watch the phase angle approach 0°."
        ],
        'rc': [
            "Phase angle φ becomes more negative as frequency increases.",
            "Try τ = RC — charge the capacitor and time it in your head!",
            "XC = 1/(2πfC) — increasing C reduces capacitive reactance."
        ]
    }

    def __init__(self):
        self.current_exp = 'ohms'
        self.step_index = 0
        self.hint_idx = 0
        self.viva_answers = {} # Maps (exp, q_idx) -> selected_option_idx

    def set_experiment(self, exp_key):
        if exp_key in self.EXPERIMENTS:
            self.current_exp = exp_key
            self.step_index = 0
            self.hint_idx = 0
            return self.EXPERIMENTS[exp_key]
        return None

    def get_current_exp_data(self):
        return self.EXPERIMENTS[self.current_exp]

    def get_hint(self):
        h = self.HINTS[self.current_exp]
        hint = h[self.hint_idx % len(h)]
        self.hint_idx += 1
        return hint

    def evaluate_steps_progress(self, placed_types, wire_count, is_running):
        """
        Evaluates the current progress step.
        """
        req = self.EXPERIMENTS[self.current_exp]['req']
        
        if is_running:
            self.step_index = len(self.EXPERIMENTS[self.current_exp]['steps']) - 1
            progress = 100
            score = 100
            return progress, score, "System active. Adjust parameters to observe dynamic responses. Use the Graph panel to record data points."
            
        placed_valid = 0
        for r in req:
            if r in placed_types:
                placed_valid += 1
                
        if placed_valid == 0:
            self.step_index = 0
        elif placed_valid < len(req):
            self.step_index = placed_valid
        elif placed_valid == len(req):
            self.step_index = len(req) if wire_count < len(req) else len(req) + 1
            
        total_steps = len(self.EXPERIMENTS[self.current_exp]['steps'])
        self.step_index = min(self.step_index, total_steps - 1)
        
        progress = int((self.step_index / total_steps) * 100)
        score = int(progress * 0.7)
        
        message = self.EXPERIMENTS[self.current_exp]['steps'][self.step_index]
        return progress, score, message
