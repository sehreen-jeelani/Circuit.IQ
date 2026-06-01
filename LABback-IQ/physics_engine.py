"""
================================================================================
 Circuit IQ — Virtual Physics Lab
 FILE: physics_engine.py
 ROLE: Physics Engine — Circuit simulation and topology validation
================================================================================
 WHAT THIS FILE DOES:
    • PhysicsEngine class: calculates electrical quantities for 3 experiments
    • Temperature-corrected resistance: R_eff = R × (1 + α × (T - 25))
    • Supports energy accumulation over time (E = P × Δt)
    • Validates circuit topology using DFS graph traversal

 EXPERIMENTS SUPPORTED:
    'ohms'        → DC Ohm's Law: I = V/R, P = V×I
    'lcr'         → Series LCR: XL=2πfL, XC=1/(2πfC), Z=√(R²+(XL-XC)²)
    'rc'          → RC circuit: Z=√(R²+XC²), τ=RC, φ=−arctan(XC/R)

 KEY METHODS:
    calculate(exp_type, button_pressed) → dict of {V, I, Z, P, XL, XC, phi, f0}
    validate_circuit(components, wires, required) → (bool, message)
    set_param(key, value)  → Update R/L/C/V/f/T
    update_energy(P, dt)   → Accumulate energy

 CALLED BY:
    server.py → handle_calculate() and handle_validate()
================================================================================
"""

import math
from experiments import experiments_registry

