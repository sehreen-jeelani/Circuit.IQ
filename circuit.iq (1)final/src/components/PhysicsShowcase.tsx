import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { 
  Zap, 
  Cpu, 
  Play, 
  RotateCw, 
  Gauge,
  Layers,
  Sparkles,
  CircuitBoard,
  SquareEqual,
  ArrowRight,
  RefreshCw,
  Sliders,
  TrendingUp,
  LineChart
} from 'lucide-react';
import InteractiveBreadboard from './InteractiveBreadboard';

export default function PhysicsShowcase() {
  return (
    <div className="w-full space-y-36">
      {/* Row 1: Ohm's Law */}
      {/* Text LEFT, Box RIGHT */}
      <ShowcaseRow 
        index={0}
        badge="Domain 01"
        badgeColor="border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400"
        title="Ohm's Law Interaction"
        description="Verify the absolute cornerstone of electrodynamics ($I = V/R$). Fine-tune the voltage source and channel resistance in real-time to watch the calculated current flow rate dynamically scale and animate instantly."
        bullets={[
          { title: "Direct Proportionality", desc: "Increasing the voltage source (V) pushes electrons harder, elevating active loop current proportionally." },
          { title: "Impedance Restrictor", desc: "Expanding the resistance (R) physically constricts the pipeline, safely throttling active current rates." },
          { title: "Real-time Ratio Tracking", desc: "Interact with the virtual multimeters to observe how ratio balances sustain stable energy lines." }
        ]}
        interactiveElement={<OhmsLawInteractive />}
        reverse={false}
      />

      {/* Row 2: Series & Parallel */}
      {/* Box LEFT, Text RIGHT */}
      <ShowcaseRow 
        index={1}
        badge="Domain 02"
        badgeColor="border-amber-500/30 bg-amber-500/5 text-amber-600 dark:text-amber-400"
        title="Series & Parallel Circuits"
        description="Configure modern circuit layouts. Alter connection paths to sequence components in a single line (Series), or split electricity down branching paths (Parallel) to modify voltage drops and equivalent loads."
        bullets={[
          { title: "Series: Voltage Division", desc: "A single continuous path forces uniform current, while voltage drops cumulatively across each resistor." },
          { title: "Parallel: Branch Splitting", desc: "Multiple independent loops maintain identical branch voltages, while splitting incoming current paths." },
          { title: "Interactive Load Summing", desc: "Compare Series summing ($R_{eq} = R_1 + R_2$) with Parallel reciprocal compounding ($1/R_{eq} = 1/R_1 + 1/R_2$)." }
        ]}
        interactiveElement={<SeriesParallelInteractive />}
        reverse={true}
      />

      {/* Row 3: KVL, KCL, RC */}
      {/* Text LEFT, Box RIGHT */}
      <ShowcaseRow 
        index={2}
        badge="Domain 03"
        badgeColor="border-purple-500/30 bg-purple-500/5 text-purple-600 dark:text-purple-400"
        title="KVL, KCL & RC Transient response"
        description="Master energy and charge conservation principles. Observe Kirchhoff's Voltage Loop Law, nodal conservation of current, and cap charging rates during active resistor-capacitor (RC) decay cycles."
        bullets={[
          { title: "Kirchhoff's Loop Law (KVL)", desc: "Assert that the directed sum of electric potential differences around any closed path must equal zero." },
          { title: "Kirchhoff's Nodal Law (KCL)", desc: "Enforce current preservation, asserting total current entering a junction perfectly balances exiting current." },
          { title: "Capacitive RC Time Decay", desc: "Trigger transient charges to map standard exponential curves ($V(t) = V_0(1 - e^{-t/RC})$) in real time." }
        ]}
        interactiveElement={<KvlKclRcInteractive />}
        reverse={false}
      />

      {/* Row 4: Live Interactive Breadboard Workspace */}
      <div className="pt-12">
        <InteractiveBreadboard />
      </div>
    </div>
  );
}

// Custom Row Wrapper with stagger, matching the beautiful sliding animation style of Google Antigravity
interface ShowcaseRowProps {
  index: number;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  bullets: Array<{ title: string; desc: string }>;
  interactiveElement: React.ReactNode;
  reverse?: boolean;
}

