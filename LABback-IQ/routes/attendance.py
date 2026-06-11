"""
================================================================================
 Circuit IQ — Virtual Physics Lab
 FILE: routes/attendance.py
 ROLE: Live attendance & session management for professor admin panel
================================================================================
"""

import os
import uuid
from datetime import datetime
from flask import Blueprint, request, jsonify
from student_db import validate_enrollment, get_all_students, get_departments, get_semesters

attendance_bp = Blueprint("attendance", __name__)

ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "circuitiq@admin2025")
SESSIONS: dict = {}
ADMIN_TOKENS: set = set()


@attendance_bp.route("/admin/login", methods=["POST"])
def admin_login():
    data = request.get_json(force=True)
    password = str(data.get("password", "")).strip()
    if password != ADMIN_PASSWORD:
        return jsonify({"status": "error", "message": "Invalid password"}), 401
    token = str(uuid.uuid4())
    ADMIN_TOKENS.add(token)
    return jsonify({"status": "success", "token": token}), 200


def _require_admin():
    token = request.headers.get("X-Admin-Token", "")
    if token not in ADMIN_TOKENS:
        return None, (jsonify({"status": "error", "message": "Unauthorized"}), 401)
    return token, None


@attendance_bp.route("/admin/session/create", methods=["POST"])
def create_session():
    _, err = _require_admin()
    if err: return err
    data = request.get_json(force=True)
    experiment = str(data.get("experiment", "Ohm's Law")).strip()
    group_name = str(data.get("group_name", "Group A")).strip()
    group_size = int(data.get("group_size", 4))
    reg_numbers = [str(r).strip() for r in data.get("reg_numbers", []) if str(r).strip()]
    if not reg_numbers:
        return jsonify({"status": "error", "message": "At least one registration number required"}), 400
    session_id = str(uuid.uuid4())[:8].upper()
    SESSIONS[session_id] = {
        "id": session_id,
        "experiment": experiment,
        "group_name": group_name,
        "group_size": group_size,
        "reg_numbers": reg_numbers,
        "checked_in": [],
        "status": "waiting",
        "paused_by": None,
        "created_at": datetime.now().isoformat(),
        "started_at": None,
        "ended_at": None,
        "events": [],
        "people_count": 0,
    }
    return jsonify({"status": "success", "session_id": session_id, "join_code": session_id}), 200


@attendance_bp.route("/admin/session/list", methods=["GET"])
def list_sessions():
    _, err = _require_admin()
    if err: return err
    sessions = []
    for s in SESSIONS.values():
        sessions.append({
            "id": s["id"],
            "group_name": s["group_name"],
            "experiment": s["experiment"],
            "group_size": s["group_size"],
            "checked_in": len(s["checked_in"]),
            "status": s["status"],
            "created_at": s["created_at"],
        })
    sessions.sort(key=lambda x: x["created_at"], reverse=True)
    return jsonify({"status": "success", "sessions": sessions}), 200


@attendance_bp.route("/admin/session/<session_id>/delete", methods=["DELETE"])
def delete_session(session_id):
    _, err = _require_admin()
    if err: return err
    if session_id not in SESSIONS:
        return jsonify({"status": "error", "message": "Session not found"}), 404
    del SESSIONS[session_id]
    return jsonify({"status": "success"}), 200


@attendance_bp.route("/session/join", methods=["POST"])
def join_session():
    data = request.get_json(force=True)
    session_id = str(data.get("session_id", "")).strip().upper()
    reg_number = str(data.get("reg_number", "")).strip().upper()
    if session_id not in SESSIONS:
        return jsonify({"status": "error", "message": "Invalid session code"}), 404
    session = SESSIONS[session_id]
    if session["status"] == "ended":
        return jsonify({"status": "error", "message": "This session has already ended"}), 400
    if reg_number not in session["reg_numbers"]:
        return jsonify({"status": "error", "message": f"Enrollment number {reg_number} not in this group"}), 403
    if reg_number in session["checked_in"]:
        return jsonify({"status": "success", "message": "Already checked in", "session": _session_summary(session)}), 200
    session["checked_in"].append(reg_number)
    session["events"].append({"time": datetime.now().isoformat(), "event": f"{reg_number} checked in", "type": "checkin"})
    if len(session["checked_in"]) >= len(session["reg_numbers"]) and session["status"] == "waiting":
        session["status"] = "active"
        session["started_at"] = datetime.now().isoformat()
        session["events"].append({"time": datetime.now().isoformat(), "event": "All members present — experiment started", "type": "start"})
    return jsonify({"status": "success", "message": f"Welcome {reg_number}!", "session": _session_summary(session)}), 200


