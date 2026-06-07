import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Stars, Sparkles, Trail, QuadraticBezierLine, RoundedBox, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppStore } from '../store/useAppStore';

gsap.registerPlugin(ScrollTrigger);

function CursorGlitter() {
  const { mouse, viewport } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<any>(null);

  useFrame(() => {
    if (meshRef.current) {
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;
      meshRef.current.position.lerp(new THREE.Vector3(x, y, 0), 0.1);
    }
  });

  return (
    <Trail 
      ref={trailRef}
      width={0.5} 
      length={10} 
      color={new THREE.Color(1, 1, 1)} 
      attenuation={(t) => t * t}
    >
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={[2, 2, 2]} toneMapped={false} />
      </mesh>
    </Trail>
  );
}

function FloatingComponent({ position, type, index, delay, progressRef, isLogo }: { position: [number, number, number], type: string, index: number, delay: number, progressRef?: React.MutableRefObject<{value: number}>, isLogo?: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const materialRef1 = useRef<THREE.MeshStandardMaterial>(null);
  const materialRef2 = useRef<THREE.MeshStandardMaterial>(null);
  const haloRef = useRef<THREE.MeshBasicMaterial>(null);
  const bounceRef = useRef<THREE.MeshBasicMaterial>(null);

  const highFidelityMode = useAppStore((state) => state.highFidelityMode);
  
  const ledColor = "#F3FF65"; // bright core yellow-green
  const ledEmissive = "#C7FF00"; // outer soft emission
  const emissiveFactor = isLogo ? 3.0 : 1.5;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const progress = progressRef ? progressRef.current.value : 0;
    
    // Dynamic color and blinking logic for LEDs
    if (materialRef1.current && materialRef2.current) {
        if (type === 'led') {
            const timeOffset = index * 0.5;
            const osc = Math.sin(t * 2.5 + timeOffset) * 0.35 + 0.65; // smooth osc 0.3 to 1.0
            const maxIntensity = isLogo ? 3.0 : 1.5;
            let currentEmissiveIntensity = THREE.MathUtils.lerp(0.12, maxIntensity * osc, Math.pow(progress, 3));

            // Realistic electric current high-frequency flicker randomness
            const flicker = 0.94 + 0.06 * Math.sin(t * 43.0 + index * 29.0) * Math.cos(t * 17.0 + index * 11.0);
            currentEmissiveIntensity *= flicker;

            // Morph color beautifully when fully formed
            if (progress > 0.9) {
                const targetColor = new THREE.Color(ledEmissive);
                materialRef1.current.emissive.copy(targetColor);
                materialRef2.current.emissive.copy(targetColor);
            } else {
                 materialRef1.current.emissive.set(ledEmissive);
                 materialRef2.current.emissive.set(ledEmissive);
            }

            materialRef1.current.emissiveIntensity = currentEmissiveIntensity;
            materialRef2.current.emissiveIntensity = currentEmissiveIntensity * 0.75;

            // Sync procedural halos and ground bounce lights
            if (highFidelityMode) {
                const amp = currentEmissiveIntensity / 3.0;
                if (haloRef.current) {
                    haloRef.current.opacity = (0.02 + 0.08 * amp) * progress;
                }
                if (bounceRef.current) {
                    bounceRef.current.opacity = (0.02 + 0.06 * amp) * progress;
                }
            }
        } else {
            materialRef1.current.emissiveIntensity = THREE.MathUtils.lerp(0.05, emissiveFactor, Math.pow(progress, 4));
            materialRef2.current.emissiveIntensity = THREE.MathUtils.lerp(0.02, emissiveFactor * 0.8, Math.pow(progress, 4));
        }
    }
  });

  const subdivisions = highFidelityMode ? 32 : 16;

  return (
    <group ref={meshRef} position={position} scale={0.8}>
      {type === 'resistor' && (
        <group>
          {/* Main body: using a capsule for smooth ends */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <capsuleGeometry args={[0.13, 0.6, subdivisions, subdivisions]} />
            <meshStandardMaterial color="#eacba0" roughness={0.9} />
          </mesh>
          {/* Realistic wider end caps */}
          <mesh position={[-0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
             <cylinderGeometry args={[0.16, 0.16, 0.15, subdivisions]} />
             <meshStandardMaterial color="#eacba0" roughness={0.9} />
          </mesh>
          <mesh position={[0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
             <cylinderGeometry args={[0.16, 0.16, 0.15, subdivisions]} />
             <meshStandardMaterial color="#eacba0" roughness={0.9} />
          </mesh>
          
          {/* Color bands on the central body */}
          <mesh position={[-0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
             <cylinderGeometry args={[0.132, 0.132, 0.08, subdivisions]} />
             <meshBasicMaterial color="#b91c1c" />
          </mesh>
          <mesh position={[0.0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
             <cylinderGeometry args={[0.132, 0.132, 0.08, subdivisions]} />
             <meshBasicMaterial color="#ca8a04" />
          </mesh>
          <mesh position={[0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
             <cylinderGeometry args={[0.132, 0.132, 0.08, subdivisions]} />
             <meshBasicMaterial color="#1e3a8a" />
          </mesh>
          <mesh position={[0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
             {/* Gold tolerance band on the right end cap */}
             <cylinderGeometry args={[0.162, 0.162, 0.05, subdivisions]} />
             <meshBasicMaterial color="#d4af37" />
          </mesh>

          {/* leads */}
          <group position={[-0.425, 0, 0]}>
            <mesh position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
               <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
               <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[-0.4, -0.25, 0]}>
               <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
               <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* The bend joint */}
            <mesh position={[-0.4, 0, 0]}>
               <sphereGeometry args={[0.02, 8, 8]} />
               <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>

          <group position={[0.425, 0, 0]}>
            <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
               <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
               <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0.4, -0.25, 0]}>
               <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
               <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* The bend joint */}
            <mesh position={[0.4, 0, 0]}>
               <sphereGeometry args={[0.02, 8, 8]} />
               <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
        </group>
      )}
      {type === 'led' && (
        <group>
          {/* LED Domed Body */}
          <mesh position={[0, 0.44, 0]}>
            <sphereGeometry args={[0.24, subdivisions, subdivisions, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial ref={materialRef1} color={ledColor} emissive={ledEmissive} emissiveIntensity={0.1} transparent opacity={0.9} roughness={0.1} toneMapped={false} />
          </mesh>
          <mesh position={[0, 0.21, 0]}>
            <cylinderGeometry args={[0.24, 0.24, 0.46, subdivisions]} />
            <meshStandardMaterial ref={materialRef2} color={ledColor} emissive={ledEmissive} emissiveIntensity={0.05} transparent opacity={0.8} roughness={0.1} toneMapped={false} />
          </mesh>
          <mesh position={[0, -0.04, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.06, subdivisions]} />
            <meshStandardMaterial color="#9ca3af" roughness={0.4} />
          </mesh>
          {/* Leg leads represent premium connection contacts */}
          <mesh position={[-0.15, -0.25, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.5]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.15, -0.25, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.5]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* High-Fidelity soft volumetric glow halo */}
          {highFidelityMode && (
            <mesh position={[0, 0.44, 0]}>
              <sphereGeometry args={[0.48, 12, 12]} />
              <meshBasicMaterial
                ref={haloRef}
                transparent
                opacity={0.06}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                color={ledEmissive}
                toneMapped={false}
              />
            </mesh>
          )}

          {/* Soft bounce light reflection ring on the breadboard surface */}
          {highFidelityMode && (
            <mesh position={[0, -0.31, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.42, 12]} />
              <meshBasicMaterial
                ref={bounceRef}
                transparent
                opacity={0.04}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                color={ledEmissive}
                toneMapped={false}
              />
            </mesh>
          )}
        </group>
      )}
    </group>
  );
}

function BreadboardHoles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const { positions } = useMemo(() => {
     const cols = 64;
     const items = [];
     const startX = -((cols - 1) * 0.3) / 2;
     
     // 5 rows top, 5 rows bottom
     const rows = [-1.8, -1.5, -1.2, -0.9, -0.6, 0.6, 0.9, 1.2, 1.5, 1.8];
     
     for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows.length; j++) {
           items.push([startX + i * 0.3, 0, rows[j]]);
        }
     }
     
     // Power rails
     const pRows = [-3.2, -2.6, 2.6, 3.2];
     for (let i = 0; i < cols; i += 2) {
        for (let j = 0; j < pRows.length; j++) {
           items.push([startX + i * 0.3, 0, pRows[j]]);
        }
     }
     
     return { positions: items };
  }, []);

  useEffect(() => {
     if (meshRef.current) {
        const dummy = new THREE.Object3D();
        positions.forEach((pos, i) => {
           dummy.position.set(pos[0], pos[1], pos[2]);
           dummy.rotation.set(-Math.PI / 2, 0, 0);
           dummy.updateMatrix();
           meshRef.current?.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
     }
  }, [positions]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, positions.length]}>
      <circleGeometry args={[0.07, 8]} />
      <meshBasicMaterial color="#0f172a" depthWrite={false} />
    </instancedMesh>
  );
}

function Breadboard() {
  return (
    <group position={[0, -0.25, 0]}>
       {/* Main body */}
       <RoundedBox args={[22, 0.8, 8]} radius={0.15} position={[0, 0, 0]}>
         <meshStandardMaterial color="#f8fafc" roughness={0.4} />
       </RoundedBox>
       
       {/* Center Trough */}
       <mesh position={[0, 0.39, 0]}>
         <boxGeometry args={[21, 0.05, 0.5]} />
         <meshStandardMaterial color="#e2e8f0" roughness={0.8} />
       </mesh>
       
       {/* Breadboard lines and holes using textures or lines to save perf */}
       {/* Power Rail Lines */ /* Top */}
       <mesh position={[0, 0.405, -3.2]} rotation={[-Math.PI/2, 0, 0]}>
          <planeGeometry args={[20.5, 0.06]} />
          <meshBasicMaterial color="#ef4444" />
       </mesh>
       <mesh position={[0, 0.405, -2.6]} rotation={[-Math.PI/2, 0, 0]}>
          <planeGeometry args={[20.5, 0.06]} />
          <meshBasicMaterial color="#3b82f6" />
       </mesh>
       {/* Power Rail Lines */ /* Bottom */}
       <mesh position={[0, 0.405, 2.6]} rotation={[-Math.PI/2, 0, 0]}>
          <planeGeometry args={[20.5, 0.06]} />
          <meshBasicMaterial color="#3b82f6" />
       </mesh>
       <mesh position={[0, 0.405, 3.2]} rotation={[-Math.PI/2, 0, 0]}>
          <planeGeometry args={[20.5, 0.06]} />
          <meshBasicMaterial color="#ef4444" />
       </mesh>
       
       {/* Grid representation of holes */}
       <group position={[0, 0.405, 0]}>
         <BreadboardHoles />
       </group>
    </group>
  );
}

function getBezierPoint(p0: THREE.Vector3, p1: THREE.Vector3, p2: THREE.Vector3, t: number) {
  const p = new THREE.Vector3();
  const mt = 1 - t;
  p.x = mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x;
  p.y = mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y;
  p.z = mt * mt * p0.z + 2 * mt * t * p1.z + t * t * p2.z;
  return p;
}

function PulsingWire({ start, end, mid, color, index, highFidelity }: { start: THREE.Vector3, end: THREE.Vector3, mid: THREE.Vector3, color: string, index: number, highFidelity: boolean }) {
  const pulseRef1 = useRef<THREE.Mesh>(null);
  const pulseRef2 = useRef<THREE.Mesh>(null);
  const lineRef = useRef<any>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const speed = 1.0 + (index % 3) * 0.25;

    if (lineRef.current) {
      // Dynamic breathing current aesthetic
      lineRef.current.opacity = 0.35 + 0.35 * Math.sin(t * 3.0 + index * 0.8);
    }

    if (highFidelity) {
      const p1 = ((t * speed) + (index * 0.12)) % 1.0;
      const p2 = ((t * speed) + (index * 0.12) + 0.5) % 1.0;

      if (pulseRef1.current) {
        pulseRef1.current.position.copy(getBezierPoint(start, mid, end, p1));
      }
      if (pulseRef2.current) {
        pulseRef2.current.position.copy(getBezierPoint(start, mid, end, p2));
      }
    }
  });

  return (
    <group>
      <QuadraticBezierLine
        ref={lineRef}
        start={start}
        end={end}
        mid={mid}
        color={color}
        lineWidth={1.5}
        transparent
        opacity={0.5}
      />
      {highFidelity && (
        <>
          <mesh ref={pulseRef1}>
            <sphereGeometry args={[0.07, 6, 6]} />
            <meshBasicMaterial color={color} toneMapped={false} />
          </mesh>
          <mesh ref={pulseRef2}>
            <sphereGeometry args={[0.05, 4, 4]} />
            <meshBasicMaterial color={color} toneMapped={false} />
          </mesh>
        </>
      )}
    </group>
  );
}

function BreadboardWires({ logoPoints }: { logoPoints: any[] }) {
  const highFidelityMode = useAppStore((state) => state.highFidelityMode);

  const wires = useMemo(() => {
     const result = [];
     const pts = logoPoints.filter(p => p.isLogo);
     if (pts.length === 0) return result;
     
     // Dynamic wire density based on setting
     const wireCount = highFidelityMode ? 35 : 12;
     
     // Generate connection wires
     for(let i = 0; i < wireCount; i++) {
        const p1 = pts[Math.floor(Math.random() * pts.length)].p;
        const toRail = Math.random() > 0.5;
        const p2 = toRail ? [p1[0] + (Math.random() - 0.5) * 4, Math.random() > 0.5 ? 2.8 : -2.8] : pts[Math.floor(Math.random() * pts.length)].p;
        
        const dist = Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
        
        const colorDecider = Math.random();
        let color = '#3b82f6';
        if (toRail) color = p2[1] > 0 ? (Math.random() > 0.5 ? '#ef4444' : '#3b82f6') : (Math.random() > 0.5 ? '#ef4444' : '#10b981');
        else color = colorDecider > 0.6 ? '#f59e0b' : (colorDecider > 0.3 ? '#10b981' : '#a855f7');
        
        result.push({
           start: new THREE.Vector3(p1[0], 0.16, p1[1]),
           end: new THREE.Vector3(p2[0], 0.16, p2[1]),
           mid: new THREE.Vector3((p1[0]+p2[0])/2, 0.5 + dist * 0.18 + (i * 0.12) % 0.5, (p1[1]+p2[1])/2),
           color
        });
     }
     return result;
  }, [logoPoints, highFidelityMode]);

  return (
     <group>
        {wires.map((w, i) => (
            <PulsingWire key={i} index={i} start={w.start} end={w.end} mid={w.mid} color={w.color} highFidelity={highFidelityMode} />
        ))}
     </group>
  );
}

function PhysicsBackgroundItems() {
  const items = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => {
      const type = Math.random() > 0.5 ? 'led' : 'resistor';
      const radius = 22 + Math.random() * 32;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 45;
      
      return {
        id: i,
        type,
        position: [
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        ] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
        scale: 0.6 + Math.random() * 0.7,
        speed: {
           rotX: (Math.sign(Math.random() - 0.5) || 1) * (0.35 + Math.random() * 0.45),
           rotY: (Math.sign(Math.random() - 0.5) || 1) * (0.35 + Math.random() * 0.45),
           rotZ: (Math.sign(Math.random() - 0.5) || 1) * (0.35 + Math.random() * 0.45),
           orbit: (Math.sign(Math.random() - 0.5) || 1) * (0.05 + Math.random() * 0.05),
           yOffset: Math.random() * Math.PI * 2,
           yFreq: 0.12 + Math.random() * 0.3
        }
      };
    });
  }, []);

  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
     const t = state.clock.getElapsedTime();
     if (groupRef.current) {
        groupRef.current.children.forEach((child, i) => {
           const item = items[i];
           if (!item) return;
           
           child.rotation.x = item.rotation[0] + t * item.speed.rotX;
           child.rotation.y = item.rotation[1] + t * item.speed.rotY;
           child.rotation.z = item.rotation[2] + t * item.speed.rotZ;
           
           const currentRadius = Math.sqrt(item.position[0]*item.position[0] + item.position[2]*item.position[2]);
           const currentAngle = Math.atan2(item.position[2], item.position[0]) + t * item.speed.orbit;
           
           child.position.x = Math.cos(currentAngle) * currentRadius;
           child.position.z = Math.sin(currentAngle) * currentRadius;
           child.position.y = item.position[1] + Math.sin(t * item.speed.yFreq + item.speed.yOffset) * 4;
        });
     }
  });

  return (
    <group ref={groupRef}>
       {items.map((item) => (
         <group key={item.id} position={item.position} rotation={item.rotation} scale={item.scale}>
            <FloatingComponent position={[0, 0, 0]} type={item.type} index={item.id} delay={0} isLogo={false} />
         </group>
       ))}
    </group>
  );
}

