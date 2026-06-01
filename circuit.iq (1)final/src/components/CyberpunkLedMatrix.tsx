import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion } from 'motion/react';
import { Cpu, Zap, Sliders, CircleDot } from 'lucide-react';

// Single LED instance renderer inside the R3F Canvas
function LEDGrid({
  rows = 14,
  cols = 22,
  spacing = 0.32,
  pattern = 'harmonic',
  speed = 1.2,
  glowStrength = 24,
  coreColor = '#EBF8FF',
  glowColor = '#0052FF',
  hoveredId = null,
  setHoveredId
}: {
  rows?: number;
  cols?: number;
  spacing?: number;
  pattern?: string;
  speed?: number;
  glowStrength?: number;
  coreColor?: string;
  glowColor?: string;
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const coreMeshRef = useRef<THREE.InstancedMesh>(null);
  const haloMeshRef = useRef<THREE.InstancedMesh>(null);
  const baseMeshRef = useRef<THREE.InstancedMesh>(null);

  // Set colors from props
  const cColor = useMemo(() => new THREE.Color(coreColor), [coreColor]);
  const gColor = useMemo(() => new THREE.Color(glowColor), [glowColor]);
  const dColor = useMemo(() => new THREE.Color('#1e293b').multiplyScalar(0.08), []); // Neutral off state color

  const tempColor = useMemo(() => new THREE.Color(), []);
  const tempColorCore = useMemo(() => new THREE.Color(), []);
  const tempColorHalo = useMemo(() => new THREE.Color(), []);
  const whiteColor = useMemo(() => new THREE.Color('#ffffff'), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const dummyBase = useMemo(() => new THREE.Object3D(), []);

  const ledCount = rows * cols;

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed;

    let index = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - cols / 2) * spacing;
        const z = (r - rows / 2) * spacing;

        const distFromCenter = Math.sqrt(
          Math.pow((c - cols / 2), 2) + Math.pow((r - rows / 2), 2)
        );

        // Custom wave computation depending on selected pattern
        let intensity = 0;
        if (pattern === 'wave') {
          intensity = Math.sin(x * 1.5 - time * 2.5) * 0.5 + 0.5;
        } else if (pattern === 'circular') {
          intensity = Math.sin(distFromCenter * 0.6 - time * 3.0) * 0.5 + 0.5;
        } else if (pattern === 'cyber-pulse') {
          intensity = (Math.sin(time * 2.0) > 0.3 ? 1.0 : 0.05) * (0.8 + 0.2 * Math.sin(x * z * 0.5 + time));
        } else if (pattern === 'matrix') {
          const columnTime = time * 2.0 + c * 7.7;
          intensity = (1.0 - ((r + Math.floor(columnTime)) % rows) / rows);
          if (intensity < 0.2) intensity = 0.05;
        } else {
          // Harmonic beautiful grid pattern
          intensity = Math.cos(x * 1.0 + time) * Math.sin(z * 1.0 + time) * 0.5 + 0.5;
        }

        // Clamp intensity
        intensity = Math.max(0.05, Math.min(1.0, intensity));

        const isHovered = index === hoveredId;
        const yOffset = 0.15 + (intensity * 0.03) + (isHovered ? 0.06 : 0);

        // LED Domed body placement
        dummy.position.set(x, yOffset, z);
        const bodyScale = isHovered ? 1.35 : 1.0;
        dummy.scale.set(bodyScale, bodyScale, bodyScale);
        dummy.updateMatrix();
        
        if (meshRef.current) {
          meshRef.current.setMatrixAt(index, dummy.matrix);
          tempColor.copy(dColor).lerp(gColor, intensity);
          if (isHovered) {
            tempColor.copy(whiteColor).lerp(gColor, 0.25);
          }
          meshRef.current.setColorAt(index, tempColor);
        }

        // LED High-Intensity core placement
        if (coreMeshRef.current) {
          dummy.position.set(x, yOffset + 0.06, z);
          let coreScale = 0.7 + intensity * 0.35;
          if (isHovered) {
            coreScale *= 1.45;
          }
          dummy.scale.set(coreScale, coreScale, coreScale);
          dummy.updateMatrix();
          coreMeshRef.current.setMatrixAt(index, dummy.matrix);
          
          tempColorCore.copy(dColor).lerp(cColor, intensity);
          if (isHovered) {
            tempColorCore.copy(whiteColor);
          }
          coreMeshRef.current.setColorAt(index, tempColorCore);
        }

        // Halo placement
        if (haloMeshRef.current) {
          dummy.position.set(x, yOffset + 0.02, z);
          let haloScale = 0.35 + intensity * 0.65;
          if (isHovered) {
            haloScale *= 1.6;
          }
          dummy.scale.set(haloScale, haloScale, haloScale);
          dummy.updateMatrix();
          haloMeshRef.current.setMatrixAt(index, dummy.matrix);

          tempColorHalo.copy(dColor).lerp(gColor, intensity);
          if (isHovered) {
            tempColorHalo.copy(whiteColor).lerp(gColor, 0.3);
          }
          tempColorHalo.multiplyScalar(intensity * 1.8);
          haloMeshRef.current.setColorAt(index, tempColorHalo);
        }

        if (baseMeshRef.current) {
          dummyBase.position.set(x, 0.02 + (isHovered ? 0.03 : 0), z);
          dummyBase.updateMatrix();
          baseMeshRef.current.setMatrixAt(index, dummyBase.matrix);
        }

        index++;
      }
    }

    if (meshRef.current) {
      if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
    if (coreMeshRef.current) {
      if (coreMeshRef.current.instanceColor) coreMeshRef.current.instanceColor.needsUpdate = true;
      coreMeshRef.current.instanceMatrix.needsUpdate = true;
    }
    if (haloMeshRef.current) {
      if (haloMeshRef.current.instanceColor) haloMeshRef.current.instanceColor.needsUpdate = true;
      haloMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* 5mm Rounded Dome LEDs (translucent colored diffuser body) */}
      <instancedMesh
        ref={meshRef}
        args={[new THREE.SphereGeometry(0.08, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), null, ledCount]}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (e.instanceId !== undefined) {
             setHoveredId(e.instanceId);
          }
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHoveredId(null);
        }}
        onPointerMove={(e) => {
          e.stopPropagation();
          if (e.instanceId !== undefined && e.instanceId !== hoveredId) {
             setHoveredId(e.instanceId);
          }
        }}
      >
        <meshPhysicalMaterial
          roughness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          metalness={0.1}
          transmission={0.4}
          ior={1.5}
          thickness={0.2}
          emissive={new THREE.Color(glowColor)}
          emissiveIntensity={glowStrength * 0.08}
          toneMapped={false}
        />
      </instancedMesh>

      {/* Hyper-glowing LED Cores (translucent fluorescent light emitting core) */}
      <instancedMesh
        ref={coreMeshRef}
        args={[new THREE.SphereGeometry(0.045, 8, 8), null, ledCount]}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (e.instanceId !== undefined) {
             setHoveredId(e.instanceId);
          }
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHoveredId(null);
        }}
        onPointerMove={(e) => {
          e.stopPropagation();
          if (e.instanceId !== undefined && e.instanceId !== hoveredId) {
             setHoveredId(e.instanceId);
          }
        }}
      >
        <meshPhysicalMaterial
          roughness={0.05}
          metalness={0.05}
          emissive={new THREE.Color(coreColor)}
          emissiveIntensity={glowStrength * 0.32}
          toneMapped={false}
        />
      </instancedMesh>

      {/* 2.5x Size Volumetric Glow Halos (additive blending translucent shells) */}
      <instancedMesh
        ref={haloMeshRef}
        args={[new THREE.SphereGeometry(0.2, 16, 16), null, ledCount]}
      >
        <meshBasicMaterial
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </instancedMesh>

      {/* Warm Golden LED Collars / Bases */}
      <instancedMesh ref={baseMeshRef} args={[new THREE.CylinderGeometry(0.09, 0.09, 0.04, 12), null, ledCount]}>
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.9}
          roughness={0.2}
        />
      </instancedMesh>
    </group>
  );
}

