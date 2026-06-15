"""
================================================================================
 Circuit IQ — Virtual Physics Lab
 FILE: database.py
 ROLE: SQL Database Interface (Supabase client + local SQLite fallback)
================================================================================
"""

import os
import json
import sqlite3
import threading
from datetime import datetime
from config import Config

# Try importing supabase, fallback safely if not installed or if it errors
try:
    from supabase import create_client, Client
    HAS_SUPABASE_SDK = True
except ImportError:
    HAS_SUPABASE_SDK = False

DB_NAME = "circuit_iq.db"
_local = threading.local()

def get_sqlite_connection():
    """Returns a thread-local connection to the local SQLite database."""
    if not hasattr(_local, "conn") or _local.conn is None:
        db_path = os.path.join(Config.BASE_DIR, DB_NAME)
        conn = sqlite3.connect(db_path, check_same_thread=False, timeout=30.0)
        conn.row_factory = sqlite3.Row
        _local.conn = conn
    return _local.conn

def init_sqlite_db():
    """Initializes local SQLite tables if they do not exist and seeds test data."""
    conn = get_sqlite_connection()
    cursor = conn.cursor()
    
    # 1. Profiles Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS profiles (
        id TEXT PRIMARY KEY,
        full_name TEXT,
        university TEXT,
        semester TEXT,
        graduation_year INTEGER,
        role TEXT DEFAULT 'student',
        phone TEXT,
        is_active BOOLEAN DEFAULT 1,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    """)
    
    # 2. Circuits Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS circuits (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        circuit_data TEXT,
        is_public BOOLEAN DEFAULT 0,
        tags TEXT DEFAULT '[]',
        status TEXT DEFAULT 'draft',
        view_count INTEGER DEFAULT 0,
        is_deleted BOOLEAN DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE
    );
    """)
    
    # 3. Experiment Logs Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS experiment_logs (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        circuit_id TEXT,
        experiment_type TEXT NOT NULL,
        results TEXT,
        duration_seconds INTEGER,
        score REAL,
        notes TEXT,
        status TEXT DEFAULT 'completed',
        attempt_number INTEGER DEFAULT 1,
        feedback TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE,
        FOREIGN KEY (circuit_id) REFERENCES circuits(id) ON DELETE SET NULL
    );
    """)
    conn.commit()

    # Seed Default Student (Aisha Rahman)
    cursor.execute("SELECT id FROM profiles WHERE id = ?", ("a1b2c3d4-e5f6-7890-abcd-ef1234567890",))
    if not cursor.fetchone():
        cursor.execute("""
        INSERT INTO profiles (id, full_name, university, semester, graduation_year, role, phone, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
            "Aisha Rahman",
            "NUST",
            "Fall 2025",
            2026,
            "student",
            "+92-300-1234567",
            1
        ))
        
        # Seed basic Ohm's Law circuit
        cursor.execute("""
        INSERT INTO circuits (id, user_id, name, description, circuit_data, is_public, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            "b2c3d4e5-f6a7-8901-bcde-f12345678901",
            "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
            "Experiment: ohms",
            "A simple series circuit demonstrating Ohms Law.",
            json.dumps({
                "placedComponents": [
                    {"type": "source", "snap1": 14, "snap2": 15},
                    {"type": "resistor", "snap1": 130, "snap2": 200}
                ],
                "wires": [
                    {"fromHole": 14, "toHole": 130},
                    {"fromHole": 200, "toHole": 15}
                ],
                "params": {"V": 9, "R": 470, "L": 50, "C": 100, "f": 50, "T": 25},
                "experiment_type": "ohms"
            }),
            0,
            "draft"
        ))
        conn.commit()
        print("[DB] SQLite database initialized and seeded successfully.")

# Check for Supabase configuration
use_supabase = bool(Config.SUPABASE_URL and Config.SUPABASE_ANON_KEY and HAS_SUPABASE_SDK)
supabase_client = None

if use_supabase:
    try:
        supabase_client = create_client(Config.SUPABASE_URL, Config.SUPABASE_ANON_KEY)
        print(f"[DB] Supabase SQL Database connection active: {Config.SUPABASE_URL}")
    except Exception as e:
        print(f"[DB] Error initializing Supabase client: {e}. Falling back to SQLite.")
        use_supabase = False

if not use_supabase:
    print("[DB] Local SQL database fallback enabled (SQLite).")
    init_sqlite_db()

def get_db_type():
    return "Supabase (PostgreSQL)" if use_supabase else "SQLite"

def save_circuit(experiment_type, user_id, name, description, circuit_data, params):
    import uuid
    circuit_data_full = {
        "placedComponents": circuit_data.get("placedComponents", []),
        "wires": circuit_data.get("wires", []),
        "dataPoints": circuit_data.get("dataPoints", []),
        "params": params,
        "experiment_type": experiment_type
    }
    
    if use_supabase:
        try:
            res = supabase_client.table("circuits").select("id").eq("user_id", user_id).eq("name", f"Experiment: {experiment_type}").execute()
            existing = res.data
            
            payload = {
                "user_id": user_id,
                "name": f"Experiment: {experiment_type}",
                "description": description or f"Saved layout for {experiment_type}",
                "circuit_data": circuit_data_full,
                "updated_at": datetime.utcnow().isoformat()
            }
            
            if existing:
                cid = existing[0]["id"]
                supabase_client.table("circuits").update(payload).eq("id", cid).execute()
                return cid
            else:
                payload["id"] = str(uuid.uuid4())
                res = supabase_client.table("circuits").insert(payload).execute()
                return res.data[0]["id"]
        except Exception as e:
            print(f"[DB Error] Supabase save_circuit: {e}")
            raise e
    else:
        conn = get_sqlite_connection()
        cursor = conn.cursor()
        
        cursor.execute("SELECT id FROM circuits WHERE user_id = ? AND name = ?", (user_id, f"Experiment: {experiment_type}"))
        row = cursor.fetchone()
        
        circuit_data_str = json.dumps(circuit_data_full)
        now_str = datetime.now().isoformat()
        
        if row:
            cid = row["id"]
            cursor.execute("""
            UPDATE circuits 
            SET description = ?, circuit_data = ?, updated_at = ? 
            WHERE id = ?
            """, (description, circuit_data_str, now_str, cid))
        else:
            cid = str(uuid.uuid4())
            cursor.execute("""
            INSERT INTO circuits (id, user_id, name, description, circuit_data, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (cid, user_id, f"Experiment: {experiment_type}", description, circuit_data_str, now_str, now_str))
        conn.commit()
        return cid

def load_circuit(experiment_type, user_id):
    if use_supabase:
        try:
            res = supabase_client.table("circuits").select("*").eq("user_id", user_id).eq("name", f"Experiment: {experiment_type}").execute()
            data = res.data
            if data:
                return {
                    "id": data[0]["id"],
                    "user_id": data[0]["user_id"],
                    "name": data[0]["name"],
                    "description": data[0]["description"],
                    "circuit_data": data[0]["circuit_data"]
                }
            return None
        except Exception as e:
            print(f"[DB Error] Supabase load_circuit: {e}")
            return None
    else:
        conn = get_sqlite_connection()
        cursor = conn.cursor()
        cursor.execute("""
        SELECT * FROM circuits 
        WHERE user_id = ? AND name = ? AND is_deleted = 0
        """, (user_id, f"Experiment: {experiment_type}"))
        row = cursor.fetchone()
        if row:
            return {
                "id": row["id"],
                "user_id": row["user_id"],
                "name": row["name"],
                "description": row["description"],
                "circuit_data": json.loads(row["circuit_data"]) if row["circuit_data"] else None
            }
        return None

def save_experiment_log(user_id, circuit_id, experiment_type, results, duration_seconds, score, notes, feedback, attempt_number=1):
    import uuid
    id_str = str(uuid.uuid4())
    now_str = datetime.utcnow().isoformat() if use_supabase else datetime.now().isoformat()
    
    if use_supabase:
        try:
            payload = {
                "id": id_str,
                "user_id": user_id,
                "circuit_id": circuit_id,
                "experiment_type": experiment_type,
                "results": results,
                "duration_seconds": duration_seconds,
                "score": float(score) if score is not None else None,
                "notes": notes,
                "status": "completed",
                "attempt_number": attempt_number,
                "feedback": feedback,
                "created_at": now_str
            }
            res = supabase_client.table("experiment_logs").insert(payload).execute()
            return res.data[0]["id"]
        except Exception as e:
            print(f"[DB Error] Supabase save_experiment_log: {e}")
            raise e
    else:
        conn = get_sqlite_connection()
        cursor = conn.cursor()
        cursor.execute("""
        INSERT INTO experiment_logs (id, user_id, circuit_id, experiment_type, results, duration_seconds, score, notes, status, attempt_number, feedback, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            id_str,
            user_id,
            circuit_id,
            experiment_type,
            json.dumps(results) if results else "{}",
            duration_seconds,
            score,
            notes,
            "completed",
            attempt_number,
            feedback,
            now_str
        ))
        conn.commit()
        return id_str

def get_experiment_logs(user_id, experiment_type=None):
    if use_supabase:
        try:
            query = supabase_client.table("experiment_logs").select("*").eq("user_id", user_id)
            if experiment_type:
                query = query.eq("experiment_type", experiment_type)
            res = query.order("created_at", desc=True).execute()
            return res.data
        except Exception as e:
            print(f"[DB Error] Supabase get_experiment_logs: {e}")
            return []
    else:
        conn = get_sqlite_connection()
        cursor = conn.cursor()
        if experiment_type:
            cursor.execute("""
            SELECT * FROM experiment_logs 
            WHERE user_id = ? AND experiment_type = ? 
            ORDER BY created_at DESC
            """, (user_id, experiment_type))
        else:
            cursor.execute("""
            SELECT * FROM experiment_logs 
            WHERE user_id = ? 
            ORDER BY created_at DESC
            """, (user_id,))
        
        logs = []
        for row in cursor.fetchall():
            logs.append({
                "id": row["id"],
                "user_id": row["user_id"],
                "circuit_id": row["circuit_id"],
                "experiment_type": row["experiment_type"],
                "results": json.loads(row["results"]) if row["results"] else None,
                "duration_seconds": row["duration_seconds"],
                "score": row["score"],
                "notes": row["notes"],
                "status": row["status"],
                "attempt_number": row["attempt_number"],
                "feedback": row["feedback"],
                "created_at": row["created_at"]
            })
        return logs

def get_profile(user_id):
    if use_supabase:
        try:
            res = supabase_client.table("profiles").select("*").eq("id", user_id).execute()
            data = res.data
            return data[0] if data else None
        except Exception as e:
            print(f"[DB Error] Supabase get_profile: {e}")
            return None
    else:
        conn = get_sqlite_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM profiles WHERE id = ?", (user_id,))
        row = cursor.fetchone()
        if row:
            return {
                "id": row["id"],
                "full_name": row["full_name"],
                "university": row["university"],
                "semester": row["semester"],
                "graduation_year": row["graduation_year"],
                "role": row["role"],
                "phone": row["phone"],
                "is_active": bool(row["is_active"]),
                "created_at": row["created_at"],
                "updated_at": row["updated_at"]
            }
        return None

def upsert_profile(user_id, full_name, university, semester, graduation_year, role="student", phone=None, is_active=True):
    now_str = datetime.utcnow().isoformat() if use_supabase else datetime.now().isoformat()
    
    if use_supabase:
        try:
            payload = {
                "id": user_id,
                "full_name": full_name,
                "university": university,
                "semester": semester,
                "graduation_year": graduation_year,
                "role": role,
                "phone": phone,
                "is_active": is_active,
                "updated_at": now_str
            }
            supabase_client.table("profiles").upsert(payload).execute()
            return True
        except Exception as e:
            print(f"[DB Error] Supabase upsert_profile: {e}")
            return False
    else:
        conn = get_sqlite_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM profiles WHERE id = ?", (user_id,))
        row = cursor.fetchone()
        
        if row:
            cursor.execute("""
            UPDATE profiles 
            SET full_name = ?, university = ?, semester = ?, graduation_year = ?, role = ?, phone = ?, is_active = ?, updated_at = ?
            WHERE id = ?
            """, (full_name, university, semester, graduation_year, role, phone, int(is_active), now_str, user_id))
        else:
            cursor.execute("""
            INSERT INTO profiles (id, full_name, university, semester, graduation_year, role, phone, is_active, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (user_id, full_name, university, semester, graduation_year, role, phone, int(is_active), now_str, now_str))
        conn.commit()
        return True
