"""
================================================================================
 Circuit IQ — Virtual Physics Lab
 FILE: test_physics.py
 ROLE: Unit Tests — Verifies physics_engine.py calculations
================================================================================
 HOW TO RUN:
    python test_physics.py
    (or: python -m pytest test_physics.py -v)

 TESTS COVERED:
    TestPhysicsEngine.test_ohms_law         → I = V/R at room temperature
    TestPhysicsEngine.test_temperature_effect → R_eff = R × (1 + α × ΔT)
    TestPhysicsEngine.test_lcr_series       → XL, XC, Z, I, f0 calculations
    TestPhysicsEngine.test_circuit_validator → Closed loop DFS topology check

 EXPECTED VALUES:
    Ohm's Law: R=100Ω, V=12V, T=25°C → I=0.12A, P=1.44W
    Temperature: R=100Ω, T=125°C → R_eff=139.3Ω (copper alpha=0.00393/°C)
    LCR at f=50Hz: f0=71.176Hz (theoretical resonance for L=50mH, C=100µF)
================================================================================
"""

import unittest
import math
from physics_engine import PhysicsEngine

class TestPhysicsEngine(unittest.TestCase):
    def setUp(self):
        self.engine = PhysicsEngine()

    def test_ohms_law(self):
        # Setup nominal parameters
        self.engine.set_param('R', 100.0)
        self.engine.set_param('V', 12.0)
        self.engine.set_param('T', 25.0) # Temperature = 25°C means Reff = 100.0
        
        res = self.engine.calculate('ohms')
        self.assertAlmostEqual(res['R_eff'], 100.0)
        self.assertAlmostEqual(res['I'], 0.12)
        self.assertAlmostEqual(res['P'], 1.44)

    def test_temperature_effect(self):
        # Temp = 125°C, R = 100.0, alpha = 0.00393
        # R_eff = 100 * (1 + 0.00393 * (125 - 25)) = 100 * (1 + 0.393) = 139.3
        self.engine.set_param('R', 100.0)
        self.engine.set_param('T', 125.0)
        self.engine.set_param('V', 12.0)
        
        res = self.engine.calculate('ohms')
        self.assertAlmostEqual(res['R_eff'], 139.3)
        self.assertAlmostEqual(res['I'], 12.0 / 139.3)

    def test_lcr_series(self):
        # L = 50mH (0.05 H), C = 100uF (0.0001 F), R = 100.0, f = 50.0
        # omega = 2 * pi * 50 = 314.15926
        # XL = 314.15926 * 0.05 = 15.70796
        # XC = 1 / (314.15926 * 0.0001) = 31.83098
        # X = XL - XC = -16.123
        # Z = sqrt(100^2 + X^2) = 101.29
        self.engine.set_param('R', 100.0)
        self.engine.set_param('L', 0.05)
        self.engine.set_param('C', 0.0001)
        self.engine.set_param('f', 50.0)
        self.engine.set_param('V', 12.0)
        self.engine.set_param('T', 25.0)

        res = self.engine.calculate('lcr')
        self.assertAlmostEqual(res['XL'], 2.0 * math.pi * 50.0 * 0.05)
        self.assertAlmostEqual(res['XC'], 1.0 / (2.0 * math.pi * 50.0 * 0.0001))
        
        # Resonance frequency f0 = 1 / (2 * pi * sqrt(L * C))
        # f0 = 1 / (2 * pi * sqrt(0.05 * 0.0001)) = 1 / (2 * pi * sqrt(5e-6)) = 1 / (2 * pi * 0.002236) = 71.176 Hz
        self.assertAlmostEqual(res['f0'], 71.17625, places=4)

    def test_rc_circuit(self):
        # R = 100.0, C = 100uF (0.0001 F), f = 50.0, V = 12.0, T = 25.0
        # Reff = 100.0, XC = 1 / (2 * pi * 50 * 0.0001) = 31.83098
        # Z = sqrt(100^2 + XC^2) = 104.949
        # tau = R_eff * C = 100.0 * 0.0001 = 0.01 seconds
        self.engine.set_param('R', 100.0)
        self.engine.set_param('C', 0.0001)
        self.engine.set_param('f', 50.0)
        self.engine.set_param('V', 12.0)
        self.engine.set_param('T', 25.0)

        res = self.engine.calculate('rc')
        self.assertAlmostEqual(res['XC'], 1.0 / (2.0 * math.pi * 50.0 * 0.0001))
        self.assertAlmostEqual(res['Z'], math.sqrt(100.0**2 + res['XC']**2))
        self.assertAlmostEqual(res['f0'], 0.01)

    def test_circuit_validator(self):
        placed = [
            {'type': 'source', 'id': 0},
            {'type': 'resistor', 'id': 1}
        ]
        # Connection forming closed loop: source(0)-term0 -> resistor(1)-term0, resistor(1)-term1 -> source(0)-term1
        wires = [
            ((0, 0), (1, 0)),
            ((1, 1), (0, 1))
        ]
        is_valid, msg = self.engine.validate_circuit(placed, wires, ['source', 'resistor'])
        self.assertTrue(is_valid, msg)

        # Connection with missing components required
        is_valid, msg = self.engine.validate_circuit(placed, wires, ['source', 'resistor', 'inductor'])
        self.assertFalse(is_valid)

        # Incomplete connection (not closed)
        wires_incomplete = [
            ((0, 0), (1, 0))
        ]
        is_valid, msg = self.engine.validate_circuit(placed, wires_incomplete, ['source', 'resistor'])
        self.assertFalse(is_valid)

if __name__ == '__main__':
    unittest.main()