class PhysicsEngine:
    def __init__(self):
        self.params = {
            'R': 100.0,       # Nominal resistance (Ohms)
            'L': 0.05,        # Inductance (Henries) - UI in mH
            'C': 0.0001,      # Capacitance (Farads) - UI in uF
            'f': 50.0,        # Frequency (Hz)
            'V': 12.0,        # Source voltage (V)
            'T': 25.0         # Temperature (°C)
        }
        self.energy_accumulator = 0.0

    def set_param(self, key, value):
        if key in self.params:
            self.params[key] = float(value)
            # Reset energy accumulator on major resistance/temperature changes
            if key in ['R', 'T']:
                self.reset_energy()

    def reset_energy(self):
        self.energy_accumulator = 0.0

    def calculate(self, exp_type, button_pressed=True):
        """
        Calculates circuit state parameters based on the current configuration.
        """
        R = self.params['R']
        L = self.params['L']
        C = self.params['C']
        f = self.params['f']
        V = self.params['V']
        T = self.params['T']

        # Temperature coefficient for copper: alpha = 0.00393 / °C
        alpha = 0.00393
        R_eff = R * (1.0 + alpha * (T - 25.0))
        omega = 2.0 * math.pi * f
        
        calc_params = {
            'R': R,
            'L': L,
            'C': C,
            'f': f,
            'V': V,
            'T': T,
            'R_eff': R_eff,
            'omega': omega
        }

        experiment = experiments_registry.get(exp_type)
        if not experiment:
            raise ValueError(f"Unknown experiment: {exp_type}")

        results = experiment.calculate(calc_params, button_pressed)
        
        phi = results.get('phi', 0.0)
        I = results.get('I', 0.0)
        phi_rad = math.radians(phi)
        P = V * I * math.cos(phi_rad)
        
        return {
            'XL': results.get('XL', 0.0),
            'XC': results.get('XC', 0.0),
            'Z': results.get('Z', R_eff),
            'I': I,
            'phi': phi,
            'f0': results.get('f0', 0.0),
            'V': V,
            'R_eff': R_eff,
            'R_nominal': R,
            'f': f,
            'P': P
        }


    def update_energy(self, P, dt):
        """Accumulates energy: E = P * dt"""
        self.energy_accumulator += P * dt
        return self.energy_accumulator

    def validate_circuit(self, placed_components, wires, required_types):
        """
        Validates if the circuit layout forms a valid closed loop of components.
        
        placed_components: List of dicts: {'type': str, 'id': int, 'terminals': [pos1, pos2]}
        wires: List of dicts/tuples representing wire connections:
               ((comp1_idx, term1_idx), (comp2_idx, term2_idx))
        required_types: List of strings (e.g. ['source', 'resistor'])
        
        Returns: (is_valid, message)
        """
        # 1. Check if all required components are placed
        placed_types = [c['type'] for c in placed_components]
        for req in required_types:
            if req == 'button':
                if 'button' not in placed_types and 'toggle_switch' not in placed_types:
                    return False, "Missing component: BUTTON/SWITCH"
            elif req not in placed_types:
                return False, f"Missing component: {req.upper()}"

        # 2. Check wires count
        if not wires:
            return False, "No wire connections made."

        # If wire count is less than placed components, a closed loop is impossible
        # (excluding voltmeter which is optional or connected in parallel)
        series_placed = [c for c in placed_components if c['type'] != 'voltmeter']
        if len(wires) < len(series_placed):
            return False, "Incomplete wiring. Form a closed loop."

        # 3. Graph validation
        # Node key format: (component_index, terminal_index)
        # We create adjacency list of terminals
        adj = {}
        for c_idx in range(len(placed_components)):
            adj[(c_idx, 0)] = []
            adj[(c_idx, 1)] = []
            
            # Internal connection inside series components
            # Current can flow through a resistor, inductor, capacitor, source, ammeter.
            # Voltmeter has high internal resistance (acts as open circuit for main loop)
            if placed_components[c_idx]['type'] != 'voltmeter':
                adj[(c_idx, 0)].append((c_idx, 1))
                adj[(c_idx, 1)].append((c_idx, 0))

        # Add wires as connections in the graph
        for w in wires:
            t1, t2 = w
            if t1 in adj and t2 in adj:
                adj[t1].append(t2)
                adj[t2].append(t1)

        # Find power source index
        source_idx = -1
        for i, c in enumerate(placed_components):
            if c['type'] == 'source':
                source_idx = i
                break
        
        if source_idx == -1:
            return False, "DC Power Source must be placed."

        # Check direct short circuit wire on source
        for w in wires:
            t1, t2 = w
            if (t1 == (source_idx, 0) and t2 == (source_idx, 1)) or (t1 == (source_idx, 1) and t2 == (source_idx, 0)):
                return False, "Short circuit detected on Power Source!"

        # Perform DFS to find closed loops containing the source
        # We start at (source_idx, 0) and try to reach (source_idx, 1) using wires and internal connections
        visited = set()
        
        # We want to track paths. A simple DFS to find a cycle or path from source terminal 0 to 1
        path_found = False
        
        # DFS function
        def dfs(curr, target, parent=None):
            if curr == target:
                return True
            visited.add(curr)
            for neighbor in adj.get(curr, []):
                # Avoid going back directly through the same connection we just came from
                # (either the wire or the component's internal connection)
                if neighbor == parent:
                    continue
                if neighbor not in visited:
                    if dfs(neighbor, target, curr):
                        return True
            return False

        # Start from (source_idx, 0) and find path to (source_idx, 1)
        # We start DFS only on neighbors connected to (source_idx, 0) via wires.
        # This means neighbors that are NOT (source_idx, 1).
        visited.add((source_idx, 0))
        for neighbor in adj[(source_idx, 0)]:
            if neighbor == (source_idx, 1):
                continue
            
            if dfs(neighbor, (source_idx, 1), (source_idx, 0)):
                path_found = True
                break

        if not path_found:
            return False, "Circuit loop is not closed. Connect all parts to the Power Source."

        # Verify that all required components are in the loop
        # We can find all components visited in the successful path.
        # Since DFS 'visited' set will contain all nodes reachable, we can check if the series required components
        # have their terminals visited.
        visited_comp_indices = {node[0] for node in visited}
        for req in required_types:
            if req == 'voltmeter':
                continue # Voltmeter is in parallel, handled separately
            # Check if at least one component of this type was visited
            if req == 'button':
                visited_of_type = [idx for idx in visited_comp_indices if placed_components[idx]['type'] in ['button', 'toggle_switch']]
            else:
                visited_of_type = [idx for idx in visited_comp_indices if placed_components[idx]['type'] == req]
            if not visited_of_type:
                return False, f"Required component {req.upper()} is placed but not connected to the active loop."

        # Verify Voltmeter connection if placed and required
        if 'voltmeter' in required_types:
            volt_idx = -1
            for i, c in enumerate(placed_components):
                if c['type'] == 'voltmeter':
                    volt_idx = i
                    break
            if volt_idx != -1:
                # Voltmeter should have both terminals connected to the active circuit
                v_term0_connected = len([w for w in wires if w[0] == (volt_idx, 0) or w[1] == (volt_idx, 0)]) > 0
                v_term1_connected = len([w for w in wires if w[0] == (volt_idx, 1) or w[1] == (volt_idx, 1)]) > 0
                if not (v_term0_connected and v_term1_connected):
                    return False, "Voltmeter is placed but not fully connected in parallel."

        return True, "Circuit verification successful! System ready."
