/**
 * PhysicsBotPanel.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Floating draggable chat panel for the AI PhysicsBot tutor.
 *
 * Redesigned with premium glassmorphic dark-theme aesthetics.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, Minimize2, Maximize2, User } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

interface CircuitContext {
  placed_components?: unknown[];
  wires?: unknown[];
  params?: Record<string, number>;
  readings?: Record<string, number>;
}

export default function PhysicsBotPanel() {
  const physicsBotOpen = useAppStore((state) => state.physicsBotOpen);
  const setPhysicsBotOpen = useAppStore((state) => state.setPhysicsBotOpen);
  const currentExperiment = useAppStore((state) => state.currentExperiment);

  const [messages, setMessages]       = useState<Message[]>([]);
  const [input, setInput]             = useState('');
  const [loading, setLoading]         = useState(false);
  const [minimized, setMinimized]     = useState(false);
  const [circuitCtx, setCircuitCtx]   = useState<CircuitContext>({});

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // ── Scroll to bottom on new messages ──────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── Focus input when panel opens ───────────────────────────────────────────
  useEffect(() => {
    if (physicsBotOpen && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [physicsBotOpen, minimized]);

  // ── Listen for circuit state updates from the 3D lab iframe ───────────────
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'CIRCUIT_STATE_UPDATE') {
        setCircuitCtx(event.data.payload ?? {});
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  // ── Send question to /api/physicsbot/ask ───────────────────────────────────
  const sendMessage = useCallback(async (overrideText?: string) => {
    const question = (overrideText || input).trim();
    if (!question || loading) return;

    const userMsg: Message = { 
      role: 'user', 
      content: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/physicsbot/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          experiment:    currentExperiment ?? 'unknown',
          circuit_state: circuitCtx,
        }),
      });

      const data = await response.json();
      const answer = data.answer ?? "Sorry, I couldn't process that. Try again!";
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch {
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: 'Connection error — make sure the backend is running on port 5000.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [input, loading, currentExperiment, circuitCtx]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!physicsBotOpen) return null;

  // Suggestion chips selection depending on active experiment
  const chips = currentExperiment && currentExperiment !== 'unknown'
    ? ["How to connect?", "Explain theory", "Show formulas"]
    : ["What is Ohm's Law?", "Explain KVL", "LCR Resonance"];

  return (
    <AnimatePresence>
      <motion.div
        key="physicsbot-panel"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: 'spring', damping: 24, stiffness: 300 }}
        className={cn(
          'fixed bottom-6 right-6 z-[200] w-[370px] rounded-2xl shadow-2xl',
          'backdrop-blur-xl bg-slate-950/85 border border-white/10',
          'flex flex-col overflow-hidden',
          minimized ? 'h-auto' : 'h-[500px]'
        )}
        drag
        dragMomentum={false}
        dragElastic={0}
      >
        {/* ── Header ── */}
        <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-indigo-500/10 border-b border-white/10 text-white shrink-0 cursor-grab active:cursor-grabbing">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-400 to-blue-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <Bot size={16} className="text-slate-950 font-bold" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-xs leading-none tracking-wider text-teal-400 uppercase">PhysicsBot</p>
            <p className="text-[10px] text-slate-400 mt-1 truncate">
              {currentExperiment ? `Experiment: ${currentExperiment.toUpperCase()}` : 'AI Physics Tutor'}
            </p>
          </div>
          <button
            onClick={() => setMinimized((m) => !m)}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Minimize"
          >
            {minimized ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
          </button>
          <button
            onClick={() => setPhysicsBotOpen(false)}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={13} />
          </button>
        </div>

        {/* ── Body (hidden when minimized) ── */}
        {!minimized && (
          <>
            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 scrollbar-thin">
              {messages.length === 0 && (
                <div className="text-center text-xs text-slate-500 mt-12 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 border border-white/5 animate-pulse">
                    <Bot size={22} className="text-teal-400" />
                  </div>
                  <p className="font-semibold text-slate-300">Ask your AI Physics Mentor</p>
                  <p className="text-[10px] mt-1 text-slate-500 max-w-[200px] leading-relaxed">I have live visual feedback of your breadboard connections and active meters.</p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex gap-2.5 items-start',
                    msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  )}
                >
                  <div className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center shrink-0 border text-[10px]',
                    msg.role === 'user' 
                      ? 'bg-gradient-to-tr from-blue-500 to-indigo-500 border-blue-400 text-white' 
                      : 'bg-gradient-to-tr from-teal-400 to-emerald-400 border-teal-400 text-slate-950'
                  )}>
                    {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                  </div>
                  <div className="flex flex-col max-w-[76%]">
                    <span className={cn(
                      'text-[8px] font-bold tracking-wider uppercase mb-1 px-1',
                      msg.role === 'user' ? 'text-blue-400 self-end' : 'text-teal-400 self-start'
                    )}>
                      {msg.role === 'user' ? 'Student' : 'AI Mentor'}
                    </span>
                    <div
                      className={cn(
                        'rounded-2xl px-3.5 py-2.5 text-[11px] leading-relaxed shadow-lg',
                        msg.role === 'user'
                          ? 'bg-gradient-to-tr from-blue-600/10 to-indigo-600/10 border border-indigo-500/30 text-slate-200 rounded-tr-none'
                          : 'bg-white/5 border border-white/10 text-slate-300 rounded-tl-none'
                      )}
                      dangerouslySetInnerHTML={{ __html: msg.content }}
                    />
                    {msg.timestamp && (
                      <span className="text-[8px] text-slate-600 font-mono mt-1 self-end px-1">{msg.timestamp}</span>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2.5 items-start">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 border bg-gradient-to-tr from-teal-400 to-emerald-400 border-teal-400 text-slate-950">
                    <Bot size={12} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] font-bold tracking-wider uppercase mb-1 text-teal-400 px-1">AI Mentor</span>
                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none px-4 py-3 shadow-lg">
                      <div className="flex gap-1.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* ── Suggestion Chips ── */}
            <div className="flex gap-2 overflow-x-auto px-4 pb-2 pt-1 border-t border-white/5 shrink-0 scrollbar-none">
              {chips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(chip)}
                  disabled={loading}
                  className="px-3 py-1 bg-white/5 border border-white/10 hover:border-teal-400/40 hover:bg-teal-500/10 text-[10px] text-slate-300 hover:text-teal-300 rounded-full cursor-pointer whitespace-nowrap transition-all duration-150 disabled:opacity-40 disabled:pointer-events-none"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* ── Input ── */}
            <div className="px-3 pb-3 pt-2 border-t border-white/5 shrink-0 bg-slate-950/40">
              <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 border border-white/10 focus-within:border-teal-500/50 transition-colors">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about your circuit…"
                  disabled={loading}
                  className="flex-1 bg-transparent text-xs text-slate-200 placeholder:text-slate-600 outline-none disabled:opacity-50"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  className="w-7 h-7 rounded-lg bg-teal-400 hover:bg-teal-300 disabled:bg-white/5 text-slate-950 disabled:text-slate-700 flex items-center justify-center hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all cursor-pointer shadow-lg shadow-teal-500/15"
                  aria-label="Send"
                >
                  <Send size={12} />
                </button>
              </div>
              <p className="text-[8px] text-center text-slate-600 mt-2 tracking-wide font-medium">
                Powered by Gemini 2.5 AI · Live telemetry synchronisation
              </p>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
