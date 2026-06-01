"""
================================================================================
 Circuit IQ — Virtual Physics Lab
 FILE: ohms.py
 ROLE: Ohm's Law Experiment calculation logic
================================================================================
"""

from .base_experiment import BaseExperiment

class OhmExperiment(BaseExperiment):
    """Calculations for the DC Ohm's Law experiment."""
    
    EXP_TYPE = 'ohms'

    def calculate(self, params, button_pressed=True):
        R_eff = params['R_eff']
        V = params['V']

        Z = R_eff
        I = V / R_eff if R_eff > 0 else 0.0
        
        return {
            'XL': 0.0,
            'XC': 0.0,
            'Z': Z,
            'I': I,
            'phi': 0.0,
            'f0': 0.0
        }