function GridLogoScene({ progressRef }: { progressRef: React.MutableRefObject<{value: number}> }) {
  const breadboardRef = useRef<THREE.Group>(null);
  const containerRef = useRef<THREE.Group>(null);

  const logoPoints = useMemo(() => {
    const textLines = [
      " CCCCC  III  RRRR   CCC U   U III TTTTT    III   QQQ  ",
      " C       I   R   R C    U   U  I    T       I   Q   Q ",
      " C       I   RRRR  C    U   U  I    T       I   Q   Q ",
      " C       I   R  R  C    U   U  I    T       I   Q  QQ ",
      " CCCCC  III  R   R  CCC  UUU  III   T    . III   QQQQ "
    ];
    
    const points: [number, number][] = [];
    const scaleX = 0.35;
    const scaleZ = 0.5;
    const offsetX = (textLines[0].length * scaleX) / 2;
    const offsetZ = (textLines.length * scaleZ) / 2;
    
    textLines.forEach((line, z) => {
      for (let x = 0; x < line.length; x++) {
        if (line[x] !== ' ') {
          points.push([x * scaleX - offsetX, z * scaleZ - offsetZ]);
        }
      }
    });

    const extra: [number, number][] = [];
    const used = new Set<string>();
    points.forEach(p => used.add(`${p[0].toFixed(2)},${p[1].toFixed(2)}`));
    
    for(let i=0; i<5; i++) {
        const snap = (v: number) => Math.round(v * 2) / 2;
        let x = snap((Math.random() - 0.5)*19);
        let z = snap((Math.random() - 0.5)*4.5);
        if (z === 0) z = 0.5;
        let key = `${x.toFixed(2)},${z.toFixed(2)}`;
        let tries = 0;
        
        while (used.has(key) && tries < 10) {
            x = snap((Math.random() - 0.5)*19);
            z = snap((Math.random() - 0.5)*4.5);
            if (z === 0) z = 0.5;
            key = `${x.toFixed(2)},${z.toFixed(2)}`;
            tries++;
        }
        used.add(key);
        extra.push([x, z]);
    }

    return [...points.map(p => ({ p, isLogo: true })), ...extra.map(p => ({ p, isLogo: false }))];
  }, []);

  const components = useMemo(() => {
    return logoPoints.map((item, i) => {
      const type = item.isLogo ? 'led' : 'resistor';
      
      const swirlRadius = 8 + Math.random() * 30; // Wider spread
      const swirlAngle = Math.random() * Math.PI * 2;
      const swirlY = 10 + (Math.random() - 0.5) * 40; // Taller spread
      const swirlOrbitSpeed = (Math.sign(Math.random() - 0.5) || 1) * (0.2 + Math.random() * 0.3);
      const swirlVertSpeed = (Math.sign(Math.random() - 0.5) || 1) * (0.1 + Math.random() * 0.15);
      const randomRotY = 0; // Keep resistors perfectly straight
      
      const endPos: [number, number, number] = [
        item.p[0],
        type === 'resistor' ? 0.35 : 0.25, 
        item.p[1]
      ];
      
      const crazyX = (Math.random() - 0.5) * 15;
      const crazyY = (Math.random() - 0.5) * 15;
      const crazyZ = (Math.random() - 0.5) * 15;
      
      return { 
        type, id: i, delay: Math.random(), 
        swirlRadius, swirlAngle, swirlY, swirlOrbitSpeed, swirlVertSpeed, endPos,
        isLogo: item.isLogo, crazyX, crazyY, crazyZ, randomRotY
      };
    });
  }, [logoPoints]);

  const refs = useRef<THREE.Group[]>([]);

  useEffect(() => {
    // Animate the progress value from 0 (swirling) to 1 (breadboard)
    gsap.to(progressRef.current, {
      value: 1,
      scrollTrigger: {
        trigger: "#simulation-section",
        start: "top bottom",
        end: "center center",
        scrub: 0.2,
      }
    });

    // Bring the breadboard up from the void
    if (breadboardRef.current) {
      gsap.fromTo(breadboardRef.current.position, 
        { y: -40, z: -20, rotationX: 0.2 },
        {
          y: 0,
          z: 0,
          rotationX: 0,
          scrollTrigger: {
            trigger: "#simulation-section",
            start: "top bottom",
            end: "center center",
            scrub: 0.2,
          }
        }
      );
    }
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const progress = progressRef.current.value;

    components.forEach((comp, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;

      // Swirl Positions
      const sx = Math.cos(comp.swirlAngle + t * comp.swirlOrbitSpeed) * comp.swirlRadius;
      const sz = Math.sin(comp.swirlAngle + t * comp.swirlOrbitSpeed) * comp.swirlRadius;
      const sy = comp.swirlY + Math.sin(t * comp.swirlVertSpeed) * 10;
      
      // Swirl Rotations
      const sRotX = t * comp.swirlOrbitSpeed;
      const sRotY = comp.swirlAngle + t * comp.swirlOrbitSpeed;
      const sRotZ = t * comp.swirlVertSpeed;

      // End Rotations
      let eRotX = 0;
      let eRotY = comp.isLogo ? 0 : comp.randomRotY;
      let eRotZ = 0; // Resistors horizontal to show plugged into breadboard

      // Unique assembly animation logic
      const distToCenter = Math.sqrt(comp.endPos[0]*comp.endPos[0] + comp.endPos[2]*comp.endPos[2]);
      const leftToRight = Math.max(0, Math.min(1, (comp.endPos[0] + 10) / 20)); // 0 to 1 based on X pos
      const waveOffset = leftToRight * 0.2; // sweeping wave from left to right
      let delayedProgress = Math.max(0, Math.min(1, (progress - waveOffset) / (1 - waveOffset)));
      
      // Bouncy easing for assembling
      let rawEase = delayedProgress === 1 ? 1 : (delayedProgress < 0.5 ? 4 * delayedProgress * delayedProgress * delayedProgress : 1 - Math.pow(-2 * delayedProgress + 2, 3) / 2);
      
      // Snap to 1 early to prevent micro-jiggles and vibration when near the end of the scroll
      let easeProgress = rawEase > 0.95 ? 1 : rawEase;

      let targetX = comp.endPos[0];
      let targetY = comp.endPos[1];
      let targetZ = comp.endPos[2];

      // Make them drop and pop subtly
      if (delayedProgress > 0.0 && delayedProgress < 1.0) {
           // Smoothly fade the intensity to strictly 0 as delayedProgress hits 1
           const hoverIntensity = Math.sin(delayedProgress * Math.PI) * 0.5;
           targetY += hoverIntensity * 5; // fly higher before dropping
           
           // Flip subtly while dropping
           const rotIntensity = Math.sin(delayedProgress * Math.PI);
           eRotX += rotIntensity * Math.PI * 0.25;
           eRotY += rotIntensity * Math.PI * 0.5;
      }

      if (easeProgress >= 0.999) {
          mesh.position.set(targetX, targetY, targetZ);
          mesh.rotation.set(eRotX, eRotY, eRotZ);
      } else {
          // Interpolate
          mesh.position.x = THREE.MathUtils.lerp(sx, targetX, easeProgress);
          mesh.position.y = THREE.MathUtils.lerp(sy, targetY, easeProgress);
          mesh.position.z = THREE.MathUtils.lerp(sz, targetZ, easeProgress);

          // Simple rotation lerp
          mesh.rotation.x = THREE.MathUtils.lerp(sRotX, eRotX, easeProgress);
          mesh.rotation.y = THREE.MathUtils.lerp(sRotY, eRotY, easeProgress);
          mesh.rotation.z = THREE.MathUtils.lerp(sRotZ, eRotZ, easeProgress);
      }
    });
  });

  const highFidelityMode = useAppStore((state) => state.highFidelityMode);

  return (
    <group ref={containerRef}>
      <group ref={breadboardRef}>
        <Breadboard />
        <BreadboardWires logoPoints={logoPoints} />
      </group>
      {components.map((comp, i) => (
        <group 
          key={comp.id} 
          ref={el => el && (refs.current[i] = el)} 
        >
          <FloatingComponent position={[0,0,0]} type={comp.type} index={comp.id} delay={comp.delay} progressRef={progressRef} isLogo={comp.isLogo} />
        </group>
      ))}
      <Sparkles count={highFidelityMode ? 100 : 40} scale={35} size={2.5} color="#60a5fa" opacity={0.8} speed={0.5} />
      <Stars radius={100} depth={50} count={highFidelityMode ? 1500 : 500} factor={3} saturation={1} fade speed={1.5} />
    </group>
  );
}

