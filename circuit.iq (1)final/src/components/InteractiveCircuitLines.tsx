import React, { useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';

// ── Types ──────────────────────────────────────────────────────────────────────

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  id: number;
  connections: number[];
  intensity: number;
  hue: number;          // HSL hue for per-node color theming
  pulsePhase: number;   // unique phase for breathing animation
  size: number;         // base radius
}

interface Electron {
  from: number;
  to: number;
  progress: number;
  speed: number;
  trail: { x: number; y: number; age: number }[];
  hue: number;
}

interface FloatingParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
  life: number;
  maxLife: number;
  layer: number; // 0 = far, 1 = mid, 2 = near (for parallax)
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

// ── Color palette ──────────────────────────────────────────────────────────────
const PALETTE_HUES = [180, 200, 160, 270, 220]; // cyan, blue, emerald, violet, indigo

function hslString(h: number, s: number, l: number, a: number = 1) {
  return `hsla(${h}, ${s}%, ${l}%, ${a})`;
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function InteractiveCircuitLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useAppStore();
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const lastMouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = 1200;
    let H = 800;
    let clock = 0;

    // ── Build grid nodes ─────────────────────────────────────────────────────
    const COLS = 8;
    const ROWS = 6;
    const nodes: Node[] = [];

    const buildGrid = () => {
      nodes.length = 0;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const bx = (W / (COLS + 1)) * (c + 1);
          const by = (H / (ROWS + 1)) * (r + 1);
          const jitter = 20;
          nodes.push({
            x: bx + (Math.random() * jitter * 2 - jitter),
            y: by + (Math.random() * jitter * 2 - jitter),
            baseX: bx,
            baseY: by,
            id: nodes.length,
            connections: [],
            intensity: 0,
            hue: PALETTE_HUES[Math.floor(Math.random() * PALETTE_HUES.length)],
            pulsePhase: Math.random() * Math.PI * 2,
            size: 2.5 + Math.random() * 1.5,
          });
        }
      }
      // Orthogonal connections (right + down) with occasional skip connections
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const idx = r * COLS + c;
          if (c < COLS - 1) nodes[idx].connections.push(idx + 1);
          if (r < ROWS - 1) nodes[idx].connections.push(idx + COLS);
          // Occasional diagonal-skip for visual richness (rare)
          if (c < COLS - 2 && r < ROWS - 1 && Math.random() > 0.85) {
            nodes[idx].connections.push(idx + COLS + 2);
          }
        }
      }
    };

    buildGrid();

    // ── Floating ambient particles ──────────────────────────────────────────
    const particles: FloatingParticle[] = [];
    const MAX_PARTICLES = 60;

    const spawnParticle = () => {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 0.5 + Math.random() * 2,
        opacity: 0.1 + Math.random() * 0.4,
        hue: PALETTE_HUES[Math.floor(Math.random() * PALETTE_HUES.length)],
        life: 0,
        maxLife: 300 + Math.random() * 500,
        layer: Math.floor(Math.random() * 3),
      });
    };

    for (let i = 0; i < MAX_PARTICLES; i++) spawnParticle();

    // ── Electron pulses ─────────────────────────────────────────────────────
    const electrons: Electron[] = [];

    // ── Mouse ripples ───────────────────────────────────────────────────────
    const ripples: Ripple[] = [];
    let rippleCooldown = 0;

    // ── Resize ──────────────────────────────────────────────────────────────
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      W = canvasRef.current.width = containerRef.current.clientWidth;
      H = canvasRef.current.height = containerRef.current.clientHeight;
      nodes.forEach((n, idx) => {
        const r = Math.floor(idx / COLS);
        const c = idx % COLS;
        n.baseX = (W / (COLS + 1)) * (c + 1);
        n.baseY = (H / (ROWS + 1)) * (r + 1);
      });
    };

    const ro = new ResizeObserver(() => handleResize());
    if (containerRef.current) ro.observe(containerRef.current);

    // ── Mouse ───────────────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // ── Draw helpers ────────────────────────────────────────────────────────

    /** Draw a subtle tech grid underlay */
    const drawGrid = (isDark: boolean) => {
      const spacing = 40;
      const alpha = isDark ? 0.018 : 0.012;
      ctx.strokeStyle = isDark ? `rgba(100, 200, 255, ${alpha})` : `rgba(60, 100, 180, ${alpha})`;
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
    };

    /** Draw gradient L-shaped trace between two nodes */
    const drawTrace = (a: Node, b: Node, isDark: boolean) => {
      // Midpoint for L-bend
      const mx = b.x;
      const my = a.y;

      // Determine blended hue for the trace
      const avgHue = (a.hue + b.hue) / 2;
      const baseAlpha = isDark ? 0.07 : 0.035;
      const glowAlpha = isDark ? 0.12 : 0.06;

      // Check if either node is near mouse for glow boost
      const boostA = a.intensity;
      const boostB = b.intensity;
      const boost = Math.max(boostA, boostB);

      // Outer glow trace
      if (boost > 0.05) {
        ctx.save();
        ctx.strokeStyle = hslString(avgHue, 80, 60, glowAlpha * boost);
        ctx.lineWidth = 3;
        ctx.shadowBlur = 8;
        ctx.shadowColor = hslString(avgHue, 90, 60, 0.3);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mx, my);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.restore();
      }

      // Crisp inner trace
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(mx, my);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = hslString(avgHue, 60, isDark ? 55 : 45, baseAlpha + boost * 0.08);
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    /** Draw a glowing node with layered halos */
    const drawNode = (n: Node, isDark: boolean) => {
      const breathe = Math.sin(clock * 1.5 + n.pulsePhase) * 0.3 + 0.7;
      const glow = n.intensity;
      const totalGlow = Math.min(glow + breathe * 0.15, 1);
      const baseAlpha = isDark ? 0.5 : 0.35;

      // Outer ambient halo (always visible, subtle)
      const haloRadius = n.size * 4 + totalGlow * 12;
      const haloGrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, haloRadius);
      haloGrad.addColorStop(0, hslString(n.hue, 90, 65, 0.08 + totalGlow * 0.12));
      haloGrad.addColorStop(0.5, hslString(n.hue, 80, 55, 0.03 + totalGlow * 0.05));
      haloGrad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(n.x, n.y, haloRadius, 0, Math.PI * 2);
      ctx.fillStyle = haloGrad;
      ctx.fill();

      // Interactive ring when close to mouse
      if (glow > 0.1) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size * 2.5 + glow * 8, 0, Math.PI * 2);
        ctx.strokeStyle = hslString(n.hue, 90, 70, glow * 0.35);
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 12;
        ctx.shadowColor = hslString(n.hue, 100, 65, 0.5);
        ctx.stroke();
        ctx.restore();
      }

      // Inner core dot (solid bright center)
      ctx.save();
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.size * (0.8 + totalGlow * 0.4), 0, Math.PI * 2);
      const coreGrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.size * 1.5);
      coreGrad.addColorStop(0, hslString(n.hue, 100, 85, baseAlpha + totalGlow * 0.4));
      coreGrad.addColorStop(0.6, hslString(n.hue, 90, 60, baseAlpha * 0.6 + totalGlow * 0.3));
      coreGrad.addColorStop(1, hslString(n.hue, 80, 50, 0.05));
      ctx.fillStyle = coreGrad;
      ctx.shadowBlur = 6 + totalGlow * 10;
      ctx.shadowColor = hslString(n.hue, 100, 65, 0.5);
      ctx.fill();
      ctx.restore();

      // Tiny crosshair lines through the center
      const chLen = n.size * 2.2;
      ctx.beginPath();
      ctx.moveTo(n.x - chLen, n.y);
      ctx.lineTo(n.x + chLen, n.y);
      ctx.moveTo(n.x, n.y - chLen);
      ctx.lineTo(n.x, n.y + chLen);
      ctx.strokeStyle = hslString(n.hue, 70, 65, 0.12 + totalGlow * 0.2);
      ctx.lineWidth = 0.6;
      ctx.stroke();
    };

    // ── Main animation loop ─────────────────────────────────────────────────
    const animate = () => {
      clock += 0.016;
      ctx.clearRect(0, 0, W, H);
      const isDark = theme === 'dark';

      // ── Layer 0: Subtle tech grid ──
      drawGrid(isDark);

      // ── Mouse ripples ──
      rippleCooldown -= 0.016;
      if (mouseRef.current.active) {
        const dx = mouseRef.current.x - lastMouseRef.current.x;
        const dy = mouseRef.current.y - lastMouseRef.current.y;
        const speed = Math.sqrt(dx * dx + dy * dy);
        if (speed > 3 && rippleCooldown <= 0 && ripples.length < 5) {
          ripples.push({
            x: mouseRef.current.x,
            y: mouseRef.current.y,
            radius: 0,
            maxRadius: 80 + speed * 2,
            opacity: 0.25,
          });
          rippleCooldown = 0.15;
        }
        lastMouseRef.current.x = mouseRef.current.x;
        lastMouseRef.current.y = mouseRef.current.y;
      }

      // Draw and update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.radius += 2.5;
        rp.opacity *= 0.96;
        if (rp.opacity < 0.005 || rp.radius > rp.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
        ctx.strokeStyle = hslString(200, 90, 70, rp.opacity);
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 10;
        ctx.shadowColor = hslString(200, 100, 70, rp.opacity * 0.5);
        ctx.stroke();
        ctx.restore();
      }

      // ── Layer 1: Floating ambient particles (far) ──
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // Parallax: move based on mouse
        if (mouseRef.current.active) {
          const px = (mouseRef.current.x - W / 2) / W;
          const py = (mouseRef.current.y - H / 2) / H;
          const layerScale = (p.layer + 1) * 0.3;
          p.x += px * layerScale * 0.5;
          p.y += py * layerScale * 0.5;
        }

        // Wrap around edges
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // Fade in/out
        const lifePct = p.life / p.maxLife;
        let alpha = p.opacity;
        if (lifePct < 0.1) alpha *= lifePct / 0.1;
        else if (lifePct > 0.8) alpha *= (1 - lifePct) / 0.2;

        if (p.life > p.maxLife) {
          particles.splice(i, 1);
          spawnParticle();
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = hslString(p.hue, 80, 70, alpha);
        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = hslString(p.hue, 90, 65, alpha * 0.5);
        ctx.fill();
        ctx.restore();
      }

      // ── Update node positions (drift + mouse attraction) ──
      nodes.forEach((n) => {
        n.intensity *= 0.92;

        const drift = 8;
        const dx = Math.sin(clock * 0.5 + n.id * 0.3) * drift;
        const dy = Math.cos(clock * 0.4 + n.id * 0.3) * drift;

        let tx = n.baseX + dx;
        let ty = n.baseY + dy;

        if (mouseRef.current.active) {
          const mdx = n.x - mouseRef.current.x;
          const mdy = n.y - mouseRef.current.y;
          const dist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (dist < 180) {
            const force = (180 - dist) / 180;
            n.intensity = Math.max(n.intensity, force);
            tx += (mouseRef.current.x - n.x) * 0.12 * force;
            ty += (mouseRef.current.y - n.y) * 0.12 * force;
          }
        }

        n.x += (tx - n.x) * 0.06;
        n.y += (ty - n.y) * 0.06;
      });

      // ── Layer 2: Draw traces ──
      nodes.forEach((n) => {
        n.connections.forEach((tid) => {
          const target = nodes[tid];
          if (target) drawTrace(n, target, isDark);
        });
      });

      // ── Layer 3: Spawn & draw electron pulses ──
      if (electrons.length < 8 && Math.random() > 0.96) {
        const fromIdx = Math.floor(Math.random() * nodes.length);
        const fromNode = nodes[fromIdx];
        if (fromNode && fromNode.connections.length > 0) {
          const toIdx = fromNode.connections[Math.floor(Math.random() * fromNode.connections.length)];
          electrons.push({
            from: fromIdx,
            to: toIdx,
            progress: 0,
            speed: 0.006 + Math.random() * 0.012,
            trail: [],
            hue: PALETTE_HUES[Math.floor(Math.random() * PALETTE_HUES.length)],
          });
        }
      }

      for (let i = electrons.length - 1; i >= 0; i--) {
        const e = electrons[i];
        e.progress += e.speed;

        const nA = nodes[e.from];
        const nB = nodes[e.to];

        if (e.progress >= 1.0 || !nA || !nB) {
          if (nB && nB.connections.length > 0 && Math.random() > 0.4) {
            const next = nB.connections[Math.floor(Math.random() * nB.connections.length)];
            electrons[i] = {
              from: e.to,
              to: next,
              progress: 0,
              speed: 0.006 + Math.random() * 0.012,
              trail: [],
              hue: e.hue,
            };
            nB.intensity = 1.0;
          } else {
            electrons.splice(i, 1);
          }
          continue;
        }

        // Interpolate along L-shaped path
        let cx: number, cy: number;
        if (e.progress < 0.5) {
          const r = e.progress * 2;
          cx = nA.x + (nB.x - nA.x) * r;
          cy = nA.y;
        } else {
          const r = (e.progress - 0.5) * 2;
          cx = nB.x;
          cy = nA.y + (nB.y - nA.y) * r;
        }

        // Add to trail
        e.trail.push({ x: cx, y: cy, age: 0 });
        if (e.trail.length > 14) e.trail.shift();

        // Draw the comet trail
        for (let j = 0; j < e.trail.length; j++) {
          const t = e.trail[j];
          const pct = (j + 1) / e.trail.length;
          const radius = 0.5 + pct * 2.5;
          const alpha = pct * 0.7;

          ctx.save();
          ctx.beginPath();
          ctx.arc(t.x, t.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = hslString(e.hue, 100, 75, alpha);
          ctx.shadowBlur = 10 * pct;
          ctx.shadowColor = hslString(e.hue, 100, 70, alpha * 0.6);
          ctx.fill();
          ctx.restore();
        }

        // Leading bright head
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
        const headGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 5);
        headGrad.addColorStop(0, hslString(e.hue, 100, 90, 0.9));
        headGrad.addColorStop(0.5, hslString(e.hue, 100, 70, 0.4));
        headGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = headGrad;
        ctx.shadowBlur = 18;
        ctx.shadowColor = hslString(e.hue, 100, 65, 0.7);
        ctx.fill();
        ctx.restore();
      }

      // ── Layer 4: Draw nodes on top ──
      nodes.forEach((n) => drawNode(n, isDark));

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [theme]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
