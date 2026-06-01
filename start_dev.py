import os
import sys

# Set UTF-8 encoding for stdout/stderr to support emojis/unicode characters in Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
if hasattr(sys.stderr, 'reconfigure'):
    try:
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

import subprocess
import threading
import time
import signal

# Get the base directory (where this script resides)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Path definitions
BACKEND_DIR = os.path.join(BASE_DIR, "LABback-IQ")
FRONTEND_DIR = os.path.join(BASE_DIR, "circuit.iq (1)final")

processes = []
shutting_down = False

def log_stream(stream, prefix, color_code):
    """Reads lines from a stream and prints them with a labeled prefix and color."""
    RESET = "\033[0m"
    COLOR = f"\033[{color_code}m"
    try:
        for line in iter(stream.readline, ''):
            if shutting_down:
                break
            if line:
                print(f"{COLOR}{prefix}{RESET} {line.strip()}")
    except Exception:
        pass

def run_command(cmd, cwd, prefix, color_code):
    """Runs a command as a subprocess and starts threads to stream stdout and stderr."""
    global shutting_down
    # On Windows, we need shell=True to execute commands like npm run dev properly
    use_shell = os.name == 'nt'
    
    try:
        p = subprocess.Popen(
            cmd,
            cwd=cwd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            bufsize=1,
            shell=use_shell
        )
        processes.append(p)
        
        t1 = threading.Thread(target=log_stream, args=(p.stdout, prefix, color_code), daemon=True)
        t2 = threading.Thread(target=log_stream, args=(p.stderr, prefix, color_code), daemon=True)
        t1.start()
        t2.start()
        
        return p
    except Exception as e:
        print(f"[ERROR] Failed to start command '{cmd}' in '{cwd}': {e}")
        return None

def cleanup(signum, frame):
    """Terminates all running child processes gracefully."""
    global shutting_down
    if shutting_down:
        return
    shutting_down = True
    print("\n\n[System] Shutting down development servers...")
    
    for p in processes:
        try:
            # On Windows, we want to terminate task tree because shell=True creates child processes
            if os.name == 'nt':
                subprocess.run(['taskkill', '/F', '/T', '/PID', str(p.pid)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            else:
                p.terminate()
        except Exception:
            pass
            
    print("[System] Both servers stopped. Goodbye!")
    sys.exit(0)

# Register signals for clean exit
signal.signal(signal.SIGINT, cleanup)
signal.signal(signal.SIGTERM, cleanup)

def main():
    print("====================================================================")
    print("   🚀 Starting Unified Circuit.IQ Development Environment 🚀")
    print("====================================================================")
    print("This script will run:")
    print("  1. Python Backend Server (Port 5000)")
    print("  2. React Frontend Dev Server (Port 3000, proxies /api -> Port 5000)")
    print("Press Ctrl+C to terminate both servers concurrently.")
    print("====================================================================")
    
    # 1. Start Python Backend with -u for unbuffered logs
    print("[System] Launching Python backend server...")
    backend_cmd = [sys.executable, "-u", "main.py"]
    p_backend = run_command(backend_cmd, BACKEND_DIR, "[Backend]", "34") # Blue
    
    # Give the backend a brief moment to start
    time.sleep(2)
    
    # 2. Start Vite Dev Server
    print("[System] Launching Vite development server...")
    frontend_cmd = ["npm", "run", "dev"]
    p_frontend = run_command(frontend_cmd, FRONTEND_DIR, "[Frontend]", "32") # Green
    
    if not p_backend and not p_frontend:
        print("[ERROR] Both processes failed to start. Exiting.")
        sys.exit(1)
        
    print("\n[System] Both servers started. Access your application at: http://localhost:3000\n")
    
    # Keep the main thread alive to listen for signals
    try:
        while True:
            time.sleep(1)
            # Check if any process died unexpectedly
            if p_backend and p_backend.poll() is not None:
                print(f"[Backend] Process exited with code {p_backend.poll()}")
                break
            if p_frontend and p_frontend.poll() is not None:
                print(f"[Frontend] Process exited with code {p_frontend.poll()}")
                break
    except KeyboardInterrupt:
        pass
        
    cleanup(None, None)

if __name__ == "__main__":
    main()