// Detailed copper tracer PCB wiring rendering on the board
function CircuitTracers({ rows = 16, cols = 24, spacing = 0.4 }) {
  const traces = useMemo(() => {
    const list: THREE.Vector3[][] = [];
    
    // Draw some neat traces connecting the LED grid rows
    for (let r = 0; r < rows; r += 2) {
      const pts: THREE.Vector3[] = [];
      const z = (r - rows / 2) * spacing;
      
      const startX = (-cols / 2 - 0.5) * spacing;
      const endX = (cols / 2 - 0.5) * spacing;
      
      pts.push(new THREE.Vector3(startX, 0.005, z));
      pts.push(new THREE.Vector3(endX, 0.005, z));
      list.push(pts);
    }

    // Draw some detailed cross bussing
    for (let c = 0; c < cols; c += 4) {
      const pts: THREE.Vector3[] = [];
      const x = (c - cols / 2) * spacing;
      
      const startZ = (-rows / 2 - 0.5) * spacing;
      const endZ = (rows / 2 - 0.5) * spacing;
      
      pts.push(new THREE.Vector3(x, 0.004, startZ));
      pts.push(new THREE.Vector3(x, 0.004, endZ));
      list.push(pts);
    }

    return list;
  }, [rows, cols, spacing]);

  return (
    <group>
      {traces.map((points, idx) => (
        <LineRenderer key={idx} points={points} color="#b87333" thickness={0.015} />
      ))}
    </group>
  );
}