function Rig({ progressRef }: { progressRef: React.MutableRefObject<{value: number}> }) {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();
  const target = new THREE.Vector3(0, 0, 0);

  return useFrame(({ clock }) => {
    const progress = progressRef.current ? progressRef.current.value : 0;
    const t = clock.getElapsedTime() * 0.2; 
    
    // When swirling, orbit widely. When settled, lock to front-ish view for readability.
    const idealOrbitX = Math.sin(t) * 35;
    const idealOrbitZ = Math.cos(t) * 35;
    const idealOrbitY = 18;

    const settledCamX = 0;
    const settledCamY = 14;
    const settledCamZ = 10;

    const baseCamX = THREE.MathUtils.lerp(idealOrbitX, settledCamX, progress);
    const baseCamY = THREE.MathUtils.lerp(idealOrbitY, settledCamY, progress);
    const baseCamZ = THREE.MathUtils.lerp(idealOrbitZ, settledCamZ, progress);

    const mouseMultX = THREE.MathUtils.lerp(30, 0.5, progress); // lower mouse influence when settled
    const mouseMultY = THREE.MathUtils.lerp(25, 0.5, progress);
    
    const targetX = baseCamX + mouse.x * mouseMultX;
    const targetY = baseCamY + mouse.y * mouseMultY;
    const targetZ = baseCamZ;

    camera.position.lerp(vec.set(targetX, targetY, targetZ), 0.05);
    camera.lookAt(target);
  });
}

