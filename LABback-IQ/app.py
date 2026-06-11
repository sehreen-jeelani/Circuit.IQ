"""
================================================================================
 Circuit IQ — Virtual Physics Lab
 FILE: app.py
 ROLE: Flask application factory — replaces Python http.server
================================================================================
 ARCHITECTURE:
    • Flask app with CORS enabled for all /api/* routes
    • Registers route blueprints: physics, physicsbot, contact
    • Serves the built React + 3D lab static files from circuitiq-frontend/dist/
    • All existing /api/validate and /api/calculate behaviour is preserved exactly

 BLUEPRINTS:
    /api/validate      → routes/physics.py
    /api/calculate     → routes/physics.py
    /api/physicsbot/ask → routes/physicsbot.py
    /api/contact       → routes/contact.py

 USAGE:
    python app.py                     ← dev mode (port 5000, debug on)
    gunicorn app:app                  ← production
================================================================================
"""

from importlib.resources import path
import os
import webbrowser
from flask import Flask, send_from_directory
from flask_cors import CORS
from routes.attendance import attendance_bp
from config import Config


def create_app():
    app = Flask(__name__, static_folder=None)
    app.config.from_object(Config)

    # ── CORS: allow the Vite dev server (port 5173) and the prod domain ─────
    CORS(app, resources={r"/api/*": {"origins": [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:5000",
        "https://circuitiq.vercel.app",
        "*",   # loosen for local team dev; tighten before public launch
    ]}})

    # ── Register blueprints ───────────────────────────────────────────────────
    from routes.physics    import physics_bp
    from routes.physicsbot import physicsbot_bp
    from routes.contact    import contact_bp
    from routes.database_routes import db_bp

    app.register_blueprint(physics_bp)
    app.register_blueprint(physicsbot_bp)
    app.register_blueprint(contact_bp)
    app.register_blueprint(attendance_bp, url_prefix="/api")
    app.register_blueprint(db_bp)

    # ── Serve built React + 3D lab static files ───────────────────────────────
    dist_dir = app.config["DIST_DIR"]

    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_frontend(path):
                """Serve the built React app and 3D lab. SPA fallback to index.html."""
                if path.startswith("api/"):
                    from flask import abort
                    abort(404)
                if path and os.path.exists(os.path.join(dist_dir, path)):
                    return send_from_directory(dist_dir, path)
                return send_from_directory(dist_dir, "index.html")

    return app


app = create_app()

if __name__ == "__main__":
    import threading

    port = int(os.getenv("PORT", 5000))
    dist_dir = app.config["DIST_DIR"]

    print("\n" + "=" * 60)
    print("   Circuit.IQ — Flask Backend (replaces http.server)")
    print("=" * 60)
    if os.path.exists(dist_dir):
        print(f"  Serving frontend from : {dist_dir}")
    else:
        print(f"  [WARN] dist/ not found — run 'npm run build' in circuitiq-frontend/")
    print(f"  API endpoints active  : /api/validate, /api/calculate")
    print(f"                          /api/physicsbot/ask, /api/contact")
    print(f"  Listening on          : http://localhost:{port}")
    print("=" * 60 + "\n")

    def open_browser():
        import time
        time.sleep(1.2)
        webbrowser.open(f"http://localhost:{port}")

    threading.Thread(target=open_browser, daemon=True).start()
    app.run(host="0.0.0.0", port=port, debug=app.config["DEBUG"])
