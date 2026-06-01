"""
================================================================================
 Circuit IQ — Virtual Physics Lab
 FILE: generate_docs.py
 ROLE: Documentation Generator — Generates full project structure PDF
================================================================================
 USAGE:
    python Circuit-IQ/generate_docs.py
    → Opens a browser window with the full project documentation
    → Press Ctrl+P (or Cmd+P) → Save as PDF
================================================================================
"""

import os
import webbrowser
import tempfile

# ──────────────────────────────────────────────────────────────────────────────
# FULL HTML DOCUMENTATION CONTENT
# ──────────────────────────────────────────────────────────────────────────────

HTML = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Circuit IQ — Full Project Documentation</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

  * { margin:0; padding:0; box-sizing:border-box; }
  
  body {
    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    font-size: 10.5px;
    color: #1e293b;
    background: #fff;
    line-height: 1.65;
  }

  /* ── PAGE LAYOUT ── */
  .page { padding: 20mm 18mm 18mm; max-width: 210mm; margin: 0 auto; }

  /* ── COVER PAGE ── */
  .cover {
    min-height: 260px;
    background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f4c81 100%);
    border-radius: 10px;
    padding: 30px 35px;
    color: white;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
  }
  .cover::before {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 200px; height: 200px;
    background: rgba(0,208,132,0.08);
    border-radius: 50%;
  }
  .cover::after {
    content: '';
    position: absolute;
    bottom: -60px; left: -30px;
    width: 240px; height: 240px;
    background: rgba(59,130,246,0.06);
    border-radius: 50%;
  }
  .cover-badge {
    display: inline-block;
    background: rgba(0,208,132,0.15);
    border: 1px solid rgba(0,208,132,0.4);
    color: #00d084;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 20px;
    margin-bottom: 12px;
  }
  .cover h1 {
    font-size: 28px;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 6px;
  }
  .cover h1 span { color: #00d084; }
  .cover .subtitle {
    font-size: 12px;
    color: #93c5fd;
    margin-bottom: 20px;
  }
  .cover-meta {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    margin-top: 18px;
    padding-top: 18px;
    border-top: 1px solid rgba(255,255,255,0.12);
  }
  .cover-meta-item { font-size: 9px; color: #94a3b8; }
  .cover-meta-item strong { color: #e2e8f0; display: block; font-size: 11px; margin-bottom: 1px; }

  /* ── TYPOGRAPHY ── */
  h2 {
    font-size: 14px;
    font-weight: 800;
    color: #1e3a5f;
    border-bottom: 2.5px solid #2563eb;
    padding-bottom: 5px;
    margin: 22px 0 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  h3 {
    font-size: 11px;
    font-weight: 700;
    color: #1e3a5f;
    margin: 14px 0 6px;
  }
  h4 {
    font-size: 10px;
    font-weight: 700;
    color: #334155;
    margin: 10px 0 4px;
  }
  p { margin-bottom: 6px; font-size: 10px; color: #334155; }

  /* ── SECTION BOX ── */
  .section-box {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 12px 15px;
    margin-bottom: 12px;
    background: #fafbff;
  }
  .section-box.blue { border-left: 4px solid #2563eb; background: #eff6ff; }
  .section-box.green { border-left: 4px solid #16a34a; background: #f0fdf4; }
  .section-box.orange { border-left: 4px solid #ea580c; background: #fff7ed; }
  .section-box.purple { border-left: 4px solid #7c3aed; background: #f5f3ff; }
  .section-box.red { border-left: 4px solid #dc2626; background: #fef2f2; }
  .section-box.yellow { border-left: 4px solid #d97706; background: #fffbeb; }
  .section-box.dark { border: 1px solid #1e293b; background: #0f172a; color: #e2e8f0; }

  /* ── CODE BLOCKS ── */
  pre {
    background: #0f172a;
    color: #e2e8f0;
    padding: 12px 14px;
    border-radius: 6px;
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    font-size: 8.5px;
    line-height: 1.7;
    margin: 8px 0 10px;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-word;
  }
  code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    background: #f1f5f9;
    color: #0f172a;
    padding: 1px 5px;
    border-radius: 3px;
    border: 1px solid #e2e8f0;
  }
  .kw { color: #93c5fd; }
  .fn { color: #86efac; }
  .cm { color: #64748b; font-style: italic; }
  .st { color: #fcd34d; }
  .nm { color: #fca5a5; }

  /* ── TABLES ── */
  table { width: 100%; border-collapse: collapse; margin: 8px 0 12px; font-size: 9.5px; }
  th {
    background: #1e3a5f;
    color: white;
    padding: 6px 10px;
    text-align: left;
    font-size: 8.5px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  td { padding: 5px 10px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
  tr:nth-child(even) td { background: #f8faff; }
  tr:hover td { background: #eff6ff; }

  /* ── BADGES ── */
  .badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin: 1px 2px;
  }
  .badge-blue   { background: #dbeafe; color: #1d4ed8; }
  .badge-green  { background: #dcfce7; color: #166534; }
  .badge-orange { background: #ffedd5; color: #9a3412; }
  .badge-purple { background: #ede9fe; color: #6d28d9; }
  .badge-red    { background: #fee2e2; color: #991b1b; }
  .badge-yellow { background: #fef9c3; color: #854d0e; }
  .badge-gray   { background: #f1f5f9; color: #475569; }

  /* ── FLOW DIAGRAM ── */
  .flow {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    margin: 10px 0;
    font-size: 10px;
  }
  .flow-box {
    background: #1e3a5f;
    color: white;
    padding: 6px 12px;
    border-radius: 6px;
    font-weight: 600;
    font-size: 9.5px;
    text-align: center;
    min-width: 90px;
  }
  .flow-box.green { background: #166534; }
  .flow-box.blue  { background: #1d4ed8; }
  .flow-box.orange { background: #9a3412; }
  .flow-arrow { color: #64748b; font-size: 14px; font-weight: 700; }

  /* ── FILE TREE ── */
  .file-tree {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    line-height: 1.9;
    background: #0f172a;
    color: #94a3b8;
    padding: 14px 16px;
    border-radius: 8px;
    margin: 8px 0 12px;
  }
  .file-tree .dir  { color: #60a5fa; font-weight: 700; }
  .file-tree .file { color: #e2e8f0; }
  .file-tree .entry { color: #00d084; }
  .file-tree .legacy { color: #f59e0b; }
  .file-tree .note { color: #64748b; font-style: italic; }

  /* ── GRID CARDS ── */
  .card-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin: 10px 0;
  }
  .card {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 10px 12px;
    background: #fafbff;
  }
  .card-icon { font-size: 18px; margin-bottom: 5px; }
  .card h4 { font-size: 10px; margin-bottom: 3px; }
  .card p { font-size: 9px; color: #64748b; margin: 0; }

  /* ── DIVIDERS ── */
  .divider {
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: 18px 0;
  }
  .page-break { page-break-before: always; }

  /* ── FOOTER ── */
  .footer {
    text-align: center;
    font-size: 8px;
    color: #9ca3af;
    margin-top: 24px;
    padding-top: 10px;
    border-top: 1px solid #f1f5f9;
  }

  /* ── HIGHLIGHT BOXES ── */
  .highlight {
    background: #fef9c3;
    border: 1px solid #fde68a;
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 10px;
    color: #78350f;
    margin: 8px 0;
  }
  .info-box {
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 10px;
    color: #1e40af;
    margin: 8px 0;
  }

  /* ── PRINT ── */
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .page { padding: 12mm 14mm; }
    .page-break { page-break-before: always; }
    .cover { -webkit-print-color-adjust: exact; }
  }

  /* ── TOC ── */
  .toc-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 0;
    border-bottom: 1px dotted #e2e8f0;
    font-size: 10px;
  }
  .toc-num { color: #2563eb; font-weight: 700; min-width: 20px; }
  .toc-dots { flex: 1; border-bottom: 1px dotted #cbd5e1; margin: 0 8px; height: 1px; position: relative; top: -4px; }
  .toc-page { color: #64748b; font-size: 9px; }

  ul { margin: 4px 0 6px 16px; }
  li { font-size: 10px; margin-bottom: 2px; color: #334155; }
</style>
</head>
<body>
<div class="page">

  <!-- ══════════════════ COVER ══════════════════ -->
  <div class="cover">
    <div class="cover-badge">📄 Technical Documentation · v1.0</div>
    <h1>Circuit<span>IQ</span></h1>
    <h1 style="font-size:18px;font-weight:500;color:#93c5fd;margin-top:2px;">Virtual Physics Laboratory</h1>
    <p class="subtitle">Full Project Architecture · File Structure · Data Flow · Developer Guide</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">
      <span class="badge badge-green">Python Backend</span>
      <span class="badge badge-blue">Three.js 3D Frontend</span>
      <span class="badge badge-purple">Vite + ESM</span>
      <span class="badge badge-orange">4 Experiments</span>
      <span class="badge badge-gray">REST API</span>
    </div>
    <div class="cover-meta">
      <div class="cover-meta-item"><strong>Backend</strong>Python 3.8+ · http.server</div>
      <div class="cover-meta-item"><strong>Frontend</strong>Three.js r184 · Vite 8</div>
      <div class="cover-meta-item"><strong>Total Files</strong>15 source files</div>
      <div class="cover-meta-item"><strong>Main JS</strong>8,200+ lines</div>
      <div class="cover-meta-item"><strong>Experiments</strong>Ohm, LCR, RC, Arduino</div>
    </div>
  </div>

  <!-- ══════════════════ TABLE OF CONTENTS ══════════════════ -->
  <h2>Table of Contents</h2>
  <div class="section-box">
    <div class="toc-item"><span><span class="toc-num">1.</span> Project Overview &amp; Purpose</span><div class="toc-dots"></div><span class="toc-page">Pg 1</span></div>
    <div class="toc-item"><span><span class="toc-num">2.</span> Full Folder Structure (Both Projects)</span><div class="toc-dots"></div><span class="toc-page">Pg 1</span></div>
    <div class="toc-item"><span><span class="toc-num">3.</span> System Architecture &amp; Data Flow</span><div class="toc-dots"></div><span class="toc-page">Pg 2</span></div>
    <div class="toc-item"><span><span class="toc-num">4.</span> Python Backend — All Files Explained</span><div class="toc-dots"></div><span class="toc-page">Pg 2</span></div>
    <div class="toc-item"><span><span class="toc-num">5.</span> 3D Frontend — All Files Explained</span><div class="toc-dots"></div><span class="toc-page">Pg 3</span></div>
    <div class="toc-item"><span><span class="toc-num">6.</span> main.js — Section Map (8200 lines)</span><div class="toc-dots"></div><span class="toc-page">Pg 4</span></div>
    <div class="toc-item"><span><span class="toc-num">7.</span> REST API Endpoints</span><div class="toc-dots"></div><span class="toc-page">Pg 4</span></div>
    <div class="toc-item"><span><span class="toc-num">8.</span> The 4 Experiments — How Each Works</span><div class="toc-dots"></div><span class="toc-page">Pg 5</span></div>
    <div class="toc-item"><span><span class="toc-num">9.</span> 3D Scene Architecture</span><div class="toc-dots"></div><span class="toc-page">Pg 5</span></div>
    <div class="toc-item"><span><span class="toc-num">10.</span> Lab Panel — Theory, Steps, Table, Graph, Viva, PDF</span><div class="toc-dots"></div><span class="toc-page">Pg 6</span></div>
    <div class="toc-item"><span><span class="toc-num">11.</span> Key State Object Reference</span><div class="toc-dots"></div><span class="toc-page">Pg 6</span></div>
    <div class="toc-item"><span><span class="toc-num">12.</span> How to Run &amp; Quick Start Guide</span><div class="toc-dots"></div><span class="toc-page">Pg 7</span></div>
    <div class="toc-item"><span><span class="toc-num">13.</span> Where to Make Changes (Developer Cheatsheet)</span><div class="toc-dots"></div><span class="toc-page">Pg 7</span></div>
  </div>

  <hr class="divider">

  <!-- ══════════════════ SEC 1: OVERVIEW ══════════════════ -->
  <h2>1. Project Overview &amp; Purpose</h2>
  <div class="section-box blue">
    <h4>What is Circuit IQ?</h4>
    <p>Circuit IQ is a full-stack <strong>3D Virtual Physics Laboratory</strong> that lets students simulate real electronic circuits on an interactive 3D breadboard, record observations, analyze graphs, answer viva questions, and download a complete lab report — all in the browser.</p>
  </div>

  <div class="card-grid">
    <div class="card">
      <div class="card-icon">🐍</div>
      <h4>Circuit-IQ (Python Backend)</h4>
      <p>HTTP server that serves the built frontend and provides REST API endpoints for circuit physics calculations and topology validation.</p>
    </div>
    <div class="card">
      <div class="card-icon">🌐</div>
      <h4>Circuit-IQ-3D (Frontend)</h4>
      <p>Three.js + Vite browser app with a full 3D breadboard, component placement, wiring, oscilloscope, graph, AI mentor, and lab report generator.</p>
    </div>
    <div class="card">
      <div class="card-icon">⚡</div>
      <h4>Physics Engine</h4>
      <p>Calculates V, I, Z, P, XL, XC, φ, f₀ for 4 experiment types. Includes temperature-corrected resistance and DFS circuit topology validation.</p>
    </div>
    <div class="card">
      <div class="card-icon">🤖</div>
      <h4>AI Mentor</h4>
      <p>Contextual step-by-step guidance, real-time viva feedback with explanations, and auto-generated scientific conclusions for each experiment.</p>
    </div>
  </div>

  <!-- ══════════════════ SEC 2: FOLDER STRUCTURE ══════════════════ -->
  <h2>2. Full Folder Structure</h2>
<div class="file-tree">
<span class="dir">project phy/</span>                                 ← Root workspace
│
├── <span class="file">README.md</span>                               ← Master project guide
│
├── <span class="dir">Circuit-IQ/</span>                              ← 🐍 PYTHON BACKEND
│   ├── <span class="entry">main.py</span>                           ← 🚀 ENTRY POINT — Run this to start server
│   ├── <span class="entry">server.py</span>                         ← 🌐 HTTP Server + /api/validate + /api/calculate
│   ├── <span class="entry">physics_engine.py</span>                 ← ⚡ Circuit physics calculator (all experiments)
│   ├── <span class="entry">ai_guide.py</span>                       ← 🤖 Experiment data + hints + viva content
│   ├── <span class="dir">experiments/</span>                      ← 📂 Experiments directory (Ohm, LCR, RC)
│   │   ├── <span class="entry">__init__.py</span>                   ← Package loader and registry
│   │   ├── <span class="entry">base_experiment.py</span>             ← Abstract Base Experiment class
│   │   ├── <span class="entry">ohms.py</span>                       ← Ohm's Law calculations
│   │   ├── <span class="entry">lcr.py</span>                        ← Series LCR Resonance calculations
│   │   └── <span class="entry">rc.py</span>                         ← RC charging/discharging calculations
│   ├── <span class="file">test_physics.py</span>                    ← 🧪 Unit tests for physics engine
│   └── <span class="file">README.md</span>                          ← Backend documentation
│
└── <span class="dir">Circuit-IQ-3D/</span>                           ← 🌐 3D WEB FRONTEND
    ├── <span class="entry">index.html</span>                        ← 🏠 HTML shell — all panels and layout
    ├── <span class="file">package.json</span>                       ← NPM: Three.js + Vite dependencies
    ├── <span class="file">vite.config.js</span>                    ← Vite build configuration
    ├── <span class="file">.gitignore</span>                         ← Git ignore rules
    ├── <span class="file">README.md</span>                          ← Frontend documentation
    │
    ├── <span class="dir">src/</span>                                 ← SOURCE CODE — Edit these
    │   ├── <span class="entry">main.js</span>                       ← ⭐ MAIN APP — 8200+ lines, all logic
    │   ├── <span class="entry">style.css</span>                     ← 🎨 All styles + design tokens
    │   └── <span class="note">counter.js</span>                    ← (Vite starter — unused)
    │
    ├── <span class="dir">public/</span>                              ← STATIC ASSETS — served as-is
    │   ├── <span class="file">favicon.svg</span>
    │   ├── <span class="file">icons.svg</span>                      ← UI icon sprite sheet
    │   ├── <span class="file">DefaultMaterial_baseColor.jpg</span>  ← Breadboard PBR texture
    │   └── <span class="dir">models/</span>                          ← 3D GLTF Models
    │       ├── <span class="dir">breadboard/</span>
    │       │   ├── <span class="file">scene.gltf</span>             ← Breadboard 3D model
    │       │   ├── <span class="file">scene.bin</span>
    │       │   └── <span class="dir">textures/</span>
    │       ├── <span class="dir">resistor/</span>
    │       │   ├── <span class="file">scene.gltf</span>             ← Resistor 3D model
    │       │   └── <span class="file">scene.bin</span>
    │       └── <span class="dir">electronic_components/</span>
    │           ├── <span class="file">scene.gltf</span>             ← Capacitor/Inductor/LED model
    │           └── <span class="file">scene.bin</span>
    │
    └── <span class="dir">dist/</span>                                ← BUILD OUTPUT (auto-generated)
        ├── <span class="file">index.html</span>                    ← Bundled HTML
        └── <span class="dir">assets/</span>
            ├── <span class="file">main-[hash].js</span>             ← Bundled JS (~794 KB)
            └── <span class="file">main-[hash].css</span>            ← Bundled CSS (~23 KB)
</div>

  <!-- PAGE BREAK -->
  <div class="page-break"></div>

  <!-- ══════════════════ SEC 3: ARCHITECTURE ══════════════════ -->
  <h2>3. System Architecture &amp; Data Flow</h2>

  <div class="section-box green">
    <h4>High-Level Architecture</h4>
    <div class="flow">
      <div class="flow-box">Browser<br><small style="color:#93c5fd">Three.js App</small></div>
      <span class="flow-arrow">⟵ static files ⟶</span>
      <div class="flow-box blue">Python Server<br><small style="color:#93c5fd">port 5000</small></div>
      <span class="flow-arrow">←</span>
      <div class="flow-box orange">dist/<br><small style="color:#fca5a5">built frontend</small></div>
    </div>
    <div class="flow" style="margin-top:6px;">
      <div class="flow-box">JS Frontend<br><small style="color:#93c5fd">calculateCircuitLocal()</small></div>
      <span class="flow-arrow">OR POST /api/calculate →</span>
      <div class="flow-box blue">PhysicsEngine<br><small style="color:#93c5fd">physics_engine.py</small></div>
      <span class="flow-arrow">→</span>
      <div class="flow-box green">JSON Response<br><small style="color:#86efac">{V,I,Z,P,phi,f0}</small></div>
    </div>
  </div>

  <h3>Complete Request Lifecycle</h3>
  <table>
    <tr><th>Step</th><th>Who</th><th>What Happens</th><th>File</th></tr>
    <tr><td>1</td><td>User</td><td>Selects experiment from dropdown</td><td>index.html → main.js</td></tr>
    <tr><td>2</td><td>JS</td><td><code>setupExperiment(expKey)</code> called — loads theory, steps, viva, resets 3D scene</td><td>main.js ~line 1100</td></tr>
    <tr><td>3</td><td>User</td><td>Drags components from sidebar onto 3D breadboard</td><td>main.js → createComponentVisuals()</td></tr>
    <tr><td>4</td><td>User</td><td>Draws wires between component terminals</td><td>main.js → createWireVisuals()</td></tr>
    <tr><td>5</td><td>User</td><td>Clicks "▶ Simulate" button</td><td>index.html #btn-run</td></tr>
    <tr><td>6</td><td>JS</td><td><code>validateCircuitLocal()</code> checks topology using Union-Find algorithm</td><td>main.js ~line 3100</td></tr>
    <tr><td>7</td><td>JS</td><td>If valid → <code>startPollingCalculations()</code> begins 250ms timer loop</td><td>main.js ~line 575</td></tr>
    <tr><td>8</td><td>JS</td><td>Every 250ms: <code>calculateCircuitLocal()</code> computes V, I, Z, P</td><td>main.js ~line 515</td></tr>
    <tr><td>9</td><td>JS</td><td><code>updateUI()</code> updates meters, LED glow, electron animation speed</td><td>main.js ~line 621</td></tr>
    <tr><td>10</td><td>User</td><td>Clicks "⬤ Record" — appends data point to table and graph</td><td>main.js → drawObservationTable()</td></tr>
    <tr><td>11</td><td>JS</td><td>After 5 points (Ohm's) or threshold met → Conclusion auto-generated</td><td>main.js ~line 2980</td></tr>
    <tr><td>12</td><td>User</td><td>Clicks "↓ Download Lab Report" → <code>generateLabReportPDF()</code></td><td>main.js ~line 2185</td></tr>
  </table>

  <!-- ══════════════════ SEC 4: PYTHON FILES ══════════════════ -->
  <h2>4. Python Backend — All Files Explained</h2>

  <div class="section-box">
    <h3>📌 main.py — Entry Point</h3>
    <p><strong>Role:</strong> The only file you need to run. Adds the directory to <code>sys.path</code> and calls <code>start_server(port=5000)</code> from server.py.</p>
    <pre><span class="cm"># HOW TO RUN:</span>
<span class="kw">python</span> Circuit-IQ/main.py
<span class="cm"># → Starts server at http://localhost:5000</span>
<span class="cm"># → Auto-opens browser with the 3D app</span></pre>
  </div>

  <div class="section-box">
    <h3>🌐 server.py — HTTP Server</h3>
    <p><strong>Role:</strong> Extends Python's <code>SimpleHTTPRequestHandler</code> to serve the frontend and handle two POST API routes.</p>
    <table>
      <tr><th>Route</th><th>Method</th><th>Called When</th><th>Handler</th></tr>
      <tr><td><code>/*</code></td><td>GET</td><td>Browser loads pages/assets</td><td>SimpleHTTPRequestHandler (serves dist/)</td></tr>
      <tr><td><code>/api/validate</code></td><td>POST</td><td>User clicks Simulate</td><td><code>handle_validate()</code> → PhysicsEngine.validate_circuit()</td></tr>
      <tr><td><code>/api/calculate</code></td><td>POST</td><td>Polling every 250ms</td><td><code>handle_calculate()</code> → PhysicsEngine.calculate()</td></tr>
    </table>
    <p><strong>Important:</strong> The server reads <code>DIST_DIR = ../Circuit-IQ-3D/dist/</code>. The frontend must be built with <code>npm run build</code> first.</p>
  </div>

  <div class="section-box">
    <h3>⚡ physics_engine.py — Physics Calculator</h3>
    <p><strong>Role:</strong> All circuit math lives here. Called by server.py handlers.</p>
    <table>
      <tr><th>Method</th><th>Does</th><th>Returns</th></tr>
      <tr><td><code>set_param(key, value)</code></td><td>Set R, L, C, V, f, T</td><td>—</td></tr>
      <tr><td><code>calculate(exp, pressed)</code></td><td>Main calculation dispatcher</td><td>dict: V, I, Z, P, XL, XC, phi, f0, R_eff</td></tr>
      <tr><td><code>validate_circuit(comps, wires, req)</code></td><td>DFS closed-loop check</td><td>(bool, message)</td></tr>
      <tr><td><code>update_energy(P, dt)</code></td><td>Accumulate energy E=P×dt</td><td>float (joules)</td></tr>
    </table>
    <div class="section-box orange" style="margin-top:8px;">
      <h4>Temperature Correction Formula</h4>
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;">R_eff = R × (1 + α × (T − 25))    where α = 0.00393 / °C (copper)</p>
      <p>At T=25°C → R_eff = R (no change). At T=125°C, R=100Ω → R_eff = 139.3Ω</p>
    </div>
  </div>

  <div class="section-box">
    <h3>🤖 ai_guide.py — AI Content Module</h3>
    <p><strong>Role:</strong> Contains all educational content for the Python backend version. The JS frontend has its own inline copy (in main.js <code>experiments{}</code>).</p>
    <ul>
      <li><code>EXPERIMENTS{}</code> — theory HTML, steps, viva Q&amp;A, formulas, conclusion for each experiment</li>
      <li><code>HINTS{}</code> — 3 contextual hints per experiment</li>
      <li><code>evaluate_steps_progress()</code> — Returns (progress%, score, step_message) based on placed components + wires</li>
    </ul>
  </div>

  <div class="page-break"></div>

  <!-- ══════════════════ SEC 5: FRONTEND FILES ══════════════════ -->
  <h2>5. 3D Frontend — All Files Explained</h2>

  <div class="section-box">
    <h3>🏠 index.html — HTML Shell</h3>
    <p>Contains the complete UI layout. All panels, buttons, dropdowns are here. JavaScript logic is in main.js. Key structure:</p>
    <table>
      <tr><th>Element ID</th><th>Location</th><th>Purpose</th></tr>
      <tr><td><code>#topbar</code></td><td>Top bar</td><td>Logo, experiment selector, Run/Stop/Record buttons, score</td></tr>
      <tr><td><code>#left-panel</code></td><td>Left (230px)</td><td>Component search + sidebar chips + inspector</td></tr>
      <tr><td><code>#center-panel</code></td><td>Center (flex:1)</td><td>Three.js 3D canvas container</td></tr>
      <tr><td><code>#right-panel</code></td><td>Right (280px)</td><td>Lab panel (tabs) + AI chat + Meters panel</td></tr>
      <tr><td><code>#lab-panel</code></td><td>Right top</td><td>Theory / Steps / Table / Graph / Viva / Conclusion tabs</td></tr>
      <tr><td><code>#ai-panel</code></td><td>Right bottom</td><td>AI mentor chat messages + input</td></tr>
      <tr><td><code>#meters-panel</code></td><td>Floating</td><td>Voltage, Current, Resistance, Power, Energy meters</td></tr>
      <tr><td><code>#osc-panel-float</code></td><td>Floating</td><td>Oscilloscope waveform panel</td></tr>
      <tr><td><code>#graph-panel-float</code></td><td>Floating</td><td>V-I / f-Z graph panel</td></tr>
    </table>
  </div>

  <div class="section-box">
    <h3>🎨 style.css — Design System</h3>
    <p><strong>728+ lines</strong> of CSS. Uses CSS custom properties for the entire design token system.</p>
    <table>
      <tr><th>Token</th><th>Value</th><th>Used For</th></tr>
      <tr><td><code>--bg</code></td><td>#1a1a1f</td><td>Main background</td></tr>
      <tr><td><code>--bg2</code></td><td>#111116</td><td>Sidebar / panel backgrounds</td></tr>
      <tr><td><code>--accent</code></td><td>#00d084</td><td>Primary green — run button, active state, correct answers</td></tr>
      <tr><td><code>--red</code></td><td>#ef4444</td><td>Stop button, errors, wrong answers</td></tr>
      <tr><td><code>--border</code></td><td>#2e2e38</td><td>All panel borders</td></tr>
      <tr><td><code>--text</code></td><td>#e8e8f0</td><td>Primary text</td></tr>
      <tr><td><code>--text2</code></td><td>#8888a0</td><td>Secondary / muted labels</td></tr>
    </table>
    <p style="margin-top:8px;"><strong>Fonts:</strong> <code>Inter</code> (UI) and <code>JetBrains Mono</code> (values, formulas, code) — loaded from Google Fonts CDN in index.html.</p>
  </div>

  <div class="section-box">
    <h3>📦 package.json — NPM Config</h3>
    <pre>{
  <span class="st">"name"</span>: <span class="st">"circuit-iq-3d"</span>,
  <span class="st">"scripts"</span>: {
    <span class="st">"dev"</span>:   <span class="st">"vite"</span>,          <span class="cm">← npm run dev   → http://localhost:5173 (hot reload)</span>
    <span class="st">"build"</span>: <span class="st">"vite build"</span>,    <span class="cm">← npm run build → writes to dist/</span>
    <span class="st">"preview"</span>: <span class="st">"vite preview"</span>  <span class="cm">← npm run preview → preview dist/ locally</span>
  },
  <span class="st">"dependencies"</span>: { <span class="st">"three"</span>: <span class="st">"^0.184.0"</span> },
  <span class="st">"devDependencies"</span>: { <span class="st">"vite"</span>: <span class="st">"^8.0.12"</span> }
}</pre>
  </div>

  <div class="section-box">
    <h3>📂 public/models/ — 3D GLTF Assets</h3>
    <table>
      <tr><th>Folder</th><th>Contents</th><th>Used For</th></tr>
      <tr><td><code>breadboard/</code></td><td>scene.gltf + scene.bin + textures/</td><td>The main breadboard 3D mesh (PBR material)</td></tr>
      <tr><td><code>resistor/</code></td><td>scene.gltf + scene.bin</td><td>Resistor component 3D model template</td></tr>
      <tr><td><code>electronic_components/</code></td><td>scene.gltf + scene.bin + textures/</td><td>Capacitor, inductor, LED base models</td></tr>
    </table>
    <p>Models are loaded using Three.js <code>GLTFLoader</code> at app startup. Each model is cloned when placed on the breadboard.</p>
  </div>

  <div class="page-break"></div>

  <!-- ══════════════════ SEC 6: MAIN.JS MAP ══════════════════ -->
  <h2>6. main.js — Full Section Map (8200+ lines)</h2>
  <div class="info-box">💡 In your editor, search for <code>// ---</code> followed by the section name to jump directly to it.</div>

  <table>
    <tr><th>Line ~</th><th>Section Name</th><th>What It Contains</th></tr>
    <tr><td>1</td><td>File Header</td><td>Full architecture docs, section index, state object reference</td></tr>
    <tr><td>80</td><td>IMPORTS &amp; 3D TEMPLATES</td><td><code>import THREE, GLTFLoader</code>; model template variables</td></tr>
    <tr><td>100</td><td>STATE MANAGEMENT</td><td><code>const state = {}</code> — all app state (components, wires, params, meters)</td></tr>
    <tr><td>165</td><td>ELECTRON ANIMATION</td><td><code>setElectronsActive()</code> — toggles electron flow animation</td></tr>
    <tr><td>175</td><td>DOM ELEMENTS</td><td><code>const elements = {}</code> — all getElementById references</td></tr>
    <tr><td>250</td><td>EXPERIMENT DATA</td><td><code>const experiments = {}</code> — theory, aim, apparatus, steps, formulas (all 4)</td></tr>
    <tr><td>580</td><td>ASSESSMENT QUESTIONS</td><td><code>const assessmentQuestions = {}</code> — viva Q&amp;A with explanations (all 4)</td></tr>
    <tr><td>670</td><td>CIRCUIT SIMULATION</td><td><code>calculateCircuitLocal()</code> — JS-side physics math (mirrors physics_engine.py)</td></tr>
    <tr><td>730</td><td>POLLING ENGINE</td><td><code>startPollingCalculations()</code> / <code>stopPollingCalculations()</code> — 250ms timer</td></tr>
    <tr><td>780</td><td>UI UPDATES</td><td><code>updateUI()</code> — refreshes all meter displays, LED glow, progress bar</td></tr>
    <tr><td>850</td><td>TAB ROUTER</td><td><code>initTabRouter()</code> — Lab panel tab switching (Theory/Steps/Table/etc.)</td></tr>
    <tr><td>900</td><td>OBSERVATION TABLE</td><td><code>drawObservationTable()</code> — renders recorded data in HTML table</td></tr>
    <tr><td>950</td><td>AI MENTOR</td><td><code>appendAIMessage()</code>, <code>updateAIMentor()</code> — chat messages</td></tr>
    <tr><td>1100</td><td>SETUP EXPERIMENT</td><td><code>setupExperiment(expKey)</code> — resets scene, loads theory+steps+viva</td></tr>
    <tr><td>1600</td><td>SEARCH / SIDEBAR</td><td><code>updateComponentSidebar()</code> — filter component chips by search</td></tr>
    <tr><td>1900</td><td>FLOATING PANELS</td><td><code>makeDraggable()</code> — draggable meters, osc, graph panels</td></tr>
    <tr><td>2185</td><td>PDF LAB REPORT</td><td><code>generateLabReportPDF()</code> — builds full HTML report → browser print</td></tr>
    <tr><td>2420</td><td>HD GRAPH DOWNLOAD</td><td><code>downloadGraphHD()</code> — renders 2000×1500px graph PNG</td></tr>
    <tr><td>2620</td><td>HD OSC DOWNLOAD</td><td><code>downloadOscilloscopeHD()</code> — renders 2000×1200px oscilloscope PNG</td></tr>
    <tr><td>2700</td><td>EVENT LISTENERS</td><td>All click/change/input handlers for buttons, sliders, chips</td></tr>
    <tr><td>3050</td><td>CIRCUIT VALIDATION</td><td><code>validateCircuitLocal()</code> — breadboard hole connectivity check</td></tr>
    <tr><td>3200</td><td>UNION-FIND</td><td><code>runUnionFind()</code> — breadboard bus/rail connectivity algorithm</td></tr>
    <tr><td>3400</td><td>SNAP POSITIONS</td><td><code>getSnapPos()</code> — maps hole index to 3D XYZ coordinates</td></tr>
    <tr><td>3550</td><td>STEP COMPLETION</td><td><code>completeStep(n)</code>, <code>updateProgress()</code> — procedure steps tracker</td></tr>
    <tr><td>3800</td><td>EXPERIMENT AUTO-BUILD</td><td><code>autoSetupExperiment()</code> — pre-places components for demo</td></tr>
    <tr><td>4200</td><td>3D SCENE SETUP</td><td><code>initScene()</code> — Three.js renderer, camera, lighting, OrbitControls</td></tr>
    <tr><td>4500</td><td>BREADBOARD 3D</td><td><code>createBreadboard3D()</code> — 63×10 hole grid, power rails, GLTF base</td></tr>
    <tr><td>4800</td><td>WIRE VISUALS</td><td><code>createWireVisuals()</code>, <code>updateWireVisuals()</code> — 3D wire tubes</td></tr>
    <tr><td>5100</td><td>COMPONENT VISUALS</td><td><code>createComponentVisuals(type)</code> — 3D meshes for each component type</td></tr>
    <tr><td>5700</td><td>ANIMATION LOOP</td><td><code>function anim()</code> — requestAnimationFrame render loop</td></tr>
    <tr><td>6000</td><td>GRAPH DRAW</td><td><code>drawGraph()</code> — HTML5 Canvas V-I / f-Z plot</td></tr>
    <tr><td>6200</td><td>OSCILLOSCOPE DRAW</td><td><code>drawOscilloscope()</code> — animated sinusoidal waveform</td></tr>
    <tr><td>6600</td><td>INSPECTOR</td><td><code>updateInspector()</code> — right panel component property display</td></tr>
    <tr><td>6800</td><td>TOOLBOX VISIBILITY</td><td><code>updateToolboxVisibility(exp)</code> — shows/hides components per experiment</td></tr>
    <tr><td>6900</td><td>RESISTOR BANDS</td><td><code>updateResistorColorBands()</code> — dynamic resistor color code rendering</td></tr>
    <tr><td>7100</td><td>ARDUINO MODEL</td><td><code>createArduinoUno()</code> — 3D Arduino Uno board with labeled pins</td></tr>
    <tr><td>7300</td><td>DYNAMIC TEXTURES</td><td><code>updateDynamicTextures()</code> — canvas-based LCD/screen textures</td></tr>
    <tr><td>7500</td><td>MAIN INIT</td><td><code>window.addEventListener('load', ...)</code> — app bootstrap</td></tr>
  </table>

  <!-- ══════════════════ SEC 7: API ══════════════════ -->
  <h2>7. REST API Endpoints</h2>

  <div class="section-box">
    <h3>POST /api/calculate</h3>
    <p>Called every 250ms while simulation is running. Returns all circuit electrical quantities.</p>
    <pre><span class="cm">// Request Body (JSON)</span>
{
  <span class="st">"params"</span>: { <span class="st">"V"</span>: 12, <span class="st">"R"</span>: 100, <span class="st">"L"</span>: 50, <span class="st">"C"</span>: 100, <span class="st">"f"</span>: 50, <span class="st">"T"</span>: 25 },
  <span class="st">"active_experiment"</span>: <span class="st">"ohms"</span>,  <span class="cm">← "ohms" | "lcr" | "rc"</span>
  <span class="st">"button_pressed"</span>: <span class="kw">true</span>
}

<span class="cm">// Response Body (JSON)</span>
{
  <span class="st">"V"</span>: 12.0,    <span class="st">"I"</span>: 0.12,   <span class="st">"Z"</span>: 100.0,
  <span class="st">"P"</span>: 1.44,    <span class="st">"XL"</span>: 0.0,   <span class="st">"XC"</span>: 0.0,
  <span class="st">"phi"</span>: 0.0,   <span class="st">"f0"</span>: 0.0,   <span class="st">"R_eff"</span>: 100.0,  <span class="st">"R_nominal"</span>: 100.0
}</pre>
  </div>

  <div class="section-box">
    <h3>POST /api/validate</h3>
    <p>Called once when user clicks Simulate. Checks if circuit topology is a valid closed loop.</p>
    <pre><span class="cm">// Request Body</span>
{
  <span class="st">"placed_components"</span>: [
    { <span class="st">"type"</span>: <span class="st">"source"</span>, <span class="st">"id"</span>: 0 },
    { <span class="st">"type"</span>: <span class="st">"resistor"</span>, <span class="st">"id"</span>: 1 }
  ],
  <span class="st">"wires"</span>: [[[0,1],[1,0]], [[1,1],[0,0]]],  <span class="cm">← [[from_comp,from_term],[to_comp,to_term]]</span>
  <span class="st">"required_types"</span>: [<span class="st">"source"</span>, <span class="st">"resistor"</span>]
}

<span class="cm">// Response</span>
{ <span class="st">"status"</span>: <span class="st">"success"</span>, <span class="st">"message"</span>: <span class="st">"Circuit verification successful! System ready."</span> }
{ <span class="st">"status"</span>: <span class="st">"fail"</span>,    <span class="st">"message"</span>: <span class="st">"Circuit loop is not closed."</span> }</pre>
  </div>

  <div class="page-break"></div>

  <!-- ══════════════════ SEC 8: EXPERIMENTS ══════════════════ -->
  <h2>8. The 4 Experiments — How Each Works</h2>

  <table>
    <tr>
      <th>Key</th>
      <th>Name</th>
      <th>Type</th>
      <th>Required Components</th>
      <th>Physics Formula</th>
      <th>Graph</th>
    </tr>
    <tr>
      <td><code>ohms</code></td>
      <td>Ohm's Law</td>
      <td><span class="badge badge-blue">DC</span></td>
      <td>Source + Resistor</td>
      <td>I = V/R, P = V×I</td>
      <td>V vs I → straight line (slope = R)</td>
    </tr>
    <tr>
      <td><code>lcr</code></td>
      <td>Series LCR Resonance</td>
      <td><span class="badge badge-orange">AC</span></td>
      <td>Source + R + L + C</td>
      <td>Z = √(R²+(XL−XC)²), f₀ = 1/(2π√LC)</td>
      <td>f vs Z → U-shaped curve (min at f₀)</td>
    </tr>
    <tr>
      <td><code>rc</code></td>
      <td>RC Time Constant</td>
      <td><span class="badge badge-orange">AC</span></td>
      <td>Source + R + C</td>
      <td>τ = RC, Vc(t) = Vs(1−e^(−t/τ))</td>
      <td>t vs Vc → exponential charge curve</td>
    </tr>
  </table>

  <div class="section-box">
    <h3>Experiment Data Structure (in main.js)</h3>
    <pre><span class="kw">const</span> experiments = {
  <span class="st">'ohms'</span>: {
    name:       <span class="st">"Ohm's Law Verification"</span>,
    aim:        <span class="st">"To verify Ohm's Law..."</span>,
    apparatus:  <span class="st">"DC Power Supply, Resistors, Multimeter..."</span>,
    theory:     <span class="st">"&lt;h3&gt;Statement...&lt;/h3&gt;..."</span>,   <span class="cm">← HTML string</span>
    formulas:   [{ name: <span class="st">"Ohm's Law"</span>, expr: <span class="st">"V = I × R"</span> }, ...],
    steps:      [{ id: 1, text: <span class="st">"Connect source..."</span> }, ...],   <span class="cm">← 7–8 steps each</span>
  }
};

<span class="kw">const</span> assessmentQuestions = {
  <span class="st">'ohms'</span>: [
    {
      q:           <span class="st">"Ohm's Law states that..."</span>,
      options:     [<span class="st">"A"</span>, <span class="st">"B"</span>, <span class="st">"C"</span>, <span class="st">"D"</span>],
      correct:     1,                              <span class="cm">← index of correct option</span>
      explanation: <span class="st">"Because current is directly..."</span>  <span class="cm">← shown after answering</span>
    },
    ...  <span class="cm">← 7 questions for Ohm's, 5 for others</span>
  ]
};</pre>
  </div>

  <!-- ══════════════════ SEC 9: 3D SCENE ══════════════════ -->
  <h2>9. 3D Scene Architecture</h2>

  <div class="section-box">
    <h3>Three.js Scene Hierarchy</h3>
    <pre>THREE.Scene
├── AmbientLight           (soft fill light)
├── DirectionalLight × 3   (key + fill + rim)
├── PointLight             (component glow when active)
│
├── scene.rotation.y       (user rotates entire scene)
│
├── breadboardMesh         (GLTF model, PBR material + breadboard texture)
├── holeMeshes[]           (63×10 = 630 cylinder holes + power rail holes)
│   └── each hole: THREE.CylinderGeometry, highlighted on hover
│
├── placedComponents[]     (user-placed components)
│   └── each: { mesh: THREE.Group, leads: [cylMesh, cylMesh], snap1, snap2 }
│       ├── Resistor:   GLTF clone + color bands texture
│       ├── Capacitor:  GLTF clone (electronic_components model)
│       ├── Inductor:   Torus geometry procedural
│       ├── LED:        Sphere geometry + EmissiveMaterial (glows)
│       ├── Switch:     Box geometry (changes color when pressed)
│       └── Arduino:    Custom procedural board (createArduinoUno)
│
├── wires[]                (user-drawn wires)
│   └── each: { lineMesh: THREE.Line (TubeGeometry), electrons: [sphere×8] }
</pre>
  </div>

  <div class="section-box">
    <h3>Breadboard Hole Grid</h3>
    <p><strong>63 columns × 10 rows = 630 main holes</strong> + 4 power rail strips.</p>
    <p>Each hole is a <code>THREE.CylinderGeometry(0.06, 0.06, 0.1)</code> with a black <code>MeshStandardMaterial</code>. The Union-Find algorithm tracks which holes are electrically connected via the internal bus strips.</p>
    <p><strong>Snapping:</strong> <code>getSnapPos(holeIndex)</code> maps hole index → 3D {x, y, z}. Components are placed at multiples of the hole pitch (0.254 units = 2.54mm breadboard standard).</p>
  </div>

  <!-- ══════════════════ SEC 10: LAB PANEL ══════════════════ -->
  <h2>10. Lab Panel — How Each Tab Works</h2>

  <table>
    <tr><th>Tab</th><th>Element ID</th><th>Content Source</th><th>Key Function</th></tr>
    <tr>
      <td>📖 Theory</td>
      <td><code>#sub-theory</code></td>
      <td><code>experiments[key].theory</code> HTML string + aim + apparatus block</td>
      <td><code>setupExperiment()</code></td>
    </tr>
    <tr>
      <td>📋 Steps</td>
      <td><code>#sub-steps</code></td>
      <td><code>experiments[key].steps[]</code> — rendered as step cards</td>
      <td><code>completeStep(n)</code> marks steps done</td>
    </tr>
    <tr>
      <td>📊 Table</td>
      <td><code>#sub-table</code></td>
      <td><code>state.dataPoints[]</code> — added by Record button</td>
      <td><code>drawObservationTable()</code></td>
    </tr>
    <tr>
      <td>∿ Graph</td>
      <td><code>#sub-graph-tab</code></td>
      <td>HTML5 Canvas — redrawn from <code>state.dataPoints[]</code></td>
      <td><code>drawGraph()</code>, <code>downloadGraphHD()</code></td>
    </tr>
    <tr>
      <td>❓ Viva</td>
      <td><code>#sub-viva</code></td>
      <td><code>assessmentQuestions[key][]</code> — radio MCQs</td>
      <td>On answer: shows ✓/✗ + explanation, updates score</td>
    </tr>
    <tr>
      <td>📝 Conclusion</td>
      <td><code>#sub-conclusion</code></td>
      <td>Auto-generated text after 5 data points (Ohm's) or on button press</td>
      <td>Sets <code>conclusionText.innerHTML</code></td>
    </tr>
    <tr>
      <td>📄 PDF Report</td>
      <td><code>#btn-report</code></td>
      <td>All of the above combined into a printable HTML page</td>
      <td><code>generateLabReportPDF()</code></td>
    </tr>
  </table>

  <div class="section-box green">
    <h4>PDF Report Contains:</h4>
    <p>1. Header (title, date, grade, score bar) &nbsp;|&nbsp; 2. Aim &amp; Apparatus &nbsp;|&nbsp; 3. Theory &amp; Formulas &nbsp;|&nbsp; 4. Procedure Steps &nbsp;|&nbsp; 5. Observation Table &nbsp;|&nbsp; 6. Graph Instructions &nbsp;|&nbsp; 7. All Viva Q&amp;A with answers &nbsp;|&nbsp; 8. Scientific Conclusion &nbsp;|&nbsp; 9. Grade Card</p>
  </div>

  <div class="page-break"></div>

  <!-- ══════════════════ SEC 11: STATE OBJECT ══════════════════ -->
  <h2>11. Key State Object Reference</h2>
  <p>All app state lives in a single <code>const state = {}</code> object in main.js. Never use global variables — always read/write via <code>state.*</code>.</p>

  <table>
    <tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr>
    <tr><td><code>state.activeExperiment</code></td><td>string</td><td>'ohms'</td><td>Current experiment key</td></tr>
    <tr><td><code>state.isRunning</code></td><td>bool</td><td>false</td><td>Is simulation active?</td></tr>
    <tr><td><code>state.placedComponents</code></td><td>array</td><td>[]</td><td>All placed 3D components {type, snap1, snap2, mesh, leads[]}</td></tr>
    <tr><td><code>state.wires</code></td><td>array</td><td>[]</td><td>All drawn wires {fromHole, toHole, lineMesh, electrons[]}</td></tr>
    <tr><td><code>state.dataPoints</code></td><td>array</td><td>[]</td><td>Recorded data {id, V, I, R, P, f, C}</td></tr>
    <tr><td><code>state.params.V</code></td><td>number</td><td>12.0</td><td>Source voltage (V)</td></tr>
    <tr><td><code>state.params.R</code></td><td>number</td><td>100</td><td>Resistance (Ω)</td></tr>
    <tr><td><code>state.params.L</code></td><td>number</td><td>50</td><td>Inductance (mH)</td></tr>
    <tr><td><code>state.params.C</code></td><td>number</td><td>100</td><td>Capacitance (µF)</td></tr>
    <tr><td><code>state.params.f</code></td><td>number</td><td>50</td><td>Frequency (Hz)</td></tr>
    <tr><td><code>state.params.T</code></td><td>number</td><td>25</td><td>Temperature (°C)</td></tr>
    <tr><td><code>state.meters.volts</code></td><td>number</td><td>0</td><td>Displayed voltage reading</td></tr>
    <tr><td><code>state.meters.amps</code></td><td>number</td><td>0</td><td>Displayed current reading</td></tr>
    <tr><td><code>state.meters.ohms</code></td><td>number</td><td>0</td><td>Displayed resistance/impedance</td></tr>
    <tr><td><code>state.meters.power</code></td><td>number</td><td>0</td><td>Displayed power (W)</td></tr>
    <tr><td><code>state.analysis.phi</code></td><td>number</td><td>0</td><td>Phase angle φ (degrees)</td></tr>
    <tr><td><code>state.analysis.f0</code></td><td>number</td><td>0</td><td>Resonant frequency f₀ (Hz)</td></tr>
    <tr><td><code>state.score</code></td><td>number</td><td>0</td><td>Points earned from viva answers</td></tr>
    <tr><td><code>state.selectedTool</code></td><td>string|null</td><td>null</td><td>Current placement tool</td></tr>
    <tr><td><code>state.selectedHoleIndex</code></td><td>number|null</td><td>null</td><td>Currently hovered/selected hole</td></tr>
    <tr><td><code>state.buttonPressed</code></td><td>bool</td><td>false</td><td>Arduino button state</td></tr>
    <tr><td><code>state.completedSteps</code></td><td>Set</td><td>new Set()</td><td>IDs of completed procedure steps</td></tr>
  </table>

  <!-- ══════════════════ SEC 12: HOW TO RUN ══════════════════ -->
  <h2>12. How to Run — Quick Start Guide</h2>

  <div class="section-box blue">
    <h3>Option A — Full Stack Mode (Python serves the built frontend)</h3>
    <pre><span class="cm"># Step 1: Install frontend dependencies (only once)</span>
<span class="kw">cd</span> <span class="st">"project phy/Circuit-IQ-3D"</span>
npm install

<span class="cm"># Step 2: Build the frontend (creates dist/ folder)</span>
npm run build

<span class="cm"># Step 3: Start the Python backend server</span>
<span class="kw">cd</span> <span class="st">".."</span>
python Circuit-IQ/main.py

<span class="cm"># → Opens http://localhost:5000 automatically in your browser</span>
<span class="cm"># → API at /api/calculate and /api/validate is live</span></pre>
  </div>

  <div class="section-box green">
    <h3>Option B — Frontend Dev Mode (hot-reload, no Python needed)</h3>
    <pre><span class="kw">cd</span> <span class="st">"project phy/Circuit-IQ-3D"</span>
npm run dev

<span class="cm"># → Opens http://localhost:5173</span>
<span class="cm"># → All calculations done in JavaScript (calculateCircuitLocal)</span>
<span class="cm"># → Any change to main.js or style.css reloads instantly</span></pre>
  </div>

  <div class="section-box">
    <h3>Option C — Run Physics Unit Tests</h3>
    <pre><span class="kw">cd</span> <span class="st">"project phy/Circuit-IQ"</span>
python test_physics.py

<span class="cm"># Expected output:</span>
<span class="cm"># .... (4 dots = 4 tests passed)</span>
<span class="cm"># OK</span></pre>
  </div>

  <hr class="divider">

  <!-- ══════════════════ SEC 13: CHEATSHEET ══════════════════ -->
  <h2>13. Developer Cheatsheet — Where to Make Changes</h2>

  <table>
    <tr><th>I want to change...</th><th>File to edit</th><th>What to search for</th></tr>
    <tr><td>Experiment theory text</td><td>main.js</td><td><code>const experiments = {</code> → <code>theory:</code> key</td></tr>
    <tr><td>Experiment steps</td><td>main.js</td><td><code>const experiments = {</code> → <code>steps:</code> array</td></tr>
    <tr><td>Viva questions / answers</td><td>main.js</td><td><code>const assessmentQuestions = {</code></td></tr>
    <tr><td>Physics formulas (displayed)</td><td>main.js</td><td><code>experiments[key].formulas</code></td></tr>
    <tr><td>Physics calculations</td><td>physics_engine.py</td><td><code>def calculate(self, exp_type</code></td></tr>
    <tr><td>Circuit validation logic</td><td>physics_engine.py</td><td><code>def validate_circuit(</code></td></tr>
    <tr><td>UI colors / theme</td><td>style.css</td><td><code>:root {</code> → CSS variables</td></tr>
    <tr><td>Add a new UI panel</td><td>index.html + style.css</td><td>Add HTML in right-panel or center</td></tr>
    <tr><td>API port number</td><td>main.py + server.py</td><td><code>start_server(port=5000)</code></td></tr>
    <tr><td>PDF report format</td><td>main.js</td><td><code>function generateLabReportPDF(</code></td></tr>
    <tr><td>Graph appearance</td><td>main.js</td><td><code>function downloadGraphHD(</code></td></tr>
    <tr><td>Oscilloscope appearance</td><td>main.js</td><td><code>function downloadOscilloscopeHD(</code></td></tr>
    <tr><td>AI mentor messages</td><td>main.js</td><td><code>function updateAIMentor(</code></td></tr>
    <tr><td>3D component shape</td><td>main.js</td><td><code>function createComponentVisuals(</code></td></tr>
    <tr><td>Breadboard hole grid</td><td>main.js</td><td><code>function createBreadboard3D(</code></td></tr>
    <tr><td>Add a new experiment</td><td>main.js + index.html</td><td>Add to <code>experiments{}</code> + <code>&lt;option&gt;</code> in select + physics_engine.py</td></tr>
    <tr><td>3D models</td><td>public/models/</td><td>Replace .gltf files (keep same structure)</td></tr>
    <tr><td>Fonts</td><td>index.html</td><td>Google Fonts <code>&lt;link&gt;</code> tag in &lt;head&gt;</td></tr>
    <tr><td>Build output folder</td><td>vite.config.js</td><td><code>outDir: 'dist'</code></td></tr>
  </table>

  <div class="highlight">
    ⚠️ <strong>After editing main.js or style.css in dev mode</strong> — changes appear instantly (hot reload). <br>
    After editing for production — run <code>npm run build</code> to update <code>dist/</code>, then restart Python server.
  </div>

  <hr class="divider">

  <div class="footer">
    Circuit IQ — Virtual Physics Lab · Full Project Documentation · Generated by generate_docs.py<br>
    Python Backend: Circuit-IQ/ · 3D Frontend: Circuit-IQ-3D/ · Build: Vite v8 · Runtime: Three.js r184
  </div>

</div>
</body>
</html>"""

# ──────────────────────────────────────────────────────────────────────────────
# Write to temp file and open in browser
# ──────────────────────────────────────────────────────────────────────────────

def main():
    # Write HTML to a temp file
    tmp_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "Circuit-IQ-3D",
        "circuit_iq_documentation.html"
    )
    
    with open(tmp_path, "w", encoding="utf-8") as f:
        f.write(HTML)
    
    print("=" * 60)
    print("  Circuit IQ -- Project Documentation Generator")
    print("=" * 60)
    print(f"\n[OK] Documentation written to:")
    print(f"  {tmp_path}")
    print(f"\n[OK] Opening in browser...")
    print(f"\n  -> Press Ctrl+P in the browser")
    print(f"  -> Select 'Save as PDF'")
    print(f"  -> Choose destination and save")
    print("\n" + "=" * 60)
    
    webbrowser.open(f"file:///{tmp_path.replace(os.sep, '/')}")


if __name__ == "__main__":
    main()
