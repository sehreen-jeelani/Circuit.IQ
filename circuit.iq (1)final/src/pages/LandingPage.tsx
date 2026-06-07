import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import AntigravityHero from '../components/AntigravityHero';
import PhysicsShowcase from '../components/PhysicsShowcase';
import CyberpunkLedMatrix from '../components/CyberpunkLedMatrix';
import TeamRolesSection from '../components/TeamRolesSection';
import { useAppStore } from '../store/useAppStore';
import { Zap, Cpu, MousePointer2, FlaskConical, Bot, Send, HelpCircle, BookOpen, Terminal, Sparkles, HelpCircle as HelpIcon, ArrowRight, Gauge, Atom } from 'lucide-react';
import Lenis from 'lenis';

interface ExperimentItem {
  id: string;
  name: string;
  desc: string;
  aim: string;
  formula: string;
}

interface DomainCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  experiments: ExperimentItem[];
}

const PHYSICS_DOMAINS: DomainCategory[] = [
  {
    id: "circuits",
    title: "Electricity & Circuits",
    icon: "⚡",
    color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-600 dark:text-blue-400",
    experiments: [
      { id: "ohms", name: "Ohm's Law Verification", desc: "Study linear voltage-current relations in conductors.", aim: "Verify V = I × R.", formula: "V = I × R" },
      { id: "kvl", name: "Kirchhoff's Voltage Law", desc: "Verify loop voltage summation equals zero.", aim: "Verify sum of voltages around closed loop is zero.", formula: "Σ V = 0" },
      { id: "kcl", name: "Kirchhoff's Current Law", desc: "Verify nodal charge conservation.", aim: "Verify sum of currents entering junction equals currents exiting.", formula: "Σ I_in = Σ I_out" },
      { id: "rc_rl_rlc", name: "RC/RL/RLC AC Circuits", desc: "Analyze reactive components impedance.", aim: "Measure phase angle and total impedance.", formula: "Z = √[R² + (X_L - X_C)²]" },
      { id: "series_parallel", name: "Series & Parallel Loads", desc: "Analyze equivalent resistance combinations.", aim: "Compare additive vs reciprocal sum R.", formula: "R_eq = R1 + R2 | 1/R_eq = 1/R1 + 1/R2" },
      { id: "wheatstone", name: "Wheatstone Bridge", desc: "Measure unknown resistance via bridge balance.", aim: "Verify null detector voltage at balance.", formula: "R1 / R2 = R3 / R4" },
      { id: "diode_iv", name: "Diode I-V Characteristics", desc: "Study PN junction exponential forward and reverse bias current.", aim: "Verify the I-V characteristics of a semiconductor diode (PN Junction).", formula: "I = I_s * (e^(V_d / n V_t) - 1)" },
      { id: "voltage_divider", name: "Voltage & Current Divider", desc: "Analyze voltage drops and branch currents division ratios.", aim: "Verify the voltage division rule in series and current division in parallel circuits.", formula: "V_out = V_in * [R2 / (R1 + R2)]" },
      { id: "led", name: "LED Color & Planck's Constant", desc: "Study LED wavelength threshold turn-on voltages.", aim: "Determine Planck's constant by measuring the turn-on voltage of different colored LEDs.", formula: "e × V_th = h × ν" },
      { id: "lcr", name: "Series LCR Resonance", desc: "Find inductive and capacitive cancellation resonance point.", aim: "Determine resonant frequency of LCR series circuit.", formula: "f₀ = 1 / (2π√(LC))" },
      { id: "rc", name: "RC Time Constant", desc: "Study capacitor charging transient voltage profiles.", aim: "Measure transient capacitor charging rate.", formula: "τ = R × C" },
      { id: "arduino_led", name: "Arduino LED Control", desc: "Assemble basic digital control circuit loop using Arduino 5V/GND.", aim: "Control an LED using a switch and an Arduino power loop.", formula: "I = (V_pin - V_led) / R" }
    ]
  },
  {
    id: "magnetism",
    title: "Electromagnetism",
    icon: "🧲",
    color: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-600 dark:text-purple-400",
    experiments: [
      { id: "faraday", name: "Faraday's Induction Law", desc: "Induce voltage by moving magnet flux changes through coil.", aim: "Induce emf via moving magnetic fields.", formula: "E = -N (ΔΦ / Δt)" },
      { id: "lenz", name: "Lenz's Law Demonstration", desc: "Verify that induced voltage direction opposes flux changes.", aim: "Study induced magnetic field polarity directions.", formula: "Direction opposes dΦ/dt" },
      { id: "solenoid", name: "Solenoid Magnetic Field", desc: "Map magnetic flux density variations inside a coil.", aim: "Measure B-field inside current-carrying solenoid.", formula: "B = μ₀ n I" },
      { id: "transformer", name: "AC Transformer Ratio", desc: "Analyze voltage step-up/step-down coupling ratios.", aim: "Study voltage conversion ratios of transformers.", formula: "V_s / V_p = N_s / N_p" },
      { id: "biot_savart", name: "Biot-Savart's Law", desc: "Measure field decay curves around current carrying straight conductor.", aim: "Verify the relation between magnetic field, current, and distance from a straight conductor.", formula: "B = (μ₀ × I) / (2π × r)" }
    ]
  },
  {
    id: "thermo",
    title: "Thermodynamics",
    icon: "🔥",
    color: "from-rose-500/20 to-red-500/20 border-rose-500/30 text-rose-600 dark:text-rose-400",
    experiments: [
      { id: "ideal_gas", name: "Ideal Gas State Equation", desc: "Study pressure, volume and temperature state equations.", aim: "Verify P-V-T thermodynamic relationships.", formula: "P V = n R T" },
      { id: "boyle", name: "Boyle's Constant Temp Law", desc: "Measure volume contraction ratio under scaling pressure.", aim: "Verify P-V inverse pressure volume relations.", formula: "P1 V1 = P2 V2" },
      { id: "charles", name: "Charles's Constant Pres Law", desc: "Observe linear volume expansion under thermal scaling.", aim: "Verify V-T volume temperature linear relations.", formula: "V1 / T1 = V2 / T2" },
      { id: "specific_heat", name: "Specific Heat Capacity", desc: "Trace specific heat ratios of metals using calorimetry.", aim: "Measure copper thermal specific heat.", formula: "Q = m c ΔT" },
      { id: "stefan_law", name: "Stefan's Law Verification", desc: "Verify energy radiation scaling with fourth power of temperature.", aim: "Verify the Stefan-Boltzmann law relating total radiated energy to absolute temperature.", formula: "P = σ × ε × A × T⁴" }
    ]
  },
  {
    id: "modern",
    title: "Modern Physics",
    icon: "⚛",
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
    experiments: [
      { id: "photoelectric", name: "Photoelectric Effect", desc: "Verify work function quantum barriers.", aim: "Determine stopping voltage vs light wavelength.", formula: "Kmax = h ν - Φ" },
      { id: "planck_photocell", name: "Planck's Constant (Photocell)", desc: "Calculate h constant via phototube stopping voltage.", aim: "Find Planck's constant using photoelectric effect in a vacuum photocell.", formula: "e × Vs = h × f − Φ" },
      { id: "planck_led", name: "Planck's Constant using LEDs", desc: "Measure turn-on voltages of multiple LEDs to estimate Planck's constant.", aim: "Determine Planck's constant by measuring the turn-on voltage of different colored LEDs.", formula: "h = (e × V_th × λ) / c" },
      { id: "radioactive", name: "Radioactive Decay Half-Life", desc: "Observe parent nuclei counts half-life reduction rates.", aim: "Verify nuclei exponential decay rate.", formula: "N(t) = N₀ e^(-λ t)" },
      { id: "de_broglie", name: "de Broglie matter wave", desc: "Determine quantum matter wave duality limits.", aim: "Measure wave characteristics of moving masses.", formula: "λ = h / (m v)" },
      { id: "bohr_model", name: "Bohr Hydrogen atom transitions", desc: "Study discrete photon emissions on orbital energy drops.", aim: "Calculate transition shell wavelengths.", formula: "E = 13.6 (1/n_f² - 1/n_i²) eV" }
    ]
  }
];