@attendance_bp.route("/session/<session_id>/status", methods=["GET"])
def session_status(session_id):
    session_id = session_id.upper()
    if session_id not in SESSIONS:
        return jsonify({"status": "error", "message": "Session not found"}), 404
    return jsonify({"status": "success", "session": _session_summary(SESSIONS[session_id])}), 200


@attendance_bp.route("/session/<session_id>/presence", methods=["POST"])
def update_presence(session_id):
    session_id = session_id.upper()
    if session_id not in SESSIONS:
        return jsonify({"status": "error", "message": "Session not found"}), 404
    session = SESSIONS[session_id]
    data = request.get_json(force=True)
    people_count = int(data.get("people_count", 0))
    required = len(session["reg_numbers"])
    session["people_count"] = people_count
    if session["status"] == "active" and people_count < required:
        session["status"] = "paused"
        session["paused_by"] = "webcam"
        session["events"].append({"time": datetime.now().isoformat(), "event": f"Experiment paused — only {people_count}/{required} members in frame", "type": "pause"})
    elif session["status"] == "paused" and session["paused_by"] == "webcam" and people_count >= required:
        session["status"] = "active"
        session["paused_by"] = None
        session["events"].append({"time": datetime.now().isoformat(), "event": f"All {required} members back in frame — experiment resumed", "type": "resume"})
    return jsonify({"status": "success", "session_status": session["status"]}), 200


@attendance_bp.route("/session/<session_id>/end", methods=["POST"])
def end_session(session_id):
    _, err = _require_admin()
    if err: return err
    session_id = session_id.upper()
    if session_id not in SESSIONS:
        return jsonify({"status": "error", "message": "Session not found"}), 404
    session = SESSIONS[session_id]
    session["status"] = "ended"
    session["ended_at"] = datetime.now().isoformat()
    session["events"].append({"time": datetime.now().isoformat(), "event": "Session ended by professor", "type": "end"})
    return jsonify({"status": "success", "log": _generate_log(session)}), 200


@attendance_bp.route("/session/<session_id>/log", methods=["GET"])
def get_log(session_id):
    _, err = _require_admin()
    if err: return err
    session_id = session_id.upper()
    if session_id not in SESSIONS:
        return jsonify({"status": "error", "message": "Session not found"}), 404
    return jsonify({"status": "success", "log": _generate_log(SESSIONS[session_id])}), 200


def _session_summary(s: dict) -> dict:
    return {
        "id": s["id"],
        "experiment": s["experiment"],
        "group_name": s["group_name"],
        "group_size": s["group_size"],
        "reg_numbers": s["reg_numbers"],
        "checked_in": s["checked_in"],
        "status": s["status"],
        "people_count": s["people_count"],
        "started_at": s["started_at"],
    }


def _generate_log(s: dict) -> dict:
    absent = [r for r in s["reg_numbers"] if r not in s["checked_in"]]
    return {
        "session_id": s["id"],
        "group_name": s["group_name"],
        "experiment": s["experiment"],
        "date": s["created_at"][:10],
        "started_at": s["started_at"],
        "ended_at": s["ended_at"],
        "present": s["checked_in"],
        "absent": absent,
        "total": len(s["reg_numbers"]),
        "events": s["events"],
    }
# ── Student lookup (for session creation form) ──────────────────────
@attendance_bp.route('/students', methods=['GET'])
def get_students():
    department = request.args.get('department', 'BTECHDSAI')
    semester   = int(request.args.get('semester', 2))
    students   = get_all_students(department, semester)
    return jsonify({'students': students})

@attendance_bp.route('/departments', methods=['GET'])
def get_departments_route():
    from student_db import get_departments
    return jsonify(get_departments())