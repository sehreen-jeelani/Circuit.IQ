"""
================================================================================
 Circuit IQ — Virtual Physics Lab
 FILE: student_db.py
 ROLE: Locked student database — read only, no one can modify via the app
================================================================================
 Data source: University of Kashmir official RR report
 Department: BTECHDSAI — 1st & 2nd Semester (38 students)
 Department: BTECHCSE — 1st & 2nd Semester (to be added)
================================================================================
"""

# ── LOCKED DATASET — DO NOT MODIFY UNLESS YOU ARE THE ADMIN ──────────────────

STUDENT_DB = {
    "BTECHDSAI": {
        "1": [
            {"enrollment": "25166112001", "name": "MANZOOR AHMAD LONE"},
            {"enrollment": "25166112002", "name": "SADEES ISHTIYAQ QADRI"},
            {"enrollment": "25166112003", "name": "MARIYAH BINTI TARIQ"},
            {"enrollment": "25166112004", "name": "MOHAMMAD AMAAN LATIF"},
            {"enrollment": "25166112005", "name": "YAFIS HUSSAIN KHAN"},
            {"enrollment": "25166112006", "name": "SYED ANOOSH IDREES ANDRABI"},
            {"enrollment": "25166112007", "name": "YASIR NAZIR TELI"},
            {"enrollment": "25166112008", "name": "IBRAHIM"},
            {"enrollment": "25166112009", "name": "MOHAMMAD HUZAIF GUJREE"},
            {"enrollment": "25166112010", "name": "MIR MOHAMMAD EEMAAN"},
            {"enrollment": "25166112011", "name": "TAHSEEN YAQOOB"},
            {"enrollment": "25166112012", "name": "KAFEEL ABAS"},
            {"enrollment": "25166112013", "name": "FARAZ TAHIR RAINA"},
            {"enrollment": "25166112014", "name": "MISBAH FAYAZ"},
            {"enrollment": "25166112015", "name": "SAASHA"},
            {"enrollment": "25166112016", "name": "SEHREEN NABI"},
            {"enrollment": "25166112017", "name": "SEHREEN JEELANI KAKROO"},
            {"enrollment": "25166112018", "name": "PAYAM BILAL PARAY"},
            {"enrollment": "25166112019", "name": "ANAYAT ZAHOOR"},
            {"enrollment": "25166112020", "name": "SAHIL GULZAR"},
            {"enrollment": "25166112021", "name": "SAYED FAIQ RUFAIE"},
            {"enrollment": "25166112022", "name": "MUSA HABIB HAFIZ"},
            {"enrollment": "25166112023", "name": "MOHAMMAD HUSAIF LONE"},
            {"enrollment": "25166112024", "name": "SUHAIB MOHAMMAD KHARAS BABA"},
            {"enrollment": "25166112025", "name": "AARIF MUSHTAQ"},
            {"enrollment": "25166112026", "name": "MUHAMMAD FARAZ UD DIN BAFANDA"},
            {"enrollment": "25166112027", "name": "ABRAR JAVAID PEER"},
            {"enrollment": "25166112028", "name": "HAMEEM FAROOQ"},
            {"enrollment": "25166112029", "name": "SUHAIB NAZIR"},
            {"enrollment": "25166112030", "name": "SAAD SHEIKH"},
            {"enrollment": "25166112031", "name": "SYED UZAIR CHESTI"},
            {"enrollment": "25166112032", "name": "OSAMA BIN ASRAR"},
            {"enrollment": "25166112033", "name": "MOHAMMAD MUSAIB KHAN"},
            {"enrollment": "25166112034", "name": "SYED TUFAIL ANDRABI"},
            {"enrollment": "25166112035", "name": "HAROON HAMID DAR"},
            {"enrollment": "25166112036", "name": "ZAYEEM ZAHOOR"},
            {"enrollment": "25166112037", "name": "SYED MISHAR HAMID"},
            {"enrollment": "25166112038", "name": "HASEEB IRFAN WANI"},
        ],
        "2": [
            # Same students, now in 2nd semester
            {"enrollment": "25166112001", "name": "MANZOOR AHMAD LONE"},
            {"enrollment": "25166112002", "name": "SADEES ISHTIYAQ QADRI"},
            {"enrollment": "25166112003", "name": "MARIYAH BINTI TARIQ"},
            {"enrollment": "25166112004", "name": "MOHAMMAD AMAAN LATIF"},
            {"enrollment": "25166112005", "name": "YAFIS HUSSAIN KHAN"},
            {"enrollment": "25166112006", "name": "SYED ANOOSH IDREES ANDRABI"},
            {"enrollment": "25166112007", "name": "YASIR NAZIR TELI"},
            {"enrollment": "25166112008", "name": "IBRAHIM"},
            {"enrollment": "25166112009", "name": "MOHAMMAD HUZAIF GUJREE"},
            {"enrollment": "25166112010", "name": "MIR MOHAMMAD EEMAAN"},
            {"enrollment": "25166112011", "name": "TAHSEEN YAQOOB"},
            {"enrollment": "25166112012", "name": "KAFEEL ABAS"},
            {"enrollment": "25166112013", "name": "FARAZ TAHIR RAINA"},
            {"enrollment": "25166112014", "name": "MISBAH FAYAZ"},
            {"enrollment": "25166112015", "name": "SAASHA"},
            {"enrollment": "25166112016", "name": "SEHREEN NABI"},
            {"enrollment": "25166112017", "name": "SEHREEN JEELANI KAKROO"},
            {"enrollment": "25166112018", "name": "PAYAM BILAL PARAY"},
            {"enrollment": "25166112019", "name": "ANAYAT ZAHOOR"},
            {"enrollment": "25166112020", "name": "SAHIL GULZAR"},
            {"enrollment": "25166112021", "name": "SAYED FAIQ RUFAIE"},
            {"enrollment": "25166112022", "name": "MUSA HABIB HAFIZ"},
            {"enrollment": "25166112023", "name": "MOHAMMAD HUSAIF LONE"},
            {"enrollment": "25166112024", "name": "SUHAIB MOHAMMAD KHARAS BABA"},
            {"enrollment": "25166112025", "name": "AARIF MUSHTAQ"},
            {"enrollment": "25166112026", "name": "MUHAMMAD FARAZ UD DIN BAFANDA"},
            {"enrollment": "25166112027", "name": "ABRAR JAVAID PEER"},
            {"enrollment": "25166112028", "name": "HAMEEM FAROOQ"},
            {"enrollment": "25166112029", "name": "SUHAIB NAZIR"},
            {"enrollment": "25166112030", "name": "SAAD SHEIKH"},
            {"enrollment": "25166112031", "name": "SYED UZAIR CHESTI"},
            {"enrollment": "25166112032", "name": "OSAMA BIN ASRAR"},
            {"enrollment": "25166112033", "name": "MOHAMMAD MUSAIB KHAN"},
            {"enrollment": "25166112034", "name": "SYED TUFAIL ANDRABI"},
            {"enrollment": "25166112035", "name": "HAROON HAMID DAR"},
            {"enrollment": "25166112036", "name": "ZAYEEM ZAHOOR"},
            {"enrollment": "25166112037", "name": "SYED MISHAR HAMID"},
            {"enrollment": "25166112038", "name": "HASEEB IRFAN WANI"},
        ],
    },
    "BTECHCSE": {
        "1": [],  # To be added when CSE data is provided
        "2": [],  # To be added when CSE data is provided
    },
}


# ── Lookup functions — used by attendance.py ──────────────────────────────────

def validate_enrollment(enrollment: str, department: str, semester: str) -> dict | None:
    """
    Returns student dict if enrollment number is valid for the given dept/sem.
    Returns None if not found.
    """
    enrollment = enrollment.strip().upper()
    dept_data = STUDENT_DB.get(department.upper(), {})
    sem_data = dept_data.get(str(semester), [])
    for student in sem_data:
        if student["enrollment"].upper() == enrollment:
            return student
    return None


def get_all_students(department: str, semester: str) -> list:
    """Returns full student list for a department and semester."""
    dept_data = STUDENT_DB.get(department.upper(), {})
    return dept_data.get(str(semester), [])


def get_departments() -> list:
    """Returns list of available departments."""
    return list(STUDENT_DB.keys())


def get_semesters(department: str) -> list:
    """Returns available semesters for a department."""
    return list(STUDENT_DB.get(department.upper(), {}).keys())