function BotMessage({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const words = text.split(' ');
    let currentText = '';
    
    const timer = setInterval(() => {
      if (index < words.length) {
        currentText += (index === 0 ? '' : ' ') + words[index];
        setDisplayedText(currentText);
        index++;
      } else {
        clearInterval(timer);
      }
    }, 20);
    
    return () => clearInterval(timer);
  }, [text]);

  return <p className="whitespace-pre-wrap">{displayedText}</p>;
}

export default function LandingPage({ view = 'home' }: { view?: 'home' | 'experiments' | 'physicsbot' }) {
  const { setLabOpen, setCurrentExperiment, setActiveTab } = useAppStore();
  const [activeCategory, setActiveCategory] = useState("circuits");
  
  // PhysicsBot State
  const [botQuestion, setBotQuestion] = useState("");
  const [botChatHistory, setBotChatHistory] = useState<Array<{ sender: 'user' | 'bot'; text: string; formulas?: Array<{ name: string; expr: string }>; recommendedExp?: string }>>([]);
  const [botLoading, setBotLoading] = useState(false);

  useEffect(() => {
    setBotChatHistory([
      {
        sender: 'bot',
        text: "Hello! I am PhysicsBot, your virtual AI tutor. Ask me any physics question from our core domains (Circuits, Electromagnetism, Thermodynamics, or Quantum/Modern Physics) and I will provide step-by-step solutions, equations, and let you load active 3D simulations!"
      }
    ]);
  }, []);

  const handleLaunchExperiment = (id: string) => {
    setCurrentExperiment(id);
    setLabOpen(true);
  };

  const handleBotSubmit = async (queryText: string) => {
    if (!queryText.trim() || botLoading) return;
    
    const newHistory = [...botChatHistory, { sender: 'user' as const, text: queryText }];
    setBotChatHistory(newHistory);
    setBotQuestion("");
    setBotLoading(true);
    
    try {
      const response = await fetch('/api/physics-bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: queryText })
      });
      if (response.ok) {
        const data = await response.json();
        setBotChatHistory([...newHistory, {
          sender: 'bot',
          text: data.explanation,
          formulas: data.formulas,
          recommendedExp: data.recommendedExp
        }]);
      } else {
        throw new Error("API status failed");
      }
    } catch (err) {
      console.warn("Failed to contact PhysicsBot API, generating local response.", err);
      let explanation = "I analyzed your question, but could not contact the backend. Locally, I can tell you that physics follows strict mathematical boundaries. Select a specific domain to explore its core relationships.";
      let formulas = [{ name: "Mass-Energy", expr: "E = m c²" }];
      let recommendedExp = undefined;
      
      const qLower = queryText.toLowerCase();
      if (qLower.includes('ohm') || qLower.includes('resistor') || qLower.includes('voltage')) {
        explanation = "Ohm's Law governs electrical currents in resistive paths. Under constant temperature, current is directly proportional to voltage and inversely proportional to resistance.";
        formulas = [{ name: "Ohm's Law", expr: "V = I × R" }];
        recommendedExp = "ohms";
      } else if (qLower.includes('lcr') || qLower.includes('resonance')) {
        explanation = "In series LCR resonance, inductive and capacitive reactances cancel out. Total impedance drops to equal the resistance R, generating maximum current flow.";
        formulas = [{ name: "Resonance", expr: "f₀ = 1 / (2π√(LC))" }];
        recommendedExp = "lcr";
      } else if (qLower.includes('pendulum') || qLower.includes('gravity')) {
        explanation = "A simple pendulum swings in simple harmonic motion. Its period depends on length L and gravity g, not the bob mass.";
        formulas = [{ name: "Period", expr: "T = 2π √(L / g)" }];
        recommendedExp = "pendulum";
      } else if (qLower.includes('snell') || qLower.includes('refraction')) {
        explanation = "Light bends when entering a new refractive medium. Snell's law relates the sine ratio of incident and refractive angles.";
        formulas = [{ name: "Snell's Law", expr: "n₁ sin(θ₁) = n₂ sin(θ₂)" }];
        recommendedExp = "snell";
      } else if (qLower.includes('gas') || qLower.includes('boyle') || qLower.includes('charles')) {
        explanation = "Gases follow PV = nRT. Boyle's law describes inverse P-V pressure-volume states, and Charles's law describes linear volume-temperature expansion.";
        formulas = [{ name: "Ideal Gas", expr: "P V = n R T" }];
        recommendedExp = "ideal_gas";
      } else if (qLower.includes('photoelectric') || qLower.includes('photon')) {
        explanation = "Photoelectric emission occurs when incident photon energy exceeds the metal work function Φ, ejecting electrons at speed proportional to stopping voltage.";
        formulas = [{ name: "Einstein's Photoelectric", expr: "Kmax = h ν - Φ" }];
        recommendedExp = "photoelectric";
      }
      
      setBotChatHistory([...newHistory, {
        sender: 'bot',
        text: explanation,
        formulas: formulas,
        recommendedExp: recommendedExp
      }]);
    } finally {
      setBotLoading(false);
    }
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const yText = useTransform(scrollY, [0, 800], [0, 250]);
  const scaleText = useTransform(scrollY, [0, 800], [1, 0.8]);
  const opacityText = useTransform(scrollY, [0, 600], [1, 0]);
  const trackingText = useTransform(scrollY, [0, 800], ["-0.05em", "0.15em"]);
  const rotateXText = useTransform(scrollY, [0, 800], [0, 45]);
  const rotateZText = useTransform(scrollY, [0, 800], [0, 5]);
  const blurText = useTransform(scrollY, [0, 600], ["blur(0px)", "blur(10px)"]);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  if (view === 'experiments') {
    return (
      <div className="relative min-h-screen pt-28 pb-16 bg-transparent">
        {/* Experiments Explorer Section */}
        <section id="experiments-section" className="relative w-full overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-display font-bold mb-3 text-slate-900 dark:text-white">Virtual Laboratory Experiments</h2>
                  <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base">Select any specific experiment to open the Virtual 3D Lab and begin interactive analysis immediately.</p>
                </div>

                {/* Category tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                  {PHYSICS_DOMAINS.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border flex items-center gap-2 cursor-pointer ${
                        activeCategory === cat.id
                          ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10"
                          : "bg-white dark:bg-black/30 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5"
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.title}</span>
                    </button>
                  ))}
                </div>

                {/* Experiments grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PHYSICS_DOMAINS.find(cat => cat.id === activeCategory)?.experiments.map(exp => (
                    <motion.div
                      key={exp.id}
                      layoutId={`exp-card-${exp.id}`}
                      className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/[0.06] bg-white/90 dark:bg-white/[0.03] backdrop-blur-xl hover:border-indigo-400/40 dark:hover:border-indigo-400/20 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-indigo-500/[0.07] dark:hover:shadow-indigo-500/[0.04] text-left hover:-translate-y-0.5 relative overflow-hidden"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono text-blue-500 dark:text-blue-400 uppercase tracking-widest font-bold">Lab Module</span>
                          <div className="relative w-3 h-3 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-[0_0_6px_rgba(52,211,153,0.5)] group-hover:scale-150 transition-transform" />
                          </div>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">{exp.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">{exp.desc}</p>
                        
                        <div className="bg-slate-50 dark:bg-black/30 border border-slate-100 dark:border-white/5 rounded-xl p-3 mt-4 flex flex-col gap-1">
                          <span className="text-[8px] font-mono text-slate-400 uppercase">Core Equation:</span>
                          <code className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-bold">{exp.formula}</code>
                        </div>
                      </div>

                      <button
                        onClick={() => handleLaunchExperiment(exp.id)}
                        className="w-full mt-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <span>Launch Experiment</span>
                        <Zap size={12} fill="currentColor" />
                      </button>
                    </motion.div>
                  ))}
                </div>
            </div>
        </section>
      </div>
    );
  }

  if (view === 'physicsbot') {
    return (
      <div className="relative min-h-screen pt-28 pb-16 bg-transparent flex items-center justify-center">
        {/* Ambient Glowing Background Elements */}
        <div className="absolute top-1/4 left-10 md:left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 md:right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* PhysicsBot AI HUD Section */}
        <section id="physicsbot-section" className="relative w-full overflow-hidden bg-transparent z-10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10 flex flex-col items-center gap-2">
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-2 group">
                <div className="absolute inset-0 rounded-2xl bg-emerald-400 opacity-0 group-hover:opacity-20 blur-sm transition-all duration-300" />
                <Bot className="text-white w-7 h-7 animate-pulse" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">PhysicsBot AI Console</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-md text-xs leading-relaxed">
                Ask PhysicsBot queries in electrodynamics, thermodynamics, or modern physics, and get immediate step-by-step math analysis.
              </p>
            </div>

            <div className="relative bg-white/80 dark:bg-black/45 border border-slate-200/80 dark:border-white/10 rounded-3xl shadow-[0_0_50px_-12px_rgba(16,185,129,0.12)] dark:shadow-[0_0_80px_-25px_rgba(16,185,129,0.35)] backdrop-blur-3xl overflow-hidden flex flex-col h-[550px] transition-all duration-300">
              
              {/* Decorative Tech Grid Overlay inside Terminal */}
              <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

              {/* Terminal Header */}
              <div className="px-5 py-4 bg-slate-50/90 dark:bg-black/60 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between z-10 relative">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.3)]" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.3)]" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                  <div className="flex items-center gap-1.5 ml-3 font-mono text-[10px] text-slate-400 dark:text-slate-400 uppercase tracking-widest font-bold">
                    <Terminal size={12} className="text-slate-400 dark:text-emerald-500" />
                    <span>PhysicsBot v1.0 // Diagnostic Online</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Neon Signal Waveform Animation */}
                  <div className="hidden sm:flex items-center gap-1 opacity-70">
                    <span className="w-0.5 h-3 bg-emerald-500/70 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '0.8s' }} />
                    <span className="w-0.5 h-5 bg-emerald-400/80 rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '0.6s' }} />
                    <span className="w-0.5 h-2.5 bg-emerald-500/60 rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '0.9s' }} />
                    <span className="w-0.5 h-4.5 bg-cyan-400/80 rounded-full animate-bounce" style={{ animationDelay: '450ms', animationDuration: '0.7s' }} />
                    <span className="w-0.5 h-3 bg-emerald-400/70 rounded-full animate-bounce" style={{ animationDelay: '600ms', animationDuration: '0.8s' }} />
                  </div>

                  <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-500/20 px-3 py-1 rounded-full shadow-inner">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                    <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 uppercase font-bold tracking-widest">Active</span>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 text-left z-10 relative scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10">
                {botChatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col gap-1.5 max-w-[85%] ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                  >
                    {msg.sender === 'user' ? (
                      <span className="font-mono text-[9px] text-blue-600 dark:text-blue-400/80 mr-1 select-none flex items-center gap-1 font-bold">
                        <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                        operator@circuit-iq:~$
                      </span>
                    ) : (
                      <span className="font-mono text-[9px] text-emerald-600 dark:text-emerald-400/80 flex items-center gap-1 select-none ml-1 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        physicsbot@circuit-iq:~$
                      </span>
                    )}
                    
                    <div className="flex gap-3 w-full items-start">
                      {msg.sender === 'user' ? null : (
                        <div className="w-8 h-8 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/5">
                          <Bot size={15} />
                        </div>
                      )}
                      
                      <div className={`p-4 rounded-2xl text-[13px] leading-relaxed flex flex-col gap-2.5 ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-600/15 dark:to-indigo-600/15 text-white dark:text-slate-250 border border-blue-500/20 dark:border-blue-500/10 rounded-tr-none shadow-md shadow-blue-500/5'
                          : 'bg-slate-100/90 dark:bg-emerald-950/10 text-slate-800 dark:text-emerald-100/90 border border-slate-200 dark:border-emerald-500/15 rounded-tl-none backdrop-blur-md shadow-sm'
                      }`}>
                        {msg.sender === 'bot' && idx === botChatHistory.length - 1 ? (
                          <BotMessage text={msg.text} />
                        ) : (
                          <p className="whitespace-pre-wrap">{msg.text}</p>
                        )}
                        
                        {msg.formulas && msg.formulas.length > 0 && (
                          <div className="bg-slate-200/55 dark:bg-black/60 border border-slate-300/30 dark:border-emerald-500/10 rounded-xl p-3.5 mt-2 flex flex-col gap-2 shadow-inner font-mono">
                            <span className="text-[8px] font-mono text-slate-400 dark:text-slate-500 uppercase font-extrabold tracking-wider">Relevant Formulas:</span>
                            {msg.formulas.map((f, fidx) => (
                              <div key={fidx} className="flex justify-between items-center gap-4 text-[10px] text-slate-700 dark:text-emerald-400">
                                <span className="font-bold">{f.name}:</span>
                                <span className="font-bold text-blue-600 dark:text-emerald-300 bg-blue-50 dark:bg-emerald-500/5 px-2 py-0.5 rounded border border-blue-100/50 dark:border-emerald-500/10">{f.expr}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {msg.recommendedExp && (
                          <button
                            onClick={() => handleLaunchExperiment(msg.recommendedExp!)}
                            className="mt-2.5 py-2 px-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-lg text-[9px] flex items-center justify-center gap-1.5 cursor-pointer self-start tracking-wider uppercase transition-all duration-300 shadow-md shadow-emerald-500/10 hover:scale-[1.03]"
                          >
                            <span>⚡ Load simulation in lab</span>
                          </button>
                        )}
                      </div>
                      
                      {msg.sender === 'user' ? (
                        <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/10">
                          <span className="text-xs font-bold">OP</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
                
                {botLoading && (
                  <div className="flex flex-col gap-1.5 self-start items-start">
                    <span className="font-mono text-[9px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 select-none ml-1 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      physicsbot@circuit-iq:~$ [AI COGNITIVE SEARCH...]
                    </span>
                    <div className="flex gap-2.5 items-start">
                      <div className="w-8 h-8 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/5">
                        <Bot size={15} className="animate-pulse" />
                      </div>
                      <div className="p-3.5 bg-slate-100/90 dark:bg-emerald-950/10 border border-slate-200 dark:border-emerald-500/10 rounded-2xl rounded-tl-none flex items-center gap-2 backdrop-blur-md shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestions row */}
              <div className="px-5 py-3 bg-slate-50/80 dark:bg-white/1 border-t border-slate-200/80 dark:border-white/5 flex gap-2 overflow-x-auto select-none no-scrollbar z-10 relative">
                <button
                  onClick={() => handleBotSubmit("Explain Ohm's Law and solve for I when V=12V, R=100Ω")}
                  className="px-3.5 py-1.8 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-[10px] text-slate-600 dark:text-slate-300 font-mono border border-slate-200 dark:border-white/10 hover:border-emerald-500/40 hover:text-emerald-500 dark:hover:text-emerald-400 whitespace-nowrap cursor-pointer transition-all duration-300 flex items-center gap-1.5 hover:shadow-[0_0_12px_rgba(16,185,129,0.1)] hover:scale-[1.02]"
                >
                  <span className="text-emerald-500 font-bold">$</span>
                  <span>ohms-solver</span>
                </button>
                <button
                  onClick={() => handleBotSubmit("Find the LCR resonant frequency for L=50mH, C=100µF")}
                  className="px-3.5 py-1.8 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-[10px] text-slate-600 dark:text-slate-300 font-mono border border-slate-200 dark:border-white/10 hover:border-emerald-500/40 hover:text-emerald-500 dark:hover:text-emerald-400 whitespace-nowrap cursor-pointer transition-all duration-300 flex items-center gap-1.5 hover:shadow-[0_0_12px_rgba(16,185,129,0.1)] hover:scale-[1.02]"
                >
                  <span className="text-emerald-500 font-bold">$</span>
                  <span>lcr-resonance</span>
                </button>
                <button
                  onClick={() => handleBotSubmit("Solve the Ideal Gas pressure for V=22.4L, T=273K, n=1")}
                  className="px-3.5 py-1.8 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-[10px] text-slate-600 dark:text-slate-300 font-mono border border-slate-200 dark:border-white/10 hover:border-emerald-500/40 hover:text-emerald-500 dark:hover:text-emerald-400 whitespace-nowrap cursor-pointer transition-all duration-300 flex items-center gap-1.5 hover:shadow-[0_0_12px_rgba(16,185,129,0.1)] hover:scale-[1.02]"
                >
                  <span className="text-emerald-500 font-bold">$</span>
                  <span>ideal-gas</span>
                </button>
                <button
                  onClick={() => handleBotSubmit("Explain Photoelectric Effect stopping voltage")}
                  className="px-3.5 py-1.8 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-[10px] text-slate-600 dark:text-slate-300 font-mono border border-slate-200 dark:border-white/10 hover:border-emerald-500/40 hover:text-emerald-500 dark:hover:text-emerald-400 whitespace-nowrap cursor-pointer transition-all duration-300 flex items-center gap-1.5 hover:shadow-[0_0_12px_rgba(16,185,129,0.1)] hover:scale-[1.02]"
                >
                  <span className="text-emerald-500 font-bold">$</span>
                  <span>photoelectric-effect</span>
                </button>
              </div>

              {/* Chat Input */}
              <form
                onSubmit={(e) => { e.preventDefault(); handleBotSubmit(botQuestion); }}
                className="p-4 bg-slate-100/90 dark:bg-black/50 border-t border-slate-200/80 dark:border-white/10 flex gap-3 z-10 relative"
              >
                <div className="flex-1 bg-white dark:bg-black/60 border border-slate-200 dark:border-white/15 rounded-xl flex items-center px-4 focus-within:border-emerald-500 dark:focus-within:border-emerald-500/60 focus-within:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-300">
                  <span className="font-mono text-[10px] text-blue-500 dark:text-blue-400 mr-2 select-none font-bold">operator:~$</span>
                  <input
                    type="text"
                    placeholder="Ask PhysicsBot a physics question..."
                    value={botQuestion}
                    onChange={(e) => setBotQuestion(e.target.value)}
                    disabled={botLoading}
                    className="flex-1 bg-transparent border-none outline-none text-xs py-2.5 dark:text-white dark:placeholder-slate-500 focus:ring-0"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!botQuestion.trim() || botLoading}
                  className="w-11 h-11 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white flex items-center justify-center shrink-0 disabled:opacity-40 transition-all duration-300 cursor-pointer shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/25 hover:scale-[1.04]"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="relative min-h-[300vh] bg-transparent">
      <AntigravityHero />

      {/* Hero Content */}
      <section className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
            <Zap className="w-3 h-3 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span>Next-Gen Simulation Engine</span>
          </div>
          
          <motion.h1 
            style={{ 
              y: yText, 
              scale: scaleText, 
              opacity: opacityText, 
              letterSpacing: trackingText,
              rotateX: rotateXText,
              rotateZ: rotateZText,
              filter: blurText
            }}
            className="text-8xl md:text-9xl font-display font-bold text-cinematic mb-6 leading-none"
          >
            Circuit.IQ
          </motion.h1>
          
          <motion.p 
            style={{ y: useTransform(scrollY, [0, 800], [0, 200]), opacity: opacityText }}
            className="max-w-2xl mx-auto text-2xl text-slate-500 dark:text-slate-400 font-light italic mb-12 leading-relaxed"
          >
            AI-Powered Virtual Physics Laboratory for the <span className="text-blue-600 dark:text-blue-400">Modern Engineer</span>.
          </motion.p>

          <motion.div style={{ opacity: opacityText }} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => setLabOpen(true)}
              className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl flex items-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-slate-900/10 dark:shadow-white/10"
            >
              Start Experimenting
              <Zap size={20} fill="currentColor" />
            </button>
            <button 
              onClick={() => setActiveTab('experiments')}
              className="px-10 py-4 bg-transparent border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Explore Library
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest">Scroll to Build</span>
          <MousePointer2 size={16} className="text-slate-500 dark:text-slate-400" />
        </motion.div>
      </section>

      {/* Assembly Section */}
      <section id="simulation-section" className="relative h-[150vh] flex flex-col items-center justify-center pointer-events-none">
         {/* The breadboard animation happens over this scroll distance */}
      </section>

      {/* Physics Showcase Section */}
      <section id="showcase-section" className="relative py-28 w-full max-w-7xl mx-auto px-6">
        <PhysicsShowcase />
      </section>

      {/* Cyberpunk LED Matrix Showcase Component */}
      <section className="relative py-20 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <CyberpunkLedMatrix />
        </div>
      </section>

      {/* Team Roles / Founders Showcase */}
      <TeamRolesSection />

      {/* Lab CTA */}
      <section className="py-24 flex flex-col items-center justify-center text-center">
          <h2 className="text-5xl md:text-6xl font-display font-medium tracking-tight mb-8 text-slate-900 dark:text-white">Ready to Experiment?</h2>
          <button 
            onClick={() => setLabOpen(true)}
            className="px-10 py-4.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-base hover:scale-105 transition-all shadow-xl shadow-slate-900/10 dark:shadow-white/10"
          >
            Enter Virtual Laboratory
          </button>
      </section>

      {/* High-Fidelity Circuit.IQ Styled Footer */}
      <footer className="w-full bg-white dark:bg-space-black px-8 md:px-16 pt-24 pb-12 border-t border-slate-100 dark:border-white/5 relative z-10 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-20 md:mb-28">
          {/* Left Column heading */}
          <div className="text-left">
            <h3 className="text-4xl md:text-5xl font-display font-normal tracking-tight text-slate-900 dark:text-white leading-tight">
              Ignite high-fidelity physics
            </h3>
          </div>

          {/* Right Columns of links */}
          <div className="flex gap-16 md:gap-28 text-left pr-4 md:pr-12">
            {/* Column A */}
            <div className="flex flex-col gap-3.5">
              <a href="#experiments" className="text-[13px] md:text-[14px] text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors duration-200">Simulation Engine</a>
              <a href="#virtual-lab" className="text-[13px] md:text-[14px] text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors duration-200">Interactive Labs</a>
              <a href="#formulas" className="text-[13px] md:text-[14px] text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors duration-200">Formulas & Equations</a>
              <a href="#changelog" className="text-[13px] md:text-[14px] text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors duration-200">Changelog</a>
              <a href="#sandbox" className="text-[13px] md:text-[14px] text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors duration-200">Virtual Sandbox</a>
              <a href="#releases" className="text-[13px] md:text-[14px] text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors duration-200">Research Releases</a>
            </div>

            {/* Column B */}
            <div className="flex flex-col gap-3.5">
              <a href="#blog" className="text-[13px] md:text-[14px] text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors duration-200">Academic Blog</a>
              <a href="#pricing" className="text-[13px] md:text-[14px] text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors duration-200">Lab Partners</a>
              <a href="#usecases" className="text-[13px] md:text-[14px] text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors duration-200">Physics Systems</a>
            </div>
          </div>
        </div>

        {/* Massive overlapping text design exactly like reference image */}
        <div className="w-full overflow-hidden text-center mb-16 select-none pointer-events-none">
          <motion.h2 
            initial={{ y: "40%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12.8vw] font-bold tracking-tighter text-slate-950 dark:text-white leading-none font-display inline-block"
            style={{ 
              letterSpacing: "-0.04em",
              fontStretch: "condensed"
            }}
          >
            Circuit.IQ
          </motion.h2>
        </div>

        {/* Lower branding bar */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-sans">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900 dark:text-white text-[15px] tracking-tight font-display">Circuit.IQ Live Lab</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2.5 text-[12px] text-slate-600 dark:text-slate-400">
            <a href="#about" className="hover:text-slate-950 dark:hover:text-white transition-colors duration-200">About Circuit.IQ</a>
            <a href="#products" className="hover:text-slate-950 dark:hover:text-white transition-colors duration-200">Virtual Labs</a>
            <a href="#privacy" className="hover:text-slate-950 dark:hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-950 dark:hover:text-white transition-colors duration-200">Terms of Use</a>
          </div>
        </div>
      </footer>

      <style>{`
        .text-gradient {
          background: linear-gradient(to right, #3b82f6, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">{title}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
      </div>
    </div>
  );
}

function CategoryCard({ title, icon, items }: { title: string, icon: React.ReactNode, items: string[] }) {
  return (
    <div className="glass-panel p-8 group hover:border-blue-500/30 transition-colors cursor-pointer bg-white/80 dark:bg-black/40">
      <div className="text-blue-600 dark:text-blue-400 mb-6 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-xl font-display font-bold mb-4 text-slate-900 dark:text-white">{title}</h3>
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item} className="text-slate-600 dark:text-slate-400 text-sm flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-blue-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}


