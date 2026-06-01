"""
================================================================================
 Circuit IQ — Virtual Physics Lab
 FILE: main.py
 ROLE: Entry Point — Start the Python backend server
================================================================================
 USAGE:
    python main.py
    Opens http://localhost:5000 in browser (serves the 3D frontend from /dist)

 WHAT THIS FILE DOES:
    1. Adds the current directory to sys.path for safe imports
    2. Imports and calls start_server() from server.py
    3. The server serves the built frontend + provides /api/* endpoints

 DEPENDENCIES:
    → server.py         (HTTP server + API route handlers)
    → physics_engine.py (circuit simulation calculations)
================================================================================
"""

import os
import sys

# Add current directory to path for safe relative imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from server import start_server

if __name__ == '__main__':
    # Launch the Circuit IQ Python backend server on port 5000
    # This serves the built frontend from Circuit-IQ-3D/dist/
    start_server(port=5000)
