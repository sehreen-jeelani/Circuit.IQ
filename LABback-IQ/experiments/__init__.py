"""
================================================================================
 Circuit IQ — Virtual Physics Lab
 FILE: __init__.py
 ROLE: Dynamic Experiment Package Initializer & Registry
================================================================================
"""

import os
import pkgutil
import importlib
from .base_experiment import BaseExperiment

# A global dictionary mapping EXP_TYPE (string) to BaseExperiment instances
experiments_registry = {}

def load_experiments():
    """
    Scans the current package directory, imports all modules dynamically,
    and registers all subclass implementations of BaseExperiment.
    """
    global experiments_registry
    experiments_registry.clear()
    
    package_dir = os.path.dirname(__file__)
    
    for _, module_name, _ in pkgutil.iter_modules([package_dir]):
        # Skip base module
        if module_name == 'base_experiment':
            continue
            
        # Import the module dynamically relative to this package
        module = importlib.import_module(f'.{module_name}', package=__name__)
        
        # Discover subclassed experiments
        for attr_name in dir(module):
            attr = getattr(module, attr_name)
            if (isinstance(attr, type) and 
                issubclass(attr, BaseExperiment) and 
                attr is not BaseExperiment):
                
                exp_type = getattr(attr, 'EXP_TYPE', None)
                if exp_type:
                    # Register an instance of this experiment class
                    experiments_registry[exp_type] = attr()

# Execute automatic discovery and loading of experiments
load_experiments()