// Simple Helper to render clean cylindrical flat PCB lines
function LineRenderer({ points, color, thickness }: { points: THREE.Vector3[], color: string, thickness: number }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  return (
    <mesh>
      <tubeGeometry args={[curve, 2, thickness, 4, false]} />
      <meshStandardMaterial color={color} metalness={0.9} roughness={0.3} />
    </mesh>
  );
}

// Side realistic peripheral circuit elements
function ExtraComponents({ rows = 16, cols = 24, spacing = 0.4 }) {
  const boardWidth = cols * spacing + 1.2;
  const boardHeight = rows * spacing + 1.2;

  const resList = useMemo(() => {
    const list = [];
    // Place some aesthetic ceramic resistors along the top edge of the board
    for (let i = 0; i < 6; i++) {
      const x = -boardWidth / 2.3 + i * (boardWidth / 8);
      const z = -boardHeight / 2 + 0.3;
      list.push({ x, z });
    }
    return list;
  }, [boardWidth, boardHeight]);

  return (
    <group>
      {/* Resistors */}
      {resList.map((item, idx) => (
        <group key={idx} position={[item.x, 0.06, item.z]}>
          {/* Ceramic Body */}
          <mesh>
            <boxGeometry args={[0.26, 0.08, 0.08]} />
            <meshPhysicalMaterial color="#b5a642" roughness={0.7} />
          </mesh>
          {/* Metal Bands */}
          <mesh position={[-0.08, 0, 0]}>
            <boxGeometry args={[0.04, 0.085, 0.085]} />
            <meshStandardMaterial color="#8b0000" roughness={0.3} />
          </mesh>
          <mesh position={[0.0, 0, 0]}>
            <boxGeometry args={[0.04, 0.085, 0.085]} />
            <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0.08, 0, 0]}>
            <boxGeometry args={[0.04, 0.085, 0.085]} />
            <meshStandardMaterial color="#006400" roughness={0.3} />
          </mesh>
          {/* Copper Wires going down to board */}
          <mesh position={[-0.17, -0.03, 0]} rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.008, 0.008, 0.12]} />
            <meshStandardMaterial color="#b87333" metalness={0.9} />
          </mesh>
          <mesh position={[0.17, -0.03, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <cylinderGeometry args={[0.008, 0.008, 0.12]} />
            <meshStandardMaterial color="#b87333" metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Aesthetic Cyber Chips */}
      <group position={[boardWidth / 2 - 0.5, 0.05, -boardHeight / 2 + 0.6]} rotation={[0, Math.PI / 4, 0]}>
        <mesh>
          <boxGeometry args={[0.4, 0.06, 0.4]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.55} />
        </mesh>
        {/* Chips contacts */}
        <mesh position={[0, -0.02, 0]}>
          <boxGeometry args={[0.42, 0.02, 0.35]} />
          <meshStandardMaterial color="#b87333" metalness={1.0} roughness={0.1} />
        </mesh>
        {/* Gold Core Tag */}
        <mesh position={[0, 0.031, 0]}>
          <planeGeometry args={[0.2, 0.2]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </group>
  );
}

// Scene Camera rig to match professional render angles
function CameraRig() {
  const { camera } = useThree();
  useFrame((state) => {
    // Gentle floating camera effect
    camera.lookAt(0, -0.2, 0);
  });
  return null;
}

// A performant FPS monitor helper inside the R3F Canvas
function FPSMonitor({ onFpsUpdate }: { onFpsUpdate: (fps: number) => void }) {
  const lastTime = useRef(performance.now());
  const frames = useRef(0);

  useFrame(() => {
    frames.current++;
    const now = performance.now();
    if (now >= lastTime.current + 1000) {
      const fpsVal = Math.round((frames.current * 1000) / (now - lastTime.current));
      onFpsUpdate(fpsVal);
      frames.current = 0;
      lastTime.current = now;
    }
  });

  return null;
}

function WebGLContextDisposer() {
  const { gl } = useThree();
  useEffect(() => {
    return () => {
      // Force lose WebGL context on unmount to free up context immediately
      gl.getContext().getExtension('WEBGL_lose_context')?.loseContext();
      gl.dispose();
    };
  }, [gl]);
  return null;
}

export default function CyberpunkLedMatrix() {
  const [fps, setFps] = useState<number | null>(null);
  const [pattern, setPattern] = useState<'harmonic' | 'wave' | 'circular' | 'cyber-pulse' | 'matrix'>('harmonic');
  const [speed, setSpeed] = useState<number>(1.2);
  const [glowStrength, setGlowStrength] = useState<number>(24);
  const [coreColor, setCoreColor] = useState<string>('#EBF8FF');
  const [glowColor, setGlowColor] = useState<string>('#0052FF');
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const spacing = 0.32;
  const rows = 14;
  const cols = 22;

  const boardWidth = cols * spacing + 1.2;
  const boardHeight = rows * spacing + 1.2;

  const ALL_PATTERNS = [
    { id: 'harmonic', label: 'Harmonic Ripple' },
    { id: 'wave', label: 'Laminar Sweep' },
    { id: 'circular', label: 'Radial Volumetric' },
    { id: 'cyber-pulse', label: 'Strobe Matrix' },
    { id: 'matrix', label: 'Digital Rain' }
  ] as const;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (tooltipRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const left = Math.max(10, Math.min(x + 18, containerRef.current.clientWidth - 195));
      const top = Math.max(10, Math.min(y - 125, containerRef.current.clientHeight - 135));
      tooltipRef.current.style.left = `${left}px`;
      tooltipRef.current.style.top = `${top}px`;
      tooltipRef.current.style.opacity = '1';
    }
  };

  return (
    <div className="w-full flex flex-col xl:flex-row gap-6 bg-slate-950/85 p-6 md:p-8 rounded-3xl border border-white/5 backdrop-blur-3xl shadow-[0_24px_70px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-300">
      
      {/* Cyber Background Accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
 
      {/* Interactive Controls Column (Left) */}
      <div className="w-full xl:w-80 flex flex-col gap-5 z-10 relative">
        <div className="flex flex-col gap-1.5 text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-blue-500/15 bg-blue-500/5 text-blue-400 text-[10px] font-mono tracking-wider w-max">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </div>
          <h3 className="text-2xl font-display font-medium text-white tracking-tight">Cyber LED Matrix</h3>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            Realistic virtual PCB board prototype rendering hundreds of glowing fluorescent dome LEDs on a translucent frosted acrylic chassis.
          </p>
        </div>
 
        {/* Live Controller Sliders */}
        <div className="flex flex-col gap-4.5 bg-black/40 p-5 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            <span>Parameters</span>
          </div>
 
          {/* Pattern Selection */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-gray-500 font-mono uppercase text-left">Wave Pattern</label>
            <div className="flex flex-col gap-1">
              {ALL_PATTERNS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPattern(p.id)}
                  className={`px-3 py-2 text-[10px] font-medium rounded-lg text-left transition-all duration-200 flex items-center justify-between border ${
                    pattern === p.id
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      : 'bg-white/5 text-gray-400 border-transparent hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="truncate">{p.label}</span>
                  {pattern === p.id && <CircleDot className="w-2.5 h-2.5 text-blue-400 animate-pulse shrink-0 ml-1" />}
                </button>
              ))}
            </div>
          </div>
 
          {/* Speed */}
          <div className="flex flex-col gap-1.5 mt-1">
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase">
              <span>Oscillation Speed</span>
              <span className="text-blue-400 font-mono">{(speed).toFixed(1)}Hz</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="2.5"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-400"
            />
          </div>
 
          {/* Bloom Emission Strength */}
          <div className="flex flex-col gap-1.5 mt-1">
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase">
              <span>Emission Strength</span>
              <span className="text-blue-400 font-mono">{glowStrength}</span>
            </div>
            <input
              type="range"
              min="10"
              max="40"
              step="1"
              value={glowStrength}
              onChange={(e) => setGlowStrength(parseInt(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-400"
            />
          </div>
 
          {/* Color Core preset selector */}
          <div className="flex flex-col gap-2 mt-1">
            <label className="text-[10px] text-gray-500 font-mono uppercase text-left">LED Colors</label>
            <div className="flex gap-2.5">
              {[
                { name: 'Cyber Blue', core: '#EBF8FF', glow: '#0052FF' },
                { name: 'Ice Cyan', core: '#E0FFFF', glow: '#00D2FF' },
                { name: 'Aurora Green', core: '#FFFFFF', glow: '#10b981' },
                { name: 'Deep Violet', core: '#FDF2FF', glow: '#9333ea' },
                { name: 'Cyberpunk Red', core: '#FFEAEA', glow: '#ef4444' }
              ].map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    setCoreColor(c.core);
                    setGlowColor(c.glow);
                  }}
                  className={`w-7 h-7 rounded-full border hover:scale-110 transition-all flex items-center justify-center relative shadow-md ${
                    glowColor === c.glow ? 'border-white scale-105' : 'border-white/15'
                  }`}
                  style={{ background: `radial-gradient(circle, ${c.core} 0%, ${c.glow} 100%)` }}
                  title={c.name}
                >
                  <span className="sr-only">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
 
      {/* Professional 3D Intersective Rendering View Canvas (Right) */}
      <div 
         ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredId(null)}
        className="flex-1 h-[450px] md:h-[550px] bg-slate-900/40 rounded-2xl relative border border-white/5 overflow-hidden group/canvas"
      >
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 text-[9px] font-mono text-gray-400 flex items-center gap-1.5 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>Interactive Simulator Grid</span>
          </div>
        </div>

        {/* Dynamic Non-Intrusive Performance FPS Monitor */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 text-[9px] font-mono text-gray-400 flex items-center gap-2 uppercase">
            <span className={`w-1.5 h-1.5 rounded-full ${
              fps === null
                ? 'bg-gray-400 animate-pulse'
                : fps >= 55
                ? 'bg-emerald-400 drop-shadow-[0_0_4px_rgba(52,211,153,0.5)]'
                : fps >= 30
                ? 'bg-yellow-400 animate-pulse'
                : 'bg-red-500 animate-ping'
            }`} />
            <span>FPS: <strong className={
              fps === null
                ? 'text-gray-400'
                : fps >= 55
                ? 'text-emerald-400'
                : fps >= 30
                ? 'text-yellow-400'
                : 'text-red-400'
            }>{fps !== null ? fps : '--'}</strong></span>
          </div>
        </div>

        {/* Floating Tooltip displaying exact physical LED details */}
        {hoveredId !== null && (
          <div
            ref={tooltipRef}
            className="absolute z-20 pointer-events-none bg-slate-950/95 border border-blue-500/30 rounded-xl px-4 py-3 text-xs text-white font-mono shadow-[0_0_20px_rgba(0,136,255,0.15)] backdrop-blur-md flex flex-col gap-1.2 transition-all duration-75 text-left"
            style={{
              left: 0,
              top: 0,
              opacity: 0,
            }}
          >
            <div className="flex items-center gap-1.5 border-b border-white/10 pb-1 mb-1 justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                <span className="font-bold text-[10px] text-yellow-300 uppercase tracking-wider">LED #{hoveredId}</span>
              </div>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 text-[10px]">
              <span className="text-gray-500">GRID:</span>
              <span className="text-white font-semibold">Row {Math.floor(hoveredId / cols) + 1}, Col {(hoveredId % cols) + 1}</span>
              
              <span className="text-gray-500">X pos:</span>
              <span className="text-cyan-300 font-semibold">{((hoveredId % cols - cols / 2) * 1.2).toFixed(2)} cm</span>
              
              <span className="text-gray-500">Z pos:</span>
              <span className="text-cyan-300 font-semibold">{((Math.floor(hoveredId / cols) - rows / 2) * 1.2).toFixed(2)} cm</span>
            </div>
          </div>
        )}

        {/* Three.js Canvas */}
        <Canvas dpr={1}>
          <WebGLContextDisposer />
          <color attach="background" args={['#04080F']} />
          <PerspectiveCamera makeDefault position={[0, 4.0, 5.0]} fov={35} />
          <ambientLight intensity={0.15} />
          
          {/* Main direction spotlight */}
          <spotLight
            position={[5, 10, 5]}
            angle={0.4}
            penumbra={0.9}
            intensity={2.2}
            color="#ffffff"
          />
          <pointLight position={[-4, 2, -4]} intensity={0.4} color="#00ffff" />

          {/* Frosted Acrylic Board Chassis Mesh */}
          <group position={[0, -0.1, 0]}>
            <mesh>
              <boxGeometry args={[boardWidth, 0.08, boardHeight]} />
              <meshPhysicalMaterial
                color="#0e1b30"
                roughness={0.2}
                metalness={0.15}
                transmission={0.85}
                thickness={0.8}
                ior={1.5}
                clearcoat={1.0}
                clearcoatRoughness={0.15}
                transparent
              />
            </mesh>

            {/* Glowing Edge Light Lines in cyber design */}
            <mesh position={[0, -0.041, 0]}>
              <boxGeometry args={[boardWidth + 0.04, 0.01, boardHeight + 0.04]} />
              <meshBasicMaterial color={glowColor} transparent opacity={0.08} wireframe />
            </mesh>

            {/* Beautiful Cyber Tracer Grid PCB lines */}
            <CircuitTracers rows={rows} cols={cols} spacing={spacing} />

            {/* Additional realistic PCB components */}
            <ExtraComponents rows={rows} cols={cols} spacing={spacing} />

            {/* Dynamic Instanced LEDs Grid */}
            <LEDGrid
              rows={rows}
              cols={cols}
              spacing={spacing}
              pattern={pattern}
              speed={speed}
              glowStrength={glowStrength}
              coreColor={coreColor}
              glowColor={glowColor}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
            />
          </group>

          {/* Stars and sparks floating around */}
          <ambientLight intensity={0.01} />
          
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            maxPolarAngle={Math.PI / 2 - 0.05}
            minDistance={3}
            maxDistance={8}
            target={[0, 0, 0]}
          />

          <EffectComposer>
            <Bloom luminanceThreshold={0.5} intensity={0.8} radius={0.65} />
            <Vignette eskil={false} offset={0.12} darkness={0.85} />
          </EffectComposer>

          <CameraRig />
          <FPSMonitor onFpsUpdate={setFps} />
        </Canvas>
      </div>
    </div>
  );
}
