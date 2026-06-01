"""
================================================================================
 Circuit IQ — Virtual Physics Lab
 FILE: rc.py
 ROLE: RC Circuit Experiment calculation logic
================================================================================
"""

import math
from .base_experiment import BaseExperiment

class RcExperiment(BaseExperiment):
    """Calculations for the RC charging/discharging circuit experiment."""
    
    EXP_TYPE = 'rc'

    def calculate(self, params, button_pressed=True):
        R_eff = params['R_eff']
        C = params['C']
        V = params['V']
        omega = params['omega']

        XC = 1.0 / (omega * C) if (omega * C) > 0 else float('inf')
        Z = math.sqrt(R_eff * R_eff + XC * XC)
        I = V / Z if Z > 0 else 0.0
        phi = math.degrees(math.atan2(-XC, R_eff))
        
        return {
            'XL': 0.0,
            'XC': XC,
            'Z': Z,
            'I': I,
            'phi': phi,
            'f0': R_eff * C
        }