function ShowcaseRow({ 
  index, 
  badge, 
  badgeColor, 
  title, 
  description, 
  bullets, 
  interactiveElement, 
  reverse = false 
}: ShowcaseRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Custom interactive 3D card tilt based on framer-motion spring physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // High-performance springy interpolation values
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 25 });

  // Real-time hover state & coordinate tracking for the absolute pointer halo shine spotlight
  const [spotlight, setSpotlight] = useState({ posX: 0, posY: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    
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
  };

  // Define dynamic spotlight halo glow colors depending on physics domain index
  const getSpotlightColor = () => {
    if (index === 0) return 'rgba(59, 130, 246, 0.12)';  // Blue Glow
    if (index === 1) return 'rgba(245, 158, 11, 0.12)';  // Amber Glow
    return 'rgba(168, 85, 247, 0.12)';                  // Purple Glow
  };

  return (
    <div ref={containerRef} className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center justify-between gap-16 lg:gap-24 w-full`}>
      {/* Text Panel */}
      <motion.div 
        initial={{ opacity: 0, x: reverse ? 100 : -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-full lg:w-1/2 flex flex-col justify-center"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${badgeColor} text-[10px] font-mono font-bold tracking-widest uppercase mb-6 w-fit`}
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>{badge}</span>
        </motion.div>

        <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
          {title}
        </h3>

        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8 font-light">
          {description}
        </p>

        <div className="space-y-6">
          {bullets.map((b, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: reverse ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i + 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-4 group cursor-pointer"
              whileHover={{ x: 8 }}
            >
              <div className="mt-1.5 flex-none w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-blue-400 group-hover:scale-130 transition-all duration-300 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-200">
                  {b.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Interactive 3D Prototype Box with crazy perspective hover tilt */}
      <motion.div 
        initial={{ opacity: 0, x: reverse ? -100 : 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{ perspective: "1500px" }}
        className="w-full lg:w-1/2"
      >
        <motion.div 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ 
            rotateX: rotateX, 
            rotateY: rotateY,
            transformStyle: "preserve-3d"
          }}
          className="w-full aspect-[4/3] rounded-3xl bg-white dark:bg-slate-950/45 border border-slate-200/60 dark:border-white/10 shadow-xl hover:shadow-2xl hover:border-blue-500/25 dark:hover:border-blue-500/15 transition-all duration-300 relative overflow-hidden group/box p-6 flex flex-col justify-between"
        >
          {/* Dynamic chasing micro neon pointer spotlight */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-3xl"
            style={{
              opacity: spotlight.opacity,
              background: `radial-gradient(400px circle at ${spotlight.posX}px ${spotlight.posY}px, ${getSpotlightColor()}, transparent 100%)`
            }}
          />

          {/* Sparkly grid line background glow */}
          <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
            backgroundImage: "linear-gradient(to right, rgba(148, 163, 184, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.3) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }} />

          {/* Internal ambient corner backglow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-amber-500/5 opacity-50 group-hover/box:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="w-full h-full flex flex-col justify-between relative" style={{ transform: "translateZ(50px)" }}>
            {interactiveElement}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// -----------------------------------------------------------------------------------------------------------
// 1. Ohm's Law Interactive Widget
// -----------------------------------------------------------------------------------------------------------
function OhmsLawInteractive() {
  const [voltage, setVoltage] = useState(6); // scale from 1V to 12V
  const [resistance, setResistance] = useState(240); // 50 to 500 ohms
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Calculate Current: I = V / R (represented in milliamperes)
  const currentMa = (voltage / resistance) * 1000;

  const stateRef = useRef({ voltage, resistance, currentMa });

  // Keep stateRef in sync with React state
  useEffect(() => {
    stateRef.current = { voltage, resistance, currentMa };
  }, [voltage, resistance, currentMa]);

  // React-driven high-precision Canvas-based wire particle simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = canvas.offsetWidth || 400;
    let height = canvas.offsetHeight || 300;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const dpr = window.devicePixelRatio || 1;
        width = entry.contentRect.width;
        height = entry.contentRect.height;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.resetTransform();
        ctx.scale(dpr, dpr);
      }
    });
    resizeObserver.observe(canvas);

    // Track state: initialize stable particles once
    const maxParticlesCount = 50;
    const particles = Array.from({ length: maxParticlesCount }, (_, i) => ({
      progress: i / maxParticlesCount
    }));

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const { voltage: currentV, currentMa: currentI } = stateRef.current;

      // Wire track geometries corresponding exactly to SVG track bounds
      const rx = width * 0.15;
      const ry = height * 0.20;
      const rw = width * 0.70;
      const rh = height * 0.50;
      const radius = 16;

      if (rw <= 0 || rh <= 0) {
        animId = requestAnimationFrame(animate);
        return;
      }

      const r = Math.min(radius, rw / 2, rh / 2);
      const lLineX = rw - 2 * r;
      const lLineY = rh - 2 * r;
      const lArc = (Math.PI * r) / 2;

      // Linear segment lengths
      const s1 = lLineX;
      const s2 = s1 + lArc;
      const s3 = s2 + lLineY;
      const s4 = s3 + lArc;
      const s5 = s4 + lLineX;
      const s6 = s5 + lArc;
      const s7 = s6 + lLineY;
      const s8 = s7 + lArc; // complete track perimeter

      const perimeter = s8;

      // Map progress circular layout parameter [0, 1] to specific coordinates
      const getPointAlongTrack = (progress: number) => {
        const d = (progress % 1) * perimeter;
        if (d <= s1) {
          const t = d / s1;
          return { x: rx + r + t * lLineX, y: ry };
        } else if (d <= s2) {
          const t = (d - s1) / lArc;
          const theta = -Math.PI / 2 + t * (Math.PI / 2);
          return { x: rx + rw - r + r * Math.cos(theta), y: ry + r + r * Math.sin(theta) };
        } else if (d <= s3) {
          const t = (d - s2) / lLineY;
          return { x: rx + rw, y: ry + r + t * lLineY };
        } else if (d <= s4) {
          const t = (d - s3) / lArc;
          const theta = t * (Math.PI / 2);
          return { x: rx + rw - r + r * Math.cos(theta), y: ry + rh - r + r * Math.sin(theta) };
        } else if (d <= s5) {
          const t = (d - s4) / lLineX;
          return { x: rx + rw - r - t * lLineX, y: ry + rh };
        } else if (d <= s6) {
          const t = (d - s5) / lArc;
          const theta = Math.PI / 2 + t * (Math.PI / 2);
          return { x: rx + r + r * Math.cos(theta), y: ry + rh - r + r * Math.sin(theta) };
        } else if (d <= s7) {
          const t = (d - s6) / lLineY;
          return { x: rx, y: ry + rh - r - t * lLineY };
        } else {
          const t = (d - s7) / lArc;
          const theta = Math.PI + t * (Math.PI / 2);
          return { x: rx + r + r * Math.cos(theta), y: ry + r + r * Math.sin(theta) };
        }
      };

      // Flow speed scales dynamically: V / R (proportional current)
      // High potential (V) pushes faster. Low resistance facilitates faster flow.
      const velocity = Math.max(0.001, (currentI / 240) * 0.016 + 0.001);

      // Move particle array clockwise (current conventional flow)
      particles.forEach((p) => {
        p.progress = (p.progress + velocity) % 1;
      });

      // Particle density represents resistance throttling
      const particlesToDraw = Math.round(5 + (currentI / 240) * 35);

      // Draw active particles
      for (let i = 0; i < particlesToDraw; i++) {
        const index = Math.floor((i * maxParticlesCount) / particlesToDraw);
        const p = particles[index];
        if (!p) continue;

        const pos = getPointAlongTrack(p.progress);

        // Size represents voltage intensity level
        let particleRadius = 1.3 + (currentV / 12) * 2.5;
        let glowSize = 4 + (currentV / 12) * 14;

        // Colors change based on intensity: cooling low voltage is pale cyan, shifting to bright yellow/electric blue for higher current loops
        let glowColor = '#60a5fa'; // Cool blue
        if (currentV > 9) {
          glowColor = '#22c55e'; // Blazing energetic electric green
        } else if (currentV > 5) {
          glowColor = '#f59e0b'; // Dynamic golden-yellow flux
        } else if (currentV < 3) {
          glowColor = '#06b6d4'; // Very light icy cyan
        }

        // Apply drop shadow glow on canvas
        ctx.shadowBlur = glowSize;
        ctx.shadowColor = glowColor;
        ctx.fillStyle = glowColor;

        // Draw flowing node
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, particleRadius, 0, Math.PI * 2);
        ctx.fill();

        // White core multiplier for hot high voltages
        if (currentV > 7) {
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, particleRadius * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Reset shadows
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full pointer-events-auto select-none">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-200/50 dark:border-white/5 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-blue-500 animate-pulse" />
          <span className="text-[11px] font-mono tracking-wider uppercase text-slate-700 dark:text-slate-300 font-bold">Ohmic Electron Pipeline</span>
        </div>
        <div className="text-[10px] font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-bold">
          LIVE METRICS
        </div>
      </div>

      {/* Schematic Layout */}
      <div className="flex-1 relative flex items-center justify-center p-2">
        <svg className="absolute inset-0 w-full h-full" style={{ filter: "drop-shadow(0 0 6px rgba(59, 130, 246, 0.15))" }}>
          {/* Connection loop */}
          <rect 
            x="15%" 
            y="20%" 
            width="70%" 
            height="50%" 
            fill="none" 
            stroke="rgba(148, 163, 184, 0.15)" 
            strokeWidth="3" 
            rx="16" 
          />
        </svg>

        {/* Real-time Custom Flowing Electron Grid Layer */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full pointer-events-none z-0" 
        />

        {/* Components Overlay */}
        
        {/* DC Source Node */}
        <div className="absolute left-[15%] -translate-x-1/2 flex flex-col items-center">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: Math.max(1, 3 - voltage/4) }}
            className="w-11 h-11 rounded-full bg-slate-900 border-2 border-blue-500 flex flex-col items-center justify-center text-white text-[10px] font-bold shadow-lg"
          >
            <span className="text-blue-400 font-bold text-xs">{voltage}V</span>
          </motion.div>
          <span className="text-[8px] font-mono text-slate-500 mt-2 font-bold uppercase tracking-wide">Battery</span>
        </div>

        {/* Load / Resistor (Impedance Barrier) */}
        <div className="absolute right-[15%] translate-x-1/2 flex flex-col items-center">
          <div 
            className="w-10 h-14 rounded-lg bg-orange-600/10 dark:bg-orange-600/20 border-2 border-orange-500/80 flex flex-col items-center justify-around py-1 shadow-md relative"
            style={{ 
              opacity: 0.4 + (resistance / 500) * 0.6 
            }}
          >
            {/* Horizontal resistor bands */}
            <div className="w-full h-1.5 bg-yellow-500" />
            <div className="w-full h-1.5 bg-red-500" />
            <div className="w-full h-1.5 bg-black" />
          </div>
          <span className="text-[9px] font-mono text-orange-500 mt-2 font-bold uppercase tracking-wide">{resistance} Ω</span>
        </div>

        {/* Middle Board: Multimeter HUD showing formula live calculation */}
        <div className="absolute top-[28%] bottom-[28%] left-[28%] right-[28%] bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/60 dark:border-white/10 flex flex-col justify-between p-3.5 shadow-lg select-none z-10 text-center">
          <div>
            <div className="text-[8px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest font-black">OHM'S LAW EQUATION</div>
            <div className="text-sm font-mono font-bold mt-1 text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5">
              <span>I = V / R</span>
            </div>
          </div>

          <div className="my-1.5 font-mono text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight drop-shadow-[0_2px_12px_rgba(59,130,246,0.15)]">
            {currentMa.toFixed(1)} <span className="text-xs font-bold text-slate-500">mA</span>
          </div>

          <div className="text-[9px] font-mono bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30 text-blue-700 dark:text-blue-300 py-1 rounded-md font-bold">
            ELECTRON FLUX: {Math.round(currentMa * 12340).toLocaleString()}/s
          </div>
        </div>
      </div>

      {/* Controllers footer block */}
      <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/50 dark:border-white/5 mt-3">
        {/* Voltage custom slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[9px] font-mono">
            <span className="text-slate-500 font-bold uppercase">VOLTAGE (V)</span>
            <span className="text-blue-500 font-extrabold">{voltage} Volts</span>
          </div>
          <input 
            type="range"
            min="1"
            max="12"
            value={voltage}
            onChange={(e) => setVoltage(Number(e.target.value))}
            className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Resistance custom slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[9px] font-mono">
            <span className="text-slate-500 font-bold uppercase">RESISTANCE (R)</span>
            <span className="text-orange-500 font-extrabold">{resistance} Ohms</span>
          </div>
          <input 
            type="range"
            min="50"
            max="500"
            step="10"
            value={resistance}
            onChange={(e) => setResistance(Number(e.target.value))}
            className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>
      </div>

      <style>{`
        @keyframes flowCurrent {
          to { stroke-dashoffset: -100; }
        }
        .flowing-current-animation {
          animation: flowCurrent linear infinite;
        }
      `}</style>
    </div>
  );
}

// -----------------------------------------------------------------------------------------------------------
// 2. Series & Parallel Circuits Interactive Widget
// -----------------------------------------------------------------------------------------------------------
function SeriesParallelInteractive() {
  const [mode, setMode] = useState<'series' | 'parallel'>('series');
  const [r1, setR1] = useState(100);
  const [r2, setR2] = useState(100);

  // Constants
  const vSource = 9; // Voltage source constant 9V

  // Mathematical outputs
  const rEquivalent = mode === 'series' ? r1 + r2 : (r1 * r2) / (r1 + r2);
  const currentTotal = vSource / rEquivalent; // Total loop current

  return (
    <div className="flex-1 flex flex-col h-full pointer-events-auto select-none">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-200/50 dark:border-white/5 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <CircuitBoard className="w-4 h-4 text-amber-500 animate-[spin_5s_linear_infinite]" />
          <span className="text-[11px] font-mono tracking-wider uppercase text-slate-700 dark:text-slate-300 font-bold">Topology Transformer</span>
        </div>
        
        {/* Toggle Mode */}
        <div className="flex bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-0.5 rounded-lg">
          {(['series', 'parallel'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1 rounded-md text-[9px] font-mono font-bold uppercase transition-all duration-150 ${mode === m ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Schematic Container */}
      <div className="flex-1 relative flex items-center justify-center p-2">
        <svg className="absolute inset-0 w-full h-full" style={{ filter: "drop-shadow(0 0 6px rgba(245, 158, 11, 0.15))" }}>
          {/* Main bus paths based on series/parallel topology rules */}
          {mode === 'series' ? (
            <>
              {/* Simple serial loop rectangular path */}
              <rect x="15%" y="24%" width="70%" height="45%" fill="none" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="3" rx="16" />
              {/* Dynamic current flow dots */}
              <rect 
                className="flowing-current-animation"
                x="15%" y="24%" width="70%" height="45%" fill="none" stroke="#f59e0b" strokeWidth="4" rx="16" 
                strokeDasharray="14 36" 
                style={{ animationDuration: `${Math.max(0.4, 3.5 - currentTotal * 35)}s` }}
              />
            </>
          ) : (
            <>
              {/* Parallel branches */}
              {/* Left track coming out of Battery */}
              <path d="M 55 110 L 105 110 L 105 70 L 275 70 L 275 110" fill="none" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="3" />
              <path d="M 105 110 L 105 150 L 275 150 L 275 110" fill="none" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="3" />
              
              {/* Live Flow paths split */}
              <path 
                className="flowing-current-animation"
                d="M 55 110 L 105 110 L 105 70 L 275 70 L 275 110 Z" 
                fill="none" stroke="#f59e0b" strokeWidth="3.5" 
                strokeDasharray="10 30"
                style={{ animationDuration: `${Math.max(0.4, 3 - (vSource / r1) * 35)}s` }}
              />
              <path 
                className="flowing-current-animation"
                d="M 105 110 L 105 150 L 275 150" 
                fill="none" stroke="#d97706" strokeWidth="3.5" 
                strokeDasharray="10 30"
                style={{ animationDuration: `${Math.max(0.4, 3 - (vSource / r2) * 35)}s` }}
              />
            </>
          )}
        </svg>

        {/* Battery Source */}
        <div className="absolute left-[15%] -translate-x-1/2 flex flex-col items-center">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 border-2 border-amber-500 flex flex-col items-center justify-center text-amber-600 dark:text-amber-400 font-mono text-[10px] font-bold shadow-lg">
            9V
          </div>
          <span className="text-[8px] font-mono text-slate-500 mt-1 font-bold">SOURCE</span>
        </div>

        {/* Series Resistors Sequence */}
        {mode === 'series' ? (
          <>
            {/* Resistor 1 (Top side) */}
            <div className="absolute top-[24%] left-[38%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="h-4.5 w-12 rounded bg-slate-900 border border-amber-500/60 flex items-center justify-center text-[7px] font-mono font-bold text-amber-400">
                {r1}Ω
              </div>
              <span className="text-[7px] font-mono text-slate-500 tracking-wide mt-1 font-extrabold uppercase">R1</span>
            </div>

            {/* Resistor 2 (Bottom side) */}
            <div className="absolute bottom-[31%] left-[62%] -translate-x-1/2 translate-y-1/2 flex flex-col items-center">
              <div className="h-4.5 w-12 rounded bg-slate-900 border border-amber-500/60 flex items-center justify-center text-[7px] font-mono font-bold text-amber-400">
                {r2}Ω
              </div>
              <span className="text-[7px] font-mono text-slate-500 tracking-wide mt-1 font-extrabold uppercase">R2</span>
            </div>
          </>
        ) : (
          <>
            {/* Parallel Resistor 1 (Top path branch) */}
            <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="h-4.5 w-12 rounded bg-slate-900 border border-amber-500/60 flex items-center justify-center text-[7px] font-mono font-bold text-amber-400">
                {r1}Ω
              </div>
              <span className="text-[7px] font-mono text-slate-400 mt-1 font-extrabold pb-0.5">BRANCH 1</span>
            </div>

            {/* Parallel Resistor 2 (Bottom path branch) */}
            <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col items-center">
              <div className="h-4.5 w-12 rounded bg-slate-900 border border-amber-500/60 flex items-center justify-center text-[7px] font-mono font-bold text-amber-400">
                {r2}Ω
              </div>
              <span className="text-[7px] font-mono text-slate-400 mt-1 font-extrabold pt-0.5">BRANCH 2</span>
            </div>
          </>
        )}

        {/* Multimeter Center metrics panel */}
        <div className="absolute top-[35%] bottom-[35%] right-[11%] w-[112px] bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-200/60 dark:border-white/10 flex flex-col justify-center items-center p-2.5 shadow-lg select-none z-10 text-center">
          <span className="text-[8px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">TOTAL R_eq</span>
          <div className="text-xl font-mono font-extrabold text-amber-600 dark:text-amber-400 py-1">
            {rEquivalent.toFixed(1)} Ω
          </div>
          <div className="text-[8.5px] font-mono text-slate-500 leading-relaxed font-semibold">
            Equiv. Load
          </div>
          <div className="text-[8px] font-mono text-emerald-600 dark:text-emerald-400 mt-1 font-bold">
            Total I: {currentTotal.toFixed(3)} A
          </div>
        </div>
      </div>

      {/* Control sliders footer */}
      <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/50 dark:border-white/5 mt-3">
        {/* R1 value */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[9px] font-mono">
            <span className="text-slate-500 font-bold uppercase">RESISTOR 1 (R1)</span>
            <span className="text-amber-500 font-extrabold">{r1} Ω</span>
          </div>
          <input 
            type="range"
            min="20"
            max="200"
            step="10"
            value={r1}
            onChange={(e) => setR1(Number(e.target.value))}
            className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>

        {/* R2 value */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[9px] font-mono">
            <span className="text-slate-500 font-bold uppercase">RESISTOR 2 (R2)</span>
            <span className="text-amber-500 font-extrabold">{r2} Ω</span>
          </div>
          <input 
            type="range"
            min="20"
            max="200"
            step="10"
            value={r2}
            onChange={(e) => setR2(Number(e.target.value))}
            className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------------------------------------
// 3. KVL, KCL, & RC Transient Response Interactive Widget
// -----------------------------------------------------------------------------------------------------------
function KvlKclRcInteractive() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [simMode, setSimMode] = useState<'kcl' | 'rc-decay'>('kcl');
  const [rcCharge, setRcCharge] = useState(1); // charge state of capacitor [0 to 1]
  const [chargeDirection, setChargeDirection] = useState<'charging' | 'discharging'>('charging');

  // Exponential decay calculation for RC response
  // Simulated decay speed
  useEffect(() => {
    if (simMode !== 'rc-decay' || !isPlaying) return;

    const interval = setInterval(() => {
      setRcCharge((prev) => {
        if (chargeDirection === 'charging') {
          if (prev >= 0.99) {
            setChargeDirection('discharging');
            return 0.99;
          }
          return prev + (1 - prev) * 0.12; // asymptotic increase
        } else {
          if (prev <= 0.01) {
            setChargeDirection('charging');
            return 0.01;
          }
          return prev - prev * 0.12; // asymptotic decrease
        }
      });
    }, 70);

    return () => clearInterval(interval);
  }, [simMode, isPlaying, chargeDirection]);

  return (
    <div className="flex-1 flex flex-col h-full pointer-events-auto select-none">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-200/50 dark:border-white/5 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <RotateCw className="w-4 h-4 text-purple-500 animate-[spin_5s_linear_infinite]" />
          <span className="text-[11px] font-mono tracking-wider uppercase text-slate-700 dark:text-slate-300 font-bold">Transient Oscilloscope</span>
        </div>
        
        {/* Toggle KCL vs RC */}
        <div className="flex bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-0.5 rounded-lg">
          {(['kcl', 'rc-decay'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setSimMode(m)}
              className={`px-3 py-1 rounded-md text-[9px] font-mono font-bold uppercase transition-all duration-150 ${simMode === m ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'}`}
            >
              {m === 'kcl' ? 'KCL Nodo' : 'RC transient'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Graph/Visual screen */}
      <div className="flex-1 relative flex items-center justify-center p-1 bg-slate-950 rounded-2xl border border-slate-800/80 overflow-hidden">
        {/* Oscilloscope Grid Background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
          backgroundImage: "linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }} />

        {simMode === 'kcl' ? (
          /* Nodal current summation preview (KCL) */
          <div className="w-full h-full relative flex flex-col justify-between p-4">
            <div className="flex-1 flex items-center justify-center relative">
              {/* Converging live currents into Node center */}
              <svg className="absolute inset-0 w-full h-full">
                {/* Node circle center */}
                <circle cx="50%" cy="50%" r="5" fill="#a855f7" className="animate-ping" />
                <circle cx="50%" cy="50%" r="8" fill="#a855f7" />

                {/* Arrow lines coming in and leaving */}
                {/* IN 1: Left */}
                <path d="M 25 100 L 180 100" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeDasharray="6 6" className="kcl-flow-in" />
                {/* IN 2: Bottom-left */}
                <path d="M 80 160 L 180 100" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6 6" className="kcl-flow-in-angled" />
                {/* OUT: Right */}
                <path d="M 180 100 L 325 100" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="8 8" className="kcl-flow-out" />
              </svg>

              {/* Text badges for current equations */}
              <div className="absolute left-[8%] top-[18%] bg-green-500/10 border border-green-500/30 text-green-400 rounded-md px-2 py-0.5 text-[9px] font-mono font-bold">
                I_in1 = +4.5 A
              </div>
              <div className="absolute left-[8%] bottom-[12%] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-md px-2 py-0.5 text-[9px] font-mono font-bold">
                I_in2 = +3.5 A
              </div>
              <div className="absolute right-[8%] top-[40%] bg-red-500/10 border border-red-500/30 text-red-400 rounded-md px-2 py-0.5 text-[9px] font-mono font-bold animate-pulse">
                I_out = -8.0 A
              </div>
            </div>

            {/* Sum expression block */}
            <div className="bg-slate-900 border border-slate-800 p-2 rounded-xl text-center">
              <span className="text-[8px] font-mono text-slate-500 uppercase font-black">Kirchhoff's Nodal Equation</span>
              <div className="text-sm font-mono font-bold text-purple-400 mt-0.5">
                Σ I_in = Σ I_out &nbsp;⇒&nbsp; 4.5A + 3.5A = 8.0A
              </div>
            </div>
          </div>
        ) : (
          /* RC capacitor charging exponential plot */
          <div className="w-full h-full flex flex-col justify-between p-4">
            <div className="flex-1 relative flex items-center justify-between gap-4">
              {/* Exponential charging curve plotting */}
              <div className="w-1/2 h-full flex items-center justify-center relative">
                <svg className="w-full h-32">
                  <path 
                    d="M 5 110 Q 50 110, 50 110 T 150 10" 
                    fill="none" 
                    stroke="rgba(168, 85, 247, 0.2)" 
                    strokeWidth="2" 
                  />
                  {/* Charging live overlay tracking */}
                  <path 
                    d={`M 5 110 Q 40 ${110 - rcCharge*50}, 145 ${110 - rcCharge*100}`} 
                    fill="none" 
                    stroke="#a855f7" 
                    strokeWidth="3.5" 
                    className="blur-[1px]"
                  />
                  {/* Moving dot coordinates */}
                  <circle 
                    cx={5 + rcCharge * 140} 
                    cy={110 - rcCharge * 100} 
                    r="5" 
                    fill="#a855f7" 
                    className="shadow-md"
                  />
                </svg>
              </div>

              {/* RC Realtime parameters display gauge */}
              <div className="w-1/2 flex flex-col justify-center gap-1.5 pl-4 border-l border-slate-800">
                <span className="text-[8px] font-mono text-purple-400 font-bold uppercase tracking-wider block">RC CAP INTEGRATION</span>
                <span className="text-[10px] font-mono text-slate-400">
                  Time const: <span className="font-bold text-white">τ = 100 ms</span>
                </span>
                
                {/* Charge Capacity indicator bar */}
                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800 relative mt-1">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full transition-all duration-75"
                    style={{ width: `${rcCharge * 100}%` }}
                  />
                </div>
                
                <span className="text-[10px] font-mono text-slate-400 flex justify-between">
                  <span>Capacity:</span>
                  <span className="font-extrabold text-white">{(rcCharge * 100).toFixed(0)}%</span>
                </span>
                <span className="text-[9px] font-mono text-purple-500/80 uppercase font-black">
                  State: {chargeDirection === 'charging' ? 'CHARGING (V_c)' : 'DISCHARGING (I_discharge)'}
                </span>
              </div>
            </div>

            {/* Charge curve formula trigger info */}
            <div className="bg-slate-900 border border-slate-800 p-2 rounded-xl text-center">
              <span className="text-[8px] font-mono text-slate-500 uppercase font-black">Capacitor Voltage Transience</span>
              <div className="text-[11px] font-mono font-bold text-slate-200 mt-0.5">
                V_c(t) = V_0 (1 - e<sup>-t/RC</sup>) = <span className="text-purple-400 font-extrabold">{(rcCharge * 9).toFixed(2)} Volts</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Control sliders footer */}
      <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/50 dark:border-white/5 mt-3">
        <span className="text-[9px] font-mono text-slate-500 font-semibold uppercase">Transient Clock Rate</span>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-4 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase transition-all duration-150 shadow-sm ${isPlaying ? 'bg-purple-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
        >
          {isPlaying ? 'PAUSE CLOCK' : 'RESUME SIMULATION'}
        </button>
      </div>

      <style>{`
        @keyframes kclIn {
          to { stroke-dashoffset: -20; }
        }
        .kcl-flow-in {
          animation: kclIn 0.8s linear infinite;
        }
        .kcl-flow-in-angled {
          animation: kclIn 1.1s linear infinite;
        }
        .kcl-flow-out {
          animation: kclIn 0.6s linear infinite;
        }
      `}</style>
    </div>
  );
}
