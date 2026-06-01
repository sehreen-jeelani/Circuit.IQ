"""
================================================================================
 Circuit IQ — Virtual Physics Lab
 FILE: base_experiment.py
 ROLE: Abstract Base Class for all experiments
================================================================================
"""

class BaseExperiment:
    """Base class that all experiment simulators must inherit from."""
    
    # The unique string key for the experiment (e.g., 'ohms', 'lcr')
    EXP_TYPE = None

    def calculate(self, params, button_pressed=True):
        """
        Calculates circuit state parameters based on the current configuration.

        Args:
            params (dict): A dictionary containing circuit parameters:
                - R (float): nominal resistance (Ohms)
                - L (float): inductance (Henries)
                - C (float): capacitance (Farads)
                - f (float): frequency (Hz)
                - V (float): voltage (Volts)
                - T (float): temperature (°C)
                - R_eff (float): temperature-corrected resistance (Ohms)
                - omega (float): angular frequency (2 * pi * f)
            button_pressed (bool): Whether the interactive button is pressed.

        Returns:
            dict: The output calculated values (e.g., XL, XC, Z, I, phi, f0).
        """
        raise NotImplementedError("Each experiment must implement the calculate method.")
