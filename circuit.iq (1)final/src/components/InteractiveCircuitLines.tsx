import React, { useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';

interface Point {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  id: number;
  connections: number[];
  intensity: number;
}

interface Pulse {
  from: number;
  to: number;
  progress: number;
  speed: number;
}

export default function InteractiveCircuitLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useAppStore();
  
  // Keep track of mouse
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = 1200;
    let height = canvas.height = 800;
    
    // Nodes config
    const points: Point[] = [];
    const pulses: Pulse[] = [];
    const maxPoints = 36;
    
    // Create random connected nodes (using a grid-aligned matrix for a scientific, structural feel)
    const cols = 6;
    const rows = 6;
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Add random jitter to ensure it feels procedural but natural
        const baseX = (width / (cols + 1)) * (c + 1);
        const baseY = (height / (rows + 1)) * (r + 1);
        const offsetRange = 30;
        
        points.push({
          x: baseX + (Math.random() * offsetRange * 2 - offsetRange),
          y: baseY + (Math.random() * offsetRange * 2 - offsetRange),
          targetX: baseX,
          targetY: baseY,
          id: points.length,
          connections: [],
          intensity: 0,
        });
      }
    }

    // Create logical grid-like connections between neighboring coordinates
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const index = r * cols + c;
        
        // Connect right
        if (c < cols - 1) {
          const rightIdx = index + 1;
          points[index].connections.push(rightIdx);
        }
        // Connect down
        if (r < rows - 1) {
          const downIdx = index + cols;
          points[index].connections.push(downIdx);
        }
        // Occasional diagonal connection
        if (Math.random() > 0.75 && c < cols - 1 && r < rows - 1) {
          const diagIdx = index + cols + 1;
          points[index].connections.push(diagIdx);
        }
      }
    }

    // Resize controller
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      width = canvasRef.current.width = containerRef.current.clientWidth;
      height = canvasRef.current.height = containerRef.current.clientHeight;
      
      // Update points coordinates when container size shifts
      points.forEach((pt, idx) => {
        const r = Math.floor(idx / cols);
        const c = idx % cols;
        const baseX = (width / (cols + 1)) * (c + 1);
        const baseY = (height / (rows + 1)) * (r + 1);
        pt.x = baseX + (Math.random() * 30 - 15);
        pt.y = baseY + (Math.random() * 30 - 15);
      });
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('mouseleave', handleMouseLeave);

    // Main animation loops
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const isDark = theme === 'dark';
      // Set coloring matches for thematic elegance
      const nodeColor = isDark ? 'rgba(59, 130, 246, 0.25)' : 'rgba(37, 99, 235, 0.12)';
      const lineColor = isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)';
      const signalColor = isDark ? '#60a5fa' : '#2563eb';
      const glowStr = isDark ? 10 : 5;

      // Create random pulses if we are below maximum threshold
      if (pulses.length < 8 && Math.random() > 0.96) {
        // Pick a point that has connections
        const fromIdx = Math.floor(Math.random() * points.length);
        const fromPoint = points[fromIdx];
        if (fromPoint && fromPoint.connections.length > 0) {
          const toIdx = fromPoint.connections[Math.floor(Math.random() * fromPoint.connections.length)];
          pulses.push({
            from: fromIdx,
            to: toIdx,
            progress: 0,
            speed: 0.01 + Math.random() * 0.012,
          });
        }
      }

      // Draw all line tracks
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = lineColor;
      
      points.forEach((pt) => {
        pt.connections.forEach((targetId) => {
          const targetPt = points[targetId];
          if (!targetPt) return;

          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y);
          ctx.lineTo(targetPt.x, targetPt.y);
          ctx.stroke();
        });
      });

      // Update pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;
        
        const ptFrom = points[p.from];
        const ptTo = points[p.to];
        
        if (p.progress >= 1 || !ptFrom || !ptTo) {
          // Trigger next chain connection
          if (ptTo && ptTo.connections.length > 0 && Math.random() > 0.3) {
            const nextIdx = ptTo.connections[Math.floor(Math.random() * ptTo.connections.length)];
            pulses[i] = {
              from: p.to,
              to: nextIdx,
              progress: 0,
              speed: 0.01 + Math.random() * 0.012,
            };
            ptTo.intensity = 1.0;
          } else {
            pulses.splice(i, 1);
          }
          continue;
        }

        // Calculate actual particle spatial state with bezier/lerp
        const currentX = ptFrom.x + (ptTo.x - ptFrom.x) * p.progress;
        const currentY = ptFrom.y + (ptTo.y - ptFrom.y) * p.progress;

        // Draw flowing glowing pulse (electrons)
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = signalColor;
        ctx.shadowBlur = glowStr;
        ctx.shadowColor = signalColor;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for next drawings
      }

      // Draw and update node junctions with mouse magnet feedback
      points.forEach((pt) => {
        // Slowly decay node lit intensity
        pt.intensity *= 0.93;

        // Mouse distance
        let dist = 99999;
        if (mouseRef.current.active) {
          const dx = pt.x - mouseRef.current.x;
          const dy = pt.y - mouseRef.current.y;
          dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) {
            pt.intensity = Math.max(pt.intensity, (120 - dist) / 120);
          }
        }

        // Background circles
        ctx.beginPath();
        const baseRadius = 4 + (pt.intensity * 3);
        ctx.arc(pt.x, pt.y, baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // Glowing center core if active or mouse proximity is close
        if (pt.intensity > 0.05) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${pt.intensity})`;
          ctx.shadowBlur = glowStr * pt.intensity;
          ctx.shadowColor = signalColor;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-auto">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
