import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Sparkles, 
  User, 
  Code, 
  Cpu, 
  Activity, 
  FileText, 
  X, 
  Terminal, 
  Sliders, 
  Volume2, 
  Tv, 
  Flame, 
  RefreshCw 
} from 'lucide-react';

interface TeamMember {
  id: number;
  role: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgGradient: string;
  visualEffect: React.ReactNode;
  specs: string[];
}

export default function TeamRolesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Balanced lateral parallax offset corresponding to page scroll speed
  const xTranslation = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const team: TeamMember[] = [
    {
      id: 1,
      role: "AI Integration + Project Lead",
      title: "Core AI Architect & Project Lead",
      description: "Directing semantic reasoning models, integrating agent scaffolding libraries, and keeping the lab's vision perfectly on track.",
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      bgGradient: "from-purple-600/20 via-slate-950 to-indigo-950/20",
      visualEffect: <QuantumParticlesWave color="#8b5cf6" />,
      specs: ["Neural Agents", "Dynamic Scaffolding", "Model Grounding"]
    },
    {
      id: 2,
      role: "Physics Simulation Engineer",
      title: "Scientific Simulation Specialist",
      description: "Formulating physical constraints, ensuring rigid mathematical fidelity of Ohm's Law and KCL/KVL formulas dynamically.",
      icon: <Activity className="w-5 h-5 text-blue-400" />,
      bgGradient: "from-blue-600/20 via-slate-950 to-cyan-950/20",
      visualEffect: <MathWaves color="#3b82f6" />,
      specs: ["Rigid Solvers", "Continuous ODEs", "Topology Engines"]
    },
    {
      id: 3,
      role: "Frontend Developer",
      title: "User Experience Engineer",
      description: "Pistol-crafting buttery transitions, fine typography pairings, and responsive state synchronization across all systems.",
      icon: <Code className="w-5 h-5 text-emerald-400" />,
      bgGradient: "from-emerald-600/20 via-slate-950 to-teal-950/20",
      visualEffect: <UIBentoGrid color="#10b981" />,
      specs: ["Framer Motion", "Responsive Canvas", "Subtle Easing"]
    },
    {
      id: 4,
      role: "Backend Developer",
      title: "Distributed Systems Engineer",
      description: "Sustaining concurrent real-time nodes, handling authentication caches, and ensuring database queries are blazing fast.",
      icon: <User className="w-5 h-5 text-amber-400" />,
      bgGradient: "from-amber-600/20 via-slate-950 to-orange-950/20",
      visualEffect: <DatabaseCylinder color="#f59e0b" />,
      specs: ["Fast Caching", "Concurrent Nodes", "Socket Relays"]
    },
    {
      id: 5,
      role: "Content + QA + Documentation",
      title: "Technical Writer & Product QA",
      description: "Crafting comprehensive textbook-grade lab experiments, validating system states, and documenting every formula precisely.",
      icon: <FileText className="w-5 h-5 text-rose-400" />,
      bgGradient: "from-rose-600/20 via-slate-950 to-pink-950/20",
      visualEffect: <TextRain color="#f43f5e" />,
      specs: ["Lab Textbooks", "Formula Verifier", "Trace Diagnostics"]
    }
  ];

  // Track currently selected simulation mode
  const [activeSimId, setActiveSimId] = useState<number | null>(null);

  return (
    <section ref={containerRef} className="relative py-28 w-full overflow-hidden bg-transparent select-none">
      {/* Upper context grid header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400 text-[10px] font-mono font-bold tracking-widest uppercase mb-5">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>THE FIVE CORE FOUNDERS</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Built by engineers for the modern era
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="text-slate-500 dark:text-slate-400 max-w-md text-sm md:text-base font-light leading-relaxed"
          >
            Meet the five dedicated craftspeople behind Circuit.IQ. Our mission is to democratize high-fidelity physics models for students and enthusiasts globally.
          </motion.p>
        </div>
      </div>

      {/* Slide track - Increased outer spacing to satisfy containment and remove scrolling gaps */}
      <div className="w-full relative overflow-x-auto no-scrollbar py-6">
        <motion.div 
          style={{ x: xTranslation }}
          className="flex gap-10 px-8 lg:px-24 w-max min-w-full"
        >
          {team.map((member, index) => (
            <TeamMemberCard 
              key={member.id} 
              member={member} 
              index={index} 
              isSelected={activeSimId === member.id}
              onClickPlay={() => setActiveSimId(activeSimId === member.id ? null : member.id)}
              onClose={() => setActiveSimId(null)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Custom Team Member Card with gravity platform floating animations & sci-fi terminal states
interface CardProps {
  member: TeamMember;
  index: number;
  isSelected: boolean;
  onClickPlay: () => void;
  onClose: () => void;
}

function TeamMemberCard({ member, index, isSelected, onClickPlay, onClose }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Responsive mouse coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth mouse tilt spring configurations
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 140, damping: 24 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 140, damping: 24 });

  // Laser target pointer spotlight coordinates
  const [spotlight, setSpotlight] = useState({ posX: 0, posY: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isSelected) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);

    setSpotlight({
      posX: e.clientX - rect.left,
      posY: e.clientY - rect.top,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
    setHovered(false);
  };

  const getGlowColor = () => {
    if (member.id === 1) return 'rgba(168, 85, 247, 0.16)';  // Purple
    if (member.id === 2) return 'rgba(59, 130, 246, 0.16)';   // Blue
    if (member.id === 3) return 'rgba(16, 185, 129, 0.16)';  // Emerald
    if (member.id === 4) return 'rgba(245, 158, 11, 0.16)';   // Amber
    return 'rgba(244, 63, 94, 0.16)';                       // Rose
  };

  const getGlowBorderColor = () => {
    if (member.id === 1) return 'group-hover:border-purple-500/30';
    if (member.id === 2) return 'group-hover:border-blue-500/30';
    if (member.id === 3) return 'group-hover:border-emerald-500/30';
    if (member.id === 4) return 'group-hover:border-amber-500/30';
    return 'group-hover:border-rose-500/30';
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      // Staggered quantum gravity float representation (cards bob up and down asynchronously to look beautiful)
      animate={isSelected ? { y: 0, scale: 1.01 } : {
        y: [0, -8, 0],
      }}
      transition={isSelected ? { duration: 0.3 } : {
        y: {
          repeat: Infinity,
          duration: 5.5 + index * 0.7,
          ease: "easeInOut"
        },
        default: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
      }}
      style={{ 
        rotateX: isSelected ? 0 : rotateX, 
        rotateY: isSelected ? 0 : rotateY, 
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      // scaled size to satisfy user request ("make boxes smaller to prevent overlap")
      className={`w-[305px] md:w-[340px] aspect-[11/14] rounded-[28px] bg-slate-950 border border-slate-900 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.92)] transition-all duration-500 relative overflow-hidden flex flex-col justify-between group cursor-pointer p-7 select-none ${getGlowBorderColor()} ${isSelected ? 'ring-2 ring-blue-500/30 border-blue-500/20' : ''}`}
    >
      {/* Background radial tracking spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-[28px] z-10"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(350px circle at ${spotlight.posX}px ${spotlight.posY}px, ${getGlowColor()}, transparent 100%)`
        }}
      />

      {/* Colored corner ambient bleed */}
      <div className={`absolute inset-0 bg-gradient-to-br ${member.bgGradient} opacity-25 z-0 transition-opacity duration-500 group-hover:opacity-40`} />
      
      {/* Dynamic role wave overlay (disabled during interactive video emulation for readable screens) */}
      {!isSelected && (
        <div className="absolute inset-0 z-15 overflow-hidden opacity-30 group-hover:opacity-75 transition-all duration-700 pointer-events-none">
          {member.visualEffect}
        </div>
      )}

      {/* Tech alignment grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.06] group-hover:opacity-[0.12] pointer-events-none z-10 transition-opacity duration-500" style={{
        backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)",
        backgroundSize: "28px 28px"
      }} />

      {/* GLASSMORPHIC ACTION BAR LAYOUT */}
      <AnimatePresence mode="wait">
        {isSelected ? (
          /* SCI-FI EXPERIMENTAL TELEMETRY SIMULATOR VIEW (When clicked) */
          <motion.div 
            key="sandbox-player"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 z-30 bg-slate-950 p-6 flex flex-col justify-between"
          >
            {/* Simulation Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">MEDIA NODE EMULATOR v2.4</span>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-7 h-7 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Simulation Content area */}
            <div className="flex-1 my-4 flex flex-col gap-3">
              {/* Virtual Video Screen representing simulated workflow */}
              <div className="flex-1 bg-slate-900/80 rounded-2xl border border-slate-800 p-4 relative overflow-hidden flex flex-col justify-between group/sim">
                {/* Oscilloscope grids */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                  backgroundImage: "linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)",
                  backgroundSize: "16px 16px"
                }} />

                {/* Micro waveform stream */}
                <div className="flex-1 flex items-center justify-center relative">
                  <SimulatedWaveform index={index} />
                </div>

                {/* Live logger */}
                <div className="h-16 font-mono text-[8px] text-slate-500 flex flex-col justify-end overflow-hidden leading-relaxed uppercase select-none text-left">
                  <div className="text-slate-400 flex items-center gap-1.5"><Terminal className="w-3 h-3 text-purple-400 animate-pulse" /> &gt; GRID PIPELINE ONLINE</div>
                  <div>&gt; SYNC RATIO: 1.00000 - DELAY 0ms</div>
                  <div className="text-emerald-500 animate-pulse">&gt; EXPERIMENTAL AUDIO-FREQUENCY: ACQUISITION STABLE</div>
                </div>
              </div>

              {/* Console parameter readouts */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-2 flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-[7.5px] font-mono font-bold text-slate-500 uppercase">VOLTAGE GAIN</div>
                    <div className="text-xs font-mono font-bold text-slate-200 mt-0.5">{(1.5 + index * 0.45).toFixed(2)} dB</div>
                  </div>
                  <Sliders className="w-3.5 h-3.5 text-slate-600" />
                </div>
                <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-2 flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-[7.5px] font-mono font-bold text-slate-500 uppercase">SYNAPSE RATE</div>
                    <div className="text-xs font-mono font-bold text-slate-200 mt-0.5">{140 + index * 25} Hz</div>
                  </div>
                  <Volume2 className="w-3.5 h-3.5 text-slate-600" />
                </div>
              </div>
            </div>

            {/* Simulated interactive controller player controls */}
            <div className="flex items-center justify-between bg-slate-900/40 border border-slate-800/60 p-2.5 rounded-2xl">
              <span className="text-[9px] font-mono text-slate-400 font-bold tracking-tight">VIDEO PROTOTYPE CONSOLE</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="px-4 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] font-mono font-black text-blue-400 uppercase tracking-wider hover:text-white transition-colors cursor-pointer"
              >
                UNMOUNT VIEW
              </button>
            </div>
          </motion.div>
        ) : (
          /* DEFAULT CARD LANDING VIEW */
          <motion.div 
            key="static-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full flex flex-col justify-between"
          >
            {/* Play trigger overlay designed specifically for smooth mouse captures */}
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-slate-950/65 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[3px] rounded-[28px]">
              <div className="flex flex-col items-center gap-3">
                <motion.div 
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickPlay();
                  }}
                  animate={hovered ? { scale: [1, 1.1, 1], rotate: [0, 4, -4, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-xl shadow-black/80 ring-2 ring-white/5 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                >
                  <Play className="w-5 h-5 text-white fill-white translate-x-[1.5px]" />
                </motion.div>
                <motion.span 
                  initial={{ opacity: 0, y: 8 }}
                  animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="text-[9px] font-mono font-bold tracking-widest text-white px-2.5 py-0.5 bg-white/5 rounded-full border border-white/10 shadow-md"
                >
                  PLAY PROTOTYPE DEMO
                </motion.span>
              </div>
            </div>

            {/* Header layout containing Roles */}
            <div className="relative z-20 flex justify-between items-start transition-transform duration-350" style={{ transform: hovered ? "translateZ(25px)" : "translateZ(10px)" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-center shadow-md group-hover:border-slate-500/20 transition-colors duration-300">
                  {member.icon}
                </div>
                <div className="text-left">
                  <span className="text-[8.5px] font-mono font-bold uppercase text-slate-500 tracking-wider">TEAM FOUNDER</span>
                  <div className="text-[11px] font-mono font-bold text-slate-300 tracking-wide mt-0.5 group-hover:text-white transition-all">{member.role}</div>
                </div>
              </div>
            </div>

            {/* Bottom Panel containing titles, specs and detailed descriptions */}
            <div className="relative z-20 space-y-3 transition-transform duration-350" style={{ transform: hovered ? "translateZ(35px)" : "translateZ(10px)" }}>
              {/* Specialized tag stack */}
              <div className="flex flex-wrap gap-1">
                {member.specs.map((spec, i) => (
                  <span key={i} className="text-[7.5px] font-mono bg-white/5 text-slate-500 px-2 py-0.5 rounded-full border border-white/5">
                    {spec}
                  </span>
                ))}
              </div>

              <h3 className="text-lg md:text-xl font-bold font-display text-white tracking-tight group-hover:text-amber-400 transition-colors duration-200 text-left leading-tight">
                {member.title}
              </h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light group-hover:text-slate-200 transition-colors duration-300 text-left">
                {member.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// -----------------------------------------------------------------------------------------------------------
// Simulated Live Waveform Oscilloscope inside the emulator card
// -----------------------------------------------------------------------------------------------------------
function SimulatedWaveform({ index }: { index: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.lineWidth = 2;
      
      // Dynamic oscilloscope color matching corresponding roles
      if (index === 1) ctx.strokeStyle = '#a855f7'; // Purple waveform
      else if (index === 2) ctx.strokeStyle = '#3b82f6'; // Blue waveform
      else if (index === 3) ctx.strokeStyle = '#10b981'; // Emerald waveform
      else if (index === 4) ctx.strokeStyle = '#f59e0b'; // Amber waveform
      else ctx.strokeStyle = '#f43f5e'; // Rose waveform

      const amp = 20 + Math.sin(phase * 2) * 8; // dynamic bouncing amplitude
      const freq = 0.05 + index * 0.01;

      for (let x = 0; x < canvas.width; x++) {
        // High fidelity compound sine equations representing scientific resonance curves
        const y = canvas.height / 2 + 
                  Math.sin(x * freq + phase) * amp + 
                  Math.cos(x * 0.1 - phase * 1.5) * (amp * 0.3);
        
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();
      phase += 0.08;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [index]);

  return <canvas ref={canvasRef} width={300} height={100} className="w-full h-24" />;
}

// -----------------------------------------------------------------------------------------------------------
// 5 futuristic code-like dynamic canvas visualizers
// -----------------------------------------------------------------------------------------------------------

function QuantumParticlesWave({ color }: { color: string }) {
  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0 bg-transparent flex items-center justify-center">
        <div className="w-2/3 h-2/3 border border-purple-500/10 rounded-full animate-ping opacity-25" />
        <div className="w-1/2 h-1/2 border border-violet-500/10 rounded-full animate-[spin_10s_linear_infinite] opacity-30" />
      </div>
      <svg className="w-full h-full">
        <path d="M 0,120 Q 120,30 240,120 T 480,120" fill="none" stroke={`${color}15`} strokeWidth="3" className="animate-pulse" />
        <path d="M 0,150 Q 170,250 340,150 T 480,150" fill="none" stroke={`${color}10`} strokeWidth="2" />
      </svg>
    </div>
  );
}

function MathWaves({ color }: { color: string }) {
  return (
    <div className="w-full h-full relative">
      <svg className="w-full h-full">
        <g stroke={`${color}15`} strokeWidth="1.5" fill="none">
          <path d="M0 160 C 100 220, 180 60, 480 160" />
          <path d="M0 180 C 140 140, 200 220, 480 140" />
          <path d="M0 130 C 70 80, 250 200, 480 180" />
        </g>
      </svg>
    </div>
  );
}

function UIBentoGrid({ color }: { color: string }) {
  return (
    <div className="w-full h-full p-6 flex flex-col justify-between opacity-20 group-hover:opacity-40 transition-opacity duration-300">
      <div className="flex gap-2">
        <div className="w-1/3 aspect-video rounded-md bg-white/5 border border-white/5" />
        <div className="w-2/3 aspect-video rounded-md bg-white/5 border border-white/5 animate-pulse" />
      </div>
      <div className="w-full h-1/3 rounded-md bg-white/5 border border-white/5 mt-auto" />
    </div>
  );
}

function DatabaseCylinder({ color }: { color: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      <div className="w-16 h-8 rounded-full border border-amber-500/10 bg-amber-500/5 animate-pulse" />
      <div className="w-16 h-8 rounded-full border border-amber-500/15 bg-amber-500/5 scale-105" />
      <div className="w-16 h-8 rounded-full border border-amber-500/10 bg-amber-500/5" />
    </div>
  );
}

function TextRain({ color }: { color: string }) {
  return (
    <div className="w-full h-full font-mono text-[7px] text-slate-500/20 p-4 leading-normal select-none overflow-hidden text-left">
      <div>import {`{ motion }`} from 'motion/react';</div>
      <div>const LayoutCycle = () =&gt; {`{`}</div>
      <div className="pl-2">const [decay, setDecay] = useState(0.4);</div>
      <div className="pl-2">useEffect(() =&gt; {`{`}</div>
      <div className="pl-4">const sim = createPhysicsSimulation();</div>
      <div className="pl-4">sim.addNode(OhmLawCircuit);</div>
      <div className="pl-4 text-rose-500/30">console.log("diagnose cycle completed");</div>
      <div className="pl-2">{`}, [])`}</div>
      <div>{`}`}</div>
      <div className="mt-4">export default LayoutCycle;</div>
    </div>
  );
}
