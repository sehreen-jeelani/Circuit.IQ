/**
 * AttendanceSystem.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Complete live attendance system for Circuit.IQ
 *
 * VIEWS:
 *   1. Gate       — choose "I'm a Professor" or "I'm a Student"
 *   2. AdminLogin — professor enters password
 *   3. AdminPanel — create sessions, view active sessions, end + download log
 *   4. StudentJoin — student enters session code + reg number
 *   5. WebcamMonitor — live people counter, shows session status, pauses lab
 *
 * The WebcamMonitor uses @tensorflow-models/coco-ssd (loaded from CDN via
 * dynamic script injection) to count people in the webcam frame every 2s.
 * It posts the count to /api/session/:id/presence which the Flask backend
 * uses to pause/resume the session.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield, GraduationCap, Eye, EyeOff, Plus, Trash2,
  Users, FlaskConical, CheckCircle2, XCircle, AlertTriangle,
  Camera, CameraOff, LogOut, RefreshCw, Download, ChevronRight,
  Loader2, UserCheck, Clock, Activity
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────
type View = 'gate' | 'adminLogin' | 'adminPanel' | 'studentJoin' | 'webcamMonitor';

interface Session {
  id: string;
  experiment: string;
  group_name: string;
  group_size: number;
  reg_numbers: string[];
  checked_in: string[];
  status: 'waiting' | 'active' | 'paused' | 'ended';
  people_count: number;
  started_at: string | null;
}

interface AttendanceSystemProps {
  onLabUnlock?: (sessionId: string) => void;
  onLabPause?: () => void;
  onLabResume?: () => void;
}

const EXPERIMENTS = [
  "Ohm's Law",
  "Series LCR Circuit",
  "RC Circuit",
  "Arduino LED Control",
  "Kirchhoff's Laws",
  "Wheatstone Bridge",
];

// ── Root Component ─────────────────────────────────────────────────────────────
export default function AttendanceSystem({ onLabUnlock, onLabPause, onLabResume }: AttendanceSystemProps) {
  const [view, setView] = useState<View>(() => sessionStorage.getItem('adminToken') ? 'adminPanel' : 'gate');
  const [adminToken, setAdminToken] = useState(() => sessionStorage.getItem('adminToken') || ''); 
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [studentRegNo, setStudentRegNo] = useState('');

  return (
    <div className="min-h-screen bg-[#070B14] text-white font-mono flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {view === 'gate' && (
          <GateView key="gate" onSelect={(v) => setView(v)} />
        )}
        {view === 'adminLogin' && (
          <AdminLoginView
            key="adminLogin"
            onSuccess={(token) => { sessionStorage.setItem('adminToken', token); setAdminToken(token); setView('adminPanel'); }}
            onBack={() => setView('gate')}
          />
        )}
        {view === 'adminPanel' && (
          <AdminPanelView
            key="adminPanel"
            token={adminToken}
            onLogout={() => { sessionStorage.removeItem('adminToken'); setAdminToken(''); setView('gate'); }}
          />
        )}
        {view === 'studentJoin' && (
          <StudentJoinView
            key="studentJoin"
            onJoined={(session, regNo) => {
              setActiveSession(session);
              setStudentRegNo(regNo);
              setView('webcamMonitor');
            }}
            onBack={() => setView('gate')}
          />
        )}
        {view === 'webcamMonitor' && activeSession && (
          <WebcamMonitorView
            key="webcamMonitor"
            session={activeSession}
            regNo={studentRegNo}
            onLabUnlock={onLabUnlock}
            onLabPause={onLabPause}
            onLabResume={onLabResume}
            onExit={() => { setActiveSession(null); setView('gate'); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Gate View ─────────────────────────────────────────────────────────────────
function GateView({ onSelect }: { onSelect: (v: View) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md"
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-1.5 text-indigo-400 text-xs tracking-widest mb-6">
          <Activity size={12} /> LIVE ATTENDANCE SYSTEM
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Circuit<span className="text-indigo-400">.IQ</span></h1>
        <p className="text-slate-400 text-sm">Lab Session Management</p>
      </div>

      <div className="grid gap-4">
        <RoleCard
          icon={<Shield size={28} className="text-indigo-400" />}
          title="Professor"
          subtitle="Create & manage lab sessions"
          color="indigo"
          onClick={() => onSelect('adminLogin')}
        />
        <RoleCard
          icon={<GraduationCap size={28} className="text-emerald-400" />}
          title="Student"
          subtitle="Join your assigned session"
          color="emerald"
          onClick={() => onSelect('studentJoin')}
        />
      </div>
    </motion.div>
  );
}

function RoleCard({ icon, title, subtitle, color, onClick }: any) {
  const colors: Record<string, string> = {
    indigo: 'border-indigo-500/30 hover:border-indigo-400/60 hover:bg-indigo-500/5',
    emerald: 'border-emerald-500/30 hover:border-emerald-400/60 hover:bg-emerald-500/5',
  };
  return (
    <motion.button
      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full flex items-center gap-5 p-5 rounded-2xl border bg-white/3 ${colors[color]} transition-all text-left group`}
    >
      <div className={`w-14 h-14 rounded-xl bg-${color}-500/10 flex items-center justify-center shrink-0`}>{icon}</div>
      <div className="flex-1">
        <p className="font-bold text-lg text-white">{title}</p>
        <p className="text-slate-400 text-sm">{subtitle}</p>
      </div>
      <ChevronRight size={18} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
    </motion.button>
  );
}

// ── Admin Login ───────────────────────────────────────────────────────────────
function AdminLoginView({ onSuccess, onBack }: { onSuccess: (token: string) => void; onBack: () => void }) {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!password) return;
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok) { onSuccess(data.token); }
      else { setError(data.message || 'Invalid password'); }
    } catch { setError('Connection error — is Flask running?'); }
    finally { setLoading(false); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-sm"
    >
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm mb-8 transition-colors">
        ← Back
      </button>
      <div className="mb-8">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-4">
          <Shield size={24} className="text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">Professor Access</h2>
        <p className="text-slate-400 text-sm mt-1">Enter your admin password to continue</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type={show ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Admin password"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
          <button onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleLogin}
          disabled={loading || !password}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Shield size={16} />}
          {loading ? 'Verifying...' : 'Access Admin Panel'}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ── Admin Panel ───────────────────────────────────────────────────────────────
function AdminPanelView({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [tab, setTab] = useState<'create' | 'sessions'>('create');
  const [sessions, setSessions] = useState<any[]>([]);
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState<string | null>(null);
  const [createdRegNumbers, setCreatedRegNumbers] = useState<string[]>([]);
  const [checkedInLocal, setCheckedInLocal] = useState<string[]>([]);
  const [log, setLog] = useState<any | null>(null);

  // Form state
  const [experiment, setExperiment] = useState(EXPERIMENTS[0]);
  const [groupName, setGroupName] = useState('');
  const [groupSize, setGroupSize] = useState(4);
  const [regInput, setRegInput] = useState('');
  const [regNumbers, setRegNumbers] = useState<string[]>([]);

  const headers = { 'Content-Type': 'application/json', 'X-Admin-Token': token };

  const loadSessions = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/session/list', { headers });
      const data = await res.json();
      if (res.ok) setSessions(data.sessions);
    } catch {}
  }, [token]);

  useEffect(() => { loadSessions(); }, [loadSessions]);
  useEffect(() => {
    if (tab === 'sessions') { loadSessions(); }
  }, [tab]);

  const addReg = () => {
    const r = regInput.trim().toUpperCase();
    if (r && !regNumbers.includes(r)) { setRegNumbers([...regNumbers, r]); }
    setRegInput('');
  };

  const handleCreate = async () => {
    if (!groupName || regNumbers.length === 0) return;
    setCreating(true);
    try {
      const res = await fetch('/api/admin/session/create', {
        method: 'POST',
        headers,
        body: JSON.stringify({ experiment, group_name: groupName, group_size: groupSize, reg_numbers: regNumbers }),
      });
      const data = await res.json();
      if (res.ok) {
        setCreated(data.session_id);
        setCreatedRegNumbers([...regNumbers]);
        setGroupName(''); setRegNumbers([]); setRegInput('');
        loadSessions();
      }
    } catch {}
    finally { setCreating(false); }
  };

  const handleEnd = async (sessionId: string) => {
    const res = await fetch(`/api/session/${sessionId}/end`, { method: 'POST', headers });
    const data = await res.json();
    if (res.ok) { setLog(data.log); loadSessions(); }
  };

  const handleDelete = async (sessionId: string) => {
    await fetch(`/api/admin/session/${sessionId}/delete`, { method: 'DELETE', headers });
    loadSessions();
  };

  const downloadLog = (logData: any) => {
    const text = [
      `CIRCUIT.IQ ATTENDANCE LOG`,
      `═══════════════════════════════`,
      `Session ID  : ${logData.session_id}`,
      `Group       : ${logData.group_name}`,
      `Experiment  : ${logData.experiment}`,
      `Date        : ${logData.date}`,
      `Started     : ${logData.started_at || 'N/A'}`,
      `Ended       : ${logData.ended_at || 'N/A'}`,
      ``,
      `PRESENT (${logData.present.length}/${logData.total}):`,
      ...logData.present.map((r: string) => `  ✓ ${r}`),
      ``,
      `ABSENT (${logData.absent.length}/${logData.total}):`,
      ...(logData.absent.length ? logData.absent.map((r: string) => `  ✗ ${r}`) : ['  (none)']),
      ``,
      `SESSION TIMELINE:`,
      ...logData.events.map((e: any) => `  [${e.time.slice(11, 19)}] ${e.event}`),
    ].join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = `attendance_${logData.session_id}.txt`;
    a.click(); URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
          <p className="text-slate-400 text-sm mt-0.5">Manage lab sessions</p>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 text-slate-500 hover:text-red-400 text-sm transition-colors">
          <LogOut size={15} /> Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-white/5 rounded-xl p-1">
        {(['create', 'sessions'] as const).map((t) => (
          <button
            key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all capitalize ${tab === t ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            {t === 'create' ? '+ New Session' : 'Active Sessions'}
          </button>
        ))}
      </div>

      {/* Create Session */}
      {tab === 'create' && (
        <div className="space-y-4">
          {created && (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 space-y-3"
  >
    <div className="flex items-center gap-3">
      <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
      <div className="flex-1">
        <p className="text-emerald-300 font-semibold">Session Created!</p>
        <p className="text-slate-400 text-sm">Code: <span className="text-white font-bold tracking-widest">{created}</span></p>
      </div>
      <button onClick={() => { setCreated(null); setCreatedRegNumbers([]); setCheckedInLocal([]); }} className="text-slate-500 hover:text-slate-300"><XCircle size={16} /></button>
    </div>
    <div className="border-t border-white/10 pt-3">
      <p className="text-xs text-slate-500 tracking-widest uppercase mb-2">Mark Attendance</p>
      <div className="space-y-2">
        {createdRegNumbers.map((r) => {
          const isPresent = checkedInLocal.includes(r);
          return (
            <div key={r} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
              <span className={`text-sm font-mono ${isPresent ? 'text-emerald-400' : 'text-slate-300'}`}>{r}</span>
              <button
                onClick={async () => {
                  if (isPresent) return;
                  await fetch('/api/session/join', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ session_id: created, reg_number: r }),
                  });
                  const newChecked = [...checkedInLocal, r];
                  setCheckedInLocal(newChecked);
                  if (newChecked.length >= createdRegNumbers.length) {
                    setTimeout(() => {
                      setCreated(null);
                      setCreatedRegNumbers([]);
                      setCheckedInLocal([]);
                    }, 1500);
                  }
                }}
                className={`text-xs px-3 py-1 rounded-lg border transition-colors ${isPresent ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10 cursor-default' : 'border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10'}`}
              >
                {isPresent ? '✓ Present' : 'Mark Present'}
              </button>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-slate-600 mt-2 text-center">{checkedInLocal.length}/{createdRegNumbers.length} marked — lab opens when all present</p>
    </div>
  </motion.div>
)}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs text-slate-500 tracking-widest uppercase mb-2 block">Experiment</label>
              <select value={experiment} onChange={(e) => setExperiment(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50"
              >
                {EXPERIMENTS.map((e) => <option key={e} value={e} className="bg-gray-900">{e}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 tracking-widest uppercase mb-2 block">Group Name</label>
              <input value={groupName} onChange={(e) => setGroupName(e.target.value)}
                placeholder="e.g. Group A"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 tracking-widest uppercase mb-2 block">Group Size</label>
              <input type="number" min={1} max={10} value={groupSize} onChange={(e) => setGroupSize(parseInt(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-500 tracking-widest uppercase mb-2 block">Student Registration Numbers</label>
            <div className="flex gap-2">
              <input value={regInput} onChange={(e) => setRegInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addReg()}
                placeholder="e.g. 22BCE001 then press Enter"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50"
              />
              <button onClick={addReg} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 rounded-xl transition-colors">
                <Plus size={18} />
              </button>
            </div>
            {regNumbers.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {regNumbers.map((r) => (
                  <span key={r} className="flex items-center gap-1.5 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1.5 rounded-lg">
                    {r}
                    <button onClick={() => setRegNumbers(regNumbers.filter((x) => x !== r))} className="hover:text-red-400 transition-colors"><XCircle size={12} /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleCreate}
            disabled={creating || !groupName || regNumbers.length === 0}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {creating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
            {creating ? 'Creating...' : 'Create Session'}
          </motion.button>
        </div>
      )}

      {/* Sessions List */}
      {tab === 'sessions' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm">{sessions.length} session{sessions.length !== 1 ? 's' : ''}</p>
            <button onClick={loadSessions} className="text-slate-500 hover:text-slate-300 transition-colors"><RefreshCw size={14} /></button>
          </div>

          {sessions.length === 0 && (
            <div className="text-center py-12 text-slate-600">
              <FlaskConical size={32} className="mx-auto mb-3 opacity-30" />
              <p>No sessions yet. Create one!</p>
            </div>
          )}

          {sessions.map((s) => (
            <div key={s.id} className="bg-white/3 border border-white/8 rounded-xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white">{s.group_name}</span>
                    <StatusBadge status={s.status} />
                  </div>
                  <p className="text-slate-400 text-sm">{s.experiment}</p>
                  <p className="text-slate-500 text-xs mt-1">
                    Code: <span className="text-indigo-400 font-bold tracking-widest">{s.id}</span>
                    {' · '}{s.checked_in}/{s.group_size} checked in
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {s.status !== 'ended' && (
                    <button onClick={() => handleEnd(s.id)}
                      className="text-xs bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition-colors"
                    >End</button>
                  )}
                  {s.status === 'ended' && (
                    <button onClick={() => fetch(`/api/session/${s.id}/log`, { headers }).then(r => r.json()).then(d => downloadLog(d.log))}
                      className="text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                    ><Download size={12} /> Log</button>
                  )}
                  <button onClick={() => handleDelete(s.id)}
                    className="text-slate-600 hover:text-red-400 transition-colors p-1.5"
                  ><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Log Modal */}
      {log && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setLog(null)}
        >
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}
            className="bg-[#0D1117] border border-white/10 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white">Attendance Log</h3>
              <button onClick={() => downloadLog(log)} className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm">
                <Download size={14} /> Download
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2 text-slate-400">
                <span>Group: <span className="text-white">{log.group_name}</span></span>
                <span>Date: <span className="text-white">{log.date}</span></span>
              </div>
              <div>
                <p className="text-emerald-400 font-semibold mb-1">Present ({log.present.length})</p>
                {log.present.map((r: string) => <p key={r} className="text-slate-300 pl-2">✓ {r}</p>)}
              </div>
              {log.absent.length > 0 && (
                <div>
                  <p className="text-red-400 font-semibold mb-1">Absent ({log.absent.length})</p>
                  {log.absent.map((r: string) => <p key={r} className="text-slate-300 pl-2">✗ {r}</p>)}
                </div>
              )}
              <div>
                <p className="text-slate-400 font-semibold mb-1">Timeline</p>
                {log.events.map((e: any, i: number) => (
                  <p key={i} className="text-slate-500 text-xs pl-2">[{e.time.slice(11, 19)}] {e.event}</p>
                ))}
              </div>
            </div>
            <button onClick={() => setLog(null)} className="mt-4 w-full text-slate-500 hover:text-slate-300 text-sm transition-colors">Close</button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

// ── Student Join ──────────────────────────────────────────────────────────────
function StudentJoinView({ onJoined, onBack }: { onJoined: (s: Session, reg: string) => void; onBack: () => void }) {
  const [sessionCode, setSessionCode] = useState('');
  const [regNumber, setRegNumber]     = useState('');
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');

  const handleJoin = async () => {
    if (!sessionCode || !regNumber) return;
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/session/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionCode.toUpperCase(), reg_number: regNumber.toUpperCase() }),
      });
      const data = await res.json();
      if (res.ok) { onJoined(data.session, regNumber.toUpperCase()); }
      else { setError(data.message || 'Could not join session'); }
    } catch { setError('Connection error — is Flask running?'); }
    finally { setLoading(false); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-sm"
    >
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm mb-8 transition-colors">← Back</button>
      <div className="mb-8">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
          <GraduationCap size={24} className="text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">Join Lab Session</h2>
        <p className="text-slate-400 text-sm mt-1">Enter the code your professor shared</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-slate-500 tracking-widest uppercase mb-2 block">Session Code</label>
          <input value={sessionCode} onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
            placeholder="e.g. A3F92B1C"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 tracking-widest font-bold uppercase"
          />
        </div>
        <div>
          <label className="text-xs text-slate-500 tracking-widest uppercase mb-2 block">Registration Number</label>
          <input value={regNumber} onChange={(e) => setRegNumber(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
            placeholder="e.g. 22BCE001"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 uppercase"
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleJoin}
          disabled={loading || !sessionCode || !regNumber}
          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <UserCheck size={16} />}
          {loading ? 'Joining...' : 'Join Session'}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ── Webcam Monitor ────────────────────────────────────────────────────────────
function WebcamMonitorView({ session: initialSession, regNo, onLabUnlock, onLabPause, onLabResume, onExit }:
  { session: Session; regNo: string; onLabUnlock?: (id: string) => void; onLabPause?: () => void; onLabResume?: () => void; onExit: () => void }
) {
  const [session, setSession]         = useState(initialSession);
  const [camActive, setCamActive]     = useState(false);
  const [peopleCount, setPeopleCount] = useState(0);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const [camError, setCamError]       = useState('');

  const videoRef     = useRef<HTMLVideoElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const detectorRef  = useRef<any>(null);
  const streamRef    = useRef<MediaStream | null>(null);
  const intervalRef  = useRef<any>(null);
  const pollRef      = useRef<any>(null);

  const required = session.reg_numbers.length;

  // ── Poll session status every 3s ──────────────────────────────────────────
  useEffect(() => {
    pollRef.current = setInterval(async () => {
      try {
        const res  = await fetch(`/api/session/${session.id}/status`);
        const data = await res.json();
        if (res.ok) {
          const s = data.session as Session;
          setSession(s);
if (s.status === 'active') {
  onLabUnlock?.(session.id);
}
if (s.status === 'paused') onLabPause?.();
        }
      } catch {}
    }, 3000);
    return () => clearInterval(pollRef.current);
  }, [session.id]);

  // ── Load TensorFlow COCO-SSD from CDN ─────────────────────────────────────
  const loadModel = useCallback(async () => {
    setModelLoading(true);
    try {
      // Dynamically inject TF.js + COCO-SSD scripts
      const loadScript = (src: string) => new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
        const s = document.createElement('script');
        s.src = src; s.onload = () => resolve(); s.onerror = reject;
        document.head.appendChild(s);
      });

      await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl@4.15.0/dist/tf-backend-webgl.min.js');
await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.15.0/dist/tf.min.js');
await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd@2.2.3/dist/coco-ssd.min.js');

      const cocoSsd = (window as any).cocoSsd;
      detectorRef.current = await cocoSsd.load({ base: 'lite_mobilenet_v2' });
      setModelLoaded(true);
    } catch (e) {
      setCamError('Failed to load detection model. Check your internet connection.');
    }
    setModelLoading(false);
  }, []);

  // ── Start webcam ──────────────────────────────────────────────────────────
  const startCamera = useCallback(async () => {
    setCamError('');
    if (!modelLoaded) await loadModel();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 320, height: 240 } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCamActive(true);

      // Run detection every 2s
      intervalRef.current = setInterval(async () => {
        if (!videoRef.current || !detectorRef.current) return;
        try {
          const predictions = await detectorRef.current.detect(videoRef.current);
          const count = predictions.filter((p: any) => p.class === 'person').length;
          setPeopleCount(count);

          // Draw boxes on canvas
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
              canvasRef.current.width  = videoRef.current.videoWidth;
              canvasRef.current.height = videoRef.current.videoHeight;
              ctx.drawImage(videoRef.current, 0, 0);
              ctx.strokeStyle = count >= required ? '#10b981' : '#ef4444';
              ctx.lineWidth = 2;
              predictions.filter((p: any) => p.class === 'person').forEach((p: any) => {
                const [x, y, w, h] = p.bbox;
                ctx.strokeRect(x, y, w, h);
                ctx.fillStyle = count >= required ? '#10b981' : '#ef4444';
                ctx.font = '12px monospace';
                ctx.fillText('Person', x, y - 4);
              });
            }
          }

          // Send to backend
          await fetch(`/api/session/${session.id}/presence`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ people_count: count }),
          });
        } catch {}
      }, 1500);

    } catch (e: any) {
      setCamError(e.name === 'NotAllowedError' ? 'Camera permission denied. Please allow camera access.' : 'Could not access camera.');
    }
  }, [modelLoaded, session.id, required, loadModel]);

  const stopCamera = useCallback(() => {
    clearInterval(intervalRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    setCamActive(false); setPeopleCount(0);
  }, []);

  useEffect(() => () => { stopCamera(); clearInterval(pollRef.current); }, []);

  const statusColor = {
    waiting: 'text-amber-400',
    active:  'text-emerald-400',
    paused:  'text-red-400',
    ended:   'text-slate-400',
  }[session.status];

  const statusLabel = {
    waiting: 'Waiting for all members...',
    active:  'Experiment Active',
    paused:  'PAUSED — Member left frame!',
    ended:   'Session Ended',
  }[session.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-slate-500 tracking-widest uppercase">Session {session.id}</p>
          <h2 className="text-xl font-bold text-white">{session.group_name} — {session.experiment}</h2>
        </div>
        <button onClick={() => { stopCamera(); onExit(); }} className="text-slate-500 hover:text-slate-300 transition-colors text-sm flex items-center gap-1">
          <LogOut size={14} /> Exit
        </button>
      </div>

      {/* Status Banner */}
      <motion.div
        animate={{ borderColor: session.status === 'paused' ? '#ef4444' : session.status === 'active' ? '#10b981' : '#f59e0b' }}
        className="border rounded-2xl p-4 mb-5 bg-white/3"
      >
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${session.status === 'active' ? 'bg-emerald-400 animate-pulse' : session.status === 'paused' ? 'bg-red-400 animate-ping' : 'bg-amber-400'}`} />
          <p className={`font-bold ${statusColor}`}>{statusLabel}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4 text-center">
          <Stat label="Checked In" value={`${session.checked_in.length}/${required}`} color="indigo" />
          <Stat label="In Frame" value={camActive ? `${peopleCount}/${required}` : '—'} color={peopleCount >= required ? 'emerald' : 'red'} />
          <Stat label="You" value={regNo} color="slate" small />
        </div>
      </motion.div>

      {/* Check-in list */}
      <div className="bg-white/3 border border-white/8 rounded-2xl p-4 mb-5">
        <p className="text-xs text-slate-500 tracking-widest uppercase mb-3">Members</p>
        <div className="space-y-2">
          {session.reg_numbers.map((r) => {
            const present = session.checked_in.includes(r);
            return (
              <div key={r} className="flex items-center gap-3">
                {present
                  ? <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  : <Clock size={16} className="text-slate-600 shrink-0" />}
                <span className={`text-sm ${present ? 'text-white' : 'text-slate-500'}`}>{r}</span>
                {r === regNo && <span className="text-xs text-indigo-400 ml-auto">you</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Webcam */}
      <div className="bg-white/3 border border-white/8 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-slate-500 tracking-widest uppercase">Presence Monitor</p>
          <button
            onClick={camActive ? stopCamera : startCamera}
            className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border transition-colors ${camActive ? 'border-red-500/30 text-red-400 hover:bg-red-500/10' : 'border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10'}`}
          >
            {camActive ? <><CameraOff size={12} /> Stop</> : <><Camera size={12} /> {modelLoading ? 'Loading...' : 'Start Camera'}</>}
          </button>
        </div>

        {camError && <p className="text-red-400 text-sm mb-3">{camError}</p>}

        {!camActive && !modelLoading && (
          <div className="aspect-video bg-black/30 rounded-xl flex flex-col items-center justify-center border border-white/5 text-slate-600">
            <Camera size={32} className="mb-2 opacity-30" />
            <p className="text-sm">Camera not active</p>
            <p className="text-xs mt-1 opacity-60">Start camera to enable presence detection</p>
          </div>
        )}

        {modelLoading && (
          <div className="aspect-video bg-black/30 rounded-xl flex flex-col items-center justify-center border border-white/5">
            <Loader2 size={24} className="animate-spin text-indigo-400 mb-2" />
            <p className="text-slate-400 text-sm">Loading detection model...</p>
            <p className="text-slate-600 text-xs mt-1">First time takes ~10 seconds</p>
          </div>
        )}

        <div className={camActive ? 'block' : 'hidden'}>
          <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none" muted playsInline />
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute top-2 right-2 bg-black/60 rounded-lg px-2 py-1 text-xs text-white font-mono">
              {peopleCount} / {required} detected
            </div>
          </div>
        </div>

        <p className="text-slate-600 text-xs mt-3 text-center">
          Webcam runs locally — no video is sent to any server
        </p>
      </div>
    </motion.div>
  );
}

// ── Small helpers ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    waiting: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    active:  'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    paused:  'bg-red-500/10 text-red-400 border-red-500/30',
    ended:   'bg-slate-500/10 text-slate-400 border-slate-500/30',
  };
  return (
    <span className={`text-xs border px-2 py-0.5 rounded-full capitalize ${styles[status] || styles.ended}`}>
      {status}
    </span>
  );
}

function Stat({ label, value, color, small }: { label: string; value: string; color: string; small?: boolean }) {
  const colors: Record<string, string> = {
    indigo: 'text-indigo-400', emerald: 'text-emerald-400', red: 'text-red-400', slate: 'text-slate-300',
  };
  return (
    <div>
      <p className={`font-bold ${small ? 'text-sm' : 'text-xl'} ${colors[color] || 'text-white'}`}>{value}</p>
      <p className="text-xs text-slate-500 mt-0.5">{label}</p>
    </div>
  );
}