function WebGLContextDisposer() {
  const { gl } = useThree();
  useEffect(() => {
    return () => {
      try {
        if (gl && typeof gl.getContext === 'function') {
          const ctx = gl.getContext();
          if (ctx && typeof ctx.getExtension === 'function') {
            const ext = ctx.getExtension('WEBGL_lose_context');
            if (ext && typeof ext.loseContext === 'function') {
              ext.loseContext();
            }
          }
        }
      } catch (e) {
        console.warn("Failed to lose WebGL context on unmount:", e);
      }
      try {
        if (gl && typeof gl.dispose === 'function') {
          gl.dispose();
        }
      } catch (e) {
        console.warn("Failed to dispose WebGL renderer on unmount:", e);
      }
    };
  }, [gl]);
  return null;
}

export default function AntigravityHero() {
  const progressRef = useRef({ value: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const highFidelityMode = useAppStore((state) => state.highFidelityMode);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Delay canvas initialization by 300ms to allow other WebGL contexts (e.g. 3D lab) to clean up first
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
     if (wrapperRef.current) {
        gsap.to(wrapperRef.current, {
           opacity: 0,
           scrollTrigger: {
              trigger: "#simulation-section",
              start: "bottom bottom",
              end: "bottom center",
              scrub: true,
           }
        });
     }
  }, []);

  return (
    <div ref={wrapperRef} className="fixed inset-0 pointer-events-none z-0">
      {shouldRender ? (
        <Canvas dpr={highFidelityMode ? [1, 2] : 1}>
          <WebGLContextDisposer />
          <PerspectiveCamera makeDefault position={[0, 12, 22]} fov={45} />
          <ambientLight intensity={0.6} />
          <spotLight position={[15, 20, 15]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" castShadow={highFidelityMode} />
          <pointLight position={[-10, 5, -10]} intensity={1.5} color="#3b82f6" />
          <pointLight position={[10, 5, 10]} intensity={1} color="#fcf0d5" />
          
          <CursorGlitter />
          <PhysicsBackgroundItems />
          <GridLogoScene progressRef={progressRef} />
          <Rig progressRef={progressRef} />
          <EffectComposer>
            {highFidelityMode ? (
              <Bloom luminanceThreshold={0.4} mipmapBlur intensity={1.1} radius={0.5} />
            ) : (
              <Bloom luminanceThreshold={0.5} intensity={0.5} radius={0.3} />
            )}
            <Vignette eskil={false} offset={0.1} darkness={0.8} />
          </EffectComposer>
        </Canvas>
      ) : (
        <div className="w-full h-full bg-transparent" />
      )}
    </div>
  );
}
