import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '../store/useAppStore';
import { Zap, Cpu, Sliders, Lightbulb, Activity, Gauge } from 'lucide-react';

export default function LabStudio() {
  const { setLabOpen, currentExperiment } = useAppStore();
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);

  useEffect(() => {
    // Delay iframe load by 600ms to guarantee homepage canvases unmount and free WebGL contexts first
    const timer = setTimeout(() => {
      setShouldLoadIframe(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'close-lab') {
        setLabOpen(false);
      } else if (event.data && typeof event.data === 'object') {
        if (event.data.type === 'lab-loading') {
          setProgress(event.data.progress || 0);
        } else if (event.data.type === 'lab-loaded') {
          setProgress(100);
          setTimeout(() => {
            setIsLoaded(true);
          }, 800); // Allow time to see the 100% calibration state
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [setLabOpen]);

  // Determine subtext based on progress
  const getLoaderSubtext = () => {
    if (progress < 25) return "[CALIBRATING] Power Supply and AC Signal Generators...";
    if (progress < 50) return "[MAPPING] 3D Breadboard Grid Sockets (830 Connections)...";
    if (progress < 80) return "[LOADING] High-Fidelity Electronic Component Meshes...";
    if (progress < 100) return "[CALCULATING] Vector Reluctances & Physics Formulas...";
    return "[SYSTEMS READY] Launching Circuit.IQ 3D Simulation.";
  };

  return (
    <div className="fixed inset-0 bg-[#070a13] z-50 flex flex-col overflow-hidden select-none">
      {/* 3D Lab Iframe */}
      {shouldLoadIframe ? (
        <iframe 
          src={currentExperiment ? `/lab.html?exp=${currentExperiment}` : "/lab.html"} 
          className="w-full h-full border-none outline-none bg-[#070a13]"
          title="Circuit.IQ Virtual Lab"
          sandbox="allow-scripts allow-same-origin allow-downloads allow-popups allow-forms"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          onLoad={() => {
            // Fallback trigger: if assets are loaded from local disk cache instantaneously,
            // make sure the loading screen transitions smoothly.
            setTimeout(() => {
              setProgress((prev) => {
                if (prev < 100) {
                  setTimeout(() => setIsLoaded(true), 500);
                  return 100;
                }
                return prev;
              });
            }, 1500);
          }}
        />
      ) : (
        <div className="w-full h-full bg-[#070a13]" />
      )}

      {/* Atmospheric Glowing Loading Screen */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#070a13] flex flex-col items-center justify-center z-[60] pointer-events-none"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }} />

            {/* Glowing Tech Grid */}
            <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Central Glassmorphic Loader Card */}
            <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">
              {/* High-Fidelity Glowing Ring Spinner */}
              <div className="relative w-24 h-24 mb-10 flex items-center justify-center">
                {/* Outer spinning ring with glowing border */}
                <div className="absolute inset-0 rounded-full border border-t-blue-500 border-r-transparent border-b-transparent border-l-blue-500 animate-[spin_1.5s_linear_infinite] shadow-[0_0_15px_rgba(59,130,246,0.2)]" />
                {/* Inner reverse spinning ring */}
                <div className="absolute w-16 h-16 rounded-full border border-t-transparent border-r-cyan-400 border-b-cyan-400 border-l-transparent animate-[spin_1s_linear_infinite_reverse] opacity-70" />
                {/* Center glowing core icon */}
                <Zap className="text-white w-6 h-6 animate-pulse drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] relative z-10" />
              </div>

              {/* Progress Title */}
              <h2 className="text-sm font-semibold tracking-[0.25em] text-white uppercase mb-1 font-display">
                Initializing Virtual Lab
              </h2>
              <p className="text-[10px] text-slate-500 font-mono tracking-wider uppercase mb-10">
                Calibrating Instruments & Loading Modules
              </p>

              {/* Loader Bar Casing (Ultra-thin neon progress bar) */}
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-3 relative">
                <motion.div 
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 shadow-[0_0_12px_rgba(34,211,238,0.7)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                />
              </div>

              {/* Progress Data & Log */}
              <div className="flex justify-between w-full text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-8">
                <span>Calibration Log</span>
                <span className="text-cyan-400 font-bold">{progress}%</span>
              </div>

              {/* Terminal log window */}
              <div className="w-full bg-black/40 border border-white/5 rounded-xl p-4 font-mono text-[10px] text-left text-slate-400 h-16 flex items-center shadow-2xl backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping mr-3 shrink-0" />
                <span className="leading-relaxed truncate text-cyan-300/80 font-mono uppercase tracking-wider">{getLoaderSubtext()}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
