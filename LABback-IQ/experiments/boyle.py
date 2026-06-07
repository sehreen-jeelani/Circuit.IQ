# pyrefly: ignore [missing-import]
from .base_experiment import BaseExperiment

class BoyleExperiment(BaseExperiment):
    """Calculations for the Boyle's Constant Temp Law experiment."""
    
    EXP_TYPE = 'boyle'

    def calculate(self, params, button_pressed=True):
        vol = params['V']
        temp = 300.0
        moles = 1.0
        
        Rg = 8.314
        pressure = (moles * Rg * temp) / vol if vol > 0.0 else 0.0
        internal_energy = 1.5 * moles * Rg * temp
        
        return {
            'XL': 0.0,
            'XC': 0.0,
            'Z': temp,
            'I': vol,
            'phi': 0.0,
            'f0': internal_energy,
            'V': pressure,
            'P': moles
        }
