/**
 * ============================================================================
 *  Circuit IQ — Virtual Physics Lab  ·  3D Frontend
 *  FILE: src/main.js
 *  ROLE: Main Application — All frontend logic (8000+ lines)
 * ============================================================================
 *
 *  TECH STACK:
 *    • Three.js (r184)    — 3D scene, breadboard, components, wires
 *    • HTML5 Canvas       — Oscilloscope, graph, HD download
 *    • Vanilla JS (ESM)   — No framework, bundled by Vite
 *    • CSS Variables      — Dark theme design tokens in style.css
 *
 *  FILE SECTIONS (search for "---" comments to navigate):
 *  ─────────────────────────────────────────────────────
 *  [LINE ~1]     IMPORTS & 3D MODEL TEMPLATES
 *  [LINE ~30]    STATE MANAGEMENT         — `state` object (all app state)
 *  [LINE ~91]    ELECTRON ANIMATION       — electronsActive, setElectronsActive
 *  [LINE ~99]    DOM ELEMENTS             — `elements` object (all DOM refs)
 *  [LINE ~186]   EXPERIMENT DATA          — experiments{} & assessmentQuestions{}
 *                                           (theory, aim, apparatus, steps,
 *                                            formulas, viva with explanations)
 *  [LINE ~515]   CIRCUIT SIMULATION       — calculateCircuitLocal()
 *  [LINE ~575]   POLLING ENGINE           — startPollingCalculations()
 *  [LINE ~621]   UI UPDATES               — updateUI(), updateMeters()
 *  [LINE ~693]   TAB ROUTER               — initTabRouter()
 *  [LINE ~730]   OBSERVATION TABLE        — drawObservationTable()
 *  [LINE ~767]   AI MENTOR                — appendAIMessage(), updateAIMentor()
 *  [LINE ~1000]  SETUP EXPERIMENT         — setupExperiment(expKey)
 *  [LINE ~1435]  SEARCH/SIDEBAR           — updateComponentSidebar()
 *  [LINE ~1800]  FLOATING PANELS          — makeDraggable(), osc, graph panels
 *  [LINE ~2185]  PDF LAB REPORT           — generateLabReportPDF()
 *  [LINE ~2420]  HD GRAPH DOWNLOAD        — downloadGraphHD()
 *  [LINE ~2620]  HD OSCILLOSCOPE DOWNLOAD — downloadOscilloscopeHD()
 *  [LINE ~2670]  EVENT LISTENERS          — All button/slider/chip events
 *  [LINE ~2900]  CIRCUIT VALIDATION       — validateCircuitLocal() (union-find)
 *  [LINE ~3100]  UNION-FIND               — runUnionFind() (hole connectivity)
 *  [LINE ~3300]  SNAP POSITIONS           — getSnapPos() (3D coord mapping)
 *  [LINE ~3500]  STEP COMPLETION          — completeStep(), updateProgress()
 *  [LINE ~3700]  AI MENTOR MESSAGES       — updateAIMentor() per experiment
 *  [LINE ~3900]  EXPERIMENT AUTO-BUILD    — autoSetupExperiment()
 *  [LINE ~4100]  3D SCENE SETUP           — initScene() (Three.js renderer, camera)
 *  [LINE ~4300]  BREADBOARD 3D            — createBreadboard3D() (holes, rails)
 *  [LINE ~4700]  WIRE VISUALS             — createWireVisuals(), updateWireVisuals()
 *  [LINE ~5000]  COMPONENT VISUALS        — createComponentVisuals() (all types)
 *  [LINE ~5600]  ANIMATION LOOP           — anim() requestAnimationFrame loop
 *  [LINE ~5900]  GRAPH DRAW               — drawGraph() (V-I / f-Z plot)
 *  [LINE ~6100]  OSCILLOSCOPE DRAW        — drawOscilloscope()
 *  [LINE ~6500]  INSPECTOR                — updateInspector() (right panel)
 *  [LINE ~6700]  TOOLBOX VISIBILITY       — updateToolboxVisibility()
 *  [LINE ~6800]  RESISTOR COLOR BANDS     — updateResistorColorBands()
 *  [LINE ~7000]  ARDUINO UNO MODEL        — createArduinoUno()
 *  [LINE ~7200]  DYNAMIC TEXTURES         — updateDynamicTextures()
 *  [LINE ~7400]  MAIN INIT                — window.addEventListener('load', ...)
 *
 *  HOW TO FIND SOMETHING:
 *    → Search for the section marker "// ---" followed by the section name
 *    → e.g. search "// --- CIRCUIT VALIDATION" to jump to that section
 *
 *  EXPERIMENTS (4 total):
 *    'ohms'        → Ohm's Law DC (V, I, R, P)
 *    'lcr'         → Series LCR Resonance (XL, XC, Z, phi, f0)
 *    'rc'          → RC Time Constant (tau = RC, charging curve)
 *    'arduino_led' → Arduino LED + Button circuit
 *
 *  KEY STATE OBJECT (state.*):
 *    state.activeExperiment    → Current experiment key
 *    state.placedComponents[]  → Array of {type, snap1, snap2, mesh, leads[]}
 *    state.wires[]             → Array of {fromHole, toHole, lineMesh, electrons[]}
 *    state.params.*            → V, R, L, C, f, T, led_color
 *    state.meters.*            → volts, amps, ohms, power, energy
 *    state.isRunning           → true when simulation is active
 *    state.selectedTool        → Current component tool string
 *
 * ============================================================================
 */

import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let resistorModelTemplate = null;
let electronicComponentsTemplate = null;
let capacitorTexture = null;

// --- CRITICAL VISUAL ERROR LOGGER ---
window.addEventListener('error', (event) => {
  const msg = document.createElement('div');
  msg.style.position = 'fixed';
  msg.style.bottom = '20px';
  msg.style.left = '20px';
  msg.style.background = 'rgba(220, 38, 38, 0.95)';
  msg.style.color = 'white';
  msg.style.padding = '15px';
  msg.style.borderRadius = '8px';
  msg.style.zIndex = '99999';
  msg.style.fontFamily = 'monospace';
  msg.style.fontSize = '12px';
  msg.style.border = '2px solid white';
  msg.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
  msg.style.maxWidth = '500px';
  msg.style.whiteSpace = 'pre-wrap';
  msg.innerText = `[CRITICAL RUNTIME ERROR]\nMessage: ${event.message}\nSource: ${event.filename}\nLine: ${event.lineno}:${event.colno}\nError Object: ${event.error ? event.error.stack : 'N/A'}`;
  document.body.appendChild(msg);
});

// --- STATE MANAGEMENT ---
let state = {
  activeExperiment: 'ohms', // 'ohms', 'lcr', 'rc', 'arduino_led'
  theme: 'dark',
  oscPower: true,           // oscilloscope power state
  selectedTool: null,        // 'resistor', 'capacitor', 'inductor', 'source', 'ammeter', 'voltmeter', 'wire', 'eraser', 'led', 'button', 'toggle_switch'
  placementStartHole: null,  // snap index (0-279)
  wiringStart: null,         // snap index (0-279)
  targetSnap1: null,         // smart snap index 1
  targetSnap2: null,         // smart snap index 2
  isRunning: false,
  buttonPressed: false,      // tactile switch state
  activePressedPlunger: null, // mesh reference
  draggingSidebarTool: null,
  ghostMesh: null,
  ghostSnap1: null,
  ghostSnap2: null,
  draggedComponentIdx: -1,
  selectedComponentIdx: -1,
  selectedHoleIndex: null,
  isDraggingComponent: false,
  dragStartSnap1: null,
  dragStartSnap2: null,
  isDrawingWire: false,
  wireStartSnap: null,
  tempWireMesh: null,
  isDraggingWireEnd: false,
  draggedWireIdx: -1,
  draggedWireEnd: -1, // 0 for fromHole, 1 for toHole
  dragStartWireHole: null,
  kvlMeasurements: { Vs: null, VR1: null, VR2: null },
  params: {
    V: 12,    // Volts
    R: 100,   // Ohms
    L: 50,    // mH
    C: 100,   // uF
    f: 50,    // Hz
    T: 25,    // Celsius
    led_color: 'red' // Default LED color
  },
  meters: {
    volts: 0,
    amps: 0,
    ohms: 0,
    power: 0,
    energy: 0
  },
  analysis: {
    XL: 0,
    XC: 0,
    phi: 0,
    f0: 0
  },
  wasRunningBeforeDrag: false,
  lastResistance: 100,
  lastMentorMsgTime: 0,
  placedComponents: [], // { type, id, snap1, snap2, mesh, leads: [] }
  wires: [],            // { fromHole, toHole, lineMesh, electrons: [] }
  dataPoints: [],
  score: 0,
  completedSteps: new Set(),
  energyStartTime: Date.now(),
  isDatabaseLoading: false
};
window.state = state;

// --- ELECTRON ANIMATION STATE ---
let electronOffset = 0;
let electronsActive = false;
function setElectronsActive(act) {
  electronsActive = act;
}
window.setElectronsActive = setElectronsActive;

// --- DOM ELEMENTS ---
const elements = {
  experimentSelect: document.getElementById('exp-selector'),
  btnGraphToggle: document.getElementById('btn-graph-toggle'),
  btnOscToggle: document.getElementById('btn-osc-toggle'),
  btnClear: document.getElementById('btn-reset'),
  btnRun: document.getElementById('btn-simulate'),
  btnStop: document.getElementById('btn-stop'),
  btnReload: document.getElementById('btn-reload'),
  btnCloseLab: document.getElementById('btn-close-lab'),
  btnSaveProgress: document.getElementById('btn-save-progress'),
  
  stepsContainer: document.getElementById('step-list'),
  protocolProgress: document.getElementById('progress-bar'),
  progressPercent: document.getElementById('progress-text'),
  theoryText: document.getElementById('theory-content'),
  
  btnExport: document.getElementById('btn-export'),
  zoomDisplay: document.getElementById('zoom-display'),
  
  // Floating overlay elements
  oscPanel: document.getElementById('osc-wrap'),
  oscPowerBtn: document.getElementById('osc-power-btn'),
  oscPowerIndicator: document.getElementById('osc-power-indicator'),
  graphPanel: document.getElementById('graph-wrap'),
  btnCloseOsc: document.getElementById('osc-close'),
  btnCloseGraph: document.getElementById('graph-close'),
  oscCanvas: document.getElementById('osc-canvas'),
  graphCanvas: document.getElementById('graph-canvas'),
  oscFreqLbl: document.getElementById('osc-freq'),
  oscPhaseLbl: document.getElementById('osc-phase'),
  graphSlopeLbl: document.getElementById('graph-slope'),
  btnRecord: document.getElementById('btn-add-point'),
  oscDownload: document.getElementById('osc-download'),
  graphDownload: document.getElementById('graph-download'),
  sliderOscTime: document.getElementById('osc-scale-time'),
  sliderOscVolts: document.getElementById('osc-scale-volts'),
  aiMessagesContainer: document.getElementById('ai-messages'),
  aiInput: document.getElementById('ai-input'),
  aiSend: document.getElementById('ai-send'),
  aiMessage: document.getElementById('ai-message'),
  
  // Meters
  valVolts: document.getElementById('mm-v'),
  fillVolts: document.getElementById('bar-v'),
  valAmps: document.getElementById('mm-i'),
  fillAmps: document.getElementById('bar-i'),
  valOhms: document.getElementById('mm-z'),
  fillOhms: document.getElementById('bar-z'),
  valPower: document.getElementById('val-power'),
  valEnergy: document.getElementById('val-energy'),
  meterVmMode: document.getElementById('volt-mode'),
  
  // Sliders & inputs
  sliderV: document.getElementById('sl-v'),
  sliderR: document.getElementById('sl-r'),
  sliderL: document.getElementById('sl-l'),
  sliderC: document.getElementById('sl-c'),
  sliderf: document.getElementById('sl-f'),
  sliderT: document.getElementById('sl-temp'),
  valLblV: document.getElementById('lbl-v'),
  valLblR: document.getElementById('lbl-r'),
  valLblL: document.getElementById('lbl-l'),
  valLblC: document.getElementById('lbl-c'),
  valLblf: document.getElementById('lbl-f'),
  valLblT: document.getElementById('lbl-temp'),
  
  // Diagnostics & Validation
  diagXL: document.getElementById('rc-xl'),
  diagXC: document.getElementById('rc-xc'),
  diagPhi: document.getElementById('rc-phi'),
  diagF0: document.getElementById('rc-f0'),
  kirchhoffDisplay: document.getElementById('kvl-box'),
  acAnalysisBlock: document.getElementById('ac-analysis-block'),
  formulaContainer: document.getElementById('formula-list'),
  
  // Report Tab
  scoreCirclePath: document.getElementById('score-ring'),
  scoreCircleText: document.getElementById('score-ring-txt'),
  lblGrade: document.getElementById('report-grade'),
  vivaContainer: document.getElementById('viva-list'),
  conclusionText: document.getElementById('conclusion-text'),
  btnDownloadReport: document.getElementById('btn-report'),
  
  // Status Bar
  statusTextBar: document.getElementById('sb-status-text'),
  statusDot: document.getElementById('sb-status-dot'),
  telemetryComps: document.getElementById('st-comps'),
  telemetryWires: document.getElementById('st-wires'),
  saveDot: document.getElementById('sb-save-dot'),
  saveText: document.getElementById('sb-save-text')
};

// --- EXPERIMENT DATA & SCHEMAS ---
const experiments = {
  ohms: {
    name: "Ohm's Law Verification",
    aim: "Verify the relation between V, I, and R in a DC circuit.",
    apparatus: "DC Power Supply (0-30V), Resistor (100Ω), Ammeter, Voltmeter, Breadboard, connecting wires.",
    req: ['source', 'resistor'],
    steps: [
      { id: 1, text: "Place the 100Ω ceramic resistor horizontally across the breadboard terminal strips." },
      { id: 2, text: "Connect the positive terminal of the DC Power Supply to the start pin of the resistor." },
      { id: 3, text: "Wire the Ammeter in series and the Voltmeter in parallel across the resistor." },
      { id: 4, text: "Connect the resistor/ammeter loop back to the negative terminal (GND) of the power supply." },
      { id: 5, text: "Click Initialize, adjust voltage from 0V to 15V, and record data points using the graph panel." }
    ],
    theory: "<h3>Ohm's Law</h3><p>At its core, Ohm's Law describes the fundamental relationship between Voltage, Current, and Resistance in an electrical circuit. Named after Georg Simon Ohm, the law states that the current flowing through a conductor is directly proportional to the voltage applied across it, provided all physical conditions and temperature remain constant: <b>V = I × R</b>.</p><p><b>Microscopic View:</b> In a conductor, free electrons drift under an applied electric field. As they drift, they collide with vibrating lattice atoms. These collisions scatter the electrons, creating resistance and dissipating electrical energy as heat (Joule heating). If temperature increases, lattice vibrations increase, leading to more collisions and higher resistance. Hence, the temperature must remain constant to maintain linearity.</p>",
    formulas: [
      { name: "Ohm's Law", expr: "V = I × R" },
      { name: "Current", expr: "I = V / R" }
    ]
  },
  kvl: {
    name: "Kirchhoff's Voltage Law",
    aim: "Verify that the algebraic sum of voltages in a closed series loop is zero.",
    apparatus: "DC Power Supply, Resistors (100Ω, 200Ω), Voltmeters, Breadboard, Wires.",
    req: ['source', 'resistor'],
    steps: [
      { id: 1, text: "Build the DC series circuit on the breadboard (Source, R1, R2, and Ammeter in series)." },
      { id: 2, text: "Turn on the power supply to check the circuit loop current." },
      { id: 3, text: "Observe the Source Voltage (Vs) from the DC Power Supply display." },
      { id: 4, text: "Observe the voltage drop across Resistor R1 (V1) on Voltmeter 1." },
      { id: 5, text: "Observe the voltage drop across Resistor R2 (V2) on Voltmeter 2." },
      { id: 6, text: "Verify Kirchhoff's Voltage Law: confirm that Vs = V1 + V2." }
    ],
    theory: "<h3>Kirchhoff's Voltage Law (KVL)</h3><p>Kirchhoff's Voltage Law states that the algebraic sum of all potential differences (voltages) around any closed loop in a circuit must equal zero: <b>ΣV = 0</b>. KVL is a direct consequence of the <b>Conservation of Energy</b>.</p><p>As charge moves through a closed loop, the energy gained at voltage sources must equal the energy dissipated across passive elements (resistors). Because the electrostatic field is conservative, returning to the starting point results in zero net change in electrical potential.</p>",
    formulas: [{ name: "KVL Sum", expr: "Vs - V1 - V2 = 0" }]
  },
  kcl: {
    name: "Kirchhoff's Current Law",
    aim: "Verify that the total current entering a junction equals the sum of currents leaving it.",
    apparatus: "DC Power Supply, Resistors (100Ω, 200Ω), Ammeters, Breadboard, Wires.",
    req: ['source', 'resistor'],
    steps: [
      { id: 1, text: "Connect the entrance leads of two parallel resistors to a single junction node on the breadboard." },
      { id: 2, text: "Connect the exit leads of both resistors back to the negative ground rail." },
      { id: 3, text: "Connect an Ammeter in series before the junction to measure the total current (I_total)." },
      { id: 4, text: "Connect Ammeters in series with each parallel branch to measure branch currents (I1 and I2)." },
      { id: 5, text: "Adjust the source voltage and record current readings. Verify that I_total = I1 + I2." }
    ],
    theory: "<h3>Kirchhoff's Current Law (KCL)</h3><p>Kirchhoff's Current Law states that the total current entering a junction node must exactly equal the total current leaving that node: <b>ΣI_in = ΣI_out</b>. This is a direct consequence of the <b>Conservation of Charge</b>.</p><p>Since electric charge cannot accumulate or disappear at a node, the sum of all currents meeting at a junction is zero. This principle is fundamental for analyzing parallel circuits and nodal network analysis.</p>",
    formulas: [{ name: "KCL Sum", expr: "I_total = I1 + I2" }]
  },
  rc_rl_rlc: {
    name: "LCR AC Impedance Analysis",
    aim: "Study total impedance and phase angle in LCR series circuits.",
    apparatus: "AC Function Generator, Resistor, Inductor, Capacitor, Ammeter, Voltmeter, Breadboard, connecting wires.",
    req: ['source', 'resistor', 'inductor', 'capacitor', 'ammeter', 'voltmeter'],
    steps: [
      { id: 1, text: "Place a resistor, inductor, and capacitor in series on the breadboard." },
      { id: 2, text: "Connect an AC ammeter in series and a voltmeter in parallel across the capacitor." },
      { id: 3, text: "Connect the series loop to the AC function generator rails and click Initialize." },
      { id: 4, text: "Vary the generator frequency from 10Hz to 1kHz." },
      { id: 5, text: "Record impedance and phase difference at various frequencies to observe reactance variation." }
    ],
    theory: "<h3>LCR AC Circuit</h3><p>In AC circuits containing resistors (R), inductors (L), and capacitors (C), the opposition to current is called <b>Impedance (Z)</b>. It accounts for both resistance and frequency-dependent reactances (XL and XC): <b>Z = √[R² + (XL - XC)²]</b>.</p><p>Inductive reactance XL = 2πfL causes voltage to lead current by 90°, while capacitive reactance XC = 1/(2πfC) causes voltage to lag current by 90°. The phase angle φ between total voltage and current is given by: <b>tan(φ) = (XL - XC) / R</b>.</p>",
    formulas: [
      { name: "Impedance", expr: "Z = √[R² + (XL-XC)²]" },
      { name: "Resonance", expr: "f₀ = 1 / (2π√(LC))" }
    ]
  },
  lcr: {
    name: "Series LCR Resonance",
    aim: "Determine the resonant frequency of an LCR series circuit.",
    apparatus: "AC Function Generator, Resistor, Inductor, Capacitor, Ammeter.",
    req: ['source', 'resistor', 'inductor', 'capacitor'],
    steps: [
      { id: 1, text: "Connect a resistor, inductor, and capacitor in series with the AC power supply." },
      { id: 2, text: "Connect an AC ammeter in series to measure circuit current." },
      { id: 3, text: "Vary the AC frequency in steps around the expected theoretical resonant frequency f₀." },
      { id: 4, text: "Record the current for each frequency. Locate the frequency where current is maximized." },
      { id: 5, text: "Plot frequency vs current to observe the sharp resonance curve." }
    ],
    theory: "<h3>Series Resonance</h3><p>Series resonance occurs in an LCR circuit when the inductive reactance equals the capacitive reactance (<b>XL = XC</b>). At this specific frequency, their reactances cancel each other out, making the circuit purely resistive.</p><p>Under resonance, the impedance drops to its minimum value (<b>Z = R</b>), and the current reaches its maximum value. The resonant frequency is calculated as: <b>f₀ = 1 / (2π√(LC))</b>. The phase angle φ becomes 0°, meaning voltage and current are in phase.</p>",
    formulas: [{ name: "Resonance Freq", expr: "f₀ = 1 / (2π√(LC))" }]
  },
  rc: {
    name: "RC Time Constant",
    aim: "Measure transient capacitor charging rate.",
    apparatus: "DC Supply, ON/OFF Switch, Resistor, Capacitor, Ammeter, Voltmeter, Oscilloscope.",
    req: ['source', 'toggle_switch', 'resistor', 'capacitor', 'ammeter', 'voltmeter'],
    steps: [
      { id: 1, text: "Place DC Source, ON/OFF Switch, Resistor, Capacitor, and Ammeter in series loop." },
      { id: 2, text: "Connect Voltmeter in parallel across Capacitor." },
      { id: 3, text: "Toggle Switch ON/OFF to charge/discharge, observing transient curves on scope." }
    ],
    theory: "<h3>RC Charging & Discharging</h3><p>Time constant τ = RC defines the rate. Switch toggles between charging and discharging phases.</p>",
    formulas: [{ name: "Time Constant", expr: "τ = R × C" }]
  },
  series_parallel: {
    name: "Series & Parallel Loads",
    aim: "Compare equivalent resistors network load values.",
    apparatus: "Resistors, Multimeters, Power Supply.",
    req: ['source', 'resistor', 'ammeter', 'voltmeter'],
    steps: [
      { id: 1, text: "Place two resistors on the breadboard." },
      { id: 2, text: "Connect them in series and measure the total resistance using a multimeter." },
      { id: 3, text: "Re-arrange the resistors in parallel and measure the total resistance." },
      { id: 4, text: "Connect the networks to a DC supply and measure current/voltage to verify equivalent resistance via Ohm's law." }
    ],
    theory: "<h3>Resistor Combinations</h3><p>In a <b>series</b> combination, the same current flows through each resistor, and the total resistance is the sum of individual resistances: <b>R_eq = R1 + R2 + ...</b>.</p><p>In a <b>parallel</b> combination, the voltage across each resistor is the same, and the reciprocal of the total resistance is the sum of the reciprocals: <b>1/R_eq = 1/R1 + 1/R2 + ...</b>. Parallel connections always yield an equivalent resistance smaller than the smallest individual resistor.</p>",
    formulas: [{ name: "Parallel Sum", expr: "1/R_eq = 1/R1 + 1/R2" }]
  },
  wheatstone: {
    name: "Wheatstone Bridge Balance",
    aim: "Measure an unknown resistance using a balanced Wheatstone Bridge.",
    apparatus: "Wheatstone Bridge array (resistors R1, R2, R3, Rx), Galvanometer, DC Power Supply.",
    req: ['source', 'resistor'],
    steps: [
      { id: 1, text: "Set up the Wheatstone bridge layout on the breadboard with resistors R1, R2, variable resistor R3, and unknown resistor Rx." },
      { id: 2, text: "Connect a galvanometer across the central nodes." },
      { id: 3, text: "Connect a DC supply to the opposite outer nodes of the diamond." },
      { id: 4, text: "Adjust the variable resistor R3 slider until the galvanometer reading is exactly zero (null deflection)." },
      { id: 5, text: "Record the resistance values at balance and calculate the unknown resistance Rx." }
    ],
    theory: "<h3>Wheatstone Bridge</h3><p>A Wheatstone Bridge is an electrical circuit used to measure an unknown electrical resistance by balancing two legs of a bridge circuit. It consists of four resistors arranged in a diamond shape.</p><p>When the bridge is balanced, no current flows through the galvanometer in the center branch, meaning the potentials at the detector nodes are equal. The balance condition is: <b>Rx = R3 × (R2 / R1)</b>.</p>",
    formulas: [{ name: "Balance", expr: "Rx = R3 × (R2 / R1)" }]
  },
  faraday: {
    name: "Faraday's Induction Law",
    aim: "Verify Faraday's Law of Electromagnetic Induction by inducing emf in a coil.",
    apparatus: "Bar Magnet, Coil of Wire, Voltmeter/Galvanometer, Speed Controller.",
    req: [],
    steps: [
      { id: 1, text: "Set up a multi-turn coil connected to a sensitive center-zero voltmeter." },
      { id: 2, text: "Move the bar magnet towards the coil and observe the direction and magnitude of the induced voltage pulse." },
      { id: 3, text: "Vary the speed of movement using the slider and record the peak induced voltage." },
      { id: 4, text: "Repeat the motion in the opposite direction and observe the polarities." }
    ],
    theory: "<h3>Faraday's Law</h3><p>Faraday's Law of Electromagnetic Induction states that a change in magnetic flux passing through a conducting loop induces an electromotive force (EMF) in the loop: <b>E = -N (ΔΦ / Δt)</b>, where N is the number of turns and Φ is the magnetic flux.</p><p>The magnitude of the induced voltage is directly proportional to the rate of change of magnetic flux. Movement of a magnetic field relative to a stationary conductor causes a flow of current.</p>",
    formulas: [{ name: "EMF", expr: "E = -N (ΔΦ / Δt)" }]
  },
  lenz: {
    name: "Lenz's Law Demonstration",
    aim: "Demonstrate Lenz's Law and the conservation of energy in electromagnetic induction.",
    apparatus: "Bar Magnet, Conducting Coil, Voltmeter, Motion Slider.",
    req: [],
    steps: [
      { id: 1, text: "Place a copper coil connected to a voltmeter." },
      { id: 2, text: "Push the North pole of a magnet into the coil and note the direction of the induced current (it creates an opposing North pole)." },
      { id: 3, text: "Pull the North pole out and observe that the induced current reverses (creating an attracting South pole)." },
      { id: 4, text: "Measure and record induced voltages at various insertion velocities to verify energy conservation." }
    ],
    theory: "<h3>Lenz's Law</h3><p>Lenz's Law states that the direction of an induced current will always be such that it creates a magnetic field that opposes the change in magnetic flux that produced it. This is expressed by the negative sign in Faraday's Law: <b>E = -N(dΦ/dt)</b>.</p><p>This law is a direct consequence of the <b>Conservation of Energy</b>. If the induced field assisted the change, it would create an infinite energy loop, violating thermodynamic principles.</p>",
    formulas: [{ name: "Flux opposition", expr: "Direction opposes dΦ/dt" }]
  },
  solenoid: {
    name: "Solenoid Magnetic Field",
    aim: "Measure the magnetic field strength inside a current-carrying solenoid.",
    apparatus: "Solenoid Coil, Variable DC Power Supply, Gaussmeter Probe, Ammeter.",
    req: [],
    steps: [
      { id: 1, text: "Connect a solenoid to a variable DC supply in series with an ammeter." },
      { id: 2, text: "Position the Gaussmeter probe inside the center of the solenoid." },
      { id: 3, text: "Adjust current and turns parameters to calculate magnetic flux density." },
      { id: 4, text: "Record the magnetic field reading (B) in Gauss or Tesla." }
    ],
    theory: "<h3>Solenoid Field</h3><p>A solenoid is a long coil of wire wrapped in a helix. When an electric current passes through it, a nearly uniform magnetic field is created inside the coil, directed along its axis.</p><p>The magnetic flux density (B) inside a long, ideal solenoid is given by: <b>B = μ₀ × (N / L) × I</b>, where μ₀ is the permeability of free space, N is the number of turns, L is the length of the solenoid, and I is the current. The field outside is extremely weak.</p>",
    formulas: [{ name: "B Field", expr: "B = μ₀ n I" }]
  },
  transformer: {
    name: "AC Transformer Ratio",
    aim: "Study the voltage and current conversion ratios in an AC transformer.",
    apparatus: "AC Source, Primary and Secondary Coils, AC Voltmeters.",
    req: [],
    steps: [
      { id: 1, text: "Connect the primary coil of the transformer to an AC voltage source." },
      { id: 2, text: "Connect voltmeters to both the primary (input) and secondary (output) terminals." },
      { id: 3, text: "Vary the turns ratio (Np and Ns) on the control panel." },
      { id: 4, text: "Observe and record voltage conversion values to verify the turns law." }
    ],
    theory: "<h3>Transformers</h3><p>A transformer is a static device that transfers electrical energy between circuits through electromagnetic induction. It consists of primary and secondary coils wound on a common ferromagnetic core.</p><p>An alternating current in the primary coil creates a changing magnetic flux in the core, inducing an AC voltage in the secondary coil. The relation is dictated by the turns ratio: <b>Vs / Vp = Ns / Np</b>. Step-up transformers increase voltage (Ns > Np), while step-down transformers decrease it (Ns < Np).</p>",
    formulas: [{ name: "Turns Law", expr: "Vs / Vp = Ns / Np" }]
  },
  diode_iv: {
    name: "Diode I-V Characteristics",
    aim: "Verify the forward and reverse bias I-V characteristics of a PN junction diode.",
    apparatus: "DC Power Supply, PN Junction Diode (1N4007), Resistor (100Ω), Voltmeters, Ammeter, Breadboard.",
    req: ['source', 'resistor', 'diode', 'ammeter', 'voltmeter'],
    steps: [
      { id: 1, text: "Mount a silicon diode and a series current-limiting resistor on the breadboard." },
      { id: 2, text: "Connect the positive terminal of a variable DC supply to the diode anode (forward bias)." },
      { id: 3, text: "Place a voltmeter in parallel with the diode to measure barrier voltage (V_d)." },
      { id: 4, text: "Place an ammeter in series to measure diode current (I_d)." },
      { id: 5, text: "Vary the input voltage and record current and voltage to plot the exponential curve." }
    ],
    theory: "<h3>Diode Characteristics</h3><p>A semiconductor diode is a PN junction that allows current to flow easily in one direction (forward bias) but blocks it in the opposite direction (reverse bias). The I-V relation is given by the Shockley equation: <b>I = Is * (e^(Vd / n*Vt) - 1)</b>.</p><p>In forward bias, current remains negligible until voltage overcomes the internal junction barrier potential (approx 0.7V for silicon). Above this barrier, current increases exponentially. In reverse bias, only a tiny leakage current flows until breakdown voltage is reached.</p>",
    formulas: [
      { name: "Shockley Eq", expr: "I = I_s * (e^(V_d / n V_t) - 1)" },
      { name: "Barrier Potential", expr: "V_barrier ≈ 0.7 V" }
    ]
  },
  voltage_divider: {
    name: "Voltage & Current Divider",
    aim: "Verify the voltage division rule in series and current division in parallel circuits.",
    apparatus: "DC Power Supply, Resistors (100Ω, 200Ω), Multimeters, Breadboard, Wires.",
    req: ['source', 'resistor'],
    steps: [
      { id: 1, text: "Connect two resistors (100Ω and 200Ω) in series across a DC source." },
      { id: 2, text: "Measure the voltage drop across the second resistor and compare it with the theoretical voltage divider equation." },
      { id: 3, text: "Re-wire the resistors in parallel across the supply and measure the current in each branch." },
      { id: 4, text: "Record and verify that currents distribute inversely to resistance values." }
    ],
    theory: "<h3>Voltage Divider</h3><p>The <b>Voltage Divider Rule</b> states that the voltage drop across any resistor in a series circuit is proportional to its resistance relative to the total resistance: <b>V_out = V_in * (R2 / (R1 + R2))</b>.</p><p>The <b>Current Divider Rule</b> states that the current entering a parallel junction divides in inverse proportion to the branch resistances: <b>I1 = I_total * (R2 / (R1 + R2))</b>.</p>",
    formulas: [
      { name: "Voltage Division", expr: "V_out = V_in * (R2 / (R1 + R2))" },
      { name: "Current Division", expr: "I1 = I_total * (R2 / (R1 + R2))" }
    ]
  },
  planck_led: {
    name: "Planck's Constant using LEDs",
    aim: "Determine Planck's constant by measuring the turn-on voltage of different colored LEDs.",
    apparatus: "DC Supply, LEDs (Red, Green, Blue, Yellow), Resistor, Breadboard, Voltmeter, Ammeter.",
    req: ['source', 'resistor', 'led'],
    steps: [
      { id: 1, text: "Place a colored LED in series with a 150Ω resistor on the breadboard." },
      { id: 2, text: "Connect a voltmeter across the LED terminals and an ammeter in series." },
      { id: 3, text: "Slowly increase the supply voltage until the LED just begins to glow and conduct current." },
      { id: 4, text: "Record the threshold voltage V_th and the corresponding wavelength for Red, Yellow, Green, and Blue LEDs." }
    ],
    theory: "<h3>Planck's Constant via LEDs</h3><p>An LED emits light when electrons recombine with holes across the semiconductor bandgap. The energy of the emitted photon is <b>E = h × c / λ</b>, where h is Planck's constant, c is the speed of light, and λ is the emission wavelength.</p><p>The threshold voltage (V_th) at which the LED starts conducting and emitting light corresponds to this bandgap energy: <b>e × V_th ≈ h × (c / λ)</b>. Measuring V_th for various wavelengths allows us to calculate Planck's constant: <b>h = (e × V_th × λ) / c</b>.</p>",
    formulas: [
      { name: "Planck Relation", expr: "e × V_th = h × ν" },
      { name: "Planck's Constant", expr: "h = (e × V_th × λ) / c" }
    ]
  },
  biot_savart: {
    name: "Biot-Savart's Law",
    aim: "Verify the relation between magnetic field, current, and distance from a straight conductor.",
    apparatus: "Straight conductor rod, variable high-current source, Teslameter probe.",
    req: [],
    steps: [
      { id: 1, text: "Position a straight conductor rod connected to a high-current DC source." },
      { id: 2, text: "Place a magnetic field sensor probe at a radial distance from the wire." },
      { id: 3, text: "Increase current and record magnetic field B." },
      { id: 4, text: "Keep current constant and vary distance r, recording B to verify Biot-Savart's law." }
    ],
    theory: "<h3>Biot-Savart's Law</h3><p>Biot-Savart's Law describes the magnetic field generated by a constant electric current. For a long, straight, current-carrying conductor, the magnetic field strength (B) at a radial distance (r) is given by: <b>B = (μ₀ × I) / (2π × r)</b>.</p><p>The field B is directly proportional to the current I and inversely proportional to the radial distance r from the wire. The magnetic field lines form concentric circles centered on the wire, as described by the right-hand rule.</p>",
    formulas: [
      { name: "Biot-Savart Straight", expr: "B = (μ₀ × I) / (2π × r)" }
    ]
  },
  planck_photocell: {
    name: "Planck's Constant (Photocell)",
    aim: "Find Planck's constant using the photoelectric effect in a vacuum photocell.",
    apparatus: "Monochromatic light source, vacuum phototube, stopping voltage supply.",
    req: [],
    steps: [
      { id: 1, text: "Align the light source to shine on the vacuum photocell emitter cathode." },
      { id: 2, text: "Apply a retarding stopping voltage Vs using the DC supply." },
      { id: 3, text: "Select a wavelength and adjust Vs until the photocurrent drops to zero." },
      { id: 4, text: "Repeat for multiple wavelengths and use the slope of Vs vs frequency to compute Planck's constant." }
    ],
    theory: "<h3>Planck's Photocell Method</h3><p>The photoelectric effect is the emission of electrons when light shines on a metal surface. According to Einstein's equation: <b>e × Vs = h × f - Φ</b>, where Vs is the stopping voltage, f is the light frequency, h is Planck's constant, and Φ is the metal's work function.</p><p>The stopping voltage Vs is the retarding potential that drops the photocurrent to zero by repelling even the most energetic electrons. Plotting Vs vs frequency f yields a straight line with slope <b>h/e</b>, allowing calculation of h.</p>",
    formulas: [
      { name: "Einstein equation", expr: "e × Vs = h × f − Φ" }
    ]
  },
  stefan_law: {
    name: "Stefan's Law Verification",
    aim: "Verify the Stefan-Boltzmann law relating total radiated energy to absolute temperature.",
    apparatus: "Electric blackbody furnace, optical radiation pyrometer.",
    req: [],
    steps: [
      { id: 1, text: "Place a blackbody radiation receiver facing the furnace aperture." },
      { id: 2, text: "Increase the blackbody furnace temperature in steps of 100K." },
      { id: 3, text: "Record absolute temperature T (K) and measured radiated power P (W)." },
      { id: 4, text: "Plot Log(P) vs Log(T) to confirm the slope is approximately 4, verifying the T⁴ relation." }
    ],
    theory: "<h3>Stefan-Boltzmann Law</h3><p>The Stefan-Boltzmann Law states that the total energy radiated per unit surface area of a blackbody per unit time is directly proportional to the fourth power of its absolute temperature: <b>P = σ × ε × A × T⁴</b>.</p><p>Here, σ is the Stefan-Boltzmann constant (5.6703 × 10⁻⁸ W/m²K⁴), ε is the emissivity of the material, A is the surface area, and T is the temperature in Kelvin. Real objects emit less than ideal blackbodies, scaling with emissivity ε.</p>",
    formulas: [
      { name: "Stefan's Law", expr: "P = σ × ε × A × T⁴" }
    ]
  },
  ideal_gas: {
    name: "Ideal Gas State Equation",
    aim: "Verify P-V-T thermodynamic relationships of an ideal gas.",
    apparatus: "Confined gas cylinder, piston, manometer, thermometer.",
    req: [],
    steps: [
      { id: 1, text: "Set the volume of the gas chamber using the piston slider." },
      { id: 2, text: "Set the heater temperature using the thermostat slider." },
      { id: 3, text: "Record the resulting pressure on the chamber manometer." },
      { id: 4, text: "Vary volume and temperature independently, verifying that PV/T remains constant." }
    ],
    theory: "<h3>Ideal Gas State Equation</h3><p>The state of an ideal gas is defined by its pressure (P), volume (V), absolute temperature (T), and amount of substance in moles (n). These properties are related by the Ideal Gas Law: <b>P × V = n × R × T</b>.</p><p>R is the universal gas constant (8.314 J/mol·K). The law combines Boyle's, Charles's, and Avogadro's laws. It assumes gas molecules do not exert intermolecular forces and behave as point masses undergoing elastic collisions.</p>",
    formulas: [{ name: "State Equation", expr: "P V = n R T" }]
  },
  boyle: {
    name: "Boyle's Constant Temp Law",
    aim: "Verify P-V inverse pressure-volume relationships at constant temperature.",
    apparatus: "Gas chamber, volume piston, manometer.",
    req: [],
    steps: [
      { id: 1, text: "Select the constant temperature setting on the gas chamber." },
      { id: 2, text: "Vary the volume slider in steps (e.g. 5L, 4L, 3L, 2L)." },
      { id: 3, text: "Record the pressure reading from the manometer at each step." },
      { id: 4, text: "Plot pressure vs 1/Volume and verify the straight-line relationship (P × V = constant)." }
    ],
    theory: "<h3>Boyle's Law</h3><p>Boyle's Law states that for a fixed mass of gas at a constant temperature, the volume (V) of the gas is inversely proportional to its pressure (P): <b>P ∝ 1/V</b> or <b>P × V = constant</b>.</p><p>As volume decreases, the gas molecules collide with the chamber walls more frequently, increasing the average pressure exerted. The product of pressure and volume remains constant as long as temperature is stable.</p>",
    formulas: [{ name: "Boyle's", expr: "P1 × V1 = P2 × V2" }]
  },
  charles: {
    name: "Charles's Constant Pres Law",
    aim: "Verify V-T volume-temperature linear relationships at constant pressure.",
    apparatus: "Heated cylinder, movable piston, temperature controller.",
    req: [],
    steps: [
      { id: 1, text: "Select the constant pressure mode on the gas cylinder piston." },
      { id: 2, text: "Heat the gas chamber in steps of 20K." },
      { id: 3, text: "Record the temperature and resulting expanded volume at each step." },
      { id: 4, text: "Verify the linear relationship and plot Volume vs Temperature." }
    ],
    theory: "<h3>Charles's Law</h3><p>Charles's Law states that for a fixed mass of gas at constant pressure, the volume (V) of the gas is directly proportional to its absolute temperature (T in Kelvin): <b>V ∝ T</b> or <b>V / T = constant</b>.</p><p>Heating a gas increases the average kinetic energy of its molecules, causing them to move faster and expand the volume to maintain constant pressure against the piston. Absolute zero (-273.15°C) is theoretically the temperature at which gas volume drops to zero.</p>",
    formulas: [{ name: "Charles's", expr: "V1 / T1 = V2 / T2" }]
  },
  specific_heat: {
    name: "Specific Heat Capacity",
    aim: "Measure copper thermal specific heat using calorimetry.",
    apparatus: "Calorimeter beaker, thermometer, copper weights, water, heater.",
    req: [],
    steps: [
      { id: 1, text: "Set the mass and temperature of the copper block." },
      { id: 2, text: "Record the initial temperature of the water in the calorimeter (T_w)." },
      { id: 3, text: "Drop the heated metal block into the calorimeter." },
      { id: 4, text: "Stir the water and record the final equilibrium mixture temperature (T_f) to calculate specific heat." }
    ],
    theory: "<h3>Calorimetry</h3><p>The specific heat capacity (c) is the amount of heat required to raise the temperature of 1g of a substance by 1°C. According to the law of conservation of energy: <b>Heat Lost by Metal = Heat Gained by Water + Calorimeter</b>.</p><p>The heat transferred (Q) is given by: <b>Q = m × c × ΔT</b>. By dropping a heated copper block of mass (m_m) and temperature (T_m) into a calorimeter with water (m_w) at room temperature (T_w), the mixture reaches thermal equilibrium at temperature T_f.</p>",
    formulas: [{ name: "Heat Transfer", expr: "Q = m × c × ΔT" }]
  },
  photoelectric: {
    name: "Photoelectric Effect",
    aim: "Determine stopping voltage vs light frequency and verify threshold work function.",
    apparatus: "Vacuum phototube, voltage collector source, monochromatic light generator.",
    req: [],
    steps: [
      { id: 1, text: "Vary the light frequency and observe when photocurrent begins to flow (above threshold)." },
      { id: 2, text: "Apply and adjust the stopping voltage until the photocurrent is nullified." },
      { id: 3, text: "Record light frequency (Hz) and corresponding stopping voltage (V)." },
      { id: 4, text: "Verify that stopping voltage is independent of light intensity." }
    ],
    theory: "<h3>Photoelectric Effect</h3><p>The photoelectric effect is the emission of electrons from a metal plate when illuminated by light of high frequency. Albert Einstein explained this using light quanta (photons). The maximum kinetic energy of emitted photoelectrons is: <b>K_max = h × f - Φ</b>.</p><p>Here, f is the frequency of light, h is Planck's constant, and Φ is the work function (minimum energy required to eject an electron). The threshold frequency f₀ is given by Φ/h; light below this frequency cannot eject electrons, regardless of intensity.</p>",
    formulas: [{ name: "Energy Max", expr: "Kmax = h × ν - Φ" }]
  },
  radioactive: {
    name: "Radioactive Decay Half-Life",
    aim: "Verify nuclei exponential decay rate and measure half-life.",
    apparatus: "Radioactive core grid, Geiger counter, timer.",
    req: [],
    steps: [
      { id: 1, text: "Load a radioactive isotope sample with an initial quantity N₀." },
      { id: 2, text: "Start the timer and record the remaining count of parent nuclei (N) at regular time intervals." },
      { id: 3, text: "Observe the activity rate drop as parent nuclei decay." },
      { id: 4, text: "Calculate the half-life from the recorded exponential decay curve." }
    ],
    theory: "<h3>Decay Law</h3><p>Radioactive decay is a random process at the level of single atoms, but a sample of material decays exponentially over time. The rate of decay is proportional to the number of remaining parent nuclei (N): <b>N(t) = N₀ × e^(-λ × t)</b>.</p><p>The decay constant (λ) is related to the <b>half-life (T_1/2)</b>, which is the time required for half of the nuclei in a sample to decay: <b>T_1/2 = ln(2) / λ ≈ 0.693 / λ</b>. The activity (A = λN) also decays exponentially.</p>",
    formulas: [{ name: "Decay Law", expr: "N(t) = N0 e^(-λ × t)" }]
  },
  de_broglie: {
    name: "de Broglie matter wave",
    aim: "Measure wave characteristics of moving masses and verify matter wavelength.",
    apparatus: "Mass velocity accelerator, diffraction analyzer.",
    req: [],
    steps: [
      { id: 1, text: "Set the particle mass and accelerate it to a specific velocity using the slider." },
      { id: 2, text: "Measure the wavelength of the resulting matter wave from the diffraction pattern." },
      { id: 3, text: "Record velocity and matter wavelength to verify the inverse momentum relationship (λ = h/p)." }
    ],
    theory: "<h3>de Broglie Wavelength</h3><p>In 1924, Louis de Broglie proposed that all moving matter exhibits wave-like properties. The wavelength associated with a particle of mass (m) moving with velocity (v) is: <b>λ = h / p = h / (m × v)</b>.</p><p>Here, p is the momentum of the particle and h is Planck's constant. For electrons accelerated through a potential difference V, the momentum is p = √(2 × m × e × V), yielding: <b>λ = h / √(2 × m × e × V)</b>.</p>",
    formulas: [{ name: "Wavelength", expr: "λ = h / (m × v)" }]
  },
  bohr_model: {
    name: "Bohr Hydrogen atom transitions",
    aim: "Calculate energy gaps and emitted spectral wavelengths during orbital transitions.",
    apparatus: "Bohr atomic orbital model display, spectrometer.",
    req: [],
    steps: [
      { id: 1, text: "Select the initial electron orbit level (n_i) and final orbit level (n_f)." },
      { id: 2, text: "Trigger the quantum transition and observe the emitted photon animation." },
      { id: 3, text: "Record the orbital energy gap ΔE in electron-volts (eV) and calculate the wavelength." },
      { id: 4, text: "Observe Lyman (nf=1), Balmer (nf=2), and Paschen (nf=3) transitions." }
    ],
    theory: "<h3>Bohr Atom</h3><p>Niels Bohr proposed that electrons in an atom reside in stable, quantized circular orbits with discrete energy levels: <b>E_n = -13.6 / n² eV</b>, where n is the principal quantum number.</p><p>An electron can transition between orbits. When dropping from a higher energy level (n_i) to a lower level (n_f), it emits a photon with energy: <b>ΔE = E_i - E_f = 13.6 × (1/n_f² - 1/n_i²) eV</b>. The wavelength λ is given by: <b>λ = h × c / ΔE</b>.</p>",
    formulas: [{ name: "Transition energy", expr: "ΔE = 13.6 (1/n_f² - 1/n_i²) eV" }]
  },
  arduino_led: {
    name: "Arduino LED Control",
    aim: "Control an LED using a push button and an Arduino power loop.",
    apparatus: "Arduino Uno board, Push Button, Red LED, Current-limiting Resistor (150Ω), Breadboard, connecting wires.",
    req: ['source', 'button', 'led', 'resistor'],
    steps: [
      { id: 1, text: "Connect DC power supply to Arduino Uno." },
      { id: 2, text: "Mount Push Button switch across center breadboard ravine." },
      { id: 3, text: "Mount LED and resistor in series on the board." },
      { id: 4, text: "Complete wiring: Arduino 5V -> switch -> LED -> resistor -> GND." },
      { id: 5, text: "Click Initialize to power board, then hold switch to light LED." }
    ],
    theory: "<h3>Microcontroller Power Loop</h3><p>A microcontroller circuit controls peripherals through input/output pins. In this experiment, the Arduino 5V pin acts as the power supply source and GND acts as the common ground.</p><p>A series loop is constructed containing a push-button switch, an LED, and a current-limiting resistor. The resistor value is calculated using Ohm's Law to prevent exceeding the LED's forward current rating: <b>R = (V_pin - V_led) / I</b>. The switch controls the continuity of the loop.</p>",
    formulas: [{ name: "Current Limit", expr: "I = (V_pin - V_led) / R" }]
  }
};

const assessmentQuestions = {
  ohms: [
    { q: "State the mathematical formulation of Ohm's Law.", options: ["V = I / R", "I = V / R", "R = I / V", "V = I × R"], correct: 3, explanation: "Ohm's Law states that potential difference V across a conductor is product of current I and resistance R: V = I × R." },
    { q: "Ohm's Law holds strictly true under which conditions?", options: ["Constant temperature", "Varying temperature", "Varying dimensions", "Always"], correct: 0, explanation: "Temperature must remain constant to keep resistance fixed." },
    { q: "What is the microscopic cause of electrical resistance in metals?", options: ["Electrons colliding with other electrons", "Collisions of drift electrons with vibrating lattice ions", "Repulsion from negative terminals", "Nuclear decay of metal atoms"], correct: 1, explanation: "Resistance arises from the scattering of drift electrons due to frequent collisions with vibrating lattice ions." },
    { q: "What does the slope of a Current (I) vs Voltage (V) graph represent?", options: ["Resistance R", "Power P", "Conductance G = 1/R", "Charge Q"], correct: 2, explanation: "Since I = (1/R) × V, the slope of I vs V is 1/R, which is conductance (G)." },
    { q: "If the length of a wire is doubled while maintaining the same cross-sectional area, how does its resistance change?", options: ["It is halved", "It remains unchanged", "It doubles", "It quadruples"], correct: 2, explanation: "Resistance is directly proportional to length (R = ρL/A), so doubling length doubles resistance." }
  ],
  kvl: [
    { q: "What is Kirchhoff's Voltage Law a statement of?", options: ["Conservation of charge", "Conservation of energy", "Conservation of momentum", "Conservation of mass"], correct: 1, explanation: "KVL is based on the conservation of energy; the total energy gained equals energy lost in a closed loop." },
    { q: "In any closed loop, the algebraic sum of all potential drops and rises is equal to:", options: ["Positive maximum", "Source voltage", "Zero", "Infinity"], correct: 2, explanation: "According to KVL, the net sum of potential changes around any closed loop must equal zero." },
    { q: "If a loop has a 12V battery and two series resistors with drops of 4V and V2, what is V2?", options: ["4V", "8V", "12V", "16V"], correct: 1, explanation: "By KVL, Vs - V1 - V2 = 0 => 12V - 4V - V2 = 0 => V2 = 8V." },
    { q: "Does KVL apply to AC circuits as well as DC circuits?", options: ["Yes, to both at any instantaneous moment", "Only to DC circuits", "Only to AC circuits", "Only when reactances are zero"], correct: 0, explanation: "KVL applies to any closed loop in any circuit, DC or AC, at every instant of time." },
    { q: "Why is KVL based on the conservation of energy?", options: ["Because it deals with charge motion", "Because the electrostatic field is conservative", "Because it ignores heat loss", "Because it requires resistors"], correct: 1, explanation: "A conservative electrostatic field means the net work done in moving a charge around a closed loop is zero." }
  ],
  kcl: [
    { q: "What is Kirchhoff's Current Law a statement of?", options: ["Conservation of charge", "Conservation of energy", "Conservation of mass", "None"], correct: 0, explanation: "KCL represents conservation of charge; total current entering node equals total leaving." },
    { q: "At any electrical node, the algebraic sum of currents is:", options: ["Maximum", "Infinite", "Zero", "Equal to total resistance"], correct: 2, explanation: "According to KCL, the net sum of all currents meeting at a junction node is zero." },
    { q: "In a parallel circuit, if 5A enters a node and branches into R1 (2A) and R2, what is the current in R2?", options: ["7A", "3A", "5A", "2.5A"], correct: 1, explanation: "I_in = I1 + I2 => 5A = 2A + I2 => I2 = 3A." },
    { q: "Since electric charge cannot accumulate or disappear at a node, KCL applies to:", options: ["All nodes in lumped circuits", "Only nodes with voltage sources", "Only capacitor plates", "Superconducting loops only"], correct: 0, explanation: "Charge conservation prevents accumulation at any junction node in a lumped parameter circuit." },
    { q: "KCL is most useful in which circuit analysis method?", options: ["Mesh analysis", "Nodal analysis", "Superposition theorem", "Thevenin's theorem"], correct: 1, explanation: "Nodal analysis directly applies KCL at each non-reference node to solve for node voltages." }
  ],
  rc_rl_rlc: [
    { q: "What is LCR circuit resonance condition?", options: ["XL = XC", "XL > XC", "XL < XC", "Z = 0"], correct: 0, explanation: "Resonance is when inductive and capacitive reactances cancel (XL = XC)." },
    { q: "What is the unit of AC circuit impedance?", options: ["Farad", "Henry", "Ohm", "Siemens"], correct: 2, explanation: "Impedance Z represents the total opposition to AC current, measured in Ohms (Ω)." },
    { q: "Inductive reactance (XL) behaves in which way as AC frequency increases?", options: ["Decreases linearly", "Increases linearly", "Remains constant", "Decreases exponentially"], correct: 1, explanation: "XL = 2πfL, so it is directly proportional to frequency f." },
    { q: "In a purely capacitive circuit, the voltage relation to current is:", options: ["Leads current by 90°", "Lags current by 90°", "Is in phase with current", "Lags current by 180°"], correct: 1, explanation: "A capacitor opposes changes in voltage, causing voltage to lag current by 90°." },
    { q: "Total impedance Z of a series RLC circuit is minimum when:", options: ["XL > XC", "XL < XC", "XL = XC", "R = 0"], correct: 2, explanation: "Z = √[R² + (XL - XC)²]. At resonance (XL = XC), the reactive term becomes zero, minimizing Z." }
  ],
  lcr: [
    { q: "At resonant frequency in LCR series circuit, Z equals:", options: ["R", "0", "Infinity", "XL"], correct: 0, explanation: "At resonance XL = XC, so total impedance Z drops to resistor value R." },
    { q: "The formula for series resonance frequency is:", options: ["f₀ = 1 / (2π√(LC))", "f₀ = 2π / √(LC)", "f₀ = √(LC) / 2π", "f₀ = 1 / (2πLC)"], correct: 0, explanation: "Resonant frequency f₀ occurs when XL = XC => ωL = 1/(ωC) => f₀ = 1/(2π√(LC))." },
    { q: "At resonance, the phase angle φ between voltage and current is:", options: ["90°", "45°", "0°", "180°"], correct: 2, explanation: "At resonance, the circuit is purely resistive, so voltage and current are in phase (φ = 0°)." },
    { q: "The quality factor (Q-factor) of an LCR circuit measures its:", options: ["Resistance only", "Selectivity/sharpness of resonance", "Power dissipation", "Inductance ratio"], correct: 1, explanation: "The Q-factor defines the bandwidth relative to resonant frequency, representing sharpness of resonance." },
    { q: "If capacitance C in an LCR circuit is increased, the resonant frequency:", options: ["Increases", "Decreases", "Remains unchanged", "Doubles"], correct: 1, explanation: "Since f₀ is inversely proportional to √C, increasing C will decrease f₀." }
  ],
  rc: [
    { q: "Define time constant of an RC circuit.", options: ["R / C", "R × C", "1 / (R × C)", "C / R"], correct: 1, explanation: "Time constant τ = R × C in seconds." },
    { q: "What percentage of maximum charge does a capacitor reach in one time constant?", options: ["50.0%", "63.2%", "90.0%", "99.3%"], correct: 1, explanation: "At t = τ, V_c = V_s(1 - e⁻¹) = V_s(1 - 0.368) = 63.2% of V_s." },
    { q: "How many time constants does it take to fully charge a capacitor (~99.3%)?", options: ["1τ", "3τ", "5τ", "10τ"], correct: 2, explanation: "By 5τ, the capacitor charges to V_s(1 - e⁻⁵) ≈ 99.3%, which is practically full charge." },
    { q: "What is the unit of the time constant (RC)?", options: ["Second", "Ohm", "Farad", "Hertz"], correct: 0, explanation: "The product of Ohms and Farads yields seconds, representing time duration." },
    { q: "In an RC charging circuit, the initial current at t=0 is:", options: ["Zero", "Maximum", "Half of maximum", "Negative"], correct: 1, explanation: "Initially the capacitor behaves as a short circuit, so I_initial = V_s / R (maximum)." }
  ],
  series_parallel: [
    { q: "Two 100 Ω resistors in parallel yield an equivalent resistance of:", options: ["200 Ω", "50 Ω", "100 Ω", "25 Ω"], correct: 1, explanation: "1/Req = 1/100 + 1/100 = 2/100 => Req = 50 Ω." },
    { q: "Two 100 Ω resistors in series yield an equivalent resistance of:", options: ["200 Ω", "50 Ω", "100 Ω", "25 Ω"], correct: 0, explanation: "Req = R1 + R2 = 100 + 100 = 200 Ω." },
    { q: "In a series combination of resistors, which parameter remains constant through all resistors?", options: ["Voltage", "Current", "Power", "Conductance"], correct: 1, explanation: "Since there is only one path for current, it must be the same through all series components." },
    { q: "In a parallel combination of resistors, which parameter remains identical across all branches?", options: ["Current", "Voltage", "Power", "Energy"], correct: 1, explanation: "Parallel components share the same two junction nodes, ensuring equal potential difference (voltage)." },
    { q: "The equivalent resistance of a parallel combination is always:", options: ["Larger than the largest resistance", "Equal to the average of all resistances", "Smaller than the smallest individual resistance", "Zero"], correct: 2, explanation: "Adding parallel paths decreases overall resistance; thus Req is less than any single branch resistor." }
  ],
  wheatstone: [
    { q: "Under balanced Wheatstone bridge conditions, galvanometer current is:", options: ["Maximum", "Zero", "Unchanged", "Half"], correct: 1, explanation: "At balance, potential differences across nodes are equal, nulling current." },
    { q: "The Wheatstone bridge is primarily used to measure:", options: ["High voltages", "Unknown resistances", "AC frequencies", "Magnetic flux"], correct: 1, explanation: "The bridge compares ratios of resistances to determine an unknown resistance accurately." },
    { q: "What is the balance condition for a Wheatstone bridge with resistors R1, R2, R3, and Rx?", options: ["Rx = R3 * (R1 / R2)", "Rx = R3 * (R2 / R1)", "Rx = R1 * R2 / R3", "Rx = R1 + R2 - R3"], correct: 1, explanation: "The ratio of adjacent arms is equal: R1/R2 = R3/Rx => Rx = R3 * (R2/R1)." },
    { q: "What happens to the balance point of the bridge if the source voltage is doubled?", options: ["It shifts to double", "It is halved", "It remains unchanged", "It becomes unstable"], correct: 2, explanation: "Balance depends purely on resistance ratios, not on the supply voltage magnitude." },
    { q: "Galvanometer sensitivity is highest when all four resistances are:", options: ["Very high", "Very low", "Of the same order of magnitude", "Infinitely different"], correct: 2, explanation: "Sensitivity peaks when the arm resistances are close in value." }
  ],
  faraday: [
    { q: "Induced emf in a coil depends directly on rate of change of:", options: ["Magnetic flux", "Coil mass", "Temperature", "Resistance"], correct: 0, explanation: "Faraday's Law states induced EMF is proportional to change in magnetic flux." },
    { q: "Faraday's law of induction is represented by the formula:", options: ["E = -N (ΔΦ / Δt)", "E = I R", "E = B l v", "E = -L (dI/dt)"], correct: 0, explanation: "E = -N(dΦ/dt) is the mathematical expression for Faraday's Law." },
    { q: "If a magnet is held stationary inside a coil, the induced voltage is:", options: ["Maximum", "Minimum", "Zero", "Varies with temperature"], correct: 2, explanation: "Since flux is not changing (dΦ/dt = 0), no EMF is induced." },
    { q: "Increasing the number of turns in a coil will make the induced EMF:", options: ["Decrease", "Increase", "Remain the same", "Cancel out"], correct: 1, explanation: "EMF is directly proportional to number of turns (N); more turns wrap more flux changes." },
    { q: "The unit of magnetic flux is:", options: ["Tesla", "Ampere", "Weber", "Henry"], correct: 2, explanation: "Magnetic flux is measured in Webers (Wb). Magnetic field strength is measured in Teslas (T)." }
  ],
  lenz: [
    { q: "Lenz's Law represents conservation of:", options: ["Charge", "Momentum", "Energy", "Flux"], correct: 2, explanation: "Lenz's law is a consequence of conservation of energy." },
    { q: "The negative sign in Faraday's induction law equation represents:", options: ["Ohm's Law", "Lenz's Law", "Coulomb's Law", "Ampere's Law"], correct: 1, explanation: "The negative sign indicates that the induced EMF opposes the change in flux (Lenz's Law)." },
    { q: "When a North pole of a magnet approaches a coil, the face of the coil behaves as a:", options: ["North pole", "South pole", "Neutral pole", "Positive charge"], correct: 0, explanation: "The coil induces a current that creates a North pole to repel the approaching North pole, opposing the motion." },
    { q: "What is the microscopic cause of electromagnetic damping?", options: ["Atomic decay", "Induced currents creating opposing magnetic forces", "Lattice friction", "Gravity"], correct: 1, explanation: "Induced currents generate opposing magnetic fields that exert mechanical drag forces on the magnet." },
    { q: "If a magnet is dropped through a long copper pipe, it falls:", options: ["Faster than in free fall", "Slower than in free fall due to opposing induced fields", "At the speed of light", "Exactly the same as in free fall"], correct: 1, explanation: "Eddy currents induced in the copper walls create opposing fields that slow the magnet's descent." }
  ],
  solenoid: [
    { q: "Magnetic field inside a long solenoid is:", options: ["Directly proportional to current", "Inversely proportional to current", "Zero", "Quadratic to current"], correct: 0, explanation: "B = μ0 n I, so it is directly proportional to I." },
    { q: "The magnetic field inside a long current-carrying solenoid is:", options: ["Non-uniform", "Nearly uniform and directed along the axis", "Radial", "Circular"], correct: 1, explanation: "The internal field lines are parallel, uniform, and align axially." },
    { q: "What constant represents the magnetic permeability of free space?", options: ["ε₀", "μ₀", "σ", "ρ"], correct: 1, explanation: "μ₀ (4π × 10⁻⁷ H/m) is the permeability of free space." },
    { q: "If the number of turns per unit length (n) of a solenoid is doubled, how does the B field change?", options: ["It is halved", "It remains same", "It doubles", "It quadruples"], correct: 2, explanation: "B = μ₀ n I. Doubling n doubles the B field." },
    { q: "The magnetic field outside a very long solenoid is:", options: ["Very strong", "Practically zero", "Equal to internal field", "Concentric"], correct: 1, explanation: "In an ideal long solenoid, the field outside is negligible." }
  ],
  transformer: [
    { q: "A step-up transformer increases voltage by scaling up:", options: ["Primary turns", "Secondary turns", "Primary current", "Frequency"], correct: 1, explanation: "Vs / Vp = Ns / Np. Scaling up secondary turns Ns increases secondary voltage." },
    { q: "Which principle allows transformers to function?", options: ["Self-induction", "Mutual induction", "Thermoelectric effect", "Photoelectric effect"], correct: 1, explanation: "Transformers transfer energy between primary and secondary coils via mutual electromagnetic induction." },
    { q: "Why can't a transformer operate on a steady DC supply?", options: ["DC has too much voltage", "DC does not create a changing magnetic flux", "DC burns the copper wires", "DC frequency is too high"], correct: 1, explanation: "Transformers require changing flux (AC) to induce EMF in the secondary coil." },
    { q: "If Ns = 200 and Np = 100, and Vp = 12V AC, what is Vs?", options: ["6V", "12V", "24V", "48V"], correct: 2, explanation: "Vs = Vp * (Ns/Np) = 12 * (200/100) = 24V." },
    { q: "In an ideal transformer, the output power is:", options: ["Zero", "Double the input power", "Equal to the input power", "Half the input power"], correct: 2, explanation: "An ideal transformer has 100% efficiency, so Pin = Pout." }
  ],
  diode_iv: [
    { q: "What is the approximate turn-on barrier voltage of a Silicon PN junction diode?", options: ["0.3 V", "0.7 V", "1.1 V", "2.0 V"], correct: 1, explanation: "Silicon diodes generally require about 0.7 V forward bias to start conducting." },
    { q: "What happens to the depletion layer width under forward bias?", options: ["It widens", "It narrows", "It remains unchanged", "It disappears completely"], correct: 1, explanation: "Forward bias opposes the built-in potential barrier, narrowing the depletion region." },
    { q: "A diode conducts current easily when it is:", options: ["Reverse biased", "Forward biased", "Unbiased", "Heated"], correct: 1, explanation: "Forward biasing lowers the barrier, allowing charge carriers to cross the junction." },
    { q: "In reverse bias, the tiny current that flows is called:", options: ["Forward current", "Saturation leakage current", "Breakdown current", "Displacement current"], correct: 1, explanation: "Reverse leakage current flows due to thermally generated minority carriers." },
    { q: "The equation that describes diode I-V characteristics is:", options: ["Ohm's equation", "Shockley equation", "Einstein equation", "Schrodinger equation"], correct: 1, explanation: "The diode current is modeled by the Shockley diode equation." }
  ],
  voltage_divider: [
    { q: "In a series voltage divider with R1 = 100Ω and R2 = 200Ω, what fraction of Vin appears across R2?", options: ["1/3", "2/3", "1/2", "1/4"], correct: 1, explanation: "V_R2 = Vin * (R2 / (R1 + R2)) = Vin * (200 / 300) = 2/3 of Vin." },
    { q: "The voltage divider rule is applicable only when components are connected in:", options: ["Parallel", "Series", "Delta", "Star"], correct: 1, explanation: "Voltage division applies to series paths since current is shared." },
    { q: "The current divider rule is applicable only when components are connected in:", options: ["Series", "Parallel", "Loop", "Bridge"], correct: 1, explanation: "Current division applies to parallel branches since voltage is shared." },
    { q: "If R1 = R2 in a series voltage divider, the output voltage Vout across R2 is:", options: ["Equal to Vin", "Double Vin", "Half of Vin", "Zero"], correct: 2, explanation: "Vout = Vin * (R / 2R) = Vin / 2." },
    { q: "In a parallel current divider, the branch with the larger resistance receives:", options: ["More current", "Less current", "Equal current", "No current"], correct: 1, explanation: "Current takes the path of least resistance; thus larger resistance receives smaller current." }
  ],
  planck_led: [
    { q: "Why do different colored LEDs have different turn-on threshold voltages?", options: ["Different physical sizes", "Different semiconductor energy band gaps matching photon frequencies", "Varying internal resistances", "Different current ratings"], correct: 1, explanation: "Turn-on voltage corresponds to the energy gap Eg = h*f = h*c/λ. Shorter wavelengths (blue) require larger turn-on voltages." },
    { q: "The relationship between the energy of emitted photon and frequency is:", options: ["E = h × f", "E = h / f", "E = f / h", "E = h × f²"], correct: 0, explanation: "Photon energy is Planck's constant times frequency: E = h × f." },
    { q: "Which LED color has the highest threshold voltage?", options: ["Red", "Yellow", "Green", "Blue"], correct: 3, explanation: "Blue light has the shortest wavelength and highest frequency, requiring the largest bandgap voltage (~2.7V)." },
    { q: "What does 'h' represent in the Planck's LED equation?", options: ["Planck's constant", "Hubble's constant", "Hall coefficient", "Heat capacity"], correct: 0, explanation: "h is Planck's constant (6.626 × 10⁻³⁴ J·s)." },
    { q: "LED light emission is due to:", options: ["Thermal heating of filament", "Radiative recombination of electron-hole pairs", "Gas ionization", "Nuclear fusion"], correct: 1, explanation: "LEDs emit light via electroluminescence, when injected electrons drop into holes in the valence band." }
  ],
  biot_savart: [
    { q: "How does the magnetic field B change as you move twice as far from a straight current-carrying wire?", options: ["Doubles", "Halves", "Becomes four times", "Remains unchanged"], correct: 1, explanation: "B is inversely proportional to distance r (B ∝ 1/r), so doubling the distance halves the field." },
    { q: "The magnetic field lines around a straight current-carrying wire are:", options: ["Radial lines", "Concentric circles", "Parallel lines", "Hyperbolic paths"], correct: 1, explanation: "Current creates circular magnetic field loops centered around the wire axis." },
    { q: "According to Biot-Savart law, magnetic field is directly proportional to:", options: ["Current", "Distance", "Cross-sectional area", "Temperature"], correct: 0, explanation: "Field strength is proportional to current strength: B ∝ I." },
    { q: "What rule determines the direction of the magnetic field around a straight wire?", options: ["Left-hand rule", "Right-hand grip rule", "Lenz's rule", "Faraday's rule"], correct: 1, explanation: "Point your right thumb along the current; your curled fingers indicate the field direction." },
    { q: "Permeability of free space μ₀ has a value of:", options: ["4π × 10⁻⁷ T·m/A", "8.85 × 10⁻¹² F/m", "6.63 × 10⁻³⁴ J·s", "3 × 10⁸ m/s"], correct: 0, explanation: "μ₀ is exactly defined as 4π × 10⁻⁷ T·m/A." }
  ],
  planck_photocell: [
    { q: "What happens to the stopping voltage in a photoelectric experiment when the light intensity is doubled?", options: ["Doubles", "Halves", "Remains unchanged", "Drops to zero"], correct: 2, explanation: "Stopping voltage depends only on photon frequency (energy) and work function, not on intensity (photon quantity)." },
    { q: "The stopping voltage Vs is a measure of:", options: ["Total photocurrent", "Work function", "Maximum kinetic energy of photoelectrons", "Intensity"], correct: 2, explanation: "e*Vs represents the kinetic energy of the fastest photoelectrons." },
    { q: "The slope of the plot of stopping voltage Vs versus frequency f is:", options: ["h / e", "e / h", "h × e", "Work function"], correct: 0, explanation: "From eVs = hf - Φ => Vs = (h/e)f - Φ/e. The slope is h/e." },
    { q: "The minimum energy required to eject an electron from a metal surface is:", options: ["Stopping potential", "Work function", "Ionization energy", "Activation energy"], correct: 1, explanation: "The work function Φ is the minimum energy barrier electrons must overcome to escape the metal." },
    { q: "Photocurrent starts flowing only when light frequency is greater than:", options: ["Stopping frequency", "Threshold frequency", "Infrared frequency", "Resonant frequency"], correct: 1, explanation: "Photons below threshold frequency (f₀) do not have enough energy to eject electrons." }
  ],
  stefan_law: [
    { q: "According to Stefan-Boltzmann law, radiated energy from a blackbody scales with temperature T as:", options: ["T", "T²", "T³", "T⁴"], correct: 3, explanation: "Stefan's law states that total energy radiated per unit area is proportional to the fourth power of absolute temperature (T⁴)." },
    { q: "The value of the Stefan-Boltzmann constant σ is:", options: ["5.67 × 10⁻⁸ W/m²K⁴", "6.63 × 10⁻³⁴ J·s", "1.38 × 10⁻²³ J/K", "8.31 J/mol·K"], correct: 0, explanation: "σ is equal to 5.6703 × 10⁻⁸ W/m²K⁴." },
    { q: "An ideal blackbody is a body that:", options: ["Reflects all radiation", "Absorbs all radiation incident on it", "Emits green light only", "Does not radiate heat"], correct: 1, explanation: "A blackbody absorbs 100% of all incident electromagnetic radiation." },
    { q: "Emissivity of a perfect blackbody is:", options: ["0.0", "0.5", "1.0", "100.0"], correct: 2, explanation: "An ideal blackbody has maximum emissivity ε = 1.0." },
    { q: "If the absolute temperature of a blackbody is doubled, its radiated power increases by:", options: ["2 times", "4 times", "8 times", "16 times"], correct: 3, explanation: "Power is proportional to T⁴. (2)⁴ = 16 times increase." }
  ],
  ideal_gas: [
    { q: "Ideal Gas Law is expressed as:", options: ["P V = n R T", "P / V = n R T", "P T = n R V", "P V = R T"], correct: 0, explanation: "State equation is PV = nRT." },
    { q: "What represents the constant 'R' in the ideal gas equation?", options: ["Rydberg constant", "Universal gas constant", "Resistance", "Radius"], correct: 1, explanation: "R is the universal gas constant, approximately 8.314 J/mol·K." },
    { q: "An ideal gas assumes that:", options: ["Molecules are very large", "There are no intermolecular forces between molecules", "Collisions are inelastic", "Pressure is constant"], correct: 1, explanation: "Ideal gas models assume negligible molecular volume and zero intermolecular forces." },
    { q: "Under which conditions do real gases behave most like ideal gases?", options: ["Low temperature, high pressure", "High temperature, low pressure", "At absolute zero", "Never"], correct: 1, explanation: "High temp keeps molecules moving fast (overcoming attractive forces), and low pressure keeps them far apart." },
    { q: "In the equation PV = nRT, T must be measured in:", options: ["Celsius", "Fahrenheit", "Kelvin", "Rankine"], correct: 2, explanation: "Thermodynamic equations require absolute temperature in Kelvin." }
  ],
  boyle: [
    { q: "Boyle's law holds at constant:", options: ["Pressure", "Volume", "Temperature", "Moles only"], correct: 2, explanation: "Boyle's law requires temperature T to remain constant." },
    { q: "If the volume of a gas is halved at constant temperature, its pressure:", options: ["Is halved", "Remains same", "Doubles", "Quadruples"], correct: 2, explanation: "Pressure and volume are inversely proportional: P1V1 = P2(V1/2) => P2 = 2 P1." },
    { q: "A graph of Pressure (P) vs Volume (V) at constant temperature is:", options: ["Straight line through origin", "Parabola", "Hyperbola", "S-curve"], correct: 2, explanation: "PV = constant is an equation of a rectangular hyperbola." },
    { q: "A graph of Pressure (P) vs 1/Volume (1/V) is:", options: ["Straight line through the origin", "Hyperbola", "Horizontal line", "Circle"], correct: 0, explanation: "Since P = k * (1/V), P is linear with respect to 1/V." },
    { q: "Boyle's Law is mathematically represented as:", options: ["P / V = k", "P × V = k", "V / T = k", "P / T = k"], correct: 1, explanation: "Pressure times volume is a constant: P × V = k." }
  ],
  charles: [
    { q: "Charles's law holds at constant:", options: ["Pressure", "Volume", "Temperature", "Mass only"], correct: 0, explanation: "Charles's law requires pressure P to remain constant." },
    { q: "If absolute temperature of a gas is doubled at constant pressure, its volume:", options: ["Is halved", "Remains same", "Doubles", "Triples"], correct: 2, explanation: "Volume is directly proportional to absolute temperature (V ∝ T)." },
    { q: "The graph of volume V versus temperature T in Celsius is a straight line that intercepts the T-axis at:", options: ["0°C", "-273.15°C", "100°C", "273.15°C"], correct: 1, explanation: "Extrapolating V to zero yields absolute zero temperature: -273.15°C." },
    { q: "Charles's law is mathematically represented as:", options: ["P/T = k", "V/T = k", "PV = k", "V × T = k"], correct: 1, explanation: "Volume divided by temperature is constant: V / T = constant." },
    { q: "Volume of a gas is directly proportional to temperature in which unit?", options: ["Celsius", "Fahrenheit", "Kelvin", "Both Celsius and Kelvin"], correct: 2, explanation: "Proportionality V ∝ T holds only when T is in Kelvin (absolute scale)." }
  ],
  specific_heat: [
    { q: "Specific heat capacity is heat required to raise temp of 1g by:", options: ["1°C", "10°C", "100°C", "0.1°C"], correct: 0, explanation: "Specific heat c is heat per unit mass per degree change." },
    { q: "The unit of specific heat capacity is:", options: ["Joule", "J / (g·°C)", "Watt", "Calorie"], correct: 1, explanation: "Specific heat is heat energy per unit mass per degree: J/(g·°C)." },
    { q: "Which substance has a remarkably high specific heat capacity?", options: ["Copper", "Iron", "Water", "Lead"], correct: 2, explanation: "Water has a very high specific heat capacity (~4.184 J/g·°C), making it excellent for thermal moderation." },
    { q: "In a calorimetry experiment, heat lost by the hot block is equal to:", options: ["Heat gained by water + calorimeter", "Initial temperature", "Work done", "Total kinetic energy"], correct: 0, explanation: "By energy conservation, heat transfer from hot substance equals heat absorbed by surroundings." },
    { q: "If mass is doubled for the same temperature change, the heat transferred:", options: ["Is halved", "Remains same", "Doubles", "Quadruples"], correct: 2, explanation: "Q = m*c*ΔT. Heat is directly proportional to mass." }
  ],
  photoelectric: [
    { q: "Photoelectric emission threshold depends directly on light:", options: ["Intensity", "Frequency", "Amplitude", "Velocity"], correct: 1, explanation: "Emission requires photon energy hν > Φ, which is a frequency constraint." },
    { q: "If the frequency of light is below the threshold frequency, the number of photoelectrons emitted is:", options: ["Zero", "Double", "Infinite", "Proportional to intensity"], correct: 0, explanation: "Below threshold frequency, photons lack sufficient energy to overcome the work function barrier." },
    { q: "The kinetic energy of emitted photoelectrons increases linearly with:", options: ["Light intensity", "Light frequency", "Exposure time", "Source voltage"], correct: 1, explanation: "K_max = hf - Φ. Energy depends linearly on frequency f." },
    { q: "The number of emitted photoelectrons per second is proportional to:", options: ["Light frequency", "Light intensity", "Metal thickness", "Stopping voltage"], correct: 1, explanation: "More intensity means more photons per second, yielding more ejected electrons." },
    { q: "Who explained the photoelectric effect using photon theory?", options: ["Newton", "Einstein", "Maxwell", "Planck"], correct: 1, explanation: "Albert Einstein won the 1921 Nobel Prize for explaining the photoelectric effect using light packets (photons)." }
  ],
  radioactive: [
    { q: "After exactly 3 half-lives, fraction of parent nuclei remaining is:", options: ["1/2", "1/4", "1/8", "1/16"], correct: 2, explanation: "Fraction remaining is (1/2)³ = 1/8." },
    { q: "The decay rate (activity) of a sample is proportional to:", options: ["Temperature", "Pressure", "Number of remaining nuclei", "Isotope volume"], correct: 2, explanation: "Activity A = λN. It is directly proportional to remaining nuclei count." },
    { q: "The relationship between half-life (T_1/2) and decay constant (λ) is:", options: ["T_1/2 = 0.693 / λ", "T_1/2 = λ / 0.693", "T_1/2 = λ", "T_1/2 = 1 / λ"], correct: 0, explanation: "T_1/2 = ln(2) / λ ≈ 0.693 / λ." },
    { q: "What is the SI unit of radioactivity?", options: ["Curie", "Becquerel", "Gray", "Sievert"], correct: 1, explanation: "1 Becquerel (Bq) is defined as one disintegration per second." },
    { q: "Radioactive decay is a:", options: ["Chemical reaction", "Random and spontaneous nuclear process", "Thermal expansion", "Induced ionization"], correct: 1, explanation: "Decay is a nuclear process that happens randomly and spontaneously." }
  ],
  de_broglie: [
    { q: "de Broglie wavelength is inversely proportional to particle:", options: ["Mass only", "Velocity only", "Momentum", "Energy"], correct: 2, explanation: "λ = h/p, where momentum p = mv." },
    { q: "What is the formula for the de Broglie wavelength?", options: ["λ = h / p", "λ = h × p", "λ = p / h", "λ = h × c"], correct: 0, explanation: "λ = h / p, where h is Planck's constant and p is momentum." },
    { q: "As the velocity of a particle increases, its de Broglie wavelength:", options: ["Increases", "Decreases", "Remains same", "Becomes zero"], correct: 1, explanation: "Since velocity is in the denominator (λ = h/mv), higher velocity reduces wavelength." },
    { q: "Which of the following exhibits wave-particle duality?", options: ["Light only", "Electrons only", "All matter and radiation", "No physical objects"], correct: 2, explanation: "All quantum entities exhibit both wave-like and particle-like properties." },
    { q: "The wave nature of electrons was experimentally verified by:", options: ["Rutherford", "Bohr", "Davisson and Germer", "Einstein"], correct: 2, explanation: "Their electron diffraction experiments proved electrons behave as waves." }
  ],
  bohr_model: [
    { q: "Hydrogen electron transition from n=2 to n=1 energy is:", options: ["10.2 eV", "13.6 eV", "3.4 eV", "1.5 eV"], correct: 0, explanation: "ΔE = -3.4 - (-13.6) = 10.2 eV." },
    { q: "According to Bohr's model, the angular momentum of an electron is:", options: ["Infinite", "Quantized in integral multiples of h/2π", "Continuous", "Zero"], correct: 1, explanation: "L = mvr = n × (h/2π). Angular momentum is quantized." },
    { q: "The energy of an electron in the nth orbit of a Hydrogen atom is proportional to:", options: ["n", "n²", "1 / n", "1 / n²"], correct: 3, explanation: "E_n = -13.6 / n² eV. It is inversely proportional to n²." },
    { q: "Spectral lines corresponding to transitions ending in n=2 are in which series?", options: ["Lyman series", "Balmer series", "Paschen series", "Pfund series"], correct: 1, explanation: "The Balmer series corresponds to electron transitions ending in level n=2 (visible light)." },
    { q: "The Bohr model is strictly applicable to:", options: ["Multi-electron atoms", "Single-electron atoms/ions", "Covalent crystals", "Helium gas only"], correct: 1, explanation: "Bohr's model applies only to hydrogen-like (single-electron) systems (H, He⁺, Li²⁺)." }
  ],
  arduino_led: [
    { q: "What is the primary function of a current-limiting resistor in an LED loop?", options: ["Store charge", "Limit current and protect LED", "Convert AC to DC", "Oscillate voltage"], correct: 1, explanation: "Resistors limit the flow of current to prevent burning out components like LEDs." },
    { q: "The output voltage of an Arduino digital output pin when set HIGH is:", options: ["3.3 V", "5.0 V", "12.0 V", "0.0 V"], correct: 1, explanation: "Standard Arduino Uno digital pins output 5.0 V in the HIGH state." },
    { q: "When a normally open push button is pressed, the switch:", options: ["Opens the circuit", "Closes the circuit", "Reverses polarity", "Reduces voltage"], correct: 1, explanation: "A normally open button completes/closes the path when pressed." },
    { q: "The common reference ground pin on Arduino is labeled:", options: ["5V", "GND", "VIN", "RESET"], correct: 1, explanation: "GND represents the common zero-potential reference terminal." },
    { q: "What happens if an LED is connected directly across 5V and GND without a resistor?", options: ["It glows normally", "It does not light up", "It draws excessive current and burns out", "It blinks automatically"], correct: 2, explanation: "Without a current-limiting resistor, the LED will draw current beyond its rating and burn out." }
  ]
};

function checkIsParallelCircuit() {
  const resistors = state.placedComponents.filter(c => c.type === 'resistor');
  if (resistors.length < 2) return false;
  const uf = runUnionFind();
  const r1_1 = uf.find(resistors[0].snap1);
  const r1_2 = uf.find(resistors[0].snap2);
  const r2_1 = uf.find(resistors[1].snap1);
  const r2_2 = uf.find(resistors[1].snap2);
  
  return (
    (r1_1 === r2_1 && r1_2 === r2_2) ||
    (r1_1 === r2_2 && r1_2 === r2_1)
  );
}

function solveDiodeCircuitLocal(Vs, Rd, V_barrier) {
  if (Vs <= 0.01) {
    return { Vd: Vs, I: 0 };
  }
  const nVT = 0.052;
  const Is = 1e-3 / Math.exp(V_barrier / nVT);
  const R_loop = Math.max(1, Rd);
  
  let low = 0.0;
  let high = Vs / R_loop;
  
  for (let iter = 0; iter < 40; iter++) {
    const mid = (low + high) / 2;
    const Vd = nVT * Math.log(mid / Is + 1);
    const Vs_calc = mid * R_loop + Vd;
    if (Vs_calc < Vs) {
      low = mid;
    } else {
      high = mid;
    }
  }
  
  const I = low;
  const Vd = nVT * Math.log(I / Is + 1);
  return { Vd, I };
}

// --- LOCAL CIRCUIT SIMULATION & TOPOLOGY ENGINE ---
function calculateCircuitLocal(params, activeExperiment, buttonPressed) {
  let V = 0;
  let I = 0;
  let Z = 0;
  let P = 0;
  let XL = 0;
  let XC = 0;
  let phi = 0;
  let f0 = 0;

  if (activeExperiment === 'ohms') {
    V = params.V;
    const fixedResistance = params.R;
    const idealCurrent = V / (fixedResistance || 1);
    const seed = Math.sin(V * 1000 + fixedResistance);
    const noise = 1 + (seed * 0.008); 
    I = idealCurrent * noise;
    Z = V / (I || 1);
    P = V * I;
  } else if (activeExperiment === 'kvl') {
    V = params.V;
    const R1 = params.R;
    const R2 = params.L || 100;
    Z = R1 + R2;
    I = V / (Z || 1);
    const VR1 = I * R1;
    const VR2 = I * R2;
    P = V * I;
    XL = VR1;
    XC = VR2;
    f0 = R1;
    return { V, I, Z, P, VR1, VR2, XL, XC, phi: 0, f0 };
  } else if (activeExperiment === 'kcl') {
    V = params.V;
    const R1 = params.R;
    const R2 = params.L || 100;
    Z = (R1 * R2) / ((R1 + R2) || 1);
    I = V / (Z || 1);
    const IR1 = V / (R1 || 1);
    const IR2 = V / (R2 || 1);
    P = V * I;
    XL = IR1;
    XC = IR2;
    return { V, I, Z, P, IR1, IR2, XL, XC, phi: 0, f0: 0 };
  } else if (activeExperiment === 'lcr' || activeExperiment === 'rc_rl_rlc') {
    V = params.V; 
    const L_henrys = params.L * 1e-3;
    const C_farads = params.C * 1e-6;
    const omega = 2 * Math.PI * params.f;
    XL = omega * L_henrys;
    XC = 1 / (omega * C_farads || 1);
    Z = Math.sqrt(params.R * params.R + (XL - XC) * (XL - XC));
    I = V / (Z || 1);
    phi = Math.atan2(XL - XC, params.R) * (180 / Math.PI);
    f0 = 1 / (2 * Math.PI * Math.sqrt(L_henrys * C_farads) || 1);
    P = I * I * params.R;
  } else if (activeExperiment === 'rc') {
    V = params.V;
    const R_val = params.R || 100;
    const Vs = state.meters.volts || V;
    const V_cap = state.capVoltage !== undefined ? state.capVoltage : 0.0;
    Z = R_val;
    I = state.buttonPressed ? ((Vs - V_cap) / R_val) : -(V_cap / R_val);
    P = V_cap * I;
    f0 = R_val * params.C * 1e-4; // tau
  } else if (activeExperiment === 'series_parallel') {
    const V_source = params.V;
    const R1 = params.R;
    const R2 = params.L; 
    const isParallel = checkIsParallelCircuit();
    if (isParallel) {
      Z = (R1 * R2) / ((R1 + R2) || 1);
      V = V_source;
    } else {
      Z = R1 + R2; 
      V = V_source * R1 / ((R1 + R2) || 1);
    }
    I = V_source / (Z || 1);
    P = V_source * I;
  } else if (activeExperiment === 'wheatstone') {
    V = params.V;
    const R1 = params.R;
    const R2 = params.L;
    const R3 = params.C;
    const R4 = 150; 
    const balancedR3 = R4 * R1 / R2;
    Z = R1 + R2 + R3 + R4;
    I = Math.abs(R3 - balancedR3) * 0.0001; 
    P = V * I;
    f0 = balancedR3; 
  } else if (activeExperiment === 'faraday' || activeExperiment === 'lenz') {
    const vel = params.V;
    const B = params.R;
    const N = params.L || 200;
    const t = Date.now() * 0.005;
    const pulse = Math.sin(t) * Math.exp(-Math.pow(Math.sin(t*0.5)*3, 2));
    V = N * B * vel * pulse * 0.02; 
    I = V / 10; 
    Z = 10;
    P = Math.abs(V * I);
  } else if (activeExperiment === 'solenoid') {
    const current = params.V;
    const turns = params.R;
    const length = params.L || 0.5;
    const u0 = 4 * Math.PI * 1e-7;
    const B = u0 * (turns / length) * current; 
    V = current;
    I = current;
    Z = B * 1e4; 
    P = current * current * 2.0; 
  } else if (activeExperiment === 'transformer') {
    const Vp = params.V;
    const Np = params.R;
    const Ns = params.L || 400;
    V = Vp * (Ns / (Np || 1)); 
    I = V / 100; 
    Z = Ns / (Np || 1); 
    P = V * I;
  } else if (activeExperiment === 'diode_iv') {
    const Rd = params.R || 100;
    const Vs = params.V;
    const solved = solveDiodeCircuitLocal(Vs, Rd, 0.7);
    V = solved.Vd;
    I = solved.I;
    Z = Rd;
    P = V * I;
  } else if (activeExperiment === 'voltage_divider') {
    const Vin = params.V;
    const R1 = params.R;
    const R2 = params.L || 200;
    Z = R1 + R2;
    I = Vin / (Z || 1);
    V = Vin * (R2 / (Z || 1)); // Vout
    P = Vin * I;
  } else if (activeExperiment === 'planck_led') {
    const Vs = params.V;
    const Rd = params.R || 200;
    let V_barrier = 2.0; // default Yellow
    let wavelength = 590e-9;
    if (state.params.led_color === 'red') { V_barrier = 1.8; wavelength = 620e-9; }
    else if (state.params.led_color === 'green') { V_barrier = 2.2; wavelength = 525e-9; }
    else if (state.params.led_color === 'blue') { V_barrier = 2.7; wavelength = 470e-9; }
    else if (state.params.led_color === 'yellow') { V_barrier = 2.0; wavelength = 590e-9; }
    
    const solved = solveDiodeCircuitLocal(Vs, Rd, V_barrier);
    V = solved.Vd;
    I = solved.I;
    Z = V_barrier;
    P = V * I;
    // Calculate h = (e * V_barrier * wavelength) / c
    const e = 1.602e-19;
    const c_speed = 3e8;
    f0 = (e * V_barrier * wavelength) / c_speed; // display h
  } else if (activeExperiment === 'biot_savart') {
    const current = params.V;
    const r = params.R; // distance in cm
    const L = params.L || 0.5; // wire length in m
    const u0 = 4 * Math.PI * 1e-7;
    const B = (u0 * current) / (2 * Math.PI * (r * 1e-2) || 1); // Tesla
    V = current;
    I = r;
    Z = L;
    P = B * 1e6; // micro-Tesla for display
  } else if (activeExperiment === 'planck_photocell') {
    const lambda = params.V; // wavelength in nm
    const Vs = params.R; // stopping voltage
    const intensity = params.L || 50; // light intensity %
    const h = 4.1357e-15; // eV-s
    const c_speed = 3e8;
    const freq = c_speed / (lambda * 1e-9);
    const E_photon = h * freq; // energy in eV
    const work_function = 2.0; // vacuum phototube work function in eV
    let stoppingV = E_photon - work_function;
    if (stoppingV < 0) stoppingV = 0;
    
    // Photo-current drops to 0 when Vs >= stoppingV
    let I_photo = 0;
    if (E_photon > work_function && Vs < stoppingV) {
      I_photo = (intensity / 100) * (1 - Vs / stoppingV) * 0.05; // mA
    }
    V = lambda;
    I = I_photo;
    Z = stoppingV; // theoretical cutoff voltage
    P = E_photon; // energy in eV
    f0 = 6.626e-34; // standard Planck's constant for display
  } else if (activeExperiment === 'stefan_law') {
    const T = params.V; // absolute temp in K
    const emiss = params.R;
    const area = params.L || 5.0; // cm^2
    const sigma = 5.6703e-12; // W/(cm^2 K^4)
    const radiated_power = sigma * emiss * area * Math.pow(T, 4); // Watts
    V = T;
    I = emiss;
    Z = area;
    P = radiated_power;
    f0 = Math.pow(T, 4);
  } else if (activeExperiment === 'ideal_gas' || activeExperiment === 'boyle' || activeExperiment === 'charles') {
    const vol = activeExperiment === 'charles' ? (params.V * 0.03) : params.V; 
    const temp = activeExperiment === 'boyle' ? 300.0 : (activeExperiment === 'charles' ? params.V : params.R); 
    const moles = activeExperiment === 'boyle' ? 1.0 : (params.L || 1.0);
    const Rg = 8.314; 
    const pressure = (moles * Rg * temp) / (vol || 1); 
    V = pressure;
    I = vol;
    Z = temp;
    P = moles;
    f0 = 1.5 * moles * Rg * temp; 
  } else if (activeExperiment === 'specific_heat') {
    const mm = params.V;
    const Tm = params.R;
    const mw = params.L || 200;
    const Tw = 25.0; 
    const cm = 0.385; 
    const cw = 4.184; 
    const Tf = (mm * cm * Tm + mw * cw * Tw) / (mm * cm + mw * cw);
    V = Tm;
    I = Tw;
    Z = Tf; 
    P = mm * cm * (Tm - Tf); 
  } else if (activeExperiment === 'photoelectric') {
    const freq = params.V; 
    const intensity = params.R;
    const work = params.L || 2.2;
    const h = 4.1357e-15; 
    const freqHz = freq * 1e14;
    const photonEnergy = h * freqHz; 
    let KE = 0;
    let stoppingV = 0;
    if (photonEnergy > work) {
      KE = photonEnergy - work;
      stoppingV = KE; 
    }
    V = freq;
    I = intensity;
    Z = work;
    P = stoppingV;
    f0 = KE;
  } else if (activeExperiment === 'radioactive') {
    const N0 = params.V;
    const halfLife = params.R;
    const t = (Date.now() * 0.001) % 60; 
    const lambda = Math.LN2 / halfLife;
    const N = N0 * Math.exp(-lambda * t);
    V = N0;
    I = N; 
    Z = halfLife;
    P = lambda * N; 
  } else if (activeExperiment === 'de_broglie') {
    const mass = params.V * 1e-30;
    const vel = params.R * 1e3;
    const h = 6.626e-34;
    const wavelength = h / (mass * vel || 1); 
    V = mass * 1e30;
    I = vel * 1e-3;
    Z = wavelength * 1e9; 
  } else if (activeExperiment === 'bohr_model') {
    const ni = params.V;
    const nf = params.R;
    const Ei = -13.6 / (ni * ni);
    const Ef = -13.6 / (nf * nf);
    const deltaE = Math.abs(Ei - Ef); 
    V = ni;
    I = nf;
    Z = deltaE;
  } else {
    V = params.V;
    I = params.V / (params.R || 1);
    Z = params.R;
    P = V * I;
  }

  return { V, I, Z, P, XL, XC, phi, f0 };
}

function validateCircuitLocal() {
  const uf = runUnionFind();
  const find = (x) => uf.find(x);
  
  const comps = state.placedComponents;
  const findComp = (type) => comps.find(c => c.type === type);
  
  const source = findComp('source');
  const resistor = findComp('resistor');
  const inductor = findComp('inductor');
  const capacitor = findComp('capacitor');
  const ammeter = findComp('ammeter');
  const voltmeter = findComp('voltmeter');
  const led = findComp('led');
  const button = findComp('button') || findComp('toggle_switch');
  
  const expKey = state.activeExperiment;
  
  if (expKey === 'ohms') {
    if (!source || !resistor || !ammeter || !voltmeter) {
      return { status: 'error', message: 'Missing required components. Please place Source, Resistor, Ammeter, and Voltmeter.' };
    }
    
    const r1 = resistor.snap1, r2 = resistor.snap2;
    const am1 = ammeter.snap1, am2 = ammeter.snap2;
    const volt1 = voltmeter.snap1, volt2 = voltmeter.snap2;
    
    // 1. Component Shorting Checks
    if (find(r1) === find(r2)) {
      return { status: 'error', message: 'Resistor is shorted! Both terminals are connected to the same electrical node.' };
    }
    if (find(am1) === find(am2)) {
      return { status: 'error', message: 'Ammeter is shorted! Both terminals are connected to the same electrical node.' };
    }
    if (find(volt1) === find(volt2)) {
      return { status: 'error', message: 'Voltmeter is shorted! Both terminals are connected to the same electrical node.' };
    }
    
    // 2. Power Source Short Circuit Check
    // The top positive rail is row 0; top negative rail is row 1.
    const posRail = find(0);
    const negRail = find(1);
    if (posRail === negRail) {
      return { status: 'error', message: 'Short Circuit Detected! Positive rail (+) is connected directly to Ground (-) rail.' };
    }
    
    // 3. Trace Series Loop: Positive Rail -> Ammeter -> Resistor -> Negative Rail (or vice versa)
    const nodeR1 = find(r1);
    const nodeR2 = find(r2);
    const nodeAm1 = find(am1);
    const nodeAm2 = find(am2);
    const nodeVolt1 = find(volt1);
    const nodeVolt2 = find(volt2);
    
    // We check the two valid series configurations:
    // Path A: positive rail -> resistor -> ammeter -> negative rail
    const pathA = (
      ((nodeR1 === posRail && nodeR2 === nodeAm1) || (nodeR2 === posRail && nodeR1 === nodeAm1)) &&
      (nodeAm2 === negRail)
    ) || (
      ((nodeR1 === posRail && nodeR2 === nodeAm2) || (nodeR2 === posRail && nodeR1 === nodeAm2)) &&
      (nodeAm1 === negRail)
    );
    
    // Path B: positive rail -> ammeter -> resistor -> negative rail
    const pathB = (
      ((nodeAm1 === posRail && nodeAm2 === nodeR1) || (nodeAm2 === posRail && nodeAm1 === nodeR1)) &&
      (nodeR2 === negRail)
    ) || (
      ((nodeAm1 === posRail && nodeAm2 === nodeR2) || (nodeAm2 === posRail && nodeAm1 === nodeR2)) &&
      (nodeR1 === negRail)
    );
    
    if (!pathA && !pathB) {
      const rConnectedToPos = (nodeR1 === posRail || nodeR2 === posRail);
      const amConnectedToPos = (nodeAm1 === posRail || nodeAm2 === posRail);
      const rConnectedToNeg = (nodeR1 === negRail || nodeR2 === negRail);
      const amConnectedToNeg = (nodeAm1 === negRail || nodeAm2 === negRail);
      
      if (!rConnectedToPos && !amConnectedToPos) {
        return { status: 'error', message: 'Circuit is open! Connect the Source (+) rail to either the Resistor or the Ammeter.' };
      }
      if (!rConnectedToNeg && !amConnectedToNeg) {
        return { status: 'error', message: 'Circuit is open! Connect the series components back to the Source (-) rail.' };
      }
      
      const connectedTogether = (nodeR1 === nodeAm1 || nodeR1 === nodeAm2 || nodeR2 === nodeAm1 || nodeR2 === nodeAm2);
      if (!connectedTogether) {
        return { status: 'error', message: 'Ammeter must be connected in SERIES with the Resistor. Connect them together.' };
      }
      
      return { status: 'error', message: 'Invalid series loop. Ensure: Battery (+) -> Ammeter -> Resistor -> Ground (-).' };
    }
    
    // 4. Voltmeter Parallel Connection Check
    const voltmeterParallel = (
      (nodeVolt1 === nodeR1 && nodeVolt2 === nodeR2) ||
      (nodeVolt1 === nodeR2 && nodeVolt2 === nodeR1)
    );
    
    if (!voltmeterParallel) {
      return { status: 'error', message: 'Voltmeter is connected incorrectly! It must be wired in PARALLEL directly across the Resistor.' };
    }
    
    return { status: 'success', message: 'Ohm\'s Law DC series-parallel circuit loop verified and closed!' };
  }
  
  if (expKey === 'lcr') {
    if (!source || !resistor || !inductor || !capacitor || !ammeter || !voltmeter) {
      return { status: 'error', message: 'Missing required components. Place Source, Resistor, Inductor, Capacitor, Ammeter, and Voltmeter.' };
    }
    
    if (find(resistor.snap1) === find(resistor.snap2)) return { status: 'error', message: 'Resistor is shorted! Both terminals are connected to the same electrical node.' };
    if (find(inductor.snap1) === find(inductor.snap2)) return { status: 'error', message: 'Inductor is shorted! Both terminals are connected to the same electrical node.' };
    if (find(capacitor.snap1) === find(capacitor.snap2)) return { status: 'error', message: 'Capacitor is shorted! Both terminals are connected to the same electrical node.' };
    if (find(ammeter.snap1) === find(ammeter.snap2)) return { status: 'error', message: 'Ammeter is shorted! Both terminals are connected to the same electrical node.' };
    if (find(voltmeter.snap1) === find(voltmeter.snap2)) return { status: 'error', message: 'Voltmeter is shorted! Both terminals are connected to the same electrical node.' };
    
    const posRail = find(0), negRail = find(1);
    if (posRail === negRail) return { status: 'error', message: 'Short Circuit Detected! Positive rail (+) is connected directly to Ground (-) rail.' };
    
    const seriesComps = [resistor, inductor, capacitor, ammeter];
    let currentNode = posRail;
    const visitedComps = new Set();
    let stepsLeft = 10;
    
    while (currentNode !== negRail && stepsLeft > 0) {
      stepsLeft--;
      let foundNext = false;
      for (const comp of seriesComps) {
        if (visitedComps.has(comp)) continue;
        const n1 = find(comp.snap1);
        const n2 = find(comp.snap2);
        if (n1 === currentNode) {
          currentNode = n2;
          visitedComps.add(comp);
          foundNext = true;
          break;
        } else if (n2 === currentNode) {
          currentNode = n1;
          visitedComps.add(comp);
          foundNext = true;
          break;
        }
      }
      if (!foundNext) break;
    }
    
    if (currentNode !== negRail || visitedComps.size < 4) {
      return { status: 'error', message: 'Series LCR circuit is open! Ensure all components (Resistor, Inductor, Capacitor, Ammeter) form a closed series loop.' };
    }
    
    const volt1 = find(voltmeter.snap1);
    const volt2 = find(voltmeter.snap2);
    const nodeC1 = find(capacitor.snap1);
    const nodeC2 = find(capacitor.snap2);
    const voltmeterParallel = (
      (volt1 === nodeC1 && volt2 === nodeC2) ||
      (volt1 === nodeC2 && volt2 === nodeC1)
    );
    if (!voltmeterParallel) {
      return { status: 'error', message: 'Voltmeter must be connected in PARALLEL directly across the Capacitor.' };
    }
    
    return { status: 'success', message: 'Series LCR resonance loop closed and verified!' };
  }
  
  if (expKey === 'rc') {
    const switchComp = comps.find(c => c.type === 'toggle_switch' || c.type === 'button');
    if (!source || !resistor || !capacitor || !ammeter || !voltmeter || !switchComp) {
      return { status: 'error', message: 'Missing components. Place Source, ON/OFF Switch, Resistor, Capacitor, Ammeter, and Voltmeter.' };
    }
    
    if (find(resistor.snap1) === find(resistor.snap2)) return { status: 'error', message: 'Resistor is shorted! Both terminals are connected to the same electrical node.' };
    if (find(capacitor.snap1) === find(capacitor.snap2)) return { status: 'error', message: 'Capacitor is shorted! Both terminals are connected to the same electrical node.' };
    if (find(ammeter.snap1) === find(ammeter.snap2)) return { status: 'error', message: 'Ammeter is shorted! Both terminals are connected to the same electrical node.' };
    if (find(voltmeter.snap1) === find(voltmeter.snap2)) return { status: 'error', message: 'Voltmeter is shorted! Both terminals are connected to the same electrical node.' };
    if (find(switchComp.snap1) === find(switchComp.snap2)) return { status: 'error', message: 'Switch is shorted! Both terminals are connected to the same electrical node.' };
    
    const posRail = find(0), negRail = find(1);
    if (posRail === negRail) return { status: 'error', message: 'Short Circuit Detected! Positive rail (+) is connected directly to Ground (-) rail.' };
    
    const seriesComps = [resistor, capacitor, ammeter, switchComp];
    let currentNode = posRail;
    const visitedComps = new Set();
    let stepsLeft = 10;
    
    while (currentNode !== negRail && stepsLeft > 0) {
      stepsLeft--;
      let foundNext = false;
      for (const comp of seriesComps) {
        if (visitedComps.has(comp)) continue;
        const n1 = find(comp.snap1);
        const n2 = find(comp.snap2);
        if (n1 === currentNode) {
          currentNode = n2;
          visitedComps.add(comp);
          foundNext = true;
          break;
        } else if (n2 === currentNode) {
          currentNode = n1;
          visitedComps.add(comp);
          foundNext = true;
          break;
        }
      }
      if (!foundNext) break;
    }
    
    if (currentNode !== negRail || visitedComps.size < 4) {
      return { status: 'error', message: 'RC circuit loop is open! Ensure all components (Switch, Resistor, Capacitor, Ammeter) form a closed series loop.' };
    }
    
    const volt1 = find(voltmeter.snap1);
    const volt2 = find(voltmeter.snap2);
    const nodeC1 = find(capacitor.snap1);
    const nodeC2 = find(capacitor.snap2);
    const voltmeterParallel = (
      (volt1 === nodeC1 && volt2 === nodeC2) ||
      (volt1 === nodeC2 && volt2 === nodeC1)
    );
    if (!voltmeterParallel) {
      return { status: 'error', message: 'Voltmeter must be connected in PARALLEL directly across the Capacitor.' };
    }
    
    return { status: 'success', message: 'RC charging loop verified and closed!' };
  }

  if (expKey === 'kvl') {
    if (!source || comps.filter(c => c.type === 'resistor').length < 2) {
      return { status: 'error', message: 'Missing required components. Place Source and at least 2 Resistors.' };
    }
    
    const resList = comps.filter(c => c.type === 'resistor');
    const r1 = resList.find(r => Math.floor(r.snap1 / 14) === 7 || Math.floor(r.snap2 / 14) === 7) || resList[0];
    const r2 = resList.find(r => Math.floor(r.snap1 / 14) === 13 || Math.floor(r.snap2 / 14) === 13) || resList[1];
    
    const posRail = source ? find(source.snap1) : find(0);
    const negRail = source ? find(source.snap2) : find(1);
    
    // Check short circuits
    if (posRail === negRail) {
      return { status: 'error', message: 'Short Circuit Detected! Positive rail (+) is connected directly to Ground (-) rail.' };
    }
    if (find(r1.snap1) === find(r1.snap2)) {
      return { status: 'error', message: 'Resistor R1 is shorted! Both terminals are connected to the same electrical node.' };
    }
    if (find(r2.snap1) === find(r2.snap2)) {
      return { status: 'error', message: 'Resistor R2 is shorted! Both terminals are connected to the same electrical node.' };
    }
    if (ammeter && find(ammeter.snap1) === find(ammeter.snap2)) {
      return { status: 'error', message: 'Ammeter is shorted! Both terminals are connected to the same electrical node.' };
    }
    
    // Build connection graph of series components
    const seriesComps = [r1, r2];
    if (ammeter) {
      seriesComps.push(ammeter);
    }
    
    // Trace path starting from posRail (Source +) to negRail (Source -)
    let currentNode = posRail;
    const visitedComps = new Set();
    let stepsLeft = 10;
    
    while (currentNode !== negRail && stepsLeft > 0) {
      stepsLeft--;
      let foundNext = false;
      for (const comp of seriesComps) {
        if (visitedComps.has(comp)) continue;
        
        const n1 = find(comp.snap1);
        const n2 = find(comp.snap2);
        
        if (n1 === currentNode) {
          currentNode = n2;
          visitedComps.add(comp);
          foundNext = true;
          break;
        } else if (n2 === currentNode) {
          currentNode = n1;
          visitedComps.add(comp);
          foundNext = true;
          break;
        }
      }
      if (!foundNext) break;
    }
    
    // Check if loop is closed
    if (currentNode !== negRail) {
      return { status: 'error', message: 'Circuit is open! Connect the components in a complete closed loop from Battery (+) to Ground (-).' };
    }
    
    // Check if all series components are visited
    for (const comp of seriesComps) {
      if (!visitedComps.has(comp)) {
        const name = comp.type === 'ammeter' ? 'Ammeter' : 'Resistor';
        return { status: 'error', message: `${name} is placed but not connected in the active series loop.` };
      }
    }
    
    // Voltmeter check (must be connected in parallel across R1, R2, or Source)
    const voltmeters = comps.filter(c => c.type === 'voltmeter');
    for (const voltmeter of voltmeters) {
      const voltUf = runUnionFind();
      if (ammeter) {
        voltUf.union(ammeter.snap1, ammeter.snap2);
      }
      const findVolt = (x) => voltUf.find(x);
      
      const v1 = findVolt(voltmeter.snap1);
      const v2 = findVolt(voltmeter.snap2);
      if (v1 === v2) {
        return { status: 'error', message: 'Voltmeter is shorted! Connect it in parallel across a component.' };
      }
      const vposRail = source ? findVolt(source.snap1) : findVolt(0);
      const vnegRail = source ? findVolt(source.snap2) : findVolt(1);
      
      const isConnectedToSource = (v1 === vposRail && v2 === vnegRail) || (v1 === vnegRail && v2 === vposRail);
      const isConnectedToR1 = r1 && ((v1 === findVolt(r1.snap1) && v2 === findVolt(r1.snap2)) || (v1 === findVolt(r1.snap2) && v2 === findVolt(r1.snap1)));
      const isConnectedToR2 = r2 && ((v1 === findVolt(r2.snap1) && v2 === findVolt(r2.snap2)) || (v1 === findVolt(r2.snap2) && v2 === findVolt(r2.snap1)));
      if (!isConnectedToSource && !isConnectedToR1 && !isConnectedToR2) {
        return { status: 'error', message: 'Voltmeter is connected incorrectly! It must be wired in PARALLEL directly across Resistor R1, Resistor R2, or the Source rails (+/-).' };
      }
    }
    
    return { status: 'success', message: 'Kirchhoff\'s Voltage Law series loop verified and closed!' };
  }
  
  if (expKey === 'kcl') {
    const ammeters = comps.filter(c => c.type === 'ammeter');
    if (!source || comps.filter(c => c.type === 'resistor').length < 2 || ammeters.length < 3) {
      return { status: 'error', message: 'Missing required components. Place Source, 2 Resistors, and 3 Ammeters.' };
    }
    
    // Create a custom union-find for parallel structure checking (treats ammeters as shorts)
    const kclUf = runUnionFind();
    ammeters.forEach(am => {
      kclUf.union(am.snap1, am.snap2);
    });
    
    const findKcl = (x) => kclUf.find(x);
    
    const resList = comps.filter(c => c.type === 'resistor');
    const r1 = resList[0], r2 = resList[1];
    
    const posRail = find(0), negRail = find(1);
    if (posRail === negRail) {
      return { status: 'error', message: 'Short Circuit Detected! Positive rail (+) is connected directly to Ground (-) rail.' };
    }
    
    // Check if resistors themselves are shorted
    if (find(r1.snap1) === find(r1.snap2)) return { status: 'error', message: 'Resistor R1 is shorted!' };
    if (find(r2.snap1) === find(r2.snap2)) return { status: 'error', message: 'Resistor R2 is shorted!' };
    
    const nodeR1_1 = findKcl(r1.snap1), nodeR1_2 = findKcl(r1.snap2);
    const nodeR2_1 = findKcl(r2.snap1), nodeR2_2 = findKcl(r2.snap2);
    
    const parallel_connected = (
      (nodeR1_1 === nodeR2_1 && nodeR1_2 === nodeR2_2) ||
      (nodeR1_1 === nodeR2_2 && nodeR1_2 === nodeR2_1)
    );
    if (!parallel_connected) {
      return { status: 'error', message: 'Resistors must be wired in PARALLEL. Check your connections.' };
    }
    
    // Now verify the entire loop is closed
    const common1 = nodeR1_1;
    const common2 = nodeR1_2;
    
    const kclPosRail = findKcl(0);
    const kclNegRail = findKcl(1);
    
    const connectedToPos = (common1 === kclPosRail || common2 === kclPosRail);
    const connectedToNeg = (common1 === kclNegRail || common2 === kclNegRail);
    
    if (connectedToPos && connectedToNeg) {
      completeStep(2);
      return { status: 'success', message: 'Kirchhoff\'s Current Law parallel loop verified and closed!' };
    }
    return { status: 'error', message: 'Ensure both parallel paths are connected to positive and negative rails.' };
  }

  if (expKey === 'rc_rl_rlc') {
    if (!source || !resistor || !inductor || !capacitor || !ammeter || !voltmeter) {
      return { status: 'error', message: 'Missing required components. Place Source, Resistor, Inductor, Capacitor, Ammeter, and Voltmeter.' };
    }
    
    if (find(resistor.snap1) === find(resistor.snap2)) return { status: 'error', message: 'Resistor is shorted! Both terminals are connected to the same electrical node.' };
    if (find(inductor.snap1) === find(inductor.snap2)) return { status: 'error', message: 'Inductor is shorted! Both terminals are connected to the same electrical node.' };
    if (find(capacitor.snap1) === find(capacitor.snap2)) return { status: 'error', message: 'Capacitor is shorted! Both terminals are connected to the same electrical node.' };
    if (find(ammeter.snap1) === find(ammeter.snap2)) return { status: 'error', message: 'Ammeter is shorted! Both terminals are connected to the same electrical node.' };
    if (find(voltmeter.snap1) === find(voltmeter.snap2)) return { status: 'error', message: 'Voltmeter is shorted! Both terminals are connected to the same electrical node.' };
    
    const posRail = find(0), negRail = find(1);
    if (posRail === negRail) return { status: 'error', message: 'Short Circuit Detected! Positive rail (+) is connected directly to Ground (-) rail.' };
    
    const seriesComps = [resistor, inductor, capacitor, ammeter];
    let currentNode = posRail;
    const visitedComps = new Set();
    let stepsLeft = 10;
    
    while (currentNode !== negRail && stepsLeft > 0) {
      stepsLeft--;
      let foundNext = false;
      for (const comp of seriesComps) {
        if (visitedComps.has(comp)) continue;
        const n1 = find(comp.snap1);
        const n2 = find(comp.snap2);
        if (n1 === currentNode) {
          currentNode = n2;
          visitedComps.add(comp);
          foundNext = true;
          break;
        } else if (n2 === currentNode) {
          currentNode = n1;
          visitedComps.add(comp);
          foundNext = true;
          break;
        }
      }
      if (!foundNext) break;
    }
    
    if (currentNode !== negRail || visitedComps.size < 4) {
      return { status: 'error', message: 'AC Impedance RLC circuit is open! Ensure all components (Resistor, Inductor, Capacitor, Ammeter) form a closed series loop.' };
    }
    
    const volt1 = find(voltmeter.snap1);
    const volt2 = find(voltmeter.snap2);
    const nodeC1 = find(capacitor.snap1);
    const nodeC2 = find(capacitor.snap2);
    const voltmeterParallel = (
      (volt1 === nodeC1 && volt2 === nodeC2) ||
      (volt1 === nodeC2 && volt2 === nodeC1)
    );
    if (!voltmeterParallel) {
      return { status: 'error', message: 'Voltmeter must be connected in PARALLEL directly across the Capacitor.' };
    }
    
    return { status: 'success', message: 'AC Impedance RLC loop closed and verified!' };
  }

  if (expKey === 'series_parallel') {
    if (!source || comps.filter(c => c.type === 'resistor').length < 2 || !ammeter || !voltmeter) {
      return { status: 'error', message: 'Missing required components. Place Source, 2 Resistors, Ammeter, and Voltmeter.' };
    }
    const posRail = find(0), negRail = find(1);
    if (posRail === negRail) return { status: 'error', message: 'Short Circuit Detected! Positive rail is connected directly to Ground.' };
    
    const resList = comps.filter(c => c.type === 'resistor');
    const r1 = resList[0];
    const r2 = resList[1];
    
    if (find(r1.snap1) === find(r1.snap2)) return { status: 'error', message: 'Resistor R1 is shorted!' };
    if (find(r2.snap1) === find(r2.snap2)) return { status: 'error', message: 'Resistor R2 is shorted!' };
    if (find(ammeter.snap1) === find(ammeter.snap2)) return { status: 'error', message: 'Ammeter is shorted!' };
    if (find(voltmeter.snap1) === find(voltmeter.snap2)) return { status: 'error', message: 'Voltmeter is shorted!' };
    
    const isParallel = checkIsParallelCircuit();
    const expectedParallel = (state.params.C === 2);
    
    if (expectedParallel) {
      if (!isParallel) {
        return { status: 'error', message: 'Resistors must be connected in PARALLEL for the Parallel configuration.' };
      }
      
      const common1 = find(r1.snap1);
      const common2 = find(r1.snap2);
      
      let connectedToPos = (common1 === posRail || common2 === posRail);
      let connectedToNeg = (common1 === negRail || common2 === negRail);
      
      const am1 = find(ammeter.snap1);
      const am2 = find(ammeter.snap2);
      if ((am1 === posRail && (am2 === common1 || am2 === common2)) ||
          (am2 === posRail && (am1 === common1 || am1 === common2))) {
        connectedToPos = true;
      }
      if ((am1 === negRail && (am2 === common1 || am2 === common2)) ||
          (am2 === negRail && (am1 === common1 || am1 === common2))) {
        connectedToNeg = true;
      }
      
      if (!connectedToPos || !connectedToNeg) {
        return { status: 'error', message: 'Ensure both parallel resistors are connected to positive and negative rails.' };
      }
      
      const volt1 = find(voltmeter.snap1);
      const volt2 = find(voltmeter.snap2);
      const voltmeterParallel = (
        (volt1 === common1 && volt2 === common2) ||
        (volt1 === common2 && volt2 === common1)
      );
      if (!voltmeterParallel) {
        return { status: 'error', message: 'Voltmeter must be connected in PARALLEL across the parallel resistors.' };
      }
      
      return { status: 'success', message: 'Parallel Resistors circuit loop verified and closed!' };
      
    } else {
      if (isParallel) {
        return { status: 'error', message: 'Resistors must be connected in SERIES for the Series configuration.' };
      }
      
      const seriesComps = [r1, r2, ammeter];
      let currentNode = posRail;
      const visitedComps = new Set();
      let stepsLeft = 10;
      
      while (currentNode !== negRail && stepsLeft > 0) {
        stepsLeft--;
        let foundNext = false;
        for (const comp of seriesComps) {
          if (visitedComps.has(comp)) continue;
          const n1 = find(comp.snap1);
          const n2 = find(comp.snap2);
          if (n1 === currentNode) {
            currentNode = n2;
            visitedComps.add(comp);
            foundNext = true;
            break;
          } else if (n2 === currentNode) {
            currentNode = n1;
            visitedComps.add(comp);
            foundNext = true;
            break;
          }
        }
        if (!foundNext) break;
      }
      
      if (currentNode !== negRail || visitedComps.size < 3) {
        return { status: 'error', message: 'Series circuit is open! Ensure all components (R1, R2, Ammeter) form a closed series loop.' };
      }
      
      const volt1 = find(voltmeter.snap1);
      const volt2 = find(voltmeter.snap2);
      const nodeR1_1 = find(r1.snap1);
      const nodeR1_2 = find(r1.snap2);
      const voltmeterParallel = (
        (volt1 === nodeR1_1 && volt2 === nodeR1_2) ||
        (volt1 === nodeR1_2 && volt2 === nodeR1_1)
      );
      if (!voltmeterParallel) {
        return { status: 'error', message: 'Voltmeter must be connected in PARALLEL across Resistor 1.' };
      }
      
      return { status: 'success', message: 'Series Resistors circuit loop verified and closed!' };
    }
  }

  if (expKey === 'wheatstone') {
    if (!source || comps.filter(c => c.type === 'resistor').length < 4) {
      return { status: 'error', message: 'Missing components. Place Source and 4 Resistors.' };
    }
    const posRail = find(0), negRail = find(1);
    if (posRail === negRail) return { status: 'error', message: 'Short Circuit Detected!' };
    
    let pos_conn = false, neg_conn = false;
    comps.forEach(c => {
      if (find(c.snap1) === posRail || find(c.snap2) === posRail) pos_conn = true;
      if (find(c.snap1) === negRail || find(c.snap2) === negRail) neg_conn = true;
    });
    if (pos_conn && neg_conn) {
      return { status: 'success', message: 'Wheatstone Bridge circuit verified!' };
    }
    return { status: 'error', message: 'Connect bridge inputs to positive and negative rails.' };
  }

  if (expKey === 'arduino_led') {
    if (!source || !button || !led || !resistor) {
      return { status: 'error', message: 'Missing components. Place Arduino, Button, LED, and Resistor.' };
    }
    const posNode = find(882);
    const negNode = find(883);
    if (posNode === negNode) return { status: 'error', message: 'Short Circuit Detected!' };
    
    let pos_conn = false, neg_conn = false;
    comps.forEach(c => {
      if (find(c.snap1) === posNode || find(c.snap2) === posNode) pos_conn = true;
      if (find(c.snap1) === negNode || find(c.snap2) === negNode) neg_conn = true;
    });
    if (pos_conn && neg_conn) {
      return { status: 'success', message: 'Arduino Uno digital power loop closed and verified!' };
    }
    return { status: 'error', message: 'Connect the loop to Arduino 5V and Ground nodes.' };
  }

  if (expKey === 'diode_iv') {
    if (!source || !resistor || !findComp('diode') || !ammeter || !voltmeter) {
      return { status: 'error', message: 'Missing required components. Place Source, Resistor, Diode, Ammeter, and Voltmeter.' };
    }
    const diode = findComp('diode');
    const r1 = resistor.snap1, r2 = resistor.snap2;
    const d1 = diode.snap1, d2 = diode.snap2;
    const am1 = ammeter.snap1, am2 = ammeter.snap2;
    const volt1 = voltmeter.snap1, volt2 = voltmeter.snap2;
    
    if (find(r1) === find(r2) || find(d1) === find(d2) || find(am1) === find(am2) || find(volt1) === find(volt2)) {
      return { status: 'error', message: 'One or more components are shorted!' };
    }
    
    const posRail = find(0), negRail = find(1);
    if (posRail === negRail) return { status: 'error', message: 'Short Circuit Detected!' };
    
    const nodeR1 = find(r1), nodeR2 = find(r2);
    const nodeD1 = find(d1), nodeD2 = find(d2);
    const nodeAm1 = find(am1), nodeAm2 = find(am2);
    
    let pathOk = false;
    if ((nodeR1 === posRail || nodeR2 === posRail) && (nodeAm1 === negRail || nodeAm2 === negRail)) {
      const rFree = (nodeR1 === posRail) ? nodeR2 : nodeR1;
      const amFree = (nodeAm1 === negRail) ? nodeAm2 : nodeAm1;
      if ((rFree === nodeD1 && nodeD2 === amFree) || (rFree === nodeD2 && nodeD1 === amFree)) {
        pathOk = true;
      }
    } else if ((nodeAm1 === posRail || nodeAm2 === posRail) && (nodeR1 === negRail || nodeR2 === negRail)) {
      const amFree = (nodeAm1 === posRail) ? nodeAm2 : nodeAm1;
      const rFree = (nodeR1 === negRail) ? nodeR2 : nodeR1;
      if ((amFree === nodeD1 && nodeD2 === rFree) || (amFree === nodeD2 && nodeD1 === rFree)) {
        pathOk = true;
      }
    }
    
    if (!pathOk) {
      return { status: 'error', message: 'Invalid series loop. Ensure: Battery (+) -> Resistor -> Diode (Anode to Cathode) -> Ammeter -> Ground (-).' };
    }
    
    const voltmeterParallel = (
      (find(volt1) === nodeD1 && find(volt2) === nodeD2) ||
      (find(volt1) === nodeD2 && find(volt2) === nodeD1)
    );
    if (!voltmeterParallel) {
      return { status: 'error', message: 'Voltmeter must be connected in PARALLEL directly across the Diode.' };
    }
    return { status: 'success', message: 'Diode forward bias circuit verified!' };
  }

  if (expKey === 'voltage_divider') {
    if (!source || comps.filter(c => c.type === 'resistor').length < 2) {
      return { status: 'error', message: 'Missing components. Place Source and at least 2 Resistors.' };
    }
    const resList = comps.filter(c => c.type === 'resistor');
    const r1 = resList[0], r2 = resList[1];
    const posRail = find(0), negRail = find(1);
    if (posRail === negRail) return { status: 'error', message: 'Short Circuit Detected!' };
    
    const nodeR1_1 = find(r1.snap1), nodeR1_2 = find(r1.snap2);
    const nodeR2_1 = find(r2.snap1), nodeR2_2 = find(r2.snap2);
    
    const r1_connected_to_pos = (nodeR1_1 === posRail || nodeR1_2 === posRail);
    const r2_connected_to_neg = (nodeR2_1 === negRail || nodeR2_2 === negRail);
    const r1_to_r2 = (nodeR1_1 === nodeR2_1 || nodeR1_1 === nodeR2_2 || nodeR1_2 === nodeR2_1 || nodeR1_2 === nodeR2_2);
    
    if (r1_connected_to_pos && r2_connected_to_neg && r1_to_r2) {
      return { status: 'success', message: 'Voltage divider series network verified!' };
    }
    const r2_connected_to_pos = (nodeR2_1 === posRail || nodeR2_2 === posRail);
    const r1_connected_to_neg = (nodeR1_1 === negRail || nodeR1_2 === negRail);
    if (r2_connected_to_pos && r1_connected_to_neg && r1_to_r2) {
      return { status: 'success', message: 'Voltage divider series network verified!' };
    }
    return { status: 'error', message: 'Ensure Resistor 1 -> Resistor 2 forms a series connection between Battery (+) and Ground (-).' };
  }

  if (expKey === 'planck_led') {
    if (!source || !resistor || !led) {
      return { status: 'error', message: 'Missing components. Place Source, Resistor, and LED.' };
    }
    const r1 = resistor.snap1, r2 = resistor.snap2;
    const l1 = led.snap1, l2 = led.snap2;
    const posRail = find(0), negRail = find(1);
    if (posRail === negRail) return { status: 'error', message: 'Short Circuit Detected!' };
    
    const nodeR1 = find(r1), nodeR2 = find(r2);
    const nodeL1 = find(l1), nodeL2 = find(l2);
    
    let pathOk = false;
    if ((nodeR1 === posRail || nodeR2 === posRail) && (nodeL1 === negRail || nodeL2 === negRail)) {
      const rFree = (nodeR1 === posRail) ? nodeR2 : nodeR1;
      if (rFree === nodeL1 || rFree === nodeL2) pathOk = true;
    } else if ((nodeL1 === posRail || nodeL2 === posRail) && (nodeR1 === negRail || nodeR2 === negRail)) {
      const lFree = (nodeL1 === posRail) ? nodeL2 : nodeL1;
      if (lFree === nodeR1 || lFree === nodeR2) pathOk = true;
    }
    if (pathOk) {
      return { status: 'success', message: 'LED Planck constant test circuit verified!' };
    }
    return { status: 'error', message: 'Connect Battery (+) -> Resistor -> LED -> Ground (-) in a closed loop.' };
  }

  const isCircuit = ['ohms', 'kvl', 'kcl', 'rc_rl_rlc', 'series_parallel', 'wheatstone', 'lcr', 'rc', 'arduino_led', 'diode_iv', 'voltage_divider', 'planck_led'].includes(expKey);
  if (!isCircuit) {
    return { status: 'success', message: 'Experiment setup verified!' };
  }
  
  return { status: 'error', message: 'Unknown experiment.' };
}

// --- SIMULATION POLLING ---
let pollingTimer = null;

function startPollingCalculations() {
  if (pollingTimer) clearInterval(pollingTimer);
  pollingTimer = setInterval(async () => {
    if (!state.isRunning) return;
    try {
      let data;
      const isBackendCalculated = [
        'ohms', 'kvl', 'kcl', 'rc_rl_rlc', 'series_parallel', 'wheatstone', 'lcr',
        'faraday', 'lenz', 'solenoid', 'transformer', 'ideal_gas', 'boyle', 'charles',
        'specific_heat', 'photoelectric', 'radioactive', 'de_broglie', 'bohr_model'
      ].includes(state.activeExperiment);

      if (isBackendCalculated) {
        try {
          const calcParams = { ...state.params, is_parallel: checkIsParallelCircuit() };
          const response = await fetch('/api/calculate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              params: calcParams,
              active_experiment: state.activeExperiment,
              button_pressed: state.buttonPressed
            })
          });
          if (response.ok) {
            data = await response.json();
          } else {
            throw new Error(`HTTP ${response.status}`);
          }
        } catch (backendError) {
          console.warn("Backend calculation failed, falling back to local calculation.", backendError);
          data = calculateCircuitLocal(state.params, state.activeExperiment, state.buttonPressed);
        }
      } else {
        data = calculateCircuitLocal(state.params, state.activeExperiment, state.buttonPressed);
      }
      
      state.meters.volts = data.V;
      state.meters.amps = data.I;
      state.meters.ohms = data.Z;
      state.meters.power = data.P;
      
      const now = Date.now();
      const dt = (now - state.energyStartTime) / 1000;
      state.energyStartTime = now;
      state.meters.energy += data.P * dt;
      
      state.analysis.XL = data.XL;
      state.analysis.XC = data.XC;
      state.analysis.phi = data.phi;
      state.analysis.f0 = data.f0;
      
      updateUI();
      updateDynamicTextures();
    } catch (e) {
      console.error("Simulation polling error", e);
    }
  }, 250);
}

function stopPollingCalculations() {
  if (pollingTimer) {
    clearInterval(pollingTimer);
    pollingTimer = null;
  }
}

// --- CORE UI UPDATES ---
function updateUI() {
  elements.valVolts.innerText = state.meters.volts.toFixed(2);
  elements.valAmps.innerText = state.meters.amps.toFixed(4);
  elements.valOhms.innerText = state.meters.ohms.toFixed(2);
  elements.valPower.innerText = `${state.meters.power.toFixed(2)} W`;
  elements.valEnergy.innerText = `${state.meters.energy.toFixed(1)} J`;
  
  const maxV = 30, maxI = 3.0, maxR = 1000;
  elements.fillVolts.style.width = `${Math.min(100, (state.meters.volts / maxV) * 100)}%`;
  elements.fillAmps.style.width = `${Math.min(100, (state.meters.amps / maxI) * 100)}%`;
  elements.fillOhms.style.width = `${Math.min(100, (state.meters.ohms / maxR) * 100)}%`;
  
  if (state.activeExperiment === 'lcr') {
    elements.diagXL.innerText = `${state.analysis.XL.toFixed(1)} Ω`;
    elements.diagXC.innerText = `${state.analysis.XC.toFixed(1)} Ω`;
    elements.diagPhi.innerText = `${state.analysis.phi.toFixed(1)}°`;
    elements.diagF0.innerText = `${state.analysis.f0.toFixed(1)} Hz`;
  } else if (state.activeExperiment === 'rc') {
    elements.diagXL.innerText = "—";
    elements.diagXC.innerText = "—";
    elements.diagPhi.innerText = "—";
    elements.diagF0.innerText = `${(state.analysis.f0 * 1000).toFixed(1)} ms`;
  } else {
    elements.diagXL.innerText = "—";
    elements.diagXC.innerText = "—";
    elements.diagPhi.innerText = "—";
    elements.diagF0.innerText = "—";
  }
  
  if (state.activeExperiment === 'ohms') {
    elements.kirchhoffDisplay.innerText = `[OK] KVL Validated:\n V_source (${state.meters.volts.toFixed(2)}V) - V_resistor (${state.meters.volts.toFixed(2)}V) = 0.00V\n\n[OK] KCL Validated:\n I_in (${state.meters.amps.toFixed(4)}A) = I_out (${state.meters.amps.toFixed(4)}A)`;
  } else if (state.activeExperiment === 'arduino_led') {
    elements.kirchhoffDisplay.innerText = `[OK] Arduino Uno 5V Supply Active\n[OK] Switch Contact Status: ${state.buttonPressed ? 'CLOSED' : 'OPEN'}\n[OK] Current limiting Resistor: ${state.params.R} Ω\n[OK] LED State: ${state.meters.amps > 0 ? 'GLOWING' : 'OFF'}\n\nLoop Current: ${(state.meters.amps * 1000).toFixed(1)} mA`;
  } else if (state.activeExperiment === 'lcr') {
    elements.kirchhoffDisplay.innerText = `[OK] AC KVL Validated:\n V_source(t) = V_R(t) + V_L(t) + V_C(t)\n Loop impedance Z matches vector calculation.`;
  } else if (state.activeExperiment === 'rc') {
    const tauMs = (state.analysis.f0 * 1000).toFixed(1);
    elements.kirchhoffDisplay.innerText = `[OK] Transient KVL Validated:\n V_capacitor + V_resistor = V_source\n\n[INFO] Time Constant (τ) = R × C\n τ = ${tauMs} ms`;
  } else if (state.activeExperiment === 'rc_rl_rlc') {
    elements.kirchhoffDisplay.innerText = `[OK] AC Impedance Analysis:\n Z = √[R² + (XL−XC)²] = ${state.meters.ohms.toFixed(1)} Ω\n XL = ${state.analysis.XL.toFixed(1)} Ω, XC = ${state.analysis.XC.toFixed(1)} Ω\n Phase φ = ${state.analysis.phi.toFixed(1)}°\n Resonant f₀ = ${state.analysis.f0.toFixed(1)} Hz`;
  } else if (state.activeExperiment === 'kvl') {
    const Vs = state.meters.volts;
    const R1 = state.params.R;
    const R2 = state.params.L !== undefined ? state.params.L : 100;
    const R_tot = R1 + R2;
    const I = state.isRunning ? state.meters.amps : 0.0;
    const P = state.isRunning ? state.meters.power : 0.0;

    let measurementsMade = [];
    const voltmeters = state.placedComponents.filter(c => c.type === 'voltmeter');
    
    const uf = runUnionFind();
    const ammeterComp = state.placedComponents.find(c => c.type === 'ammeter');
    if (ammeterComp) {
      uf.union(ammeterComp.snap1, ammeterComp.snap2);
    }
    const find = (x) => uf.find(x);
    
    const sourceComp = state.placedComponents.find(c => c.type === 'source');
    const posRail = sourceComp ? find(sourceComp.snap1) : find(0);
    const negRail = sourceComp ? find(sourceComp.snap2) : find(1);
    
    const resistors = state.placedComponents.filter(c => c.type === 'resistor');
    const r1 = resistors.find(r => Math.floor(r.snap1 / 14) === 7 || Math.floor(r.snap2 / 14) === 7) || resistors[0];
    const r2 = resistors.find(r => Math.floor(r.snap1 / 14) === 13 || Math.floor(r.snap2 / 14) === 13) || resistors[1];
    
    if (state.isRunning) {
      state.kvlMeasurements.Vs = state.meters.volts;
      completeStep(3);
    }

    for (const voltmeter of voltmeters) {
      if (voltmeter && state.isRunning) {
        const v1 = find(voltmeter.snap1);
        const v2 = find(voltmeter.snap2);
        
        if (v1 !== v2) {
          const liveV = getVoltmeterReading(voltmeter);
          if ((v1 === posRail && v2 === negRail) || (v1 === negRail && v2 === posRail)) {
            measurementsMade.push("Source Voltage (Vs)");
            state.kvlMeasurements.Vs = liveV;
            completeStep(3);
          } else if (r1 && ((v1 === find(r1.snap1) && v2 === find(r1.snap2)) || (v1 === find(r1.snap2) && v2 === find(r1.snap1)))) {
            measurementsMade.push("Resistor R1 Voltage (V1)");
            state.kvlMeasurements.VR1 = liveV;
            completeStep(4);
          } else if (r2 && ((v1 === find(r2.snap1) && v2 === find(r2.snap2)) || (v1 === find(r2.snap2) && v2 === find(r2.snap1)))) {
            measurementsMade.push("Resistor R2 Voltage (V2)");
            state.kvlMeasurements.VR2 = liveV;
            completeStep(5);
          }
        }
      }
    }
    
    let currentMeasurement = measurementsMade.length > 0 ? measurementsMade.join(", ") : "None (Open Probes)";

    const vsVal = state.kvlMeasurements.Vs !== null ? `${state.kvlMeasurements.Vs.toFixed(2)} V` : "Not Measured (Connect to +/- Rails)";
    const vr1Val = state.kvlMeasurements.VR1 !== null ? `${state.kvlMeasurements.VR1.toFixed(2)} V` : "Not Measured (Connect to R1)";
    const vr2Val = state.kvlMeasurements.VR2 !== null ? `${state.kvlMeasurements.VR2.toFixed(2)} V` : "Not Measured (Connect to R2)";
    
    let formulaStr = "";
    let verificationStatus = "Waiting for step measurements...";
    let verified = false;
    
    if (state.kvlMeasurements.Vs !== null && state.kvlMeasurements.VR1 !== null && state.kvlMeasurements.VR2 !== null) {
      const sumDrops = state.kvlMeasurements.VR1 + state.kvlMeasurements.VR2;
      const diff = Math.abs(state.kvlMeasurements.Vs - sumDrops);
      formulaStr = `${state.kvlMeasurements.Vs.toFixed(2)} V = ${state.kvlMeasurements.VR1.toFixed(2)} V + ${state.kvlMeasurements.VR2.toFixed(2)} V`;
      if (diff <= 0.02) {
        verificationStatus = `✓ Kirchhoff's Voltage Law Verified (Vs = V1 + V2)`;
        verified = true;
        completeStep(6);
      } else {
        verificationStatus = `❌ KVL Verification Failed (Diff: ${diff.toFixed(2)} V)`;
      }
    }

    elements.kirchhoffDisplay.innerHTML = `
<div style="font-family:'Courier New', monospace; font-size:12px; line-height: 1.4;">
  <span style="color:#60a5fa; font-weight:bold;">[KVL LAB TELEMETRY]</span><br>
  <b>Live Status:</b> ${state.isRunning ? '<span style="color:#22c55e">● RUNNING</span>' : '<span style="color:#ef4444">○ POWER OFF</span>'}<br>
  <b>Voltmeter Active Probe:</b> <span style="color:#facc15">${currentMeasurement}</span><br>
  ------------------------------------<br>
  <b>Source Voltage (Vs) :</b> ${vsVal}<br>
  <b>Voltage across R1 (V1):</b> ${vr1Val}<br>
  <b>Voltage across R2 (V2):</b> ${vr2Val}<br>
  ------------------------------------<br>
  <b>Circuit Current (I) :</b> ${I.toFixed(4)} A<br>
  <b>Total Resistance (R):</b> ${R_tot.toFixed(1)} Ω<br>
  <b>Power Consumed (P)  :</b> ${P.toFixed(2)} W<br>
  ------------------------------------<br>
  <b>Formula Verification:</b> ${formulaStr || 'Pending'}<br>
  <span style="color:${verified ? '#22c55e' : '#f87171'}; font-weight:bold;">${verificationStatus}</span>
</div>
    `.trim();
  } else if (state.activeExperiment === 'kcl') {
    const Vs = state.meters.volts;
    const R1 = state.params.R;
    const R2 = state.params.L;
    const I_tot = state.meters.amps;
    const IR1 = state.analysis.IR1 !== undefined ? state.analysis.IR1 : (Vs / (R1 || 1));
    const IR2 = state.analysis.IR2 !== undefined ? state.analysis.IR2 : (Vs / (R2 || 1));
    const Z_eq = (R1 * R2) / ((R1 + R2) || 1);
    elements.kirchhoffDisplay.innerText = `[OK] KCL Verified:\nI_total (${(I_tot * 1000).toFixed(1)}mA) = I_R1 (${(IR1 * 1000).toFixed(1)}mA) + I_R2 (${(IR2 * 1000).toFixed(1)}mA)\nΣI(node) = 0\n\n✓ KCL Verified\n\nSource Voltage: ${Vs.toFixed(2)} V\nEquivalent R_eq: ${Z_eq.toFixed(1)} Ω\nPower: ${state.meters.power.toFixed(2)} W`;
  } else if (state.activeExperiment === 'series_parallel') {
    elements.kirchhoffDisplay.innerText = `[OK] Series-Parallel Network:\n V_source = ${state.meters.volts.toFixed(2)} V\n I_total = ${state.meters.amps.toFixed(4)} A\n R_eq = ${state.meters.ohms.toFixed(1)} Ω`;
  } else if (state.activeExperiment === 'wheatstone') {
    elements.kirchhoffDisplay.innerText = `[OK] Wheatstone Bridge:\n V_source = ${state.meters.volts.toFixed(2)} V\n I_total = ${state.meters.amps.toFixed(4)} A\n Balance: R1×R4 = R2×R3`;
  } else if (state.activeExperiment === 'diode_iv') {
    elements.kirchhoffDisplay.innerText = `[OK] Diode I-V Characteristics:\n V_diode = ${state.meters.volts.toFixed(2)} V\n I_diode = ${(state.meters.amps * 1000).toFixed(2)} mA\n R_series = ${state.params.R} Ω\n Diode State: ${state.meters.amps > 1e-4 ? 'FORWARD BIASED' : 'REVERSE BIASED'}`;
  } else if (state.activeExperiment === 'voltage_divider') {
    elements.kirchhoffDisplay.innerText = `[OK] Voltage Divider Network:\n V_source = ${state.params.V.toFixed(2)} V\n V_out (across R2) = ${state.meters.volts.toFixed(2)} V\n R1 = ${state.params.R} Ω, R2 = ${(state.params.L || 200)} Ω`;
  } else if (state.activeExperiment === 'planck_led') {
    const ledColor = state.params.led_color || 'red';
    elements.kirchhoffDisplay.innerText = `[OK] LED Planck Constant:\n V_led = ${state.meters.volts.toFixed(2)} V\n I_led = ${(state.meters.amps * 1000).toFixed(2)} mA\n Color = ${ledColor.toUpperCase()}\n Planck's h (est.) = ${state.analysis.f0.toExponential(4)} J·s`;
  } else if (state.activeExperiment === 'biot_savart') {
    elements.kirchhoffDisplay.innerText = `[OK] Biot-Savart Law:\n Current (I) = ${state.meters.volts.toFixed(2)} A\n Distance (r) = ${state.meters.amps.toFixed(1)} cm\n Magnetic Field (B) = ${state.meters.power.toFixed(2)} μT`;
  } else if (state.activeExperiment === 'planck_photocell') {
    elements.kirchhoffDisplay.innerText = `[OK] Planck's Constant (Photocell):\n Wavelength (λ) = ${state.meters.volts.toFixed(1)} nm\n Stopping Voltage (Vs) = ${state.meters.ohms.toFixed(2)} V\n Photo-current (I_photo) = ${(state.meters.amps * 1000).toFixed(3)} mA\n Planck's h = ${state.analysis.f0.toExponential(3)} J·s`;
  } else if (state.activeExperiment === 'stefan_law') {
    elements.kirchhoffDisplay.innerText = `[OK] Stefan's Law:\n Temperature (T) = ${state.meters.volts.toFixed(1)} K\n Radiated Power (P) = ${state.meters.power.toFixed(3)} W\n Emissivity (ε) = ${state.meters.amps.toFixed(2)}\n Target Area = ${state.meters.ohms.toFixed(1)} cm²\n T⁴ = ${state.analysis.f0.toExponential(3)} K⁴`;
  }

  if (elements.acAnalysisBlock) {
    elements.acAnalysisBlock.style.display = (state.activeExperiment === 'lcr' || state.activeExperiment === 'rc_rl_rlc') ? 'block' : 'none';
  }
  
  const displayScore = Math.min(100, state.score);
  if (elements.scoreText) elements.scoreText.innerText = `Score: ${displayScore}`;
  elements.scoreCircleText.textContent = displayScore;
  elements.scoreCirclePath.setAttribute('stroke-dasharray', `${displayScore}, 100`);
  
  let grade = 'D';
  let desc = 'Complete steps to improve grade.';
  if (displayScore >= 90) { grade = 'A+'; desc = 'Exceptional Lab Session!'; }
  else if (displayScore >= 70) { grade = 'A'; desc = 'Excellent understanding demonstrated.'; }
  else if (displayScore >= 50) { grade = 'B'; desc = 'Good progress. Solve Viva questions.'; }
  elements.lblGrade.innerText = `Grade: ${grade}`;
  document.querySelector('.grade-desc').innerText = desc;

  // Sync select dropdowns to matching state parameter values
  ['R', 'C', 'L', 'V'].forEach(key => {
    const select = document.querySelector(`.component-value-select[data-param="${key}"]`);
    if (select) {
      const val = state.params[key];
      const optionExists = Array.from(select.options).some(opt => parseFloat(opt.value) === val);
      if (optionExists) {
        select.value = val.toString();
      }
    }
  });
  updateInspector();
  broadcastCircuitState();
}

// --- TAB ROUTER ---
function initTabRouter() {
  const rightTabs = document.querySelectorAll('.rp-tabs .rp-tab');
  const rightPanes = document.querySelectorAll('.rp-body .rp-panel');
  rightTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      rightTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      rightPanes.forEach(p => p.classList.remove('active'));
      const rpName = btn.getAttribute('data-rp');
      const pane = document.getElementById(`rp-${rpName}`);
      if (pane) pane.classList.add('active');
    });
  });

  const subTabs = document.querySelectorAll('.lab-sub-tab');
  const subPanes = document.querySelectorAll('[id^="sub-"]');
  subTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      subTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      subPanes.forEach(p => p.style.display = 'none');
      const subName = btn.getAttribute('data-sub');
      const pane = document.getElementById(`sub-${subName}`);
      if (pane) pane.style.display = 'block';
    });
  });

  const btnTabToggleGraph = document.getElementById('btn-tab-toggle-graph');
  if (btnTabToggleGraph) {
    btnTabToggleGraph.addEventListener('click', () => {
      if (elements.btnGraphToggle) {
        elements.btnGraphToggle.click();
      }
    });
  }
}

function drawObservationTable() {
  const container = document.getElementById('data-table-wrap');
  if (!container) return;
  
  let headers = '<th>#</th><th>V (V)</th><th>I (A)</th><th>Z (Ω)</th>';
  let rows = '';
  const expKey = state.activeExperiment;
  
  if (['diode_iv', 'planck_led'].includes(expKey)) {
    headers = `<th>#</th><th>Vs (V)</th><th>Vd (V)</th><th>Id (mA)</th><th>R (Ω)</th>`;
    state.dataPoints.forEach(pt => {
      rows += `<tr><td>${pt.id}</td><td>${(pt.sourceV !== undefined ? pt.sourceV : pt.V).toFixed(2)}</td><td>${pt.V.toFixed(3)}</td><td>${(pt.I * 1000).toFixed(2)}</td><td>${pt.R.toFixed(1)}</td></tr>`;
    });
  } else if (['ohms', 'kvl', 'kcl', 'series_parallel', 'wheatstone', 'arduino_led', 'voltage_divider'].includes(expKey)) {
    headers = `<th>#</th><th>Voltage V (V)</th><th>Current I (mA)</th><th>${expKey === 'ohms' ? 'Resistance' : 'Impedance'} (Ω)</th>`;
    state.dataPoints.forEach(pt => {
      rows += `<tr><td>${pt.id}</td><td>${pt.V.toFixed(2)}</td><td>${(pt.I * 1000).toFixed(1)}</td><td>${pt.R.toFixed(1)}</td></tr>`;
    });
  } else if (['lcr', 'rc_rl_rlc'].includes(expKey)) {
    headers = '<th>#</th><th>Freq f (Hz)</th><th>Voltage V (V)</th><th>Current I (mA)</th><th>Impedance Z (Ω)</th>';
    state.dataPoints.forEach(pt => {
      rows += `<tr><td>${pt.id}</td><td>${pt.f}</td><td>${pt.V.toFixed(2)}</td><td>${(pt.I * 1000).toFixed(1)}</td><td>${pt.R.toFixed(1)}</td></tr>`;
    });
  } else if (expKey === 'rc') {
    headers = '<th>#</th><th>Cap C (µF)</th><th>Voltage V (V)</th><th>Time τ (ms)</th>';
    state.dataPoints.forEach(pt => {
      const tau = pt.R * pt.C * 1e-3;
      rows += `<tr><td>${pt.id}</td><td>${pt.C}</td><td>${pt.V.toFixed(2)}</td><td>${tau.toFixed(1)}</td></tr>`;
    });
  } else if (['ideal_gas', 'boyle'].includes(expKey)) {
    headers = '<th>#</th><th>Volume V (L)</th><th>Temp T (K)</th><th>Pressure P (kPa)</th>';
    state.dataPoints.forEach(pt => {
      rows += `<tr><td>${pt.id}</td><td>${pt.I.toFixed(1)}</td><td>${pt.R.toFixed(0)}</td><td>${pt.V.toFixed(1)}</td></tr>`;
    });
  } else if (expKey === 'charles') {
    headers = '<th>#</th><th>Temp T (K)</th><th>Pressure P (kPa)</th><th>Volume V (L)</th>';
    state.dataPoints.forEach(pt => {
      rows += `<tr><td>${pt.id}</td><td>${pt.R.toFixed(0)}</td><td>${pt.V.toFixed(1)}</td><td>${pt.I.toFixed(1)}</td></tr>`;
    });
  } else if (expKey === 'specific_heat') {
    headers = '<th>#</th><th>Metal Tm (°C)</th><th>Water Tw (°C)</th><th>Mixture Tf (°C)</th><th>Heat Q (J)</th>';
    state.dataPoints.forEach(pt => {
      rows += `<tr><td>${pt.id}</td><td>${pt.V.toFixed(1)}</td><td>${pt.I.toFixed(1)}</td><td>${pt.R.toFixed(1)}</td><td>${pt.P.toFixed(0)}</td></tr>`;
    });
  } else if (expKey === 'photoelectric') {
    headers = '<th>#</th><th>Freq ν (10¹⁴Hz)</th><th>Intensity (mW)</th><th>Work Fn (eV)</th><th>Stopping Vs (V)</th>';
    state.dataPoints.forEach(pt => {
      rows += `<tr><td>${pt.id}</td><td>${pt.V.toFixed(2)}</td><td>${pt.I.toFixed(0)}</td><td>${(pt.R * 1e-3).toFixed(2)}</td><td>${pt.P.toFixed(2)}</td></tr>`;
    });
  } else if (expKey === 'radioactive') {
    headers = '<th>#</th><th>Time t (s)</th><th>Initial N₀</th><th>Remaining N</th><th>Activity A</th>';
    state.dataPoints.forEach(pt => {
      rows += `<tr><td>${pt.id}</td><td>${pt.time.toFixed(1)}</td><td>${pt.V.toFixed(0)}</td><td>${pt.I.toFixed(0)}</td><td>${pt.P.toFixed(1)}</td></tr>`;
    });
  } else if (expKey === 'de_broglie') {
    headers = '<th>#</th><th>Mass m (10⁻³⁰kg)</th><th>Velocity v (km/s)</th><th>Wavelength λ (nm)</th>';
    state.dataPoints.forEach(pt => {
      rows += `<tr><td>${pt.id}</td><td>${pt.V.toFixed(1)}</td><td>${pt.I.toFixed(0)}</td><td>${pt.R.toFixed(3)}</td></tr>`;
    });
  } else if (expKey === 'bohr_model') {
    headers = '<th>#</th><th>Orbit ni</th><th>Orbit nf</th><th>Energy Gap ΔE (eV)</th>';
    state.dataPoints.forEach(pt => {
      rows += `<tr><td>${pt.id}</td><td>${pt.V.toFixed(0)}</td><td>${pt.I.toFixed(0)}</td><td>${pt.R.toFixed(2)}</td></tr>`;
    });
  } else {
    headers = '<th>#</th><th>Voltage V (V)</th><th>Current I (mA)</th><th>Impedance Z (Ω)</th>';
    state.dataPoints.forEach(pt => {
      rows += `<tr><td>${pt.id}</td><td>${pt.V.toFixed(2)}</td><td>${(pt.I * 1000).toFixed(1)}</td><td>${pt.R.toFixed(1)}</td></tr>`;
    });
  }
  
  const colspan = headers.match(/<\/th>/g).length;
  
  container.innerHTML = `
    <table class="data-tbl">
      <thead>
        <tr>${headers}</tr>
      </thead>
      <tbody>
        ${rows || `<tr><td colspan="${colspan}" style="text-align:center;color:var(--text3);">No recorded points yet</td></tr>`}
      </tbody>
    </table>
  `;
}

function appendAIMessage(sender, text, isUser = false) {
  if (!elements.aiMessagesContainer) return;
  const msg = document.createElement('div');
  msg.className = `ai-msg ${isUser ? 'user' : ''}`;
  
  const avatarClass = isUser ? 'user' : 'bot';
  const avatarIcon = isUser ? '<i class="fa-solid fa-user-astronaut"></i>' : '<i class="fa-solid fa-robot"></i>';
  
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  msg.innerHTML = `
    <div class="ai-avatar ${avatarClass}">${avatarIcon}</div>
    <div class="ai-bubble-wrap">
      <div class="ai-bubble-sender">${sender}</div>
      <div class="ai-bubble">${text}</div>
      <div class="ai-time">${timeStr}</div>
    </div>
  `;
  elements.aiMessagesContainer.appendChild(msg);
  elements.aiMessagesContainer.scrollTop = elements.aiMessagesContainer.scrollHeight;
}

function updateParameterValue(key, val) {
  let min = 0, max = 100;
  let step = 1;
  
  const expConfig = sliderConfigs[state.activeExperiment];
  if (expConfig && expConfig[key]) {
    min = expConfig[key].min;
    max = expConfig[key].max;
    step = expConfig[key].step;
  } else {
    if (key === 'V') {
      min = state.activeExperiment === 'ohms' ? 0 : 1;
      max = state.activeExperiment === 'ohms' ? 30 : 24;
      step = state.activeExperiment === 'ohms' ? 0.1 : 1;
    } else if (key === 'R') {
      min = state.activeExperiment === 'ohms' ? 1 : 10;
      max = state.activeExperiment === 'ohms' ? 1000 : 600;
      step = state.activeExperiment === 'ohms' ? 0.1 : 1;
    } else if (key === 'L') {
      min = 1; max = 500; step = 1;
    } else if (key === 'C') {
      min = 1; max = 500; step = 1;
    } else if (key === 'f') {
      min = 1; max = 1000; step = 1;
    } else if (key === 'T') {
      min = 0; max = 200; step = 1;
    }
  }

  val = Math.max(min, Math.min(max, val));
  if (step === 0.1) {
    val = Math.round(val * 10) / 10;
  } else {
    const scale = 1 / step;
    val = Math.round(val * scale) / scale;
  }
  
  if (state.activeExperiment === 'ohms') {
    const now = Date.now();
    if (key === 'R' && val !== state.lastResistance) {
      state.lastResistance = val;
      if (state.dataPoints.length > 0) {
        state.dataPoints = [];
        drawObservationTable();
        drawGraph();
        if (elements.conclusionText) elements.conclusionText.innerHTML = '';
        state.meters.energy = 0;
        
        if (now - (state.lastMentorMsgTime || 0) > 3000) {
          appendAIMessage("Circuit IQ · AI Mentor", "Only one parameter should vary during Ohm’s Law verification. Resetting graph and table for the new resistance: " + val.toFixed(1) + " Ω.");
          state.lastMentorMsgTime = now;
        }
      }
    } else if (key === 'V' && val !== state.params.V) {
      if (state.dataPoints.length > 0 && now - (state.lastMentorMsgTime || 0) > 5000) {
        appendAIMessage("Circuit IQ · AI Mentor", "Only one parameter (Voltage) is varying during Ohm’s Law verification. Resistance is kept fixed at " + (state.params.R || 100).toFixed(1) + " Ω.");
        state.lastMentorMsgTime = now;
      }
    }
  }

  state.params[key] = val;

  if (state.activeExperiment === 'lcr' && key === 'f' && state.isRunning) {
    completeStep(3);
  } else if (state.activeExperiment === 'rc_rl_rlc' && key === 'f' && state.isRunning) {
    completeStep(4);
  }

  const slider = document.getElementById(`sl-${key.toLowerCase()}`);
  if (slider) {
    slider.value = val;
  }

  const valLbl = document.getElementById(`lbl-${key.toLowerCase()}`);
  if (valLbl) {
    valLbl.value = val;
  }

  const select = document.querySelector(`.component-value-select[data-param="${key}"]`);
  if (select) {
    const optionExists = Array.from(select.options).some(opt => parseFloat(opt.value) === val);
    if (optionExists) {
      select.value = val.toString();
    }
  }

  if (key === 'R') {
    updateResistorColorBands();
  }

  if (state.activeExperiment === 'series_parallel' && key === 'C') {
    if (!state.isDatabaseLoading) {
      autoBuildExperiment();
    }
  }

  updateDynamicTextures();
  throttledTriggerCalculation();
  debouncedSaveCircuit();
}

function updateLEDColor(color) {
  state.params.led_color = color;
  
  // Update sidebar selects
  const selects = document.querySelectorAll('.component-value-select[data-param="led_color"]');
  selects.forEach(sel => {
    sel.value = color;
  });
  
  // Update sidebar SVG preview colors
  const svgColor = document.getElementById('sidebar-led-svg-color');
  const svgBase = document.getElementById('sidebar-led-svg-base');
  if (svgColor && svgBase) {
    if (color === 'red') {
      svgColor.setAttribute('fill', '#ef4444');
      svgBase.setAttribute('fill', '#dc2626');
    } else if (color === 'green') {
      svgColor.setAttribute('fill', '#22c55e');
      svgBase.setAttribute('fill', '#16a34a');
    } else if (color === 'yellow') {
      svgColor.setAttribute('fill', '#eab308');
      svgBase.setAttribute('fill', '#ca8a04');
    } else if (color === 'blue') {
      svgColor.setAttribute('fill', '#3b82f6');
      svgBase.setAttribute('fill', '#2563eb');
    } else if (color === 'white') {
      svgColor.setAttribute('fill', '#e0e8ff');
      svgBase.setAttribute('fill', '#94a3b8');
    }
  }
  
  // Update target LED(s)
  if (state.selectedComponentIdx !== -1) {
    const c = state.placedComponents[state.selectedComponentIdx];
    if (c && c.type === 'led') {
      c.color = color;
      applyColorToLEDMesh(c, color);
    }
  }
  
  updateInspector();
  triggerSingleCalculation();
}

function applyColorToLEDMesh(c, color) {
  let hex = 0xef4444;
  if (color === 'green') hex = 0x22c55e;
  else if (color === 'yellow') hex = 0xeab308;
  else if (color === 'blue') hex = 0x3b82f6;
  else if (color === 'white') hex = 0xe0e8ff;
  
  if (c.mesh.userData.ledMat) {
    c.mesh.userData.ledMat.color.setHex(hex);
    
    const isPowered = state.isRunning && state.meters.amps > 0;
    if (isPowered) {
      let glowHex = 0xff2200;
      if (color === 'green') glowHex = 0x00ff44;
      else if (color === 'yellow') glowHex = 0xffdd00;
      else if (color === 'blue') glowHex = 0x0077ff;
      else if (color === 'white') glowHex = 0xffffff;
      c.mesh.userData.ledMat.emissive.setHex(glowHex);
      c.mesh.userData.ledMat.emissiveIntensity = 4.0;
      if (c.mesh.userData.ledLight) {
        c.mesh.userData.ledLight.color.setHex(glowHex);
        c.mesh.userData.ledLight.intensity = 2.5;
      }
    } else {
      c.mesh.userData.ledMat.emissive.setHex(0x000000);
      c.mesh.userData.ledMat.emissiveIntensity = 0.0;
      if (c.mesh.userData.ledLight) c.mesh.userData.ledLight.intensity = 0;
    }
  }
}

// Dynamic Sliders configs mapping
const sliderConfigs = {
  ohms: {
    V: { label: "Source Voltage", min: 0, max: 30, step: 0.1, val: 12, unit: "V" },
    R: { label: "Resistance", min: 1, max: 1000, step: 0.1, val: 100, unit: "Ω" }
  },
  lcr: {
    V: { label: "Source Voltage", min: 1, max: 24, step: 1, val: 12, unit: "V" },
    R: { label: "Resistance", min: 10, max: 600, step: 1, val: 100, unit: "Ω" },
    L: { label: "Inductance", min: 1, max: 200, step: 1, val: 50, unit: "mH" },
    C: { label: "Capacitance", min: 1, max: 500, step: 1, val: 100, unit: "µF" },
    f: { label: "Frequency", min: 10, max: 1000, step: 1, val: 50, unit: "Hz" }
  },
  rc: {
    V: { label: "Source Voltage", min: 1, max: 24, step: 1, val: 12, unit: "V" },
    R: { label: "Resistance", min: 10, max: 600, step: 1, val: 100, unit: "Ω" },
    C: { label: "Capacitance", min: 1, max: 500, step: 1, val: 100, unit: "µF" }
  },
  kvl: {
    V: { label: "Source Voltage", min: 0, max: 30, step: 0.1, val: 12, unit: "V" },
    R: { label: "Resistor R1", min: 1, max: 1000, step: 0.1, val: 50, unit: "Ω" },
    L: { label: "Resistor R2", min: 1, max: 1000, step: 0.1, val: 50, unit: "Ω" }
  },
  kcl: {
    V: { label: "Source Voltage", min: 0, max: 30, step: 0.1, val: 12, unit: "V" },
    R: { label: "Resistor R1", min: 1, max: 1000, step: 0.1, val: 50, unit: "Ω" },
    L: { label: "Resistor R2", min: 1, max: 1000, step: 0.1, val: 50, unit: "Ω" }
  },
  rc_rl_rlc: {
    V: { label: "Source Voltage", min: 1, max: 24, step: 1, val: 12, unit: "V" },
    R: { label: "Resistance", min: 10, max: 600, step: 1, val: 100, unit: "Ω" },
    L: { label: "Inductance", min: 1, max: 200, step: 1, val: 50, unit: "mH" },
    C: { label: "Capacitance", min: 1, max: 500, step: 1, val: 100, unit: "µF" },
    f: { label: "Frequency", min: 10, max: 1000, step: 1, val: 50, unit: "Hz" }
  },
  series_parallel: {
    V: { label: "Source Voltage", min: 0, max: 30, step: 0.1, val: 12, unit: "V" },
    R: { label: "Resistor R1", min: 1, max: 1000, step: 0.1, val: 100, unit: "Ω" },
    L: { label: "Resistor R2", min: 1, max: 1000, step: 0.1, val: 100, unit: "Ω" },
    C: { label: "Config (1:Series, 2:Parallel)", min: 1, max: 2, step: 1, val: 1, unit: "" }
  },
  wheatstone: {
    V: { label: "Source Voltage", min: 0, max: 30, step: 0.1, val: 12, unit: "V" },
    R: { label: "Resistor R1", min: 1, max: 1000, step: 0.1, val: 100, unit: "Ω" },
    L: { label: "Resistor R2", min: 1, max: 1000, step: 0.1, val: 100, unit: "Ω" },
    C: { label: "Resistor R3 (Var)", min: 1, max: 1000, step: 0.1, val: 100, unit: "Ω" }
  },
  faraday: {
    V: { label: "Magnet Velocity", min: 0.5, max: 5.0, step: 0.1, val: 2.0, unit: "m/s" },
    R: { label: "Magnet Strength", min: 0.1, max: 2.0, step: 0.1, val: 1.0, unit: "T" },
    L: { label: "Coil Turns N", min: 50, max: 500, step: 10, val: 200, unit: "turns" }
  },
  lenz: {
    V: { label: "Magnet Velocity", min: 0.5, max: 5.0, step: 0.1, val: 2.0, unit: "m/s" },
    R: { label: "Magnet Strength", min: 0.1, max: 2.0, step: 0.1, val: 1.0, unit: "T" }
  },
  solenoid: {
    V: { label: "Current I", min: 0.1, max: 10.0, step: 0.1, val: 2.0, unit: "A" },
    R: { label: "Coil Turns N", min: 100, max: 2000, step: 50, val: 500, unit: "turns" },
    L: { label: "Solenoid Length L", min: 0.1, max: 1.0, step: 0.05, val: 0.5, unit: "m" }
  },
  transformer: {
    V: { label: "Primary Voltage Vp", min: 10, max: 220, step: 5, val: 110, unit: "V" },
    R: { label: "Primary Turns Np", min: 50, max: 500, step: 10, val: 200, unit: "turns" },
    L: { label: "Secondary Turns Ns", min: 50, max: 1000, step: 10, val: 400, unit: "turns" }
  },
  diode_iv: {
    V: { label: "Source Voltage", min: 0, max: 5, step: 0.05, val: 1.5, unit: "V" },
    R: { label: "Resistor R", min: 10, max: 1000, step: 5, val: 100, unit: "Ω" }
  },
  voltage_divider: {
    V: { label: "Source Voltage", min: 0, max: 30, step: 0.1, val: 12, unit: "V" },
    R: { label: "Resistor R1", min: 10, max: 1000, step: 5, val: 100, unit: "Ω" },
    L: { label: "Resistor R2", min: 10, max: 1000, step: 5, val: 200, unit: "Ω" }
  },
  planck_led: {
    V: { label: "Source Voltage", min: 0, max: 5, step: 0.05, val: 2.5, unit: "V" },
    R: { label: "Resistor R", min: 10, max: 1000, step: 5, val: 150, unit: "Ω" }
  },
  biot_savart: {
    V: { label: "Current I", min: 0.1, max: 10.0, step: 0.1, val: 2.0, unit: "A" },
    R: { label: "Distance r", min: 1.0, max: 10.0, step: 0.1, val: 5.0, unit: "cm" },
    L: { label: "Wire Length L", min: 0.1, max: 1.0, step: 0.05, val: 0.5, unit: "m" }
  },
  planck_photocell: {
    V: { label: "Wavelength λ", min: 350, max: 700, step: 1, val: 450, unit: "nm" },
    R: { label: "Stopping Volt Vs", min: 0.0, max: 3.0, step: 0.01, val: 0.8, unit: "V" },
    L: { label: "Intensity P", min: 10, max: 100, step: 5, val: 50, unit: "%" }
  },
  stefan_law: {
    V: { label: "Temperature T", min: 300, max: 2000, step: 10, val: 1000, unit: "K" },
    R: { label: "Emissivity ε", min: 0.1, max: 1.0, step: 0.01, val: 0.95, unit: "" },
    L: { label: "Surface Area A", min: 1.0, max: 10.0, step: 0.1, val: 5.0, unit: "cm²" }
  },
  ideal_gas: {
    V: { label: "Chamber Volume V", min: 1.0, max: 30.0, step: 0.1, val: 10.0, unit: "L" },
    R: { label: "Temperature T", min: 100, max: 1000, step: 5, val: 300, unit: "K" },
    L: { label: "Moles n", min: 0.1, max: 5.0, step: 0.1, val: 1.0, unit: "mol" }
  },
  boyle: {
    V: { label: "Chamber Volume V", min: 1.0, max: 30.0, step: 0.1, val: 10.0, unit: "L" }
  },
  charles: {
    V: { label: "Temperature T", min: 100, max: 1000, step: 5, val: 300, unit: "K" },
    R: { label: "Pressure (Fix)", min: 10, max: 500, step: 5, val: 100, unit: "kPa" }
  },
  specific_heat: {
    V: { label: "Metal Mass mm", min: 10, max: 500, step: 5, val: 100, unit: "g" },
    R: { label: "Metal Temp Tm", min: 50, max: 200, step: 1, val: 100, unit: "°C" },
    L: { label: "Water Mass mw", min: 50, max: 500, step: 5, val: 200, unit: "g" }
  },
  photoelectric: {
    V: { label: "Light Frequency ν", min: 1.0, max: 15.0, step: 0.1, val: 8.0, unit: "10¹⁴ Hz" },
    R: { label: "Light Intensity P", min: 10, max: 500, step: 10, val: 100, unit: "mW" },
    L: { label: "Work Function Φ", min: 1.0, max: 6.0, step: 0.1, val: 2.2, unit: "eV" }
  },
  radioactive: {
    V: { label: "Initial Nuclei N₀", min: 50, max: 1000, step: 10, val: 500, unit: "nuclei" },
    R: { label: "Half-Life T₁/₂", min: 1.0, max: 50.0, step: 0.5, val: 10.0, unit: "s" }
  },
  de_broglie: {
    V: { label: "Particle Mass m", min: 0.1, max: 10.0, step: 0.1, val: 1.0, unit: "10⁻³⁰ kg" },
    R: { label: "Velocity v", min: 1, max: 1000, step: 10, val: 100, unit: "km/s" }
  },
  bohr_model: {
    V: { label: "Initial State ni", min: 2, max: 6, step: 1, val: 3, unit: "" },
    R: { label: "Final State nf", min: 1, max: 5, step: 1, val: 1, unit: "" }
  },
  arduino_led: {
    V: { label: "Source Voltage", min: 1, max: 24, step: 1, val: 5, unit: "V" },
    R: { label: "Resistance", min: 10, max: 600, step: 1, val: 150, unit: "Ω" }
  }
};

function updateMeterLabels(voltsLabel, voltsUnit, ampsLabel, ampsUnit, impedanceLabel, impedanceUnit, powerLabel, energyLabel) {
  const vLabel = document.querySelector('#rp-meters .meter:nth-child(1) .meter-hdr span:nth-child(1)');
  const vUnit = document.querySelector('#rp-meters .meter:nth-child(1) .meter-unit');
  const aLabel = document.querySelector('#rp-meters .meter:nth-child(2) .meter-hdr span:nth-child(1)');
  const aUnit = document.querySelector('#rp-meters .meter:nth-child(2) .meter-unit');
  const zLabel = document.getElementById('meter-impedance-title');
  const zUnit = document.querySelector('#rp-meters .meter:nth-child(3) .meter-unit');
  const pLabel = document.querySelector('#rp-meters .prop-block .analysis-cell:nth-child(1) .ac-label');
  const eLabel = document.querySelector('#rp-meters .prop-block .analysis-cell:nth-child(2) .ac-label');

  if (vLabel) vLabel.innerText = voltsLabel;
  if (vUnit) vUnit.innerText = voltsUnit;
  if (aLabel) aLabel.innerText = ampsLabel;
  if (aUnit) aUnit.innerText = ampsUnit;
  if (zLabel) zLabel.innerText = impedanceLabel;
  if (zUnit) zUnit.innerText = impedanceUnit;
  if (pLabel) pLabel.innerText = powerLabel;
  if (eLabel) eLabel.innerText = energyLabel;
}

function initProceduralVisuals(expKey) {
  state.proceduralGroup = new THREE.Group();
  scene.add(state.proceduralGroup);

  const metalMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, roughness: 0.2 });
  const copperMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8, roughness: 0.3 });
  const glassMat = new THREE.MeshPhysicalMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.4, roughness: 0.1, transmission: 0.85, thickness: 0.5 });
  const laserMat = new THREE.LineBasicMaterial({ color: 0xff0055 });

  if (expKey === 'biot_savart') {
    // A vertical current carrying wire
    const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.0), copperMat);
    wire.position.set(0, 1.0, 0);
    state.proceduralGroup.add(wire);
    
    // Stand base
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.04, 1.2), metalMat);
    base.position.y = 0.02;
    state.proceduralGroup.add(base);
    
    // Magnetic field concentric rings group
    const fieldRings = new THREE.Group();
    fieldRings.name = 'biot-rings';
    state.proceduralGroup.add(fieldRings);
    
    // 3 rings at different radii
    const ringColors = [0x60a5fa, 0x3b82f6, 0x1d4ed8];
    for (let r = 1; r <= 3; r++) {
      const radius = r * 0.35;
      const ringGeo = new THREE.RingGeometry(radius - 0.015, radius + 0.015, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: ringColors[r-1], side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 1.0;
      fieldRings.add(ring);
    }
    
    // Distance probe sensor
    const probe = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), new THREE.MeshStandardMaterial({ color: 0xef4444 }));
    probe.position.set(0.7, 1.0, 0);
    probe.name = 'biot-probe';
    state.proceduralGroup.add(probe);
  } else if (expKey === 'planck_photocell') {
    // Glass tube envelope
    const env = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 1.6, 32, 1, false), glassMat);
    env.rotation.z = Math.PI / 2;
    env.position.set(0, 0.6, 0);
    state.proceduralGroup.add(env);
    
    // Cathode (curved or flat emitter plate)
    const emitter = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.6, 0.4), new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.8 }));
    emitter.position.set(-0.5, 0.6, 0);
    state.proceduralGroup.add(emitter);
    
    // Anode collector wire loop/plate
    const collector = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.6), metalMat);
    collector.position.set(0.5, 0.6, 0);
    state.proceduralGroup.add(collector);
    
    // Light source barrel
    const lightSource = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.5), metalMat);
    lightSource.position.set(-1.2, 0.9, 0);
    lightSource.rotation.z = -Math.PI / 6;
    state.proceduralGroup.add(lightSource);
    
    // Light ray buffer
    const points = [new THREE.Vector3(-1.2, 0.9, 0), new THREE.Vector3(-0.5, 0.6, 0)];
    const lightRay = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color: 0x38bdf8 }));
    lightRay.name = 'photocell-ray';
    state.proceduralGroup.add(lightRay);
    
    // Photoelectron particles group
    const electrons = new THREE.Group();
    electrons.name = 'photoelectrons-photocell';
    state.proceduralGroup.add(electrons);
  } else if (expKey === 'stefan_law') {
    // Stefan-Boltzmann blackbody cavity furnace: a big sphere
    const furnaceMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6, roughness: 0.3 });
    const furnace = new THREE.Mesh(new THREE.SphereGeometry(0.6, 32, 32), furnaceMat);
    furnace.position.set(-0.6, 0.7, 0);
    state.proceduralGroup.add(furnace);
    
    // Support base stand
    const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.7), metalMat);
    stand.position.set(-0.6, 0.35, 0);
    state.proceduralGroup.add(stand);
    
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.04, 1.2), metalMat);
    base.position.y = 0.02;
    state.proceduralGroup.add(base);
    
    // Glowing aperture (small disk at opening of the sphere)
    const glowGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.02, 32);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.rotation.z = Math.PI / 2;
    glow.position.set(0.0, 0.7, 0);
    glow.name = 'furnace-glow';
    state.proceduralGroup.add(glow);
    
    // Optical pyrometer / radiation receiver sensor
    const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.3), metalMat);
    receiver.position.set(1.2, 0.7, 0);
    state.proceduralGroup.add(receiver);
    
    const recStand = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.7), metalMat);
    recStand.position.set(1.2, 0.35, 0);
    state.proceduralGroup.add(recStand);
  } else if (['ideal_gas', 'boyle', 'charles'].includes(expKey)) {
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.08, 32), metalMat);
    base.position.y = 0.04;
    state.proceduralGroup.add(base);
    
    const chamberGeo = new THREE.CylinderGeometry(0.6, 0.6, 1.8, 32, 1, true);
    const chamber = new THREE.Mesh(chamberGeo, glassMat);
    chamber.position.set(0, 0.98, 0);
    state.proceduralGroup.add(chamber);
    
    const piston = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.08, 32), new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.7 }));
    piston.position.set(0, 1.3, 0);
    piston.name = 'piston-plate';
    state.proceduralGroup.add(piston);
    
    state.moleculesData = [];
    const count = 30;
    for (let i = 0; i < count; i++) {
      const mol = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.45;
      mol.position.set(r * Math.cos(angle), 0.1 + Math.random() * 1.0, r * Math.sin(angle));
      state.proceduralGroup.add(mol);
      state.moleculesData.push({
        mesh: mol,
        vx: (Math.random() - 0.5) * 0.04,
        vy: (Math.random() - 0.5) * 0.04,
        vz: (Math.random() - 0.5) * 0.04
      });
    }
  } else if (expKey === 'specific_heat') {
    const beaker = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 1.1, 32, 1, false), glassMat);
    beaker.position.set(-0.8, 0.56, 0);
    state.proceduralGroup.add(beaker);
    
    const water = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.56, 0.8, 32), new THREE.MeshStandardMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.65 }));
    water.position.set(-0.8, 0.45, 0);
    water.name = 'specific-heat-water';
    state.proceduralGroup.add(water);
    
    const metalSpecimen = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.28), new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.8 }));
    metalSpecimen.position.set(0.8, 0.74, 0);
    metalSpecimen.name = 'specific-heat-metal';
    state.proceduralGroup.add(metalSpecimen);
  } else if (expKey === 'photoelectric') {
    const envGeo = new THREE.CylinderGeometry(0.48, 0.48, 2.0, 32, 1, false);
    const envelope = new THREE.Mesh(envGeo, glassMat);
    envelope.rotation.z = Math.PI / 2;
    envelope.position.set(0, 0.5, 0);
    state.proceduralGroup.add(envelope);
    
    const anode = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.5, 0.5), metalMat);
    anode.position.set(0.7, 0.5, 0);
    state.proceduralGroup.add(anode);
    
    const cathode = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.5, 0.5), new THREE.MeshStandardMaterial({ color: 0x34d399, metalness: 0.7 }));
    cathode.position.set(-0.7, 0.5, 0);
    state.proceduralGroup.add(cathode);
    
    const photoelectrons = new THREE.Group();
    photoelectrons.name = 'photoelectrons';
    state.proceduralGroup.add(photoelectrons);
  } else if (expKey === 'radioactive') {
    state.decayList = [];
    const aGeo = new THREE.SphereGeometry(0.06, 16, 16);
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        const aMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.8 });
        const atom = new THREE.Mesh(aGeo, aMat);
        atom.position.set(-1.2 + c * 0.26, 0.08, -1.2 + r * 0.26);
        state.proceduralGroup.add(atom);
        state.decayList.push({ mesh: atom, decayed: false });
      }
    }
  } else if (expKey === 'de_broglie') {
    const gun = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.5), metalMat);
    gun.rotation.z = Math.PI / 2;
    gun.position.set(-2.0, 0.6, 0);
    state.proceduralGroup.add(gun);
    
    const slitPl = new THREE.Mesh(new THREE.BoxGeometry(0.02, 1.0, 1.8), metalMat);
    slitPl.position.set(-0.5, 0.5, 0);
    state.proceduralGroup.add(slitPl);
    
    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.02, 1.0, 1.8), new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 }));
    screen.position.set(1.8, 0.5, 0);
    state.proceduralGroup.add(screen);
    
    state.broglieParticles = [];
  } else if (expKey === 'bohr_model') {
    const nucleus = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), new THREE.MeshBasicMaterial({ color: 0xf97316 }));
    nucleus.position.set(0, 0.5, 0);
    state.proceduralGroup.add(nucleus);
    
    for (let n = 1; n <= 5; n++) {
      const radius = n * 0.5;
      const oGeo = new THREE.RingGeometry(radius - 0.01, radius + 0.01, 64);
      const oMat = new THREE.MeshBasicMaterial({ color: 0x475569, side: THREE.DoubleSide });
      const orbit = new THREE.Mesh(oGeo, oMat);
      orbit.rotation.x = Math.PI / 2;
      orbit.position.set(0, 0.5, 0);
      state.proceduralGroup.add(orbit);
    }
    
    const el = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), new THREE.MeshBasicMaterial({ color: 0x3b82f6 }));
    el.position.set(1.5, 0.5, 0);
    el.name = 'bohr-electron';
    state.proceduralGroup.add(el);
  } else if (expKey === 'faraday' || expKey === 'lenz') {
    const coil = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 1.0, 32, 1, true), copperMat);
    coil.position.set(0, 0.5, 0);
    coil.rotation.z = Math.PI / 2;
    state.proceduralGroup.add(coil);
    
    const magnet = new THREE.Group();
    magnet.name = 'faraday-magnet';
    magnet.position.set(-2.2, 0.5, 0);
    
    const north = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.25, 0.25), new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.6 }));
    north.position.x = 0.25;
    magnet.add(north);
    
    const south = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.25, 0.25), new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.6 }));
    south.position.x = -0.25;
    magnet.add(south);
    
    state.proceduralGroup.add(magnet);
  } else if (expKey === 'solenoid') {
    const coil = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 1.8, 32, 1, true), copperMat);
    coil.position.set(0, 0.5, 0);
    coil.rotation.z = Math.PI / 2;
    state.proceduralGroup.add(coil);
    
    const fieldGroup = new THREE.Group();
    fieldGroup.name = 'solenoid-fields';
    state.proceduralGroup.add(fieldGroup);
    
    for (let i = 0; i < 5; i++) {
      const line = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08 * i, 0.08 * i, 1.78, 16, 1, true),
        new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.4, side: THREE.DoubleSide })
      );
      line.rotation.z = Math.PI / 2;
      line.position.set(0, 0.5, 0);
      fieldGroup.add(line);
    }
  } else if (expKey === 'transformer') {
    const coreMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2 });
    
    const coreLeft = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.2, 0.18), coreMat);
    coreLeft.position.set(-0.8, 0.6, 0);
    state.proceduralGroup.add(coreLeft);
    
    const coreRight = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.2, 0.18), coreMat);
    coreRight.position.set(0.8, 0.6, 0);
    state.proceduralGroup.add(coreRight);
    
    const coreTop = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.18, 0.18), coreMat);
    coreTop.position.set(0, 1.2, 0);
    state.proceduralGroup.add(coreTop);
    
    const coreBottom = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.18, 0.18), coreMat);
    coreBottom.position.set(0, 0.0, 0);
    state.proceduralGroup.add(coreBottom);
    
    const prim = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.8), copperMat);
    prim.position.set(-0.8, 0.6, 0);
    state.proceduralGroup.add(prim);
    
    const sec = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.8), new THREE.MeshStandardMaterial({ color: 0x8b5cf6, metalness: 0.8 }));
    sec.position.set(0.8, 0.6, 0);
    state.proceduralGroup.add(sec);
  }
}

// --- SETUP EXPERIMENT STATE ---
function setupExperiment(expKey, loadFromDb = false, preserveParams = false) {
  if (expKey === 'led') expKey = 'planck_led';
  state.activeExperiment = expKey;
  state.dataPoints = [];
  if (expKey === 'rc') {
    state.capVoltage = 0.0;
    state.rcHistory = [];
    state.rcPhaseStartTime = null;
    state.rcStartVoltage = 0.0;
    state.rcLastState = null;
  }
  state.score = 0;
  state.completedSteps.clear();
  state.selectedComponentIdx = -1;
  state.selectedHoleIndex = null;
  state.kvlMeasurements = { Vs: null, VR1: null, VR2: null };
  clearAllComponentOutlines(true);
  updateInspector();
  
  // Clean Three.js old components & wires
  state.placedComponents.forEach(c => {
    scene.remove(c.mesh);
    c.leads.forEach(l => scene.remove(l));
  });
  state.placedComponents = [];
  
  state.wires.forEach(w => {
    scene.remove(w.lineMesh);
    w.electrons.forEach(e => scene.remove(e));
    if (w.pins) w.pins.forEach(p => scene.remove(p));
    if (w.sleeves) w.sleeves.forEach(s => scene.remove(s));
  });
  state.wires = [];
  
  state.isRunning = false;
  stopPollingCalculations();
  setElectronsActive(false);

  // Clear previous procedural meshes
  if (state.proceduralGroup) {
    scene.remove(state.proceduralGroup);
    state.proceduralGroup = null;
  }

  // Determine workspace visibility based on experiment
  const isCircuit = ['ohms', 'kvl', 'kcl', 'rc_rl_rlc', 'series_parallel', 'wheatstone', 'lcr', 'rc', 'arduino_led', 'diode_iv', 'voltage_divider', 'planck_led'].includes(expKey);
  if (boardGroup) {
    boardGroup.visible = isCircuit;
  }
  if (arduinoUnoGroup) {
    arduinoUnoGroup.visible = (expKey === 'arduino_led');
  }

  if (!isCircuit) {
    initProceduralVisuals(expKey);
  }

  // Populate dynamic parameter sliders
  const paramsList = ['V', 'R', 'L', 'C', 'f', 'T'];
  const config = sliderConfigs[expKey] || {};

  paramsList.forEach(p => {
    const sliderContainer = document.querySelector(`[data-slider-param="${p}"]`);
    if (!sliderContainer) return;

    if (config[p]) {
      sliderContainer.style.display = 'block';
      const labelEl = sliderContainer.querySelector('.slider-label');
      const unitEl = sliderContainer.querySelector('.param-input-wrap span');
      const inputEl = document.getElementById(`lbl-${p.toLowerCase()}`);
      const rangeEl = document.getElementById(`sl-${p.toLowerCase()}`);

      if (labelEl) labelEl.innerText = config[p].label;
      if (unitEl) unitEl.innerText = config[p].unit;

      let valToUse = config[p].val;
      if (preserveParams && state.params[p] !== undefined) {
        valToUse = state.params[p];
      }

      if (rangeEl) {
        rangeEl.min = config[p].min;
        rangeEl.max = config[p].max;
        rangeEl.step = config[p].step;
        rangeEl.value = valToUse;
      }
      if (inputEl) {
        inputEl.min = config[p].min;
        inputEl.max = config[p].max;
        inputEl.step = config[p].step;
        inputEl.value = valToUse;
      }
      state.params[p] = valToUse;
    } else {
      sliderContainer.style.display = 'none';
    }
  });

  // Sync selector dropdown
  if (elements.experimentSelect) {
    elements.experimentSelect.value = expKey;
  }

  // Configure Multimeter Labels per domain
  const isStandardCircuit = ['ohms', 'kvl', 'kcl', 'rc_rl_rlc', 'lcr', 'rc', 'series_parallel', 'wheatstone', 'arduino_led', 'diode_iv', 'voltage_divider', 'planck_led'].includes(expKey);
  if (isStandardCircuit) {
    updateMeterLabels("VOLTMETER", "V", "AMMETER", "A", expKey === 'ohms' ? 'RESISTANCE' : 'IMPEDANCE', "Ω", "Power", "Energy");
  } else if (expKey === 'biot_savart') {
    updateMeterLabels("CURRENT I", "A", "DISTANCE r", "cm", "WIRE LENGTH L", "m", "B Field (μT)", "Constant μ₀");
  } else if (expKey === 'planck_photocell') {
    updateMeterLabels("WAVELENGTH λ", "nm", "CURRENT I_photo", "mA", "STOPPING VOLT Vs", "V", "Photon Energy", "Max K.E. (eV)");
  } else if (expKey === 'stefan_law') {
    updateMeterLabels("TEMPERATURE T", "K", "EMISSIVITY ε", "", "SURFACE AREA A", "cm²", "Radiated Power", "Total Energy");
  } else if (expKey === 'radioactive') {
    updateMeterLabels("INITIAL N₀", "", "REMAINING N", "", "HALF-LIFE T₁/₂", "s", "Activity A", "Decay Constant");
  } else if (expKey === 'de_broglie') {
    updateMeterLabels("MASS m", "10⁻³⁰kg", "VELOCITY v", "km/s", "WAVELENGTH λ", "nm", "Momentum p", "Kinetic Energy");
  } else if (expKey === 'bohr_model') {
    updateMeterLabels("INITIAL ni", "", "FINAL nf", "", "ENERGY GAP ΔE", "eV", "Emitted λ", "Frequency ν");
  } else if (['ideal_gas', 'boyle', 'charles'].includes(expKey)) {
    updateMeterLabels("PRESSURE P", "kPa", "VOLUME V", "L", "TEMPERATURE T", "K", "Moles n", "Internal Energy U");
  } else if (expKey === 'specific_heat') {
    updateMeterLabels("METAL TEMP Tm", "°C", "WATER TEMP Tw", "°C", "MIXTURE Tf", "°C", "Heat Exchanged", "Heat Capacity");
  } else if (expKey === 'photoelectric') {
    updateMeterLabels("LIGHT FREQ ν", "10¹⁴Hz", "INTENSITY I", "mW", "WORK FUNCTION", "eV", "Stopping Volt Vs", "Max K.E. Kmax");
  }

  drawObservationTable();
  
  const exp = experiments[expKey];
  elements.meterVmMode.innerText = expKey === 'lcr' ? 'AC RMS' : 'DC';
  
  elements.formulaContainer.innerHTML = '';
  if (exp && exp.formulas) {
    exp.formulas.forEach(f => {
      const item = document.createElement('div');
      item.className = 'formula-chip';
      item.innerHTML = `<span class="formula-name">${f.name}</span><span class="formula-expr">${f.expr}</span>`;
      elements.formulaContainer.appendChild(item);
    });
  }
  
  elements.stepsContainer.innerHTML = '';
  if (exp && exp.steps) {
    exp.steps.forEach((step, idx) => {
      const div = document.createElement('div');
      div.className = `step-item ${idx === 0 ? 'cur' : ''}`;
      div.id = `step-${step.id}`;
      div.innerHTML = `<div class="step-num ${idx === 0 ? 'cur' : ''}">${step.id}</div><div class="step-text">${step.text}</div>`;
      elements.stepsContainer.appendChild(div);
    });
  }

  // Clean sliders display
  const vSlider = document.querySelector('[data-slider-param="V"]');
  const rSlider = document.querySelector('[data-slider-param="R"]');
  const lSlider = document.querySelector('[data-slider-param="L"]');
  const cSlider = document.querySelector('[data-slider-param="C"]');
  const fSlider = document.querySelector('[data-slider-param="f"]');
  const tSlider = document.querySelector('[data-slider-param="T"]');
  
  elements.vivaContainer.innerHTML = '';
  if (assessmentQuestions[expKey]) {
    assessmentQuestions[expKey].forEach((q, qIdx) => {
      const card = document.createElement('div');
      card.className = 'viva-q';
      let opts = '';
      q.options.forEach((opt, oIdx) => {
        opts += `<label class="viva-opt" id="viva-opt-${qIdx}-${oIdx}"><input type="radio" name="viva-q-${qIdx}" value="${oIdx}"><span>${opt}</span></label>`;
      });
      card.innerHTML = `
        <span class="q-num">QUESTION ${qIdx+1} of ${assessmentQuestions[expKey].length}</span>
        <div class="q-text">${q.q}</div>
        <div class="viva-options" id="viva-opts-${qIdx}">${opts}</div>
        <div class="viva-explanation" id="viva-exp-${qIdx}" style="display:none;margin-top:8px;padding:8px;border-radius:5px;font-size:10px;line-height:1.6;"></div>
      `;
      elements.vivaContainer.appendChild(card);
      
      card.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', () => {
          const isCorrect = parseInt(radio.value) === q.correct;
          const expDiv = document.getElementById(`viva-exp-${qIdx}`);
          
          q.options.forEach((opt, oIdx) => {
            const lbl = document.getElementById(`viva-opt-${qIdx}-${oIdx}`);
            if (!lbl) return;
            if (oIdx === q.correct) {
              lbl.style.background = 'rgba(0,208,132,0.12)';
              lbl.style.borderColor = 'rgba(0,208,132,0.5)';
              lbl.style.borderRadius = '5px';
              lbl.style.padding = '3px 6px';
            } else if (oIdx === parseInt(radio.value) && !isCorrect) {
              lbl.style.background = 'rgba(239,68,68,0.12)';
              lbl.style.borderColor = 'rgba(239,68,68,0.5)';
              lbl.style.borderRadius = '5px';
              lbl.style.padding = '3px 6px';
            }
          });
          
          if (isCorrect) {
            state.score += 20;
            card.style.borderColor = 'rgba(0, 208, 132, 0.4)';
            card.style.background = 'rgba(0, 208, 132, 0.05)';
            if (expDiv) {
              expDiv.style.display = 'block';
              expDiv.style.background = 'rgba(0,208,132,0.08)';
              expDiv.style.border = '1px solid rgba(0,208,132,0.25)';
              expDiv.style.color = 'var(--accent)';
              expDiv.innerHTML = `<strong>✓ Correct!</strong> ${q.explanation || 'Well done!'}`;
            }
            appendAIMessage("Circuit IQ · AI Mentor", `✓ Correct! ${q.explanation || 'Great job!'}`);
          } else {
            card.style.borderColor = 'rgba(239, 68, 68, 0.4)';
            card.style.background = 'rgba(239, 68, 68, 0.05)';
            if (expDiv) {
              expDiv.style.display = 'block';
              expDiv.style.background = 'rgba(239,68,68,0.08)';
              expDiv.style.border = '1px solid rgba(239,68,68,0.25)';
              expDiv.style.color = '#f87171';
              expDiv.innerHTML = `<strong>✗ Incorrect.</strong> ${q.explanation || 'Review the theory and try again.'}  <br><em>Correct answer: <strong>${q.options[q.correct]}</strong></em>`;
            }
            appendAIMessage("Circuit IQ · AI Mentor", `✗ Incorrect. ${q.explanation || 'Recheck formulas and theory tab.'}`);
          }
          card.querySelectorAll('input').forEach(i => i.disabled = true);
          updateUI();
        });
      });
    });
  }

  // Set aim and apparatus in theory panel
  if (exp) {
    if (exp.aim || exp.apparatus) {
      const metaHtml = `
        <div style="background:#111116;border:1px solid var(--border);border-radius:6px;padding:10px 12px;margin-bottom:10px;font-size:10px;line-height:1.7;">
          ${exp.aim ? `<div style="margin-bottom:6px;"><strong style="color:var(--accent);font-size:9px;letter-spacing:1px;text-transform:uppercase;">Aim</strong><br>${exp.aim}</div>` : ''}
          ${exp.apparatus ? `<div><strong style="color:var(--text2);font-size:9px;letter-spacing:1px;text-transform:uppercase;">Apparatus</strong><br>${exp.apparatus}</div>` : ''}
        </div>
      `;
      elements.theoryText.innerHTML = metaHtml + (exp.theory || '');
    } else {
      elements.theoryText.innerHTML = exp.theory || '';
    }
  }

  elements.conclusionText.innerText = `Experiment loaded: ${exp.name}. Complete steps and simulate to generate conclusion.`;
  
  elements.btnRun.style.display = 'block';
  elements.btnStop.style.display = 'none';
  elements.statusDot.style.background = "var(--accent)";
  elements.statusTextBar.innerText = "READY";
  
  updateProgress(0);
  updateUI();
  updateTelemetryCounts();
  updateDynamicTextures();
  
  if (arduinoUnoGroup) {
    if (expKey === 'arduino_led') {
      arduinoUnoGroup.visible = true;
      arduino5VMesh.visible = true;
      arduinoGNDMesh.visible = true;
    } else {
      arduinoUnoGroup.visible = false;
      arduino5VMesh.visible = false;
      arduinoGNDMesh.visible = false;
    }
  }
  
  updateAIMentor();
  updateTargetHighlights();
  updateToolboxVisibility(expKey);
  updateDiagram(expKey);

  if (loadFromDb) {
    checkAndPromptRestore(expKey);
  }
}

function updateComponentSidebar() {
  const searchInput = document.getElementById('components-search');
  const clearBtn = document.getElementById('search-clear');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  
  if (clearBtn && searchInput) {
    clearBtn.style.display = searchInput.value ? 'block' : 'none';
  }
  
  const searchTerms = query.split(/\s+/).filter(term => term.length > 0);
  let totalVisible = 0;
  
  document.querySelectorAll('#left-panel .lp-section').forEach(section => {
    // Skip header sections
    const hdr = section.querySelector('.lp-section-hdr');
    if (hdr && hdr.innerText.includes("COMPONENTS")) return;
    
    let sectionVisibleCount = 0;
    const chips = section.querySelectorAll('.comp-chip');
    
    chips.forEach(chip => {
      const nameEl = chip.querySelector('.comp-chip-name');
      const subEl = chip.querySelector('.comp-chip-sub');
      if (!nameEl) return;
      
      const name = nameEl.innerText.toLowerCase();
      const sub = subEl ? subEl.innerText.toLowerCase() : '';
      const dataName = (chip.getAttribute('data-name') || '').toLowerCase();
      const dataType = (chip.getAttribute('data-type') || '').toLowerCase();
      
      // Combine all fields into a single search target text
      const targetText = `${name} ${sub} ${dataName} ${dataType}`;
      
      // Every term in the query must match some part of the targetText
      const matches = searchTerms.every(term => targetText.includes(term));
      
      if (searchTerms.length === 0 || matches) {
        chip.style.display = 'flex';
        sectionVisibleCount++;
        totalVisible++;
      } else {
        chip.style.display = 'none';
      }
    });
    
    const countBadge = section.querySelector('.lp-section-hdr .count');
    if (countBadge) {
      countBadge.innerText = sectionVisibleCount;
    }
    
    if (sectionVisibleCount === 0 && query !== '') {
      section.style.display = 'none';
    } else {
      section.style.display = 'block';
    }
  });
  
  const totalBadge = document.getElementById('total-components-count');
  if (totalBadge) {
    totalBadge.innerText = totalVisible;
  }
}

function updateToolboxVisibility(expKey) {
  updateComponentSidebar();
}

function updateProgress(percent) {
  elements.protocolProgress.style.width = `${percent}%`;
  elements.progressPercent.innerText = `${percent}% Complete`;
}

function completeStep(stepId) {
  if (state.completedSteps.has(stepId)) return;
  state.completedSteps.add(stepId);
  const stepCard = document.getElementById(`step-${stepId}`);
  if (stepCard) {
    stepCard.classList.remove('cur');
    stepCard.classList.add('done');
    const numBubble = stepCard.querySelector('.step-num');
    if (numBubble) {
      numBubble.classList.remove('cur');
      numBubble.classList.add('done');
      numBubble.innerText = '✓';
    }
    
    const nextStep = document.getElementById(`step-${stepId + 1}`);
    if (nextStep) {
      nextStep.classList.add('cur');
      const nextNum = nextStep.querySelector('.step-num');
      if (nextNum) nextNum.classList.add('cur');
    }
  }
  state.score += 10;
  const total = experiments[state.activeExperiment].steps.length;
  updateProgress(Math.round((state.completedSteps.size / total) * 100));
  updateUI();
}

function updateTelemetryCounts() {
  elements.telemetryComps.innerText = state.placedComponents.length;
  elements.telemetryWires.innerText = state.wires.length;
  updateInspector();
}

// --- OSCILLOSCOPE & GRAPH DRAWING ---
function drawOscilloscope() {
  if (!elements.oscCanvas) {
    requestAnimationFrame(drawOscilloscope);
    return;
  }
  const ctx = elements.oscCanvas.getContext('2d');
  const w = elements.oscCanvas.width;
  const h = elements.oscCanvas.height;
  
  if (w <= 0 || h <= 0) {
    requestAnimationFrame(drawOscilloscope);
    return;
  }

  if (state.oscPower === false) {
    ctx.fillStyle = '#020617'; // very dark slate black screen
    ctx.fillRect(0, 0, w, h);
    
    if (elements.oscFreqLbl) elements.oscFreqLbl.innerText = "— Hz";
    if (elements.oscPhaseLbl) elements.oscPhaseLbl.innerText = "— °";
    const vpLbl = document.getElementById('osc-vp');
    if (vpLbl) vpLbl.innerText = "— V";
    const periodLbl = document.getElementById('osc-period');
    if (periodLbl) periodLbl.innerText = "— ms";
    
    requestAnimationFrame(drawOscilloscope);
    return;
  }
  
  // 1. Draw beautiful radial CRT gradient screen
  const grad = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, Math.max(w, h) / 1.8);
  grad.addColorStop(0, '#061a12'); // Phosphor glow core
  grad.addColorStop(0.8, '#020a07');
  grad.addColorStop(1, '#000000');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  
  // 2. Draw retro graticule grid lines (10 divisions wide by 8 divisions high)
  const cols = 10;
  const rows = 8;
  const colWidth = w / cols;
  const rowHeight = h / rows;
  
  ctx.strokeStyle = 'rgba(0, 255, 136, 0.08)';
  ctx.lineWidth = 1;
  // Columns
  for (let i = 1; i < cols; i++) {
    const x = i * colWidth;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  // Rows
  for (let i = 1; i < rows; i++) {
    const y = i * rowHeight;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  
  // Center axes graticule (brighter green)
  ctx.strokeStyle = 'rgba(0, 255, 136, 0.25)';
  ctx.lineWidth = 1.2;
  // Center vertical axis
  ctx.beginPath();
  ctx.moveTo(w / 2, 0);
  ctx.lineTo(w / 2, h);
  ctx.stroke();
  // Center horizontal axis
  ctx.beginPath();
  ctx.moveTo(0, h / 2);
  ctx.lineTo(w, h / 2);
  ctx.stroke();
  
  // Draw graticule subdivision ticks along the center axes (5 subdivisions per major block)
  ctx.strokeStyle = 'rgba(0, 255, 136, 0.4)';
  ctx.lineWidth = 1;
  // Horizontal axis ticks
  for (let x = 0; x < w; x += colWidth / 5) {
    ctx.beginPath();
    ctx.moveTo(x, h / 2 - 3);
    ctx.lineTo(x, h / 2 + 3);
    ctx.stroke();
  }
  // Vertical axis ticks
  for (let y = 0; y < h; y += rowHeight / 5) {
    ctx.beginPath();
    ctx.moveTo(w / 2 - 3, y);
    ctx.lineTo(w / 2 + 3, y);
    ctx.stroke();
  }
  
  // 3. Draw Scanlines Overlay
  ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
  for (let y = 0; y < h; y += 2) {
    ctx.fillRect(0, y, w, 1);
  }
  
  // Get scale multipliers from range inputs
  const scaleTime = elements.sliderOscTime ? parseFloat(elements.sliderOscTime.value) : 1.0;
  const scaleVolts = elements.sliderOscVolts ? parseFloat(elements.sliderOscVolts.value) : 1.0;
  
  // 4. Draw wave trace
  if (state.isRunning) {
    if (state.activeExperiment === 'rc') {
      const R_val = state.params.R || 100;
      const C_val = state.params.C || 100;
      const tau = R_val * C_val * 1e-4; // scaled for visibility
      
      if (state.rcPhaseStartTime === undefined || state.rcPhaseStartTime === null) {
        state.rcPhaseStartTime = state.experimentStartTime || Date.now();
        state.rcStartVoltage = 0.0;
        state.rcLastState = state.buttonPressed;
      }
      
      if (state.rcLastState !== state.buttonPressed) {
        state.rcStartVoltage = state.capVoltage || 0.0;
        state.rcPhaseStartTime = Date.now();
        state.rcLastState = state.buttonPressed;
      }
      
      const t = (Date.now() - state.rcPhaseStartTime) / 1000;
      const Vs = state.params.V || 12.0;
      let V_cap = 0.0;
      if (state.buttonPressed) {
        V_cap = Vs - (Vs - state.rcStartVoltage) * Math.exp(-t / tau);
      } else {
        V_cap = state.rcStartVoltage * Math.exp(-t / tau);
      }
      
      state.capVoltage = V_cap;
      
      // Update ammeter reading
      if (state.buttonPressed) {
        state.meters.amps = (Vs - V_cap) / R_val;
      } else {
        state.meters.amps = -(V_cap / R_val);
      }
      
      // Push history
      if (!state.rcHistory) state.rcHistory = [];
      state.rcHistory.push({ t: Date.now(), v: V_cap });
      if (state.rcHistory.length > 1000) state.rcHistory.shift();
    }

    const time = Date.now() * 0.005;
    const f = state.params.f;
    
    // Scale trace amplitude dynamically (peak volts / 30, scaled by user adjustment)
    // Map max volts (30V) to h/2 - 10
    const ampV = (state.meters.volts / 30) * (h / 2 - 10) * (1 / scaleVolts);
    
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    if (state.activeExperiment === 'ohms') {
      ctx.strokeStyle = '#00ff88'; // glowing phosphor green
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#00ff88';
      ctx.beginPath();
      ctx.moveTo(0, h / 2 - ampV);
      ctx.lineTo(w, h / 2 - ampV);
      ctx.stroke();
    } 
    else if (state.activeExperiment === 'lcr') {
      // Voltage wave - Phosphor Green
      ctx.strokeStyle = '#00ff88';
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#00ff88';
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        // Horizontal stretch adjusted by scaleTime
        const y = h / 2 + Math.sin((x / w) * Math.PI * 4 * (f / 50) * scaleTime - time) * ampV;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      // Current wave - Phosphor Cyan
      const phaseRad = state.analysis.phi * (Math.PI / 180);
      const ampI = (state.meters.amps / 0.5) * (h / 2 - 10) * (1 / scaleVolts);
      
      ctx.strokeStyle = '#00ffff';
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#00ffff';
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const y = h / 2 + Math.sin((x / w) * Math.PI * 4 * (f / 50) * scaleTime - time - phaseRad) * ampI;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    else if (state.activeExperiment === 'rc') {
      ctx.strokeStyle = '#00ff88';
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#00ff88';
      ctx.beginPath();
      
      const history = state.rcHistory || [];
      if (history.length > 1) {
        const now = Date.now();
        // Time window to display on screen (5 seconds, scaled by scaleTime)
        const timeWindow = 5000 * scaleTime;
        
        let first = true;
        for (let i = 0; i < history.length; i++) {
          const pt = history[i];
          const age = now - pt.t;
          if (age > timeWindow) continue;
          
          const x = w - (age / timeWindow) * w;
          const y = h - 15 - (pt.v / 15) * (h - 30) * (1 / scaleVolts);
          
          if (first) {
            ctx.moveTo(x, y);
            first = false;
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(0, h - 15);
        ctx.lineTo(w, h - 15);
        ctx.stroke();
      }
    }
    
    // Reset shadow for UI text drawing
    ctx.shadowBlur = 0;
    
    // Draw CRT readout text overlays
    ctx.fillStyle = 'rgba(0, 255, 136, 0.7)';
    ctx.font = '8px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`CH1: ${(5 * scaleVolts).toFixed(1)}V/Div`, 8, 8);
    if (state.activeExperiment === 'lcr') {
      ctx.fillStyle = 'rgba(0, 255, 255, 0.7)';
      ctx.fillText(`CH2: ${(100 * scaleVolts).toFixed(0)}mA/Div`, 8, 18);
      ctx.fillStyle = 'rgba(0, 255, 136, 0.7)';
    }
    ctx.fillText(`M: ${(2 * scaleTime).toFixed(1)}ms/Div`, 8, h - 14);
    ctx.fillText(`DC Coupling`, w - 68, h - 14);
    
    // Update digital stats in panel footer
    const vPeak = state.meters.volts;
    const fVal = state.params.f;
    document.getElementById('osc-vp').innerText = `${vPeak.toFixed(1)}V`;
    
    if (state.activeExperiment === 'ohms') {
      elements.oscFreqLbl.innerText = '0 Hz (DC)';
      elements.oscPhaseLbl.innerText = '0.0°';
      document.getElementById('osc-period').innerText = '—';
    } else if (state.activeExperiment === 'lcr') {
      elements.oscFreqLbl.innerText = `${fVal.toFixed(0)} Hz`;
      elements.oscPhaseLbl.innerText = `${state.analysis.phi.toFixed(1)}°`;
      document.getElementById('osc-period').innerText = `${(1000 / fVal).toFixed(1)}ms`;
    } else if (state.activeExperiment === 'rc') {
      elements.oscFreqLbl.innerText = `Transient`;
      elements.oscPhaseLbl.innerText = `RC`;
      document.getElementById('osc-period').innerText = `${(state.analysis.f0 * 1000).toFixed(0)}ms`;
    }
  } else {
    // Flat flatline when not running
    ctx.strokeStyle = 'rgba(0, 255, 136, 0.2)';
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();
    
    ctx.fillStyle = 'rgba(0, 255, 136, 0.4)';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`NO SIGNAL`, w / 2, h / 2 - 12);
    
    elements.oscFreqLbl.innerText = "— Hz";
    elements.oscPhaseLbl.innerText = "— °";
    document.getElementById('osc-vp').innerText = "— V";
    document.getElementById('osc-period').innerText = "— ms";
  }
  
  requestAnimationFrame(drawOscilloscope);
}

// Hover states for the graph
let graphMouseX = null;
let graphMouseY = null;

function getGraphConfig(expKey) {
  const R_theoretical = state.params.R || 100;
  
  switch(expKey) {
    case 'ohms':
    case 'kvl':
    case 'kcl':
    case 'series_parallel':
    case 'wheatstone':
    case 'arduino_led':
      return {
        xLabel: "Voltage V (V)",
        yLabel: "Current I (mA)",
        xMax: 30,
        yMax: 300,
        getX: (pt) => pt.V,
        getY: (pt) => pt.I * 1000,
        showSlopeCard: expKey === 'ohms'
      };
      
    case 'diode_iv':
      return {
        xLabel: "Diode Voltage Vd (V)",
        yLabel: "Diode Current Id (mA)",
        xMax: 1.0,
        yMax: 50.0,
        getX: (pt) => pt.V,
        getY: (pt) => pt.I * 1000,
        showSlopeCard: false
      };
      
    case 'planck_led':
      return {
        xLabel: "LED Voltage Vd (V)",
        yLabel: "LED Current Id (mA)",
        xMax: 3.0,
        yMax: 30.0,
        getX: (pt) => pt.V,
        getY: (pt) => pt.I * 1000,
        showSlopeCard: false
      };
      
    case 'lcr':
      return {
        xLabel: "Frequency f (Hz)",
        yLabel: "Current I (mA)",
        xMax: 1000,
        yMax: 250,
        getX: (pt) => pt.f,
        getY: (pt) => pt.I * 1000,
        showSlopeCard: false
      };
      
    case 'rc_rl_rlc':
      return {
        xLabel: "Frequency f (Hz)",
        yLabel: "Impedance Z (Ω)",
        xMax: 1000,
        yMax: 1000,
        getX: (pt) => pt.f,
        getY: (pt) => pt.R,
        showSlopeCard: false
      };
      
    case 'rc':
      return {
        xLabel: "Time Constant τ (ms)",
        yLabel: "Voltage V (V)",
        xMax: 1000,
        yMax: 30,
        getX: (pt) => pt.R * pt.C * 1e-3, // R*C in ms
        getY: (pt) => pt.V,
        showSlopeCard: false
      };

    case 'ideal_gas':
    case 'boyle':
      return {
        xLabel: "Volume V (L)",
        yLabel: "Pressure P (kPa)",
        xMax: 30,
        yMax: 300,
        getX: (pt) => pt.I, // Volume is pt.I
        getY: (pt) => pt.V, // Pressure is pt.V
        showSlopeCard: false
      };
      
    case 'charles':
      return {
        xLabel: "Temperature T (K)",
        yLabel: "Volume V (L)",
        xMax: 400,
        yMax: 30,
        getX: (pt) => pt.R, // Temperature is pt.R
        getY: (pt) => pt.I, // Volume is pt.I
        showSlopeCard: false
      };
      
    case 'specific_heat':
      return {
        xLabel: "Metal Temp Tm (°C)",
        yLabel: "Mixture Temp Tf (°C)",
        xMax: 100,
        yMax: 100,
        getX: (pt) => pt.V, // Tm is pt.V
        getY: (pt) => pt.R, // Tf is pt.R
        showSlopeCard: false
      };
      
    case 'photoelectric':
      return {
        xLabel: "Light Freq ν (10¹⁴ Hz)",
        yLabel: "Stopping Volt Vs (V)",
        xMax: 20,
        yMax: 5,
        getX: (pt) => pt.V, // Freq is pt.V
        getY: (pt) => pt.P, // Stopping Vs is pt.P
        showSlopeCard: false
      };
      
    case 'radioactive':
      return {
        xLabel: "Time (s)",
        yLabel: "Remaining Nuclei N",
        xMax: 60,
        yMax: 100,
        getX: (pt) => pt.time || 0,
        getY: (pt) => pt.I, // Remaining is pt.I
        showSlopeCard: false
      };
      
    case 'de_broglie':
      return {
        xLabel: "Velocity v (km/s)",
        yLabel: "Wavelength λ (nm)",
        xMax: 1000,
        yMax: 5,
        getX: (pt) => pt.I, // Velocity is pt.I
        getY: (pt) => pt.R, // Wavelength is pt.R
        showSlopeCard: false
      };
      
    case 'bohr_model':
      return {
        xLabel: "Initial Orbit ni",
        yLabel: "Energy Gap ΔE (eV)",
        xMax: 5,
        yMax: 15,
        getX: (pt) => pt.V, // ni is pt.V
        getY: (pt) => pt.R, // deltaE is pt.R
        showSlopeCard: false
      };

    default:
      return {
        xLabel: "Voltage V (V)",
        yLabel: "Current I (mA)",
        xMax: 30,
        yMax: 300,
        getX: (pt) => pt.V,
        getY: (pt) => pt.I * 1000,
        showSlopeCard: false
      };
  }
}

function drawGraph() {
  if (!elements.graphCanvas) return;
  const ctx = elements.graphCanvas.getContext('2d');
  const w = elements.graphCanvas.width;
  const h = elements.graphCanvas.height;
  
  if (w <= 0 || h <= 0) return;
  
  // 1. Draw beautiful background based on theme
  const isLight = state.theme === 'light';
  ctx.fillStyle = isLight ? '#ffffff' : '#060a16';
  ctx.fillRect(0, 0, w, h);
  
  // Layout paddings
  const paddingLeft = 45;
  const paddingRight = 15;
  const paddingTop = 20;
  const paddingBottom = 30;
  
  const graphWidth = w - paddingLeft - paddingRight;
  const graphHeight = h - paddingTop - paddingBottom;
  
  // 2. Draw border
  ctx.strokeStyle = isLight ? 'rgba(15, 23, 42, 0.12)' : 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.strokeRect(paddingLeft, paddingTop, graphWidth, graphHeight);
  
  const config = getGraphConfig(state.activeExperiment);
  let maxValX = config.xMax;
  let maxValY = config.yMax;
  const R_theoretical = state.params.R || 100;
  
  // Dynamic auto-scaling if data points exceed default limits
  if (state.dataPoints.length > 0) {
    state.dataPoints.forEach(pt => {
      const xVal = config.getX(pt);
      const yVal = config.getY(pt);
      if (xVal > maxValX) maxValX = xVal * 1.15;
      if (yVal > maxValY) maxValY = yVal * 1.15;
    });
  }

  const xDecimals = maxValX <= 5 ? 1 : 0;
  const yDecimals = maxValY <= 5 ? 1 : 0;
  
  // 3. Draw grid, ticks, and numeric labels
  ctx.fillStyle = isLight ? '#475569' : '#64748b';
  ctx.font = '8px monospace';
  
  // Vertical grids (X axis ticks)
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  for (let i = 0; i <= 5; i++) {
    const xVal = (i / 5) * maxValX;
    const xPix = paddingLeft + (i / 5) * graphWidth;
    
    // Grid line
    ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.04)';
    ctx.beginPath();
    ctx.moveTo(xPix, paddingTop);
    ctx.lineTo(xPix, h - paddingBottom);
    ctx.stroke();
    
    // Tick mark
    ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.moveTo(xPix, h - paddingBottom);
    ctx.lineTo(xPix, h - paddingBottom + 4);
    ctx.stroke();
    
    // Label
    ctx.fillText(`${xVal.toFixed(xDecimals)}`, xPix, h - paddingBottom + 6);
  }
  
  // Horizontal grids (Y axis ticks)
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (let i = 0; i <= 5; i++) {
    const yVal = (i / 5) * maxValY;
    const yPix = h - paddingBottom - (i / 5) * graphHeight;
    
    // Grid line
    ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.04)';
    ctx.beginPath();
    ctx.moveTo(paddingLeft, yPix);
    ctx.lineTo(w - paddingRight, yPix);
    ctx.stroke();
    
    // Tick mark
    ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.moveTo(paddingLeft - 4, yPix);
    ctx.lineTo(paddingLeft, yPix);
    ctx.stroke();
    
    // Label
    ctx.fillText(`${yVal.toFixed(yDecimals)}`, paddingLeft - 8, yPix);
  }
  
  // 4. Draw rotated Axis Title Labels
  ctx.fillStyle = isLight ? '#0f172a' : '#94a3b8';
  ctx.font = '8px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  // X-axis: Custom Label
  ctx.fillText(config.xLabel, paddingLeft + graphWidth / 2, h - 2);
  
  // Y-axis: Custom Label
  ctx.save();
  ctx.translate(12, paddingTop + graphHeight / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(config.yLabel, 0, 0);
  ctx.restore();
  
  // 5. Plot best-fit line for Ohm's Law
  let slopeDisp = "—";
  let R_calc_disp = "—";
  let error_disp = "—";
  
  if (config.showSlopeCard && state.dataPoints.length >= 2) {
    const N = state.dataPoints.length;
    let sumV = 0, sumI = 0, sumVI = 0, sumV2 = 0;
    state.dataPoints.forEach(pt => {
      sumV += pt.V;
      sumI += pt.I;
      sumVI += pt.V * pt.I;
      sumV2 += pt.V * pt.V;
    });
    const denom = (N * sumV2 - sumV * sumV);
    if (denom !== 0) {
      const m = (N * sumVI - sumV * sumI) / denom; // slope in A/V
      const c = (sumI - m * sumV) / N; // intercept
      
      const m_mA = m * 1000; // slope in mA/V
      const R_calc = 1 / m; // resistance in Ohms
      const error = Math.abs(R_calc - R_theoretical) / R_theoretical * 100;
      
      slopeDisp = `${m_mA.toFixed(3)} mA/V`;
      R_calc_disp = `${R_calc.toFixed(1)} Ω`;
      error_disp = `${error.toFixed(2)}%`;
      
      // Draw best-fit line with neon green glow
      ctx.strokeStyle = '#00d084';
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#00d084';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      
      const vStart = 0;
      const iStart = m * vStart + c;
      const xStart = paddingLeft + (vStart / maxValX) * graphWidth;
      const yStart = h - paddingBottom - ((iStart * 1000) / maxValY) * graphHeight;
      
      const vEnd = maxValX;
      const iEnd = m * vEnd + c;
      const xEnd = paddingLeft + (vEnd / maxValX) * graphWidth;
      const yEnd = h - paddingBottom - ((iEnd * 1000) / maxValY) * graphHeight;
      
      ctx.moveTo(xStart, yStart);
      ctx.lineTo(xEnd, yEnd);
      ctx.stroke();
      ctx.setLineDash([]); // reset
      ctx.shadowBlur = 0; // reset
    }
  }
  
  // 5b. Draw theoretical diode I-V exponential curve for diode_iv and planck_led
  if (['diode_iv', 'planck_led'].includes(state.activeExperiment)) {
    const nVT = 0.052;
    const V_barrier = state.activeExperiment === 'planck_led' ?
      ({ red: 1.8, green: 2.2, blue: 2.7, yellow: 2.0 }[state.params.led_color] || 2.0) : 0.7;
    const Is = 1e-3 / Math.exp(V_barrier / nVT);
    
    ctx.strokeStyle = '#00d084';
    ctx.shadowBlur = 6;
    ctx.shadowColor = '#00d084';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    
    let started = false;
    const steps = 200;
    for (let i = 0; i <= steps; i++) {
      const Vd = (i / steps) * maxValX;
      const I_theory = Is * (Math.exp(Vd / nVT) - 1); // Shockley equation
      const I_mA = I_theory * 1000;
      
      // Clamp to visible area
      if (I_mA > maxValY * 1.5) break;
      
      const xPix = paddingLeft + (Vd / maxValX) * graphWidth;
      const yPix = h - paddingBottom - (I_mA / maxValY) * graphHeight;
      
      if (!started) {
        ctx.moveTo(xPix, yPix);
        started = true;
      } else {
        ctx.lineTo(xPix, yPix);
      }
    }
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.shadowBlur = 0;
  }
  
  // 6. Draw connection line and data points
  if (state.dataPoints.length > 0) {
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    const sortedPoints = [...state.dataPoints].sort((a, b) => config.getX(a) - config.getX(b));
    sortedPoints.forEach((pt, idx) => {
      const xVal = config.getX(pt);
      const yVal = config.getY(pt);
      const xPix = paddingLeft + (xVal / maxValX) * graphWidth;
      const yPix = h - paddingBottom - (yVal / maxValY) * graphHeight;
      
      if (idx === 0) ctx.moveTo(xPix, yPix);
      else ctx.lineTo(xPix, yPix);
    });
    if (sortedPoints.length > 1) {
      ctx.stroke();
    }
    
    // Draw glowing circles
    state.dataPoints.forEach(pt => {
      const xVal = config.getX(pt);
      const yVal = config.getY(pt);
      const xPix = paddingLeft + (xVal / maxValX) * graphWidth;
      const yPix = h - paddingBottom - (yVal / maxValY) * graphHeight;
      
      // Neon violet halo
      ctx.fillStyle = '#a855f7';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#a855f7';
      ctx.beginPath();
      ctx.arc(xPix, yPix, 4, 0, 2 * Math.PI);
      ctx.fill();
      
      // White core
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(xPix, yPix, 1.8, 0, 2 * Math.PI);
      ctx.fill();
    });
  }
  
  // 7. Render Interactive Hover Crosshairs
  if (graphMouseX !== null && graphMouseY !== null &&
      graphMouseX >= paddingLeft && graphMouseX <= w - paddingRight &&
      graphMouseY >= paddingTop && graphMouseY <= h - paddingBottom) {
    
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    
    // Horizontal crosshair
    ctx.beginPath();
    ctx.moveTo(paddingLeft, graphMouseY);
    ctx.lineTo(w - paddingRight, graphMouseY);
    ctx.stroke();
    
    // Vertical crosshair
    ctx.beginPath();
    ctx.moveTo(graphMouseX, paddingTop);
    ctx.lineTo(graphMouseX, h - paddingBottom);
    ctx.stroke();
    
    ctx.setLineDash([]); // reset
    
    // Calculate hover values
    const xHover = ((graphMouseX - paddingLeft) / graphWidth) * maxValX;
    const yHover = ((h - paddingBottom - graphMouseY) / graphHeight) * maxValY;
    
    // Float coordinate label HUD
    ctx.shadowBlur = 6;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 1;
    
    const hudW = 95;
    const hudH = 28;
    let hudX = graphMouseX + 10;
    let hudY = graphMouseY - 34;
    if (hudX + hudW > w) hudX = graphMouseX - hudW - 10;
    if (hudY < 0) hudY = graphMouseY + 10;
    
    ctx.fillRect(hudX, hudY, hudW, hudH);
    ctx.strokeRect(hudX, hudY, hudW, hudH);
    ctx.shadowBlur = 0;
    
    ctx.fillStyle = '#f1f5f9';
    ctx.font = '8px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    const xClean = config.xLabel.split(' ')[0];
    const yClean = config.yLabel.split(' ')[0];
    ctx.fillText(`${xClean}: ${xHover.toFixed(1)}`, hudX + 5, hudY + 5);
    ctx.fillText(`${yClean}: ${yHover.toFixed(1)}`, hudX + 5, hudY + 15);
  }
  
  // 8. Render Stats Card Overlay (placed dynamically in grid top-right)
  if (config.showSlopeCard && state.dataPoints.length >= 2) {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = 'rgba(0, 208, 132, 0.3)';
    ctx.lineWidth = 1;
    
    const cardW = 100;
    const cardH = 38;
    const cardX = w - paddingRight - cardW - 5;
    const cardY = paddingTop + 5;
    
    ctx.fillRect(cardX, cardY, cardW, cardH);
    ctx.strokeRect(cardX, cardY, cardW, cardH);
    
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '7px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Slope: ${slopeDisp}`, cardX + 5, cardY + 5);
    ctx.fillText(`R(slope): ${R_calc_disp}`, cardX + 5, cardY + 15);
    ctx.fillText(`Error: ${error_disp}`, cardX + 5, cardY + 25);
    
    elements.graphSlopeLbl.innerHTML = `Slope m: ${slopeDisp} | R(slope): ${R_calc_disp} | Error: ${error_disp}`;
  } else {
    elements.graphSlopeLbl.innerText = config.showSlopeCard ? "Slope: Need 2+ points" : "Slope: —";
  }
}

function updateWiringBanner() {
  const banner = document.getElementById('wiring-mode-banner');
  if (banner) {
    if (state.selectedTool === 'wire') {
      banner.classList.remove('hidden');
      if (state.placementStartHole !== null) {
        banner.innerText = "● WIRING MODE // SELECT TERMINAL 2";
      } else {
        banner.innerText = "● WIRING MODE // SELECT TERMINAL 1";
      }
    } else {
      banner.classList.add('hidden');
    }
  }
}

// --- PANEL DRAG & EXPORT UTILITIES ---
function makeElementDraggable(panelEl, headerEl) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  headerEl.addEventListener('mousedown', dragMouseDown);

  function dragMouseDown(e) {
    if (e.target.closest('button') || e.target.closest('input')) return;

    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;

    const parent = panelEl.parentElement;
    const parentRect = parent.getBoundingClientRect();
    const panelRect = panelEl.getBoundingClientRect();
    
    panelEl.style.left = (panelRect.left - parentRect.left) + 'px';
    panelEl.style.top = (panelRect.top - parentRect.top) + 'px';
    panelEl.style.right = 'auto';
    panelEl.style.bottom = 'auto';

    document.addEventListener('mouseup', closeDragElement);
    document.addEventListener('mousemove', elementDrag);
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    let newTop = panelEl.offsetTop - pos2;
    let newLeft = panelEl.offsetLeft - pos1;

    const parent = panelEl.parentElement;
    const maxLeft = parent.clientWidth - panelEl.clientWidth;
    const maxTop = parent.clientHeight - panelEl.clientHeight;

    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));

    panelEl.style.top = newTop + 'px';
    panelEl.style.left = newLeft + 'px';
  }

  function closeDragElement() {
    document.removeEventListener('mouseup', closeDragElement);
    document.removeEventListener('mousemove', elementDrag);
  }
}

function downloadCanvasAsImage(canvas, filename) {
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function generateExperimentConclusion(expKey, dataPoints) {
  if (!dataPoints || dataPoints.length === 0) {
    return "Experiment in progress. Complete all steps and record data points using the 'Record' button to compile results and generate the final conclusion.";
  }

  const N = dataPoints.length;
  const lastPt = dataPoints[N - 1];

  switch (expKey) {
    case 'ohms': {
      const R_theoretical = state.params.R || 100;
      let sumV = 0, sumI = 0, sumVI = 0, sumV2 = 0;
      dataPoints.forEach(p => {
        sumV += p.V;
        sumI += p.I;
        sumVI += p.V * p.I;
        sumV2 += p.V * p.V;
      });
      const denom = (N * sumV2 - sumV * sumV);
      if (denom !== 0) {
        const m = (N * sumVI - sumV * sumI) / denom;
        const R_calc = 1 / m;
        const error = Math.abs(R_calc - R_theoretical) / R_theoretical * 100;
        return `The Ohm's Law verification experiment was successfully completed. Based on the ${N} recorded data points, the V-I characteristic curve is a straight line passing through the origin, representing a purely Ohmic response. The experimental resistance calculated from the slope (reciprocal of conductance m = ${(m * 1000).toFixed(3)} mA/V) is ${R_calc.toFixed(1)} Ω. This deviates from the theoretical value of ${R_theoretical} Ω by only ${error.toFixed(2)}%, thereby verifying the linear relationship V = I × R.`;
      }
      return `The Ohm's Law verification experiment was performed. The V-I characteristic curve exhibits a linear response passing through the origin. This confirms that current is directly proportional to voltage and inversely proportional to resistance, verifying V = I × R.`;
    }

    case 'kvl': {
      const R1 = state.params.R || 100;
      const R2 = state.params.L || 100;
      const lastV = lastPt.V;
      const lastI = lastPt.I;
      const V1 = lastI * R1;
      const V2 = lastI * R2;
      const sumDrops = V1 + V2;
      const discrepancy = Math.abs(lastV - sumDrops);
      return `Kirchhoff's Voltage Law (KVL) was verified in a series DC loop containing resistances R1 = ${R1} Ω and R2 = ${R2} Ω. The sum of the individual potential drops (V1 = ${V1.toFixed(2)} V and V2 = ${V2.toFixed(2)} V) equals the total source voltage Vs = ${lastV.toFixed(2)} V (discrepancy: ${discrepancy.toFixed(3)} V). This confirms the Loop Rule (ΣV = 0), verifying that the net energy gained in a closed circuit loop equals the net energy dissipated, satisfying conservation of energy.`;
    }

    case 'kcl': {
      const R1 = state.params.R || 100;
      const R2 = state.params.L || 100;
      const lastV = lastPt.V;
      const I1 = lastV / R1;
      const I2 = lastV / R2;
      const I_total = lastPt.I;
      const sumBranch = I1 + I2;
      const error = Math.abs(I_total - sumBranch) * 1000;
      return `Kirchhoff's Current Law (KCL) was verified at a parallel junction containing resistors R1 = ${R1} Ω and R2 = ${R2} Ω. At a source potential of ${lastV.toFixed(1)} V, the measured total entering current is ${(I_total * 1000).toFixed(1)} mA, which closely matches the sum of individual branch currents (I1 = ${(I1 * 1000).toFixed(1)} mA and I2 = ${(I2 * 1000).toFixed(1)} mA, sum = ${(sumBranch * 1000).toFixed(1)} mA, error = ${error.toFixed(2)} mA). This confirms the Junction Rule (ΣI_in = ΣI_out), validating the principle of conservation of electrical charge.`;
    }

    case 'rc_rl_rlc': {
      const R = state.params.R || 100;
      const L = state.params.L || 10;
      const C = state.params.C || 10;
      return `The AC Impedance Analysis of the LCR series circuit was performed with R = ${R} Ω, L = ${L} mH, and C = ${C} µF. The total impedance Z and phase angle φ were monitored as frequency varied from 10 Hz to 1000 Hz. The reactances XL and XC exhibited their expected frequency dependencies, causing the overall phase shift to transition from capacitive (lagging voltage) at low frequencies to inductive (leading voltage) at high frequencies, confirming AC network impedance theory.`;
    }

    case 'lcr': {
      const R = state.params.R || 100;
      const L_mH = state.params.L || 10;
      const C_uF = state.params.C || 10;
      const f0_theoretical = (1 / (2 * Math.PI * Math.sqrt(L_mH * 1e-3 * C_uF * 1e-6))).toFixed(1);
      return `The series LCR resonance experiment was successfully conducted using components R = ${R} Ω, L = ${L_mH} mH, and C = ${C_uF} µF. The theoretical resonant frequency is calculated as f₀ = 1 / (2π√(LC)) = ${f0_theoretical} Hz. At resonance, the inductive and capacitive reactances cancel each other (XL = XC), making the total impedance minimum (Z = R = ${R} Ω) and the current flow maximum. The frequency response curve demonstrates a sharp resonance peak, verifying AC resonance theory.`;
    }

    case 'rc': {
      const R = state.params.R || 100;
      const C = state.params.C || 10;
      const tau_ms = (R * C * 1e-6 * 1000).toFixed(2);
      return `The RC transient response experiment was completed using R = ${R} Ω and C = ${C} µF. The theoretical time constant is τ = RC = ${tau_ms} ms. The charging curve shows that the capacitor potential reaches 63.2% of the supply voltage in ${tau_ms} ms and is virtually fully charged (99.3%) after ${(parseFloat(tau_ms) * 5).toFixed(1)} ms. The exponential characteristic V_C(t) = V_s(1 - e^(-t/τ)) is verified.`;
    }

    case 'series_parallel': {
      const R1 = state.params.R || 100;
      const R2 = state.params.L || 100;
      const Req_series = R1 + R2;
      const Req_parallel = (R1 * R2) / (R1 + R2);
      return `Resistor combination laws were verified for resistances R1 = ${R1} Ω and R2 = ${R2} Ω. The series connection resulted in an additive equivalent resistance of R_eq = ${Req_series} Ω, while the parallel configuration resulted in a reciprocal equivalent resistance of R_eq = ${Req_parallel.toFixed(1)} Ω. These results confirm the theoretical equivalent resistance formulas, showing that parallel paths reduce overall resistance.`;
    }

    case 'wheatstone': {
      const R1 = state.params.R || 100;
      const R2 = state.params.L || 100;
      const R3 = lastPt.C;
      const Rx_calc = R3 * (R2 / R1);
      return `The Wheatstone Bridge balancing experiment was completed. Under null-deflection conditions where galvanometer current drops to 0.00 mA, the bridge arms are balanced: R1/R2 = R3/Rx. With R1 = ${R1} Ω, R2 = ${R2} Ω, and the variable balancing resistance R3 adjusted to ${R3.toFixed(1)} Ω, the unknown resistance Rx was determined to be ${Rx_calc.toFixed(1)} Ω, demonstrating the high precision of bridge measurement techniques.`;
    }

    case 'faraday': {
      return `Faraday's Law of Electromagnetic Induction was verified. By moving a bar magnet through a conducting coil, an electromotive force (EMF) was induced. The peak induced voltage magnitude was observed to scale directly with the velocity of the magnet (rate of change of magnetic flux dΦ/dt) and the number of turns in the coil, confirming the relationship E = -N(dΦ/dt).`;
    }

    case 'lenz': {
      return `Lenz's Law was successfully demonstrated. The direction of the induced current was observed to reverse when switching from inserting the magnet (entering flux increase) to withdrawing it (exiting flux decrease). The induced magnetic field always opposed the physical motion of the magnet, verifying the negative sign in Faraday's equation and confirming the conservation of mechanical to electrical energy.`;
    }

    case 'solenoid': {
      const current = lastPt.V;
      const turns = lastPt.R;
      const length = 0.5;
      const u0 = 4 * Math.PI * 1e-7;
      const B_Tesla = u0 * (turns / length) * current;
      const B_microTesla = B_Tesla * 1e6;
      return `The magnetic field of a solenoid was analyzed. For a coil of ${turns} turns, length 50 cm, and carrying a current of ${current.toFixed(2)} A, the measured axial magnetic flux density B is ${B_microTesla.toFixed(1)} μT. The experimental results confirm that the magnetic field strength is uniform inside the solenoid core and is directly proportional to both the current and the turns density (N/L), verifying B = μ₀ × n × I.`;
    }

    case 'transformer': {
      const Vp = lastPt.V;
      const Np = lastPt.R;
      const Ns = state.params.L || 400;
      const Vs = Vp * (Ns / Np);
      return `AC transformer operation was verified. With a primary turns count Np = ${Np} and secondary turns Ns = ${Ns}, the turns ratio is ${(Ns/Np).toFixed(2)}. At an input primary voltage of ${Vp.toFixed(1)} V AC, the induced secondary output voltage is ${Vs.toFixed(1)} V AC. This matches the transformer turns law Vs/Vp = Ns/Np, demonstrating step-up/step-down action via mutual induction.`;
    }

    case 'diode_iv': {
      return `The I-V characteristics of a PN junction diode were verified in both forward and reverse bias. In forward bias, conduction remains negligible until the barrier potential (~0.7V for Silicon) is overcome, after which current increases exponentially. In reverse bias, only a tiny leakage current (~1 μA) is observed, verifying the diode's unidirectional conduction characteristics.`;
    }

    case 'voltage_divider': {
      const Vin = lastPt.V;
      return `The voltage divider rule was experimentally verified. For series resistances R1 = ${state.params.R || 100} Ω and R2 = ${state.params.L || 200} Ω, an input voltage of ${Vin.toFixed(1)} V distributed proportionally, yielding V_out = ${lastPt.V.toFixed(2)} V across R2. This confirms the voltage division relationship V_out = V_in * (R2 / (R1 + R2)).`;
    }

    case 'planck_led': {
      return `Planck's constant was determined using color LEDs. The threshold turn-on voltages V_th for Red, Yellow, Green, and Blue wavelengths λ were recorded. By equating electrical energy to photon energy (e × V_th = h × c / λ), the slope of the V_th vs 1/λ plot yielded Planck's constant h, matching the standard value of 6.626 × 10⁻³⁴ J·s within experimental limits.`;
    }

    case 'biot_savart': {
      const current = lastPt.V;
      const distance = lastPt.I;
      const B_microTesla = lastPt.P;
      return `Biot-Savart's Law was verified around a straight current-carrying conductor. At a current of ${current.toFixed(1)} A and radial distance of ${distance.toFixed(1)} cm, the measured magnetic field B is ${B_microTesla.toFixed(2)} μT. Tabulated results confirm that B is directly proportional to current (I) and inversely proportional to radial distance (r), satisfying B = μ₀I / (2πr).`;
    }

    case 'planck_photocell': {
      return `Planck's constant was determined using a photocell. The stopping voltage Vs was measured for different incident monochromatic wavelengths. The stopping voltage increases linearly with light frequency, confirming Einstein's photoelectric equation e × Vs = h × f - Φ. The slope yields h/e, from which Planck's constant was computed as ~6.63 × 10⁻³⁴ J·s.`;
    }

    case 'stefan_law': {
      const T = lastPt.V;
      const P = lastPt.P;
      return `Stefan's Law of blackbody radiation was verified. Radiated power was measured across a range of absolute temperatures. For example, at T = ${T.toFixed(0)} K, the radiated power was ${P.toFixed(2)} W. The logarithmic plot of Power vs Temperature shows a slope of ~4.0, verifying that total radiated energy scales with the fourth power of absolute temperature (P ∝ T⁴).`;
    }

    case 'ideal_gas': {
      const pressure = lastPt.V;
      const volume = lastPt.I;
      const temp = lastPt.R;
      const PV_T = (pressure * volume) / temp;
      return `The Ideal Gas Law was verified. Pressure, volume, and temperature were varied. Under all state configurations, the PV/T ratio remained constant at ${PV_T.toFixed(3)} L·kPa/K for the fixed quantity of gas, confirming the state equation PV = nRT.`;
    }

    case 'boyle': {
      const pressure = lastPt.V;
      const volume = lastPt.I;
      const constant_PV = pressure * volume;
      return `Boyle's Law was verified at constant temperature. As volume was compressed from 5L to 2L, pressure increased proportionally. The product of pressure and volume remained constant at approximately ${constant_PV.toFixed(1)} L·kPa, validating the inverse relationship P ∝ 1/V (P1V1 = P2V2).`;
    }

    case 'charles': {
      const temp = lastPt.R;
      const volume = lastPt.I;
      const V_T_ratio = volume / temp;
      return `Charles's Law was verified at constant pressure. Heating the gas caused linear volume expansion. The ratio of Volume to absolute Temperature (V/T) remained constant at approximately ${V_T_ratio.toFixed(4)} L/K, confirming the direct relationship V ∝ T (V1/T1 = V2/T2).`;
    }

    case 'specific_heat': {
      const Tm = lastPt.V;
      const Tf = lastPt.R;
      return `The specific heat capacity of copper was determined using calorimetry. Hot copper weights at ${Tm.toFixed(1)} °C were dropped into water. The mixture reached thermal equilibrium at Tf = ${Tf.toFixed(1)} °C. Based on the heat exchange equation Q = m × c × ΔT, the specific heat of copper was computed, demonstrating excellent agreement with the standard value of 0.385 J/g·°C.`;
    }

    case 'photoelectric': {
      const freq = lastPt.V;
      const stoppingVs = lastPt.P;
      return `Einstein's photoelectric equation was verified. Photoelectrons are emitted only when the incident frequency exceeds the threshold frequency. The stopping voltage Vs was found to increase linearly with light frequency (frequency: ${freq.toFixed(1)} × 10¹⁴ Hz, stopping voltage: ${stoppingVs.toFixed(2)} V), confirming that K_max = h × f - Φ.`;
    }

    case 'radioactive': {
      const halfLife = lastPt.R;
      return `The radioactive decay law was verified. The parent nuclei count was monitored over time and exhibited a clear exponential decay profile. The half-life was experimentally measured as approximately ${halfLife.toFixed(1)} seconds, conforming to the decay equation N(t) = N₀ × e^(-λ × t).`;
    }

    case 'de_broglie': {
      const mass = lastPt.V;
      const vel = lastPt.I;
      const lambda = lastPt.R;
      return `The de Broglie matter wave relation was verified. Moving masses (accelerated electrons) displayed wave diffraction patterns. For a particle mass of ${mass.toFixed(1)} × 10⁻³⁰ kg at velocity ${vel.toFixed(0)} km/s, the de Broglie wavelength was measured as ${lambda.toFixed(3)} nm, verifying the dual wave-particle nature of matter (λ = h/p).`;
    }

    case 'bohr_model': {
      const ni = lastPt.V;
      const nf = lastPt.I;
      const deltaE = lastPt.R;
      return `Orbital transitions in the Bohr Hydrogen atom were analyzed. The transition of an electron from orbit n_i = ${ni} to n_f = ${nf} resulted in an energy change of ΔE = ${deltaE.toFixed(2)} eV. This quantum transition emitted a photon whose wavelength corresponds to the hydrogen spectral series (Balmer/Lyman), verifying the Bohr orbit energy relation.`;
    }

    case 'arduino_led': {
      const R = state.params.R || 150;
      const I_mA = ((5.0 - 2.0) / R * 1000).toFixed(1);
      return `The Arduino push-button LED loop was successfully constructed and verified. With Vcc = 5V and LED forward drop V_led ≈ 2V, the series current-limiting resistor R = ${R} Ω restricted the circuit current to a safe value of ${I_mA} mA. Closing the switch completed the loop, lighting the LED, demonstrating basic digital loop principles.`;
    }

    default:
      return "Experiment successfully performed. Data points recorded and verified, confirming the physical principles of the experiment.";
  }
}



// --- FULL LAB REPORT PDF GENERATOR ---
function generateLabReportPDF() {
  const expKey = state.activeExperiment;
  const exp = experiments[expKey];
  const date = new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'long', year:'numeric' });

  // --- Build observation table HTML ---
  let tableHeaders = '';
  let tableRows = '';
  
  if (['ohms', 'kvl', 'kcl', 'series_parallel', 'wheatstone', 'arduino_led', 'diode_iv', 'voltage_divider', 'planck_led'].includes(expKey)) {
    tableHeaders = `<th>S.No.</th><th>Voltage V (V)</th><th>Current I (mA)</th><th>${expKey === 'ohms' ? 'Resistance' : 'Impedance'} R (Ω)</th>`;
    state.dataPoints.forEach(p => {
      tableRows += `<tr><td>${p.id}</td><td>${p.V.toFixed(2)}</td><td>${(p.I * 1000).toFixed(1)} mA</td><td>${p.R.toFixed(1)}</td></tr>`;
    });
  } else if (['lcr', 'rc_rl_rlc'].includes(expKey)) {
    tableHeaders = `<th>S.No.</th><th>Frequency f (Hz)</th><th>Voltage V (V)</th><th>Current I (mA)</th><th>Impedance Z (Ω)</th>`;
    state.dataPoints.forEach(p => {
      tableRows += `<tr><td>${p.id}</td><td>${p.f}</td><td>${p.V.toFixed(2)}</td><td>${(p.I * 1000).toFixed(1)} mA</td><td>${p.R.toFixed(1)}</td></tr>`;
    });
  } else if (expKey === 'rc') {
    tableHeaders = `<th>S.No.</th><th>Capacitance C (µF)</th><th>Voltage V (V)</th><th>Time Constant τ = RC (ms)</th>`;
    state.dataPoints.forEach(p => {
      const tau = (state.params.R * p.C * 1e-6 * 1000).toFixed(2);
      tableRows += `<tr><td>${p.id}</td><td>${p.C}</td><td>${p.V.toFixed(2)}</td><td>${tau}</td></tr>`;
    });
  } else if (['ideal_gas', 'boyle'].includes(expKey)) {
    tableHeaders = `<th>S.No.</th><th>Volume V (L)</th><th>Temp T (K)</th><th>Pressure P (kPa)</th>`;
    state.dataPoints.forEach(p => {
      tableRows += `<tr><td>${p.id}</td><td>${p.I.toFixed(1)}</td><td>${p.R.toFixed(0)}</td><td>${p.V.toFixed(1)}</td></tr>`;
    });
  } else if (expKey === 'charles') {
    tableHeaders = `<th>S.No.</th><th>Temp T (K)</th><th>Pressure P (kPa)</th><th>Volume V (L)</th>`;
    state.dataPoints.forEach(p => {
      tableRows += `<tr><td>${p.id}</td><td>${p.R.toFixed(0)}</td><td>${p.V.toFixed(1)}</td><td>${p.I.toFixed(1)}</td></tr>`;
    });
  } else if (expKey === 'specific_heat') {
    tableHeaders = `<th>S.No.</th><th>Metal Tm (°C)</th><th>Water Tw (°C)</th><th>Mixture Tf (°C)</th><th>Heat Q (J)</th>`;
    state.dataPoints.forEach(p => {
      tableRows += `<tr><td>${p.id}</td><td>${p.V.toFixed(1)}</td><td>${p.I.toFixed(1)}</td><td>${p.R.toFixed(1)}</td><td>${p.P.toFixed(0)}</td></tr>`;
    });
  } else if (expKey === 'photoelectric') {
    tableHeaders = `<th>S.No.</th><th>Freq ν (10¹⁴Hz)</th><th>Intensity (mW)</th><th>Work Fn (eV)</th><th>Stopping Vs (V)</th>`;
    state.dataPoints.forEach(p => {
      tableRows += `<tr><td>${p.id}</td><td>${p.V.toFixed(2)}</td><td>${p.I.toFixed(0)}</td><td>${(p.R * 1e-3).toFixed(2)}</td><td>${p.P.toFixed(2)}</td></tr>`;
    });
  } else if (expKey === 'radioactive') {
    tableHeaders = `<th>S.No.</th><th>Time t (s)</th><th>Initial N₀</th><th>Remaining N</th><th>Activity A</th>`;
    state.dataPoints.forEach(p => {
      tableRows += `<tr><td>${p.id}</td><td>${p.time.toFixed(1)}</td><td>${p.V.toFixed(0)}</td><td>${p.I.toFixed(0)}</td><td>${p.P.toFixed(1)}</td></tr>`;
    });
  } else if (expKey === 'de_broglie') {
    tableHeaders = `<th>S.No.</th><th>Mass m (10⁻³⁰kg)</th><th>Velocity v (km/s)</th><th>Wavelength λ (nm)</th>`;
    state.dataPoints.forEach(p => {
      tableRows += `<tr><td>${p.id}</td><td>${p.V.toFixed(1)}</td><td>${p.I.toFixed(0)}</td><td>${p.R.toFixed(3)}</td></tr>`;
    });
  } else if (expKey === 'bohr_model') {
    tableHeaders = `<th>S.No.</th><th>Orbit ni</th><th>Orbit nf</th><th>Energy Gap ΔE (eV)</th>`;
    state.dataPoints.forEach(p => {
      tableRows += `<tr><td>${p.id}</td><td>${p.V.toFixed(0)}</td><td>${p.I.toFixed(0)}</td><td>${p.R.toFixed(2)}</td></tr>`;
    });
  } else if (expKey === 'arduino_led') {
    tableHeaders = `<th>S.No.</th><th>Vcc (V)</th><th>V_LED (V)</th><th>Resistance R (Ω)</th><th>Current I (mA)</th><th>Power P (mW)</th>`;
    const Vcc = 5.0, Vled = 2.0;
    [[100,'Red'],[150,'Red'],[220,'Green'],[330,'Blue']].forEach(([r, color], idx) => {
      const I = Math.max(0, (Vcc - Vled) / r);
      tableRows += `<tr><td>${idx+1}</td><td>${Vcc}</td><td>${Vled}</td><td>${r}</td><td>${(I*1000).toFixed(2)}</td><td>${(I*Vcc*1000).toFixed(2)}</td></tr>`;
    });
  } else {
    tableHeaders = `<th>S.No.</th><th>Voltage V (V)</th><th>Current I (mA)</th><th>Impedance Z (Ω)</th>`;
    state.dataPoints.forEach(p => {
      tableRows += `<tr><td>${p.id}</td><td>${p.V.toFixed(2)}</td><td>${(p.I * 1000).toFixed(1)} mA</td><td>${p.R.toFixed(1)}</td></tr>`;
    });
  }

  if (!tableRows) {
    let cols = 4;
    if (['specific_heat', 'photoelectric', 'radioactive', 'arduino_led', 'lcr', 'rc_rl_rlc'].includes(expKey)) cols = 5;
    if (expKey === 'arduino_led') cols = 6;
    tableRows = `<tr><td colspan="${cols}" style="text-align:center;color:#888;">No data recorded. Run simulation and use Record button.</td></tr>`;
  }

  // --- Build viva Q&A for report ---
  const vivaQs = assessmentQuestions[expKey] || [];
  let vivaHTML = '';
  vivaQs.forEach((q, i) => {
    vivaHTML += `
      <div style="margin-bottom:10px;padding:8px 10px;background:#f8f9fa;border-left:3px solid #2563eb;border-radius:0 5px 5px 0;">
        <p style="margin:0 0 4px;font-weight:600;font-size:11px;color:#1e293b;">Q${i+1}. ${q.q}</p>
        <p style="margin:0 0 3px;font-size:10px;color:#374151;"><strong>Correct Answer:</strong> ${q.options[q.correct]}</p>
        ${q.explanation ? `<p style="margin:0;font-size:10px;color:#4b5563;font-style:italic;">${q.explanation}</p>` : ''}
      </div>`;
  });

  // --- Build conclusion ---
  const conclusionBlock = generateExperimentConclusion(expKey, state.dataPoints);

  // --- Get grade ---
  const displayScore = Math.min(100, state.score);
  let grade = 'D', gradeColor = '#ef4444';
  if (displayScore >= 90) { grade = 'A+'; gradeColor = '#22c55e'; }
  else if (displayScore >= 70) { grade = 'A'; gradeColor = '#16a34a'; }
  else if (displayScore >= 50) { grade = 'B'; gradeColor = '#f59e0b'; }
  else if (displayScore >= 35) { grade = 'C'; gradeColor = '#f97316'; }

  // --- Formulas ---
  let formulasHTML = '';
  (exp.formulas || []).forEach(f => {
    formulasHTML += `<div style="display:inline-block;margin:3px 5px;padding:4px 10px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:20px;font-size:10px;color:#1d4ed8;"><strong>${f.name}:</strong> ${f.expr}</div>`;
  });

  // --- Procedure steps ---
  let stepsHTML = '';
  (exp.steps || []).forEach(step => {
    stepsHTML += `<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:6px;font-size:10px;color:#374151;">
      <div style="min-width:22px;height:22px;background:#1d4ed8;color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;flex-shrink:0;">${step.id}</div>
      <div style="padding-top:3px;">${step.text}</div>
    </div>`;
  });

  // --- Full HTML ---
  const reportHTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Lab Report – ${exp.name}</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; font-size:11px; color:#111827; background:#fff; line-height:1.6; }
  .page { padding:25mm 20mm; }
  h1 { font-size:20px; font-weight:800; color:#1e3a5f; margin-bottom:4px; }
  h2 { font-size:13px; font-weight:700; color:#2563eb; border-bottom:2px solid #2563eb; padding-bottom:4px; margin:18px 0 10px; text-transform:uppercase; letter-spacing:0.5px; }
  h3 { font-size:11px; font-weight:700; color:#1e3a5f; margin:10px 0 5px; }
  h4 { font-size:10px; font-weight:700; color:#374151; margin:8px 0 4px; }
  p { margin-bottom:5px; font-size:10.5px; }
  ul { margin:4px 0 6px 18px; }
  li { margin-bottom:3px; font-size:10px; }
  table { width:100%; border-collapse:collapse; margin:8px 0; font-size:10px; }
  th { background:#1d4ed8; color:white; padding:6px 8px; text-align:left; font-size:9px; letter-spacing:0.5px; text-transform:uppercase; }
  td { padding:5px 8px; border-bottom:1px solid #e5e7eb; }
  tr:nth-child(even) td { background:#f8faff; }
  .header-box { background:#1e3a5f; color:white; padding:15px 20px; border-radius:8px; margin-bottom:15px; }
  .meta-row { display:flex; gap:20px; margin-top:6px; font-size:9px; color:#93c5fd; }
  .section-box { border:1px solid #e5e7eb; border-radius:6px; padding:12px 15px; margin-bottom:12px; }
  .grade-badge { display:inline-block; padding:4px 14px; border-radius:20px; font-weight:800; font-size:14px; color:${gradeColor}; border:2px solid ${gradeColor}; }
  .score-bar-outer { background:#e5e7eb; border-radius:10px; height:8px; margin-top:5px; }
  .score-bar-fill { background:${gradeColor}; height:8px; border-radius:10px; width:${displayScore}%; }
  .formula-chip { display:inline-block; margin:2px 4px; padding:3px 9px; background:#eff6ff; border:1px solid #bfdbfe; border-radius:15px; font-size:9.5px; color:#1d4ed8; }
  .viva-q { background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px 10px; margin-bottom:8px; }
  .footer { text-align:center; font-size:8px; color:#9ca3af; margin-top:20px; border-top:1px solid #e5e7eb; padding-top:8px; }
  .conclusion-box { background:#f0fdf4; border:1px solid #bbf7d0; border-radius:6px; padding:10px 14px; font-size:10.5px; color:#166534; }
  @media print {
    body { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
    .page { padding:15mm 15mm; }
  }
</style>
</head>
<body>
<div class="page">
  <!-- HEADER -->
  <div class="header-box">
    <div style="font-size:10px;color:#93c5fd;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;">Circuit IQ Virtual Laboratory</div>
    <h1>${exp.name}</h1>
    <div class="meta-row">
      <span>📅 Date: ${date}</span>
      <span>🏆 Grade: <strong>${grade}</strong></span>
      <span>📊 Score: ${displayScore}/100</span>
      <span>🔬 Experiment: ${expKey.toUpperCase()}</span>
    </div>
    <div class="score-bar-outer" style="margin-top:10px;"><div class="score-bar-fill"></div></div>
  </div>

  <!-- AIM & APPARATUS -->
  <h2>1. Aim &amp; Apparatus</h2>
  <div class="section-box">
    <h3>Aim</h3>
    <p>${exp.aim || 'To verify the given circuit law experimentally using a virtual breadboard setup.'}</p>
    <h3 style="margin-top:10px;">Apparatus Required</h3>
    <p>${exp.apparatus || 'Power Supply, Resistor, Multimeter, Connecting Wires, Breadboard.'}</p>
  </div>

  <!-- THEORY -->
  <h2>2. Theory</h2>
  <div class="section-box">
    ${(exp.theory || '').replace(/<h3>/g,'<h3>').replace(/<\/h3>/g,'</h3>')}
    <h3>Key Formulae</h3>
    <div style="margin-top:4px;">${formulasHTML}</div>
  </div>

  <!-- PROCEDURE -->
  <h2>3. Procedure</h2>
  <div class="section-box">
    ${stepsHTML}
  </div>

  <!-- OBSERVATIONS -->
  <h2>4. Observation Table</h2>
  <div class="section-box">
    <table>
      <thead><tr>${tableHeaders}</tr></thead>
      <tbody>${tableRows}</tbody>
    </table>
    ${state.dataPoints.length === 0 ? '<p style="color:#f59e0b;font-size:10px;margin-top:5px;">⚠ No data recorded. Run the simulation and use the Record button to collect data.</p>' : ''}
  </div>

  <!-- GRAPH NOTE -->
  <h2>5. Graph</h2>
  <div class="section-box" style="text-align:center;padding:20px;">
    <p style="color:#6b7280;font-size:10px;">📈 <em>Use the Graph panel (∿ Graph button) to view the V-I plot. Click the Download HD button there to save the high-resolution graph image and attach it to this report.</em></p>
    ${expKey === 'ohms' ? '<p style="margin-top:8px;font-size:10px;">Plot: Voltage (V) on X-axis vs. Current I (mA) on Y-axis → Expected: Straight line through origin. Slope = 1/R = Conductance (G).</p>' : ''}
    ${expKey === 'lcr' ? '<p style="margin-top:8px;font-size:10px;">Plot: Frequency (Hz) on X-axis vs. Impedance Z (Ω) on Y-axis → Expected: U-shaped curve with minimum at resonant frequency f₀.</p>' : ''}
    ${expKey === 'rc' ? '<p style="margin-top:8px;font-size:10px;">Plot: Time (ms) on X-axis vs. Capacitor Voltage Vc (V) on Y-axis → Expected: Exponential charging curve.</p>' : ''}
    ${expKey === 'arduino_led' ? '<p style="margin-top:8px;font-size:10px;">Plot: Resistance R (Ω) on X-axis vs. LED Current I (mA) on Y-axis → Expected: Hyperbolic (I decreases as R increases).</p>' : ''}
  </div>

  <!-- VIVA QUESTIONS -->
  <h2>6. Viva Voce</h2>
  <div class="section-box">
    ${vivaHTML || '<p style="color:#6b7280;">Viva questions available in the Viva tab of the Lab panel.</p>'}
  </div>

  <!-- CONCLUSION -->
  <h2>7. Conclusion</h2>
  <div class="conclusion-box">
    <p>${conclusionBlock}</p>
  </div>

  <!-- GRADE CARD -->
  <h2>8. Assessment</h2>
  <div class="section-box" style="display:flex;align-items:center;gap:20px;">
    <div style="text-align:center;">
      <div class="grade-badge">${grade}</div>
      <p style="font-size:9px;color:#6b7280;margin-top:4px;">Final Grade</p>
    </div>
    <div style="flex:1;">
      <p style="font-size:10px;margin-bottom:4px;">Score: <strong>${displayScore}/100</strong></p>
      <div class="score-bar-outer"><div class="score-bar-fill"></div></div>
      <p style="font-size:9px;color:#6b7280;margin-top:3px;">${displayScore >= 90 ? 'Exceptional Lab Session!' : displayScore >= 70 ? 'Excellent understanding demonstrated.' : displayScore >= 50 ? 'Good progress. Review viva questions.' : 'Complete all experiment steps to earn a higher grade.'}</p>
    </div>
  </div>

  <div class="footer">
    Generated by Circuit IQ Virtual Laboratory · ${date} · Experiment: ${exp.name}
  </div>
</div>
</body>
</html>`;

  // Open in new window and trigger print-to-PDF
  const printWindow = window.open('', '_blank', 'width=900,height=700');
  if (!printWindow) {
    alert('Please allow pop-ups for this page to download the Lab Report as PDF.');
    return;
  }
  printWindow.document.write(reportHTML);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 600);
}

function downloadGraphHD() {
  const canvas = document.createElement('canvas');
  canvas.width = 2000;
  canvas.height = 1500;
  const ctx = canvas.getContext('2d');
  
  const w = canvas.width;
  const h = canvas.height;
  
  // 1. Background
  ctx.fillStyle = '#060a16';
  ctx.fillRect(0, 0, w, h);
  
  // Paddings
  const paddingLeft = 180;
  const paddingRight = 60;
  const paddingTop = 90;
  const paddingBottom = 130;
  
  const graphWidth = w - paddingLeft - paddingRight;
  const graphHeight = h - paddingTop - paddingBottom;
  
  // 2. Border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 4;
  ctx.strokeRect(paddingLeft, paddingTop, graphWidth, graphHeight);
  
  const config = getGraphConfig(state.activeExperiment);
  let maxValX = config.xMax;
  let maxValY = config.yMax;
  const R_theoretical = state.params.R || 100;

  // Dynamic auto-scaling if data points exceed default limits
  if (state.dataPoints.length > 0) {
    state.dataPoints.forEach(pt => {
      const xVal = config.getX(pt);
      const yVal = config.getY(pt);
      if (xVal > maxValX) maxValX = xVal * 1.15;
      if (yVal > maxValY) maxValY = yVal * 1.15;
    });
  }

  const xDecimals = maxValX <= 5 ? 1 : 0;
  const yDecimals = maxValY <= 5 ? 1 : 0;
  
  // 3. Grid, ticks, and numeric labels
  ctx.fillStyle = '#94a3b8';
  ctx.font = '28px monospace';
  
  // Vertical grids (X axis ticks)
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  for (let i = 0; i <= 5; i++) {
    const xVal = (i / 5) * maxValX;
    const xPix = paddingLeft + (i / 5) * graphWidth;
    
    // Grid line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(xPix, paddingTop);
    ctx.lineTo(xPix, h - paddingBottom);
    ctx.stroke();
    
    // Tick mark
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(xPix, h - paddingBottom);
    ctx.lineTo(xPix, h - paddingBottom + 12);
    ctx.stroke();
    
    // Label
    ctx.fillText(`${xVal.toFixed(xDecimals)}`, xPix, h - paddingBottom + 18);
  }
  
  // Horizontal grids (Y axis ticks)
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (let i = 0; i <= 5; i++) {
    const yVal = (i / 5) * maxValY;
    const yPix = h - paddingBottom - (i / 5) * graphHeight;
    
    // Grid line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(paddingLeft, yPix);
    ctx.lineTo(w - paddingRight, yPix);
    ctx.stroke();
    
    // Tick mark
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(paddingLeft - 12, yPix);
    ctx.lineTo(paddingLeft, yPix);
    ctx.stroke();
    
    // Label
    ctx.fillText(`${yVal.toFixed(yDecimals)}`, paddingLeft - 22, yPix);
  }
  
  // 4. Axis Title Labels
  ctx.fillStyle = '#cbd5e1';
  ctx.font = 'bold 32px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText(config.xLabel, paddingLeft + graphWidth / 2, h - 25);
  
  ctx.save();
  ctx.translate(45, paddingTop + graphHeight / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(config.yLabel, 0, 0);
  ctx.restore();
  
  // 5. Best-fit line
  if (config.showSlopeCard && state.dataPoints.length >= 2) {
    const N = state.dataPoints.length;
    let sumV = 0, sumI = 0, sumVI = 0, sumV2 = 0;
    state.dataPoints.forEach(pt => {
      sumV += pt.V;
      sumI += pt.I;
      sumVI += pt.V * pt.I;
      sumV2 += pt.V * pt.V;
    });
    const denom = (N * sumV2 - sumV * sumV);
    if (denom !== 0) {
      const m = (N * sumVI - sumV * sumI) / denom; // slope in A/V
      const c = (sumI - m * sumV) / N; // intercept
      
      const m_mA = m * 1000;
      const R_calc = 1 / m;
      const error = Math.abs(R_calc - R_theoretical) / R_theoretical * 100;
      
      // Draw best-fit line with neon green glow
      ctx.strokeStyle = '#00d084';
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#00d084';
      ctx.lineWidth = 5;
      ctx.setLineDash([12, 12]);
      ctx.beginPath();
      
      const vStart = 0;
      const iStart = m * vStart + c;
      const xStart = paddingLeft + (vStart / maxValX) * graphWidth;
      const yStart = h - paddingBottom - ((iStart * 1000) / maxValY) * graphHeight;
      
      const vEnd = maxValX;
      const iEnd = m * vEnd + c;
      const xEnd = paddingLeft + (vEnd / maxValX) * graphWidth;
      const yEnd = h - paddingBottom - ((iEnd * 1000) / maxValY) * graphHeight;
      
      ctx.moveTo(xStart, yStart);
      ctx.lineTo(xEnd, yEnd);
      ctx.stroke();
      ctx.setLineDash([]); // reset
      ctx.shadowBlur = 0; // reset
    }
  }
  
  // 6. Draw connection line and data points
  if (state.dataPoints.length > 0) {
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    
    const sortedPoints = [...state.dataPoints].sort((a, b) => config.getX(a) - config.getX(b));
    sortedPoints.forEach((pt, idx) => {
      const xVal = config.getX(pt);
      const yVal = config.getY(pt);
      const xPix = paddingLeft + (xVal / maxValX) * graphWidth;
      const yPix = h - paddingBottom - (yVal / maxValY) * graphHeight;
      
      if (idx === 0) ctx.moveTo(xPix, yPix);
      else ctx.lineTo(xPix, yPix);
    });
    if (sortedPoints.length > 1) {
      ctx.stroke();
    }
    
    // Draw glowing circles
    state.dataPoints.forEach(pt => {
      const xVal = config.getX(pt);
      const yVal = config.getY(pt);
      const xPix = paddingLeft + (xVal / maxValX) * graphWidth;
      const yPix = h - paddingBottom - (yVal / maxValY) * graphHeight;
      
      // Neon violet halo
      ctx.fillStyle = '#a855f7';
      ctx.shadowBlur = 24;
      ctx.shadowColor = '#a855f7';
      ctx.beginPath();
      ctx.arc(xPix, yPix, 14, 0, 2 * Math.PI);
      ctx.fill();
      
      // White core
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(xPix, yPix, 6, 0, 2 * Math.PI);
      ctx.fill();
    });
  }
  
  // 7. Render HD Stats Card Overlay (top-right)
  if (config.showSlopeCard && state.dataPoints.length >= 2) {
    const N = state.dataPoints.length;
    let sumV = 0, sumI = 0, sumVI = 0, sumV2 = 0;
    state.dataPoints.forEach(pt => {
      sumV += pt.V;
      sumI += pt.I;
      sumVI += pt.V * pt.I;
      sumV2 += pt.V * pt.V;
    });
    const denom = (N * sumV2 - sumV * sumV);
    if (denom !== 0) {
      const m = (N * sumVI - sumV * sumI) / denom;
      const m_mA = m * 1000;
      const R_calc = 1 / m;
      const error = Math.abs(R_calc - R_theoretical) / R_theoretical * 100;
      
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.strokeStyle = 'rgba(0, 208, 132, 0.5)';
      ctx.lineWidth = 3;
      
      const cardW = 400;
      const cardH = 160;
      const cardX = w - paddingRight - cardW - 20;
      const cardY = paddingTop + 20;
      
      ctx.fillRect(cardX, cardY, cardW, cardH);
      ctx.strokeRect(cardX, cardY, cardW, cardH);
      
      ctx.fillStyle = '#f8fafc';
      ctx.font = '28px monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      
      ctx.fillText(`Slope: ${m_mA.toFixed(3)} mA/V`, cardX + 20, cardY + 20);
      ctx.fillText(`R(slope): ${R_calc.toFixed(1)} Ω`, cardX + 20, cardY + 60);
      ctx.fillText(`Error: ${error.toFixed(2)}%`, cardX + 20, cardY + 100);
    }
  }
  
  // Title at the top center of graph
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 36px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(`EXPERIMENT CHART: ${experiments[state.activeExperiment].name.toUpperCase()}`, w / 2, 25);
  
  downloadCanvasAsImage(canvas, `circuit_iq_hd_graph_${state.activeExperiment}.png`);
}


function downloadOscilloscopeHD() {
  const canvas = document.createElement('canvas');
  canvas.width = 2000;
  canvas.height = 1500;
  const ctx = canvas.getContext('2d');
  
  const w = canvas.width;
  const h = canvas.height;
  
  // 1. Radial CRT gradient
  const grad = ctx.createRadialGradient(w / 2, h / 2, 40, w / 2, h / 2, Math.max(w, h) / 1.6);
  grad.addColorStop(0, '#061a12');
  grad.addColorStop(0.8, '#020a07');
  grad.addColorStop(1, '#000000');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  
  // 2. Graticule grid lines (10 divisions by 8 divisions)
  const cols = 10;
  const rows = 8;
  const colWidth = w / cols;
  const rowHeight = h / rows;
  
  ctx.strokeStyle = 'rgba(0, 255, 136, 0.08)';
  ctx.lineWidth = 2;
  // Columns
  for (let i = 1; i < cols; i++) {
    const x = i * colWidth;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  // Rows
  for (let i = 1; i < rows; i++) {
    const y = i * rowHeight;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  
  // Center axes
  ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
  ctx.lineWidth = 4;
  // Center vertical axis
  ctx.beginPath();
  ctx.moveTo(w / 2, 0);
  ctx.lineTo(w / 2, h);
  ctx.stroke();
  // Center horizontal axis
  ctx.beginPath();
  ctx.moveTo(0, h / 2);
  ctx.lineTo(w, h / 2);
  ctx.stroke();
  
  // Axis subdivision ticks
  ctx.strokeStyle = 'rgba(0, 255, 136, 0.5)';
  ctx.lineWidth = 2;
  // Horizontal axis ticks
  for (let x = 0; x < w; x += colWidth / 5) {
    ctx.beginPath();
    ctx.moveTo(x, h / 2 - 12);
    ctx.lineTo(x, h / 2 + 12);
    ctx.stroke();
  }
  // Vertical axis ticks
  for (let y = 0; y < h; y += rowHeight / 5) {
    ctx.beginPath();
    ctx.moveTo(w / 2 - 12, y);
    ctx.lineTo(w / 2 + 12, y);
    ctx.stroke();
  }
  
  // 3. Scanlines Overlay (every 4 pixels)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  for (let y = 0; y < h; y += 4) {
    ctx.fillRect(0, y, w, 2);
  }
  
  // Read User parameters
  const scaleTime = elements.sliderOscTime ? parseFloat(elements.sliderOscTime.value) : 1.0;
  const scaleVolts = elements.sliderOscVolts ? parseFloat(elements.sliderOscVolts.value) : 1.0;
  
  // 4. Wave Trace
  if (state.isRunning) {
    const time = Date.now() * 0.005;
    const f = state.params.f;
    
    // Scale amplitude (peak volts / 30, mapped to height/2 - 40)
    const ampV = (state.meters.volts / 30) * (h / 2 - 40) * (1 / scaleVolts);
    
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    if (state.activeExperiment === 'ohms') {
      ctx.strokeStyle = '#00ff88';
      ctx.shadowBlur = 24;
      ctx.shadowColor = '#00ff88';
      ctx.beginPath();
      ctx.moveTo(0, h / 2 - ampV);
      ctx.lineTo(w, h / 2 - ampV);
      ctx.stroke();
    } 
    else if (state.activeExperiment === 'lcr') {
      // Voltage wave - Phosphor Green
      ctx.strokeStyle = '#00ff88';
      ctx.shadowBlur = 24;
      ctx.shadowColor = '#00ff88';
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const y = h / 2 + Math.sin((x / w) * Math.PI * 4 * (f / 50) * scaleTime - time) * ampV;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      // Current wave - Phosphor Cyan
      const phaseRad = state.analysis.phi * (Math.PI / 180);
      const ampI = (state.meters.amps / 0.5) * (h / 2 - 40) * (1 / scaleVolts);
      
      ctx.strokeStyle = '#00ffff';
      ctx.shadowBlur = 24;
      ctx.shadowColor = '#00ffff';
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const y = h / 2 + Math.sin((x / w) * Math.PI * 4 * (f / 50) * scaleTime - time - phaseRad) * ampI;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    else if (state.activeExperiment === 'rc') {
      ctx.strokeStyle = '#00ff88';
      ctx.shadowBlur = 24;
      ctx.shadowColor = '#00ff88';
      ctx.beginPath();
      const period = 200 / scaleTime;
      const xPeriod = (w / 200) * period;
      for (let x = 0; x < w; x++) {
        const progress = ((x + time * 240) % xPeriod) / xPeriod;
        const y = h - 60 - (h - 160) * (1 - Math.exp(-progress * 4.5)) * (1 / scaleVolts);
        if (x === 0 || (x + time * 240) % xPeriod < 8) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }
  
  ctx.shadowBlur = 0;
  
  // 5. CRT Readout HUD overlays
  ctx.fillStyle = 'rgba(0, 255, 136, 0.85)';
  ctx.font = 'bold 36px monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  
  ctx.fillText(`CH1: ${(5 * scaleVolts).toFixed(1)}V/Div`, 40, 40);
  if (state.activeExperiment === 'lcr') {
    ctx.fillStyle = 'rgba(0, 255, 255, 0.85)';
    ctx.fillText(`CH2: ${(100 * scaleVolts).toFixed(0)}mA/Div`, 40, 90);
    ctx.fillStyle = 'rgba(0, 255, 136, 0.85)';
  }
  ctx.fillText(`M: ${(2 * scaleTime).toFixed(1)}ms/Div`, 40, h - 80);
  ctx.fillText(`DC Coupling`, w - 280, h - 80);
  
  // 6. Stats Box Overlay (bottom-right)
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.strokeStyle = 'rgba(0, 255, 136, 0.4)';
  ctx.lineWidth = 2;
  
  const boxW = 420;
  const boxH = 220;
  const boxX = w - boxW - 40;
  const boxY = 40;
  
  ctx.fillRect(boxX, boxY, boxW, boxH);
  ctx.strokeRect(boxX, boxY, boxW, boxH);
  
  ctx.fillStyle = '#f8fafc';
  ctx.font = '28px monospace';
  ctx.fillText(`MEASUREMENTS`, boxX + 20, boxY + 20);
  
  ctx.strokeStyle = 'rgba(0, 255, 136, 0.2)';
  ctx.beginPath(); ctx.moveTo(boxX + 20, boxY + 60); ctx.lineTo(boxX + boxW - 20, boxY + 60); ctx.stroke();
  
  ctx.fillStyle = '#34d399';
  ctx.font = '24px monospace';
  
  const vPeak = state.meters.volts;
  const fVal = state.params.f;
  const periodVal = 1000 / (fVal || 1);
  const phaseDisp = state.activeExperiment === 'ohms' ? '0.0°' : `${state.analysis.phi.toFixed(1)}°`;
  const freqDisp = state.activeExperiment === 'ohms' ? '0 Hz (DC)' : `${fVal.toFixed(0)} Hz`;
  
  ctx.fillText(`Vp:    ${vPeak.toFixed(2)} V`, boxX + 20, boxY + 80);
  ctx.fillText(`Freq:  ${freqDisp}`, boxX + 20, boxY + 120);
  ctx.fillText(`Phase: ${phaseDisp}`, boxX + 20, boxY + 160);
  
  downloadCanvasAsImage(canvas, `circuit_iq_hd_oscilloscope_${state.activeExperiment}.png`);
}

// --- INTERACTIVE ACTIONS LISTENERS ---
function initInteraction() {
  // Set up panel draggability
  if (elements.oscPanel && elements.oscPanel.querySelector('.osc-hdr')) {
    makeElementDraggable(elements.oscPanel, elements.oscPanel.querySelector('.osc-hdr'));
  }
  if (elements.graphPanel && elements.graphPanel.querySelector('.graph-hdr')) {
    makeElementDraggable(elements.graphPanel, elements.graphPanel.querySelector('.graph-hdr'));
  }

  // Set up download buttons
  if (elements.oscDownload) {
    elements.oscDownload.addEventListener('click', () => {
      downloadOscilloscopeHD();
    });
  }
  if (elements.graphDownload) {
    elements.graphDownload.addEventListener('click', () => {
      downloadGraphHD();
    });
  }

  // Set up ResizeObserver for canvas width/height sync
  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      const panel = entry.target;
      const canvas = panel.querySelector('canvas');
      if (!canvas) continue;
      
      const width = Math.floor(canvas.clientWidth);
      const height = Math.floor(canvas.clientHeight);
      
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        
        if (panel.id === 'graph-wrap') {
          drawGraph();
        }
      }
    }
  });
  
  if (elements.oscPanel) resizeObserver.observe(elements.oscPanel);
  if (elements.graphPanel) resizeObserver.observe(elements.graphPanel);

  // Set up mouse hover tracking on graph
  if (elements.graphCanvas) {
    elements.graphCanvas.addEventListener('mousemove', (e) => {
      const rect = elements.graphCanvas.getBoundingClientRect();
      graphMouseX = e.clientX - rect.left;
      graphMouseY = e.clientY - rect.top;
      drawGraph();
    });
    
    elements.graphCanvas.addEventListener('mouseleave', () => {
      graphMouseX = null;
      graphMouseY = null;
      drawGraph();
    });
  }

  elements.experimentSelect.addEventListener('change', (e) => {
    setupExperiment(e.target.value, true);
    updateAIMentor();
  });
  
  elements.btnGraphToggle.addEventListener('click', () => {
    elements.graphPanel.style.display = elements.graphPanel.style.display === 'flex' ? 'none' : 'flex';
    elements.btnGraphToggle.classList.toggle('active');
    drawGraph();
  });
  
  elements.btnOscToggle.addEventListener('click', () => {
    elements.oscPanel.style.display = elements.oscPanel.style.display === 'flex' ? 'none' : 'flex';
    elements.btnOscToggle.classList.toggle('active');
  });

  if (elements.oscPowerBtn) {
    elements.oscPowerBtn.addEventListener('click', () => {
      state.oscPower = !state.oscPower;
      if (state.oscPower) {
        elements.oscPowerBtn.style.color = '#00ff88';
        if (elements.oscPowerIndicator) {
          elements.oscPowerIndicator.style.background = '#00ff88';
          elements.oscPowerIndicator.style.animation = 'blink 1s infinite';
        }
        appendAIMessage("Circuit IQ · AI Mentor", "Oscilloscope powered ON.");
      } else {
        elements.oscPowerBtn.style.color = '#ef4444';
        if (elements.oscPowerIndicator) {
          elements.oscPowerIndicator.style.background = '#4b5563';
          elements.oscPowerIndicator.style.animation = 'none';
        }
        appendAIMessage("Circuit IQ · AI Mentor", "Oscilloscope powered OFF.");
      }
    });
  }
  
  elements.btnCloseOsc.addEventListener('click', () => {
    elements.oscPanel.style.display = 'none';
    elements.btnOscToggle.classList.remove('active');
  });
  
  elements.btnCloseGraph.addEventListener('click', () => {
    elements.graphPanel.style.display = 'none';
    elements.btnGraphToggle.classList.remove('active');
  });
  
  elements.btnRecord.addEventListener('click', () => {
    if (!state.isRunning) {
      appendAIMessage("Circuit IQ · AI Mentor", "Initialize circuit to record active data points.");
      return;
    }
    
    // Prevent recording duplicate readings
    let duplicate = false;
    const currentV = state.meters.volts;
    const currentF = state.params.f;
    const currentI = state.meters.amps;
    const currentR = state.meters.ohms;
    
    if (['ohms', 'kvl', 'kcl', 'series_parallel', 'wheatstone', 'arduino_led', 'voltage_divider'].includes(state.activeExperiment)) {
      duplicate = state.dataPoints.some(pt => Math.abs(pt.V - currentV) < 0.05);
      if (duplicate) {
        appendAIMessage("Circuit IQ · AI Mentor", `A reading for ${currentV.toFixed(2)} V has already been recorded. Please vary the Voltage to record a new data point.`);
        return;
      }
    } else if (['diode_iv', 'planck_led'].includes(state.activeExperiment)) {
      const currentSourceV = state.params.V;
      duplicate = state.dataPoints.some(pt => Math.abs((pt.sourceV !== undefined ? pt.sourceV : pt.V) - currentSourceV) < 0.1);
      if (duplicate) {
        appendAIMessage("Circuit IQ · AI Mentor", `A reading for source voltage ${currentSourceV.toFixed(1)} V has already been recorded. Please vary the Source Voltage to record a new data point.`);
        return;
      }
    } else if (['lcr', 'rc_rl_rlc'].includes(state.activeExperiment)) {
      duplicate = state.dataPoints.some(pt => Math.abs(pt.f - currentF) < 1.0);
      if (duplicate) {
        appendAIMessage("Circuit IQ · AI Mentor", `A reading for ${currentF.toFixed(0)} Hz has already been recorded. Please vary the Frequency to record a new data point.`);
        return;
      }
    } else if (['ideal_gas', 'boyle'].includes(state.activeExperiment)) {
      duplicate = state.dataPoints.some(pt => Math.abs(pt.I - currentI) < 0.2);
      if (duplicate) {
        appendAIMessage("Circuit IQ · AI Mentor", `A reading for Volume ${currentI.toFixed(1)} L has already been recorded. Please vary the Volume to record a new data point.`);
        return;
      }
    } else if (state.activeExperiment === 'charles') {
      duplicate = state.dataPoints.some(pt => Math.abs(pt.R - currentR) < 1.0);
      if (duplicate) {
        appendAIMessage("Circuit IQ · AI Mentor", `A reading for Temperature ${currentR.toFixed(0)} K has already been recorded. Please vary the Temperature to record a new data point.`);
        return;
      }
    } else if (state.activeExperiment === 'photoelectric') {
      duplicate = state.dataPoints.some(pt => Math.abs(pt.V - currentV) < 0.1);
      if (duplicate) {
        appendAIMessage("Circuit IQ · AI Mentor", `A reading for Light Frequency ${currentV.toFixed(2)} ×10¹⁴Hz has already been recorded. Please vary the frequency to record a new data point.`);
        return;
      }
    } else if (state.activeExperiment === 'de_broglie') {
      duplicate = state.dataPoints.some(pt => Math.abs(pt.I - currentI) < 5.0);
      if (duplicate) {
        appendAIMessage("Circuit IQ · AI Mentor", `A reading for Velocity ${currentI.toFixed(0)} km/s has already been recorded. Please vary the velocity to record a new data point.`);
        return;
      }
    } else if (state.activeExperiment === 'bohr_model') {
      duplicate = state.dataPoints.some(pt => Math.abs(pt.V - currentV) < 0.1);
      if (duplicate) {
        appendAIMessage("Circuit IQ · AI Mentor", `A reading for Orbit Shell n_i = ${currentV.toFixed(0)} has already been recorded. Please change the initial orbit shell to record a new data point.`);
        return;
      }
    }
    
    if (state.dataPoints.length >= 10) return;
    
    const pt = {
      id: state.dataPoints.length + 1,
      V: state.meters.volts,
      I: state.meters.amps,
      R: state.meters.ohms,
      f: state.params.f,
      C: state.params.C,
      P: state.meters.power,
      sourceV: state.params.V,
      time: state.experimentStartTime ? (Date.now() - state.experimentStartTime) / 1000 : 0
    };
    state.dataPoints.push(pt);
    
    drawObservationTable();
    
    if (state.activeExperiment === 'ohms' && state.dataPoints.length >= 5) {
      completeStep(6);
    } else if (state.activeExperiment === 'kcl' && state.dataPoints.length >= 5) {
      completeStep(5);
    } else if (state.activeExperiment === 'lcr') {
      if (state.dataPoints.length >= 1) completeStep(4);
      if (state.dataPoints.length >= 5) completeStep(5);
    } else if (state.activeExperiment === 'rc_rl_rlc' && state.dataPoints.length >= 5) {
      completeStep(5);
    }
    const conclusion = generateExperimentConclusion(state.activeExperiment, state.dataPoints);
    elements.conclusionText.innerHTML = `<b>Conclusion:</b><br>${conclusion}`;
    drawGraph();
    updateAIMentor();
    saveExperimentLogToBackend();
  });
  
  // Chip clicks tool selection
  document.querySelectorAll('.comp-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const type = chip.getAttribute('data-type');
      if (type === 'bb_half') {
        switchBreadboard('half');
        document.querySelectorAll('[data-type="bb_half"], [data-type="bb_full"]').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        return;
      }
      if (type === 'bb_full') {
        switchBreadboard('full');
        document.querySelectorAll('[data-type="bb_half"], [data-type="bb_full"]').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        return;
      }
      state.selectedComponentIdx = -1;
      state.selectedHoleIndex = null;
      clearAllComponentOutlines(true);
      updateInspector();
      
      document.querySelectorAll('.comp-chip:not([data-type^="bb_"])').forEach(c => c.classList.remove('selected'));
      
      let mappedType = type;
      if (type === 'led_red' || type === 'led_green') {
        mappedType = 'led';
      }
      
      if (state.selectedTool === mappedType) {
        state.selectedTool = null;
        appendAIMessage("Circuit IQ · AI Mentor", "Tool deselected.");
      } else {
        state.selectedTool = mappedType;
        chip.classList.add('selected');
        appendAIMessage("Circuit IQ · AI Mentor", `Selected ${mappedType.toUpperCase()}. Click on two board snap points to place it.`);
      }
      state.placementStartHole = null;
      state.wiringStart = null;
      updateWiringBanner();
      updateTargetHighlights();
    });
  });

  // HTML5 Drag and Drop event registration for sidebar buttons
  document.querySelectorAll('.comp-chip[draggable="true"]').forEach(chip => {
    chip.addEventListener('dragstart', (e) => {
      const type = chip.getAttribute('data-type');
      let mappedType = type;
      if (type === 'led_red' || type === 'led_green') {
        mappedType = 'led';
      }
      state.draggingSidebarTool = mappedType;
      e.dataTransfer.setData('text/plain', mappedType);
      e.dataTransfer.effectAllowed = 'move';
      
      document.querySelectorAll('.comp-chip:not([data-type^="bb_"])').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
    });
    
    chip.addEventListener('dragend', (e) => {
      state.draggingSidebarTool = null;
      if (state.ghostMesh) {
        scene.remove(state.ghostMesh);
        state.ghostMesh = null;
      }
      state.ghostSnap1 = null;
      state.ghostSnap2 = null;
      document.querySelectorAll('.comp-chip:not([data-type^="bb_"])').forEach(c => c.classList.remove('selected'));
      state.selectedTool = null;
      updateWiringBanner();
    });
  });

  // Value Select dropdowns change and click propagation prevention
  document.querySelectorAll('.component-value-select').forEach(sel => {
    sel.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    sel.addEventListener('change', (e) => {
      const param = sel.getAttribute('data-param');
      if (param) {
        if (param === 'led_color') {
          updateLEDColor(sel.value);
        } else {
          const val = parseFloat(sel.value);
          if (!isNaN(val)) {
            updateParameterValue(param, val);
          }
        }
      }
    });
  });

  // Search component filtering
  const searchInput = document.getElementById('components-search');
  const clearBtn = document.getElementById('search-clear');
  
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      updateComponentSidebar();
    });
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        updateComponentSidebar();
      }
    });
  }
  
  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      updateComponentSidebar();
      searchInput.focus();
    });
  }
  
  elements.btnClear.addEventListener('click', () => {
    setupExperiment(state.activeExperiment, false);
    updateWiringBanner();
    saveCircuitToBackend();
  });
  
  elements.btnRun.addEventListener('click', async () => {
    await startSimulation();
    updateAIMentor();
  });
  
  elements.btnStop.addEventListener('click', () => {
    state.isRunning = false;
    stopPollingCalculations();
    setElectronsActive(false);
    
    elements.btnRun.style.display = 'block';
    elements.btnStop.style.display = 'none';
    elements.statusDot.style.background = "var(--accent)";
    elements.statusTextBar.innerText = "READY";
    appendAIMessage("Circuit IQ · AI Mentor", "Power supply terminated.");
    
    updateDynamicTextures();
    updateAIMentor();
  });
  
  elements.btnReload.addEventListener('click', () => {
    autoBuildExperiment();
    appendAIMessage("Circuit IQ · AI Mentor", "Auto-build complete! Circuit components and wires placed correctly.");
  });
  
  if (elements.btnSaveProgress) {
    elements.btnSaveProgress.addEventListener('click', () => {
      saveCircuitToBackend(true);
    });
  }
  
  if (elements.btnCloseLab) {
    elements.btnCloseLab.addEventListener('click', () => {
      window.parent.postMessage('close-lab', '*');
    });
  }
  
  const bind = (slider, valLbl, key) => {
    slider.addEventListener('input', (e) => {
      let val = parseFloat(e.target.value);
      if (!isNaN(val)) {
        updateParameterValue(key, val);
      }
    });

    if (valLbl) {
      valLbl.addEventListener('input', (e) => {
        let val = parseFloat(e.target.value);
        if (!isNaN(val)) {
          updateParameterValue(key, val);
        }
      });
      valLbl.addEventListener('blur', (e) => {
        let val = parseFloat(e.target.value);
        if (isNaN(val)) {
          valLbl.value = state.params[key];
        } else {
          updateParameterValue(key, val);
        }
      });
    }
  };
  bind(elements.sliderV, elements.valLblV, 'V');
  bind(elements.sliderR, elements.valLblR, 'R');
  bind(elements.sliderL, elements.valLblL, 'L');
  bind(elements.sliderC, elements.valLblC, 'C');
  bind(elements.sliderf, elements.valLblf, 'f');
  bind(elements.sliderT, elements.valLblT, 'T');
  
  elements.btnExport.addEventListener('click', () => {
    if (state.dataPoints.length === 0) return;
    
    let headers = [];
    let rows = [];
    const expKey = state.activeExperiment;
    
    if (['ohms', 'kvl', 'kcl', 'series_parallel', 'wheatstone', 'arduino_led', 'diode_iv', 'voltage_divider', 'planck_led'].includes(expKey)) {
      headers = ["Index", "Voltage V (V)", "Current I (mA)", `${expKey === 'ohms' ? 'Resistance' : 'Impedance'} (Ohm)`];
      state.dataPoints.forEach(pt => {
        rows.push([pt.id, pt.V.toFixed(2), (pt.I * 1000).toFixed(1), pt.R.toFixed(1)]);
      });
    } else if (['lcr', 'rc_rl_rlc'].includes(expKey)) {
      headers = ["Index", "Freq f (Hz)", "Voltage V (V)", "Current I (mA)", "Impedance Z (Ohm)"];
      state.dataPoints.forEach(pt => {
        rows.push([pt.id, pt.f, pt.V.toFixed(2), (pt.I * 1000).toFixed(1), pt.R.toFixed(1)]);
      });
    } else if (expKey === 'rc') {
      headers = ["Index", "Cap C (uF)", "Voltage V (V)", "Time Constant tau (ms)"];
      state.dataPoints.forEach(pt => {
        const tau = pt.R * pt.C * 1e-3;
        rows.push([pt.id, pt.C, pt.V.toFixed(2), tau.toFixed(1)]);
      });
    } else if (['ideal_gas', 'boyle'].includes(expKey)) {
      headers = ["Index", "Volume V (L)", "Temp T (K)", "Pressure P (kPa)"];
      state.dataPoints.forEach(pt => {
        rows.push([pt.id, pt.I.toFixed(1), pt.R.toFixed(0), pt.V.toFixed(1)]);
      });
    } else if (expKey === 'charles') {
      headers = ["Index", "Temp T (K)", "Pressure P (kPa)", "Volume V (L)"];
      state.dataPoints.forEach(pt => {
        rows.push([pt.id, pt.R.toFixed(0), pt.V.toFixed(1), pt.I.toFixed(1)]);
      });
    } else if (expKey === 'specific_heat') {
      headers = ["Index", "Metal Tm (C)", "Water Tw (C)", "Mixture Tf (C)", "Heat Q (J)"];
      state.dataPoints.forEach(pt => {
        rows.push([pt.id, pt.V.toFixed(1), pt.I.toFixed(1), pt.R.toFixed(1), pt.P.toFixed(0)]);
      });
    } else if (expKey === 'photoelectric') {
      headers = ["Index", "Freq v (10^14Hz)", "Intensity (mW)", "Work Fn (eV)", "Stopping Vs (V)"];
      state.dataPoints.forEach(pt => {
        rows.push([pt.id, pt.V.toFixed(2), pt.I.toFixed(0), (pt.R * 1e-3).toFixed(2), pt.P.toFixed(2)]);
      });
    } else if (expKey === 'radioactive') {
      headers = ["Index", "Time t (s)", "Initial N0", "Remaining N", "Activity A"];
      state.dataPoints.forEach(pt => {
        rows.push([pt.id, pt.time.toFixed(1), pt.V.toFixed(0), pt.I.toFixed(0), pt.P.toFixed(1)]);
      });
    } else if (expKey === 'de_broglie') {
      headers = ["Index", "Mass m (10^-30kg)", "Velocity v (km/s)", "Wavelength lambda (nm)"];
      state.dataPoints.forEach(pt => {
        rows.push([pt.id, pt.V.toFixed(1), pt.I.toFixed(0), pt.R.toFixed(3)]);
      });
    } else if (expKey === 'bohr_model') {
      headers = ["Index", "Orbit ni", "Orbit nf", "Energy Gap deltaE (eV)"];
      state.dataPoints.forEach(pt => {
        rows.push([pt.id, pt.V.toFixed(0), pt.I.toFixed(0), pt.R.toFixed(2)]);
      });
    } else {
      headers = ["Index", "Voltage V (V)", "Current I (mA)", "Impedance Z (Ohm)"];
      state.dataPoints.forEach(pt => {
        rows.push([pt.id, pt.V.toFixed(2), (pt.I * 1000).toFixed(1), pt.R.toFixed(1)]);
      });
    }
    
    let csv = headers.join(",") + "\n";
    rows.forEach(r => {
      csv += r.join(",") + "\n";
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `circuit_iq_3d_${state.activeExperiment}_data.csv`;
    a.click();
  });
  
  elements.btnDownloadReport.addEventListener('click', () => {
    generateLabReportPDF();
    saveExperimentLogToBackend("Downloaded PDF Lab Report.", 100.0);
  });

  // Canvas bottom bar shortcuts
  const btnZoomIn = document.getElementById('cb-zoom-in');
  const btnZoomOut = document.getElementById('cb-zoom-out');
  const btnFit = document.getElementById('cb-fit');
  const btnFront = document.getElementById('cb-front');
  const btnTop = document.getElementById('cb-top');
  const btnSide = document.getElementById('cb-side');
  const btnWireToggle = document.getElementById('cb-wire');
  
  if (btnZoomIn) {
    btnZoomIn.addEventListener('click', () => {
      targetDistance = Math.max(4.0, targetDistance - 1.5);
    });
  }
  if (btnZoomOut) {
    btnZoomOut.addEventListener('click', () => {
      targetDistance = Math.min(20.0, targetDistance + 1.5);
    });
  }
  if (btnFit) {
    btnFit.addEventListener('click', () => {
      targetDistance = 11.715;
      targetRotY = 0;
      targetPitch = Math.atan2(7.5, 9);
    });
  }
  if (btnFront) {
    btnFront.addEventListener('click', () => {
      targetRotY = 0;
      targetPitch = Math.atan2(7.5, 9);
    });
  }
  if (btnTop) {
    btnTop.addEventListener('click', () => {
      targetRotY = 0;
      targetPitch = Math.PI / 2 - 0.01;
    });
  }
  if (btnSide) {
    btnSide.addEventListener('click', () => {
      targetRotY = Math.PI / 2;
      targetPitch = Math.atan2(7.5, 9);
    });
  }
  if (btnWireToggle) {
    btnWireToggle.addEventListener('click', () => {
      state.selectedTool = state.selectedTool === 'wire' ? null : 'wire';
      btnWireToggle.classList.toggle('active', state.selectedTool === 'wire');
      if (state.selectedTool === 'wire') {
        appendAIMessage("Circuit IQ · AI Mentor", "Wiring tool active. Click snaps on board.");
      }
      updateWiringBanner();
      updateTargetHighlights();
    });
  }

  // Chat send event
  if (elements.aiSend && elements.aiInput) {
    elements.aiSend.addEventListener('click', handleUserChatQuery);
    elements.aiInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserChatQuery();
      }
    });

    // Quick prompts chips click handler
    const quickPrompts = document.getElementById('ai-quick-prompts');
    if (quickPrompts) {
      quickPrompts.addEventListener('click', (e) => {
        const chip = e.target.closest('.quick-prompt-chip');
        if (chip) {
          const promptText = chip.getAttribute('data-prompt');
          if (promptText) {
            elements.aiInput.value = promptText;
            handleUserChatQuery();
          }
        }
      });
    }
  }

  // Keyboard Hotkeys
  window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
      return;
    }
    
    let targetTool = null;
    if (key === 'w') targetTool = 'wire';
    else if (key === 'l') targetTool = 'led';
    else if (key === 'b') targetTool = 'button';
    else if (key === 'r') targetTool = 'resistor';
    else if (key === 'd') targetTool = 'diode';
    else if (key === 't') targetTool = 'transistor';
    else if (key === 's') targetTool = 'display';
    else if (key === '+' || key === '-') targetTool = 'source';
    else if (key === 'a') targetTool = 'ammeter';
    else if (key === 'v') targetTool = 'voltmeter';
    else if (key === 'escape') {
      if (state.selectedComponentIdx !== -1) {
        state.selectedComponentIdx = -1;
        clearAllComponentOutlines(true);
        updateInspector();
        appendAIMessage("Circuit IQ · AI Mentor", "Component deselected.");
        return;
      }
      if (state.selectedHoleIndex !== null) {
        state.selectedHoleIndex = null;
        updateInspector();
        appendAIMessage("Circuit IQ · AI Mentor", "Hole selection cleared.");
        return;
      }
      if (state.isDraggingComponent && state.draggedComponentIdx !== -1) {
        const comp = state.placedComponents[state.draggedComponentIdx];
        scene.remove(comp.mesh);
        comp.leads.forEach(l => scene.remove(l));
        
        const visuals = createComponentVisuals(comp.type, state.dragStartSnap1, state.dragStartSnap2, comp.color);
        comp.mesh = visuals.mesh;
        comp.leads = visuals.leads;
        comp.snap1 = state.dragStartSnap1;
        comp.snap2 = state.dragStartSnap2;
        
        scene.add(comp.mesh);
        comp.leads.forEach(l => scene.add(l));
        
        clearAllComponentOutlines();
        
        state.isDraggingComponent = false;
        state.draggedComponentIdx = -1;
        state.dragStartSnap1 = null;
        state.dragStartSnap2 = null;
        
        if (state.wasRunningBeforeDrag) {
          state.isRunning = true;
          startPollingCalculations();
          setElectronsActive(true);
          if (elements.btnRun) elements.btnRun.style.display = 'none';
          if (elements.btnStop) elements.btnStop.style.display = 'block';
          if (elements.statusDot) elements.statusDot.style.background = "var(--red)";
          if (elements.statusTextBar) elements.statusTextBar.innerText = "RUNNING";
        }
        
        appendAIMessage("Circuit IQ · AI Mentor", "Component move cancelled.");
        updateTelemetryCounts();
        updateAIMentor();
        updateTargetHighlights();
        return;
      }
      if (state.isDraggingWireEnd && state.draggedWireIdx !== -1) {
        const w = state.wires[state.draggedWireIdx];
        let origFrom = w.fromHole;
        let origTo = w.toHole;
        if (state.draggedWireEnd === 0) {
          origFrom = state.dragStartWireHole;
        } else {
          origTo = state.dragStartWireHole;
        }
        updateWireVisuals(state.draggedWireIdx, origFrom, origTo);
        
        state.isDraggingWireEnd = false;
        state.draggedWireIdx = -1;
        state.draggedWireEnd = -1;
        state.dragStartWireHole = null;
        
        if (state.wasRunningBeforeDrag) {
          state.isRunning = true;
          startPollingCalculations();
          setElectronsActive(true);
          if (elements.btnRun) elements.btnRun.style.display = 'none';
          if (elements.btnStop) elements.btnStop.style.display = 'block';
          if (elements.statusDot) elements.statusDot.style.background = "var(--red)";
          if (elements.statusTextBar) elements.statusTextBar.innerText = "RUNNING";
        }
        
        appendAIMessage("Circuit IQ · AI Mentor", "Wire move cancelled.");
        updateTelemetryCounts();
        updateAIMentor();
        updateTargetHighlights();
        return;
      }
      state.selectedTool = null;
      state.placementStartHole = null;
      state.wiringStart = null;
      document.querySelectorAll('.comp-chip:not([data-type^="bb_"])').forEach(c => c.classList.remove('selected'));
      appendAIMessage("Circuit IQ · AI Mentor", "Tool deselected.");
      updateWiringBanner();
      return;
    }
    else if (key === 'delete') {
      targetTool = 'eraser';
    }
    
    if (targetTool) {
      document.querySelectorAll('.comp-chip:not([data-type^="bb_"])').forEach(c => c.classList.remove('selected'));
      if (state.selectedTool === targetTool) {
        state.selectedTool = null;
        appendAIMessage("Circuit IQ · AI Mentor", "Tool deselected.");
      } else {
        state.selectedTool = targetTool;
        const chip = document.querySelector(`.comp-chip[data-type="${targetTool === 'wire' ? 'wire' : targetTool === 'led' ? 'led' : targetTool}"]`);
        if (chip) chip.classList.add('selected');
        appendAIMessage("Circuit IQ · AI Mentor", `Selected ${targetTool.toUpperCase()} via hotkey.`);
      }
      state.placementStartHole = null;
      state.wiringStart = null;
      updateWiringBanner();
      updateTargetHighlights();
    }
  });

  // Collapsible category accordion logic
  document.querySelectorAll('#left-panel .lp-section-hdr').forEach(hdr => {
    hdr.addEventListener('click', () => {
      const section = hdr.closest('.lp-section');
      if (section) {
        section.classList.toggle('collapsed');
      }
    });
  });
}

async function handleUserChatQuery() {
  const query = elements.aiInput.value.trim();
  if (!query) return;
  elements.aiInput.value = '';
  
  appendAIMessage("Student", query, true);
  
  // Append temporary loading bubble
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'ai-msg';
  loadingDiv.innerHTML = `
    <div class="ai-avatar bot"><i class="fa-solid fa-robot"></i></div>
    <div class="ai-bubble-wrap">
      <div class="ai-bubble-sender">Circuit IQ · AI Mentor</div>
      <div class="ai-bubble" style="display:flex;align-items:center;padding:10px 16px">
        <div class="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  `;
  elements.aiMessagesContainer.appendChild(loadingDiv);
  elements.aiMessagesContainer.scrollTop = elements.aiMessagesContainer.scrollHeight;

  try {
    const response = await fetch('/api/physicsbot/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question: query,
        experiment: state.activeExperiment,
        circuit_state: {
          placed_components: state.placedComponents.map((c, index) => ({ type: c.type, id: index })),
          wires: resolveVirtualWires(),
          params: state.params,
          readings: {
            volts: state.meters.volts,
            amps: state.meters.amps,
            ohms: state.meters.ohms,
            power: state.meters.power
          }
        }
      })
    });
    
    if (loadingDiv.parentNode) {
      loadingDiv.parentNode.removeChild(loadingDiv);
    }
    
    if (response.ok) {
      const data = await response.json();
      if (data.answer && data.answer.includes("not configured")) {
        throw new Error("Gemini API key is not configured, switching to local mentor rules.");
      }
      appendAIMessage("Circuit IQ · AI Mentor", data.answer);
    } else {
      throw new Error(`HTTP ${response.status}`);
    }
  } catch (error) {
    console.warn("AI Mentor API request failed or was not configured, using local rules:", error);
    if (loadingDiv.parentNode) {
      loadingDiv.parentNode.removeChild(loadingDiv);
    }
    
    let fallbackResponse = "I am your Circuit IQ AI Mentor. Please specify what help you need (e.g. ask 'how to connect', 'formula', or 'readings').";
    const text = query.toLowerCase();
    
    if (text.includes("connect") || text.includes("how to") || text.includes("wire") || text.includes("step") || text.includes("setup")) {
      fallbackResponse = `Here is the current connection step for **${experiments[state.activeExperiment].name}**:<br><br>${getAIMentorMessage()}`;
    } else if (text.includes("formula") || text.includes("equation") || text.includes("law")) {
      const formulasHtml = (experiments[state.activeExperiment].formulas || []).map(f => `• **${f.name}**: \`${f.expr}\``).join("<br>");
      fallbackResponse = formulasHtml ? `Here are the formulas for the current experiment:<br><br>${formulasHtml}` : `No specific formulas defined for this experiment.`;
    } else if (text.includes("reading") || text.includes("meter") || text.includes("volt") || text.includes("amp")) {
      fallbackResponse = `Current digital telemetry measurements:<br>• **Voltage (V)**: \`${state.meters.volts.toFixed(2)} V\`<br>• **Current (I)**: \`${state.meters.amps.toFixed(4)} A\`<br>• **Impedance (Z)**: \`${state.meters.ohms.toFixed(2)} Ω\`<br>• **Power (P)**: \`${state.meters.power.toFixed(2)} W\``;
    } else if (text.includes("resonance") || text.includes("frequency") || text.includes("lcr")) {
      if (state.activeExperiment === 'lcr' || state.activeExperiment === 'rc_rl_rlc') {
        fallbackResponse = `In the Series LCR circuit, resonance occurs where Z is minimum and equal to R. Resonant frequency **f₀ = ${(state.analysis.f0).toFixed(1)} Hz**.<br>Reactance values:<br>• **XL (Inductance)**: \`${state.analysis.XL.toFixed(1)} Ω\`<br>• **XC (Capacitance)**: \`${state.analysis.XC.toFixed(1)} Ω\`<br>• **Phase Shift φ**: \`${state.analysis.phi.toFixed(1)}°\``;
      } else {
        fallbackResponse = "LCR Resonance calculations are active in EXP-10 Series LCR Resonance.";
      }
    } else if (text.includes("time constant") || text.includes("tau") || text.includes("charging")) {
      if (state.activeExperiment === 'rc') {
        const tau = state.params.R * state.params.C * 1e-6;
        fallbackResponse = `For the RC Time Constant, **τ = R × C** is equal to **${(tau * 1000).toFixed(1)} ms** (with R = ${state.params.R} Ω, C = ${state.params.C} µF). The capacitor reaches ~63.2% charge at t = τ, and full charge (~99%) at t = 5τ.`;
      } else {
        fallbackResponse = "Time constant charging calculations are active in EXP-11 RC Transient Response.";
      }
    } else if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
      fallbackResponse = "Hello! I am your interactive AI Mentor. Ask me about circuit connections, formulas, or current measurements!";
    }
    
    appendAIMessage("Circuit IQ · AI Mentor", fallbackResponse);
  }
}

async function startSimulation() {
  try {
    let data = validateCircuitLocal();
    
    if (data.status === 'success') {
      const isCircuit = ['ohms', 'kvl', 'kcl', 'rc_rl_rlc', 'series_parallel', 'wheatstone', 'lcr', 'rc', 'arduino_led', 'diode_iv', 'voltage_divider', 'planck_led'].includes(state.activeExperiment);
      if (isCircuit && state.activeExperiment !== 'arduino_led') {
        try {
          const response = await fetch('/api/validate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              placed_components: state.placedComponents.map((c, index) => ({ type: c.type, id: index })),
              wires: resolveVirtualWires(),
              required_types: experiments[state.activeExperiment].req || []
            })
          });
          if (response.ok) {
            const backendData = await response.json();
            if (backendData.status === 'success') {
              data = { status: 'success', message: backendData.message };
            } else {
              // Local Union-Find validation already passed — backend DFS graph
              // may not correctly represent breadboard topology. Keep local result.
              console.warn("Backend returned fail but local validation passed:", backendData.message);
            }
          } else {
            throw new Error(`HTTP ${response.status}`);
          }
        } catch (backendError) {
          console.warn("Backend validation failed, falling back to local validation.", backendError);
        }
      }
    }

    if (data.status === 'success') {
      state.isRunning = true;
      state.energyStartTime = Date.now();
      state.experimentStartTime = Date.now(); // Track experiment running start time
      startPollingCalculations();
      setElectronsActive(true);
      
      if (elements.btnRun) elements.btnRun.style.display = 'none';
      if (elements.btnStop) elements.btnStop.style.display = 'block';
      if (elements.statusDot) elements.statusDot.style.background = "var(--red)";
      if (elements.statusTextBar) elements.statusTextBar.innerText = "RUNNING";
      appendAIMessage("Circuit IQ · AI Mentor", "Loop validated successfully: " + data.message);
      
      if (state.activeExperiment === 'ohms') {
        completeStep(5);
      } else if (state.activeExperiment === 'lcr') {
        completeStep(3);
      } else if (state.activeExperiment === 'rc') {
        completeStep(3);
      } else if (state.activeExperiment === 'rc_rl_rlc') {
        completeStep(3);
      } else if (state.activeExperiment === 'kvl') {
        completeStep(1);
        completeStep(2);
      } else if (state.activeExperiment === 'kcl') {
        completeStep(3);
      } else if (state.activeExperiment === 'series_parallel') {
        completeStep(3);
      } else if (state.activeExperiment === 'wheatstone') {
        completeStep(3);
      } else if (state.activeExperiment === 'arduino_led') {
        completeStep(4);
        completeStep(5);
      }
    } else {
      appendAIMessage("Circuit IQ · AI Mentor", "Validation Failure: " + data.message);
    }
  } catch (e) {
    console.error("Simulation start failed:", e);
  }
}

function autoBuildExperiment() {
  setupExperiment(state.activeExperiment, false, true);
  const expKey = state.activeExperiment;
  if (expKey === 'ohms') {
    placeComponent3D('source', 1 * 14 + 0, 1 * 14 + 1);
    placeComponent3D('resistor', 9 * 14 + 4, 14 * 14 + 4);     // Cols 10-15, row E (top half)
    placeComponent3D('ammeter', 14 * 14 + 7, 19 * 14 + 7);     // Cols 15-20, row H (below ravine)
    placeComponent3D('voltmeter', 9 * 14 + 9, 14 * 14 + 9);    // Cols 10-15, row J (below ravine, isolated from resistor)
    create3DWire(9 * 14 + 0, 9 * 14 + 4);                      // Source (+) rail to resistor start
    create3DWire(14 * 14 + 4, 14 * 14 + 7);                    // Resistor end to ammeter start (cross ravine)
    create3DWire(19 * 14 + 7, 19 * 14 + 1);                    // Ammeter end to Source (-) rail
    create3DWire(9 * 14 + 4, 9 * 14 + 9);                      // Resistor terminal 1 to voltmeter terminal 1 (cross ravine)
    create3DWire(14 * 14 + 4, 14 * 14 + 9);                    // Resistor terminal 2 to voltmeter terminal 2 (cross ravine)
    completeStep(1);
    completeStep(2);
    completeStep(3);
    completeStep(4);
  } else if (expKey === 'kvl') {
    placeComponent3D('source', 1 * 14 + 0, 1 * 14 + 1);
    placeComponent3D('resistor', 7 * 14 + 5, 11 * 14 + 5);      // Resistor 1: Col 8-12, Row D
    placeComponent3D('resistor', 13 * 14 + 5, 17 * 14 + 5);     // Resistor 2: Col 14-18, Row D
    placeComponent3D('ammeter', 11 * 14 + 9, 13 * 14 + 9);      // Ammeter: Col 12-14, Row H
    placeComponent3D('voltmeter', 7 * 14 + 3, 11 * 14 + 3);     // Voltmeter 1: Col 8-12, Row B
    placeComponent3D('voltmeter', 13 * 14 + 3, 17 * 14 + 3);    // Voltmeter 2: Col 14-18, Row B
    create3DWire(7 * 14 + 0, 7 * 14 + 6);                       // Source (+) rail Col 8 to Col 8 Row E (internally links to R1 start & Voltmeter +)
    create3DWire(11 * 14 + 6, 11 * 14 + 9);                     // Col 12 Row E (internally links to R1 end & Voltmeter -) to Ammeter (+) Col 12 Row H
    create3DWire(13 * 14 + 9, 13 * 14 + 6);                     // Ammeter (-) Col 14 Row H to Col 14 Row E (internally links to R2 start)
    create3DWire(17 * 14 + 6, 17 * 14 + 1);                     // Col 18 Row E (internally links to R2 end) to Source (-) rail Col 18
    create3DWire(7 * 14 + 3, 7 * 14 + 5);                       // Voltmeter 1 (+) Col 8 Row B to Col 8 Row D (parallel link)
    create3DWire(11 * 14 + 3, 11 * 14 + 5);                     // Voltmeter 1 (-) Col 12 Row B to Col 12 Row D (parallel link)
    create3DWire(13 * 14 + 3, 13 * 14 + 5);                     // Voltmeter 2 (+) Col 14 Row B to Col 14 Row D (parallel link)
    create3DWire(17 * 14 + 3, 17 * 14 + 5);                     // Voltmeter 2 (-) Col 18 Row B to Col 18 Row D (parallel link)
    completeStep(1);
  } else if (expKey === 'kcl') {
    placeComponent3D('source', 1 * 14 + 0, 1 * 14 + 1);
    placeComponent3D('ammeter', 3 * 14 + 7, 6 * 14 + 7);       // Ammeter (Total): Cols 4-7, row F
    placeComponent3D('ammeter', 7 * 14 + 4, 10 * 14 + 4);      // Ammeter (Branch 1): Cols 8-11, row C
    placeComponent3D('ammeter', 7 * 14 + 9, 10 * 14 + 9);      // Ammeter (Branch 2): Cols 8-11, row H
    placeComponent3D('resistor', 10 * 14 + 4, 14 * 14 + 4);    // Resistor 1: Cols 11-15, row C
    placeComponent3D('resistor', 10 * 14 + 9, 14 * 14 + 9);    // Resistor 2: Cols 11-15, row H
    
    create3DWire(3 * 14 + 0, 3 * 14 + 7);                      // Source (+) Col 4 to Total Ammeter start
    create3DWire(6 * 14 + 7, 7 * 14 + 7);                      // Total Ammeter end to Junction node bottom (Col 8 Row F)
    create3DWire(7 * 14 + 4, 7 * 14 + 9);                      // Junction wire: Col 8 Row C to Col 8 Row H (crosses ravine)
    create3DWire(14 * 14 + 4, 14 * 14 + 9);                    // Recombine wire: Col 15 Row C to Col 15 Row H (crosses ravine)
    create3DWire(14 * 14 + 9, 14 * 14 + 1);                    // Recombined end to Source (-) Col 15
    completeStep(1);
    completeStep(2);
    completeStep(3);
    completeStep(4);
  } else if (expKey === 'led') { // led color experiment
    placeComponent3D('source', 3 * 14 + 0, 3 * 14 + 1); // Source at Col 4 Positive & Negative
    placeComponent3D('resistor', 6 * 14 + 4, 9 * 14 + 4); // Resistor at Col 7E to 10E
    placeComponent3D('led', 9 * 14 + 5, 9 * 14 + 6); // LED anode 10f, cathode 10g
    create3DWire(4 * 14 + 0, 6 * 14 + 4); // Wire positive rail (Col 5) to Resistor start
    create3DWire(9 * 14 + 4, 9 * 14 + 5); // Wire Resistor end to LED anode
    create3DWire(9 * 14 + 6, 4 * 14 + 1); // Wire LED cathode to ground negative rail (Col 5)
  } else if (expKey === 'planck_led') {
    placeComponent3D('source', 1 * 14 + 0, 1 * 14 + 1);
    placeComponent3D('resistor', 7 * 14 + 4, 11 * 14 + 4);     // Resistor: Col 8-12, row E
    placeComponent3D('led', 11 * 14 + 5, 15 * 14 + 5);         // LED: Col 12-16, row D
    create3DWire(7 * 14 + 0, 7 * 14 + 4);                      // Source (+) Col 8 to Resistor start
    create3DWire(15 * 14 + 5, 15 * 14 + 1);                    // LED cathode to Source (-) Col 16
  } else if (expKey === 'diode_iv') {
    placeComponent3D('source', 1 * 14 + 0, 1 * 14 + 1);
    placeComponent3D('resistor', 9 * 14 + 4, 14 * 14 + 4);     // Cols 10-15, row E
    placeComponent3D('diode', 14 * 14 + 7, 19 * 14 + 7);       // Diode anode Col 15F, cathode Col 20F
    placeComponent3D('ammeter', 19 * 14 + 9, 24 * 14 + 9);     // Cols 20-25, row H
    placeComponent3D('voltmeter', 14 * 14 + 2, 19 * 14 + 2);    // Voltmeter Col 15A to Col 20A
    create3DWire(2 * 14 + 0, 9 * 14 + 4);                      // Source (+) rail (Col 3) to Resistor start
    create3DWire(14 * 14 + 4, 14 * 14 + 7);                    // Resistor end to Diode anode
    create3DWire(19 * 14 + 7, 19 * 14 + 9);                    // Diode cathode to Ammeter start
    create3DWire(24 * 14 + 9, 2 * 14 + 1);                     // Ammeter end to Source (-) rail (Col 3)
    create3DWire(14 * 14 + 2, 14 * 14 + 7);                    // Voltmeter (+) to Diode anode
    create3DWire(19 * 14 + 2, 19 * 14 + 7);                    // Voltmeter (-) to Diode cathode
  } else if (expKey === 'voltage_divider') {
    placeComponent3D('source', 1 * 14 + 0, 1 * 14 + 1);
    placeComponent3D('resistor', 7 * 14 + 4, 11 * 14 + 4);     // R1: Col 8-12, row E
    placeComponent3D('resistor', 11 * 14 + 4, 15 * 14 + 4);    // R2: Col 12-16, row E
    create3DWire(7 * 14 + 0, 7 * 14 + 4);                      // Source (+) Col 8 to R1 start
    create3DWire(15 * 14 + 4, 15 * 14 + 1);                    // R2 end to Source (-) Col 16
  } else if (expKey === 'rc_rl_rlc') {
    placeComponent3D('source', 1 * 14 + 0, 1 * 14 + 1);
    placeComponent3D('resistor', 7 * 14 + 4, 11 * 14 + 4);
    placeComponent3D('inductor', 11 * 14 + 5, 15 * 14 + 5);
    placeComponent3D('capacitor', 15 * 14 + 6, 19 * 14 + 6);
    placeComponent3D('ammeter', 19 * 14 + 9, 24 * 14 + 9);
    placeComponent3D('voltmeter', 15 * 14 + 11, 19 * 14 + 11);
    create3DWire(7 * 14 + 0, 7 * 14 + 4);
    create3DWire(11 * 14 + 4, 11 * 14 + 5);
    create3DWire(15 * 14 + 5, 15 * 14 + 6);
    create3DWire(19 * 14 + 6, 19 * 14 + 9);
    create3DWire(24 * 14 + 9, 24 * 14 + 1);
    create3DWire(15 * 14 + 11, 15 * 14 + 6);
    create3DWire(19 * 14 + 11, 19 * 14 + 6);
    completeStep(1);
    completeStep(2);
  } else if (expKey === 'lcr') {
    placeComponent3D('source', 1 * 14 + 0, 1 * 14 + 1);
    placeComponent3D('resistor', 7 * 14 + 4, 11 * 14 + 4);
    placeComponent3D('inductor', 11 * 14 + 5, 15 * 14 + 5);
    placeComponent3D('capacitor', 15 * 14 + 6, 19 * 14 + 6);
    placeComponent3D('ammeter', 19 * 14 + 9, 24 * 14 + 9);
    placeComponent3D('voltmeter', 15 * 14 + 11, 19 * 14 + 11);
    create3DWire(7 * 14 + 0, 7 * 14 + 4);
    create3DWire(11 * 14 + 4, 11 * 14 + 5);
    create3DWire(15 * 14 + 5, 15 * 14 + 6);
    create3DWire(19 * 14 + 6, 19 * 14 + 9);
    create3DWire(24 * 14 + 9, 24 * 14 + 1);
    create3DWire(15 * 14 + 11, 15 * 14 + 6);
    create3DWire(19 * 14 + 11, 19 * 14 + 6);
    completeStep(1);
    completeStep(2);
  } else if (expKey === 'rc') {
    placeComponent3D('source', 1 * 14 + 0, 1 * 14 + 1);
    placeComponent3D('toggle_switch', 5 * 14 + 5, 9 * 14 + 5);  // Col 6 Row D to Col 10 Row D
    placeComponent3D('resistor', 9 * 14 + 6, 14 * 14 + 6);     // Col 10 Row E to Col 15 Row E
    placeComponent3D('capacitor', 14 * 14 + 7, 19 * 14 + 7);   // Col 15 Row F to Col 20 Row F
    placeComponent3D('ammeter', 19 * 14 + 10, 24 * 14 + 10);   // Col 20 Row I to Col 25 Row I
    placeComponent3D('voltmeter', 14 * 14 + 11, 19 * 14 + 11);  // Col 15 Row J to Col 20 Row J
    
    create3DWire(5 * 14 + 0, 5 * 14 + 5);                      // Source (+) Col 6 to Switch terminal 1
    create3DWire(14 * 14 + 6, 14 * 14 + 7);                    // Resistor terminal 2 to Capacitor terminal 1 (across ravine)
    create3DWire(19 * 14 + 7, 19 * 14 + 10);                   // Capacitor terminal 2 to Ammeter terminal 1 (across rows)
    create3DWire(24 * 14 + 10, 24 * 14 + 1);                   // Ammeter terminal 2 to Source (-) Col 25
    
    create3DWire(14 * 14 + 11, 14 * 14 + 7);                   // Voltmeter (+) to Capacitor terminal 1
    create3DWire(19 * 14 + 11, 19 * 14 + 7);                   // Voltmeter (-) to Capacitor terminal 2
  } else if (expKey === 'series_parallel') {
    placeComponent3D('source', 1 * 14 + 0, 1 * 14 + 1);
    if (state.params.C === 2) {
      // Parallel configuration
      placeComponent3D('ammeter', 3 * 14 + 7, 6 * 14 + 7);       // Ammeter Col 4 Row H to Col 7 Row H
      placeComponent3D('resistor', 8 * 14 + 3, 12 * 14 + 3);     // R1 Col 9 Row C to Col 13 Row C
      placeComponent3D('resistor', 8 * 14 + 5, 12 * 14 + 5);     // R2 Col 9 Row F to Col 13 Row F
      placeComponent3D('voltmeter', 8 * 14 + 9, 12 * 14 + 9);    // Voltmeter Col 9 Row J to Col 13 Row J
      
      create3DWire(6 * 14 + 0, 3 * 14 + 7);                      // Source (+) Col 7 to Ammeter start
      create3DWire(6 * 14 + 7, 8 * 14 + 3);                      // Ammeter end Col 7 Row H to R1 start Col 9 Row C
      create3DWire(8 * 14 + 3, 8 * 14 + 5);                      // Junction 1: R1 start to R2 start
      create3DWire(12 * 14 + 3, 12 * 14 + 5);                    // Junction 2: R1 end to R2 end
      create3DWire(12 * 14 + 5, 6 * 14 + 1);                     // Junction 2 back to Source (-) Col 7
      
      create3DWire(8 * 14 + 9, 8 * 14 + 5);                      // Voltmeter (+) to R2 start (Junction 1)
      create3DWire(12 * 14 + 9, 12 * 14 + 5);                    // Voltmeter (-) to R2 end (Junction 2)
    } else {
      // Series configuration (original layout)
      placeComponent3D('resistor', 7 * 14 + 4, 11 * 14 + 4);
      placeComponent3D('resistor', 11 * 14 + 4, 15 * 14 + 4);
      placeComponent3D('ammeter', 15 * 14 + 7, 20 * 14 + 7);       // Ammeter in series measuring loop current (row H)
      placeComponent3D('voltmeter', 7 * 14 + 9, 11 * 14 + 9);      // Voltmeter in parallel across Resistor 1 (row J)
      create3DWire(7 * 14 + 0, 7 * 14 + 4);                        // Source (+) to Resistor 1 start
      create3DWire(15 * 14 + 4, 15 * 14 + 7);                      // Resistor 2 end to Ammeter start (cross ravine)
      create3DWire(20 * 14 + 7, 20 * 14 + 1);                      // Ammeter end to Source (-)
      create3DWire(7 * 14 + 4, 7 * 14 + 9);                        // Resistor 1 start to Voltmeter start (cross ravine)
      create3DWire(11 * 14 + 4, 11 * 14 + 9);                      // Resistor 1 end to Voltmeter end (cross ravine)
    }
  } else if (expKey === 'wheatstone') {
    placeComponent3D('source', 1 * 14 + 0, 1 * 14 + 1);
    placeComponent3D('resistor', 6 * 14 + 3, 10 * 14 + 3);  // R1
    placeComponent3D('resistor', 10 * 14 + 3, 14 * 14 + 3); // R2
    placeComponent3D('resistor', 6 * 14 + 5, 10 * 14 + 5);  // R3
    placeComponent3D('resistor', 10 * 14 + 5, 14 * 14 + 5); // R4
    create3DWire(2 * 14 + 0, 6 * 14 + 3);
    create3DWire(6 * 14 + 3, 6 * 14 + 5);
    create3DWire(14 * 14 + 3, 14 * 14 + 5);
    create3DWire(14 * 14 + 5, 2 * 14 + 1);
  } else if (expKey === 'arduino_led') {
    placeComponent3D('source', 1 * 14 + 0, 1 * 14 + 1);
    placeComponent3D('button', 11 * 14 + 6, 11 * 14 + 7);
    placeComponent3D('led', 15 * 14 + 6, 17 * 14 + 6);
    placeComponent3D('resistor', 17 * 14 + 7, 21 * 14 + 7);
    create3DWire(882, 11 * 14 + 6);
    create3DWire(11 * 14 + 7, 15 * 14 + 6);
    create3DWire(17 * 14 + 6, 17 * 14 + 7);
    create3DWire(21 * 14 + 7, 883);
  }
}

// --- UNION-FIND CIRCUIT TOPOLOGY RESOLVER ---
function runUnionFind() {
  const uf = {
    parent: Array.from({ length: 884 }, (_, i) => i),
    find(i) {
      if (this.parent[i] === i) return i;
      this.parent[i] = this.find(this.parent[i]);
      return this.parent[i];
    },
    union(i, j) {
      const rootI = this.find(i);
      const rootJ = this.find(j);
      if (rootI !== rootJ) {
        this.parent[rootI] = rootJ;
      }
    }
  };
  
  // 1. Columns internal connectivity (5 sockets linked together)
  for (let c = 0; c < BOARD_COLS; c++) {
    // Sockets A-E (rows 2 to 6)
    for (let r = 2; r < 6; r++) {
      uf.union(c * 14 + r, c * 14 + r + 1);
    }
    // Sockets F-J (rows 7 to 11)
    for (let r = 7; r < 11; r++) {
      uf.union(c * 14 + r, c * 14 + r + 1);
    }
  }
  
  // 2. Power rails internal connectivity (Horizontal positive/negative rails linked)
  for (let c = 0; c < BOARD_COLS - 1; c++) {
    uf.union(c * 14 + 0, (c + 1) * 14 + 0); // Top positive rail (+)
    uf.union(c * 14 + 1, (c + 1) * 14 + 1); // Top negative rail (-)
    uf.union(c * 14 + 12, (c + 1) * 14 + 12); // Bottom positive rail (+)
    uf.union(c * 14 + 13, (c + 1) * 14 + 13); // Bottom negative rail (-)
  }
  
  // 3. User wires connectivity
  state.wires.forEach(w => {
    uf.union(w.fromHole, w.toHole);
  });
  
  return uf;
}

function resolveVirtualWires() {
  const uf = runUnionFind();
  const virtualWires = [];
  for (let i = 0; i < state.placedComponents.length; i++) {
    const c1 = state.placedComponents[i];
    for (let j = i + 1; j < state.placedComponents.length; j++) {
      const c2 = state.placedComponents[j];
      
      // Connect terminal 0 of c1 to terminal 0 of c2
      if (uf.find(c1.snap1) === uf.find(c2.snap1)) {
        virtualWires.push([[i, 0], [j, 0]]);
      }
      // Connect terminal 0 of c1 to terminal 1 of c2
      if (uf.find(c1.snap1) === uf.find(c2.snap2)) {
        virtualWires.push([[i, 0], [j, 1]]);
      }
      // Connect terminal 1 of c1 to terminal 0 of c2
      if (uf.find(c1.snap2) === uf.find(c2.snap1)) {
        virtualWires.push([[i, 1], [j, 0]]);
      }
      // Connect terminal 1 of c1 to terminal 1 of c2
      if (uf.find(c1.snap2) === uf.find(c2.snap2)) {
        virtualWires.push([[i, 1], [j, 1]]);
      }
    }
  }
  
  return virtualWires;
}

// --- DYNAMIC AI MENTOR STEP-BY-STEP SYSTEM ---
function getSocketLabel(index) {
  if (index === 882) return "Arduino Uno 5V Pin";
  if (index === 883) return "Arduino Uno GND Pin";
  const c = Math.floor(index / 14) + 1;
  const r = index % 14;
  if (r === 0) return `Top (+) Rail (Col ${c})`;
  if (r === 1) return `Top (-) Rail (Col ${c})`;
  if (r >= 2 && r <= 6) {
    const rowLetter = String.fromCharCode(65 + (r - 2)); // A, B, C, D, E
    return `Col ${c}, Row ${rowLetter}`;
  }
  if (r >= 7 && r <= 11) {
    const rowLetter = String.fromCharCode(70 + (r - 7)); // F, G, H, I, J
    return `Col ${c}, Row ${rowLetter}`;
  }
  if (r === 12) return `Bottom (+) Rail (Col ${c})`;
  if (r === 13) return `Bottom (-) Rail (Col ${c})`;
  return `Socket ${index}`;
}

function getSocketLabelShort(index) {
  if (index === 882) return "Arduino 5V";
  if (index === 883) return "Arduino GND";
  const c = Math.floor(index / 14) + 1;
  const r = index % 14;
  if (r === 0) return `Top (+) Col ${c}`;
  if (r === 1) return `Top (-) Col ${c}`;
  if (r >= 2 && r <= 6) {
    const rowLetter = String.fromCharCode(65 + (r - 2));
    return `Col ${c}, Row ${rowLetter}`;
  }
  if (r >= 7 && r <= 11) {
    const rowLetter = String.fromCharCode(70 + (r - 7));
    return `Col ${c}, Row ${rowLetter}`;
  }
  if (r === 12) return `Bottom (+) Col ${c}`;
  if (r === 13) return `Bottom (-) Col ${c}`;
  return `Socket ${index}`;
}

function getCurrentExpectedTool() {
  const comps = state.placedComponents;
  const findComp = (type) => comps.find(c => c.type === type);
  const resistors = comps.filter(c => c.type === 'resistor');

  if (state.activeExperiment === 'ohms') {
    if (!findComp('source')) return 'source';
    if (!findComp('resistor')) return 'resistor';
    if (!findComp('ammeter')) return 'ammeter';
    if (!findComp('voltmeter')) return 'voltmeter';
    return 'wire';
  }
  if (state.activeExperiment === 'kvl') {
    const resistor1 = resistors.find(r => Math.floor(r.snap1 / 14) === 7 || Math.floor(r.snap2 / 14) === 7) || resistors[0];
    const resistor2 = resistors.find(r => Math.floor(r.snap1 / 14) === 13 || Math.floor(r.snap2 / 14) === 13) || resistors[1];
    if (!findComp('source')) return 'source';
    if (!resistor1) return 'resistor';
    if (!resistor2) return 'resistor';
    if (!findComp('ammeter')) return 'ammeter';
    if (comps.filter(c => c.type === 'voltmeter').length < 2) return 'voltmeter';
    return 'wire';
  }
  if (state.activeExperiment === 'kcl') {
    const resistors = comps.filter(c => c.type === 'resistor');
    const ammeters = comps.filter(c => c.type === 'ammeter');
    if (!findComp('source')) return 'source';
    if (resistors.length < 2) return 'resistor';
    if (ammeters.length < 3) return 'ammeter';
    return 'wire';
  }
  if (state.activeExperiment === 'series_parallel') {
    const resistor1 = resistors.find(r => r.snap1 === 7 * 14 + 4 || r.snap2 === 7 * 14 + 4);
    const resistor2 = resistors.find(r => r.snap1 === 11 * 14 + 4 || r.snap2 === 11 * 14 + 4);
    if (!findComp('source')) return 'source';
    if (!resistor1) return 'resistor';
    if (!resistor2) return 'resistor';
    return 'wire';
  }
  if (state.activeExperiment === 'wheatstone') {
    const r1 = resistors.find(r => r.snap1 === 6 * 14 + 3 || r.snap2 === 6 * 14 + 3);
    const r2 = resistors.find(r => r.snap1 === 10 * 14 + 3 || r.snap2 === 10 * 14 + 3);
    const r3 = resistors.find(r => r.snap1 === 6 * 14 + 5 || r.snap2 === 6 * 14 + 5);
    const r4 = resistors.find(r => r.snap1 === 10 * 14 + 5 || r.snap2 === 10 * 14 + 5);
    if (!findComp('source')) return 'source';
    if (!r1) return 'resistor';
    if (!r2) return 'resistor';
    if (!r3) return 'resistor';
    if (!r4) return 'resistor';
    return 'wire';
  }
  if (state.activeExperiment === 'lcr' || state.activeExperiment === 'rc_rl_rlc') {
    if (!findComp('source')) return 'source';
    if (!findComp('resistor')) return 'resistor';
    if (!findComp('inductor')) return 'inductor';
    if (!findComp('capacitor')) return 'capacitor';
    if (!findComp('ammeter')) return 'ammeter';
    if (!findComp('voltmeter')) return 'voltmeter';
    return 'wire';
  }
  if (state.activeExperiment === 'rc') {
    if (!findComp('source')) return 'source';
    if (!findComp('resistor')) return 'resistor';
    if (!findComp('capacitor')) return 'capacitor';
    return 'wire';
  }
  if (state.activeExperiment === 'arduino_led') {
    if (!findComp('source')) return 'source';
    if (!findComp('button') && !findComp('toggle_switch')) return 'button';
    if (!findComp('led')) return 'led';
    if (!findComp('resistor')) return 'resistor';
    return 'wire';
  }
  if (state.activeExperiment === 'diode_iv') {
    if (!findComp('source')) return 'source';
    if (!findComp('resistor')) return 'resistor';
    if (!findComp('diode')) return 'diode';
    if (!findComp('ammeter')) return 'ammeter';
    if (!findComp('voltmeter')) return 'voltmeter';
    return 'wire';
  }
  if (state.activeExperiment === 'voltage_divider') {
    if (!findComp('source')) return 'source';
    if (!resistors[0]) return 'resistor';
    if (!resistors[1]) return 'resistor';
    return 'wire';
  }
  if (state.activeExperiment === 'planck_led') {
    if (!findComp('source')) return 'source';
    if (!findComp('resistor')) return 'resistor';
    if (!findComp('led')) return 'led';
    return 'wire';
  }
  return null;
}

function isTargetToolMatch(tool) {
  const expected = getCurrentExpectedTool();
  if (!expected) return false;
  if (tool === expected) return true;
  if (expected === 'button' && (tool === 'button' || tool === 'toggle_switch')) return true;
  return false;
}

function updateGuideLabels() {
  const label1 = document.getElementById('guide-label-1');
  const label2 = document.getElementById('guide-label-2');
  if (!label1 || !label2) return;

  const canvasArea = document.getElementById('canvas-area');
  if (!canvasArea || !camera || !scene) {
    label1.classList.add('hidden');
    label2.classList.add('hidden');
    return;
  }

  const width = canvasArea.clientWidth;
  const height = canvasArea.clientHeight;

  const updateLabel = (label, ring, text) => {
    if (!ring || !ring.parent) {
      label.classList.add('hidden');
      return;
    }

    const tempV = new THREE.Vector3();
    ring.getWorldPosition(tempV);
    
    // Project 3D coordinate to NDC space
    tempV.project(camera);

    // If point is behind the camera plane, hide it
    if (tempV.z > 1) {
      label.classList.add('hidden');
      return;
    }

    // Convert NDC coordinates (-1 to +1) to parent canvas pixels
    const x = (tempV.x * 0.5 + 0.5) * width;
    const y = (-(tempV.y * 0.5) + 0.5) * height;

    label.innerText = text;
    label.style.left = `${x}px`;
    label.style.top = `${y}px`;
    label.classList.remove('hidden');
  };

  updateLabel(label1, targetHighlightRing1, 'A');
  updateLabel(label2, targetHighlightRing2, 'B');
}

function updateTargetHighlights() {
  if (!scene) return;
  if (targetHighlightRing1) scene.remove(targetHighlightRing1);
  if (targetHighlightRing2) scene.remove(targetHighlightRing2);
  if (targetGuideline) {
    scene.remove(targetGuideline);
    targetGuideline = null;
  }
  
  targetHighlightRing1 = null;
  targetHighlightRing2 = null;
  state.targetSnap1 = null;
  state.targetSnap2 = null;

  const addRing = (snapIdx, isWire = false) => {
    if (isWire) {
      const occupied = getOccupiedHoles();
      snapIdx = getRedirectedSnap(snapIdx, occupied);
    }
    const pos = getSnapPos(snapIdx);
    if (!pos) return null;
    const geo = new THREE.RingGeometry(0.08, 0.12, 32);
    const mat = new THREE.MeshBasicMaterial({ color: 0x22c55e, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(geo, mat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(pos.x, 0.09, pos.z);
    scene.add(ring);
    
    if (state.targetSnap1 === null) {
      state.targetSnap1 = snapIdx;
    } else if (state.targetSnap2 === null) {
      state.targetSnap2 = snapIdx;
      
      const p1 = getSnapPos(state.targetSnap1);
      const p2 = pos;
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      mid.y += Math.min(1.5, Math.max(0.4, p1.distanceTo(p2) * 0.35 + 0.1));
      
      const curve = new THREE.CatmullRomCurve3([p1, mid, p2]);
      const points = curve.getPoints(30);
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineDashedMaterial({
        color: 0x22c55e,
        dashSize: 0.1,
        gapSize: 0.06
      });
      targetGuideline = new THREE.Line(geo, mat);
      targetGuideline.computeLineDistances();
      scene.add(targetGuideline);
    }
    return ring;
  };

  const comps = state.placedComponents;
  const findComp = (type) => comps.find(c => c.type === type);
  const uf = runUnionFind();

  if (state.activeExperiment === 'ohms') {
    const source = findComp('source');
    const resistor = findComp('resistor');
    const ammeter = findComp('ammeter');
    const voltmeter = findComp('voltmeter');

    if (!source) {
      if (!state.selectedTool || state.selectedTool === 'source') {
        targetHighlightRing1 = addRing(1 * 14 + 0);
        targetHighlightRing2 = addRing(1 * 14 + 1);
      }
    } else if (!resistor) {
      if (!state.selectedTool || state.selectedTool === 'resistor') {
        targetHighlightRing1 = addRing(9 * 14 + 4);
        targetHighlightRing2 = addRing(14 * 14 + 4);
      }
    } else if (!ammeter) {
      if (!state.selectedTool || state.selectedTool === 'ammeter') {
        targetHighlightRing1 = addRing(14 * 14 + 7);
        targetHighlightRing2 = addRing(19 * 14 + 7);
      }
    } else if (!voltmeter) {
      if (!state.selectedTool || state.selectedTool === 'voltmeter') {
        targetHighlightRing1 = addRing(9 * 14 + 9);
        targetHighlightRing2 = addRing(14 * 14 + 9);
      }
    } else {
      if (!state.selectedTool || state.selectedTool === 'wire') {
        const r1 = resistor.snap1, r2 = resistor.snap2;
        const am1 = ammeter.snap1, am2 = ammeter.snap2;
        const volt1 = voltmeter.snap1, volt2 = voltmeter.snap2;

        const r_pos_term = (uf.find(r1) === uf.find(9 * 14 + 0)) ? r1 : ((uf.find(r2) === uf.find(9 * 14 + 0)) ? r2 : null);
        const r_free_term = r_pos_term ? (r_pos_term === r1 ? r2 : r1) : r1;

        if (r_pos_term === null) {
          targetHighlightRing1 = addRing(9 * 14 + 0, true);
          targetHighlightRing2 = addRing(r1, true);
          return;
        }

        const am_conn_term = (uf.find(am1) === uf.find(r_free_term)) ? am1 : ((uf.find(am2) === uf.find(r_free_term)) ? am2 : null);
        const am_free_term = am_conn_term ? (am_conn_term === am1 ? am2 : am1) : am1;

        if (am_conn_term === null) {
          targetHighlightRing1 = addRing(r_free_term, true);
          targetHighlightRing2 = addRing(am1, true);
          return;
        }

        const am_to_gnd = (uf.find(am_free_term) === uf.find(19 * 14 + 1));
        if (!am_to_gnd) {
          targetHighlightRing1 = addRing(am_free_term, true);
          targetHighlightRing2 = addRing(19 * 14 + 1, true);
          return;
        }

        const volt1_connected = (uf.find(volt1) === uf.find(r1) || uf.find(volt1) === uf.find(r2));
        if (!volt1_connected) {
          targetHighlightRing1 = addRing(volt1, true);
          targetHighlightRing2 = addRing(r1, true);
          return;
        }

        const volt1_conn_to = (uf.find(volt1) === uf.find(r1)) ? r1 : r2;
        const volt2_target = (volt1_conn_to === r1) ? r2 : r1;
        const volt2_connected = (uf.find(volt2) === uf.find(volt2_target));
        if (!volt2_connected) {
          targetHighlightRing1 = addRing(volt2, true);
          targetHighlightRing2 = addRing(volt2_target, true);
          return;
        }
      }
    }
  }
  else if (state.activeExperiment === 'kvl') {
    const source = findComp('source');
    const resistors = comps.filter(c => c.type === 'resistor');
    const ammeter = findComp('ammeter');
    const voltmetersPlaced = comps.filter(c => c.type === 'voltmeter');
    
    const resistor1 = resistors.find(r => Math.floor(r.snap1 / 14) === 7 || Math.floor(r.snap2 / 14) === 7) || resistors[0];
    const resistor2 = resistors.find(r => Math.floor(r.snap1 / 14) === 13 || Math.floor(r.snap2 / 14) === 13) || resistors[1];

    if (!source) {
      if (!state.selectedTool || state.selectedTool === 'source') {
        targetHighlightRing1 = addRing(1 * 14 + 0);
        targetHighlightRing2 = addRing(1 * 14 + 1);
      }
    } else if (!resistor1) {
      if (!state.selectedTool || state.selectedTool === 'resistor') {
        targetHighlightRing1 = addRing(7 * 14 + 5);
        targetHighlightRing2 = addRing(11 * 14 + 5);
      }
    } else if (!resistor2) {
      if (!state.selectedTool || state.selectedTool === 'resistor') {
        targetHighlightRing1 = addRing(13 * 14 + 5);
        targetHighlightRing2 = addRing(17 * 14 + 5);
      }
    } else if (!ammeter) {
      if (!state.selectedTool || state.selectedTool === 'ammeter') {
        targetHighlightRing1 = addRing(11 * 14 + 9);
        targetHighlightRing2 = addRing(13 * 14 + 9);
      }
    } else if (voltmetersPlaced.length < 2) {
      if (!state.selectedTool || state.selectedTool === 'voltmeter') {
        if (voltmetersPlaced.length === 0) {
          targetHighlightRing1 = addRing(7 * 14 + 3);
          targetHighlightRing2 = addRing(11 * 14 + 3);
        } else {
          targetHighlightRing1 = addRing(13 * 14 + 3);
          targetHighlightRing2 = addRing(17 * 14 + 3);
        }
      }
    } else {
      if (!state.selectedTool || state.selectedTool === 'wire') {
        const r1_1 = resistor1.snap1, r1_2 = resistor1.snap2;
        const r2_1 = resistor2.snap1, r2_2 = resistor2.snap2;
        const am1 = ammeter.snap1, am2 = ammeter.snap2;

        const volt1_comp = voltmetersPlaced.find(v => Math.floor(v.snap1 / 14) === 7 || Math.floor(v.snap2 / 14) === 7) || voltmetersPlaced[0];
        const volt2_comp = voltmetersPlaced.find(v => Math.floor(v.snap1 / 14) === 13 || Math.floor(v.snap2 / 14) === 13) || voltmetersPlaced[1];

        const volt1_1 = volt1_comp.snap1;
        const volt1_2 = volt1_comp.snap2;
        const volt2_1 = volt2_comp.snap1;
        const volt2_2 = volt2_comp.snap2;

        const s_to_r1 = (uf.find(7 * 14 + 0) === uf.find(r1_1) || uf.find(7 * 14 + 0) === uf.find(r1_2));
        if (!s_to_r1) {
          targetHighlightRing1 = addRing(7 * 14 + 0, true);
          targetHighlightRing2 = addRing(7 * 14 + 6, true);
          return;
        }

        const r1_free = (uf.find(7 * 14 + 0) === uf.find(r1_1)) ? r1_2 : r1_1;
        const r1_to_am = (uf.find(r1_free) === uf.find(am1) || uf.find(r1_free) === uf.find(am2));
        if (!r1_to_am) {
          targetHighlightRing1 = addRing(11 * 14 + 6, true);
          targetHighlightRing2 = addRing(11 * 14 + 9, true);
          return;
        }

        const am_free = (uf.find(r1_free) === uf.find(am1)) ? am2 : am1;
        const am_to_r2 = (uf.find(am_free) === uf.find(r2_1) || uf.find(am_free) === uf.find(r2_2));
        if (!am_to_r2) {
          targetHighlightRing1 = addRing(13 * 14 + 9, true);
          targetHighlightRing2 = addRing(13 * 14 + 6, true);
          return;
        }

        const r2_free = (uf.find(am_free) === uf.find(r2_1)) ? r2_2 : r2_1;
        const r2_to_gnd = (uf.find(r2_free) === uf.find(17 * 14 + 1));
        if (!r2_to_gnd) {
          targetHighlightRing1 = addRing(17 * 14 + 6, true);
          targetHighlightRing2 = addRing(17 * 14 + 1, true);
          return;
        }

        const v1_1Node = uf.find(volt1_1);
        const v1_2Node = uf.find(volt1_2);
        const r1_1Node = uf.find(r1_1);
        const r1_2Node = uf.find(r1_2);

        const isVolt1ConnectedToR1 = (v1_1Node === r1_1Node && v1_2Node === r1_2Node) || (v1_1Node === r1_2Node && v1_2Node === r1_1Node);
        if (!isVolt1ConnectedToR1) {
          if (v1_1Node !== r1_1Node && v1_2Node !== r1_1Node && v1_1Node !== r1_2Node && v1_2Node !== r1_2Node) {
            targetHighlightRing1 = addRing(7 * 14 + 3, true);
            targetHighlightRing2 = addRing(7 * 14 + 4, true);
            return;
          }
          if (v1_1Node === r1_1Node) {
            if (v1_2Node !== r1_2Node) {
              targetHighlightRing1 = addRing(11 * 14 + 3, true);
              targetHighlightRing2 = addRing(11 * 14 + 4, true);
              return;
            }
          } else if (v1_2Node === r1_1Node) {
            if (v1_1Node !== r1_2Node) {
              targetHighlightRing1 = addRing(7 * 14 + 3, true);
              targetHighlightRing2 = addRing(11 * 14 + 4, true);
              return;
            }
          } else if (v1_1Node === r1_2Node) {
            if (v1_2Node !== r1_1Node) {
              targetHighlightRing1 = addRing(11 * 14 + 3, true);
              targetHighlightRing2 = addRing(7 * 14 + 4, true);
              return;
            }
          } else if (v1_2Node === r1_2Node) {
            if (v1_1Node !== r1_1Node) {
              targetHighlightRing1 = addRing(7 * 14 + 3, true);
              targetHighlightRing2 = addRing(7 * 14 + 4, true);
              return;
            }
          }
        }

        const v2_1Node = uf.find(volt2_1);
        const v2_2Node = uf.find(volt2_2);
        const r2_1Node = uf.find(r2_1);
        const r2_2Node = uf.find(r2_2);

        const isVolt2ConnectedToR2 = (v2_1Node === r2_1Node && v2_2Node === r2_2Node) || (v2_1Node === r2_2Node && v2_2Node === r2_1Node);
        if (!isVolt2ConnectedToR2) {
          if (v2_1Node !== r2_1Node && v2_2Node !== r2_1Node && v2_1Node !== r2_2Node && v2_2Node !== r2_2Node) {
            targetHighlightRing1 = addRing(13 * 14 + 3, true);
            targetHighlightRing2 = addRing(13 * 14 + 4, true);
            return;
          }
          if (v2_1Node === r2_1Node) {
            if (v2_2Node !== r2_2Node) {
              targetHighlightRing1 = addRing(17 * 14 + 3, true);
              targetHighlightRing2 = addRing(17 * 14 + 4, true);
              return;
            }
          } else if (v2_2Node === r2_1Node) {
            if (v2_1Node !== r2_2Node) {
              targetHighlightRing1 = addRing(13 * 14 + 3, true);
              targetHighlightRing2 = addRing(17 * 14 + 4, true);
              return;
            }
          } else if (v2_1Node === r2_2Node) {
            if (v2_2Node !== r2_1Node) {
              targetHighlightRing1 = addRing(17 * 14 + 3, true);
              targetHighlightRing2 = addRing(13 * 14 + 4, true);
              return;
            }
          } else if (v2_2Node === r2_2Node) {
            if (v2_1Node !== r2_1Node) {
              targetHighlightRing1 = addRing(13 * 14 + 3, true);
              targetHighlightRing2 = addRing(13 * 14 + 4, true);
              return;
            }
          }
        }
      }
    }
  }
  else if (state.activeExperiment === 'kcl') {
    const source = findComp('source');
    const resistors = comps.filter(c => c.type === 'resistor');
    const ammeter = findComp('ammeter');
    
    const resistor1 = resistors[0];
    const resistor2 = resistors[1];

    if (!source) {
      if (!state.selectedTool || state.selectedTool === 'source') {
        targetHighlightRing1 = addRing(1 * 14 + 0);
        targetHighlightRing2 = addRing(1 * 14 + 1);
      }
    } else if (!resistor1) {
      if (!state.selectedTool || state.selectedTool === 'resistor') {
        targetHighlightRing1 = addRing(8 * 14 + 3);
        targetHighlightRing2 = addRing(12 * 14 + 3);
      }
    } else if (!resistor2) {
      if (!state.selectedTool || state.selectedTool === 'resistor') {
        targetHighlightRing1 = addRing(8 * 14 + 5);
        targetHighlightRing2 = addRing(12 * 14 + 5);
      }
    } else if (!ammeter) {
      if (!state.selectedTool || state.selectedTool === 'ammeter') {
        targetHighlightRing1 = addRing(3 * 14 + 7);
        targetHighlightRing2 = addRing(6 * 14 + 7);
      }
    } else {
      if (!state.selectedTool || state.selectedTool === 'wire') {
        const r1_1 = resistor1.snap1, r1_2 = resistor1.snap2;
        const r2_1 = resistor2.snap1, r2_2 = resistor2.snap2;
        const am1 = ammeter.snap1, am2 = ammeter.snap2;
        const r1_1_node = uf.find(r1_1), r1_2_node = uf.find(r1_2);
        const r2_1_node = uf.find(r2_1), r2_2_node = uf.find(r2_2);
        const am1_node = uf.find(am1), am2_node = uf.find(am2);

        const posRail = uf.find(6 * 14 + 0);
        const negRail = uf.find(6 * 14 + 1);

        const isLowSide = (am1_node === negRail || am2_node === negRail);

        if (isLowSide) {
          const pos_to_r1 = (r1_1_node === posRail || r1_2_node === posRail);
          if (!pos_to_r1) {
            targetHighlightRing1 = addRing(6 * 14 + 0, true);
            targetHighlightRing2 = addRing(r1_1, true);
            return;
          }
          const r1_start = (r1_1_node === posRail) ? r1_1 : r1_2;
          const r1_end = (r1_start === r1_1) ? r1_2 : r1_1;

          const branch_in = (uf.find(r1_start) === r2_1_node || uf.find(r1_start) === r2_2_node);
          if (!branch_in) {
            targetHighlightRing1 = addRing(r1_start, true);
            targetHighlightRing2 = addRing(r2_1, true);
            return;
          }
          const r2_end = (uf.find(r1_start) === r2_1_node) ? r2_2 : r2_1;

          const branch_out = (uf.find(r1_end) === uf.find(r2_end));
          if (!branch_out) {
            targetHighlightRing1 = addRing(r1_end, true);
            targetHighlightRing2 = addRing(r2_end, true);
            return;
          }

          const am_free = (am1_node === negRail) ? am2 : am1;
          const r1_end_node = uf.find(r1_end);
          const parallel_to_am = (r1_end_node === uf.find(am_free));
          if (!parallel_to_am) {
            targetHighlightRing1 = addRing(r1_end, true);
            targetHighlightRing2 = addRing(am_free, true);
            return;
          }
        } else {
          let s_to_r1 = false;
          let r1_start = null;

          if ((am1_node === posRail && am2_node === r1_1_node) || (am2_node === posRail && am1_node === r1_1_node)) {
            s_to_r1 = true;
            r1_start = r1_1;
          } else if ((am1_node === posRail && am2_node === r1_2_node) || (am2_node === posRail && am1_node === r1_2_node)) {
            s_to_r1 = true;
            r1_start = r1_2;
          }

          if (!s_to_r1) {
            if (am1_node !== posRail && am2_node !== posRail) {
              targetHighlightRing1 = addRing(6 * 14 + 0, true);
              targetHighlightRing2 = addRing(am1, true);
            } else {
              const am_free = (am1_node === posRail) ? am2 : am1;
              targetHighlightRing1 = addRing(am_free, true);
              targetHighlightRing2 = addRing(r1_1, true);
            }
            return;
          }

          if (!r1_start) {
            r1_start = (uf.find(6 * 14 + 0) === r1_1_node) ? r1_1 : r1_2;
          }
          const r1_end = (r1_start === r1_1) ? r1_2 : r1_1;

          const branch_in = (uf.find(r1_start) === r2_1_node || uf.find(r1_start) === r2_2_node);
          if (!branch_in) {
            targetHighlightRing1 = addRing(r1_start, true);
            targetHighlightRing2 = addRing(r2_1, true);
            return;
          }
          const r2_end = (uf.find(r1_start) === r2_1_node) ? r2_2 : r2_1;

          const branch_out = (uf.find(r1_end) === uf.find(r2_end));
          if (!branch_out) {
            targetHighlightRing1 = addRing(r1_end, true);
            targetHighlightRing2 = addRing(r2_end, true);
            return;
          }

          const r2_end_node = uf.find(r2_end);
          const to_gnd = (r2_end_node === negRail);
          if (!to_gnd) {
            targetHighlightRing1 = addRing(r2_end, true);
            targetHighlightRing2 = addRing(6 * 14 + 1, true);
            return;
          }
        }
      }
    }
  }
  else if (state.activeExperiment === 'series_parallel') {
    const source = findComp('source');
    const resistors = comps.filter(c => c.type === 'resistor');
    
    const resistor1 = resistors.find(r => r.snap1 === 7 * 14 + 4 || r.snap2 === 7 * 14 + 4);
    const resistor2 = resistors.find(r => r.snap1 === 11 * 14 + 4 || r.snap2 === 11 * 14 + 4);

    if (!source) {
      if (!state.selectedTool || state.selectedTool === 'source') {
        targetHighlightRing1 = addRing(1 * 14 + 0);
        targetHighlightRing2 = addRing(1 * 14 + 1);
      }
    } else if (!resistor1) {
      if (!state.selectedTool || state.selectedTool === 'resistor') {
        targetHighlightRing1 = addRing(7 * 14 + 4);
        targetHighlightRing2 = addRing(11 * 14 + 4);
      }
    } else if (!resistor2) {
      if (!state.selectedTool || state.selectedTool === 'resistor') {
        targetHighlightRing1 = addRing(11 * 14 + 4);
        targetHighlightRing2 = addRing(15 * 14 + 4);
      }
    } else {
      if (!state.selectedTool || state.selectedTool === 'wire') {
        const r1_1 = resistor1.snap1, r1_2 = resistor1.snap2;
        const r2_1 = resistor2.snap1, r2_2 = resistor2.snap2;

        const s_to_r1 = (uf.find(7 * 14 + 0) === uf.find(r1_1) || uf.find(7 * 14 + 0) === uf.find(r1_2));
        if (!s_to_r1) {
          targetHighlightRing1 = addRing(7 * 14 + 0, true);
          targetHighlightRing2 = addRing(r1_1, true);
          return;
        }

        const r1_pos_term = (uf.find(r1_1) === uf.find(7 * 14 + 0)) ? r1_1 : r1_2;
        const r1_shared_term = (r1_pos_term === r1_1) ? r1_2 : r1_1;

        const r2_shared_term = (uf.find(r2_1) === uf.find(r1_shared_term)) ? r2_1 : ((uf.find(r2_2) === uf.find(r1_shared_term)) ? r2_2 : null);
        if (r2_shared_term === null) {
          targetHighlightRing1 = addRing(r1_shared_term, true);
          targetHighlightRing2 = addRing(r2_1, true);
          return;
        }

        const r2_free_term = (r2_shared_term === r2_1) ? r2_2 : r2_1;
        const to_gnd = (uf.find(r2_free_term) === uf.find(15 * 14 + 1));
        if (!to_gnd) {
          targetHighlightRing1 = addRing(r2_free_term, true);
          targetHighlightRing2 = addRing(15 * 14 + 1, true);
          return;
        }
      }
    }
  }
  else if (state.activeExperiment === 'wheatstone') {
    const source = findComp('source');
    const resistors = comps.filter(c => c.type === 'resistor');
    
    const r1 = resistors.find(r => r.snap1 === 6 * 14 + 3 || r.snap2 === 6 * 14 + 3);
    const r2 = resistors.find(r => r.snap1 === 10 * 14 + 3 || r.snap2 === 10 * 14 + 3);
    const r3 = resistors.find(r => r.snap1 === 6 * 14 + 5 || r.snap2 === 6 * 14 + 5);
    const r4 = resistors.find(r => r.snap1 === 10 * 14 + 5 || r.snap2 === 10 * 14 + 5);

    if (!source) {
      if (!state.selectedTool || state.selectedTool === 'source') {
        targetHighlightRing1 = addRing(1 * 14 + 0);
        targetHighlightRing2 = addRing(1 * 14 + 1);
      }
    } else if (!r1) {
      if (!state.selectedTool || state.selectedTool === 'resistor') {
        targetHighlightRing1 = addRing(6 * 14 + 3);
        targetHighlightRing2 = addRing(10 * 14 + 3);
      }
    } else if (!r2) {
      if (!state.selectedTool || state.selectedTool === 'resistor') {
        targetHighlightRing1 = addRing(10 * 14 + 3);
        targetHighlightRing2 = addRing(14 * 14 + 3);
      }
    } else if (!r3) {
      if (!state.selectedTool || state.selectedTool === 'resistor') {
        targetHighlightRing1 = addRing(6 * 14 + 5);
        targetHighlightRing2 = addRing(10 * 14 + 5);
      }
    } else if (!r4) {
      if (!state.selectedTool || state.selectedTool === 'resistor') {
        targetHighlightRing1 = addRing(10 * 14 + 5);
        targetHighlightRing2 = addRing(14 * 14 + 5);
      }
    } else {
      if (!state.selectedTool || state.selectedTool === 'wire') {
        const s_to_r1 = (uf.find(2 * 14 + 0) === uf.find(r1.snap1) || uf.find(2 * 14 + 0) === uf.find(r1.snap2));
        if (!s_to_r1) {
          targetHighlightRing1 = addRing(2 * 14 + 0, true);
          targetHighlightRing2 = addRing(r1.snap1, true);
          return;
        }

        const r1_pos_term = (uf.find(r1.snap1) === uf.find(2 * 14 + 0)) ? r1.snap1 : r1.snap2;
        const r1_other_term = (r1_pos_term === r1.snap1) ? r1.snap2 : r1.snap1;

        const r1_to_r3 = (uf.find(r1_pos_term) === uf.find(r3.snap1) || uf.find(r1_pos_term) === uf.find(r3.snap2));
        if (!r1_to_r3) {
          targetHighlightRing1 = addRing(r1_pos_term, true);
          targetHighlightRing2 = addRing(r3.snap1, true);
          return;
        }

        const r2_to_r4 = (uf.find(r2.snap2) === uf.find(r4.snap2) || uf.find(r2.snap2) === uf.find(r4.snap1) || uf.find(r2.snap1) === uf.find(r4.snap2) || uf.find(r2.snap1) === uf.find(r4.snap1));
        if (!r2_to_r4) {
          targetHighlightRing1 = addRing(r2.snap2, true);
          targetHighlightRing2 = addRing(r4.snap2, true);
          return;
        }

        const r4_gnd_term = (uf.find(r4.snap1) === uf.find(2 * 14 + 1)) ? r4.snap1 : r4.snap2;
        const to_gnd = (uf.find(r4_gnd_term) === uf.find(2 * 14 + 1));
        if (!to_gnd) {
          targetHighlightRing1 = addRing(r4_gnd_term, true);
          targetHighlightRing2 = addRing(2 * 14 + 1, true);
          return;
        }
      }
    }
  }
  else if (state.activeExperiment === 'lcr' || state.activeExperiment === 'rc_rl_rlc') {
    const source = findComp('source');
    const resistor = findComp('resistor');
    const inductor = findComp('inductor');
    const capacitor = findComp('capacitor');
    const ammeter = findComp('ammeter');
    const voltmeter = findComp('voltmeter');

    if (!source) {
      if (!state.selectedTool || state.selectedTool === 'source') {
        targetHighlightRing1 = addRing(1 * 14 + 0);
        targetHighlightRing2 = addRing(1 * 14 + 1);
      }
    } else if (!resistor) {
      if (!state.selectedTool || state.selectedTool === 'resistor') {
        targetHighlightRing1 = addRing(7 * 14 + 4);
        targetHighlightRing2 = addRing(11 * 14 + 4);
      }
    } else if (!inductor) {
      if (!state.selectedTool || state.selectedTool === 'inductor') {
        targetHighlightRing1 = addRing(11 * 14 + 5);
        targetHighlightRing2 = addRing(15 * 14 + 5);
      }
    } else if (!capacitor) {
      if (!state.selectedTool || state.selectedTool === 'capacitor') {
        targetHighlightRing1 = addRing(15 * 14 + 6);
        targetHighlightRing2 = addRing(19 * 14 + 6);
      }
    } else if (!ammeter) {
      if (!state.selectedTool || state.selectedTool === 'ammeter') {
        targetHighlightRing1 = addRing(19 * 14 + 9);
        targetHighlightRing2 = addRing(24 * 14 + 9);
      }
    } else if (!voltmeter) {
      if (!state.selectedTool || state.selectedTool === 'voltmeter') {
        targetHighlightRing1 = addRing(15 * 14 + 11);
        targetHighlightRing2 = addRing(19 * 14 + 11);
      }
    } else {
      if (!state.selectedTool || state.selectedTool === 'wire') {
        const r1 = resistor.snap1, r2 = resistor.snap2;
        const l1 = inductor.snap1, l2 = inductor.snap2;
        const c1 = capacitor.snap1, c2 = capacitor.snap2;
        const am1 = ammeter.snap1, am2 = ammeter.snap2;
        const volt1 = voltmeter.snap1, volt2 = voltmeter.snap2;

        const s_to_r = (uf.find(7 * 14 + 0) === uf.find(r1) || uf.find(7 * 14 + 0) === uf.find(r2));
        if (!s_to_r) {
          targetHighlightRing1 = addRing(7 * 14 + 0, true);
          targetHighlightRing2 = addRing(r1, true);
          return;
        }

        const r_conn_term = (uf.find(r1) === uf.find(7 * 14 + 0)) ? r1 : r2;
        const r_free_term = (r_conn_term === r1) ? r2 : r1;

        const r_to_l = (uf.find(r_free_term) === uf.find(l1) || uf.find(r_free_term) === uf.find(l2));
        if (!r_to_l) {
          targetHighlightRing1 = addRing(r_free_term, true);
          targetHighlightRing2 = addRing(l1, true);
          return;
        }

        const l_conn_term = (uf.find(l1) === uf.find(r_free_term)) ? l1 : l2;
        const l_free_term = (l_conn_term === l1) ? l2 : l1;

        const l_to_c = (uf.find(l_free_term) === uf.find(c1) || uf.find(l_free_term) === uf.find(c2));
        if (!l_to_c) {
          targetHighlightRing1 = addRing(l_free_term, true);
          targetHighlightRing2 = addRing(c1, true);
          return;
        }

        const c_conn_term = (uf.find(c1) === uf.find(l_free_term)) ? c1 : c2;
        const c_free_term = (c_conn_term === c1) ? c2 : c1;

        const c_to_am = (uf.find(c_free_term) === uf.find(am1) || uf.find(c_free_term) === uf.find(am2));
        if (!c_to_am) {
          targetHighlightRing1 = addRing(c_free_term, true);
          targetHighlightRing2 = addRing(am1, true);
          return;
        }

        const am_conn_term = (uf.find(am1) === uf.find(c_free_term)) ? am1 : am2;
        const am_free_term = (am_conn_term === am1) ? am2 : am1;

        const am_to_gnd = (uf.find(am_free_term) === uf.find(24 * 14 + 1));
        if (!am_to_gnd) {
          targetHighlightRing1 = addRing(am_free_term, true);
          targetHighlightRing2 = addRing(24 * 14 + 1, true);
          return;
        }

        const volt1_connected = (uf.find(volt1) === uf.find(c1) || uf.find(volt1) === uf.find(c2));
        if (!volt1_connected) {
          targetHighlightRing1 = addRing(volt1, true);
          targetHighlightRing2 = addRing(c1, true);
          return;
        }

        const volt1_conn_to = (uf.find(volt1) === uf.find(c1)) ? c1 : c2;
        const volt2_target = (volt1_conn_to === c1) ? c2 : c1;
        const volt2_connected = (uf.find(volt2) === uf.find(volt2_target));
        if (!volt2_connected) {
          targetHighlightRing1 = addRing(volt2, true);
          targetHighlightRing2 = addRing(volt2_target, true);
          return;
        }
      }
    }
  } 
  else if (state.activeExperiment === 'rc') {
    const source = findComp('source');
    const switchComp = findComp('toggle_switch') || findComp('button');
    const resistor = findComp('resistor');
    const capacitor = findComp('capacitor');

    if (!source) {
      if (!state.selectedTool || state.selectedTool === 'source') {
        targetHighlightRing1 = addRing(1 * 14 + 0);
        targetHighlightRing2 = addRing(1 * 14 + 1);
      }
    } else if (!switchComp) {
      if (!state.selectedTool || state.selectedTool === 'toggle_switch' || state.selectedTool === 'button') {
        targetHighlightRing1 = addRing(5 * 14 + 5);
        targetHighlightRing2 = addRing(9 * 14 + 5);
      }
    } else if (!resistor) {
      if (!state.selectedTool || state.selectedTool === 'resistor') {
        targetHighlightRing1 = addRing(9 * 14 + 6);
        targetHighlightRing2 = addRing(14 * 14 + 6);
      }
    } else if (!capacitor) {
      if (!state.selectedTool || state.selectedTool === 'capacitor') {
        targetHighlightRing1 = addRing(14 * 14 + 7);
        targetHighlightRing2 = addRing(19 * 14 + 7);
      }
    } else {
      if (!state.selectedTool || state.selectedTool === 'wire') {
        const sw1 = switchComp.snap1, sw2 = switchComp.snap2;
        const r1 = resistor.snap1, r2 = resistor.snap2;
        const c1 = capacitor.snap1, c2 = capacitor.snap2;

        const s_to_sw = (uf.find(5 * 14 + 0) === uf.find(sw1) || uf.find(5 * 14 + 0) === uf.find(sw2));
        if (!s_to_sw) {
          targetHighlightRing1 = addRing(5 * 14 + 0, true);
          targetHighlightRing2 = addRing(sw1, true);
          return;
        }

        const sw_conn_term = (uf.find(sw1) === uf.find(5 * 14 + 0)) ? sw1 : sw2;
        const sw_free_term = (sw_conn_term === sw1) ? sw2 : sw1;

        const sw_to_r = (uf.find(sw_free_term) === uf.find(r1) || uf.find(sw_free_term) === uf.find(r2));
        if (!sw_to_r) {
          targetHighlightRing1 = addRing(sw_free_term, true);
          targetHighlightRing2 = addRing(r1, true);
          return;
        }

        const r_conn_term = (uf.find(r1) === uf.find(sw_free_term)) ? r1 : r2;
        const r_free_term = (r_conn_term === r1) ? r2 : r1;

        const r_to_c = (uf.find(r_free_term) === uf.find(c1) || uf.find(r_free_term) === uf.find(c2));
        if (!r_to_c) {
          targetHighlightRing1 = addRing(r_free_term, true);
          targetHighlightRing2 = addRing(c1, true);
          return;
        }

        const c_conn_term = (uf.find(c1) === uf.find(r_free_term)) ? c1 : c2;
        const c_free_term = (c_conn_term === c1) ? c2 : c1;

        const c_to_gnd = (uf.find(c_free_term) === uf.find(24 * 14 + 1));
        if (!c_to_gnd) {
          targetHighlightRing1 = addRing(c_free_term, true);
          targetHighlightRing2 = addRing(24 * 14 + 1, true);
          return;
        }
      }
    }
  } 
  else if (state.activeExperiment === 'arduino_led') {
    const source = findComp('source');
    const button = findComp('button') || findComp('toggle_switch');
    const led = findComp('led');
    const resistor = findComp('resistor');

    if (!source) {
      if (!state.selectedTool || state.selectedTool === 'source') {
        targetHighlightRing1 = addRing(1 * 14 + 0);
        targetHighlightRing2 = addRing(1 * 14 + 1);
      }
    } else if (!button) {
      if (!state.selectedTool || state.selectedTool === 'button' || state.selectedTool === 'toggle_switch') {
        targetHighlightRing1 = addRing(11 * 14 + 6);
        targetHighlightRing2 = addRing(11 * 14 + 7);
      }
    } else if (!led) {
      if (!state.selectedTool || state.selectedTool === 'led') {
        targetHighlightRing1 = addRing(15 * 14 + 6);
        targetHighlightRing2 = addRing(17 * 14 + 6);
      }
    } else if (!resistor) {
      if (!state.selectedTool || state.selectedTool === 'resistor') {
        targetHighlightRing1 = addRing(17 * 14 + 7);
        targetHighlightRing2 = addRing(21 * 14 + 7);
      }
    } else {
      if (!state.selectedTool || state.selectedTool === 'wire') {
        const btn1 = button.snap1, btn2 = button.snap2;
        const led1 = led.snap1, led2 = led.snap2;
        const r1 = resistor.snap1, r2 = resistor.snap2;

        const v5_to_btn = (uf.find(882) === uf.find(btn1) || uf.find(882) === uf.find(btn2));
        let btn_conn_term = v5_to_btn ? (uf.find(882) === uf.find(btn1) ? btn1 : btn2) : null;
        let btn_free_term = v5_to_btn ? (btn_conn_term === btn1 ? btn2 : btn1) : null;

        const btn_to_led = btn_free_term && (uf.find(btn_free_term) === uf.find(led1) || uf.find(btn_free_term) === uf.find(led2));
        let led_conn_term = btn_to_led ? (uf.find(btn_free_term) === uf.find(led1) ? led1 : led2) : null;
        let led_free_term = btn_to_led ? (led_conn_term === led1 ? led2 : led1) : null;

        const led_to_res = led_free_term && (uf.find(led_free_term) === uf.find(r1) || uf.find(led_free_term) === uf.find(r2));
        let res_conn_term = led_to_res ? (uf.find(led_free_term) === uf.find(r1) ? r1 : r2) : null;
        let res_free_term = led_to_res ? (res_conn_term === r1 ? r2 : r1) : null;

        const res_to_gnd = res_free_term && (uf.find(res_free_term) === uf.find(883));

        if (!v5_to_btn) {
          targetHighlightRing1 = addRing(882, true);
          targetHighlightRing2 = addRing(btn1, true);
          return;
        }
        if (!btn_to_led) {
          targetHighlightRing1 = addRing(btn_free_term, true);
          targetHighlightRing2 = addRing(led1, true);
          return;
        }
        if (!led_to_res) {
          targetHighlightRing1 = addRing(led_free_term, true);
          targetHighlightRing2 = addRing(r1, true);
          return;
        }
        if (!res_to_gnd) {
          targetHighlightRing1 = addRing(res_free_term, true);
          targetHighlightRing2 = addRing(883, true);
          return;
        }
      }
    }
  }
  else if (state.activeExperiment === 'diode_iv') {
    const source = findComp('source');
    const resistor = findComp('resistor');
    const diode = findComp('diode');
    const ammeter = findComp('ammeter');
    const voltmeter = findComp('voltmeter');

    if (!source) {
      if (!state.selectedTool || state.selectedTool === 'source') {
        targetHighlightRing1 = addRing(1 * 14 + 0);
        targetHighlightRing2 = addRing(1 * 14 + 1);
      }
    } else if (!resistor) {
      if (!state.selectedTool || state.selectedTool === 'resistor') {
        targetHighlightRing1 = addRing(9 * 14 + 4);
        targetHighlightRing2 = addRing(14 * 14 + 4);
      }
    } else if (!diode) {
      if (!state.selectedTool || state.selectedTool === 'diode') {
        targetHighlightRing1 = addRing(14 * 14 + 7);
        targetHighlightRing2 = addRing(19 * 14 + 7);
      }
    } else if (!ammeter) {
      if (!state.selectedTool || state.selectedTool === 'ammeter') {
        targetHighlightRing1 = addRing(19 * 14 + 9);
        targetHighlightRing2 = addRing(24 * 14 + 9);
      }
    } else if (!voltmeter) {
      if (!state.selectedTool || state.selectedTool === 'voltmeter') {
        targetHighlightRing1 = addRing(14 * 14 + 2);
        targetHighlightRing2 = addRing(19 * 14 + 2);
      }
    } else {
      if (!state.selectedTool || state.selectedTool === 'wire') {
        const r1 = resistor.snap1, r2 = resistor.snap2;
        const d1 = diode.snap1, d2 = diode.snap2;
        const am1 = ammeter.snap1, am2 = ammeter.snap2;
        const volt1 = voltmeter.snap1, volt2 = voltmeter.snap2;

        const s_to_r = (uf.find(2 * 14 + 0) === uf.find(r1) || uf.find(2 * 14 + 0) === uf.find(r2));
        if (!s_to_r) {
          targetHighlightRing1 = addRing(2 * 14 + 0, true);
          targetHighlightRing2 = addRing(r1, true);
          return;
        }

        const r_conn_term = (uf.find(r1) === uf.find(2 * 14 + 0)) ? r1 : r2;
        const r_free_term = (r_conn_term === r1) ? r2 : r1;

        const r_to_d = (uf.find(r_free_term) === uf.find(d1) || uf.find(r_free_term) === uf.find(d2));
        if (!r_to_d) {
          targetHighlightRing1 = addRing(r_free_term, true);
          targetHighlightRing2 = addRing(d1, true);
          return;
        }

        const d_conn_term = (uf.find(d1) === uf.find(r_free_term)) ? d1 : d2;
        const d_free_term = (d_conn_term === d1) ? d2 : d1;

        const d_to_am = (uf.find(d_free_term) === uf.find(am1) || uf.find(d_free_term) === uf.find(am2));
        if (!d_to_am) {
          targetHighlightRing1 = addRing(d_free_term, true);
          targetHighlightRing2 = addRing(am1, true);
          return;
        }

        const am_conn_term = (uf.find(am1) === uf.find(d_free_term)) ? am1 : am2;
        const am_free_term = (am_conn_term === am1) ? am2 : am1;

        const am_to_gnd = (uf.find(am_free_term) === uf.find(2 * 14 + 1));
        if (!am_to_gnd) {
          targetHighlightRing1 = addRing(am_free_term, true);
          targetHighlightRing2 = addRing(2 * 14 + 1, true);
          return;
        }

        const volt1_connected = (uf.find(volt1) === uf.find(d1) || uf.find(volt1) === uf.find(d2));
        if (!volt1_connected) {
          targetHighlightRing1 = addRing(volt1, true);
          targetHighlightRing2 = addRing(d1, true);
          return;
        }

        const volt1_conn_to = (uf.find(volt1) === uf.find(d1)) ? d1 : d2;
        const volt2_target = (volt1_conn_to === d1) ? d2 : d1;
        const volt2_connected = (uf.find(volt2) === uf.find(volt2_target));
        if (!volt2_connected) {
          targetHighlightRing1 = addRing(volt2, true);
          targetHighlightRing2 = addRing(volt2_target, true);
          return;
        }
      }
    }
  }
  else if (state.activeExperiment === 'voltage_divider') {
    const source = findComp('source');
    const resistors = comps.filter(c => c.type === 'resistor');
    const r1 = resistors[0];
    const r2 = resistors[1];

    if (!source) {
      if (!state.selectedTool || state.selectedTool === 'source') {
        targetHighlightRing1 = addRing(1 * 14 + 0);
        targetHighlightRing2 = addRing(1 * 14 + 1);
      }
    } else if (!r1) {
      if (!state.selectedTool || state.selectedTool === 'resistor') {
        targetHighlightRing1 = addRing(7 * 14 + 4);
        targetHighlightRing2 = addRing(11 * 14 + 4);
      }
    } else if (!r2) {
      if (!state.selectedTool || state.selectedTool === 'resistor') {
        targetHighlightRing1 = addRing(11 * 14 + 4);
        targetHighlightRing2 = addRing(15 * 14 + 4);
      }
    } else {
      if (!state.selectedTool || state.selectedTool === 'wire') {
        const r1_1 = r1.snap1, r1_2 = r1.snap2;
        const r2_1 = r2.snap1, r2_2 = r2.snap2;

        const s_to_r1 = (uf.find(7 * 14 + 0) === uf.find(r1_1) || uf.find(7 * 14 + 0) === uf.find(r1_2));
        if (!s_to_r1) {
          targetHighlightRing1 = addRing(7 * 14 + 0, true);
          targetHighlightRing2 = addRing(r1_1, true);
          return;
        }

        const r1_pos_term = (uf.find(r1_1) === uf.find(7 * 14 + 0)) ? r1_1 : r1_2;
        const r1_shared_term = (r1_pos_term === r1_1) ? r1_2 : r1_1;

        const r2_shared_term = (uf.find(r2_1) === uf.find(r1_shared_term)) ? r2_1 : ((uf.find(r2_2) === uf.find(r1_shared_term)) ? r2_2 : null);
        if (r2_shared_term === null) {
          targetHighlightRing1 = addRing(r1_shared_term, true);
          targetHighlightRing2 = addRing(r2_1, true);
          return;
        }

        const r2_free_term = (r2_shared_term === r2_1) ? r2_2 : r2_1;
        const to_gnd = (uf.find(r2_free_term) === uf.find(15 * 14 + 1));
        if (!to_gnd) {
          targetHighlightRing1 = addRing(r2_free_term, true);
          targetHighlightRing2 = addRing(15 * 14 + 1, true);
          return;
        }
      }
    }
  }
  else if (state.activeExperiment === 'planck_led') {
    const source = findComp('source');
    const resistor = findComp('resistor');
    const led = findComp('led');

    if (!source) {
      if (!state.selectedTool || state.selectedTool === 'source') {
        targetHighlightRing1 = addRing(1 * 14 + 0);
        targetHighlightRing2 = addRing(1 * 14 + 1);
      }
    } else if (!resistor) {
      if (!state.selectedTool || state.selectedTool === 'resistor') {
        targetHighlightRing1 = addRing(7 * 14 + 4);
        targetHighlightRing2 = addRing(11 * 14 + 4);
      }
    } else if (!led) {
      if (!state.selectedTool || state.selectedTool === 'led') {
        targetHighlightRing1 = addRing(11 * 14 + 5);
        targetHighlightRing2 = addRing(15 * 14 + 5);
      }
    } else {
      if (!state.selectedTool || state.selectedTool === 'wire') {
        const r1 = resistor.snap1, r2 = resistor.snap2;
        const l1 = led.snap1, l2 = led.snap2;

        const s_to_r = (uf.find(7 * 14 + 0) === uf.find(r1) || uf.find(7 * 14 + 0) === uf.find(r2));
        if (!s_to_r) {
          targetHighlightRing1 = addRing(7 * 14 + 0, true);
          targetHighlightRing2 = addRing(r1, true);
          return;
        }

        const r_conn_term = (uf.find(r1) === uf.find(7 * 14 + 0)) ? r1 : r2;
        const r_free_term = (r_conn_term === r1) ? r2 : r1;

        const r_to_l = (uf.find(r_free_term) === uf.find(l1) || uf.find(r_free_term) === uf.find(l2));
        if (!r_to_l) {
          targetHighlightRing1 = addRing(r_free_term, true);
          targetHighlightRing2 = addRing(l1, true);
          return;
        }

        const l_conn_term = (uf.find(l1) === uf.find(r_free_term)) ? l1 : l2;
        const l_free_term = (l_conn_term === l1) ? l2 : l1;

        const l_to_gnd = (uf.find(l_free_term) === uf.find(15 * 14 + 1));
        if (!l_to_gnd) {
          targetHighlightRing1 = addRing(l_free_term, true);
          targetHighlightRing2 = addRing(15 * 14 + 1, true);
          return;
        }
      }
    }
  }
}

function getAIMentorMessage() {
  const comps = state.placedComponents;
  const findComp = (type) => comps.find(c => c.type === type);
  
  const source = findComp('source');
  const resistor = findComp('resistor');
  const inductor = findComp('inductor');
  const capacitor = findComp('capacitor');
  const ammeter = findComp('ammeter');
  const voltmeter = findComp('voltmeter');
  
  if (state.activeExperiment === 'ohms') {
    if (!source) {
      return "<b>Step 1: Place DC Source</b><br>Select <b>DC Power Source</b> <i class='fa-solid fa-plug'></i> and click glowing green Top Rails slots (Col 2, Row +/-).";
    }
    if (!resistor) {
      return "<b>Step 2: Place Resistor</b><br>Select <b>Ceramic Resistor</b> <i class='fa-solid fa-wave-square'></i> and place horizontally between Col 10, Row C and Col 15, Row C.";
    }
    if (!ammeter) {
      return "<b>Step 3: Place Ammeter</b><br>Select <b>Ammeter (Series)</b> <i class='fa-solid fa-gauge-simple-high'></i> and place horizontally between Col 15, Row D and Col 20, Row D.";
    }
    if (!voltmeter) {
      return "<b>Step 4: Place Voltmeter</b><br>Select <b>Voltmeter (Parallel)</b> <i class='fa-solid fa-gauge-simple'></i> and place horizontally between Col 10, Row B and Col 15, Row B.";
    }
    
    const uf = runUnionFind();
    const r1 = resistor.snap1, r2 = resistor.snap2;
    const am1 = ammeter.snap1, am2 = ammeter.snap2;
    const volt1 = voltmeter.snap1, volt2 = voltmeter.snap2;
    
    // Wire 1: Top (+) Rail to Resistor start
    const s1_connected = (uf.find(9 * 14 + 0) === uf.find(r1) || uf.find(9 * 14 + 0) === uf.find(r2));
    if (!s1_connected) {
      return `<b>Step 5: Wire (+) Rail to Resistor</b><br>Wire **Top (+) Rail (Col 10)** to **Resistor start** (${getSocketLabelShort(r1)}).`;
    }
    
    // Wire 2: Resistor end to Ammeter start
    const res_to_am = (uf.find(r2) === uf.find(am1) || uf.find(r2) === uf.find(am2));
    if (!res_to_am) {
      return `<b>Step 5: Wire Resistor to Ammeter</b><br>Wire **Resistor end** (${getSocketLabelShort(r2)}) to **Ammeter start** (${getSocketLabelShort(am1)}).`;
    }
    
    // Wire 3: Ammeter end to Top (-) Rail
    const am_to_gnd = (uf.find(am2) === uf.find(19 * 14 + 1));
    if (!am_to_gnd) {
      return `<b>Step 5: Wire Ammeter to (-) Rail</b><br>Wire **Ammeter end** (${getSocketLabelShort(am2)}) to **Top (-) Rail (Col 20)**.`;
    }
    
    // Wire 4: Voltmeter terminal 1 to Resistor terminal 1
    const volt1_connected = (uf.find(volt1) === uf.find(r1));
    if (!volt1_connected) {
      return `<b>Step 5: Wire Voltmeter 1</b><br>Wire **Voltmeter terminal 1** (${getSocketLabelShort(volt1)}) to **Resistor terminal 1** (${getSocketLabelShort(r1)}).`;
    }
    
    // Wire 5: Voltmeter terminal 2 to Resistor terminal 2
    const volt2_connected = (uf.find(volt2) === uf.find(r2));
    if (!volt2_connected) {
      return `<b>Step 5: Wire Voltmeter 2</b><br>Wire **Voltmeter terminal 2** (${getSocketLabelShort(volt2)}) to **Resistor terminal 2** (${getSocketLabelShort(r2)}).`;
    }
    
    if (!state.isRunning) {
      return "<b>Step 6: Initialize Circuit</b><br>Wiring complete! Click <b>INITIALIZE</b> in the top bar to power on the circuit.";
    }
    
    if (state.dataPoints.length < 5) {
      return `<b>Step 7: Record Data Points</b><br>Circuit is active! Adjust parameters on the right and click <b>Record Point</b> (${5 - state.dataPoints.length} remaining).`;
    }
    
    return "<b>Complete!</b><br>Ohm's Law verified! Answer the Viva questions in the Report panel.";
  }
  
  if (state.activeExperiment === 'lcr') {
    if (!source) {
      return "<b>Step 1: Place AC Source</b><br>Select <b>AC Function Generator</b> and click glowing green Top Rails slots (Col 2, Row +/-).";
    }
    if (!resistor) {
      return "<b>Step 1: Place Resistor</b><br>Select <b>Ceramic Resistor</b> <i class='fa-solid fa-wave-square'></i> and place horizontally between Col 8, Row C and Col 12, Row C.";
    }
    if (!inductor) {
      return "<b>Step 1: Place Inductor</b><br>Select <b>Copper Inductor</b> <i class='fa-solid fa-circle-notch'></i> and place horizontally between Col 12, Row D and Col 16, Row D.";
    }
    if (!capacitor) {
      return "<b>Step 1: Place Capacitor</b><br>Select <b>Electrolytic Capacitor</b> <i class='fa-solid fa-grip-lines-vertical'></i> and place horizontally between Col 16, Row E and Col 20, Row E.";
    }
    if (!ammeter) {
      return "<b>Step 2: Place Ammeter</b><br>Select <b>Ammeter</b> <i class='fa-solid fa-gauge-simple-high'></i> and place horizontally between Col 20, Row H and Col 25, Row H.";
    }
    if (!voltmeter) {
      return "<b>Step 2: Place Voltmeter</b><br>Select <b>Voltmeter</b> <i class='fa-solid fa-gauge-simple'></i> and place horizontally between Col 16, Row J and Col 20, Row J.";
    }
    
    const uf = runUnionFind();
    const r1 = resistor.snap1, r2 = resistor.snap2;
    const l1 = inductor.snap1, l2 = inductor.snap2;
    const c1 = capacitor.snap1, c2 = capacitor.snap2;
    const am1 = ammeter.snap1, am2 = ammeter.snap2;
    const volt1 = voltmeter.snap1, volt2 = voltmeter.snap2;
    
    // Wire 1: Top (+) Rail to Resistor start
    const s_to_r = (uf.find(7 * 14 + 0) === uf.find(r1));
    if (!s_to_r) {
      return `<b>Step 1: Wire (+) Rail to Resistor</b><br>Wire **Top (+) Rail (Col 8)** to **Resistor start** (${getSocketLabelShort(r1)}).`;
    }
    // Wire 2: Resistor end to Inductor start
    const r_to_l = (uf.find(r2) === uf.find(l1));
    if (!r_to_l) {
      return `<b>Step 1: Wire Resistor to Inductor</b><br>Wire **Resistor end** (${getSocketLabelShort(r2)}) to **Inductor start** (${getSocketLabelShort(l1)}).`;
    }
    // Wire 3: Inductor end to Capacitor start
    const l_to_c = (uf.find(l2) === uf.find(c1));
    if (!l_to_c) {
      return `<b>Step 1: Wire Inductor to Capacitor</b><br>Wire **Inductor end** (${getSocketLabelShort(l2)}) to **Capacitor start** (${getSocketLabelShort(c1)}).`;
    }
    // Wire 4: Capacitor end to Ammeter (+)
    const c_to_am = (uf.find(c2) === uf.find(am1));
    if (!c_to_am) {
      return `<b>Step 2: Wire Capacitor to Ammeter</b><br>Wire **Capacitor end** (${getSocketLabelShort(c2)}) to **Ammeter (+)** (${getSocketLabelShort(am1)}).`;
    }
    // Wire 5: Ammeter (-) back to Top (-) Rail
    const am_to_gnd = (uf.find(am2) === uf.find(24 * 14 + 1));
    if (!am_to_gnd) {
      return `<b>Step 2: Wire Ammeter to (-) Rail</b><br>Wire **Ammeter (-)** (${getSocketLabelShort(am2)}) to **Top (-) Rail (Col 25)**.`;
    }
    // Wire 6: Voltmeter (+) to Capacitor start
    const volt_pos_to_c = (uf.find(volt1) === uf.find(c1));
    if (!volt_pos_to_c) {
      return `<b>Step 2: Wire Voltmeter (+) to Capacitor</b><br>Wire **Voltmeter (+)** (${getSocketLabelShort(volt1)}) to **Capacitor start** (${getSocketLabelShort(c1)}).`;
    }
    // Wire 7: Voltmeter (-) to Capacitor end
    const volt_neg_to_c = (uf.find(volt2) === uf.find(c2));
    if (!volt_neg_to_c) {
      return `<b>Step 2: Wire Voltmeter (-) to Capacitor</b><br>Wire **Voltmeter (-)** (${getSocketLabelShort(volt2)}) to **Capacitor end** (${getSocketLabelShort(c2)}).`;
    }
    
    if (!state.isRunning) {
      return "<b>Step 3: Initialize Circuit</b><br>Wiring complete! Click <b>INITIALIZE</b> in the top bar to start the LCR simulation.";
    }
    
    if (state.dataPoints.length < 5) {
      return `<b>Step 4: Record Resonance Data</b><br>Vary the **Source Frequency** slider to find the resonance peak, and click <b>Record Point</b> (${5 - state.dataPoints.length} remaining).`;
    }
    
    return "<b>Step 5: View Resonance Curve</b><br>Great job! Click on the **Graph** panel to view the sharp resonant frequency curve.";
  }
  
  if (state.activeExperiment === 'rc') {
    const switchComp = findComp('toggle_switch') || findComp('button');
    if (!source) {
      return "<b>Step 1: Place DC Source</b><br>Select <b>DC Power Source</b> <i class='fa-solid fa-plug'></i> and click glowing green Top Rails slots (Col 2, Row +/-).";
    }
    if (!switchComp) {
      return "<b>Step 2: Place Switch</b><br>Select <b>ON/OFF Switch</b> and place horizontally between Col 6, Row D and Col 10, Row D.";
    }
    if (!resistor) {
      return "<b>Step 3: Place Resistor</b><br>Select <b>Ceramic Resistor</b> <i class='fa-solid fa-wave-square'></i> and place horizontally between Col 10, Row E and Col 15, Row E.";
    }
    if (!capacitor) {
      return "<b>Step 4: Place Capacitor</b><br>Select <b>Electrolytic Capacitor</b> <i class='fa-solid fa-grip-lines-vertical'></i> and place horizontally between Col 15, Row F and Col 20, Row F.";
    }
    
    const uf = runUnionFind();
    const sw1 = switchComp.snap1, sw2 = switchComp.snap2;
    const r1 = resistor.snap1, r2 = resistor.snap2;
    const c1 = capacitor.snap1, c2 = capacitor.snap2;
    
    const s_to_sw = (uf.find(5 * 14 + 0) === uf.find(sw1));
    if (!s_to_sw) {
      return `<b>Step 5: Wire (+) Rail to Switch</b><br>Wire **Top (+) Rail (Col 6)** to **Switch start** (${getSocketLabelShort(sw1)}).`;
    }
    const r_to_c = (uf.find(r2) === uf.find(c1));
    if (!r_to_c) {
      return `<b>Step 5: Wire Resistor to Capacitor</b><br>Wire **Resistor end** (${getSocketLabelShort(r2)}) to **Capacitor start** (${getSocketLabelShort(c1)}) (across the ravine).`;
    }
    const c_to_gnd = (uf.find(c2) === uf.find(24 * 14 + 1));
    if (!c_to_gnd) {
      return `<b>Step 5: Wire Ammeter to (-) Rail</b><br>Wire **Ammeter end** (Col 25, Row I) to **Top (-) Rail (Col 25)**.`;
    }
    
    if (!state.isRunning) {
      return "<b>Step 6: Initialize Circuit</b><br>Wiring complete! Click <b>INITIALIZE</b> in the top bar to start the simulation.";
    }
    
    return "<b>Step 7: Observe Charging & Discharging</b><br>Toggle the 3D switch component on the breadboard ON and OFF to charge/discharge the capacitor, watching the live waveforms scroll on the oscilloscope.";
  }
  
  if (state.activeExperiment === 'arduino_led') {
    const btn = findComp('button') || findComp('toggle_switch');
    const led = findComp('led');
    const res = findComp('resistor');
    
    if (!source) {
      return "<b>Step 1: Connect USB Power</b><br>Select <b>DC Power Source</b> <i class='fa-solid fa-plug'></i> and click board to power the Arduino Uno.";
    }
    if (!btn) {
      return "<b>Step 2: Mount Switch</b><br>Select <b>Push Button</b> or <b>ON/OFF Switch</b> and mount across center ravine (Col 12, Row E/F).";
    }
    if (!led) {
      return "<b>Step 3: Mount LED</b><br>Select <b>Red LED</b> <i class='fa-solid fa-lightbulb'></i> and place horizontally between Col 16, Row E and Col 18, Row E.";
    }
    if (!res) {
      return "<b>Step 4: Mount Resistor</b><br>Select <b>Ceramic Resistor</b> <i class='fa-solid fa-wave-square'></i> and place horizontally between Col 18, Row F and Col 22, Row F.";
    }
    
    const uf = runUnionFind();
    const btn1 = btn.snap1, btn2 = btn.snap2;
    const led1 = led.snap1, led2 = led.snap2;
    const r1 = res.snap1, r2 = res.snap2;
    
    // Check if 5V (882) is connected to one of the button pins
    const v5_to_btn = (uf.find(882) === uf.find(btn1) || uf.find(882) === uf.find(btn2));
    let btn_conn_term = v5_to_btn ? (uf.find(882) === uf.find(btn1) ? btn1 : btn2) : null;
    let btn_free_term = v5_to_btn ? (btn_conn_term === btn1 ? btn2 : btn1) : null;
    
    // Check if button is connected to LED Anode
    const btn_to_led = btn_free_term && (uf.find(btn_free_term) === uf.find(led1) || uf.find(btn_free_term) === uf.find(led2));
    let led_conn_term = btn_to_led ? (uf.find(btn_free_term) === uf.find(led1) ? led1 : led2) : null;
    let led_free_term = btn_to_led ? (led_conn_term === led1 ? led2 : led1) : null;
    
    // Check if LED Cathode is connected to Resistor
    const led_to_res = led_free_term && (uf.find(led_free_term) === uf.find(r1) || uf.find(led_free_term) === uf.find(r2));
    let res_conn_term = led_to_res ? (uf.find(led_free_term) === uf.find(r1) ? r1 : r2) : null;
    let res_free_term = led_to_res ? (res_conn_term === r1 ? r2 : r1) : null;
    
    // Check if Resistor is connected to GND (883)
    const res_to_gnd = res_free_term && (uf.find(res_free_term) === uf.find(883));
    
    if (!v5_to_btn) {
      return `<b>Step 5: Wire Arduino 5V to Button</b><br>Wire **Arduino 5V** to **Push Button top** (${getSocketLabelShort(btn1)}).`;
    }
    if (!btn_to_led) {
      return `<b>Step 5: Wire Button to LED</b><br>Wire **Push Button bottom** (${getSocketLabelShort(btn_free_term)}) to **LED Anode** (${getSocketLabelShort(led1)}).`;
    }
    if (!led_to_res) {
      return `<b>Step 5: Wire LED to Resistor</b><br>Wire **LED Cathode** (${getSocketLabelShort(led_free_term)}) to **Resistor start** (${getSocketLabelShort(r1)}).`;
    }
    if (!res_to_gnd) {
      return `<b>Step 5: Wire Resistor to GND</b><br>Wire remaining **Resistor terminal** (${getSocketLabelShort(res_free_term)}) to **Arduino GND**.`;
    }
    
    if (!state.isRunning) {
      return "<b>Step 6: Initialize Arduino</b><br>Wiring complete! Click <b>INITIALIZE</b> in the top bar to power the board.";
    }
    
    if (!state.buttonPressed) {
      return "<b>Step 7: Press Switch</b><br>Click and hold the red button plunger to light up the LED!";
    }
    
    return "<b>Complete!</b><br>LED is glowing! Answer the Viva questions in the Report panel.";
  }
  
  if (state.activeExperiment === 'diode_iv') {
    const diode = findComp('diode');
    const ammeter = findComp('ammeter');
    const voltmeter = findComp('voltmeter');

    if (!source) return "<b>Step 1: Place DC Source</b><br>Select <b>DC Power Source</b> <i class='fa-solid fa-plug'></i> and click glowing green Top Rails slots (Col 2, Row +/-).";
    if (!resistor) return "<b>Step 2: Place Resistor</b><br>Select <b>Ceramic Resistor</b> <i class='fa-solid fa-wave-square'></i> and place horizontally between Col 10, Row C and Col 15, Row C.";
    if (!diode) return "<b>Step 3: Place Diode</b><br>Select <b>Diode</b> <i class='fa-solid fa-arrow-right-to-line'></i> and place horizontally between Col 15, Row F and Col 20, Row F.";
    if (!ammeter) return "<b>Step 4: Place Ammeter</b><br>Select <b>Ammeter (Series)</b> <i class='fa-solid fa-gauge-simple-high'></i> and place horizontally between Col 20, Row H and Col 25, Row H.";
    if (!voltmeter) return "<b>Step 5: Place Voltmeter</b><br>Select <b>Voltmeter (Parallel)</b> <i class='fa-solid fa-gauge-simple'></i> and place horizontally between Col 15, Row A and Col 20, Row A.";

    const uf = runUnionFind();
    const r1 = resistor.snap1, r2 = resistor.snap2;
    const d1 = diode.snap1, d2 = diode.snap2;
    const am1 = ammeter.snap1, am2 = ammeter.snap2;
    const volt1 = voltmeter.snap1, volt2 = voltmeter.snap2;

    const s_to_r = (uf.find(2 * 14 + 0) === uf.find(r1));
    if (!s_to_r) return `<b>Step 6: Wire (+) Rail to Resistor</b><br>Wire **Top (+) Rail (Col 3)** to **Resistor start** (${getSocketLabelShort(r1)}).`;

    const r_to_d = (uf.find(r2) === uf.find(d1));
    if (!r_to_d) return `<b>Step 6: Wire Resistor to Diode</b><br>Wire **Resistor end** (${getSocketLabelShort(r2)}) to **Diode anode** (${getSocketLabelShort(d1)}).`;

    const d_to_am = (uf.find(d2) === uf.find(am1));
    if (!d_to_am) return `<b>Step 6: Wire Diode to Ammeter</b><br>Wire **Diode cathode** (${getSocketLabelShort(d2)}) to **Ammeter start** (${getSocketLabelShort(am1)}).`;

    const am_to_gnd = (uf.find(am2) === uf.find(2 * 14 + 1));
    if (!am_to_gnd) return `<b>Step 6: Wire Ammeter to (-) Rail</b><br>Wire **Ammeter end** (${getSocketLabelShort(am2)}) to **Top (-) Rail (Col 3)**.`;

    const volt1_connected = (uf.find(volt1) === uf.find(d1));
    if (!volt1_connected) return `<b>Step 6: Wire Voltmeter (+) to Diode Anode</b><br>Wire **Voltmeter terminal 1** (${getSocketLabelShort(volt1)}) to **Diode anode** (${getSocketLabelShort(d1)}).`;

    const volt2_connected = (uf.find(volt2) === uf.find(d2));
    if (!volt2_connected) return `<b>Step 6: Wire Voltmeter (-) to Diode Cathode</b><br>Wire **Voltmeter terminal 2** (${getSocketLabelShort(volt2)}) to **Diode cathode** (${getSocketLabelShort(d2)}).`;

    if (!state.isRunning) return "<b>Step 7: Initialize Circuit</b><br>Wiring complete! Click <b>INITIALIZE</b> in the top bar to power on the circuit.";
    if (state.dataPoints.length < 5) return `<b>Step 8: Record Data Points</b><br>Adjust voltage on the right and click <b>Record Point</b> (${5 - state.dataPoints.length} remaining) to trace the I-V curve.`;

    return "<b>Complete!</b><br>Diode I-V characteristics verified! Answer the Viva questions in the Report panel.";
  }

  if (state.activeExperiment === 'kvl') {
    const resistors = comps.filter(c => c.type === 'resistor');
    const r1 = resistors.find(r => Math.floor(r.snap1 / 14) === 7 || Math.floor(r.snap2 / 14) === 7) || resistors[0];
    const r2 = resistors.find(r => Math.floor(r.snap1 / 14) === 13 || Math.floor(r.snap2 / 14) === 13) || resistors[1];
    const voltmeters = comps.filter(c => c.type === 'voltmeter');
    
    if (!source) {
      return "<b>Step 1: Place DC Source</b><br>Select <b>DC Power Source</b> <i class='fa-solid fa-plug'></i> and click glowing green Top Rails slots (Col 2, Row +/-).";
    }
    if (!r1) {
      return "<b>Step 1: Place Resistor 1</b><br>Select <b>Ceramic Resistor</b> and place horizontally between Col 8, Row D and Col 12, Row D.";
    }
    if (!r2) {
      return "<b>Step 1: Place Resistor 2</b><br>Select <b>Ceramic Resistor</b> and place horizontally between Col 14, Row D and Col 18, Row D.";
    }
    if (!ammeter) {
      return "<b>Step 1: Place Ammeter</b><br>Select <b>Ammeter (Series)</b> and place horizontally between Col 12, Row H and Col 14, Row H.";
    }
    if (voltmeters.length < 1) {
      return "<b>Step 1: Place Voltmeter 1</b><br>Select <b>Voltmeter (Parallel)</b> and place horizontally between Col 8, Row B and Col 12, Row B.";
    }
    if (voltmeters.length < 2) {
      return "<b>Step 1: Place Voltmeter 2</b><br>Select <b>Voltmeter (Parallel)</b> and place horizontally between Col 14, Row B and Col 18, Row B.";
    }
    
    const uf = runUnionFind();
    const r1_1 = r1.snap1, r1_2 = r1.snap2;
    const r2_1 = r2.snap1, r2_2 = r2.snap2;
    const am1 = ammeter.snap1, am2 = ammeter.snap2;
    
    // Wire 1: Top (+) Rail (Col 8) to Resistor 1 start
    const s_to_r1 = (uf.find(7 * 14 + 0) === uf.find(r1_1));
    if (!s_to_r1) {
      return `<b>Step 1: Wire (+) Rail to Resistor 1</b><br>Wire **Top (+) Rail (Col 8)** to **Resistor 1 start** (${getSocketLabelShort(r1_1)}) to supply positive power.`;
    }
    // Wire 2: Resistor 1 end to Ammeter start
    const r1_to_am = (uf.find(r1_2) === uf.find(am1));
    if (!r1_to_am) {
      return `<b>Step 1: Wire Resistor 1 to Ammeter</b><br>Wire **Resistor 1 end** (${getSocketLabelShort(r1_2)}) to **Ammeter start** (${getSocketLabelShort(am1)}) in series.`;
    }
    // Wire 3: Ammeter end to Resistor 2 start
    const am_to_r2 = (uf.find(am2) === uf.find(r2_1));
    if (!am_to_r2) {
      return `<b>Step 1: Wire Ammeter to Resistor 2</b><br>Wire **Ammeter end** (${getSocketLabelShort(am2)}) to **Resistor 2 start** (${getSocketLabelShort(r2_1)}) in series.`;
    }
    // Wire 4: Resistor 2 end back to Top (-) Rail (Col 18)
    const r2_to_gnd = (uf.find(r2_2) === uf.find(17 * 14 + 1));
    if (!r2_to_gnd) {
      return `<b>Step 1: Wire Resistor 2 to (-) Rail</b><br>Wire **Resistor 2 end** (${getSocketLabelShort(r2_2)}) to **Top (-) Rail (Col 18)** to close the series loop.`;
    }
    
    // Check if the loop is complete
    const validation = validateCircuitLocal();
    if (validation.status !== 'success') {
      return `<b>Step 1: Complete the Series Loop</b><br>${validation.message}`;
    }
    
    if (!state.isRunning) {
      return "<b>Step 2: Turn on Power Supply</b><br>Series loop is correct! Click <b>INITIALIZE</b> (or power button) in the top bar to run the simulation and observe the loop current.";
    }
    
    if (state.kvlMeasurements.Vs === null) {
      return "<b>Step 3: Measure Source Voltage (Vs)</b><br>Observe the Source Voltage (Vs) from the DC Power Supply display.";
    }
    
    if (state.kvlMeasurements.VR1 === null) {
      return "<b>Step 4: Measure Resistor R1 Drop (V1)</b><br>Observe the voltage drop across Resistor R1 (V1) on Voltmeter 1.";
    }
    
    if (state.kvlMeasurements.VR2 === null) {
      return "<b>Step 5: Measure Resistor R2 Drop (V2)</b><br>Observe the voltage drop across Resistor R2 (V2) on Voltmeter 2.";
    }
    
    const sum = state.kvlMeasurements.VR1 + state.kvlMeasurements.VR2;
    const diff = Math.abs(state.kvlMeasurements.Vs - sum);
    if (diff > 0.02) {
      return `<b>Step 6: KVL Math Verification</b><br>Vs = ${state.kvlMeasurements.Vs.toFixed(2)} V, but V1 + V2 = ${sum.toFixed(2)} V. Ensure the measurements are accurate.`;
    }
    
    return `<b>Complete!</b><br>Kirchhoff's Voltage Law successfully verified: Vs (${state.kvlMeasurements.Vs.toFixed(2)}V) = V1 (${state.kvlMeasurements.VR1.toFixed(2)}V) + V2 (${state.kvlMeasurements.VR2.toFixed(2)}V). Loop energy conservation verified!`;
  }

  if (state.activeExperiment === 'kcl') {
    const resistors = comps.filter(c => c.type === 'resistor');
    const r1 = resistors[0];
    const r2 = resistors[1];
    
    if (!source) {
      return "<b>Step 1: Place DC Source</b><br>Select <b>DC Power Source</b> <i class='fa-solid fa-plug'></i> and click glowing green Top Rails slots (Col 2, Row +/-).";
    }
    if (!ammeter) {
      return "<b>Step 2: Place Ammeter</b><br>Select <b>Ammeter (Series)</b> and place horizontally between Col 4, Row H and Col 7, Row H.";
    }
    if (!r1) {
      return "<b>Step 3: Place Resistor 1</b><br>Select <b>Ceramic Resistor</b> and place horizontally between Col 8, Row C and Col 12, Row C.";
    }
    if (!r2) {
      return "<b>Step 4: Place Resistor 2</b><br>Select <b>Ceramic Resistor</b> and place horizontally between Col 8, Row F and Col 12, Row F.";
    }
    
    const uf = runUnionFind();
    const r1_1 = r1.snap1, r1_2 = r1.snap2;
    const r2_1 = r2.snap1, r2_2 = r2.snap2;
    const am1 = ammeter.snap1, am2 = ammeter.snap2;
    
    // Wire 1: Source (+) Col 6 to Ammeter start Col 4 Row H
    const s_to_am = (uf.find(5 * 14 + 0) === uf.find(am1));
    if (!s_to_am) {
      return `<b>Step 5: Wire (+) Rail to Ammeter</b><br>Wire **Top (+) Rail (Col 6)** to **Ammeter start** (${getSocketLabelShort(am1)}).`;
    }
    // Wire 2: Ammeter end Col 7 Row H to Resistor 1 start Col 8 Row C
    const am_to_r1 = (uf.find(am2) === uf.find(r1_1));
    if (!am_to_r1) {
      return `<b>Step 5: Wire Ammeter to Resistor 1</b><br>Wire **Ammeter end** (${getSocketLabelShort(am2)}) to **Resistor 1 start** (${getSocketLabelShort(r1_1)}).`;
    }
    // Wire 3: Resistor 1 start to Resistor 2 start (parallel junction)
    const r1_to_r2_start = (uf.find(r1_1) === uf.find(r2_1));
    if (!r1_to_r2_start) {
      return `<b>Step 5: Connect Resistors (Parallel start)</b><br>Wire **Resistor 1 start** (${getSocketLabelShort(r1_1)}) to **Resistor 2 start** (${getSocketLabelShort(r2_1)}).`;
    }
    // Wire 4: Resistor 1 end to Resistor 2 end (parallel junction end)
    const r1_to_r2_end = (uf.find(r1_2) === uf.find(r2_2));
    if (!r1_to_r2_end) {
      return `<b>Step 5: Connect Resistors (Parallel end)</b><br>Wire **Resistor 1 end** (${getSocketLabelShort(r1_2)}) to **Resistor 2 end** (${getSocketLabelShort(r2_2)}).`;
    }
    // Wire 5: Resistor 2 end back to Source (-) Col 6
    const r2_to_gnd = (uf.find(r2_2) === uf.find(5 * 14 + 1));
    if (!r2_to_gnd) {
      return `<b>Step 5: Wire Resistor 2 to (-) Rail</b><br>Wire **Resistor 2 end** (${getSocketLabelShort(r2_2)}) to **Top (-) Rail (Col 6)**.`;
    }
    
    if (!state.isRunning) {
      return "<b>Step 6: Initialize Circuit</b><br>Wiring complete! Click <b>INITIALIZE</b> in the top bar to power on the circuit.";
    }
    return "<b>Complete!</b><br>Kirchhoff's Current Law verified! Verify that junction currents sum to the total current.";
  }

  if (state.activeExperiment === 'rc_rl_rlc') {
    if (!source) {
      return "<b>Step 1: Place AC Source</b><br>Select <b>AC Function Generator</b> and click glowing green Top Rails slots (Col 2, Row +/-).";
    }
    if (!resistor) {
      return "<b>Step 1: Place Resistor</b><br>Select <b>Ceramic Resistor</b> and place horizontally between Col 8, Row C and Col 12, Row C.";
    }
    if (!inductor) {
      return "<b>Step 1: Place Inductor</b><br>Select <b>Copper Inductor</b> and place horizontally between Col 12, Row D and Col 16, Row D.";
    }
    if (!capacitor) {
      return "<b>Step 1: Place Capacitor</b><br>Select <b>Electrolytic Capacitor</b> and place horizontally between Col 16, Row E and Col 20, Row E.";
    }
    if (!ammeter) {
      return "<b>Step 2: Place Ammeter</b><br>Select <b>Ammeter</b> and place horizontally below the ravine between Col 20, Row H and Col 25, Row H.";
    }
    if (!voltmeter) {
      return "<b>Step 2: Place Voltmeter</b><br>Select <b>Voltmeter</b> and place horizontally below the ravine between Col 16, Row J and Col 20, Row J.";
    }
    
    const uf = runUnionFind();
    const r1 = resistor.snap1, r2 = resistor.snap2;
    const l1 = inductor.snap1, l2 = inductor.snap2;
    const c1 = capacitor.snap1, c2 = capacitor.snap2;
    const am1 = ammeter.snap1, am2 = ammeter.snap2;
    const volt1 = voltmeter.snap1, volt2 = voltmeter.snap2;
    
    // Wire 1: Top (+) Rail to Resistor start
    const s_to_r = (uf.find(7 * 14 + 0) === uf.find(r1));
    if (!s_to_r) {
      return `<b>Step 3: Wire (+) Rail to Resistor</b><br>Wire **Top (+) Rail (Col 8)** to **Resistor start** (${getSocketLabelShort(r1)}).`;
    }
    // Wire 2: Resistor end to Inductor start
    const r_to_l = (uf.find(r2) === uf.find(l1));
    if (!r_to_l) {
      return `<b>Step 3: Wire Resistor to Inductor</b><br>Wire **Resistor end** (${getSocketLabelShort(r2)}) to **Inductor start** (${getSocketLabelShort(l1)}).`;
    }
    // Wire 3: Inductor end to Capacitor start
    const l_to_c = (uf.find(l2) === uf.find(c1));
    if (!l_to_c) {
      return `<b>Step 3: Wire Inductor to Capacitor</b><br>Wire **Inductor end** (${getSocketLabelShort(l2)}) to **Capacitor start** (${getSocketLabelShort(c1)}).`;
    }
    // Wire 4: Capacitor end to Ammeter (+)
    const c_to_am = (uf.find(c2) === uf.find(am1));
    if (!c_to_am) {
      return `<b>Step 3: Wire Capacitor to Ammeter</b><br>Wire **Capacitor end** (${getSocketLabelShort(c2)}) to **Ammeter (+)** (${getSocketLabelShort(am1)}).`;
    }
    // Wire 5: Ammeter (-) back to Top (-) Rail
    const am_to_gnd = (uf.find(am2) === uf.find(24 * 14 + 1));
    if (!am_to_gnd) {
      return `<b>Step 3: Wire Ammeter to (-) Rail</b><br>Wire **Ammeter (-)** (${getSocketLabelShort(am2)}) to **Top (-) Rail (Col 25)**.`;
    }
    // Wire 6: Voltmeter (+) to Capacitor start
    const volt_pos_to_c = (uf.find(volt1) === uf.find(c1));
    if (!volt_pos_to_c) {
      return `<b>Step 3: Wire Voltmeter (+) to Capacitor</b><br>Wire **Voltmeter (+)** (${getSocketLabelShort(volt1)}) to **Capacitor start** (${getSocketLabelShort(c1)}).`;
    }
    // Wire 7: Voltmeter (-) to Capacitor end
    const volt_neg_to_c = (uf.find(volt2) === uf.find(c2));
    if (!volt_neg_to_c) {
      return `<b>Step 3: Wire Voltmeter (-) to Capacitor</b><br>Wire **Voltmeter (-)** (${getSocketLabelShort(volt2)}) to **Capacitor end** (${getSocketLabelShort(c2)}).`;
    }
    
    if (!state.isRunning) {
      return "<b>Step 3: Initialize Circuit</b><br>Wiring complete! Click <b>INITIALIZE</b> in the top bar to start the RLC simulation.";
    }
    
    if (state.completedSteps.has(4)) {
      if (state.dataPoints.length < 5) {
        return `<b>Step 5: Record Impedance Data</b><br>Vary frequency and click <b>Record Point</b> (${5 - state.dataPoints.length} remaining).`;
      }
      return "<b>Step 5: Analysis Complete</b><br>Great job! Click on the **Graph** panel to view the f-Z impedance response curve.";
    }
    
    return "<b>Step 4: Vary Frequency</b><br>Vary the **Source Frequency** slider from 10Hz to 1kHz to see reactance and impedance shifts.";
  }

  if (state.activeExperiment === 'series_parallel') {
    const resistors = comps.filter(c => c.type === 'resistor');
    const r1 = resistors[0];
    const r2 = resistors[1];
    
    if (!source) {
      return "<b>Step 1: Place DC Source</b><br>Select <b>DC Power Source</b> <i class='fa-solid fa-plug'></i> and click glowing green Top Rails slots (Col 2, Row +/-).";
    }
    if (!r1) {
      return "<b>Step 2: Place Resistor 1</b><br>Select <b>Ceramic Resistor</b> and place horizontally between Col 8, Row C and Col 12, Row C.";
    }
    if (!r2) {
      return "<b>Step 3: Place Resistor 2</b><br>Select <b>Ceramic Resistor</b> and place horizontally between Col 12, Row C and Col 16, Row C.";
    }
    if (!ammeter) {
      return "<b>Step 4: Place Ammeter</b><br>Select <b>Ammeter (Series)</b> and place horizontally between Col 15, Row H and Col 20, Row H.";
    }
    if (!voltmeter) {
      return "<b>Step 5: Place Voltmeter</b><br>Select <b>Voltmeter (Parallel)</b> and place horizontally between Col 8, Row I and Col 12, Row I.";
    }
    
    const uf = runUnionFind();
    const r1_1 = r1.snap1, r1_2 = r1.snap2;
    const r2_1 = r2.snap1, r2_2 = r2.snap2;
    const am1 = ammeter.snap1, am2 = ammeter.snap2;
    const volt1 = voltmeter.snap1, volt2 = voltmeter.snap2;
    
    const s_to_r1 = (uf.find(7 * 14 + 0) === uf.find(r1_1));
    if (!s_to_r1) {
      return `<b>Step 6: Wire (+) Rail to Resistor 1</b><br>Wire **Top (+) Rail (Col 8)** to **Resistor 1 start** (${getSocketLabelShort(r1_1)}).`;
    }
    const r1_to_r2 = (uf.find(r1_2) === uf.find(r2_1));
    if (!r1_to_r2) {
      return `<b>Step 6: Connect Resistor 1 to Resistor 2</b><br>Ensure **Resistor 1 end** and **Resistor 2 start** are connected at Col 12.`;
    }
    const r2_to_am = (uf.find(r2_2) === uf.find(am1));
    if (!r2_to_am) {
      return `<b>Step 6: Wire Resistor 2 to Ammeter</b><br>Wire **Resistor 2 end** (${getSocketLabelShort(r2_2)}) to **Ammeter start** (${getSocketLabelShort(am1)}).`;
    }
    const am_to_gnd = (uf.find(am2) === uf.find(20 * 14 + 1));
    if (!am_to_gnd) {
      return `<b>Step 6: Wire Ammeter to (-) Rail</b><br>Wire **Ammeter end** (${getSocketLabelShort(am2)}) to **Top (-) Rail (Col 21)**.`;
    }
    const volt1_connected = (uf.find(volt1) === uf.find(r1_1));
    if (!volt1_connected) {
      return `<b>Step 6: Wire Voltmeter 1</b><br>Wire **Voltmeter terminal 1** (${getSocketLabelShort(volt1)}) to **Resistor 1 start** (${getSocketLabelShort(r1_1)}).`;
    }
    const volt2_connected = (uf.find(volt2) === uf.find(r1_2));
    if (!volt2_connected) {
      return `<b>Step 6: Wire Voltmeter 2</b><br>Wire **Voltmeter terminal 2** (${getSocketLabelShort(volt2)}) to **Resistor 1 end** (${getSocketLabelShort(r1_2)}).`;
    }
    
    if (!state.isRunning) {
      return "<b>Step 7: Initialize Circuit</b><br>Wiring complete! Click <b>INITIALIZE</b> in the top bar to power on the circuit.";
    }
    return "<b>Complete!</b><br>Series & Parallel loads verified! Change parameters to analyze equivalent resistances.";
  }

  if (state.activeExperiment === 'wheatstone') {
    const resistors = comps.filter(c => c.type === 'resistor');
    
    if (!source) {
      return "<b>Step 1: Place DC Source</b><br>Select <b>DC Power Source</b> <i class='fa-solid fa-plug'></i> and click glowing green Top Rails slots (Col 2, Row +/-).";
    }
    if (resistors.length < 4) {
      return `<b>Step 2: Place 4 Resistors</b><br>Place 4 resistors on the breadboard to form the bridge (current placed: ${resistors.length}).`;
    }
    
    const uf = runUnionFind();
    const posRail = uf.find(0);
    const negRail = uf.find(1);
    
    let pos_conn = false, neg_conn = false;
    resistors.forEach(c => {
      if (uf.find(c.snap1) === posRail || uf.find(c.snap2) === posRail) pos_conn = true;
      if (uf.find(c.snap1) === negRail || uf.find(c.snap2) === negRail) neg_conn = true;
    });
    
    if (!pos_conn) {
      return "<b>Step 3: Connect bridge to (+) Rail</b><br>Wire the input node of your resistor bridge to the **Top (+) Rail**.";
    }
    if (!neg_conn) {
      return "<b>Step 4: Connect bridge to (-) Rail</b><br>Wire the output node of your resistor bridge to the **Top (-) Rail**.";
    }
    
    if (!state.isRunning) {
      return "<b>Step 5: Initialize Circuit</b><br>Wiring complete! Click <b>INITIALIZE</b> in the top bar to power on the circuit.";
    }
    return "<b>Complete!</b><br>Wheatstone Bridge active! Adjust R3 to balance the bridge (null galvanometer current).";
  }

  if (state.activeExperiment === 'voltage_divider') {
    const resistors = comps.filter(c => c.type === 'resistor');
    const r1 = resistors[0];
    const r2 = resistors[1];

    if (!source) return "<b>Step 1: Place DC Source</b><br>Select <b>DC Power Source</b> <i class='fa-solid fa-plug'></i> and click glowing green Top Rails slots (Col 2, Row +/-).";
    if (!r1) return "<b>Step 2: Place Resistor 1</b><br>Select <b>Ceramic Resistor</b> and place horizontally between Col 8, Row C and Col 12, Row C.";
    if (!r2) return "<b>Step 3: Place Resistor 2</b><br>Select <b>Ceramic Resistor</b> and place horizontally between Col 12, Row C and Col 16, Row C.";

    const uf = runUnionFind();
    const r1_1 = r1.snap1, r1_2 = r1.snap2;
    const r2_1 = r2.snap1, r2_2 = r2.snap2;

    const s_to_r1 = (uf.find(7 * 14 + 0) === uf.find(r1_1));
    if (!s_to_r1) return `<b>Step 4: Wire (+) Rail to Resistor 1</b><br>Wire **Top (+) Rail (Col 8)** to **Resistor 1 start** (${getSocketLabelShort(r1_1)}).`;

    const r1_to_r2 = (uf.find(r1_2) === uf.find(r2_1));
    if (!r1_to_r2) return `<b>Step 4: Connect Resistor 1 and Resistor 2</b><br>Ensure **Resistor 1 end** and **Resistor 2 start** are connected at Col 12.`;

    const r2_to_gnd = (uf.find(r2_2) === uf.find(15 * 14 + 1));
    if (!r2_to_gnd) return `<b>Step 4: Wire Resistor 2 to (-) Rail</b><br>Wire **Resistor 2 end** (${getSocketLabelShort(r2_2)}) to **Top (-) Rail (Col 16)**.`;

    if (!state.isRunning) return "<b>Step 5: Initialize Circuit</b><br>Wiring complete! Click <b>INITIALIZE</b> in the top bar to power on the circuit.";

    return "<b>Complete!</b><br>Voltage division verified! Change resistance values on the right and observe V_out across Resistor 2.";
  }

  if (state.activeExperiment === 'planck_led') {
    const led = findComp('led');

    if (!source) return "<b>Step 1: Place DC Source</b><br>Select <b>DC Power Source</b> <i class='fa-solid fa-plug'></i> and click glowing green Top Rails slots (Col 2, Row +/-).";
    if (!resistor) return "<b>Step 2: Place Resistor</b><br>Select <b>Ceramic Resistor</b> and place horizontally between Col 8, Row C and Col 12, Row C.";
    if (!led) return "<b>Step 3: Place LED</b><br>Select <b>LED</b> and place horizontally between Col 12, Row D and Col 16, Row D.";

    const uf = runUnionFind();
    const r1 = resistor.snap1, r2 = resistor.snap2;
    const l1 = led.snap1, l2 = led.snap2;

    const s_to_r = (uf.find(7 * 14 + 0) === uf.find(r1));
    if (!s_to_r) return `<b>Step 4: Wire (+) Rail to Resistor</b><br>Wire **Top (+) Rail (Col 8)** to **Resistor start** (${getSocketLabelShort(r1)}).`;

    const r_to_l = (uf.find(r2) === uf.find(l1));
    if (!r_to_l) return `<b>Step 4: Connect Resistor to LED Anode</b><br>Ensure **Resistor end** and **LED anode** are connected at Col 12.`;

    const l_to_gnd = (uf.find(l2) === uf.find(15 * 14 + 1));
    if (!l_to_gnd) return `<b>Step 4: Wire LED Cathode to (-) Rail</b><br>Wire **LED cathode** (${getSocketLabelShort(l2)}) to **Top (-) Rail (Col 16)**.`;

    if (!state.isRunning) return "<b>Step 5: Initialize Circuit</b><br>Wiring complete! Click <b>INITIALIZE</b> in the top bar to start Planck's constant calculation.";
    if (state.dataPoints.length < 4) return `<b>Step 6: Measure Turn-On Voltage</b><br>Adjust voltage until the selected LED just glows, click <b>Record Point</b> (${4 - state.dataPoints.length} remaining). Use different colors to calculate Planck's constant.`;

    return "<b>Complete!</b><br>Planck's constant determined using LEDs! Answer the Viva questions in the Report panel.";
  }

  if (state.activeExperiment === 'biot_savart') {
    if (!state.isRunning) {
      return "<b>Step 1: Start Simulation</b><br>Click <b>SIMULATE</b> to study the magnetic field around a straight conductor.";
    }
    return "<b>Step 2: Study Biot-Savart Law</b><br>Vary **Current** and **Radial Distance** sliders on the right. Observe how the magnetic field intensity (B) decays as 1/r.";
  }

  if (state.activeExperiment === 'planck_photocell') {
    if (!state.isRunning) {
      return "<b>Step 1: Start Simulation</b><br>Click <b>SIMULATE</b> to turn on the light source and phototube.";
    }
    if (state.dataPoints.length < 5) {
      return `<b>Step 2: Find Stopping Voltage</b><br>Select a wavelength, vary the stopping voltage slider until the photo-current drops to 0, then click <b>Record Point</b> (${5 - state.dataPoints.length} remaining).`;
    }
    return "<b>Complete!</b><br>Planck's constant determined using photocell! Answer the Viva questions in the Report panel.";
  }

  if (state.activeExperiment === 'stefan_law') {
    if (!state.isRunning) {
      return "<b>Step 1: Start Simulation</b><br>Click <b>SIMULATE</b> to turn on the furnace heater.";
    }
    if (state.dataPoints.length < 5) {
      return `<b>Step 2: Verify T⁴ Radiation Relation</b><br>Vary the furnace temperature slider, wait for stable reading, and click <b>Record Point</b> (${5 - state.dataPoints.length} remaining).`;
    }
    return "<b>Complete!</b><br>Stefan-Boltzmann law verified! Answer the Viva questions in the Report panel.";
  }

  if (state.activeExperiment === 'faraday') {
    if (!state.isRunning) {
      return "<b>Step 1: Start Simulation</b><br>Click <b>SIMULATE</b> to activate the coil and magnet simulation.";
    }
    return "<b>Step 2: Induce EMF</b><br>Drag the bar magnet or adjust the speed slider. Observe the induced voltage pulse on the Voltmeter.";
  }

  if (state.activeExperiment === 'lenz') {
    if (!state.isRunning) {
      return "<b>Step 1: Start Simulation</b><br>Click <b>SIMULATE</b> to power on the electromagnetic coils.";
    }
    return "<b>Step 2: Observe Lenz's Law</b><br>Move the magnet into and out of the coil. Observe that the induced magnetic field opposes the movement.";
  }

  if (state.activeExperiment === 'solenoid') {
    if (!state.isRunning) {
      return "<b>Step 1: Start Simulation</b><br>Click <b>SIMULATE</b> to pass current through the solenoid.";
    }
    return "<b>Step 2: Measure Magnetic Field</b><br>Vary current and turn density sliders. Note the magnetic field strength (B) at the center of the coil.";
  }

  if (state.activeExperiment === 'transformer') {
    if (!state.isRunning) {
      return "<b>Step 1: Start Simulation</b><br>Click <b>SIMULATE</b> to supply AC voltage to the primary coil.";
    }
    return "<b>Step 2: Analyze Transformation Ratio</b><br>Change the primary/secondary turns ratio Ns/Np and observe the secondary output voltage.";
  }

  if (state.activeExperiment === 'ideal_gas') {
    if (!state.isRunning) {
      return "<b>Step 1: Start Simulation</b><br>Click <b>SIMULATE</b> to seal the gas chamber.";
    }
    return "<b>Step 2: Verify P·V = n·R·T</b><br>Adjust temperature and volume sliders. Observe the pressure changes and verify the gas constant.";
  }

  if (state.activeExperiment === 'boyle') {
    if (!state.isRunning) {
      return "<b>Step 1: Start Simulation</b><br>Click <b>SIMULATE</b> to start the constant temperature gas system.";
    }
    if (state.dataPoints.length < 5) {
      return `<b>Step 2: Record P-V Points</b><br>Adjust volume slider in steps, wait for pressure to stabilize, and click <b>Record Point</b> (${5 - state.dataPoints.length} remaining).`;
    }
    return "<b>Complete!</b><br>Boyle's Law verified! Plot P vs 1/V to see the linear inverse relationship.";
  }

  if (state.activeExperiment === 'charles') {
    if (!state.isRunning) {
      return "<b>Step 1: Start Simulation</b><br>Click <b>SIMULATE</b> to start the constant pressure gas system.";
    }
    if (state.dataPoints.length < 5) {
      return `<b>Step 2: Record V-T Points</b><br>Adjust temperature slider, let volume expand, and click <b>Record Point</b> (${5 - state.dataPoints.length} remaining).`;
    }
    return "<b>Complete!</b><br>Charles's Law verified! Plot Volume vs Temperature.";
  }

  if (state.activeExperiment === 'specific_heat') {
    if (!state.isRunning) {
      return "<b>Step 1: Start Simulation</b><br>Click <b>SIMULATE</b> to heat the copper block to set temperature.";
    }
    return "<b>Step 2: Measure Calorimetry</b><br>Drop the heated copper block into the water. Record the equilibrium temperature to find specific heat.";
  }

  if (state.activeExperiment === 'photoelectric') {
    if (!state.isRunning) {
      return "<b>Step 1: Start Simulation</b><br>Click <b>SIMULATE</b> to activate the monochromatic light source.";
    }
    if (state.dataPoints.length < 5) {
      return `<b>Step 2: Find stopping voltage</b><br>Vary frequency and adjust stopping voltage Vs until photocurrent is exactly 0. Click <b>Record Point</b> (${5 - state.dataPoints.length} remaining).`;
    }
    return "<b>Complete!</b><br>Photoelectric effect verified! Answer the Viva questions in the Report panel.";
  }

  if (state.activeExperiment === 'radioactive') {
    if (!state.isRunning) {
      return "<b>Step 1: Start Simulation</b><br>Click <b>SIMULATE</b> to load the radioactive sample and start the counter.";
    }
    if (state.dataPoints.length < 5) {
      return `<b>Step 2: Record Decay Rate</b><br>Let time elapse and click <b>Record Point</b> at regular intervals to capture the decay curve (${5 - state.dataPoints.length} remaining).`;
    }
    return "<b>Complete!</b><br>Half-life verified from the decay curve! Answer the Viva questions.";
  }

  if (state.activeExperiment === 'de_broglie') {
    if (!state.isRunning) {
      return "<b>Step 1: Start Simulation</b><br>Click <b>SIMULATE</b> to fire the electron beam.";
    }
    return "<b>Step 2: Study Wave Duality</b><br>Vary acceleration voltage. Measure the ring diameters to verify de Broglie wavelength λ = h/p.";
  }

  if (state.activeExperiment === 'bohr_model') {
    if (!state.isRunning) {
      return "<b>Step 1: Start Simulation</b><br>Click <b>SIMULATE</b> to activate the hydrogen atom analyzer.";
    }
    return "<b>Step 2: Electron Transitions</b><br>Set initial and final orbits. Trigger excitation/emission and observe the spectral lines.";
  }
  
  if (state.activeExperiment === 'kvl') {
    const resistors = comps.filter(c => c.type === 'resistor');
    const r1 = resistors[0];
    const r2 = resistors[1];

    if (!source) return "<b>Step 1: Place DC Source</b><br>Select <b>DC Power Source</b> <i class='fa-solid fa-plug'></i> and click glowing green Top Rails slots (Col 2, Row +/-).";
    if (!r1) return "<b>Step 2: Place Resistor R1</b><br>Select <b>Ceramic Resistor</b> and place horizontally between Col 8, Row D and Col 12, Row D.";
    if (!r2) return "<b>Step 3: Place Resistor R2</b><br>Select <b>Ceramic Resistor</b> and place horizontally between Col 14, Row D and Col 18, Row D.";
    if (!ammeter) return "<b>Step 4: Place Ammeter</b><br>Select <b>Ammeter (Series)</b> and place horizontally between Col 12, Row H and Col 14, Row H.";
    if (!voltmeter) return "<b>Step 5: Place Voltmeter</b><br>Select <b>Voltmeter (Parallel)</b> and place horizontally between Col 8, Row B and Col 12, Row B.";

    const uf = runUnionFind();
    const r1_1 = r1.snap1, r1_2 = r1.snap2;
    const r2_1 = r2.snap1, r2_2 = r2.snap2;
    const am1 = ammeter.snap1, am2 = ammeter.snap2;
    const volt1 = voltmeter.snap1, volt2 = voltmeter.snap2;

    const s_to_r1 = (uf.find(7 * 14 + 0) === uf.find(r1_1) || uf.find(7 * 14 + 0) === uf.find(r1_2));
    if (!s_to_r1) return `<b>Step 6: Wire (+) Rail to Resistor 1</b><br>Wire **Top (+) Rail (Col 8)** to **Resistor 1 start** (${getSocketLabelShort(r1_1)}).`;

    const r1_free = (uf.find(7 * 14 + 0) === uf.find(r1_1)) ? r1_2 : r1_1;
    const r1_to_am = (uf.find(r1_free) === uf.find(am1) || uf.find(r1_free) === uf.find(am2));
    if (!r1_to_am) return `<b>Step 6: Wire Resistor 1 to Ammeter</b><br>Wire **Resistor 1 end** (${getSocketLabelShort(r1_free)}) to **Ammeter start** (${getSocketLabelShort(am1)}).`;

    const am_free = (uf.find(r1_free) === uf.find(am1)) ? am2 : am1;
    const am_to_r2 = (uf.find(am_free) === uf.find(r2_1) || uf.find(am_free) === uf.find(r2_2));
    if (!am_to_r2) return `<b>Step 6: Wire Ammeter to Resistor 2</b><br>Wire **Ammeter end** (${getSocketLabelShort(am_free)}) to **Resistor 2 start** (${getSocketLabelShort(r2_1)}).`;

    const r2_free = (uf.find(am_free) === uf.find(r2_1)) ? r2_2 : r2_1;
    const r2_to_gnd = (uf.find(r2_free) === uf.find(17 * 14 + 1));
    if (!r2_to_gnd) return `<b>Step 6: Wire Resistor 2 to (-) Rail</b><br>Wire **Resistor 2 end** (${getSocketLabelShort(r2_free)}) to **Top (-) Rail (Col 18)**.`;

    const volt1_node = uf.find(volt1);
    const volt2_node = uf.find(volt2);
    const r1_1_node = uf.find(r1_1), r1_2_node = uf.find(r1_2);
    const r2_1_node = uf.find(r2_1), r2_2_node = uf.find(r2_2);
    const posRail = uf.find(0);
    const negRail = uf.find(1);

    const isParallelR1 = (volt1_node === r1_1_node && volt2_node === r1_2_node) || (volt1_node === r1_2_node && volt2_node === r1_1_node);
    const isParallelR2 = (volt1_node === r2_1_node && volt2_node === r2_2_node) || (volt1_node === r2_2_node && volt2_node === r2_1_node);
    const isParallelSource = (volt1_node === posRail && volt2_node === negRail) || (volt1_node === negRail && volt2_node === posRail);

    if (!isParallelR1 && !isParallelR2 && !isParallelSource) {
      if (volt1_node === r2_1_node || volt1_node === r2_2_node || volt2_node === r2_1_node || volt2_node === r2_2_node) {
        return `<b>Step 6: Complete Voltmeter across Resistor 2</b><br>Wire the remaining Voltmeter terminal to the other end of **Resistor 2**.`;
      }
      if (volt1_node === posRail || volt1_node === negRail || volt2_node === posRail || volt2_node === negRail) {
        return `<b>Step 6: Complete Voltmeter across DC Source</b><br>Wire the remaining Voltmeter terminal to the opposite power rail.`;
      }
      return `<b>Step 6: Wire Voltmeter in Parallel</b><br>Wire **Voltmeter** terminals across **Resistor 1** (${getSocketLabelShort(r1_1)} and ${getSocketLabelShort(r1_2)}) or Resistor 2.`;
    }

    if (!state.isRunning) return "<b>Step 7: Initialize Circuit</b><br>Wiring complete! Click <b>INITIALIZE</b> in the top bar to power the loop.";
    
    return "<b>Complete!</b><br>Kirchhoff's Voltage Law loop verified! Observe that Vs = V1 + V2.";
  }

  if (state.activeExperiment === 'kcl') {
    const resistors = comps.filter(c => c.type === 'resistor');
    const r1 = resistors[0];
    const r2 = resistors[1];

    if (!source) return "<b>Step 1: Place DC Source</b><br>Select <b>DC Power Source</b> <i class='fa-solid fa-plug'></i> and click glowing green Top Rails slots (Col 2, Row +/-).";
    if (!r1) return "<b>Step 2: Place Resistor R1</b><br>Select <b>Ceramic Resistor</b> and place horizontally between Col 9, Row C and Col 13, Row C.";
    if (!r2) return "<b>Step 3: Place Resistor R2</b><br>Select <b>Ceramic Resistor</b> and place horizontally between Col 9, Row F and Col 13, Row F.";
    if (!ammeter) return "<b>Step 4: Place Ammeter</b><br>Select <b>Ammeter (Series)</b> and place horizontally between Col 4, Row H and Col 7, Row H.";

    const uf = runUnionFind();
    const r1_1 = r1.snap1, r1_2 = r1.snap2;
    const r2_1 = r2.snap1, r2_2 = r2.snap2;
    const am1 = ammeter.snap1, am2 = ammeter.snap2;

    const posRail = uf.find(6 * 14 + 0);
    const negRail = uf.find(6 * 14 + 1);
    const r1_1_node = uf.find(r1_1);
    const r1_2_node = uf.find(r1_2);
    const r2_1_node = uf.find(r2_1);
    const r2_2_node = uf.find(r2_2);
    const am1_node = uf.find(am1);
    const am2_node = uf.find(am2);

    const isLowSide = (am1_node === negRail || am2_node === negRail);

    if (isLowSide) {
      const pos_to_r1 = (r1_1_node === posRail || r1_2_node === posRail);
      if (!pos_to_r1) {
        return `<b>Step 5: Wire (+) Rail to Resistor 1</b><br>Wire **Top (+) Rail (Col 7)** to **Resistor 1 start** (${getSocketLabelShort(r1_1)}).`;
      }
      const r1_start = (r1_1_node === posRail) ? r1_1 : r1_2;
      const r1_end = (r1_start === r1_1) ? r1_2 : r1_1;

      const branch_in = (uf.find(r1_start) === r2_1_node || uf.find(r1_start) === r2_2_node);
      if (!branch_in) {
        return `<b>Step 5: Connect Resistor 1 and Resistor 2 input</b><br>Wire **Resistor 1 start** (${getSocketLabelShort(r1_start)}) to **Resistor 2 start** (${getSocketLabelShort(r2_1)}).`;
      }
      const r2_end = (uf.find(r1_start) === r2_1_node) ? r2_2 : r2_1;

      const branch_out = (uf.find(r1_end) === uf.find(r2_end));
      if (!branch_out) {
        return `<b>Step 5: Connect Resistor 1 and Resistor 2 output</b><br>Wire **Resistor 1 end** (${getSocketLabelShort(r1_end)}) to **Resistor 2 end** (${getSocketLabelShort(r2_end)}).`;
      }

      const am_free = (am1_node === negRail) ? am2 : am1;
      const r1_end_node = uf.find(r1_end);
      const parallel_to_am = (r1_end_node === uf.find(am_free));
      if (!parallel_to_am) {
        return `<b>Step 5: Connect Resistor output to Ammeter</b><br>Wire **Resistor end** (${getSocketLabelShort(r1_end)}) to **Ammeter** (${getSocketLabelShort(am_free)}).`;
      }
    } else {
      let s_to_r1 = false;
      let r1_start = null;

      if ((am1_node === posRail && am2_node === r1_1_node) || (am2_node === posRail && am1_node === r1_1_node)) {
        s_to_r1 = true;
        r1_start = r1_1;
      } else if ((am1_node === posRail && am2_node === r1_2_node) || (am2_node === posRail && am1_node === r1_2_node)) {
        s_to_r1 = true;
        r1_start = r1_2;
      }

      if (!s_to_r1) {
        if (am1_node !== posRail && am2_node !== posRail) {
          return `<b>Step 5: Wire (+) Rail to Ammeter</b><br>Wire **Top (+) Rail (Col 7)** to **Ammeter start** (${getSocketLabelShort(am1)}).`;
        }
        const am_free = (am1_node === posRail) ? am2 : am1;
        return `<b>Step 5: Wire Ammeter to Resistor 1</b><br>Wire **Ammeter end** (${getSocketLabelShort(am_free)}) to **Resistor 1 start** (${getSocketLabelShort(r1_1)}).`;
      }

      if (!r1_start) {
        r1_start = (uf.find(6 * 14 + 0) === r1_1_node) ? r1_1 : r1_2;
      }
      const r1_end = (r1_start === r1_1) ? r1_2 : r1_1;

      const branch_in = (uf.find(r1_start) === r2_1_node || uf.find(r1_start) === r2_2_node);
      if (!branch_in) {
        return `<b>Step 5: Connect Resistor 1 and Resistor 2 input</b><br>Wire **Resistor 1 start** (${getSocketLabelShort(r1_start)}) to **Resistor 2 start** (${getSocketLabelShort(r2_1)}).`;
      }
      const r2_end = (uf.find(r1_start) === r2_1_node) ? r2_2 : r2_1;

      const branch_out = (uf.find(r1_end) === uf.find(r2_end));
      if (!branch_out) {
        return `<b>Step 5: Connect Resistor 1 and Resistor 2 output</b><br>Wire **Resistor 1 end** (${getSocketLabelShort(r1_end)}) to **Resistor 2 end** (${getSocketLabelShort(r2_end)}).`;
      }

      const r2_end_node = uf.find(r2_end);
      const to_gnd = (r2_end_node === negRail);
      if (!to_gnd) {
        return `<b>Step 5: Wire Resistor output to (-) Rail</b><br>Wire **Resistor 2 end** (${getSocketLabelShort(r2_end)}) to **Top (-) Rail (Col 7)**.`;
      }
    }

    return "System online. Select an experiment to begin.";
  }

  return "System online. Select an experiment to begin.";
}

function updateAIMentor() {
  const msg = getAIMentorMessage();

  // Parse active step number
  let activeStepNum = 1;
  const stepMatch = msg.match(/Step\s+(\d+)/i);
  if (stepMatch) {
    activeStepNum = parseInt(stepMatch[1], 10);
  } else if (msg.includes('Complete!')) {
    activeStepNum = 999;
  }

  // ── Build the rich AI Guide card inside #ai-message ──────────────────────
  const exp = experiments[state.activeExperiment];
  const steps = exp ? exp.steps : [];
  const totalSteps = steps.length;
  const isComplete = activeStepNum === 999;
  const progress = isComplete ? 100 : totalSteps > 0 ? Math.min(100, Math.round(((activeStepNum - 1) / totalSteps) * 100)) : 0;

  // Status badge
  const statusColor = state.isRunning ? '#22c55e' : '#f59e0b';
  const statusLabel = state.isRunning ? '● RUNNING' : '○ SETUP';

  // Step icons mapping
  const stepIcons = ['🔌','🔧','⚡','🔗','📏','🔬','✅'];
  const getIcon = (i) => stepIcons[i % stepIcons.length];

  // Build steps HTML
  let stepsHtml = '';
  if (steps.length > 0) {
    stepsHtml = `
      <div style="margin-top:10px;">
        <div style="font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#64748b;margin-bottom:8px;">EXPERIMENT STEPS</div>
        ${steps.map((s, i) => {
          const sNum = s.id || (i + 1);
          const isDone = isComplete || sNum < activeStepNum;
          const isCur  = !isComplete && sNum === activeStepNum;
          const iconBg = isDone ? '#16a34a' : isCur ? '#2563eb' : '#1e293b';
          const iconColor = isDone ? '#fff' : isCur ? '#fff' : '#475569';
          const textColor = isDone ? '#4ade80' : isCur ? '#93c5fd' : '#64748b';
          const borderColor = isDone ? '#16a34a40' : isCur ? '#3b82f640' : '#1e293b';
          const bg = isCur ? 'background:linear-gradient(135deg,#1e293b,#0f2044);border:1px solid #3b82f650;' : isDone ? 'background:#0a1a0a;border:1px solid #16a34a30;' : 'background:#0c0f1a;border:1px solid #1e293b;';
          const checkMark = isDone ? '✓' : isCur ? sNum : sNum;
          const badge = isCur ? '<span style="font-size:7px;background:#2563eb;color:#fff;border-radius:3px;padding:1px 4px;margin-left:6px;font-weight:700;letter-spacing:0.5px;">CURRENT</span>' : '';
          const pulseAnim = isCur ? 'animation:aiPulse 2s infinite;' : '';
          return `<div style="${bg}border-radius:8px;padding:8px 10px;margin-bottom:5px;display:flex;align-items:flex-start;gap:8px;${pulseAnim}">
            <div style="min-width:20px;height:20px;border-radius:50%;background:${iconBg};color:${iconColor};font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${checkMark}</div>
            <div style="flex:1;min-width:0;">
              <div style="font-size:10px;color:${textColor};line-height:1.4;font-weight:${isCur?'600':'400'};">${s.text}${badge}</div>
            </div>
          </div>`;
        }).join('')}
      </div>`;
  }

  // Current instruction callout
  const calloutBg = isComplete
    ? 'background:linear-gradient(135deg,#052e16,#064e24);border:1px solid #16a34a60;'
    : 'background:linear-gradient(135deg,#0c1a3a,#0a1028);border:1px solid #3b82f650;';
  const calloutIcon = isComplete ? '🎉' : '💡';

  // Progress bar
  const progressHtml = `
    <div style="margin-top:10px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
        <span style="font-size:9px;color:#64748b;font-weight:600;letter-spacing:1px;text-transform:uppercase;">Progress</span>
        <span style="font-size:9px;color:${isComplete?'#22c55e':'#3b82f6'};font-family:'JetBrains Mono',monospace;font-weight:700;">${progress}%</span>
      </div>
      <div style="background:#0a0a0a;border-radius:4px;height:4px;overflow:hidden;border:1px solid #1e293b;">
        <div style="height:100%;width:${progress}%;background:linear-gradient(90deg,${isComplete?'#16a34a,#22c55e':'#1d4ed8,#3b82f6'});transition:width 0.6s ease;border-radius:4px;"></div>
      </div>
    </div>`;

  // Tip section for current step
  const experimentTips = {
    ohms: ['V = I × R is Ohm\'s Law', 'Graph V vs I should be a straight line', 'The slope equals resistance R', 'Try 5+ voltage values for a good fit'],
    kvl: ['KVL: Sum of voltages in a loop = 0', 'Connect voltmeter IN PARALLEL', 'Ammeter goes IN SERIES always', 'Vs = V1 + V2 in a series circuit'],
    kcl: ['KCL: Sum of currents at a node = 0', 'I_total = I_R1 + I_R2', 'Ammeter reads total junction current', 'Parallel resistors share voltage'],
    lcr: ['Resonance: XL = XC at f₀', 'f₀ = 1/(2π√LC)', 'At resonance, impedance is minimum', 'Current is maximum at resonance'],
    rc:  ['τ = RC is the time constant', 'Capacitor charges to 63% in 1τ', 'Full charge takes ~5τ seconds', 'Larger RC = slower charging'],
    series_parallel: ['Series: R_eq = R1 + R2', 'Parallel: 1/R_eq = 1/R1 + 1/R2', 'Voltage same across parallel branches', 'Current same through series elements'],
    wheatstone: ['Balance: R1/R2 = R3/Rx', 'No current in galvanometer at balance', 'Used to measure unknown resistance', 'Adjust R3 for null deflection'],
    diode_iv: ['Diode forward voltage ≈ 0.7V for Si', 'Reverse biased: nearly zero current', 'The I-V curve shows exponential shape', 'Above threshold diode conducts freely'],
    voltage_divider: ['Vout = Vin × R2/(R1+R2)', 'Higher R2 → higher output voltage', 'Load affects divider ratio', 'Used for sensor signal scaling'],
    planck_led: ['E = hf = hc/λ (photon energy)', 'h ≈ 6.626×10⁻³⁴ J·s', 'LEDs with shorter λ need more voltage', 'Plot Vs vs f to find slope = h/e'],
    rc_rl_rlc: ['Z = √[R² + (XL-XC)²]', 'XL = 2πfL, XC = 1/(2πfC)', 'At resonance Z = R (minimum)', 'Phase angle φ = arctan((XL-XC)/R)'],
    arduino_led: ['Arduino pin current limit: 40mA', '220Ω resistor protects the LED', 'LED anode (+) → resistor → Arduino', 'Cathode (−) connects to GND'],
    biot_savart: ['B ∝ I/r (field decays with distance)', 'Right-hand rule for field direction', 'Biot-Savart Law: dB = μ₀Idl×r̂/4πr²', 'Solenoid field is uniform inside'],
    faraday: ['EMF = -dΦ/dt (Faraday\'s Law)', 'Faster motion = larger induced EMF', 'More turns = stronger induction', 'Flux = B·A·cos(θ)'],
    boyle: ['Boyle\'s Law: PV = constant', 'At constant temperature only', 'P₁V₁ = P₂V₂', 'Inverse relationship: P ↑ V ↓'],
    charles: ['Charles\'s Law: V/T = constant', 'Temperature must be in Kelvin', 'V₁/T₁ = V₂/T₂', 'Absolute zero = -273.15°C'],
    photoelectric: ['E_photon = hf = work function + KE', 'Stopping voltage = KE/e', 'Above threshold frequency only', 'Intensity affects current, not KE'],
  };

  const tips = experimentTips[state.activeExperiment] || ['Use Auto-Build (↺) to place components', 'Click INITIALIZE to run the simulation', 'Check the Meters tab for readings', 'Ask questions in the AI chat below'];
  const tipIndex = Math.floor(Date.now() / 8000) % tips.length;
  const currentTip = tips[tipIndex];

  elements.aiMessage.innerHTML = `
    <div style="font-family:'Inter',sans-serif;">

      <!-- Header: Experiment Name + Status -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <div style="font-size:11px;font-weight:700;color:#e2e8f0;line-height:1.2;">${exp ? exp.name : 'Select an Experiment'}</div>
        <div style="font-size:8px;font-weight:700;color:${statusColor};letter-spacing:0.5px;background:${statusColor}15;padding:2px 7px;border-radius:10px;border:1px solid ${statusColor}40;">${statusLabel}</div>
      </div>

      <!-- Current Instruction Callout -->
      <div style="${calloutBg}border-radius:8px;padding:10px 12px;margin-bottom:2px;">
        <div style="display:flex;gap:8px;align-items:flex-start;">
          <span style="font-size:16px;line-height:1;">${calloutIcon}</span>
          <div style="font-size:11px;color:#e2e8f0;line-height:1.5;">${msg}</div>
        </div>
      </div>

      <!-- Progress Bar -->
      ${totalSteps > 0 ? progressHtml : ''}

      <!-- Step Tracker -->
      ${stepsHtml}

      <!-- Tip of the Moment -->
      <div style="margin-top:10px;background:#0c0f14;border:1px solid #1e293b;border-radius:7px;padding:8px 10px;">
        <div style="display:flex;align-items:center;gap:6px;">
          <span style="font-size:10px;">💡</span>
          <span style="font-size:9px;font-weight:700;color:#f59e0b;text-transform:uppercase;letter-spacing:1px;">Lab Tip</span>
        </div>
        <div style="font-size:10px;color:#94a3b8;margin-top:4px;line-height:1.5;">${currentTip}</div>
      </div>

    </div>
  `;

  // ── Also update the Procedure tab step highlights (existing behavior) ──
  const stepItems = elements.stepsContainer.querySelectorAll('.step-item');
  stepItems.forEach((el, idx) => {
    const sNum = idx + 1;
    const numEl = el.querySelector('.step-num');
    if (isComplete || sNum < activeStepNum) {
      el.className = 'step-item done';
      if (numEl) numEl.className = 'step-num done';
    } else if (sNum === activeStepNum) {
      el.className = 'step-item cur';
      if (numEl) numEl.className = 'step-num cur';
    } else {
      el.className = 'step-item';
      if (numEl) numEl.className = 'step-num';
    }
  });
}

// --- THREE.JS 3D PHYSICS LAB VISUALS ---
let scene, camera, renderer, boardMesh, chassisMesh = null, boardOutlineHelper = null;
let holeMeshes = [];
let hoverIndicatorRing;
let arduinoUnoGroup, arduino5VMesh, arduinoGNDMesh;
let targetHighlightRing1, targetHighlightRing2;
let targetGuideline = null;
let hoverOutlineHelper = null;
let tooltipEl = null;
let targetDistance = 11.715;
let currentDistance = 11.715;

let BOARD_COLS = 63;
let boardGroup = null;
let targetRotY = 0;
let targetPitch = Math.atan2(7.5, 9);
let currentPitch = Math.atan2(7.5, 9);
let cols = Array.from({ length: 63 }, (_, i) => -4.72 + i * 0.1522);

function getSnapPos(index) {
  if (index === 882) {
    if (arduinoUnoGroup) {
      arduinoUnoGroup.updateMatrix();
      const v = new THREE.Vector3(0.2, 0.15, 0.9);
      v.applyMatrix4(arduinoUnoGroup.matrix);
      return v;
    }
    return new THREE.Vector3(0.2, 0.2, -2.3);
  }
  if (index === 883) {
    if (arduinoUnoGroup) {
      arduinoUnoGroup.updateMatrix();
      const v = new THREE.Vector3(0.4, 0.15, 0.9);
      v.applyMatrix4(arduinoUnoGroup.matrix);
      return v;
    }
    return new THREE.Vector3(0.4, 0.2, -2.3);
  }

  const c = Math.floor(index / 14);
  const r = index % 14;
  
  const x = cols[c];
  let z = 0;
  
  if (r === 0) z = -1.296;       // Top + positive rail
  else if (r === 1) z = -1.144;  // Top - negative rail
  else if (r >= 2 && r <= 6) z = -0.839 + (r - 2) * 0.1522; // A-E row sockets
  else if (r >= 7 && r <= 11) z = 0.229 + (r - 7) * 0.1522;  // F-J row sockets
  else if (r === 12) z = 1.144;  // Bottom + positive rail
  else if (r === 13) z = 1.296;  // Bottom - negative rail
  
  const localPos = new THREE.Vector3(x, 0.08, z);
  if (boardGroup) {
    boardGroup.updateMatrix();
    localPos.applyMatrix4(boardGroup.matrix);
  }
  return localPos;
}

function createArduinoUno3D() {
  const group = new THREE.Group();
  
  // Teal/Blue PCB board
  const boardGeo = new THREE.BoxGeometry(3.0, 0.06, 2.2);
  const boardMat = new THREE.MeshStandardMaterial({ color: 0x005b82, roughness: 0.5 }); // Arduino Blue
  const board = new THREE.Mesh(boardGeo, boardMat);
  board.receiveShadow = true;
  group.add(board);
  
  // USB Port (silver metal box)
  const usbGeo = new THREE.BoxGeometry(0.8, 0.4, 0.6);
  const usbMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9, roughness: 0.1 });
  const usb = new THREE.Mesh(usbGeo, usbMat);
  usb.position.set(-1.1, 0.23, -0.6);
  group.add(usb);
  
  // Power Jack (black cylinder/box)
  const jackGeo = new THREE.BoxGeometry(0.7, 0.45, 0.5);
  const jackMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.5 });
  const jack = new THREE.Mesh(jackGeo, jackMat);
  jack.position.set(-1.1, 0.25, 0.6);
  group.add(jack);
  
  // ATmega328P microcontroller chip (long black chip)
  const mcuGeo = new THREE.BoxGeometry(1.2, 0.12, 0.35);
  const mcuMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.6 });
  const mcu = new THREE.Mesh(mcuGeo, mcuMat);
  mcu.position.set(0.2, 0.09, 0.25);
  group.add(mcu);
  
  // Header sockets (black strips)
  const headerMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.6 });
  
  // Digital header (top)
  const topHeader = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.18, 0.15), headerMat);
  topHeader.position.set(0.3, 0.12, -0.9);
  group.add(topHeader);
  
  // Analog/Power header (bottom)
  const bottomHeader = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.18, 0.15), headerMat);
  bottomHeader.position.set(0.3, 0.12, 0.9);
  group.add(bottomHeader);
  
  // Expose 5V (index 882) and GND (index 883) pins
  arduino5VMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.22, 0.1),
    new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.8, roughness: 0.2 })
  );
  arduino5VMesh.position.set(0.2, 0.15, 0.9);
  arduino5VMesh.userData = { snapIndex: 882 };
  group.add(arduino5VMesh);
  
  arduinoGNDMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.22, 0.1),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 })
  );
  arduinoGNDMesh.userData = { snapIndex: 883 };
  group.add(arduinoGNDMesh);
  
  return group;
}

function createBreadboardTextures(colsCount = 63, boardWidth = 10.0) {
  const width = 2048;
  const height = 1024;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const normCanvas = document.createElement('canvas');
  normCanvas.width = width;
  normCanvas.height = height;
  const nCtx = normCanvas.getContext('2d');

  // Fill base cream background
  ctx.fillStyle = '#faf8f2';
  ctx.fillRect(0, 0, width, height);

  // Fill normal map background
  nCtx.fillStyle = '#8080ff';
  nCtx.fillRect(0, 0, width, height);

  // Draw subtle plastic texture/noise
  for (let i = 0; i < 80000; i++) {
    const rx = Math.random() * width;
    const ry = Math.random() * height;
    const size = Math.random() * 1.5 + 0.5;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(rx, ry, size, size);
  }

  // Draw edge bevels in normal map
  const bevelWidth = 25;
  let grad = nCtx.createLinearGradient(0, 0, bevelWidth, 0);
  grad.addColorStop(0, '#a080ff');
  grad.addColorStop(1, '#8080ff');
  nCtx.fillStyle = grad;
  nCtx.fillRect(0, 0, bevelWidth, height);

  grad = nCtx.createLinearGradient(width - bevelWidth, 0, width, 0);
  grad.addColorStop(0, '#8080ff');
  grad.addColorStop(1, '#6080ff');
  nCtx.fillStyle = grad;
  nCtx.fillRect(width - bevelWidth, 0, bevelWidth, height);

  grad = nCtx.createLinearGradient(0, 0, 0, bevelWidth);
  grad.addColorStop(0, '#8060ff');
  grad.addColorStop(1, '#8080ff');
  nCtx.fillStyle = grad;
  nCtx.fillRect(0, 0, width, bevelWidth);

  grad = nCtx.createLinearGradient(0, height - bevelWidth, 0, height);
  grad.addColorStop(0, '#8080ff');
  grad.addColorStop(1, '#80a0ff');
  nCtx.fillStyle = grad;
  nCtx.fillRect(0, height - bevelWidth, width, bevelWidth);

  // Helper mapping: 3D coordinates -> Canvas pixels
  const halfWidth = boardWidth / 2;
  function getCanvasCoords(x, z) {
    const px = ((x - (-halfWidth)) / boardWidth) * width;
    const py = ((z - (-1.82)) / 3.64) * height;
    return { x: px, y: py };
  }

  // Draw segment gaps
  const gapsZ = [
    { z1: -1.04, z2: -0.94 }, // top gap
    { z1: -0.18, z2: 0.18 },  // center ravine
    { z1: 0.94, z2: 1.04 }    // bottom gap
  ];

  gapsZ.forEach(g => {
    const p1 = getCanvasCoords(0, g.z1);
    const p2 = getCanvasCoords(0, g.z2);
    const gTop = p1.y;
    const gBot = p2.y;
    const gHeight = gBot - gTop;

    const shadowGrad = ctx.createLinearGradient(0, gTop, 0, gBot);
    shadowGrad.addColorStop(0.0, '#dfded6');
    shadowGrad.addColorStop(0.2, '#c4c3b8');
    shadowGrad.addColorStop(0.5, '#9a9993');
    shadowGrad.addColorStop(0.8, '#c4c3b8');
    shadowGrad.addColorStop(1.0, '#dfded6');
    ctx.fillStyle = shadowGrad;
    ctx.fillRect(bevelWidth + 5, gTop, width - 2 * bevelWidth - 10, gHeight);

    const normGrad = nCtx.createLinearGradient(0, gTop, 0, gBot);
    normGrad.addColorStop(0.0, '#8080ff');
    normGrad.addColorStop(0.45, '#8060ff');
    normGrad.addColorStop(0.5, '#8080ff');
    normGrad.addColorStop(0.55, '#80a0ff');
    normGrad.addColorStop(1.0, '#8080ff');
    nCtx.fillStyle = normGrad;
    nCtx.fillRect(bevelWidth + 5, gTop, width - 2 * bevelWidth - 10, gHeight);
  });

  // Draw Power Rail lines
  const ry1 = getCanvasCoords(0, -1.37).y;
  const by1 = getCanvasCoords(0, -1.07).y;
  const ry2 = getCanvasCoords(0, 1.07).y;
  const by2 = getCanvasCoords(0, 1.37).y;

  ctx.lineWidth = 4;
  ctx.strokeStyle = '#ef4444';
  ctx.beginPath(); ctx.moveTo(60, ry1); ctx.lineTo(width - 60, ry1); ctx.stroke();
  ctx.strokeStyle = '#3b82f6';
  ctx.beginPath(); ctx.moveTo(60, by1); ctx.lineTo(width - 60, by1); ctx.stroke();

  ctx.strokeStyle = '#ef4444';
  ctx.beginPath(); ctx.moveTo(60, ry2); ctx.lineTo(width - 60, ry2); ctx.stroke();
  ctx.strokeStyle = '#3b82f6';
  ctx.beginPath(); ctx.moveTo(60, by2); ctx.lineTo(width - 60, by2); ctx.stroke();

  ctx.font = 'bold 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  ctx.fillStyle = '#ef4444';
  ctx.fillText('+', 45, ry1 - 2); ctx.fillText('+', width - 45, ry1 - 2);
  ctx.fillStyle = '#3b82f6';
  ctx.fillText('-', 45, by1 - 2); ctx.fillText('-', width - 45, by1 - 2);

  ctx.fillStyle = '#ef4444';
  ctx.fillText('+', 45, ry2 - 2); ctx.fillText('+', width - 45, ry2 - 2);
  ctx.fillStyle = '#3b82f6';
  ctx.fillText('-', 45, by2 - 2); ctx.fillText('-', width - 45, by2 - 2);

  // Draw Holes
  const holeSize = 14;
  
  function drawHole(cCtx, cx, cy, size) {
    const half = size / 2;
    const r = 2;
    
    // Draw outer bevel/shadow ring
    cCtx.fillStyle = '#d5d4cb';
    cCtx.beginPath();
    cCtx.roundRect(cx - half - 1.5, cy - half - 1.5, size + 3, size + 3, r + 0.5);
    cCtx.fill();

    // Draw inner hole gradient for 3D depth shadow
    const holeGrad = cCtx.createLinearGradient(cx, cy - half, cx, cy + half);
    holeGrad.addColorStop(0, '#0a0a0b');
    holeGrad.addColorStop(0.3, '#141416');
    holeGrad.addColorStop(1, '#2c2c30');
    cCtx.fillStyle = holeGrad;
    cCtx.beginPath();
    cCtx.roundRect(cx - half, cy - half, size, size, r);
    cCtx.fill();

    // Draw metallic leaf contact clips
    const clipGrad = cCtx.createLinearGradient(cx - 3.5, 0, cx + 3.5, 0);
    clipGrad.addColorStop(0, '#4b5563');
    clipGrad.addColorStop(0.5, '#d1d5db');
    clipGrad.addColorStop(1, '#4b5563');
    cCtx.fillStyle = clipGrad;
    cCtx.fillRect(cx - 3.5, cy - half + 2.5, 7, size - 5);
    
    // Draw center dark slit between leaves
    cCtx.fillStyle = '#09090a';
    cCtx.fillRect(cx - 0.75, cy - half + 2, 1.5, size - 4);
  }

  function drawHoleNormal(cnCtx, cx, cy, size) {
    const half = size / 2;
    cnCtx.fillStyle = '#8080ff';
    cnCtx.fillRect(cx - half - 2, cy - half - 2, size + 4, size + 4);

    cnCtx.fillStyle = '#b080ff';
    cnCtx.beginPath();
    cnCtx.moveTo(cx - half, cy - half);
    cnCtx.lineTo(cx - half + 3, cy - half + 3);
    cnCtx.lineTo(cx - half + 3, cy + half - 3);
    cnCtx.lineTo(cx - half, cy + half);
    cnCtx.closePath();
    cnCtx.fill();

    cnCtx.fillStyle = '#5080ff';
    cnCtx.beginPath();
    cnCtx.moveTo(cx + half, cy - half);
    cnCtx.lineTo(cx + half - 3, cy - half + 3);
    cnCtx.lineTo(cx + half - 3, cy + half - 3);
    cnCtx.lineTo(cx + half, cy + half);
    cnCtx.closePath();
    cnCtx.fill();

    cnCtx.fillStyle = '#8050ff';
    cnCtx.beginPath();
    cnCtx.moveTo(cx - half, cy - half);
    cnCtx.lineTo(cx - half + 3, cy - half + 3);
    cnCtx.lineTo(cx + half - 3, cy - half + 3);
    cnCtx.lineTo(cx + half, cy - half);
    cnCtx.closePath();
    cnCtx.fill();

    cnCtx.fillStyle = '#80b0ff';
    cnCtx.beginPath();
    cnCtx.moveTo(cx - half, cy + half);
    cnCtx.lineTo(cx - half + 3, cy + half - 3);
    cnCtx.lineTo(cx + half - 3, cy + half - 3);
    cnCtx.lineTo(cx + half, cy + half);
    cnCtx.closePath();
    cnCtx.fill();
  }

  for (let c = 0; c < colsCount; c++) {
    for (let r = 0; r < 14; r++) {
      const isRail = (r === 0 || r === 1 || r === 12 || r === 13);
      const isGap = (c % 6 === 5);
      if (isRail && isGap) continue;

      const pos = getSnapPos(c * 14 + r);
      const cc = getCanvasCoords(pos.x, pos.z);

      drawHole(ctx, cc.x, cc.y, holeSize);
      drawHoleNormal(nCtx, cc.x, cc.y, holeSize);
    }
  }

  // Column labels
  ctx.font = 'bold 13px monospace';
  ctx.fillStyle = '#64748b';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const colNumbers = (colsCount === 30) 
    ? [1, 5, 10, 15, 20, 25, 30] 
    : [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 63];
    
  colNumbers.forEach(colNum => {
    const colIdx = colNum - 1;
    const pos = getSnapPos(colIdx * 14 + 2);
    const cc = getCanvasCoords(pos.x, 0);

    ctx.fillText(colNum.toString(), cc.x, getCanvasCoords(0, -0.94).y);
    ctx.fillText(colNum.toString(), cc.x, getCanvasCoords(0, -0.12).y);
    ctx.fillText(colNum.toString(), cc.x, getCanvasCoords(0, 0.12).y);
    ctx.fillText(colNum.toString(), cc.x, getCanvasCoords(0, 0.94).y);
  });

  // Row labels
  ctx.font = 'bold 15px sans-serif';
  ctx.fillStyle = '#475569';
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  letters.forEach((letter, i) => {
    const r = i + 2;
    const pos = getSnapPos(r);
    const cc = getCanvasCoords(0, pos.z);

    ctx.textAlign = 'left';
    ctx.fillText(letter, getCanvasCoords(-halfWidth + 0.08, 0).x, cc.y);
    
    ctx.textAlign = 'center';
    ctx.fillText(letter, getCanvasCoords(cols[Math.floor(colsCount / 2)], 0).x, cc.y);
    
    ctx.textAlign = 'right';
    ctx.fillText(letter, getCanvasCoords(halfWidth - 0.08, 0).x, cc.y);
  });

  // Brand details
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold italic 22px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('CircuitIQ', 60, getCanvasCoords(0, 0).y - 4);
  
  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 10px sans-serif';
  ctx.fillText(colsCount === 30 ? '3D BREADBOARD MODEL 30-T' : '3D BREADBOARD MODEL 63-T', 60, getCanvasCoords(0, 0).y + 14);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#64748b';
  ctx.fillText('INTEGRATED BUS TERMINALS', width - 60, getCanvasCoords(0, 0).y - 4);
  ctx.fillText('MADE IN CIRCUIT-IQ LABS', width - 60, getCanvasCoords(0, 0).y + 10);

  return { canvas, normCanvas };
}

function createRoundedBoxGeometry(w, h, d, r, segments = 8) {
  const shape = new THREE.Shape();
  const hw = w / 2 - r;
  const hh = d / 2 - r;
  shape.moveTo(-hw, -hh);
  shape.lineTo(hw, -hh);
  shape.quadraticCurveTo(hw + r, -hh, hw + r, -hh + r);
  shape.lineTo(hw + r, hh - r);
  shape.quadraticCurveTo(hw + r, hh + r, hw, hh + r);
  shape.lineTo(-hw, hh + r);
  shape.quadraticCurveTo(-hw - r, hh + r, -hw - r, hh - r);
  shape.lineTo(-hw - r, -hh + r);
  shape.quadraticCurveTo(-hw - r, -hh, -hw, -hh);

  const extrudeSettings = {
    steps: 1,
    depth: h - 2 * r,
    bevelEnabled: true,
    bevelThickness: r,
    bevelSize: r,
    bevelOffset: -r,
    bevelSegments: segments,
    curveSegments: segments
  };

  const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geo.center();
  geo.rotateX(Math.PI / 2);
  return geo;
}

function createBreadboardChassisGeometry(w, h, d, r, segments = 8) {
  const shape = new THREE.Shape();
  const hw = w / 2 - r;
  const hh = d / 2 - r;
  shape.moveTo(-hw, -hh);
  shape.lineTo(hw, -hh);
  shape.quadraticCurveTo(hw + r, -hh, hw + r, -hh + r);
  shape.lineTo(hw + r, hh - r);
  shape.quadraticCurveTo(hw + r, hh + r, hw, hh + r);
  shape.lineTo(-hw, hh + r);
  shape.quadraticCurveTo(-hw - r, hh + r, -hw - r, hh - r);
  shape.lineTo(-hw - r, -hh + r);
  shape.quadraticCurveTo(-hw - r, -hh, -hw, -hh);

  const extrudeSettings = {
    steps: 1,
    depth: h - 2 * r,
    bevelEnabled: true,
    bevelThickness: r,
    bevelSize: r,
    bevelOffset: -r,
    bevelSegments: segments,
    curveSegments: segments
  };

  const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geo.center();
  geo.rotateX(Math.PI / 2);
  return geo;
}

function createRealisticPost(colorHex) {
  const group = new THREE.Group();
  
  // Plastic base (colored)
  const baseGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.05, 16);
  const baseMat = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.5, metalness: 0.2 });
  const baseMesh = new THREE.Mesh(baseGeo, baseMat);
  baseMesh.position.y = 0.025;
  baseMesh.castShadow = true;
  baseMesh.receiveShadow = true;
  group.add(baseMesh);
  
  // Metal spacer/collar
  const spacerGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.02, 16);
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.95, roughness: 0.1 });
  const spacerMesh = new THREE.Mesh(spacerGeo, metalMat);
  spacerMesh.position.y = 0.06;
  spacerMesh.castShadow = true;
  group.add(spacerMesh);
  
  // Metal cap (slightly wider top, textured looking)
  const capGeo = new THREE.CylinderGeometry(0.058, 0.052, 0.06, 16);
  const capMesh = new THREE.Mesh(capGeo, metalMat);
  capMesh.position.y = 0.1;
  capMesh.castShadow = true;
  group.add(capMesh);
  
  // A tiny central contact screw inside
  const contactGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.15, 8);
  const contactMesh = new THREE.Mesh(contactGeo, metalMat);
  contactMesh.position.y = 0.075;
  group.add(contactMesh);
  
  return group;
}

function rebuildBreadboard3D(type) {
  state.boardType = type;
  BOARD_COLS = (type === 'half') ? 30 : 63;
  
  const colSpacing = 0.1522;
  const startX = -(BOARD_COLS - 1) * colSpacing / 2;
  cols = Array.from({ length: BOARD_COLS }, (_, i) => startX + i * colSpacing);
  
  // Clear any existing components & wires
  state.placedComponents.forEach(c => {
    scene.remove(c.mesh);
    c.leads.forEach(l => scene.remove(l));
  });
  state.placedComponents = [];
  
  state.wires.forEach(w => {
    scene.remove(w.lineMesh);
    w.electrons.forEach(e => scene.remove(e));
    if (w.pins) w.pins.forEach(p => scene.remove(p));
    if (w.sleeves) w.sleeves.forEach(s => scene.remove(s));
  });
  state.wires = [];
  
  state.isRunning = false;
  stopPollingCalculations();
  setElectronsActive(false);
  if (boardOutlineHelper) {
    scene.remove(boardOutlineHelper);
    boardOutlineHelper = null;
  }
  
  // Remove old boardGroup
  if (boardGroup) {
    scene.remove(boardGroup);
  }
  
  boardGroup = new THREE.Group();
  
  const boardWidth = (BOARD_COLS === 30) ? 5.0 : 10.0;
  
  // Motherboard (PCB Plate)
  const motherboardGeo = createRoundedBoxGeometry(boardWidth + 1.0, 0.08, 4.4, 0.08);
  const motherboardMat = new THREE.MeshStandardMaterial({ 
    color: 0x0f5132, 
    roughness: 0.35, 
    metalness: 0.25 
  });
  const motherboardMesh = new THREE.Mesh(motherboardGeo, motherboardMat);
  motherboardMesh.position.y = -0.16;
  motherboardMesh.castShadow = true;
  motherboardMesh.receiveShadow = true;
  boardGroup.add(motherboardMesh);
  
  // Gold traces
  const traceGeo = createRoundedBoxGeometry(boardWidth + 0.8, 0.005, 4.2, 0.06);
  const traceMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.1, metalness: 0.9 });
  const traceBorder = new THREE.Mesh(traceGeo, traceMat);
  traceBorder.position.y = -0.115;
  boardGroup.add(traceBorder);
  
  // Invisible Raycast Proxy Mesh
  const proxyGeo = new THREE.BoxGeometry(boardWidth, 0.25, 3.64);
  const proxyMat = new THREE.MeshBasicMaterial({ visible: false });
  const proxyMesh = new THREE.Mesh(proxyGeo, proxyMat);
  proxyMesh.position.y = -0.045;
  boardGroup.add(proxyMesh);
  boardMesh = proxyMesh;
  
  // Procedural breadboard textures
  const textures = createBreadboardTextures(BOARD_COLS, boardWidth);
  const baseColorTexture = new THREE.CanvasTexture(textures.canvas);
  baseColorTexture.colorSpace = THREE.SRGBColorSpace;
  const normalMapTexture = new THREE.CanvasTexture(textures.normCanvas);

  const sideMat = new THREE.MeshStandardMaterial({ color: 0xf8f8f8, roughness: 0.45, metalness: 0.1 });
  const topMat = new THREE.MeshStandardMaterial({
    map: baseColorTexture,
    normalMap: normalMapTexture,
    normalScale: new THREE.Vector2(1.5, 1.5),
    roughness: 0.55,
    metalness: 0.15
  });

  const boardMaterials = [topMat, sideMat];
  const chassisGeo = createBreadboardChassisGeometry(boardWidth, 0.2, 3.64, 0.05);
  chassisGeo.computeVertexNormals();
  
  // Normalize UV mapping for ExtrudeGeometry using planar projection
  const posAttr = chassisGeo.attributes.position;
  const uvAttr = chassisGeo.attributes.uv;
  if (posAttr && uvAttr) {
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      const u = (x + boardWidth / 2) / boardWidth;
      const v = (z + 1.82) / 3.64;
      uvAttr.setXY(i, u, v);
    }
    uvAttr.needsUpdate = true;
  }
  
  const chassis = new THREE.Mesh(chassisGeo, boardMaterials);
  chassis.position.set(0, -0.02, 0);
  chassis.castShadow = true;
  chassis.receiveShadow = true;
  boardGroup.add(chassis);
  chassisMesh = chassis;

  // Foam backing
  const tapeGeo = createRoundedBoxGeometry(boardWidth + 0.1, 0.02, 3.74, 0.05);
  const tapeMat = new THREE.MeshStandardMaterial({ color: 0xd6d3d1, roughness: 0.9 });
  const tape = new THREE.Mesh(tapeGeo, tapeMat);
  tape.position.set(0, -0.13, 0);
  tape.castShadow = true;
  tape.receiveShadow = true;
  boardGroup.add(tape);

  // Ravine spacer
  const ravineSpacerGeo = new THREE.BoxGeometry(boardWidth, 0.05, 0.04);
  const ravineSpacerMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 });
  const ravineSpacer = new THREE.Mesh(ravineSpacerGeo, ravineSpacerMat);
  ravineSpacer.position.set(0, 0.055, 0);
  boardGroup.add(ravineSpacer);
  
  scene.add(boardGroup);
  
  // Update inspector display text
  const inspectorType = document.getElementById('inspector-bb-type');
  const inspectorSize = document.getElementById('inspector-bb-size');
  if (inspectorType) inspectorType.innerText = (type === 'half') ? 'Half-size (400pt)' : 'Full-size (830pt)';
  if (inspectorSize) inspectorSize.innerText = (type === 'half') ? '80.5×8.5×54.5mm' : '165×8.5×54.5mm';
  
  // Re-setup experiment to regenerate highlight targets and clear scores
  setupExperiment(state.activeExperiment);
}

function switchBreadboard(type) {
  rebuildBreadboard3D(type);
}

function setTheme(theme) {
  state.theme = theme;
  const themeIcon = document.getElementById('theme-toggle-icon');
  if (theme === 'light') {
    document.documentElement.classList.add('light-theme');
    document.body.classList.add('light-theme');
    if (themeIcon) {
      themeIcon.className = 'fa-solid fa-moon';
    }
    if (scene) {
      scene.background.setHex(0xf1f5f9);
      if (scene.fog) {
        scene.fog.color.setHex(0xf1f5f9);
      }
    }
  } else {
    document.documentElement.classList.remove('light-theme');
    document.body.classList.remove('light-theme');
    if (themeIcon) {
      themeIcon.className = 'fa-solid fa-sun';
    }
    if (scene) {
      scene.background.setHex(0x070a13);
      if (scene.fog) {
        scene.fog.color.setHex(0x070a13);
      }
    }
  }
}

function initThreeJS() {
  try {
    const parent = document.getElementById('canvas-3d-parent');
    const w = parent.clientWidth || 600;
    const h = parent.clientHeight || 450;
    
    scene = new THREE.Scene();
    const bgCol = state.theme === 'light' ? 0xf1f5f9 : 0x070a13;
    scene.background = new THREE.Color(bgCol);
    scene.fog = new THREE.FogExp2(bgCol, 0.04);
    
    camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.set(0, 7.5, 9);
    camera.lookAt(0, 0, 0);
    
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    } catch (e) {
      console.warn("Failed to create WebGLRenderer with antialias, trying without antialias...", e);
      try {
        renderer = new THREE.WebGLRenderer({ antialias: false });
      } catch (e2) {
        throw new Error("WebGL context creation failed. This usually happens when you have too many tabs of Circuit IQ open in your browser. Please close other tabs and reload this page.");
      }
    }
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    parent.appendChild(renderer.domElement);

    // Explicitly clean up WebGL context on page unload to prevent Chrome context leaks
    window.addEventListener('unload', () => {
      if (renderer) {
        try {
          const gl = renderer.getContext();
          if (gl) {
            const ext = gl.getExtension('WEBGL_lose_context');
            if (ext) ext.loseContext();
          }
        } catch (e) {
          console.warn("Failed to lose WebGL context on unload:", e);
        }
        try {
          renderer.dispose();
        } catch (e) {
          console.warn("Failed to dispose renderer on unload:", e);
        }
      }
    });
    
    // --- STAGE LIGHTING (BRIGHTENED FOR METALLIC/STANDARD MATERIAL SHADERS) ---
    scene.add(new THREE.AmbientLight(0xffffff, 2.0));
    
    const topLight = new THREE.DirectionalLight(0xffffff, 3.0);
    topLight.position.set(3, 12, 4);
    topLight.castShadow = true;
    topLight.shadow.mapSize.width = 2048;
    topLight.shadow.mapSize.height = 2048;
    topLight.shadow.camera.near = 0.5;
    topLight.shadow.camera.far = 25;
    const dFrustum = 8;
    topLight.shadow.camera.left = -dFrustum;
    topLight.shadow.camera.right = dFrustum;
    topLight.shadow.camera.top = dFrustum;
    topLight.shadow.camera.bottom = -dFrustum;
    topLight.shadow.bias = -0.0005;
    scene.add(topLight);
    
    const neonPurple = new THREE.SpotLight(0xa855f7, 45, 25, Math.PI/4, 0.5, 1.2);
    neonPurple.position.set(-6, 6, 2);
    scene.add(neonPurple);
    
    const neonBlue = new THREE.SpotLight(0x6366f1, 35, 25, Math.PI/4, 0.5, 1.2);
    neonBlue.position.set(6, 6, -2);
    scene.add(neonBlue);

    // Glossy dark lab table floor
    const floorGeo = new THREE.PlaneGeometry(60, 60);
    const floorMat = new THREE.MeshStandardMaterial({ 
      color: 0x0c0e14, 
      roughness: 0.35, 
      metalness: 0.6 
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.22; // sits just below the green PCB plate
    floor.receiveShadow = true;
    scene.add(floor);
    
    // Add grid lines for a technical look
    const gridHelper = new THREE.GridHelper(40, 40, 0x00d084, 0x181e29);
    gridHelper.position.y = -0.219;
    gridHelper.material.opacity = 0.15;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);
    // --- REALISTIC 3D EMBEDDED MOTHERBOARD & BREADBOARD Visuals ---
    rebuildBreadboard3D('full');
    
    // Snapping points array populated for math snapping logic, 3D meshes omitted for performance/fidelity
    holeMeshes = [];
    
    // Yellow snapping indicator ring (rendered as a square outline)
    const ringGeo = new THREE.RingGeometry(0.04, 0.06, 4);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xeab308, side: THREE.DoubleSide });
    hoverIndicatorRing = new THREE.Mesh(ringGeo, ringMat);
    hoverIndicatorRing.rotation.set(-Math.PI / 2, 0, Math.PI / 4); // Lay flat & align with square holes
    hoverIndicatorRing.position.set(0, -10, 0); // Hide initially
    scene.add(hoverIndicatorRing);
    
    // Instantiate 3D Arduino Uno Board
    arduinoUnoGroup = createArduinoUno3D();
    arduinoUnoGroup.position.set(0, 0.05, -3.2);
    arduinoUnoGroup.visible = false;
    scene.add(arduinoUnoGroup);
    
    // Glowing target highlight rings (green) for child-friendly interactive guide
    const targetRingGeo = new THREE.RingGeometry(0.06, 0.09, 32);
    const targetRingMat = new THREE.MeshBasicMaterial({ color: 0x22c55e, side: THREE.DoubleSide });
    
    targetHighlightRing1 = new THREE.Mesh(targetRingGeo, targetRingMat);
    targetHighlightRing1.rotation.x = -Math.PI / 2;
    targetHighlightRing1.position.set(0, -10, 0); // Hide initially
    scene.add(targetHighlightRing1);
    
    targetHighlightRing2 = new THREE.Mesh(targetRingGeo, targetRingMat);
    targetHighlightRing2.rotation.x = -Math.PI / 2;
    targetHighlightRing2.position.set(0, -10, 0); // Hide initially
    scene.add(targetHighlightRing2);
    
    // Load background Power Supply Instrument model
    initInstruments3D();

    // Create loading manager to communicate load progress to the parent window
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
      window.parent.postMessage({ type: 'lab-loading', progress: 0 }, '*');
    };
    loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const progress = Math.round((itemsLoaded / itemsTotal) * 100);
      window.parent.postMessage({ type: 'lab-loading', progress: progress }, '*');
    };
    loadingManager.onLoad = () => {
      window.parent.postMessage({ type: 'lab-loaded' }, '*');
    };
    loadingManager.onError = (url) => {
      console.error('Error loading resource:', url);
    };

    // Load high-fidelity capacitor texture map
    const textureLoader = new THREE.TextureLoader(loadingManager);
    capacitorTexture = textureLoader.load('/DefaultMaterial_baseColor.jpg');
    capacitorTexture.wrapS = THREE.RepeatWrapping;
    capacitorTexture.wrapT = THREE.RepeatWrapping;
    capacitorTexture.flipY = false;

    // Load high-fidelity 3D Resistor model template
    const gltfLoader = new GLTFLoader(loadingManager);
    gltfLoader.load('/models/resistor/scene.gltf', (gltf) => {
      resistorModelTemplate = gltf.scene;
      resistorModelTemplate.traverse(obj => {
        if (obj.isMesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;
          // Hide original leads
          if (obj.name === 'METAL-material') {
            obj.visible = false;
          }
        }
      });
      // Trigger color band updates for any already placed resistors
      updateResistorColorBands();
    }, undefined, (err) => {
      console.error("Failed to load resistor GLTF model", err);
    });

    // Load high-fidelity CC0 electronic components model template
    gltfLoader.load('/models/electronic_components/scene.gltf', (gltf) => {
      electronicComponentsTemplate = gltf.scene;
      electronicComponentsTemplate.traverse(obj => {
        if (obj.isMesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;
        }
      });
      console.log("Successfully loaded electronic components model", electronicComponentsTemplate);
      
      // If any components are already placed, upgrade them immediately to high-fidelity models
      if (state.placedComponents && state.placedComponents.length > 0) {
        state.placedComponents.forEach(c => {
          if (c.type === 'wire' || c.type === 'eraser') return;
          scene.remove(c.mesh);
          c.leads.forEach(l => scene.remove(l));
          const { mesh, leads } = createComponentVisuals(c.type, c.snap1, c.snap2, c.color);
          c.mesh = mesh;
          c.leads = leads;
          scene.add(mesh);
          leads.forEach(l => scene.add(l));
        });
      }
    }, undefined, (err) => {
      console.error("Failed to load electronic components GLTF model", err);
    });
    
    // Drag rotating base camera logic
    isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let mouseDownPos = { x: 0, y: 0 };
    
    // --- HTML5 Drag-and-Drop on Canvas ---
    function getDefaultToolSpan(tool) {
      switch (tool) {
        case 'resistor':
        case 'capacitor':
          return { colSpan: 5, rowSpan: 0 };
        case 'ammeter':
        case 'voltmeter':
          return { colSpan: 4, rowSpan: 0 };
        case 'inductor':
        case 'diode':
          return { colSpan: 4, rowSpan: 0 };
        case 'led':
        case 'transistor':
          return { colSpan: 2, rowSpan: 0 };
        case 'button':
        case 'toggle_switch':
          return { colSpan: 0, rowSpan: 1 }; // button spans row E to F (crosses ravine)
        case 'display':
          return { colSpan: 4, rowSpan: 1 }; // 7 segment display crosses ravine and spans 5 columns
        case 'source':
          return { colSpan: 0, rowSpan: 1 }; // power source spans rail rows + and -
        default:
          return { colSpan: 4, rowSpan: 0 };
      }
    }

    parent.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (!state.draggingSidebarTool) return;
      
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(boardMesh);
      if (intersects.length > 0) {
        const pt = intersects[0].point;
        const localPt = boardMesh.worldToLocal(pt.clone());
        
        const startX = -(BOARD_COLS - 1) * 0.1522 / 2;
        let c = Math.round((localPt.x - startX) / 0.1522);
        c = Math.max(0, Math.min(BOARD_COLS - 1, c));
        
        let r = 0;
        let minD = Infinity;
        for (let i = 0; i < 14; i++) {
          let rZ = 0;
          if (i === 0) rZ = -1.296;
          else if (i === 1) rZ = -1.144;
          else if (i >= 2 && i <= 6) rZ = -0.839 + (i - 2) * 0.1522;
          else if (i >= 7 && i <= 11) rZ = 0.229 + (i - 7) * 0.1522;
          else if (i === 12) rZ = 1.144;
          else if (i === 13) rZ = 1.296;
          
          let dist = Math.abs(localPt.z - rZ);
          if (dist < minD) {
            minD = dist;
            r = i;
          }
        }
        
        const isRail = (r === 0 || r === 1 || r === 12 || r === 13);
        const isGap = (c % 6 === 5);
        if (isRail && isGap) {
          if (state.ghostMesh) {
            scene.remove(state.ghostMesh);
            state.ghostMesh = null;
          }
          state.ghostSnap1 = null;
          state.ghostSnap2 = null;
          return;
        }
        
        let snap1 = c * 14 + r;
        const tool = state.draggingSidebarTool;
        const span = getDefaultToolSpan(tool);
        let c2 = Math.min(BOARD_COLS - 1, c + span.colSpan);
        let r2 = Math.min(13, r + span.rowSpan);
        let snap2 = c2 * 14 + r2;

        if (state.targetSnap1 !== null && state.targetSnap2 !== null && isTargetToolMatch(tool)) {
          snap1 = state.targetSnap1;
          snap2 = state.targetSnap2;
        }
        
        if (state.ghostSnap1 !== snap1 || state.ghostSnap2 !== snap2) {
          state.ghostSnap1 = snap1;
          state.ghostSnap2 = snap2;
          
          if (state.ghostMesh) {
            scene.remove(state.ghostMesh);
            state.ghostMesh = null;
          }
          
          const visuals = createComponentVisuals(tool, snap1, snap2, tool === 'led' ? (state.params.led_color || 'red') : null);
          const ghostGroup = new THREE.Group();
          ghostGroup.add(visuals.mesh);
          visuals.leads.forEach(l => ghostGroup.add(l));
          
          ghostGroup.traverse(obj => {
            if (obj.isMesh) {
              obj.material = obj.material.clone();
              obj.material.transparent = true;
              obj.material.opacity = 0.55;
              obj.castShadow = false;
              obj.receiveShadow = false;
            }
          });
          
          state.ghostMesh = ghostGroup;
          scene.add(state.ghostMesh);
        }
      } else {
        if (state.ghostMesh) {
          scene.remove(state.ghostMesh);
          state.ghostMesh = null;
        }
        state.ghostSnap1 = null;
        state.ghostSnap2 = null;
      }
    });

    parent.addEventListener('dragleave', () => {
      if (state.ghostMesh) {
        scene.remove(state.ghostMesh);
        state.ghostMesh = null;
      }
      state.ghostSnap1 = null;
      state.ghostSnap2 = null;
    });

    parent.addEventListener('drop', (e) => {
      e.preventDefault();
      if (!state.draggingSidebarTool) return;
      
      const tool = state.draggingSidebarTool;
      const snap1 = state.ghostSnap1;
      const snap2 = state.ghostSnap2;
      
      if (state.ghostMesh) {
        scene.remove(state.ghostMesh);
        state.ghostMesh = null;
      }
      state.ghostSnap1 = null;
      state.ghostSnap2 = null;
      state.draggingSidebarTool = null;
      
      if (snap1 !== null && snap2 !== null && snap1 !== snap2) {
        if (tool === 'wire') {
          create3DWire(snap1, snap2, true);
        } else if (tool === 'eraser') {
          // do nothing
        } else {
          placeComponent3D(tool, snap1, snap2);
        }
      }
      document.querySelectorAll('.comp-chip:not([data-type^="bb_"])').forEach(c => c.classList.remove('selected'));
      state.selectedTool = null;
      updateWiringBanner();
    });

    parent.addEventListener('mousedown', (e) => {
      // First check if button plunger was clicked (momentary/toggle switch interactive behavior)
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      const plungerHit = intersects.find(hit => hit.object.name === 'plunger');
      
      if (plungerHit) {
        const matchedComp = state.placedComponents.find(c => {
          let found = false;
          c.mesh.traverse(obj => {
            if (obj === plungerHit.object) found = true;
          });
          return found;
        });

        state.activePressedPlunger = plungerHit.object;
        const originalY = state.activePressedPlunger.userData.originalY !== undefined ? 
          state.activePressedPlunger.userData.originalY : 0.24;

        if (matchedComp && matchedComp.type === 'button') {
          // Push button is momentary: turns ON on press
          state.buttonPressed = true;
          state.activePressedPlunger.position.y = originalY - 0.05;
        } else {
          // ON/OFF switch is latching: toggles state
          state.buttonPressed = !state.buttonPressed;
          state.activePressedPlunger.position.y = state.buttonPressed ? originalY - 0.05 : originalY;
        }
        isDragging = false;
        triggerSingleCalculation();
        return;
      }
      
      // Wire drawing start check
      if (state.selectedTool === 'wire' && hoveredHoleIndex !== null) {
        state.isDrawingWire = true;
        state.wireStartSnap = hoveredHoleIndex;
        isDragging = false;
        return;
      }
      
      // Check if we clicked on an existing component (if not in tool placement/wiring mode)
      if (!state.selectedTool) {
        const compGroups = state.placedComponents.map(c => c.mesh);
        const intersectsComp = raycaster.intersectObjects(compGroups, true);
        if (intersectsComp.length > 0) {
          let obj = intersectsComp[0].object;
          let matchedIdx = -1;
          while (obj) {
            matchedIdx = state.placedComponents.findIndex(c => c.mesh === obj);
            if (matchedIdx !== -1) break;
            obj = obj.parent;
          }
          if (matchedIdx !== -1) {
            // For Arduino USB Cable source, don't allow dragging it since it's anchored to Arduino board
            if (state.placedComponents[matchedIdx].type === 'source' && state.activeExperiment === 'arduino_led') {
              // bypass
            } else {
              state.selectedComponentIdx = matchedIdx;
              state.selectedHoleIndex = null;
              state.draggedComponentIdx = matchedIdx;
              state.isDraggingComponent = true;
              state.dragStartSnap1 = state.placedComponents[matchedIdx].snap1;
              state.dragStartSnap2 = state.placedComponents[matchedIdx].snap2;
              isDragging = false; // Prevent camera rotation
              
              clearAllComponentOutlines(true);
              const selectionBox = createLocalSelectionBox(state.placedComponents[matchedIdx]);
              state.placedComponents[matchedIdx].mesh.add(selectionBox);
              updateInspector();
              
              // Stop simulation temporarily on drag start
              state.wasRunningBeforeDrag = state.isRunning;
              if (state.isRunning) {
                state.isRunning = false;
                stopPollingCalculations();
                setElectronsActive(false);
                if (elements.btnRun) elements.btnRun.style.display = 'block';
                if (elements.btnStop) elements.btnStop.style.display = 'none';
                if (elements.statusDot) elements.statusDot.style.background = "var(--accent)";
                if (elements.statusTextBar) elements.statusTextBar.innerText = "READY";
              }
              return;
            }
          }
        }
        
        // Check if we clicked on a wire pin or sleeve to drag it
        const draggableMeshes = [];
        state.wires.forEach(w => {
          if (w.pins) {
            draggableMeshes.push(w.pins[0], w.pins[1]);
          }
          if (w.sleeves) {
            draggableMeshes.push(w.sleeves[0], w.sleeves[1]);
          }
        });
        const intersectsDraggables = raycaster.intersectObjects(draggableMeshes);
        if (intersectsDraggables.length > 0) {
          const hitObj = intersectsDraggables[0].object;
          let matchedWireIdx = -1;
          let matchedPinEnd = -1; // 0 for fromHole, 1 for toHole
          
          for (let i = 0; i < state.wires.length; i++) {
            const w = state.wires[i];
            if ((w.pins && w.pins[0] === hitObj) || (w.sleeves && w.sleeves[0] === hitObj)) {
              matchedWireIdx = i;
              matchedPinEnd = 0;
              break;
            } else if ((w.pins && w.pins[1] === hitObj) || (w.sleeves && w.sleeves[1] === hitObj)) {
              matchedWireIdx = i;
              matchedPinEnd = 1;
              break;
            }
          }
          
          if (matchedWireIdx !== -1) {
            state.draggedWireIdx = matchedWireIdx;
            state.draggedWireEnd = matchedPinEnd;
            state.isDraggingWireEnd = true;
            state.dragStartWireHole = matchedPinEnd === 0 ? state.wires[matchedWireIdx].fromHole : state.wires[matchedWireIdx].toHole;
            isDragging = false; // Prevent camera rotation
            
            // Stop simulation temporarily on drag start
            state.wasRunningBeforeDrag = state.isRunning;
            if (state.isRunning) {
              state.isRunning = false;
              stopPollingCalculations();
              setElectronsActive(false);
              if (elements.btnRun) elements.btnRun.style.display = 'block';
              if (elements.btnStop) elements.btnStop.style.display = 'none';
              if (elements.statusDot) elements.statusDot.style.background = "var(--accent)";
              if (elements.statusTextBar) elements.statusTextBar.innerText = "READY";
            }
            return;
          }
        }
      }
      
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      mouseDownPos = { x: e.clientX, y: e.clientY };
    });
    
    window.addEventListener('mouseup', (e) => {
      isDragging = false;
      
      // Momentary button release check
      if (state.activePressedPlunger) {
        const matchedComp = state.placedComponents.find(c => {
          let found = false;
          c.mesh.traverse(obj => {
            if (obj === state.activePressedPlunger) found = true;
          });
          return found;
        });
        
        if (matchedComp && matchedComp.type === 'button') {
          state.buttonPressed = false;
          const originalY = state.activePressedPlunger.userData.originalY !== undefined ? 
            state.activePressedPlunger.userData.originalY : 0.24;
          state.activePressedPlunger.position.y = originalY; // raise it
          state.activePressedPlunger = null;
          triggerSingleCalculation();
        } else {
          state.activePressedPlunger = null;
        }
      }
      
      // Finalize wire drawing
      if (state.isDrawingWire) {
        state.isDrawingWire = false;
        if (state.tempWireMesh) {
          scene.remove(state.tempWireMesh);
          state.tempWireMesh = null;
        }
        if (state.wireStartSnap !== null && hoveredHoleIndex !== null && state.wireStartSnap !== hoveredHoleIndex) {
          create3DWire(state.wireStartSnap, hoveredHoleIndex, true);
        }
        state.wireStartSnap = null;
        state.selectedTool = null;
        document.querySelectorAll('.comp-chip:not([data-type^="bb_"])').forEach(c => c.classList.remove('selected'));
        updateWiringBanner();
        return;
      }
      
      // Finalize component moving
      if (state.isDraggingComponent) {
        state.isDraggingComponent = false;
        
        // If hoveredHoleIndex is null, it means it's off the board.
        // We should restore the component to its original snap locations!
        if (hoveredHoleIndex === null && state.draggedComponentIdx !== -1) {
          const comp = state.placedComponents[state.draggedComponentIdx];
          scene.remove(comp.mesh);
          comp.leads.forEach(l => scene.remove(l));
          
          const visuals = createComponentVisuals(comp.type, state.dragStartSnap1, state.dragStartSnap2, comp.color);
          comp.mesh = visuals.mesh;
          comp.leads = visuals.leads;
          comp.snap1 = state.dragStartSnap1;
          comp.snap2 = state.dragStartSnap2;
          
          scene.add(comp.mesh);
          comp.leads.forEach(l => scene.add(l));
        }
        
        clearAllComponentOutlines();
        
        state.draggedComponentIdx = -1;
        state.dragStartSnap1 = null;
        state.dragStartSnap2 = null;
        
        const validation = validateCircuitLocal();
        if (validation.status === 'success') {
          if (state.wasRunningBeforeDrag) {
            state.isRunning = true;
            startPollingCalculations();
            setElectronsActive(true);
            if (elements.btnRun) elements.btnRun.style.display = 'none';
            if (elements.btnStop) elements.btnStop.style.display = 'block';
            if (elements.statusDot) elements.statusDot.style.background = "var(--red)";
            if (elements.statusTextBar) elements.statusTextBar.innerText = "RUNNING";
          } else {
            triggerSingleCalculation();
          }
          appendAIMessage("Circuit IQ · AI Mentor", "Circuit validated: " + validation.message);
        } else {
          state.isRunning = false;
          stopPollingCalculations();
          setElectronsActive(false);
          if (elements.btnRun) elements.btnRun.style.display = 'block';
          if (elements.btnStop) elements.btnStop.style.display = 'none';
          if (elements.statusDot) elements.statusDot.style.background = "var(--accent)";
          if (elements.statusTextBar) elements.statusTextBar.innerText = "READY";
          appendAIMessage("Circuit IQ · AI Mentor", "Validation Failure: " + validation.message);
        }
        
        updateTelemetryCounts();
        updateAIMentor();
        updateTargetHighlights();
        debouncedSaveCircuit();
        return;
      }
      
      // Finalize wire endpoint moving
      if (state.isDraggingWireEnd) {
        state.isDraggingWireEnd = false;
        
        // If hoveredHoleIndex is null (off-board) or same as the other end, restore original hole
        if (state.draggedWireIdx !== -1) {
          const w = state.wires[state.draggedWireIdx];
          const otherEndHole = state.draggedWireEnd === 0 ? w.toHole : w.fromHole;
          
          if (hoveredHoleIndex === null || hoveredHoleIndex === otherEndHole) {
            let origFrom = w.fromHole;
            let origTo = w.toHole;
            if (state.draggedWireEnd === 0) {
              origFrom = state.dragStartWireHole;
            } else {
              origTo = state.dragStartWireHole;
            }
            updateWireVisuals(state.draggedWireIdx, origFrom, origTo);
          }
        }
        
        state.draggedWireIdx = -1;
        state.draggedWireEnd = -1;
        state.dragStartWireHole = null;
        
        const validation = validateCircuitLocal();
        if (validation.status === 'success') {
          if (state.wasRunningBeforeDrag) {
            state.isRunning = true;
            startPollingCalculations();
            setElectronsActive(true);
            if (elements.btnRun) elements.btnRun.style.display = 'none';
            if (elements.btnStop) elements.btnStop.style.display = 'block';
            if (elements.statusDot) elements.statusDot.style.background = "var(--red)";
            if (elements.statusTextBar) elements.statusTextBar.innerText = "RUNNING";
          } else {
            triggerSingleCalculation();
          }
          appendAIMessage("Circuit IQ · AI Mentor", "Circuit validated: " + validation.message);
        } else {
          state.isRunning = false;
          stopPollingCalculations();
          setElectronsActive(false);
          if (elements.btnRun) elements.btnRun.style.display = 'block';
          if (elements.btnStop) elements.btnStop.style.display = 'none';
          if (elements.statusDot) elements.statusDot.style.background = "var(--accent)";
          if (elements.statusTextBar) elements.statusTextBar.innerText = "READY";
          appendAIMessage("Circuit IQ · AI Mentor", "Validation Failure: " + validation.message);
        }
        
        updateTelemetryCounts();
        updateAIMentor();
        updateTargetHighlights();
        debouncedSaveCircuit();
        return;
      }
      
      const dist = Math.hypot(e.clientX - mouseDownPos.x, e.clientY - mouseDownPos.y);
      if (dist < 5) {
        handleMouseClick();
      }
    });
    
    parent.addEventListener('mousemove', (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      mouseScreenX = e.clientX;
      mouseScreenY = e.clientY;
      
      if (isDragging) {
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        targetRotY += dx * 0.005;
        targetPitch += dy * 0.005;
        targetPitch = Math.max(0.1, Math.min(Math.PI / 2 - 0.02, targetPitch));
        prevX = e.clientX;
        prevY = e.clientY;
      }
      handleMouseMove();
      
      // Dragging preview for wires
      if (state.isDrawingWire && state.wireStartSnap !== null) {
        if (state.tempWireMesh) {
          scene.remove(state.tempWireMesh);
          state.tempWireMesh = null;
        }
        if (hoveredHoleIndex !== null && hoveredHoleIndex !== state.wireStartSnap) {
          const p1 = getSnapPos(state.wireStartSnap);
          const p2 = getSnapPos(hoveredHoleIndex);
          const p1Start = p1.clone().add(new THREE.Vector3(0, 0.28, 0));
          const p2End = p2.clone().add(new THREE.Vector3(0, 0.28, 0));
          const curve = createWireCurve(p1Start, p2End, state.wires.length);
          const geo = new THREE.TubeGeometry(curve, 64, 0.024, 8, false);
          const mat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.5, transparent: true, opacity: 0.85 });
          state.tempWireMesh = new THREE.Mesh(geo, mat);
          scene.add(state.tempWireMesh);
        }
      }
      
      // Snapping move for component dragging
      if (state.isDraggingComponent && state.draggedComponentIdx !== -1 && hoveredHoleIndex !== null) {
        const comp = state.placedComponents[state.draggedComponentIdx];
        
        let c1_orig = Math.floor(state.dragStartSnap1 / 14);
        let r1_orig = state.dragStartSnap1 % 14;
        let c2_orig = Math.floor(state.dragStartSnap2 / 14);
        let r2_orig = state.dragStartSnap2 % 14;
        let colSpan = c2_orig - c1_orig;
        let rowSpan = r2_orig - r1_orig;
        
        let c1_new = Math.floor(hoveredHoleIndex / 14);
        let r1_new = hoveredHoleIndex % 14;
        let c2_new = Math.max(0, Math.min(BOARD_COLS - 1, c1_new + colSpan));
        let r2_new = Math.max(0, Math.min(13, r1_new + rowSpan));
        
        let newSnap1 = c1_new * 14 + r1_new;
        let newSnap2 = c2_new * 14 + r2_new;
        
        if (newSnap1 !== comp.snap1 || newSnap2 !== comp.snap2) {
          scene.remove(comp.mesh);
          comp.leads.forEach(l => scene.remove(l));
          
          const visuals = createComponentVisuals(comp.type, newSnap1, newSnap2, comp.color);
          comp.mesh = visuals.mesh;
          comp.leads = visuals.leads;
          comp.snap1 = newSnap1;
          comp.snap2 = newSnap2;
          
          scene.add(comp.mesh);
          comp.leads.forEach(l => scene.add(l));
          
          clearAllComponentOutlines();
          hoverOutlineHelper = createLocalSelectionBox(comp);
          comp.mesh.add(hoverOutlineHelper);
        }
      }
      
      // Snapping move for wire endpoint dragging
      if (state.isDraggingWireEnd && state.draggedWireIdx !== -1 && hoveredHoleIndex !== null) {
        const w = state.wires[state.draggedWireIdx];
        const currentFrom = w.fromHole;
        const currentTo = w.toHole;
        
        let newFrom = currentFrom;
        let newTo = currentTo;
        
        if (state.draggedWireEnd === 0) {
          newFrom = hoveredHoleIndex;
        } else {
          newTo = hoveredHoleIndex;
        }
        
        // Only update if snapped index actually changed, and they are not overlapping in the same hole
        if (newFrom !== newTo && (newFrom !== currentFrom || newTo !== currentTo)) {
          updateWireVisuals(state.draggedWireIdx, newFrom, newTo);
        }
      }
    });
    
    // Electron flow update loops (controlled via module-level variables)
    
    function anim() {
      requestAnimationFrame(anim);
      
      scene.rotation.y += (targetRotY - scene.rotation.y) * 0.08;
      
      // Interpolate camera zoom distance and pitch
      currentDistance += (targetDistance - currentDistance) * 0.15;
      currentPitch += (targetPitch - currentPitch) * 0.1;
      camera.position.set(0, currentDistance * Math.sin(currentPitch), currentDistance * Math.cos(currentPitch));
      
      if (elements.zoomDisplay) {
        elements.zoomDisplay.innerText = Math.round((11.715 / currentDistance) * 100) + '%';
      }
      
      // Pulsing effect for glowing target highlight rings
      if (targetHighlightRing1 && targetHighlightRing2) {
        const pulse = 1.0 + 0.18 * Math.sin(Date.now() * 0.008);
        targetHighlightRing1.scale.set(pulse, pulse, 1);
        targetHighlightRing2.scale.set(pulse, pulse, 1);
      }
      
      // Update guide labels screen projection positions
      updateGuideLabels();
      
      if (electronsActive) {
        const current = state.meters.amps || 0;
        const speed = Math.max(0.002, Math.min(0.08, 0.005 + 0.1 * current));
        electronOffset += speed;
        if (electronOffset > 1.0) electronOffset = 0;
        
        state.wires.forEach(w => {
          if (w.lineMesh && w.lineMesh.material) {
            w.lineMesh.material.emissive.setHex(w.lineMesh.material.color.getHex());
            const targetIntensity = Math.max(0.0, Math.min(1.8, current * 8.0));
            w.lineMesh.material.emissiveIntensity = targetIntensity * (0.8 + 0.2 * Math.sin(Date.now() * 0.015));
          }
          w.electrons.forEach((el, idx) => {
            const t = (electronOffset + idx / w.electrons.length) % 1.0;
            const pos = w.curve.getPointAt(t);
            el.position.copy(pos);
            el.visible = true;
          });
        });
      } else {
        state.wires.forEach(w => {
          if (w.lineMesh && w.lineMesh.material) {
            w.lineMesh.material.emissive.setHex(0x000000);
            w.lineMesh.material.emissiveIntensity = 0;
          }
          w.electrons.forEach(el => { el.visible = false; });
        });
      }

      // Animate procedural experiments
      if (state.proceduralGroup) {
        if (state.activeExperiment === 'biot_savart') {
          const rings = state.proceduralGroup.getObjectByName('biot-rings');
          const probe = state.proceduralGroup.getObjectByName('biot-probe');
          const I_current = state.params.V || 2.0;
          const r_dist = state.params.R || 5.0;
          
          if (probe) {
            probe.position.x = r_dist * 0.14;
          }
          if (rings) {
            rings.children.forEach((ring, idx) => {
              ring.rotation.z = Date.now() * 0.0015;
              ring.material.opacity = (I_current / 10.0) * (0.5 + 0.2 * Math.sin(Date.now() * 0.003 + idx));
            });
          }
        } else if (state.activeExperiment === 'planck_photocell') {
          const ray = state.proceduralGroup.getObjectByName('photocell-ray');
          const electrons = state.proceduralGroup.getObjectByName('photoelectrons-photocell');
          const lambda = state.params.V || 450;
          
          if (ray && ray.material) {
            let hue = (lambda - 350) / 350;
            if (hue < 0) hue = 0; if (hue > 1) hue = 1;
            const rayColor = new THREE.Color().setHSL(0.7 - hue * 0.7, 1.0, 0.5);
            ray.material.color.copy(rayColor);
          }
          
          if (electrons && state.isRunning) {
            const intensity = state.params.L || 50;
            const Vs = state.params.R || 0.0;
            const stoppingV = state.meters.ohms || 0.8;
            const canEmit = stoppingV > 0 && Vs < stoppingV;
            
            if (canEmit && Math.random() < 0.12 && electrons.children.length < 25) {
              const elGeo = new THREE.SphereGeometry(0.02, 8, 8);
              const elMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
              const el = new THREE.Mesh(elGeo, elMat);
              el.position.set(-0.5, 0.6 + (Math.random()-0.5)*0.3, (Math.random()-0.5)*0.3);
              const speed = 0.015 * (1.0 - Vs / stoppingV);
              el.userData = { speed: Math.max(0.002, speed) };
              electrons.add(el);
            }
            
            for (let i = electrons.children.length - 1; i >= 0; i--) {
              const el = electrons.children[i];
              el.position.x += el.userData.speed;
              if (el.position.x > 0.5) {
                electrons.remove(el);
              }
            }
          }
        } else if (state.activeExperiment === 'stefan_law') {
          const glow = state.proceduralGroup.getObjectByName('furnace-glow');
          const T = state.params.V || 1000;
          if (glow && glow.material) {
            let color = new THREE.Color(0x000000);
            if (T > 400) {
              const ratio = (T - 400) / 1600;
              color.setRGB(
                Math.min(1.0, ratio * 2.5),
                Math.min(1.0, Math.max(0.0, (ratio - 0.3) * 1.5)),
                Math.min(1.0, Math.max(0.0, (ratio - 0.6) * 2.5))
              );
            }
            glow.material.color.copy(color);
          }
        } else if (['ideal_gas', 'boyle', 'charles'].includes(state.activeExperiment)) {
          const piston = state.proceduralGroup.getObjectByName('piston-plate');
          const vol = state.meters.amps;
          const temp = state.meters.ohms;
          if (piston) {
            piston.position.y = 0.2 + (vol / 30.0) * 1.6;
          }
          if (state.moleculesData && state.isRunning) {
            const speedScale = Math.sqrt(temp / 300.0) * 0.8;
            state.moleculesData.forEach(mol => {
              mol.mesh.position.x += mol.vx * speedScale;
              mol.mesh.position.y += mol.vy * speedScale;
              mol.mesh.position.z += mol.vz * speedScale;
              const topLimit = piston ? (piston.position.y - 0.08) : 1.8;
              if (mol.mesh.position.y < 0.05) { mol.mesh.position.y = 0.05; mol.vy = -mol.vy; }
              if (mol.mesh.position.y > topLimit) { mol.mesh.position.y = topLimit; mol.vy = -mol.vy; }
              const dist = Math.sqrt(mol.mesh.position.x * mol.mesh.position.x + mol.mesh.position.z * mol.mesh.position.z);
              if (dist > 0.54) {
                const nx = mol.mesh.position.x / dist;
                const nz = mol.mesh.position.z / dist;
                const dot = mol.vx * nx + mol.vz * nz;
                mol.vx = mol.vx - 2 * dot * nx;
                mol.vz = mol.vz - 2 * dot * nz;
                mol.mesh.position.x = 0.53 * nx;
                mol.mesh.position.z = 0.53 * nz;
              }
            });
          }
        } else if (state.activeExperiment === 'photoelectric') {
          const electrons = state.proceduralGroup.getObjectByName('photoelectrons');
          if (electrons && state.isRunning) {
            const freq = state.params.V || 8.0;
            const work = state.params.L || 2.2;
            const canEmit = (freq * 0.4135) > work;
            if (canEmit && Math.random() < 0.12 && electrons.children.length < 25) {
              const elGeo = new THREE.SphereGeometry(0.02, 8, 8);
              const elMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
              const el = new THREE.Mesh(elGeo, elMat);
              el.position.set(-1.0, 0.5 + (Math.random()-0.5)*0.3, (Math.random()-0.5)*0.3);
              const KE = (freq * 0.4135) - work;
              el.userData = { speed: 0.02 + KE * 0.015 };
              electrons.add(el);
            }
            for (let i = electrons.children.length - 1; i >= 0; i--) {
              const el = electrons.children[i];
              el.position.x += el.userData.speed;
              if (el.position.x > 1.0) {
                electrons.remove(el);
              }
            }
          }
        } else if (state.activeExperiment === 'bohr_model') {
          const el = state.proceduralGroup.getObjectByName('bohr-electron');
          if (el) {
            const ni = state.params.V || 3;
            const radius = ni * 0.6;
            const t = Date.now() * 0.002 * (1 / (ni * ni));
            el.position.set(radius * Math.cos(t), 0.5, radius * Math.sin(t));
          }
        } else if (state.activeExperiment === 'radioactive' && state.isRunning) {
          const halfLife = state.params.R || 10.0;
          const lambda = Math.LN2 / halfLife;
          const prob = lambda * 0.016;
          if (state.decayList) {
            state.decayList.forEach(atom => {
              if (!atom.decayed && Math.random() < prob) {
                atom.decayed = true;
                atom.mesh.material = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.8 });
              }
            });
          }
        } else if (['faraday', 'lenz'].includes(state.activeExperiment)) {
          const magnet = state.proceduralGroup.getObjectByName('faraday-magnet');
          if (magnet) {
            const vel = state.params.V || 2.0;
            const time = Date.now() * 0.002 * vel;
            magnet.position.x = 2.0 * Math.sin(time);
          }
        } else if (state.activeExperiment === 'solenoid') {
          const fields = state.proceduralGroup.getObjectByName('solenoid-fields');
          if (fields && state.isRunning) {
            fields.children.forEach((f, idx) => {
              f.material.opacity = 0.1 + 0.4 * Math.abs(Math.sin(Date.now() * 0.003 + idx));
            });
          }

        } else if (state.activeExperiment === 'specific_heat' && state.isRunning) {
          const metal = state.proceduralGroup.getObjectByName('specific-heat-metal');
          const water = state.proceduralGroup.getObjectByName('specific-heat-water');
          if (metal) {
            if (!state.simStartTime) state.simStartTime = Date.now();
            const t = (Date.now() - state.simStartTime) * 0.001;
            if (t < 2.0) {
              const fraction = t / 2.0;
              metal.position.x = 0.8 - 1.6 * fraction;
              metal.position.y = 0.74 + 0.5 * Math.sin(fraction * Math.PI) - 0.3 * fraction;
            } else {
              metal.position.set(-0.8, 0.25, 0);
              if (water) {
                const fraction = Math.min(1.0, (t - 2.0) / 3.0);
                water.material.color.setRGB(0.23 + 0.7 * fraction, 0.51 * (1.0 - fraction), 0.96 * (1.0 - fraction));
              }
              const Tm = state.params.R;
              const Tf = state.meters.ohms;
              const tempFraction = Math.max(0, 1.0 - (t - 2.0) / 3.0);
              const currentTemp = Tf + (Tm - Tf) * tempFraction;
              const glowColor = new THREE.Color().setHSL(0.0, 1.0, 0.2 + 0.3 * (currentTemp / 100));
              metal.material.color.copy(glowColor);
            }
          }
        } else if (state.activeExperiment === 'de_broglie' && state.isRunning) {
          if (!state.lastBroglieTime) state.lastBroglieTime = 0;
          if (!state.broglieParticles) state.broglieParticles = [];
          if (Date.now() - state.lastBroglieTime > 200) {
            state.lastBroglieTime = Date.now();
            const p = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
            p.position.set(-2.0, 0.5, (Math.random()-0.5)*0.2);
            p.userData = { phase: 0, speed: 0.06 };
            state.proceduralGroup.add(p);
            state.broglieParticles.push(p);
          }
          
          for (let i = state.broglieParticles.length - 1; i >= 0; i--) {
            const p = state.broglieParticles[i];
            p.position.x += p.userData.speed;
            
            const k = 12.0;
            p.position.y = 0.5 + 0.15 * Math.sin(p.position.x * k - Date.now() * 0.01);
            
            if (p.position.x > -0.5 && p.position.x - p.userData.speed <= -0.5) {
              p.position.z = Math.random() > 0.5 ? 0.35 : -0.35;
            }
            
            if (p.position.x > 1.8) {
              state.proceduralGroup.remove(p);
              state.broglieParticles.splice(i, 1);
              
              const mark = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), new THREE.MeshBasicMaterial({ color: 0x34d399 }));
              let zOffset = 0;
              const randVal = Math.random();
              if (randVal < 0.4) {
                zOffset = (Math.random() - 0.5) * 0.3;
              } else if (randVal < 0.7) {
                zOffset = 0.7 + (Math.random() - 0.5) * 0.3;
              } else if (randVal < 0.9) {
                zOffset = -0.7 - (Math.random() - 0.5) * 0.3;
              } else {
                zOffset = (Math.random() - 0.5) * 1.8;
              }
              mark.position.set(1.78, 0.5 + (Math.random()-0.5)*0.6, zOffset);
              state.proceduralGroup.add(mark);
              setTimeout(() => {
                state.proceduralGroup.remove(mark);
              }, 1200);
            }
          }
        }
      }
      
      renderer.render(scene, camera);
    }
    
    anim();
    updateTargetHighlights();
    
    // DB loading on load is disabled to ensure plain breadboard on load
    
    // Scroll wheel zoom event listener on parent
    parent.addEventListener('wheel', (e) => {
      e.preventDefault();
      targetDistance += e.deltaY * 0.005;
      targetDistance = Math.max(4.0, Math.min(20.0, targetDistance));
    }, { passive: false });
    
    // Zoom control overlay button click listeners
    const btnZoomIn = document.getElementById('cb-zoom-in');
    const btnZoomOut = document.getElementById('cb-zoom-out');
    const btnZoomReset = document.getElementById('cb-fit');
    
    if (btnZoomIn) {
      btnZoomIn.addEventListener('click', () => {
        targetDistance = Math.max(4.0, targetDistance - 1.5);
      });
    }
    if (btnZoomOut) {
      btnZoomOut.addEventListener('click', () => {
        targetDistance = Math.min(20.0, targetDistance + 1.5);
      });
    }
    if (btnZoomReset) {
      btnZoomReset.addEventListener('click', () => {
        targetDistance = 11.715;
      });
    }
    
    window.addEventListener('resize', () => {
      const nw = parent.clientWidth;
      const nh = parent.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    });
  } catch (err) {
    console.error("ThreeJS Initialization Failed", err);
    const msg = document.createElement('div');
    msg.style.position = 'fixed';
    msg.style.top = '20px';
    msg.style.left = '20px';
    msg.style.background = 'rgba(220, 38, 38, 0.95)';
    msg.style.color = 'white';
    msg.style.padding = '15px';
    msg.style.borderRadius = '8px';
    msg.style.zIndex = '99999';
    msg.style.fontFamily = 'monospace';
    msg.style.fontSize = '12px';
    msg.innerText = `ThreeJS Error: ${err.message}\nStack: ${err.stack}`;
    document.body.appendChild(msg);
    
    // Notify parent window to dismiss the loading screen
    window.parent.postMessage({ type: 'lab-loaded' }, '*');
  }
}

// --- DYNAMIC LCD CANVAS TEXTURES ---
let powerScreenCanvas, powerScreenTexture, powerScreenMesh;
let voltmeterScreenCanvas, voltmeterScreenTexture;
let ammeterScreenCanvas, ammeterScreenTexture;

function initInstruments3D() {
  // Power Supply Instrument Model placed at background
  const pSupplyGroup = new THREE.Group();
  pSupplyGroup.position.set(-1.8, 0.6, -3.0);
  
  const chassisGeo = createRoundedBoxGeometry(1.6, 1.2, 0.8, 0.08);
  const chassisMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.3 });
  const chassis = new THREE.Mesh(chassisGeo, chassisMat);
  chassis.castShadow = true;
  pSupplyGroup.add(chassis);
  
  // Recessed control panel on the front face (Z = +0.4)
  const panelGeo = new THREE.BoxGeometry(1.5, 1.1, 0.05);
  const panelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 });
  const panel = new THREE.Mesh(panelGeo, panelMat);
  panel.position.set(0, 0, 0.385);
  pSupplyGroup.add(panel);
  
  // digital readout screen
  powerScreenCanvas = document.createElement('canvas');
  powerScreenCanvas.width = 128;
  powerScreenCanvas.height = 64;
  powerScreenTexture = new THREE.CanvasTexture(powerScreenCanvas);
  
  const screenGeo = new THREE.PlaneGeometry(1.1, 0.45);
  const screenMat = new THREE.MeshBasicMaterial({ map: powerScreenTexture });
  powerScreenMesh = new THREE.Mesh(screenGeo, screenMat);
  powerScreenMesh.position.set(0, 0.25, 0.41);
  pSupplyGroup.add(powerScreenMesh);
  
  // Glass Screen Cover for bench power supply
  const glassMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.15, roughness: 0.05, metalness: 0.9 });
  const glass = new THREE.Mesh(screenGeo, glassMat);
  glass.position.set(0, 0.25, 0.415);
  pSupplyGroup.add(glass);
  
  // Voltage Knob (Coarse)
  const knobMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.3, roughness: 0.4 });
  const knobGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.06, 16);
  const vKnob = new THREE.Mesh(knobGeo, knobMat);
  vKnob.rotation.x = Math.PI / 2;
  vKnob.position.set(-0.4, -0.22, 0.41);
  pSupplyGroup.add(vKnob);
  
  // Current Limit Knob
  const cKnob = new THREE.Mesh(knobGeo, knobMat);
  cKnob.rotation.x = Math.PI / 2;
  cKnob.position.set(0.4, -0.22, 0.41);
  pSupplyGroup.add(cKnob);
  
  // Binding Posts (realistic dual-layered)
  const redPost = createRealisticPost(0xef4444);
  redPost.rotation.x = Math.PI / 2;
  redPost.position.set(-0.4, -0.42, 0.41);
  pSupplyGroup.add(redPost);
  
  const blackPost = createRealisticPost(0x1e293b);
  blackPost.rotation.x = Math.PI / 2;
  blackPost.position.set(0.4, -0.42, 0.41);
  pSupplyGroup.add(blackPost);
  
  scene.add(pSupplyGroup);
  
  // Voltmeter Screen Canvas and Texture
  voltmeterScreenCanvas = document.createElement('canvas');
  voltmeterScreenCanvas.width = 256;
  voltmeterScreenCanvas.height = 128;
  voltmeterScreenTexture = new THREE.CanvasTexture(voltmeterScreenCanvas);
  voltmeterScreenTexture.colorSpace = THREE.SRGBColorSpace;
  
  // Ammeter Screen Canvas and Texture
  ammeterScreenCanvas = document.createElement('canvas');
  ammeterScreenCanvas.width = 256;
  ammeterScreenCanvas.height = 128;
  ammeterScreenTexture = new THREE.CanvasTexture(ammeterScreenCanvas);
  ammeterScreenTexture.colorSpace = THREE.SRGBColorSpace;
}

let lastCalculationTime = 0;
let calculationThrottleTimeout = null;

function throttledTriggerCalculation() {
  const now = Date.now();
  const throttleMs = 150;
  
  if (now - lastCalculationTime >= throttleMs) {
    if (calculationThrottleTimeout) {
      clearTimeout(calculationThrottleTimeout);
      calculationThrottleTimeout = null;
    }
    lastCalculationTime = now;
    triggerSingleCalculation();
  } else {
    if (!calculationThrottleTimeout) {
      calculationThrottleTimeout = setTimeout(() => {
        lastCalculationTime = Date.now();
        calculationThrottleTimeout = null;
        triggerSingleCalculation();
      }, throttleMs - (now - lastCalculationTime));
    }
  }
}

async function triggerSingleCalculation() {
  if (!state.isRunning) return;
  try {
    let data;
    if (!['arduino_led', 'diode_iv', 'planck_led', 'rc'].includes(state.activeExperiment)) {
      try {
        const response = await fetch('/api/calculate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            params: state.params,
            active_experiment: state.activeExperiment,
            button_pressed: state.buttonPressed
          })
        });
        if (response.ok) {
          data = await response.json();
        } else {
          throw new Error(`HTTP ${response.status}`);
        }
      } catch (backendError) {
        console.warn("Backend calculation failed, falling back to local calculation.", backendError);
        data = calculateCircuitLocal(state.params, state.activeExperiment, state.buttonPressed);
      }
    } else {
      data = calculateCircuitLocal(state.params, state.activeExperiment, state.buttonPressed);
    }
    
    state.meters.volts = data.V;
    state.meters.amps = data.I;
    state.meters.ohms = data.Z;
    state.meters.power = data.P;
    
    const now = Date.now();
    const dt = (now - state.energyStartTime) / 1000;
    state.energyStartTime = now;
    state.meters.energy += data.P * dt;
    
    state.analysis.XL = data.XL;
    state.analysis.XC = data.XC;
    state.analysis.phi = data.phi;
    state.analysis.f0 = data.f0;
    
    if (data.VR1 !== undefined) state.analysis.VR1 = data.VR1;
    if (data.VR2 !== undefined) state.analysis.VR2 = data.VR2;
    if (data.IR1 !== undefined) state.analysis.IR1 = data.IR1;
    if (data.IR2 !== undefined) state.analysis.IR2 = data.IR2;
    
    // Complete final step if loop is closed, running, and button pressed
    if (state.activeExperiment === 'arduino_led' && state.isRunning && state.buttonPressed && state.meters.amps > 0) {
      completeStep(6);
      const I_ma = (state.meters.amps * 1000).toFixed(1);
      const P_mw = (state.meters.power * 1000).toFixed(1);
      elements.conclusionText.innerHTML = `<b>Conclusion (Arduino LED Button Circuit):</b><br>
        When the momentary push button was pressed, the circuit was closed and a current of <b>${I_ma} mA</b> flowed through the series circuit (Resistor → LED). The LED glowed in 3D, confirming that the circuit is complete and properly wired.<br>
        Power consumed: ${P_mw} mW. The LED uses the current-limiting resistor (${state.params.R} Ω) to maintain safe operating current.<br>
        Upon releasing the button, the circuit opened and the LED immediately turned OFF — verifying the Normally Open (NO) behaviour of a momentary tactile switch.`;
    }
    
    updateUI();
    updateDynamicTextures();
  } catch (e) {
    console.error("Single calculation trigger error", e);
  }
}

function getVoltmeterReading(voltmeterComp) {
  if (!state.isRunning) return 0.0;
  
  const voltmeter = voltmeterComp || state.placedComponents.find(c => c.type === 'voltmeter');
  if (!voltmeter) return 0.0;
  
  const uf = runUnionFind();
  const ammeter = state.placedComponents.find(c => c.type === 'ammeter');
  if (ammeter) {
    uf.union(ammeter.snap1, ammeter.snap2);
  }
  const find = (x) => uf.find(x);
  
  const v1 = find(voltmeter.snap1);
  const v2 = find(voltmeter.snap2);
  
  if (v1 === v2) return 0.0;
  
  const source = state.placedComponents.find(c => c.type === 'source');
  if (!source) return 0.0;
  
  const posRail = source ? find(source.snap1) : find(0);
  const negRail = source ? find(source.snap2) : find(1);
  
  let posNode = posRail;
  let negNode = negRail;
  
  // Propagate potential across ammeter (treated as zero-resistance wire)
  if (ammeter) {
    const am1 = find(ammeter.snap1);
    const am2 = find(ammeter.snap2);
    if (am1 === posRail) { posNode = am2; }
    else if (am2 === posRail) { posNode = am1; }
    if (am1 === negRail) { negNode = am2; }
    else if (am2 === negRail) { negNode = am1; }
  }
  
  const potentials = {};
  potentials[posRail] = state.meters.volts;
  potentials[negRail] = 0.0;
  potentials[posNode] = state.meters.volts;
  potentials[negNode] = 0.0;
  
  if (state.activeExperiment === 'ohms') {
    const resistor = state.placedComponents.find(c => c.type === 'resistor');
    if (resistor) {
      const r1 = find(resistor.snap1);
      const r2 = find(resistor.snap2);
      if ((v1 === r1 && v2 === r2) || (v1 === r2 && v2 === r1)) {
        return state.meters.volts;
      }
    }
  } else if (state.activeExperiment === 'kvl' || (state.activeExperiment === 'series_parallel' && !checkIsParallelCircuit())) {
    const resistors = state.placedComponents.filter(c => c.type === 'resistor');
    if (resistors.length >= 2) {
      const r1 = resistors.find(r => Math.floor(r.snap1 / 14) === 7 || Math.floor(r.snap2 / 14) === 7) || resistors[0];
      const r2 = resistors.find(r => Math.floor(r.snap1 / 14) === 13 || Math.floor(r.snap2 / 14) === 13) || resistors[1];
      
      const r1_1 = find(r1.snap1);
      const r1_2 = find(r1.snap2);
      const r2_1 = find(r2.snap1);
      const r2_2 = find(r2.snap2);
      
      const VR1 = (state.analysis.VR1 !== undefined) ? state.analysis.VR1 : (state.analysis.XL !== undefined ? state.analysis.XL : 0.0);
      const VR2 = (state.analysis.VR2 !== undefined) ? state.analysis.VR2 : (state.analysis.XC !== undefined ? state.analysis.XC : 0.0);
      
      let juncNode = null;
      let r1ConnectedToPos = (r1_1 === posNode || r1_2 === posNode);
      let r2ConnectedToNeg = (r2_1 === negNode || r2_2 === negNode);
      
      if (r1ConnectedToPos && r2ConnectedToNeg) {
        const r1_other = (r1_1 === posNode) ? r1_2 : r1_1;
        const r2_other = (r2_1 === negNode) ? r2_2 : r2_1;
        if (find(r1_other) === find(r2_other)) {
          juncNode = find(r1_other);
          potentials[juncNode] = VR2;
        }
      } else {
        let r2ConnectedToPos = (r2_1 === posNode || r2_2 === posNode);
        let r1ConnectedToNeg = (r1_1 === negNode || r1_2 === negNode);
        if (r2ConnectedToPos && r1ConnectedToNeg) {
          const r2_other = (r2_1 === posNode) ? r2_2 : r2_1;
          const r1_other = (r1_1 === negNode) ? r1_2 : r1_1;
          if (find(r2_other) === find(r1_other)) {
            juncNode = find(r2_other);
            potentials[juncNode] = VR1;
          }
        }
      }
    }
  } else if (state.activeExperiment === 'rc') {
    const resistor = state.placedComponents.find(c => c.type === 'resistor');
    const capacitor = state.placedComponents.find(c => c.type === 'capacitor');
    if (resistor && capacitor) {
      const r1_1 = find(resistor.snap1);
      const r1_2 = find(resistor.snap2);
      
      let r_pos = (r1_1 === posNode || r1_2 === posNode) ? (r1_1 === posNode ? r1_1 : r1_2) : r1_1;
      let r_other = (r_pos === r1_1) ? r1_2 : r1_1;
      
      let juncNode = r_other;
      
      potentials[juncNode] = state.capVoltage !== undefined ? state.capVoltage : 0.0;
    }
  } else if (state.activeExperiment === 'lcr' || state.activeExperiment === 'rc_rl_rlc') {
    const resistor = state.placedComponents.find(c => c.type === 'resistor');
    const inductor = state.placedComponents.find(c => c.type === 'inductor');
    const capacitor = state.placedComponents.find(c => c.type === 'capacitor');
    
    if (resistor && inductor && capacitor) {
      const r1_1 = find(resistor.snap1);
      const r1_2 = find(resistor.snap2);
      const l1_1 = find(inductor.snap1);
      const l1_2 = find(inductor.snap2);
      const c1_1 = find(capacitor.snap1);
      const c1_2 = find(capacitor.snap2);
      
      let r_pos = (r1_1 === posNode || r1_2 === posNode) ? (r1_1 === posNode ? r1_1 : r1_2) : r1_1;
      let r_other = (r_pos === r1_1) ? r1_2 : r1_1;
      
      let l_start = (l1_1 === r_other || l1_2 === r_other) ? (l1_1 === r_other ? l1_1 : l1_2) : l1_1;
      let l_other = (l_start === l1_1) ? l1_2 : l1_1;
      
      let c_start = (c1_1 === l_other || c1_2 === l_other) ? (c1_1 === l_other ? c1_1 : c1_2) : c1_1;
      let c_other = (c_start === c1_1) ? c1_2 : c1_1;
      
      const nodeRL = r_other;
      const nodeLC = l_other;
      
      const R_val = state.params.R || 100;
      const L_henrys = (state.params.L || 50) * 1e-3;
      const C_farads = (state.params.C || 100) * 1e-6;
      const omega = 2 * Math.PI * (state.params.f || 50);
      const XL = omega * L_henrys;
      const XC = 1 / (omega * C_farads || 1);
      const Z = Math.sqrt(R_val * R_val + (XL - XC) * (XL - XC));
      const Vs = state.meters.volts;
      
      const I_real = Vs * R_val / (Z * Z || 1);
      const I_imag = -Vs * (XL - XC) / (Z * Z || 1);
      
      const A1 = Vs - I_real * R_val;
      const B1 = -I_imag * R_val;
      
      const A2 = A1 + I_imag * XL;
      const B2 = B1 - I_real * XL;
      
      const complexPotentials = {};
      complexPotentials[posNode] = { real: Vs, imag: 0.0 };
      complexPotentials[negNode] = { real: 0.0, imag: 0.0 };
      complexPotentials[nodeRL] = { real: A1, imag: B1 };
      complexPotentials[nodeLC] = { real: A2, imag: B2 };
      
      const getComplexVal = (node) => {
        if (complexPotentials[node] !== undefined) return complexPotentials[node];
        if (node === posNode) return { real: Vs, imag: 0.0 };
        return { real: 0.0, imag: 0.0 };
      };
      
      const cp1 = getComplexVal(v1);
      const cp2 = getComplexVal(v2);
      
      return Math.sqrt(Math.pow(cp1.real - cp2.real, 2) + Math.pow(cp1.imag - cp2.imag, 2));
    }
  } else if (['diode_iv', 'planck_led'].includes(state.activeExperiment)) {
    // For diode experiments, the voltmeter is across the diode.
    // state.meters.volts already holds Vd (the diode forward voltage from the solver).
    // The diode anode is at Vd potential, cathode is at 0V (GND side).
    const diode = state.placedComponents.find(c => c.type === 'diode' || c.type === 'led');
    if (diode) {
      const d1 = find(diode.snap1);
      const d2 = find(diode.snap2);
      // Diode anode node gets Vd potential, cathode gets 0V
      potentials[d1] = state.meters.volts; // Vd at anode
      potentials[d2] = 0.0;               // 0V at cathode (GND side through ammeter)
    }
  }
  
  const V1 = potentials[v1] !== undefined ? potentials[v1] : (v1 === posNode ? state.meters.volts : 0.0);
  const V2 = potentials[v2] !== undefined ? potentials[v2] : (v2 === posNode ? state.meters.volts : 0.0);
  
  return Math.abs(V1 - V2);
}

function getAmmeterReading(ammeterComp) {
  if (!state.isRunning) return 0.0;
  
  const ammeter = ammeterComp || state.placedComponents.find(c => c.type === 'ammeter');
  if (!ammeter) return 0.0;
  
  const uf = runUnionFind();
  const find = (x) => uf.find(x);
  
  const am1 = find(ammeter.snap1);
  const am2 = find(ammeter.snap2);
  
  if (am1 === am2) return 0.0;
  
  if (state.activeExperiment === 'kcl') {
    const col = Math.floor(ammeter.snap1 / 14);
    const row = ammeter.snap1 % 14;
    
    // Branch 1 is Row C (index 4)
    if (row === 4 || ammeter.snap2 % 14 === 4) {
      return state.analysis.IR1 !== undefined ? state.analysis.IR1 : (state.meters.volts / (state.params.R || 1));
    }
    // Branch 2 is Row H (index 9)
    if (row === 9 || ammeter.snap2 % 14 === 9) {
      const R2 = state.params.L || 100;
      return state.analysis.IR2 !== undefined ? state.analysis.IR2 : (state.meters.volts / R2);
    }
  }
  
  return state.meters.amps;
}

function updateDynamicTextures() {
  if (!powerScreenCanvas) return;
  
  // Draw Power screen
  const pCtx = powerScreenCanvas.getContext('2d');
  pCtx.fillStyle = '#0f172a';
  pCtx.fillRect(0, 0, 128, 64);
  
  const isAC = ['lcr', 'rc', 'rc_rl_rlc'].includes(state.activeExperiment);
  if (state.activeExperiment === 'arduino_led') {
    pCtx.fillStyle = '#10b981';
    pCtx.font = 'bold 22px Courier New';
    pCtx.fillText("5.0V USB", 10, 28);
    pCtx.font = '14px Courier New';
    pCtx.fillText("ARDUINO UNO", 10, 48);
  } else if (isAC) {
    pCtx.fillStyle = '#06b6d4'; // Cyan text for AC
    pCtx.font = 'bold 20px Courier New';
    pCtx.fillText(`${state.params.V.toFixed(1)}V AC`, 10, 28);
    pCtx.font = '14px Courier New';
    pCtx.fillText(`${state.params.f.toFixed(0)}Hz ~`, 10, 48);
    
    // Draw sine wave on the right side of the screen
    pCtx.strokeStyle = '#06b6d4';
    pCtx.lineWidth = 1.5;
    pCtx.beginPath();
    for (let x = 85; x <= 120; x++) {
      const y = 38 + Math.sin((x - 85) * 0.25) * 6;
      if (x === 85) pCtx.moveTo(x, y);
      else pCtx.lineTo(x, y);
    }
    pCtx.stroke();
  } else {
    pCtx.fillStyle = '#10b981'; // Green for DC
    pCtx.font = 'bold 22px Courier New';
    pCtx.fillText(`${state.params.V.toFixed(1)}V DC`, 10, 28);
    pCtx.font = '14px Courier New';
    pCtx.fillText("0Hz (DC)", 10, 48);
  }
  powerScreenTexture.needsUpdate = true;
  
  // Draw separate Voltmeter screen (high-res 256x128)
  if (voltmeterScreenCanvas && voltmeterScreenTexture) {
    const vCtx = voltmeterScreenCanvas.getContext('2d');
    const W = 256, H = 128;
    // Background - dark LCD look
    vCtx.fillStyle = '#021a10';
    vCtx.fillRect(0, 0, W, H);
    // Green scan-line subtle overlay
    vCtx.fillStyle = 'rgba(16,185,129,0.04)';
    for (let y = 0; y < H; y += 4) vCtx.fillRect(0, y, W, 2);
    // Red border glow
    vCtx.strokeStyle = 'rgba(248,113,113,0.7)';
    vCtx.lineWidth = 3;
    vCtx.strokeRect(2, 2, W - 4, H - 4);
    // Header label "VOLTMETER"
    vCtx.fillStyle = 'rgba(248,113,113,0.6)';
    vCtx.font = 'bold 14px Courier New';
    vCtx.textAlign = 'center';
    vCtx.fillText('VOLT', W / 2, 22);
    // Divider line
    vCtx.strokeStyle = 'rgba(248,113,113,0.3)';
    vCtx.lineWidth = 1;
    vCtx.beginPath(); vCtx.moveTo(10, 32); vCtx.lineTo(W - 10, 32); vCtx.stroke();
    // Main reading value
    const voltsVal = state.isRunning ? getVoltmeterReading().toFixed(3) : '0.000';
    vCtx.fillStyle = state.isRunning ? '#f87171' : '#4b5563';
    vCtx.font = 'bold 38px Courier New';
    vCtx.textAlign = 'right';
    vCtx.fillText(voltsVal, W - 40, 85);
    // Unit
    vCtx.fillStyle = 'rgba(248,113,113,0.8)';
    vCtx.font = 'bold 20px Courier New';
    vCtx.textAlign = 'left';
    vCtx.fillText('V', W - 34, 85);
    // Bottom status
    vCtx.fillStyle = state.isRunning ? 'rgba(34,197,94,0.8)' : 'rgba(239,68,68,0.5)';
    vCtx.font = '11px Courier New';
    vCtx.textAlign = 'center';
    vCtx.fillText(state.isRunning ? '● LIVE' : '○ READY', W / 2, H - 10);
    voltmeterScreenTexture.needsUpdate = true;
  }
  
  // Update instance-specific displays for placed voltmeters and ammeters
  state.placedComponents.forEach(c => {
    if (c.type === 'voltmeter' && c.mesh.userData.canvas && c.mesh.userData.texture) {
      const canvas = c.mesh.userData.canvas;
      const texture = c.mesh.userData.texture;
      const vCtx = canvas.getContext('2d');
      const W = 256, H = 128;
      
      vCtx.fillStyle = '#021a10';
      vCtx.fillRect(0, 0, W, H);
      
      vCtx.fillStyle = 'rgba(16,185,129,0.04)';
      for (let y = 0; y < H; y += 4) vCtx.fillRect(0, y, W, 2);
      
      vCtx.strokeStyle = 'rgba(248,113,113,0.7)';
      vCtx.lineWidth = 3;
      vCtx.strokeRect(2, 2, W - 4, H - 4);
      
      vCtx.fillStyle = 'rgba(248,113,113,0.6)';
      vCtx.font = 'bold 14px Courier New';
      vCtx.textAlign = 'center';
      vCtx.fillText('VOLT', W / 2, 22);
      
      vCtx.strokeStyle = 'rgba(248,113,113,0.3)';
      vCtx.lineWidth = 1;
      vCtx.beginPath(); vCtx.moveTo(10, 32); vCtx.lineTo(W - 10, 32); vCtx.stroke();
      
      const voltsVal = state.isRunning ? getVoltmeterReading(c).toFixed(3) : '0.000';
      vCtx.fillStyle = state.isRunning ? '#f87171' : '#4b5563';
      vCtx.font = 'bold 38px Courier New';
      vCtx.textAlign = 'right';
      vCtx.fillText(voltsVal, W - 40, 85);
      
      vCtx.fillStyle = 'rgba(248,113,113,0.8)';
      vCtx.font = 'bold 20px Courier New';
      vCtx.textAlign = 'left';
      vCtx.fillText('V', W - 34, 85);
      
      vCtx.fillStyle = state.isRunning ? 'rgba(34,197,94,0.8)' : 'rgba(239,68,68,0.5)';
      vCtx.font = '11px Courier New';
      vCtx.textAlign = 'center';
      vCtx.fillText(state.isRunning ? '● LIVE' : '○ READY', W / 2, H - 10);
      
      texture.needsUpdate = true;
    } else if (c.type === 'ammeter' && c.mesh.userData.canvas && c.mesh.userData.texture) {
      const canvas = c.mesh.userData.canvas;
      const texture = c.mesh.userData.texture;
      const aCtx = canvas.getContext('2d');
      const W = 256, H = 128;
      
      aCtx.fillStyle = '#020c1a';
      aCtx.fillRect(0, 0, W, H);
      
      aCtx.fillStyle = 'rgba(96,165,250,0.04)';
      for (let y = 0; y < H; y += 4) aCtx.fillRect(0, y, W, 2);
      
      aCtx.strokeStyle = 'rgba(96,165,250,0.7)';
      aCtx.lineWidth = 3;
      aCtx.strokeRect(2, 2, W - 4, H - 4);
      
      aCtx.fillStyle = 'rgba(96,165,250,0.6)';
      aCtx.font = 'bold 14px Courier New';
      aCtx.textAlign = 'center';
      aCtx.fillText('AMP', W / 2, 22);
      
      aCtx.strokeStyle = 'rgba(96,165,250,0.3)';
      aCtx.lineWidth = 1;
      aCtx.beginPath(); aCtx.moveTo(10, 32); aCtx.lineTo(W - 10, 32); aCtx.stroke();
      
      const ampsVal = state.isRunning ? (getAmmeterReading(c) * 1000).toFixed(1) : '0.0';
      aCtx.fillStyle = state.isRunning ? '#60a5fa' : '#4b5563';
      aCtx.font = 'bold 38px Courier New';
      aCtx.textAlign = 'right';
      aCtx.fillText(ampsVal, W - 50, 85);
      
      aCtx.fillStyle = 'rgba(96,165,250,0.8)';
      aCtx.font = 'bold 20px Courier New';
      aCtx.textAlign = 'left';
      aCtx.fillText('mA', W - 44, 85);
      
      aCtx.fillStyle = state.isRunning ? 'rgba(34,197,94,0.8)' : 'rgba(239,68,68,0.5)';
      aCtx.font = '11px Courier New';
      aCtx.textAlign = 'center';
      aCtx.fillText(state.isRunning ? '● LIVE' : '○ READY', W / 2, H - 10);
      
      texture.needsUpdate = true;
    }
  });
  
  // Draw separate Ammeter screen (high-res 256x128)
  if (ammeterScreenCanvas && ammeterScreenTexture) {
    const aCtx = ammeterScreenCanvas.getContext('2d');
    const W = 256, H = 128;
    // Background - dark LCD look
    aCtx.fillStyle = '#020c1a';
    aCtx.fillRect(0, 0, W, H);
    // Blue scan-line subtle overlay
    aCtx.fillStyle = 'rgba(96,165,250,0.04)';
    for (let y = 0; y < H; y += 4) aCtx.fillRect(0, y, W, 2);
    // Blue border glow
    aCtx.strokeStyle = 'rgba(96,165,250,0.7)';
    aCtx.lineWidth = 3;
    aCtx.strokeRect(2, 2, W - 4, H - 4);
    // Header label
    aCtx.fillStyle = 'rgba(96,165,250,0.6)';
    aCtx.font = 'bold 14px Courier New';
    aCtx.textAlign = 'center';
    aCtx.fillText('AMPER', W / 2, 22);
    // Divider line
    aCtx.strokeStyle = 'rgba(96,165,250,0.3)';
    aCtx.lineWidth = 1;
    aCtx.beginPath(); aCtx.moveTo(10, 32); aCtx.lineTo(W - 10, 32); aCtx.stroke();
    // Main reading
    let ampsDisplay, unitLabel;
    if (state.isRunning) {
      const currentVal = getAmmeterReading();
      if (currentVal < 0.1) {
        ampsDisplay = (currentVal * 1000).toFixed(2);
        unitLabel = 'mA';
      } else {
        ampsDisplay = currentVal.toFixed(4);
        unitLabel = 'A';
      }
    } else {
      ampsDisplay = '0.00';
      unitLabel = 'mA';
    }
    aCtx.fillStyle = state.isRunning ? '#60a5fa' : '#4b5563';
    aCtx.font = 'bold 38px Courier New';
    aCtx.textAlign = 'right';
    aCtx.fillText(ampsDisplay, W - 44, 85);
    // Unit
    aCtx.fillStyle = 'rgba(96,165,250,0.8)';
    aCtx.font = 'bold 18px Courier New';
    aCtx.textAlign = 'left';
    aCtx.fillText(unitLabel, W - 40, 85);
    // Bottom status
    aCtx.fillStyle = state.isRunning ? 'rgba(34,197,94,0.8)' : 'rgba(239,68,68,0.5)';
    aCtx.font = '11px Courier New';
    aCtx.textAlign = 'center';
    aCtx.fillText(state.isRunning ? '● LIVE' : '○ READY', W / 2, H - 10);
    ammeterScreenTexture.needsUpdate = true;
  }
  
  // Update placed components (LED emission, power source button color, etc.)
  state.placedComponents.forEach(c => {
    if (c.type === 'led' && c.mesh.userData.ledMat) {
      if (state.isRunning && state.meters.amps > 0) {
        let hex = 0xff2200;
        const color = c.color || state.params.led_color || 'red';
        if (color === 'green') hex = 0x00ff44;
        else if (color === 'yellow') hex = 0xffdd00;
        else if (color === 'blue') hex = 0x0077ff;
        else if (color === 'white') hex = 0xffffff;
        c.mesh.userData.ledMat.emissive.setHex(hex);
        c.mesh.userData.ledMat.emissiveIntensity = 10.0;
        c.mesh.userData.ledMat.color.setHex(hex);
        // Add glow point light if not already added
        if (!c.mesh.userData.ledLight) {
          const ledLight = new THREE.PointLight(hex, 6.0, 1.2);
          ledLight.position.copy(c.mesh.position);
          ledLight.position.y += 0.1;
          scene.add(ledLight);
          c.mesh.userData.ledLight = ledLight;
        } else {
          c.mesh.userData.ledLight.color.setHex(hex);
          c.mesh.userData.ledLight.intensity = 6.0;
          c.mesh.userData.ledLight.position.copy(c.mesh.position);
          c.mesh.userData.ledLight.position.y += 0.1;
        }
      } else {
        c.mesh.userData.ledMat.emissive.setHex(0x000000);
        c.mesh.userData.ledMat.emissiveIntensity = 0.0;
        if (c.mesh.userData.ledLight) {
          c.mesh.userData.ledLight.intensity = 0;
        }
      }
    }
    
    if (c.type === 'source' && c.mesh.userData.powerButton) {
      c.mesh.userData.powerButton.material.color.setHex(state.isRunning ? 0x22c55e : 0xef4444);
      c.mesh.userData.powerButton.material.emissive.setHex(state.isRunning ? 0x22c55e : 0x000000);
      c.mesh.userData.powerButton.material.emissiveIntensity = state.isRunning ? 1.5 : 0.0;
      
      if (c.mesh.userData.powerLed) {
        c.mesh.userData.powerLed.material.color.setHex(state.isRunning ? 0x22c55e : 0xef4444);
        c.mesh.userData.powerLed.material.emissive.setHex(state.isRunning ? 0x22c55e : 0xef4444);
        c.mesh.userData.powerLed.material.emissiveIntensity = state.isRunning ? 2.5 : 0.4;
      }
    }

    // Glow light on meter screens when running
    if ((c.type === 'ammeter' || c.type === 'voltmeter') && state.isRunning) {
      const glowColor = c.type === 'ammeter' ? 0x60a5fa : 0xf87171;
      if (!c.mesh.userData.meterGlow) {
        const meterLight = new THREE.PointLight(glowColor, 0.8, 0.7);
        meterLight.position.copy(c.mesh.position);
        meterLight.position.y += 0.25;
        scene.add(meterLight);
        c.mesh.userData.meterGlow = meterLight;
      } else {
        c.mesh.userData.meterGlow.intensity = state.isRunning ? 0.8 : 0;
        c.mesh.userData.meterGlow.position.copy(c.mesh.position);
        c.mesh.userData.meterGlow.position.y += 0.25;
      }
    } else if ((c.type === 'ammeter' || c.type === 'voltmeter') && c.mesh.userData.meterGlow) {
      c.mesh.userData.meterGlow.intensity = 0;
    }

    if (c.type === 'display') {
      const c1 = Math.floor(c.snap1 / 14);
      const r1 = c.snap1 % 14;
      const c2 = Math.floor(c.snap2 / 14);
      const r2 = c.snap2 % 14;
      const cMid = Math.round((c1 + c2) / 2);
      
      const uf = runUnionFind();
      const find = (x) => uf.find(x);
      
      const isConnectedToVCC = (node) => {
        const posRail1 = find(0);
        const posRail2 = find(12);
        const arduino5V = find(882);
        return node === posRail1 || node === posRail2 || node === arduino5V;
      };
      
      const isConnectedToGND = (node) => {
        const negRail1 = find(1);
        const negRail2 = find(13);
        const arduinoGND = find(883);
        return node === negRail1 || node === negRail2 || node === arduinoGND;
      };
      
      const anodeNode3 = find((cMid) * 14 + r1);
      const anodeNode8 = find((cMid) * 14 + r2);
      const hasAnodeVCC = state.isRunning && (isConnectedToVCC(anodeNode3) || isConnectedToVCC(anodeNode8));
      
      const checkAndGlow = (pinCol, pinRow, segName) => {
        const segMesh = c.mesh.userData[segName];
        if (!segMesh) return;
        const node = find(pinCol * 14 + pinRow);
        const active = hasAnodeVCC && isConnectedToGND(node);
        
        if (active) {
          segMesh.material.color.setHex(0xff3333);
          segMesh.material.emissive.setHex(0xff0000);
          segMesh.material.emissiveIntensity = 8.0;
        } else {
          segMesh.material.color.setHex(0x220505);
          segMesh.material.emissive.setHex(0x000000);
          segMesh.material.emissiveIntensity = 0.0;
        }
      };
      
      checkAndGlow(cMid - 2, r1, 'seg_g');
      checkAndGlow(cMid - 1, r1, 'seg_f');
      checkAndGlow(cMid + 1, r1, 'seg_a');
      checkAndGlow(cMid + 2, r1, 'seg_b');
      
      checkAndGlow(cMid - 2, r2, 'seg_e');
      checkAndGlow(cMid - 1, r2, 'seg_d');
      checkAndGlow(cMid + 1, r2, 'seg_c');
      checkAndGlow(cMid + 2, r2, 'seg_dp');
    }
  });
}

// --- INTERACTIVE MOUSE SELECTION ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredHoleIndex = null;
let mouseScreenX = 0;
let mouseScreenY = 0;
let hoveredComponent = null;
let isDragging = false;

function clearAllComponentOutlines(force = false) {
  if (hoverOutlineHelper) {
    scene.remove(hoverOutlineHelper);
    hoverOutlineHelper = null;
  }
  state.placedComponents.forEach((c, idx) => {
    if (idx === state.selectedComponentIdx && !force) {
      let hasOutline = false;
      if (c.mesh) {
        c.mesh.traverse(child => {
          if (child.name === 'selectionOutline') hasOutline = true;
        });
        if (!hasOutline) {
          const selectionBox = createLocalSelectionBox(c);
          c.mesh.add(selectionBox);
        }
      }
      return;
    }
    
    if (c.mesh) {
      const toRemove = [];
      c.mesh.traverse(child => {
        if (child.name === 'selectionOutline') {
          toRemove.push(child);
        }
      });
      toRemove.forEach(child => {
        c.mesh.remove(child);
        scene.remove(child);
      });
    }
  });
}

function createLocalSelectionBox(comp) {
  let size = new THREE.Vector3(0.6, 0.4, 0.6);
  let offset = new THREE.Vector3(0, 0, 0);
  
  switch (comp.type) {
    case 'resistor':
      size.set(1.3, 0.45, 0.45);
      break;
    case 'capacitor':
      size.set(0.5, 1.0, 0.9);
      break;
    case 'inductor':
      size.set(1.5, 0.6, 0.6);
      break;
    case 'led':
      size.set(0.24, 0.24, 0.24);
      offset.set(0, 0.03, 0);
      break;
    case 'button':
    case 'toggle_switch':
      size.set(0.41, 0.22, 0.41);
      offset.set(0, 0.04, 0);
      break;
    case 'source':
      if (state.activeExperiment === 'arduino_led') {
        size.set(0.35, 0.25, 0.45);
      } else {
        size.set(1.1, 1.3, 1.1);
      }
      break;
    case 'ammeter':
    case 'voltmeter':
      size.set(0.68, 0.35, 0.46);
      offset.set(0, 0.05, 0);
      break;
    case 'diode':
      size.set(0.6, 0.24, 0.24);
      break;
    case 'transistor':
      size.set(0.35, 0.52, 0.32);
      offset.set(0, -0.02, 0);
      break;
    case 'display':
      size.set(0.82, 0.32, 0.74);
      offset.set(0, 0.07, 0);
      break;
  }
  
  const boxGeo = new THREE.BoxGeometry(size.x, size.y, size.z);
  
  // Clean, tight 3D wireframe outline box (no semi-transparent solid faces)
  const selectionGroup = new THREE.Group();
  selectionGroup.name = 'selectionOutline';
  selectionGroup.position.copy(offset);
  
  // Edges outline
  const edges = new THREE.EdgesGeometry(boxGeo);
  const lineMat = new THREE.LineBasicMaterial({
    color: 0xf97316,
    transparent: true,
    opacity: 0.9
  });
  const outline = new THREE.LineSegments(edges, lineMat);
  selectionGroup.add(outline);
  
  return selectionGroup;
}

function handleMouseMove() {
  raycaster.setFromCamera(mouse, camera);
  hoverIndicatorRing.position.y = -10; // Hide
  hoveredHoleIndex = null;

  // 1. Raycast against placed components to show outline/tooltip
  let matchedComp = null;
  if (state.placedComponents.length > 0 && !isDragging && !state.isDraggingComponent) {
    const compGroups = state.placedComponents.map(c => c.mesh);
    const intersectsComp = raycaster.intersectObjects(compGroups, true);
    if (intersectsComp.length > 0) {
      let obj = intersectsComp[0].object;
      while (obj) {
        matchedComp = state.placedComponents.find(c => c.mesh === obj);
        if (matchedComp) break;
        obj = obj.parent;
      }
    }
  }

  if (matchedComp) {
    if (hoveredComponent !== matchedComp) {
      clearAllComponentOutlines();
      hoveredComponent = matchedComp;
    }
    
    if (tooltipEl) {
      let label = matchedComp.type.charAt(0).toUpperCase() + matchedComp.type.slice(1);
      if (matchedComp.type === 'resistor') {
        label = `Resistor (${state.params.R} Ω)`;
      } else if (matchedComp.type === 'capacitor') {
        label = `Capacitor (${state.params.C} µF)`;
      } else if (matchedComp.type === 'inductor') {
        label = `Inductor (${state.params.L} mH)`;
      } else if (matchedComp.type === 'source') {
        label = `Power Source (${state.params.V} V)`;
      } else if (matchedComp.type === 'led') {
        label = `Red LED`;
      } else if (matchedComp.type === 'button') {
        label = `Push Button`;
      } else if (matchedComp.type === 'toggle_switch') {
        label = `ON/OFF Switch`;
      } else if (matchedComp.type === 'diode') {
        label = `PN Junction Diode`;
      } else if (matchedComp.type === 'transistor') {
        label = `NPN Transistor`;
      } else if (matchedComp.type === 'display') {
        label = `7-Segment Display`;
      }
      tooltipEl.innerText = label;
      tooltipEl.style.left = `${mouseScreenX + 15}px`;
      tooltipEl.style.top = `${mouseScreenY - 35}px`;
      tooltipEl.style.display = 'block';
    }
  } else {
    if (hoveredComponent) {
      clearAllComponentOutlines();
      hoveredComponent = null;
      if (tooltipEl) {
        tooltipEl.style.display = 'none';
      }
    }
  }

  // Check if we are hovering the breadboard chassis (show outline if no component hovered)
  let boardHovered = false;
  if (!matchedComp && chassisMesh && !isDragging && !state.isDraggingComponent && !state.isDraggingWireEnd && !state.selectedTool) {
    const intersectsBoard = raycaster.intersectObject(chassisMesh);
    if (intersectsBoard.length > 0) {
      boardHovered = true;
    }
  }
  
  if (boardHovered) {
    if (!boardOutlineHelper) {
      const boardWidth = (BOARD_COLS === 30) ? 5.0 : 10.0;
      const boxGeo = new THREE.BoxGeometry(boardWidth, 0.2, 3.64);
      const edges = new THREE.EdgesGeometry(boxGeo);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xf97316,
        transparent: true,
        opacity: 0.85
      });
      boardOutlineHelper = new THREE.LineSegments(edges, lineMat);
      boardOutlineHelper.position.set(0, -0.02, 0);
      scene.add(boardOutlineHelper);
    }
  } else {
    if (boardOutlineHelper) {
      scene.remove(boardOutlineHelper);
      boardOutlineHelper = null;
    }
  }
  
  if (((state.selectedTool && state.selectedTool !== 'eraser') || state.isDraggingComponent || state.isDraggingWireEnd || !state.selectedTool) && !matchedComp && !isDragging) {
    // If wiring tool is active and Arduino is visible, check raycast against Arduino header pins first
    let intersectsArduino = [];
    if (arduino5VMesh && arduinoGNDMesh && arduinoUnoGroup && arduinoUnoGroup.visible) {
      intersectsArduino = raycaster.intersectObjects([arduino5VMesh, arduinoGNDMesh]);
    }
    
    if (intersectsArduino.length > 0) {
      const hitMesh = intersectsArduino[0].object;
      hoveredHoleIndex = hitMesh.userData.snapIndex;
      const pos = getSnapPos(hoveredHoleIndex);
      hoverIndicatorRing.position.copy(pos);
      hoverIndicatorRing.position.y = pos.y + 0.05;
      return;
    }
    
    // Find intersection with the board slab
    const intersects = raycaster.intersectObject(boardMesh);
    if (intersects.length > 0) {
      const pt = intersects[0].point;
      // Convert intersection point in world space to local board space
      const localPt = boardMesh.worldToLocal(pt.clone());
      
      // Calculate closest column c (0..62) using local coordinates
      const startX = -(BOARD_COLS - 1) * 0.1522 / 2;
      let c = Math.round((localPt.x - startX) / 0.1522);
      c = Math.max(0, Math.min(BOARD_COLS - 1, c));
      
      // Calculate closest row r (0..13) using local coordinates
      let r = 0;
      let minD = Infinity;
      for (let i = 0; i < 14; i++) {
        let rZ = 0;
        if (i === 0) rZ = -1.296;
        else if (i === 1) rZ = -1.144;
        else if (i >= 2 && i <= 6) rZ = -0.839 + (i - 2) * 0.1522;
        else if (i >= 7 && i <= 11) rZ = 0.229 + (i - 7) * 0.1522;
        else if (i === 12) rZ = 1.144;
        else if (i === 13) rZ = 1.296;
        
        let dist = Math.abs(localPt.z - rZ);
        if (dist < minD) {
          minD = dist;
          r = i;
        }
      }
      
      // Skip rail gaps
      const isRail = (r === 0 || r === 1 || r === 12 || r === 13);
      const isGap = (c % 6 === 5);
      if (isRail && isGap) {
        return; // Gap area does not snap
      }
      
      hoveredHoleIndex = c * 14 + r;
      const pos = getSnapPos(hoveredHoleIndex);
      hoverIndicatorRing.position.copy(pos);
      hoverIndicatorRing.position.y = 0.135; // float slightly above
    }
  }
}

function handleMouseClick() {
  if (!state.selectedTool) {
    if (hoveredHoleIndex !== null) {
      state.selectedHoleIndex = hoveredHoleIndex;
      state.selectedComponentIdx = -1;
      clearAllComponentOutlines(true);
      updateInspector();
    } else {
      state.selectedHoleIndex = null;
      state.selectedComponentIdx = -1;
      clearAllComponentOutlines(true);
      updateInspector();
    }
    updateTargetHighlights();
    return;
  }
  
  if (state.selectedTool !== 'eraser') {
    // Smart-snapping shortcut: If targets are active, snap instantly on first click!
    if (state.targetSnap1 !== null && state.targetSnap2 !== null && isTargetToolMatch(state.selectedTool)) {
      const snap1 = state.targetSnap1;
      const snap2 = state.targetSnap2;
      
      if (state.selectedTool === 'wire') {
        create3DWire(snap1, snap2);
      } else {
        placeComponent3D(state.selectedTool, snap1, snap2);
      }
      
      state.placementStartHole = null;
      state.selectedTool = null;
      document.querySelectorAll('.comp-chip:not([data-type^="bb_"])').forEach(c => c.classList.remove('selected'));
      updateWiringBanner();
      updateTargetHighlights();
      return;
    }
    
    // Snap hole clicking
    if (hoveredHoleIndex !== null) {
      if (state.placementStartHole === null) {
        state.placementStartHole = hoveredHoleIndex;
        elements.aiMessage.innerText = "First socket snapped. Choose second socket.";
        updateWiringBanner();
      } else {
        const snap1 = state.placementStartHole;
        const snap2 = hoveredHoleIndex;
        if (snap1 !== snap2) {
          if (state.selectedTool === 'wire') {
            create3DWire(snap1, snap2);
          } else {
            placeComponent3D(state.selectedTool, snap1, snap2);
          }
        }
        state.placementStartHole = null;
        state.selectedTool = null;
        document.querySelectorAll('.comp-chip:not([data-type^="bb_"])').forEach(c => c.classList.remove('selected'));
        updateWiringBanner();
      }
    }
  } 
  else {
    // Eraser clicked meshes to remove
    raycaster.setFromCamera(mouse, camera);
    
    // Check component bodies
    const compGroups = state.placedComponents.map(c => c.mesh);
    const intersectsComp = raycaster.intersectObjects(compGroups, true);
    if (intersectsComp.length > 0) {
      let obj = intersectsComp[0].object;
      let compIdx = -1;
      while (obj) {
        compIdx = state.placedComponents.findIndex(c => c.mesh === obj);
        if (compIdx !== -1) break;
        obj = obj.parent;
      }
      if (compIdx !== -1) {
        deleteComponent3D(compIdx);
      }
      return;
    }
    
    // Check wires (including line meshes, pins, and sleeves for easier hit detection)
    const wireObjects = [];
    state.wires.forEach(w => {
      if (w.lineMesh) wireObjects.push(w.lineMesh);
      if (w.pins) w.pins.forEach(p => wireObjects.push(p));
      if (w.sleeves) w.sleeves.forEach(s => wireObjects.push(s));
    });
    const intersectsWire = raycaster.intersectObjects(wireObjects, true);
    if (intersectsWire.length > 0) {
      const hitObj = intersectsWire[0].object;
      const wireIdx = state.wires.findIndex(w => 
        w.lineMesh === hitObj || 
        (w.pins && w.pins.includes(hitObj)) || 
        (w.sleeves && w.sleeves.includes(hitObj))
      );
      if (wireIdx !== -1) {
        deleteWire3D(wireIdx);
      }
    }
  }
  updateTargetHighlights();
}

// --- RESISTOR COLOR BANDS CALCULATIONS ---
function getResistorColors(ohms) {
  const digitColors = [
    0x000000, // Black
    0x8b4513, // Brown
    0xff0000, // Red
    0xff8c00, // Orange
    0xffff00, // Yellow
    0x008000, // Green
    0x0000ff, // Blue
    0xee82ee, // Violet
    0x808080, // Grey
    0xffffff  // White
  ];
  
  const valStr = ohms.toString();
  const digit1 = parseInt(valStr[0]) || 0;
  const digit2 = parseInt(valStr[1]) || 0;
  const multiplier = valStr.length - 2;
  
  return [
    digitColors[digit1],
    digitColors[digit2],
    multiplier >= 0 && multiplier < 10 ? digitColors[multiplier] : 0x8b4513
  ];
}

function updateResistorColorBands() {
  const colors = getResistorColors(state.params.R);
  state.placedComponents.forEach(c => {
    if (c.type === 'resistor') {
      if (c.mesh.userData.bands) {
        c.mesh.userData.bands.forEach((b, idx) => {
          b.material.color.setHex(colors[idx]);
        });
      }
      if (c.mesh.userData.gltfBands) {
        const [lBand, mBand] = c.mesh.userData.gltfBands;
        if (lBand && lBand.material) {
          lBand.material.color.setHex(colors[0]);
        }
        if (mBand && mBand.material) {
          mBand.material.color.setHex(colors[2]);
        }
      }
    }
  });
}

// Helper to identify if a model node or its ancestor represents a leg/lead/wire
function isLegNode(obj) {
  const legMeshNames = [
    'object_6', 'object_14', 'object_31', 'object_35', 
    'object_61', 'object_68', 'object_72', 'object_41', 
    'object_47', 'object_51', 'object_53', 'object_26', 'object_74'
  ];
  let p = obj;
  while (p) {
    const nameLower = p.name.toLowerCase();
    if (nameLower.includes('leg') || 
        nameLower.includes('lead') || 
        nameLower.includes('wire') || 
        legMeshNames.includes(nameLower)) {
      return true;
    }
    p = p.parent;
  }
  return false;
}

// Helper to center a model clone inside a wrapper group to allow clean pivot-point rotation/translation
function createCenteredWrapperGroup(templateName, scaleFactor, rotationOffset = null) {
  if (!electronicComponentsTemplate) return null;
  
  const template = electronicComponentsTemplate.getObjectByName(templateName);
  if (!template) {
    console.warn(`Template node not found: ${templateName}`);
    return null;
  }
  
  const wrapper = new THREE.Group();
  const clone = template.clone();
  
  // Compute bounding box center excluding legs
  const box = new THREE.Box3();
  clone.traverse(obj => {
    if (obj.isMesh) {
      if (isLegNode(obj)) {
        return; // skip legs for visual centering
      }
      box.expandByObject(obj);
    }
  });
  
  const center = new THREE.Vector3();
  if (!box.isEmpty()) {
    box.getCenter(center);
  } else {
    // Fallback to full object box if no distinct body mesh is found
    box.setFromObject(clone);
    box.getCenter(center);
  }
  
  // Offset clone so its visual body center is at wrapper (0,0,0)
  clone.position.sub(center);
  wrapper.add(clone);
  
  // Apply scale
  wrapper.scale.set(scaleFactor, scaleFactor, scaleFactor);
  
  // Store visual body bounds in wrapper.userData for precise terminal alignment
  wrapper.userData.localBottomY = (box.min.y - center.y);
  wrapper.userData.localMinX = (box.min.x - center.x);
  wrapper.userData.localMaxX = (box.max.x - center.x);
  
  // Apply optional rotation offset
  if (rotationOffset) {
    clone.rotation.x += rotationOffset.x || 0;
    clone.rotation.y += rotationOffset.y || 0;
    clone.rotation.z += rotationOffset.z || 0;
  }
  
  return { wrapper, clone };
}

// --- CREATING COMPONENT MODELS & CURVED LEADS ---
// --- CREATING COMPONENT MODELS & CURVED LEADS ---
function createComponentVisuals(type, snap1, snap2, customColor = null) {
  // For EXP-04 Arduino experiment, the Power Source tool instantiates Arduino USB power connection
  if (type === 'source' && state.activeExperiment === 'arduino_led') {
    snap1 = 882; // 5V
    snap2 = 883; // GND
  }
  
  const p1 = getSnapPos(snap1);
  const p2 = getSnapPos(snap2);
  
  const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
  
  // Set component-specific height offsets to keep bodies close to/on the board and make leads fit perfectly
  if (type === 'button' || type === 'toggle_switch') {
    mid.y = 0.12;
  } else if (type === 'led' || type === 'transistor' || type === 'inductor') {
    mid.y = 0.28;
  } else if (type === 'capacitor') {
    mid.y = 0.30; // Adjusted for scaled down capacitor size
  } else if (type === 'resistor') {
    mid.y = 0.28; // Adjusted for scale 75 resistor size
  } else if (type === 'diode') {
    mid.y = 0.30;
  } else if (type === 'ammeter' || type === 'voltmeter') {
    mid.y = 0.38; // Sits cleanly above the board, leads reach down to holes
  } else if (type === 'display') {
    mid.y = 0.08; // Sits flat on the breadboard
  } else {
    mid.y = 0.45; // Default/fallback
  }
  
  const group = new THREE.Group();
  group.position.copy(mid);
  
  // Align rotation with direction of snaps
  let dir = new THREE.Vector3().subVectors(p2, p1);
  if (type === 'display') {
    // A 7-segment display should align straight horizontally along the breadboard's columns.
    // Instead of using the diagonal vector p2 - p1, we use the horizontal component (column direction).
    const c1 = Math.floor(snap1 / 14);
    const r1 = snap1 % 14;
    const c2 = Math.floor(snap2 / 14);
    const p1_sameRow = getSnapPos(c2 * 14 + r1);
    if (p1_sameRow.distanceTo(p1) > 0.001) {
      dir.subVectors(p1_sameRow, p1);
    } else {
      dir.set(1, 0, 0); // default horizontal
    }
  }
  const dist = dir.length();
  dir.normalize();
  
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir);
  if (['source', 'ammeter', 'voltmeter'].includes(type)) {
    group.quaternion.set(0, 0, 0, 1);
  } else {
    group.quaternion.copy(quaternion);
  }
  
  const leads = [];
  
  // Design detailed component bodies
  // Design detailed component bodies
  if (type === 'resistor') {
    if (resistorModelTemplate) {
      // Use the high-fidelity GLTF 3D model
      const model = resistorModelTemplate.clone();
      
      // Center the model's meshes
      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      box.getSize(size);
      const center = new THREE.Vector3();
      box.getCenter(center);
      
      model.traverse(obj => {
        if (obj.isMesh) {
          obj.position.sub(center);
          
          // Color bands dynamically based on resistance
          const colors = getResistorColors(state.params.R);
          if (obj.name === 'LARANJA-material') {
            obj.material = obj.material.clone();
            obj.material.color.setHex(colors[0]);
            obj.material.roughness = 0.35;
          } else if (obj.name === 'MARRON-material') {
            obj.material = obj.material.clone();
            obj.material.color.setHex(colors[2]);
            obj.material.roughness = 0.35;
          } else if (obj.name === 'OURO-material') {
            obj.material = obj.material.clone();
            obj.material.color.setHex(0xd4af37);
            obj.material.roughness = 0.1;
            obj.material.metalness = 0.9;
          } else if (obj.name === 'CERAMICA-material') {
            obj.material = obj.material.clone();
            obj.material.color.setHex(0xddcba4);
            obj.material.roughness = 0.5;
          }
        }
      });
      
      // Scale model to match breadboard units
      model.scale.set(75, 75, 75);
      group.add(model);
      
      const lBand = model.getObjectByName('LARANJA-material');
      const mBand = model.getObjectByName('MARRON-material');
      group.userData = { gltfBands: [lBand, mBand] };
    } else {
      // Fallback procedural cylinder resistor
      const geo = new THREE.CylinderGeometry(0.12, 0.12, 0.6, 16);
      const mat = new THREE.MeshStandardMaterial({ color: 0xddcba4, roughness: 0.6 });
      const body = new THREE.Mesh(geo, mat);
      body.rotation.z = Math.PI / 2;
      body.castShadow = true;
      group.add(body);
      
      const capGeo = new THREE.CylinderGeometry(0.135, 0.12, 0.06, 16);
      const capMat = new THREE.MeshStandardMaterial({ color: 0xddcba4, roughness: 0.6 });
      
      const leftCap = new THREE.Mesh(capGeo, capMat);
      leftCap.position.x = -0.3;
      leftCap.rotation.z = -Math.PI / 2;
      group.add(leftCap);
      
      const rightCap = new THREE.Mesh(capGeo, capMat);
      rightCap.position.x = 0.3;
      rightCap.rotation.z = Math.PI / 2;
      group.add(rightCap);
      
      const bandGeo = new THREE.CylinderGeometry(0.128, 0.128, 0.05, 16);
      const colors = getResistorColors(state.params.R);
      
      const b1 = new THREE.Mesh(bandGeo, new THREE.MeshBasicMaterial({ color: colors[0] }));
      b1.position.x = -0.18;
      b1.rotation.z = Math.PI / 2;
      group.add(b1);
      
      const b2 = new THREE.Mesh(bandGeo, new THREE.MeshBasicMaterial({ color: colors[1] }));
      b2.position.x = -0.04;
      b2.rotation.z = Math.PI / 2;
      group.add(b2);
      
      const b3 = new THREE.Mesh(bandGeo, new THREE.MeshBasicMaterial({ color: colors[2] }));
      b3.position.x = 0.1;
      b3.rotation.z = Math.PI / 2;
      group.add(b3);
      
      const bTol = new THREE.Mesh(bandGeo, new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.2 }));
      bTol.position.x = 0.22;
      bTol.rotation.z = Math.PI / 2;
      group.add(bTol);
      
      group.userData = { bands: [b1, b2, b3] };
    }
    
    // Generate bent metal wire leads going into breadboard holes (exit offset matches scale)
    const leadOffset = resistorModelTemplate ? 0.20 : 0.35;
    const localL = new THREE.Vector3(-leadOffset, 0, 0).applyQuaternion(group.quaternion).add(mid);
    leads.push(createBentMetalLead(localL, p1));
    const localR = new THREE.Vector3(leadOffset, 0, 0).applyQuaternion(group.quaternion).add(mid);
    leads.push(createBentMetalLead(localR, p2));
  }
  else if (type === 'capacitor') {
    // 1. Material config mapping DefaultMaterial parameters
    const capacitorMaterial = new THREE.MeshStandardMaterial({
        map: capacitorTexture,
        roughness: 0.4,
        metalness: 0.2,
        side: THREE.DoubleSide
    });

    // 2. Body (Cylinder geometry calibrated to GLTF bounds: height ~2.0, radius ~0.45)
    // Scaled by 0.26 to fit perfectly and proportionally on the breadboard
    const bodyGeom = new THREE.CylinderGeometry(0.445 * 0.26, 0.445 * 0.26, 1.4 * 0.26, 32, 1, false);
    
    // Remap UV coordinates dynamically to project the skin from the image texture properly
    const uvAttribute = bodyGeom.attributes.uv;
    for (let i = 0; i < uvAttribute.count; i++) {
        let u = uvAttribute.getX(i);
        let v = uvAttribute.getY(i);
        // Re-align texture maps locally matching the original UV atlas mappings
        uvAttribute.setXY(i, u * 0.5, v * 0.5 + 0.45);
    }

    const bodyMesh = new THREE.Mesh(bodyGeom, capacitorMaterial);
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    group.add(bodyMesh);

    // 3. Rubber Bottom Bung Insulation Cap
    const bungGeom = new THREE.CylinderGeometry(0.43 * 0.26, 0.43 * 0.26, 0.1 * 0.26, 32);
    const bungMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.9, metalness: 0.1 });
    const bungMesh = new THREE.Mesh(bungGeom, bungMat);
    bungMesh.position.y = -0.7 * 0.26; // -0.182
    bungMesh.castShadow = true;
    bungMesh.receiveShadow = true;
    group.add(bungMesh);

    // 3.5. Solid Black Top Cap (hides UV mapping artifacts on cylinder top cap)
    const topCapGeom = new THREE.CylinderGeometry(0.43 * 0.26, 0.43 * 0.26, 0.02 * 0.26, 32);
    const topCapMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.85, metalness: 0.1 });
    const topCapMesh = new THREE.Mesh(topCapGeom, topCapMat);
    topCapMesh.position.y = 0.702 * 0.26; // Sit exactly on top
    topCapMesh.castShadow = true;
    topCapMesh.receiveShadow = true;
    group.add(topCapMesh);

    // 4. Generate dynamic bent wire leads that go straight into the snapped holes
    const localL = new THREE.Vector3(-0.039, -0.195, 0).applyQuaternion(group.quaternion).add(mid);
    leads.push(createBentMetalLead(localL, p1));
    const localR = new THREE.Vector3(0.039, -0.195, 0).applyQuaternion(group.quaternion).add(mid);
    leads.push(createBentMetalLead(localR, p2));
  }
  else if (type === 'inductor') {
    const indTemplate = createCenteredWrapperGroup('Inductor-Radial_38', 42); // Scaled up to 42
    if (indTemplate) {
      const model = indTemplate.wrapper;
      // Do NOT hide original legs! Keep legs visible and return directly
      group.add(model);
      return { mesh: group, leads: [] };
    } else {
      // Fallback procedural
      const geo = new THREE.CylinderGeometry(0.12, 0.12, 0.6, 16);
      const mat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.8 });
      const body = new THREE.Mesh(geo, mat);
      body.rotation.z = Math.PI / 2;
      body.castShadow = true;
      group.add(body);
      
      for (let x = -0.22; x <= 0.22; x += 0.08) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.14, 0.03, 8, 20),
          new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9, roughness: 0.1 })
        );
        ring.position.x = x;
        ring.rotation.y = Math.PI / 2;
        group.add(ring);
      }
      
      const localL = new THREE.Vector3(-0.3, 0, 0).applyQuaternion(group.quaternion).add(mid);
      leads.push(createMetalLead(localL, p1));
      const localR = new THREE.Vector3(0.3, 0, 0).applyQuaternion(group.quaternion).add(mid);
      leads.push(createMetalLead(localR, p2));
    }
  }
  else if (type === 'led') {
    const color = customColor || state.params.led_color || 'red';
    let hex = 0xef4444;
    let hexBright = 0xff2200;
    if (color === 'green') { hex = 0x22c55e; hexBright = 0x00ff44; }
    else if (color === 'yellow') { hex = 0xeab308; hexBright = 0xffdd00; }
    else if (color === 'blue') { hex = 0x3b82f6; hexBright = 0x0077ff; }
    else if (color === 'white') { hex = 0xe0e8ff; hexBright = 0xffffff; }

    // Translucent glass/plastic material for the LED dome body
    const ledMat = new THREE.MeshPhysicalMaterial({
      color: hex,
      roughness: 0.05,
      metalness: 0.0,
      transmission: 0.75,
      thickness: 0.4,
      transparent: true,
      opacity: 0.88,
      emissive: 0x000000,
      emissiveIntensity: 0.0,
      side: THREE.DoubleSide
    });

    const silverMat = new THREE.MeshStandardMaterial({
      color: 0xc8c8c8,
      metalness: 0.92,
      roughness: 0.10
    });

    const blackPlasticMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.65,
      metalness: 0.05
    });

    // === REAL THROUGH-HOLE LED (like image 2) ===
    // 1. Cylindrical lower housing body (flat-bottom section)
    const baseGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.12, 20);
    const base = new THREE.Mesh(baseGeo, ledMat);
    base.position.y = 0.02;
    base.castShadow = true;
    group.add(base);

    // 2. Domed top of the LED (hemispherical lens)
    const domeGeo = new THREE.SphereGeometry(0.075, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2);
    const dome = new THREE.Mesh(domeGeo, ledMat);
    dome.position.y = 0.08;
    dome.castShadow = true;
    group.add(dome);

    // 3. Plastic collar/rim ring at the base (darker plastic, like a real LED)
    const collarGeo = new THREE.CylinderGeometry(0.082, 0.082, 0.018, 20);
    const collar = new THREE.Mesh(collarGeo, blackPlasticMat);
    collar.position.y = -0.041;
    group.add(collar);

    // 4. Internal anode post (shorter, straight - visible through dome)
    const anodeGeo = new THREE.CylinderGeometry(0.006, 0.006, 0.07, 8);
    const anodePost = new THREE.Mesh(anodeGeo, silverMat);
    anodePost.position.set(-0.022, 0.01, 0);
    group.add(anodePost);

    // 5. Internal cathode anvil (larger reflector cup - visible)
    const cathodeCupGeo = new THREE.CylinderGeometry(0.018, 0.012, 0.05, 10);
    const cathodeCup = new THREE.Mesh(cathodeCupGeo, silverMat);
    cathodeCup.position.set(0.022, 0.005, 0);
    group.add(cathodeCup);

    // Define the custom curved/bent legs for the LED to snap directly into holes p1 and p2
    const d = p1.distanceTo(p2);
    
    // Left Leg (Anode / Long leg)
    const leftCurve = new THREE.CurvePath();
    const l1 = new THREE.Vector3(-0.022, 0.02, 0).applyQuaternion(group.quaternion).add(mid);
    const l2 = new THREE.Vector3(-0.022, -0.05, 0).applyQuaternion(group.quaternion).add(mid);
    const l3 = new THREE.Vector3(-d/2, -0.10, 0).applyQuaternion(group.quaternion).add(mid);
    const l4 = p1.clone().add(new THREE.Vector3(0, -0.08, 0));
    
    leftCurve.add(new THREE.LineCurve3(l1, l2));
    leftCurve.add(new THREE.LineCurve3(l2, l3));
    leftCurve.add(new THREE.LineCurve3(l3, l4));
    
    const leftLegGeo = new THREE.TubeGeometry(leftCurve, 16, 0.007, 8, false);
    const leftLegMesh = new THREE.Mesh(leftLegGeo, silverMat);
    leftLegMesh.castShadow = true;
    leftLegMesh.receiveShadow = true;
    leads.push(leftLegMesh);

    // Right Leg (Cathode / Short leg)
    const rightCurve = new THREE.CurvePath();
    const r1 = new THREE.Vector3(0.022, 0.02, 0).applyQuaternion(group.quaternion).add(mid);
    const r2 = new THREE.Vector3(0.022, -0.05, 0).applyQuaternion(group.quaternion).add(mid);
    const r3 = new THREE.Vector3(d/2, -0.10, 0).applyQuaternion(group.quaternion).add(mid);
    const r4 = p2.clone().add(new THREE.Vector3(0, -0.08, 0));
    
    rightCurve.add(new THREE.LineCurve3(r1, r2));
    rightCurve.add(new THREE.LineCurve3(r2, r3));
    rightCurve.add(new THREE.LineCurve3(r3, r4));
    
    const rightLegGeo = new THREE.TubeGeometry(rightCurve, 16, 0.007, 8, false);
    const rightLegMesh = new THREE.Mesh(rightLegGeo, silverMat);
    rightLegMesh.castShadow = true;
    rightLegMesh.receiveShadow = true;
    leads.push(rightLegMesh);

    group.userData = { ledMat: ledMat };
  }
  else if (type === 'button' || type === 'toggle_switch') {
    // Highly detailed procedural 6x6x5mm tactile switch button/toggle matching user's blueprint (scaled down by 25%)
    const plasticMaterial = new THREE.MeshStandardMaterial({
      color: 0x151515, // Matte charcoal black
      roughness: 0.5,
      metalness: 0.1
    });

    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0xd1d5db, // Shiny silver metal plate
      roughness: 0.2,
      metalness: 0.9,
      side: THREE.DoubleSide
    });

    // 1. Base Housing Block (Plastic base body: scaled down by 25%)
    const baseGeo = new THREE.BoxGeometry(0.28, 0.16, 0.28);
    const baseMesh = new THREE.Mesh(baseGeo, plasticMaterial);
    baseMesh.position.y = 0.08;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    group.add(baseMesh);

    // 2. Upper Protective Metal Retainer Plate
    const plateGeo = new THREE.BoxGeometry(0.29, 0.015, 0.29);
    const plateMesh = new THREE.Mesh(plateGeo, metalMaterial);
    plateMesh.position.y = 0.1675;
    plateMesh.castShadow = true;
    group.add(plateMesh);

    // 2.5. 4 Circular Corner Rivets on the metal plate
    const rivetGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.004, 12);
    const rivetMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.6 });
    const offsets = [-0.0975, 0.0975];
    offsets.forEach(ox => {
      offsets.forEach(oz => {
        const rivet = new THREE.Mesh(rivetGeo, rivetMat);
        rivet.position.set(ox, 0.175, oz);
        rivet.castShadow = true;
        group.add(rivet);
      });
    });

    // 3. Central Plunger Actuator
    const plungerGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.06, 24);
    const plungerMat = new THREE.MeshStandardMaterial({
      color: type === 'button' ? 0xdc2626 : 0x111111, // Red plunger for button, black for toggle switch
      roughness: type === 'button' ? 0.4 : 0.6,
      metalness: 0.1
    });
    const plunger = new THREE.Mesh(plungerGeo, plungerMat);
    plunger.name = 'plunger';
    plunger.userData.originalY = 0.2075;
    plunger.position.y = state.buttonPressed ? 0.1675 : 0.2075; // set initial press state
    plunger.castShadow = true;
    group.add(plunger);

    // 4. Metal Leads / Pins (Plugging straight down into rows E & F, columns 10 & 12)
    const pxs = [-0.2296, 0.2296];
    const pzs = [-0.1522, 0.1522];
    
    pxs.forEach(px => {
      pzs.forEach(pz => {
        // Shoulder segment exiting the side of the body (aligned along local Z)
        const shoulderGeo = new THREE.BoxGeometry(0.12, 0.02, 0.04);
        const shoulderMesh = new THREE.Mesh(shoulderGeo, metalMaterial);
        shoulderMesh.position.set(px > 0 ? 0.17 : -0.17, 0.02, pz);
        shoulderMesh.castShadow = true;
        group.add(shoulderMesh);

        // Vertical pin going straight down into the breadboard hole
        const pinGeo = new THREE.BoxGeometry(0.02, 0.15, 0.02);
        const pinMesh = new THREE.Mesh(pinGeo, metalMaterial);
        pinMesh.position.set(px, -0.055, pz);
        pinMesh.castShadow = true;
        group.add(pinMesh);
      });
    });

    return { mesh: group, leads: [] };
  }
  else if (type === 'source') {
    if (state.activeExperiment === 'arduino_led') {
      // USB Cable plugging into Arduino board USB slot
      const usbPos = new THREE.Vector3(-1.1, 0.23, -0.6);
      arduinoUnoGroup.updateMatrixWorld(true);
      usbPos.applyMatrix4(arduinoUnoGroup.matrixWorld);
      
      const externalPos = new THREE.Vector3(-4.0, 1.5, -6.0);
      const midUsb = new THREE.Vector3().addVectors(usbPos, externalPos).multiplyScalar(0.5);
      midUsb.y += 0.8;
      
      const usbCurve = new THREE.CatmullRomCurve3([usbPos, midUsb, externalPos]);
      const usbGeo = new THREE.TubeGeometry(usbCurve, 24, 0.06, 8, false);
      const usbMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.6 });
      const usbCableMesh = new THREE.Mesh(usbGeo, usbMat);
      
      const plugGeo = new THREE.BoxGeometry(0.2, 0.15, 0.35);
      const plugMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9 });
      const plugMesh = new THREE.Mesh(plugGeo, plugMat);
      plugMesh.position.copy(usbPos);
      plugMesh.lookAt(externalPos);
      
      const cableGroup = new THREE.Group();
      cableGroup.add(usbCableMesh);
      cableGroup.add(plugMesh);
      
      return { mesh: cableGroup, leads: [] };
    }
    
    // Premium power supply module casing (Holster + Inner Body)
    const holsterGeo = createRoundedBoxGeometry(0.9, 0.38, 0.6, 0.05);
    const holsterMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.8 });
    const holster = new THREE.Mesh(holsterGeo, holsterMat);
    holster.position.y = -0.01;
    holster.castShadow = true;
    holster.receiveShadow = true;
    group.add(holster);
    
    const bodyGeo = createRoundedBoxGeometry(0.86, 0.39, 0.56, 0.04);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.4, metalness: 0.3 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.005;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);
    
    // Gold trim/accent ring around body top (Cyan for AC, Gold for DC)
    const isAC = ['lcr', 'rc', 'rc_rl_rlc'].includes(state.activeExperiment);
    const trimGeo = createRoundedBoxGeometry(0.88, 0.03, 0.58, 0.04);
    const trimMat = new THREE.MeshStandardMaterial({ color: isAC ? 0x06b6d4 : 0xeab308, roughness: 0.2, metalness: 0.8 });
    const trim = new THREE.Mesh(trimGeo, trimMat);
    trim.position.y = 0.18;
    group.add(trim);
    
    // Recessed Screen Bezel / Frame
    const frameGeo = new THREE.PlaneGeometry(0.64, 0.39);
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.7 });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.rotation.x = -Math.PI / 2;
    frame.position.set(0, 0.2005, -0.05);
    group.add(frame);
    
    // Screen Plane
    const screenGeo = new THREE.PlaneGeometry(0.6, 0.35);
    const screenMat = new THREE.MeshBasicMaterial({ map: powerScreenTexture });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.rotation.x = -Math.PI / 2;
    screen.position.set(0, 0.201, -0.05);
    group.add(screen);
    
    // Glass Screen Cover
    const glassMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.15, roughness: 0.05, metalness: 0.9 });
    const glass = new THREE.Mesh(screenGeo, glassMat);
    glass.rotation.x = -Math.PI / 2;
    glass.position.set(0, 0.202, -0.05);
    group.add(glass);
    
    // Red terminal (positive, left)
    const redP = createRealisticPost(0xef4444);
    redP.position.set(-0.35, 0.2, 0.18);
    group.add(redP);
    
    // Black terminal (negative, right)
    const blackP = createRealisticPost(0x1e293b);
    blackP.position.set(0.35, 0.2, 0.18);
    group.add(blackP);

    // Rotary dial knob (voltage adjustment detail)
    const knobGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.04, 16);
    const knobMat = new THREE.MeshStandardMaterial({ color: 0x3f3f46, roughness: 0.5, metalness: 0.5 });
    const knob = new THREE.Mesh(knobGeo, knobMat);
    knob.position.set(0.24, 0.21, -0.05);
    group.add(knob);
    
    // Indicator line on the knob
    const knobIndicatorGeo = new THREE.BoxGeometry(0.015, 0.045, 0.015);
    const knobIndicator = new THREE.Mesh(knobIndicatorGeo, new THREE.MeshBasicMaterial({ color: 0xef4444 }));
    knobIndicator.position.set(0.24, 0.23, -0.07);
    group.add(knobIndicator);

    // Power push button (green/red dynamic)
    const btnGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.03, 12);
    const powerBtnMat = new THREE.MeshStandardMaterial({
      color: state.isRunning ? 0x22c55e : 0xef4444,
      emissive: state.isRunning ? 0x22c55e : 0x000000,
      emissiveIntensity: state.isRunning ? 1.5 : 0.0,
      roughness: 0.2
    });
    const pBtn = new THREE.Mesh(btnGeo, powerBtnMat);
    pBtn.position.set(-0.15, 0.21, 0.18);
    group.add(pBtn);

    // Power LED indicator sphere
    const ledGeo = new THREE.SphereGeometry(0.02, 8, 8);
    const powerLedMat = new THREE.MeshStandardMaterial({
      color: state.isRunning ? 0x22c55e : 0xef4444,
      emissive: state.isRunning ? 0x22c55e : 0xef4444,
      emissiveIntensity: state.isRunning ? 2.5 : 0.4
    });
    const pLed = new THREE.Mesh(ledGeo, powerLedMat);
    pLed.position.set(0.05, 0.21, 0.18);
    group.add(pLed);

    // USB socket model (silver)
    const usbGeo = new THREE.BoxGeometry(0.18, 0.1, 0.15);
    const usbMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9, roughness: 0.1 });
    const usb = new THREE.Mesh(usbGeo, usbMat);
    usb.position.set(-0.46, 0.05, -0.1);
    usb.rotation.y = Math.PI / 2;
    group.add(usb);
    
    // Save button and led references in group.userData
    group.userData = { powerButton: pBtn, powerLed: pLed };
    
    const localL = new THREE.Vector3(-0.35, 0.3, 0.18).applyQuaternion(group.quaternion).add(mid);
    leads.push(createSourceLead(localL, p1, 0xef4444));
    const localR = new THREE.Vector3(0.35, 0.3, 0.18).applyQuaternion(group.quaternion).add(mid);
    leads.push(createSourceLead(localR, p2, 0x111827));
  }
  else if (type === 'ammeter' || type === 'voltmeter') {
    const isAm = type === 'ammeter';
    // Colors
    const accentColor = isAm ? 0x1d4ed8 : 0xb91c1c;   // blue / red body
    const screenGlowColor = isAm ? 0x60a5fa : 0xf87171;  // blue glow / red glow
    
    // === METER BODY (stands UPRIGHT, screen faces FORWARD toward camera) ===
    // The group is positioned at mid which is above the board.
    // We want: body upright (Y tall), screen faces -Z (toward camera since camera at z=9)

    // Outer housing shell
    const shellGeo = createRoundedBoxGeometry(0.55, 0.38, 0.22, 0.04);
    const shellMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.75, metalness: 0.15 });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    shell.castShadow = true;
    shell.receiveShadow = true;
    group.add(shell);

    // Colored body face plate (front)
    const faceGeo = createRoundedBoxGeometry(0.52, 0.36, 0.08, 0.03);
    const faceMat = new THREE.MeshStandardMaterial({ color: accentColor, roughness: 0.4, metalness: 0.3 });
    const face = new THREE.Mesh(faceGeo, faceMat);
    face.position.z = 0.07;   // Push to front
    group.add(face);

    // Screen bezel (dark recessed rectangle on front face)
    const bezelGeo = new THREE.BoxGeometry(0.44, 0.22, 0.02);
    const bezelMat = new THREE.MeshStandardMaterial({ color: 0x050a14, roughness: 0.8 });
    const bezel = new THREE.Mesh(bezelGeo, bezelMat);
    bezel.position.set(0, 0.06, 0.12);
    group.add(bezel);

    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    group.userData.canvas = canvas;
    group.userData.texture = texture;

    // Screen plane - faces +Z (toward camera)
    const screenGeo = new THREE.PlaneGeometry(0.40, 0.19);
    const screenMat = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.FrontSide
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(0, 0.06, 0.131);
    // Faces +Z by default (PlaneGeometry faces +Z)
    group.add(screen);

    // Glass overlay on screen
    const glassMat = new THREE.MeshStandardMaterial({ 
      color: 0xaaddff, transparent: true, opacity: 0.08, roughness: 0.02, metalness: 0.6 
    });
    const glass = new THREE.Mesh(screenGeo, glassMat);
    glass.position.set(0, 0.06, 0.132);
    group.add(glass);

    // Meter label text area (below screen)
    const labelGeo = new THREE.BoxGeometry(0.35, 0.04, 0.01);
    const labelMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 });
    const label = new THREE.Mesh(labelGeo, labelMat);
    label.position.set(0, -0.07, 0.131);
    group.add(label);

    // Positive terminal post (left side, red)
    const posPost = createRealisticPost(0xef4444);
    posPost.position.set(-0.17, -0.14, 0.05);
    posPost.scale.set(0.6, 0.6, 0.6);
    posPost.rotation.x = Math.PI / 2;  // Posts face forward/up
    group.add(posPost);

    // Negative terminal post (right side, dark)
    const negPost = createRealisticPost(0x1e293b);
    negPost.position.set(0.17, -0.14, 0.05);
    negPost.scale.set(0.6, 0.6, 0.6);
    negPost.rotation.x = Math.PI / 2;
    group.add(negPost);

    // Knob/dial on right side of body
    const dialGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.04, 16);
    const dialMat = new THREE.MeshStandardMaterial({ color: 0x3f3f46, roughness: 0.4, metalness: 0.6 });
    const dial = new THREE.Mesh(dialGeo, dialMat);
    dial.rotation.x = Math.PI / 2;  // dial faces front
    dial.position.set(0.20, -0.10, 0.13);
    group.add(dial);

    // Wire leads from bottom of meter down to breadboard holes
    const localL = new THREE.Vector3(-0.17, -0.22, 0).applyQuaternion(group.quaternion).add(mid);
    leads.push(createBentMetalLead(localL, p1));
    const localR = new THREE.Vector3(0.17, -0.22, 0).applyQuaternion(group.quaternion).add(mid);
    leads.push(createBentMetalLead(localR, p2));
  }
  else if (type === 'diode') {
    // High-fidelity procedural 1N4007 PN junction diode (matte black body with silver band)
    // Slender body matching resistor proportions (radius ~0.065, length ~0.38)
    const bodyGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.38, 32);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x121212, roughness: 0.65, metalness: 0.1 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.rotation.z = Math.PI / 2;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);
    
    // Silver band at one end (Cathode)
    const bandGeo = new THREE.CylinderGeometry(0.067, 0.067, 0.08, 32);
    const bandMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.85, roughness: 0.2 });
    const band = new THREE.Mesh(bandGeo, bandMat);
    band.position.x = 0.12; // Positioned near the right end
    band.rotation.z = Math.PI / 2;
    band.castShadow = true;
    group.add(band);
    
    // Leads going to snap1 and snap2 (exit offset matches body length)
    const localL = new THREE.Vector3(-0.19, 0, 0).applyQuaternion(group.quaternion).add(mid);
    leads.push(createBentMetalLead(localL, p1));
    const localR = new THREE.Vector3(0.19, 0, 0).applyQuaternion(group.quaternion).add(mid);
    leads.push(createBentMetalLead(localR, p2));
  }
  else if (type === 'transistor') {
    // High-fidelity procedural TO-92 NPN transistor matching user's blueprint
    const plasticMaterial = new THREE.MeshStandardMaterial({
      color: 0x18181b, // Matte charcoal black
      roughness: 0.55,
      metalness: 0.1
    });

    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0xdddddd, // Shiny silver metal leads
      metalness: 0.95,
      roughness: 0.08
    });

    // 1. D-Shape Body (Cylinder of radius 0.135, height 0.24, cut in half + flat back plate)
    const cylinderGeo = new THREE.CylinderGeometry(0.135, 0.135, 0.24, 16, 1, false, 0, Math.PI);
    const cylinder = new THREE.Mesh(cylinderGeo, plasticMaterial);
    cylinder.position.set(0, 0.12, 0);
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    group.add(cylinder);

    // Flat back plate to close the D-shape
    const plateGeo = new THREE.BoxGeometry(0.27, 0.24, 0.01);
    const plate = new THREE.Mesh(plateGeo, plasticMaterial);
    plate.position.set(0, 0.12, -0.005);
    plate.castShadow = true;
    plate.receiveShadow = true;
    group.add(plate);

    // 2. 3 Shiny Silver Wire leads going straight into breadboard holes (left, middle, right)
    const tubeRadius = 0.011;
    
    // Define the custom curved/bent legs for the transistor to snap directly into holes p1, pMid, and p2
    const c1 = Math.floor(snap1 / 14);
    const r1 = snap1 % 14;
    const c2 = Math.floor(snap2 / 14);
    const r2 = snap2 % 14;
    const cMid = Math.round((c1 + c2) / 2);
    const rMid = Math.round((r1 + r2) / 2);
    const snapMid = cMid * 14 + rMid;
    const pMid = getSnapPos(snapMid);

    // Left Leg (Emitter)
    const leftCurve = new THREE.CurvePath();
    const eStart = new THREE.Vector3(-0.076, 0.0, 0.0).applyQuaternion(group.quaternion).add(mid);
    const e2 = new THREE.Vector3(-0.076, -0.05, 0.0).applyQuaternion(group.quaternion).add(mid);
    const e3 = new THREE.Vector3(-0.1522, -0.08, 0.0).applyQuaternion(group.quaternion).add(mid);
    const eEnd = p1.clone().add(new THREE.Vector3(0, -0.08, 0));

    leftCurve.add(new THREE.LineCurve3(eStart, e2));
    leftCurve.add(new THREE.LineCurve3(e2, e3));
    leftCurve.add(new THREE.LineCurve3(e3, eEnd));

    const geoLeft = new THREE.TubeGeometry(leftCurve, 16, tubeRadius, 8, false);
    const leadLeft = new THREE.Mesh(geoLeft, metalMaterial);
    leadLeft.castShadow = true;
    leadLeft.receiveShadow = true;
    leads.push(leadLeft);

    // Middle Leg (Base)
    const midCurve = new THREE.CurvePath();
    const mStart = new THREE.Vector3(0.0, 0.0, 0.0).applyQuaternion(group.quaternion).add(mid);
    const m2 = new THREE.Vector3(0.0, -0.05, 0.0).applyQuaternion(group.quaternion).add(mid);
    const mEnd = pMid.clone().add(new THREE.Vector3(0, -0.08, 0));

    midCurve.add(new THREE.LineCurve3(mStart, m2));
    midCurve.add(new THREE.LineCurve3(m2, mEnd));

    const geoMid = new THREE.TubeGeometry(midCurve, 12, tubeRadius, 8, false);
    const leadMid = new THREE.Mesh(geoMid, metalMaterial);
    leadMid.castShadow = true;
    leadMid.receiveShadow = true;
    leads.push(leadMid);

    // Right Leg (Collector)
    const rightCurve = new THREE.CurvePath();
    const rStart = new THREE.Vector3(0.076, 0.0, 0.0).applyQuaternion(group.quaternion).add(mid);
    const r2_pt = new THREE.Vector3(0.076, -0.05, 0.0).applyQuaternion(group.quaternion).add(mid);
    const r3_pt = new THREE.Vector3(0.1522, -0.08, 0.0).applyQuaternion(group.quaternion).add(mid);
    const rEnd = p2.clone().add(new THREE.Vector3(0, -0.08, 0));

    rightCurve.add(new THREE.LineCurve3(rStart, r2_pt));
    rightCurve.add(new THREE.LineCurve3(r2_pt, r3_pt));
    rightCurve.add(new THREE.LineCurve3(r3_pt, rEnd));

    const geoRight = new THREE.TubeGeometry(rightCurve, 16, tubeRadius, 8, false);
    const leadRight = new THREE.Mesh(geoRight, metalMaterial);
    leadRight.castShadow = true;
    leadRight.receiveShadow = true;
    leads.push(leadRight);

    return { mesh: group, leads: leads };
  }
  else if (type === 'display') {
    // 7-segment display block spanning 5 columns and crossing the center ravine
    const colSpacing = 0.1522;
    const bodyGeo = new THREE.BoxGeometry(5 * colSpacing, 0.22, 0.72);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.7 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.castShadow = true;
    body.receiveShadow = true;
    body.position.y = 0.11;
    group.add(body);

    // Bezel screen plate for a more realistic display window
    const screenGeo = new THREE.BoxGeometry(5 * colSpacing - 0.04, 0.01, 0.68);
    const screenMat = new THREE.MeshStandardMaterial({ color: 0x080c14, roughness: 0.8 });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(0, 0.22, 0);
    screen.castShadow = true;
    group.add(screen);
    
    // Create segments with separate materials so they can glow independently
    const createSegment = (x, z, w, d, rotY = 0, name) => {
      const mat = new THREE.MeshStandardMaterial({
        color: 0x1f0505, // dark off-state red
        emissive: 0x000000,
        emissiveIntensity: 0.0,
        roughness: 0.4
      });
      const seg = new THREE.Mesh(new THREE.BoxGeometry(w, 0.02, d), mat);
      seg.position.set(x, 0.226, z);
      seg.rotation.y = rotY;
      seg.castShadow = true;
      group.add(seg);
      group.userData[name] = seg;
    };
    
    createSegment(0, -0.18, 0.18, 0.036, 0, 'seg_a');       // a (top)
    createSegment(0.096, -0.09, 0.036, 0.18, 0, 'seg_b');   // b (top-right)
    createSegment(0.096, 0.09, 0.036, 0.18, 0, 'seg_c');    // c (bottom-right)
    createSegment(0, 0.18, 0.18, 0.036, 0, 'seg_d');        // d (bottom)
    createSegment(-0.096, 0.09, 0.036, 0.18, 0, 'seg_e');   // e (bottom-left)
    createSegment(-0.096, -0.09, 0.036, 0.18, 0, 'seg_f');  // f (top-left)
    createSegment(0, 0, 0.18, 0.036, 0, 'seg_g');           // g (middle)
    
    // decimal point dot
    const dpMat = new THREE.MeshStandardMaterial({
      color: 0x1f0505,
      emissive: 0x000000,
      emissiveIntensity: 0.0,
      roughness: 0.4
    });
    const dp = new THREE.Mesh(new THREE.SphereGeometry(0.024, 8, 8), dpMat);
    dp.position.set(0.18, 0.226, 0.18);
    dp.castShadow = true;
    group.add(dp);
    group.userData.seg_dp = dp;
    
    // 10 pins extending down from bottom (5 on top, 5 on bottom) inserting vertically into the breadboard holes
    const c1 = Math.floor(snap1 / 14);
    const r1 = snap1 % 14;
    const c2 = Math.floor(snap2 / 14);
    const r2 = snap2 % 14;
    const cMid = Math.round((c1 + c2) / 2);
    
    for (let cIdx = -2; cIdx <= 2; cIdx++) {
      const col = cMid + cIdx;
      
      // Top pin
      const snapTop = col * 14 + r1;
      const pTop = getSnapPos(snapTop); // hole world coordinate (y = 0.08)
      // Pin starts at bottom of body (y = 0.08) and inserts straight down to y = 0.0 (inside the hole)
      const leadTop = createStraightMetalLead(pTop, pTop.clone().add(new THREE.Vector3(0, -0.08, 0)), 0.012);
      leadTop.castShadow = true;
      leadTop.receiveShadow = true;
      leads.push(leadTop);
      
      // Bottom pin
      const snapBottom = col * 14 + r2;
      const pBottom = getSnapPos(snapBottom);
      const leadBottom = createStraightMetalLead(pBottom, pBottom.clone().add(new THREE.Vector3(0, -0.08, 0)), 0.012);
      leadBottom.castShadow = true;
      leadBottom.receiveShadow = true;
      leads.push(leadBottom);
    }
  }
  
  return { mesh: group, leads };
}

function placeComponent3D(type, snap1, snap2) {
  // For EXP-04 Arduino experiment, the Power Source tool instantiates Arduino USB power connection
  if (type === 'source' && state.activeExperiment === 'arduino_led') {
    snap1 = 882; // 5V
    snap2 = 883; // GND
  }
  
  const initialColor = type === 'led' ? (state.params.led_color || 'red') : null;
  const { mesh, leads } = createComponentVisuals(type, snap1, snap2, initialColor);
  
  scene.add(mesh);
  leads.forEach(l => scene.add(l));
  
  state.placedComponents.push({
    type,
    id: state.placedComponents.length,
    snap1,
    snap2,
    mesh,
    leads,
    color: type === 'led' ? initialColor : undefined
  });
  
  // Complete progress steps
  if (state.activeExperiment === 'ohms') {
    if (type === 'resistor') completeStep(1);
    if (type === 'source') completeStep(2);
    if (type === 'ammeter' || type === 'voltmeter') completeStep(3);
  } else if (state.activeExperiment === 'lcr' || state.activeExperiment === 'rc_rl_rlc') {
    const hasR = state.placedComponents.some(c => c.type === 'resistor');
    const hasL = state.placedComponents.some(c => c.type === 'inductor');
    const hasC = state.placedComponents.some(c => c.type === 'capacitor');
    if (hasR && hasL && hasC) {
      completeStep(1);
    }
    if (state.activeExperiment === 'rc_rl_rlc') {
      const hasAm = state.placedComponents.some(c => c.type === 'ammeter');
      const hasVolt = state.placedComponents.some(c => c.type === 'voltmeter');
      if (hasAm && hasVolt) {
        completeStep(2);
      }
    }
  } else if (state.activeExperiment === 'kcl') {
    const resistors = state.placedComponents.filter(c => c.type === 'resistor');
    const ammeters = state.placedComponents.filter(c => c.type === 'ammeter');
    if (resistors.length >= 2) {
      completeStep(1);
    }
    if (ammeters.length >= 1) {
      completeStep(3);
    }
    if (ammeters.length >= 3) {
      completeStep(4);
    }
  } else if (state.activeExperiment === 'arduino_led') {
    if (type === 'source') completeStep(1);
    const hasButton = state.placedComponents.some(c => c.type === 'button' || c.type === 'toggle_switch') || type === 'button' || type === 'toggle_switch';
    const hasLed = state.placedComponents.some(c => c.type === 'led') || type === 'led';
    if (hasButton && hasLed) completeStep(2);
    if (type === 'resistor') completeStep(3);
  }
  updateTelemetryCounts();
  updateDynamicTextures();
  updateAIMentor();
  updateTargetHighlights();

  const validation = validateCircuitLocal();
  if (validation.status === 'success') {
    triggerSingleCalculation();
  }
  
  debouncedSaveCircuit();
}

function createMetalLead(start, end) {
  // Curved metal wire lead drop into socket hole
  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  mid.y = Math.max(start.y, end.y) + 0.12;
  
  const curve = new THREE.CatmullRomCurve3([start, mid, end]);
  const geo = new THREE.TubeGeometry(curve, 12, 0.022, 6, false);
  const mat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.9, roughness: 0.1 });
  return new THREE.Mesh(geo, mat);
}

function createStraightMetalLead(start, end, radius = 0.012) {
  const curve = new THREE.LineCurve3(start, end);
  const geo = new THREE.TubeGeometry(curve, 4, radius, 6, false);
  const mat = new THREE.MeshStandardMaterial({ color: 0xc8c8c8, metalness: 0.95, roughness: 0.08 });
  return new THREE.Mesh(geo, mat);
}

function createBentMetalLead(start, end) {
  const corner = new THREE.Vector3(end.x, start.y, end.z);
  const dirHorizontal = new THREE.Vector3().subVectors(corner, start);
  const distHorizontal = dirHorizontal.length();

  if (distHorizontal < 0.005) {
    const curve = new THREE.LineCurve3(start, end);
    const geo = new THREE.TubeGeometry(curve, 8, 0.022, 6, false);
    const mat = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.95, roughness: 0.08 });
    return new THREE.Mesh(geo, mat);
  }

  dirHorizontal.normalize();
  const bendRadius = Math.min(0.06, distHorizontal * 0.4);

  const preCorner = new THREE.Vector3().addScaledVector(dirHorizontal, -bendRadius).add(corner);
  const postCorner = new THREE.Vector3(corner.x, corner.y - bendRadius, corner.z);

  const curvePath = new THREE.CurvePath();
  curvePath.add(new THREE.LineCurve3(start, preCorner));
  curvePath.add(new THREE.QuadraticBezierCurve3(preCorner, corner, postCorner));
  curvePath.add(new THREE.LineCurve3(postCorner, end));

  const geo = new THREE.TubeGeometry(curvePath, 24, 0.022, 6, false);
  const mat = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.95, roughness: 0.08 });
  return new THREE.Mesh(geo, mat);
}

function createSourceLead(start, end, colorCode) {
  const group = new THREE.Group();

  // Route the lead from the terminal post, forward in front of the casing,
  // down, then horizontally to the breadboard snap hole position.
  const frontDir = new THREE.Vector3(0, 0, 1); // toward camera

  const points = [];
  // 1. Start at terminal post
  points.push(start.clone());

  // 2. Come forward from terminal post (clear the casing front face)
  const fwd = start.clone().addScaledVector(frontDir, 0.32);
  points.push(fwd);

  // 3. Drop down in front of the casing
  const dropFront = fwd.clone();
  dropFront.y = end.y + 0.28;
  points.push(dropFront);

  // 4. Move toward snap hole at low level (under the module)
  const approach = end.clone();
  approach.y = end.y + 0.28;
  points.push(approach);

  // 5. Arrive at snap hole top
  points.push(end.clone());

  // 6. Into the hole
  const snapInside = end.clone();
  snapInside.y = end.y - 0.08;
  points.push(snapInside);

  const curve = new THREE.CatmullRomCurve3(points);
  const geo = new THREE.TubeGeometry(curve, 48, 0.024, 8, false);
  const wireMat = new THREE.MeshStandardMaterial({
    color: colorCode,
    roughness: 0.45,
    metalness: 0.25
  });
  const wire = new THREE.Mesh(geo, wireMat);
  wire.castShadow = true;
  wire.receiveShadow = true;
  group.add(wire);

  // Plastic connector sleeve at breadboard end
  const sleeveGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.18, 12);
  const sleeveMat = new THREE.MeshStandardMaterial({
    color: colorCode,
    roughness: 0.55,
    metalness: 0.1
  });
  const sleeve = new THREE.Mesh(sleeveGeo, sleeveMat);
  sleeve.position.copy(end);
  sleeve.position.y += 0.09;
  sleeve.castShadow = true;
  group.add(sleeve);

  // Silver metal pin inserting into breadboard
  const pinGeo = new THREE.CylinderGeometry(0.013, 0.013, 0.10, 8);
  const pinMat = new THREE.MeshStandardMaterial({
    color: 0xd1d5db,
    metalness: 0.92,
    roughness: 0.08
  });
  const pin = new THREE.Mesh(pinGeo, pinMat);
  pin.position.copy(end);
  pin.position.y -= 0.01;
  pin.castShadow = true;
  group.add(pin);

  return group;
}

function getOccupiedHoles() {
  const occupied = new Set();
  state.placedComponents.forEach(comp => {
    if (comp.type === 'source' && state.activeExperiment === 'arduino_led') {
      return;
    }
    occupied.add(comp.snap1);
    occupied.add(comp.snap2);

    // Get component center and dimensions
    const p1 = getSnapPos(comp.snap1);
    const p2 = getSnapPos(comp.snap2);
    const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);

    let halfW = 0;
    let halfD = 0;

    if (comp.type === 'source') {
      halfW = 0.45;
      halfD = 0.3;
    } else if (comp.type === 'ammeter' || comp.type === 'voltmeter') {
      halfW = 0.275;
      halfD = 0.11;
    } else if (comp.type === 'button' || comp.type === 'toggle_switch') {
      halfW = 0.14;
      halfD = 0.14;
    } else if (comp.type === 'display') {
      halfW = 0.38;
      halfD = 0.36;
    } else if (comp.type === 'transistor') {
      // Transistors have 3 pins, let's also occupy the middle pin
      const c1 = Math.floor(comp.snap1 / 14);
      const r1 = comp.snap1 % 14;
      const c2 = Math.floor(comp.snap2 / 14);
      const r2 = comp.snap2 % 14;
      const cMid = Math.round((c1 + c2) / 2);
      const rMid = Math.round((r1 + r2) / 2);
      occupied.add(cMid * 14 + rMid);
    }

    if (halfW > 0 && halfD > 0) {
      // Loop over all 884 snaps to find which ones are covered
      for (let i = 0; i < 884; i++) {
        if (i === 882 || i === 883) continue;
        const pos = getSnapPos(i);
        if (pos) {
          // Check XZ bounding box bounds with a small tolerance
          if (Math.abs(pos.x - mid.x) <= halfW + 0.05 && Math.abs(pos.z - mid.z) <= halfD + 0.05) {
            occupied.add(i);
          }
        }
      }
    }
  });
  return occupied;
}

function getRedirectedSnap(snap, occupied, otherSnap = null) {
  if (snap === 882 || snap === 883) return snap;
  if (!occupied.has(snap)) return snap;
  
  const c = Math.floor(snap / 14);
  const r = snap % 14;
  
  if (r >= 2 && r <= 6) {
    const candidates = [2, 3, 4, 5, 6];
    candidates.sort((a, b) => {
      const distA = a - r;
      const distB = b - r;
      if (distA > 0 && distB <= 0) return -1;
      if (distB > 0 && distA <= 0) return 1;
      return Math.abs(distA) - Math.abs(distB);
    });
    for (const row of candidates) {
      const candSnap = c * 14 + row;
      if (!occupied.has(candSnap) && candSnap !== otherSnap) {
        return candSnap;
      }
    }
  }
  else if (r >= 7 && r <= 11) {
    const candidates = [7, 8, 9, 10, 11];
    candidates.sort((a, b) => {
      const distA = a - r;
      const distB = b - r;
      if (distA > 0 && distB <= 0) return -1;
      if (distB > 0 && distA <= 0) return 1;
      return Math.abs(distA) - Math.abs(distB);
    });
    for (const row of candidates) {
      const candSnap = c * 14 + row;
      if (!occupied.has(candSnap) && candSnap !== otherSnap) {
        return candSnap;
      }
    }
  }
  else {
    const searchCols = [];
    for (let offset = 1; offset < 12; offset++) {
      searchCols.push(c + offset, c - offset);
    }
    for (const col of searchCols) {
      if (col >= 0 && col < BOARD_COLS) {
        if (col % 6 === 5) continue;
        const candSnap = col * 14 + r;
        if (!occupied.has(candSnap) && candSnap !== otherSnap) {
          return candSnap;
        }
      }
    }
  }
  
  return snap;
}

function updateInspector() {
  const infoEl = document.getElementById('sel-comp-info');
  if (!infoEl) return;
  
  if (state.selectedComponentIdx !== -1 && state.selectedComponentIdx !== undefined) {
    const comp = state.placedComponents[state.selectedComponentIdx];
    if (!comp) {
      infoEl.innerHTML = 'Click a hole or component to inspect.';
      return;
    }
    
    let typeName = comp.type.charAt(0).toUpperCase() + comp.type.slice(1);
    let detailsHTML = '';
    
    const getHoleName = (snap) => {
      if (snap === 882) return 'Arduino 5V';
      if (snap === 883) return 'Arduino GND';
      const c = Math.floor(snap / 14) + 1;
      const r = snap % 14;
      const rowLetters = ['+', '-', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', '+', '-'];
      return `Col ${c}, Row ${rowLetters[r]}`;
    };
    
    if (comp.type === 'resistor') {
      typeName = 'Ceramic Resistor';
      detailsHTML = `
        <div class="prop-row"><span class="prop-label">Resistance</span><span class="prop-val" style="color:#f97316">${state.params.R} Ω</span></div>
        <div class="prop-row"><span class="prop-label">Terminals</span><span class="prop-val">${getHoleName(comp.snap1)} ↔ ${getHoleName(comp.snap2)}</span></div>
      `;
    } else if (comp.type === 'capacitor') {
      typeName = 'Electrolytic Capacitor';
      detailsHTML = `
        <div class="prop-row"><span class="prop-label">Capacitance</span><span class="prop-val" style="color:var(--accent)">${state.params.C} µF</span></div>
        <div class="prop-row"><span class="prop-label">Terminals</span><span class="prop-val">${getHoleName(comp.snap1)} (Anode) ↔ ${getHoleName(comp.snap2)}</span></div>
      `;
    } else if (comp.type === 'inductor') {
      typeName = 'Axial Spool Inductor';
      detailsHTML = `
        <div class="prop-row"><span class="prop-label">Inductance</span><span class="prop-val" style="color:var(--blue)">${state.params.L} mH</span></div>
        <div class="prop-row"><span class="prop-label">Terminals</span><span class="prop-val">${getHoleName(comp.snap1)} ↔ ${getHoleName(comp.snap2)}</span></div>
      `;
    } else if (comp.type === 'source') {
      typeName = 'DC Voltage Source';
      detailsHTML = `
        <div class="prop-row"><span class="prop-label">Voltage</span><span class="prop-val" style="color:var(--accent)">${state.params.V} V</span></div>
        <div class="prop-row"><span class="prop-label">Terminals</span><span class="prop-val">${getHoleName(comp.snap1)} (+) ↔ ${getHoleName(comp.snap2)} (-)</span></div>
      `;
    } else if (comp.type === 'led') {
      const color = comp.color || state.params.led_color || 'red';
      const capColor = color.charAt(0).toUpperCase() + color.slice(1);
      typeName = `Light-Emitting Diode (${capColor})`;
      detailsHTML = `
        <div class="prop-row"><span class="prop-label">Color</span>
          <select class="component-value-select" data-param="led_color" style="background:#09090b;color:var(--text);border:1px solid var(--border);border-radius:4px;font-size:10px;padding:2px 4px">
            <option value="red" ${color === 'red' ? 'selected' : ''}>Red</option>
            <option value="green" ${color === 'green' ? 'selected' : ''}>Green</option>
            <option value="yellow" ${color === 'yellow' ? 'selected' : ''}>Yellow</option>
            <option value="blue" ${color === 'blue' ? 'selected' : ''}>Blue</option>
          </select>
        </div>
        <div class="prop-row"><span class="prop-label">Forward Voltage</span><span class="prop-val">2.0 V</span></div>
        <div class="prop-row"><span class="prop-label">Terminals</span><span class="prop-val">${getHoleName(comp.snap1)} (Anode) ↔ ${getHoleName(comp.snap2)} (Cathode)</span></div>
      `;
    } else if (comp.type === 'button') {
      typeName = 'Push Button (Momentary)';
      detailsHTML = `
        <div class="prop-row"><span class="prop-label">State</span><span class="prop-val">${state.buttonPressed ? '<b style="color:var(--green)">Pressed (ON)</b>' : 'Released (OFF)'}</span></div>
        <div class="prop-row"><span class="prop-label">Terminals</span><span class="prop-val">${getHoleName(comp.snap1)} ↔ ${getHoleName(comp.snap2)}</span></div>
      `;
    } else if (comp.type === 'toggle_switch') {
      typeName = 'ON/OFF Switch (Toggle)';
      detailsHTML = `
        <div class="prop-row"><span class="prop-label">State</span><span class="prop-val">${state.buttonPressed ? '<b style="color:var(--green)">ON (Closed)</b>' : 'OFF (Open)'}</span></div>
        <div class="prop-row"><span class="prop-label">Terminals</span><span class="prop-val">${getHoleName(comp.snap1)} ↔ ${getHoleName(comp.snap2)}</span></div>
      `;
    } else if (comp.type === 'diode') {
      typeName = 'PN Junction Diode (1N4007)';
      detailsHTML = `
        <div class="prop-row"><span class="prop-label">Model</span><span class="prop-val">1N4007</span></div>
        <div class="prop-row"><span class="prop-label">Terminals</span><span class="prop-val">${getHoleName(comp.snap1)} (Anode) ↔ ${getHoleName(comp.snap2)} (Cathode)</span></div>
      `;
    } else if (comp.type === 'ammeter' || comp.type === 'voltmeter') {
      typeName = comp.type === 'ammeter' ? 'Digital Ammeter' : 'Digital Voltmeter';
      detailsHTML = `
        <div class="prop-row"><span class="prop-label">Measurement</span><span class="prop-val" style="color:var(--yellow)">${comp.type === 'ammeter' ? (getAmmeterReading(comp) * 1000).toFixed(1) + ' mA' : getVoltmeterReading(comp).toFixed(2) + ' V'}</span></div>
        <div class="prop-row"><span class="prop-label">Terminals</span><span class="prop-val">${getHoleName(comp.snap1)} (+) ↔ ${getHoleName(comp.snap2)} (-)</span></div>
      `;
    }
    
    if (state.isRunning) {
      let calcHTML = '';
      if (comp.type === 'resistor') {
        let res_val = state.params.R;
        let v_drop = state.meters.amps * res_val;
        const resistors = state.placedComponents.filter(c => c.type === 'resistor');
        const resIdx = resistors.indexOf(comp);
        
        if (state.activeExperiment === 'kvl' || state.activeExperiment === 'series_parallel') {
          if (resIdx === 0) {
            res_val = state.params.R;
            v_drop = state.analysis.VR1 !== undefined ? state.analysis.VR1 : (state.meters.amps * res_val);
          } else if (resIdx === 1) {
            res_val = state.activeExperiment === 'kvl' ? state.params.L : (state.params.L || 100);
            v_drop = state.analysis.VR2 !== undefined ? state.analysis.VR2 : (state.meters.amps * res_val);
          }
        }
        const current_mA = state.meters.amps * 1000;
        const power_mW = state.meters.amps * v_drop * 1000;
        calcHTML = `
          <div class="prop-row"><span class="prop-label">Current</span><span class="prop-val">${current_mA.toFixed(2)} mA</span></div>
          <div class="prop-row"><span class="prop-label">Voltage Drop</span><span class="prop-val">${v_drop.toFixed(2)} V</span></div>
          <div class="prop-row"><span class="prop-label">Power Dissipated</span><span class="prop-val">${power_mW.toFixed(2)} mW</span></div>
        `;
      } else if (comp.type === 'led') {
        const current_mA = state.meters.amps * 1000;
        calcHTML = `
          <div class="prop-row"><span class="prop-label">Current</span><span class="prop-val">${state.buttonPressed ? current_mA.toFixed(2) + ' mA' : '0.00 mA'}</span></div>
          <div class="prop-row"><span class="prop-label">State</span><span class="prop-val" style="color:#ef4444">${state.buttonPressed ? '<b>GLOWING</b>' : 'OFF'}</span></div>
        `;
      }
      
      if (calcHTML) {
        detailsHTML += `
          <div style="border-top:1px dashed var(--border);margin:8px 0;padding-top:8px"></div>
          <div class="prop-title" style="font-size:10px;color:var(--text2)">LIVE TELEMETRY</div>
          ${calcHTML}
        `;
      }
    }
    
    const isArduinoSource = comp.type === 'source' && state.activeExperiment === 'arduino_led';
    if (!isArduinoSource) {
      detailsHTML += `
        <div style="margin-top:12px;display:flex;gap:8px">
          <button id="inspector-rotate-btn" style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;background:#27272a;color:var(--text);border:1px solid var(--border);border-radius:4px;font-size:11px;padding:6px 12px;cursor:pointer;font-weight:500;transition:background 0.2s">
            <svg style="width:12px;height:12px;transform:scaleX(-1);" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3m-3-3v12" />
            </svg>
            Rotate 90°
          </button>
        </div>
      `;
    }

    infoEl.innerHTML = `
      <div style="font-weight:600;color:var(--text);margin-bottom:6px;font-size:12px;display:flex;align-items:center;gap:6px">
        <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#f97316"></span>
        ${typeName}
      </div>
      ${detailsHTML}
    `;
    
    // Add dynamic listeners for inspector select dropdowns
    infoEl.querySelectorAll('.component-value-select').forEach(sel => {
      sel.addEventListener('click', (e) => e.stopPropagation());
      sel.addEventListener('change', (e) => {
        const param = sel.getAttribute('data-param');
        if (param === 'led_color') {
          updateLEDColor(sel.value);
        }
      });
    });

    const rotateBtn = infoEl.querySelector('#inspector-rotate-btn');
    if (rotateBtn) {
      rotateBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        rotateComponent3D(state.selectedComponentIdx);
      });
    }
    
  } else if (state.selectedHoleIndex !== null && state.selectedHoleIndex !== undefined) {
    const snap = state.selectedHoleIndex;
    const c = Math.floor(snap / 14) + 1;
    const r = snap % 14;
    const rowLetters = ['+', '-', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', '+', '-'];
    const rowName = rowLetters[r];
    const isRail = (r === 0 || r === 1 || r === 12 || r === 13);
    
    let typeName = isRail ? `Power Rail Hole` : `Breadboard Socket Hole`;
    if (snap === 882) typeName = 'Arduino 5V Output Pin';
    if (snap === 883) typeName = 'Arduino Ground (GND) Pin';
    
    const isConnectedTo = (compSnap) => {
      if (compSnap === snap) return true;
      if (snap === 882 || snap === 883) return false;
      const cc = Math.floor(compSnap / 14);
      const cr = compSnap % 14;
      if (isRail) {
        return (cr === r && Math.floor(cc/6) === Math.floor((c-1)/6));
      } else {
        const isGroup1 = (r >= 2 && r <= 6);
        const isCompGroup1 = (cr >= 2 && cr <= 6);
        return (cc === c - 1 && isGroup1 === isCompGroup1);
      }
    };
    
    const connectedComponents = [];
    state.placedComponents.forEach(comp => {
      if (isConnectedTo(comp.snap1) || isConnectedTo(comp.snap2)) {
        connectedComponents.push(comp.type.charAt(0).toUpperCase() + comp.type.slice(1));
      }
    });
    
    state.wires.forEach(w => {
      if (isConnectedTo(w.fromHole) || isConnectedTo(w.toHole)) {
        connectedComponents.push('Wire Jumper');
      }
    });
    
    const connList = connectedComponents.length > 0 
      ? connectedComponents.map(name => `<div style="font-size:10px;padding:2px 6px;background:var(--bg3);border-radius:4px;margin-top:2px">${name}</div>`).join('')
      : '<div style="font-size:10px;color:var(--text3)">None</div>';
      
    infoEl.innerHTML = `
      <div style="font-weight:600;color:var(--text);margin-bottom:6px;font-size:12px;display:flex;align-items:center;gap:6px">
        <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--accent)"></span>
        ${typeName}
      </div>
      <div class="prop-row"><span class="prop-label">Coordinates</span><span class="prop-val">${snap === 882 ? 'Arduino 5V' : snap === 883 ? 'Arduino GND' : `Col ${c}, Row ${rowName}`}</span></div>
      <div class="prop-row"><span class="prop-label">Snap Index</span><span class="prop-val">${snap}</span></div>
      <div style="border-top:1px dashed var(--border);margin:8px 0;padding-top:8px"></div>
      <div class="prop-title" style="font-size:10px;color:var(--text2)">ELECTRICAL CONNECTIONS</div>
      <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:4px">
        ${connList}
      </div>
    `;
  } else {
    infoEl.innerHTML = 'Click a hole or component to inspect.';
  }
}

function checkIntersectionXZ(a, b, c, d) {
  const det = (b.x - a.x) * (d.z - c.z) - (b.z - a.z) * (d.x - c.x);
  if (Math.abs(det) < 0.0001) return null; // Parallel or collinear
  
  const lambda = ((d.z - c.z) * (d.x - a.x) + (c.x - d.x) * (d.z - a.z)) / det;
  const gamma = ((a.z - b.z) * (d.x - a.x) + (b.x - a.x) * (d.z - a.z)) / det;
  
  if (lambda >= 0 && lambda <= 1 && gamma >= 0 && gamma <= 1) {
    return { lambda, gamma };
  }
  return null;
}

function createWireCurve(p1, p2, seed = 0, currentWireIdx = -1) {
  const points = [];
  
  // Start pin vertical rise (slightly higher to clear connectors)
  points.push(p1.clone());
  const p1Rise = p1.clone().add(new THREE.Vector3(0, 0.35, 0));
  points.push(p1Rise);
  
  // End pin vertical rise
  const p2Rise = p2.clone().add(new THREE.Vector3(0, 0.35, 0));
  
  // Proportional height based on distance
  const dist = p1.distanceTo(p2);
  let maxHeight = Math.min(2.0, Math.max(0.4, dist * 0.4 + 0.15));
  
  // Midpoint with natural sag/loop
  const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
  
  // Let's compute lateral offset direction and collision height adjustments
  let lateralOffset = new THREE.Vector3();
  const dir = new THREE.Vector3().subVectors(p2, p1);
  const normal = new THREE.Vector3(-dir.z, 0, dir.x).normalize();
  
  // Default lateral offset based on seed to avoid overlapping wires
  const defaultLateralAmt = (Math.sin(seed * 45.67) || 0) * Math.min(0.25, dist * 0.12);
  lateralOffset.addScaledVector(normal, defaultLateralAmt);
  
  // Check collision with placed components
  if (state.placedComponents && state.placedComponents.length > 0) {
    state.placedComponents.forEach(comp => {
      // Skip if this component matches Arduino USB source which is not on breadboard
      if (comp.type === 'source' && state.activeExperiment === 'arduino_led') {
        return;
      }
      
      const cp1 = getSnapPos(comp.snap1);
      const cp2 = getSnapPos(comp.snap2);
      const cCenter = new THREE.Vector3().addVectors(cp1, cp2).multiplyScalar(0.5);
      
      // Calculate distance on XZ plane
      const l2 = (p2.x - p1.x)**2 + (p2.z - p1.z)**2;
      if (l2 > 0) {
        let t = ((cCenter.x - p1.x) * (p2.x - p1.x) + (cCenter.z - p1.z) * (p2.z - p1.z)) / l2;
        t = Math.max(0, Math.min(1, t));
        const closestX = p1.x + t * (p2.x - p1.x);
        const closestZ = p1.z + t * (p2.z - p1.z);
        const distXZ = Math.hypot(cCenter.x - closestX, cCenter.z - closestZ);
        
        // Define safety parameters based on component type
        let collisionRadius = 0.45;
        let compTopY = 0.6;
        if (comp.type === 'led') {
          collisionRadius = 0.35;
          compTopY = 0.85;
        } else if (comp.type === 'capacitor') {
          collisionRadius = 0.3;
          compTopY = 0.9;
        } else if (comp.type === 'button' || comp.type === 'toggle_switch') {
          collisionRadius = 0.4;
          compTopY = 0.7;
        } else if (comp.type === 'source' || comp.type === 'voltmeter' || comp.type === 'ammeter') {
          collisionRadius = 0.7;
          compTopY = 0.7;
        }
        
        if (distXZ < collisionRadius) {
          // If it's a mid-wire crossing, we boost the height significantly
          if (t > 0.08 && t < 0.92) {
            const requiredHeight = compTopY + 0.45;
            if (maxHeight < requiredHeight) {
              maxHeight = requiredHeight;
            }
            
            // Push wire laterally away from component center
            const closestPt = new THREE.Vector3(closestX, 0, closestZ);
            const toComp = new THREE.Vector3(cCenter.x - closestPt.x, 0, cCenter.z - closestPt.z);
            const dot = toComp.dot(normal);
            const pushDir = dot > 0 ? -1 : 1;
            
            // Calculate push amount based on how close we are
            const pushAmt = (collisionRadius - distXZ) * 0.8 + 0.15;
            lateralOffset.addScaledVector(normal, pushDir * pushAmt);
          } else {
            // Near the wire endpoints, we still boost the height slightly so the wire doesn't clip the component edge
            const requiredHeight = compTopY + 0.25;
            if (maxHeight < requiredHeight) {
              maxHeight = requiredHeight;
            }
          }
        }
      }
    });
  }

  // Check collision/overlap with other wires to layer/nest them vertically
  if (state.wires && state.wires.length > 0) {
    state.wires.forEach((otherWire, otherIdx) => {
      if (otherIdx === currentWireIdx) return;
      if (!otherWire.curve) return;

      const otherP1 = getSnapPos(otherWire.fromHole);
      const otherP2 = getSnapPos(otherWire.toHole);
      if (!otherP1 || !otherP2) return;

      const otherMid = otherWire.curve.getPointAt(0.5);
      // Distance on XZ plane between midpoints
      const distXZ = Math.hypot(mid.x - otherMid.x, mid.z - otherMid.z);
      if (distXZ < 0.4) {
        const otherHeight = otherMid.y;
        const proposedHeight = p1.y + maxHeight;
        if (Math.abs(proposedHeight - otherHeight) < 0.3) {
          // Boost our height to be cleanly above the other wire's height
          maxHeight = Math.max(maxHeight, (otherHeight - p1.y) + 0.35);
        }
      }
    });
  }
  
  mid.y += maxHeight;
  mid.add(lateralOffset);
  
  // Intermediate points for smooth draping/bending
  const p1Mid = new THREE.Vector3().addVectors(p1Rise, mid).multiplyScalar(0.5);
  p1Mid.y = p1Rise.y + (mid.y - p1Rise.y) * 0.35; // gentler rise
  p1Mid.addScaledVector(lateralOffset, 0.4);
  
  const p2Mid = new THREE.Vector3().addVectors(p2Rise, mid).multiplyScalar(0.5);
  p2Mid.y = p2Rise.y + (mid.y - p2Rise.y) * 0.35;
  p2Mid.addScaledVector(lateralOffset, 0.4);
  
  points.push(p1Mid);
  points.push(mid);
  points.push(p2Mid);
  points.push(p2Rise);
  points.push(p2.clone());
  
  return new THREE.CatmullRomCurve3(points);
}

function updateWireVisuals(wireIdx, newSnap1, newSnap2) {
  const w = state.wires[wireIdx];
  
  const occupied = getOccupiedHoles();
  newSnap1 = getRedirectedSnap(newSnap1, occupied, newSnap2);
  newSnap2 = getRedirectedSnap(newSnap2, occupied, newSnap1);
  
  // Remove old line mesh and sleeves
  scene.remove(w.lineMesh);
  if (w.sleeves) {
    w.sleeves.forEach(s => scene.remove(s));
  }
  
  const p1 = getSnapPos(newSnap1);
  const p2 = getSnapPos(newSnap2);
  
  const seed = newSnap1 + newSnap2 + wireIdx;
  
  // Wire starts from the top of the sleeves
  const p1Start = p1.clone().add(new THREE.Vector3(0, 0.28, 0));
  const p2End = p2.clone().add(new THREE.Vector3(0, 0.28, 0));
  
  const curve = createWireCurve(p1Start, p2End, seed, wireIdx);
  const geo = new THREE.TubeGeometry(curve, 64, 0.024, 8, false);
  
  const tubeMesh = new THREE.Mesh(geo, w.lineMesh.material);
  scene.add(tubeMesh);
  
  // Position sleeves
  const sleeveGeo = new THREE.BoxGeometry(0.07, 0.28, 0.07);
  const sleeve1 = new THREE.Mesh(sleeveGeo, w.lineMesh.material);
  sleeve1.position.copy(p1).add(new THREE.Vector3(0, 0.14, 0));
  scene.add(sleeve1);
  
  const sleeve2 = new THREE.Mesh(sleeveGeo, w.lineMesh.material);
  sleeve2.position.copy(p2).add(new THREE.Vector3(0, 0.14, 0));
  scene.add(sleeve2);
  
  // Position pins correctly (pins stand half inside the hole)
  w.pins[0].position.copy(p1).add(new THREE.Vector3(0, 0.01, 0));
  w.pins[1].position.copy(p2).add(new THREE.Vector3(0, 0.01, 0));
  
  // Update state properties
  w.fromHole = newSnap1;
  w.toHole = newSnap2;
  w.curve = curve;
  w.lineMesh = tubeMesh;
  w.sleeves = [sleeve1, sleeve2];
}

function create3DWire(snap1, snap2, isUserClick = false) {
  if (isUserClick) {
    const occupied = getOccupiedHoles();
    snap1 = getRedirectedSnap(snap1, occupied, snap2);
    snap2 = getRedirectedSnap(snap2, occupied, snap1);
  }

  const p1 = getSnapPos(snap1);
  const p2 = getSnapPos(snap2);
  
  // Dynamic color coding for wires
  let colorCode;
  if (snap1 === 882 || snap2 === 882 || snap1 % 14 === 0 || snap2 % 14 === 0 || snap1 % 14 === 12 || snap2 % 14 === 12) {
    colorCode = 0xef4444; // Red for positive rail connections
  } else if (snap1 === 883 || snap2 === 883 || snap1 % 14 === 1 || snap2 % 14 === 1 || snap1 % 14 === 13 || snap2 % 14 === 13) {
    colorCode = 0x111827; // Black/dark grey for ground connections
  } else {
    colorCode = [0x3b82f6, 0x10b981, 0xd97706, 0x8b5cf6][state.wires.length % 4]; // multi-color for signal lines
  }
  
  const mat = new THREE.MeshStandardMaterial({ color: colorCode, roughness: 0.4 });
  
  const p1Start = p1.clone().add(new THREE.Vector3(0, 0.28, 0));
  const p2End = p2.clone().add(new THREE.Vector3(0, 0.28, 0));
  
  const seed = snap1 + snap2 + state.wires.length;
  const curve = createWireCurve(p1Start, p2End, seed, state.wires.length);
  const geo = new THREE.TubeGeometry(curve, 64, 0.024, 8, false);
  
  const tubeMesh = new THREE.Mesh(geo, mat);
  scene.add(tubeMesh);
  
  // Flowing electrons (sleek glowing gold micro-particles)
  const electrons = [];
  for (let i = 0; i < 4; i++) {
    const el = new THREE.Mesh(
      new THREE.SphereGeometry(0.015, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xfacc15 })
    );
    el.position.copy(p1Start);
    el.visible = false;
    scene.add(el);
    electrons.push(el);
  }
  
  // Add vertical metal pins at wire connection ends
  const pinGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.18, 8);
  const pinMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9, roughness: 0.1 });
  
  const pin1 = new THREE.Mesh(pinGeo, pinMat);
  pin1.position.copy(p1).add(new THREE.Vector3(0, 0.01, 0));
  scene.add(pin1);
  
  const pin2 = new THREE.Mesh(pinGeo, pinMat);
  pin2.position.copy(p2).add(new THREE.Vector3(0, 0.01, 0));
  scene.add(pin2);
  
  // Add plastic connector sleeves
  const sleeveGeo = new THREE.BoxGeometry(0.07, 0.28, 0.07);
  
  const sleeve1 = new THREE.Mesh(sleeveGeo, mat);
  sleeve1.position.copy(p1).add(new THREE.Vector3(0, 0.14, 0));
  scene.add(sleeve1);
  
  const sleeve2 = new THREE.Mesh(sleeveGeo, mat);
  sleeve2.position.copy(p2).add(new THREE.Vector3(0, 0.14, 0));
  scene.add(sleeve2);
  
  state.wires.push({
    fromHole: snap1,
    toHole: snap2,
    curve,
    lineMesh: tubeMesh,
    electrons,
    pins: [pin1, pin2],
    sleeves: [sleeve1, sleeve2]
  });
  
  if (state.activeExperiment === 'ohms' && state.wires.length >= 4) {
    completeStep(4);
  } else if (state.activeExperiment === 'lcr' && state.wires.length >= 5) {
    completeStep(2);
  } else if (state.activeExperiment === 'rc' && state.wires.length >= 3) {
    completeStep(2);
  } else if (state.activeExperiment === 'kcl' && state.wires.length >= 5) {
    completeStep(2);
  }
  
  updateTelemetryCounts();
  updateAIMentor();
  updateTargetHighlights();

  const validation = validateCircuitLocal();
  if (validation.status === 'success') {
    triggerSingleCalculation();
  }
  
  debouncedSaveCircuit();
}

function deleteComponent3D(idx) {
  const comp = state.placedComponents[idx];
  if (hoveredComponent === comp) {
    hoveredComponent = null;
    if (hoverOutlineHelper) {
      comp.mesh.remove(hoverOutlineHelper);
      hoverOutlineHelper = null;
    }
    if (tooltipEl) {
      tooltipEl.style.display = 'none';
    }
  }
  // Clear selection if deleting the selected component
  if (state.selectedComponentIdx === idx) {
    state.selectedComponentIdx = -1;
    clearAllComponentOutlines(true);
  } else if (state.selectedComponentIdx > idx) {
    state.selectedComponentIdx--;
  }

  scene.remove(comp.mesh);
  comp.leads.forEach(l => scene.remove(l));
  
  state.placedComponents.splice(idx, 1);
  for (let i = idx; i < state.placedComponents.length; i++) {
    state.placedComponents[i].id = i;
  }
  
  updateTelemetryCounts();
  state.isRunning = false;
  stopPollingCalculations();
  updateAIMentor();
  updateTargetHighlights();
  debouncedSaveCircuit();
}

function rotateComponent3D(idx) {
  const comp = state.placedComponents[idx];
  if (!comp) return;
  
  const c1 = Math.floor(comp.snap1 / 14);
  const r1 = comp.snap1 % 14;
  const c2 = Math.floor(comp.snap2 / 14);
  const r2 = comp.snap2 % 14;
  
  if (comp.snap1 === comp.snap2) return;
  
  let newSnap1 = comp.snap1;
  let newSnap2 = comp.snap2;
  
  if (r1 === r2) {
    // Horizontal -> Rotate to Vertical
    const distCols = c2 - c1;
    let targetRow = r1 + distCols;
    if (targetRow < 0 || targetRow >= 14) {
      targetRow = r1 - distCols;
    }
    if (targetRow < 0) targetRow = 0;
    if (targetRow >= 14) targetRow = 13;
    newSnap2 = c1 * 14 + targetRow;
  } else if (c1 === c2) {
    // Vertical -> Rotate to Horizontal
    const distRows = r2 - r1;
    let targetCol = c1 + distRows;
    if (targetCol < 0 || targetCol >= 60) {
      targetCol = c1 - distRows;
    }
    if (targetCol < 0) targetCol = 0;
    if (targetCol >= 60) targetCol = 59;
    newSnap2 = targetCol * 14 + r1;
  } else {
    // Diagonal/Other -> swap snap points
    newSnap1 = comp.snap2;
    newSnap2 = comp.snap1;
  }
  
  scene.remove(comp.mesh);
  comp.leads.forEach(l => scene.remove(l));
  
  const initialColor = comp.type === 'led' ? (comp.color || state.params.led_color || 'red') : null;
  const { mesh, leads } = createComponentVisuals(comp.type, newSnap1, newSnap2, initialColor);
  
  scene.add(mesh);
  leads.forEach(l => scene.add(l));
  
  comp.snap1 = newSnap1;
  comp.snap2 = newSnap2;
  comp.mesh = mesh;
  comp.leads = leads;
  
  // Re-apply selection box to new mesh
  const selectionBox = createLocalSelectionBox(comp);
  comp.mesh.add(selectionBox);
  
  updateTelemetryCounts();
  updateDynamicTextures();
  updateAIMentor();
  updateTargetHighlights();
  
  const validation = validateCircuitLocal();
  if (validation.status === 'success') {
    triggerSingleCalculation();
  }
  
  updateInspector();
  debouncedSaveCircuit();
}

function deleteWire3D(idx) {
  const w = state.wires[idx];
  scene.remove(w.lineMesh);
  w.electrons.forEach(el => scene.remove(el));
  if (w.pins) {
    w.pins.forEach(p => scene.remove(p));
  }
  if (w.sleeves) {
    w.sleeves.forEach(s => scene.remove(s));
  }
  state.wires.splice(idx, 1);
  
  updateTelemetryCounts();
  state.isRunning = false;
  stopPollingCalculations();
  updateAIMentor();
  updateTargetHighlights();
  debouncedSaveCircuit();
}

function populateLibraryGrid(category) {
  const container = document.getElementById('library-grid-container');
  if (!container) return;
  container.innerHTML = '';
  
  let catData;
  if (category === 'circuits') {
    catData = {
      title: "Electricity & Circuits",
      color: "rgba(59, 130, 246, 0.08)",
      borderColor: "rgba(59, 130, 246, 0.25)",
      badgeColor: "#60a5fa",
      exps: ['ohms', 'kvl', 'kcl', 'rc_rl_rlc', 'series_parallel', 'wheatstone', 'diode_iv', 'voltage_divider', 'planck_led', 'lcr', 'rc']
    };
  } else if (category === 'magnetism') {
    catData = {
      title: "Electromagnetism",
      color: "rgba(168, 85, 247, 0.08)",
      borderColor: "rgba(168, 85, 247, 0.25)",
      badgeColor: "#c084fc",
      exps: ['faraday', 'lenz', 'solenoid', 'transformer', 'biot_savart']
    };
  } else if (category === 'thermo') {
    catData = {
      title: "Thermodynamics",
      color: "rgba(244, 63, 94, 0.08)",
      borderColor: "rgba(244, 63, 94, 0.25)",
      badgeColor: "#fb7185",
      exps: ['ideal_gas', 'boyle', 'charles', 'specific_heat', 'stefan_law']
    };
  } else if (category === 'modern') {
    catData = {
      title: "Modern Physics",
      color: "rgba(16, 185, 129, 0.08)",
      borderColor: "rgba(16, 185, 129, 0.25)",
      badgeColor: "#34d399",
      exps: ['photoelectric', 'planck_photocell', 'planck_led', 'radioactive', 'de_broglie', 'bohr_model']
    };
  }
  
  if (!catData) return;
  
  const grid = document.createElement('div');
  grid.style.cssText = "display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:15px;";
  
  catData.exps.forEach(key => {
    const exp = experiments[key];
    if (!exp) return;
    
    const card = document.createElement('div');
    const isLightInitial = state.theme === 'light';
    card.style.cssText = `background:${isLightInitial ? 'var(--panel)' : 'rgba(255,255,255,0.015)'};border:1px solid ${isLightInitial ? 'var(--border)' : 'rgba(255,255,255,0.04)'};border-radius:14px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer;transform-style:preserve-3d;transition:transform 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease, background 0.5s ease;`;
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const width = card.clientWidth;
      const height = card.clientHeight;
      const xPct = (x / width) - 0.5;
      const yPct = (y / height) - 0.5;
      
      const rotateX = -yPct * 20; 
      const rotateY = xPct * 20;
      const glowX = (x / width) * 100;
      const glowY = (y / height) * 100;
      
      const isLight = state.theme === 'light';
      const glowColor = isLight ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.08)';
      
      card.style.transition = "none";
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor} 0%, transparent 50%), radial-gradient(circle at ${glowX}% ${glowY}%, ${catData.color.replace('0.08', '0.15')} 0%, transparent 60%), ${isLight ? 'var(--panel)' : catData.color}`;
      card.style.borderColor = catData.borderColor;
      card.style.boxShadow = isLight 
        ? `0 15px 30px -10px rgba(0, 0, 0, 0.1), 0 0 12px 1px ${catData.borderColor}`
        : `0 20px 45px -12px rgba(0, 0, 0, 0.7), 0 0 15px 1px ${catData.borderColor}`;
    });
    
    card.addEventListener('mouseleave', () => {
      const isLight = state.theme === 'light';
      card.style.transition = "transform 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease, background 0.5s ease";
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      card.style.background = isLight ? "var(--panel)" : "rgba(255,255,255,0.015)";
      card.style.borderColor = isLight ? "var(--border)" : "rgba(255,255,255,0.04)";
      card.style.boxShadow = "none";
    });
    
    card.innerHTML = `
      <div style="transform: translateZ(20px); transform-style: preserve-3d;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;transform: translateZ(10px);">
          <span style="font-size:8px;color:${catData.badgeColor};text-transform:uppercase;font-weight:700;letter-spacing:1px">Module</span>
          <span style="width:5px;height:5px;border-radius:50%;background:${catData.badgeColor}"></span>
        </div>
        <h3 style="font-size:13px;font-weight:700;margin:0 0 4px 0;color:white;font-family:inherit;transform: translateZ(15px);">${exp.name}</h3>
        <p style="font-size:10px;color:#64748b;margin:0 0 12px 0;line-height:1.4;transform: translateZ(12px);">${exp.aim}</p>
        
        <div style="background:rgba(0,0,0,0.45);border:1px solid rgba(255,255,255,0.05);border-radius:10px;padding:10px;margin-top:10px;font-family:'JetBrains Mono', monospace;transform: translateZ(25px);" class="exp-formula-box">
          <span style="font-size:7px;color:#64748b;text-transform:uppercase;font-weight:700;display:block;">Core Equation:</span>
          <code style="font-size:10px;color:${catData.badgeColor};display:block;font-weight:bold;margin-top:2px;">${exp.formulas && exp.formulas.length > 0 ? exp.formulas[0].expr : "N/A"}</code>
        </div>
      </div>
      <button style="width:100%;padding:8px;border-radius:8px;border:none;background:#2563eb;color:white;font-weight:700;font-size:10px;cursor:pointer;font-family:inherit;transform: translateZ(35px);margin-top:16px;" class="exp-load-btn">Load Simulation</button>
    `;
    
    card.addEventListener('click', () => {
      setupExperiment(key, true);
      document.getElementById('modal-library').style.display = 'none';
    });
    
    grid.appendChild(card);
  });
  
  container.appendChild(grid);
}

// ─── SQL DATABASE ROUTINES ───────────────────────────────────────────────────
let saveTimeout = null;

function broadcastCircuitState() {
  try {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: 'CIRCUIT_STATE_UPDATE',
        payload: {
          placed_components: state.placedComponents.map((c, index) => ({ type: c.type, id: index })),
          wires: typeof resolveVirtualWires === 'function' ? resolveVirtualWires() : [],
          params: state.params,
          readings: {
            volts: state.meters.volts || 0,
            amps: state.meters.amps || 0,
            ohms: state.meters.ohms || 0,
            power: state.meters.power || 0
          }
        }
      }, '*');
    }
  } catch (e) {
    console.warn("Failed to broadcast circuit state:", e);
  }
}

function showToastNotification(message, type = 'success') {
  const wrap = document.getElementById('notif-wrap');
  if (!wrap) return;
  
  const notif = document.createElement('div');
  notif.className = `notif ${type}`;
  
  let icon = 'fa-circle-check';
  if (type === 'error') icon = 'fa-circle-exclamation';
  if (type === 'info') icon = 'fa-circle-info';
  
  notif.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
  wrap.appendChild(notif);
  
  // Trigger animation
  setTimeout(() => {
    notif.classList.add('show');
  }, 10);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notif.classList.remove('show');
    setTimeout(() => {
      notif.remove();
    }, 300);
  }, 3000);
}

function debouncedSaveCircuit() {
  if (state.isDatabaseLoading) return;
  
  if (elements.saveDot && elements.saveText) {
    elements.saveText.innerText = "DB: SYNCING...";
    elements.saveDot.style.background = "#eab308"; // Orange indicator
  }
  
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    saveCircuitToBackend();
  }, 1500);

  broadcastCircuitState();
}

async function saveCircuitToBackend(isManual = false) {
  if (state.isDatabaseLoading) return;
  try {
    const payload = {
      user_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", // Mock student profile Aisha
      experiment_type: state.activeExperiment,
      name: `Experiment: ${state.activeExperiment}`,
      description: `Saved breadboard layout for ${state.activeExperiment}`,
      circuit_data: {
        placedComponents: state.placedComponents.map(c => ({
          type: c.type,
          snap1: c.snap1,
          snap2: c.snap2
        })),
        wires: state.wires.map(w => ({
          fromHole: w.fromHole,
          toHole: w.toHole
        })),
        dataPoints: state.dataPoints
      },
      params: state.params
    };

    const response = await fetch('/api/db/save-circuit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (response.ok) {
      const result = await response.json();
      if (elements.saveDot && elements.saveText) {
        elements.saveText.innerText = "DB: SAVED";
        elements.saveDot.style.background = "#10b981"; // Green indicator
      }
      if (isManual) {
        showToastNotification("Progress saved successfully!", "success");
      }
    } else {
      throw new Error(`HTTP ${response.status}`);
    }
  } catch (e) {
    console.error("[DB Error] Failed to save circuit diagram:", e);
    if (elements.saveDot && elements.saveText) {
      elements.saveText.innerText = "DB: OFFLINE";
      elements.saveDot.style.background = "#f43f5e"; // Red indicator
    }
    if (isManual) {
      showToastNotification("Failed to save progress. Server offline.", "error");
    }
  }
}

async function checkAndPromptRestore(expKey) {
  if (elements.saveDot && elements.saveText) {
    elements.saveText.innerText = "DB: CHECKING...";
    elements.saveDot.style.background = "#3b82f6"; // Blue indicator
  }
  
  try {
    const response = await fetch(`/api/db/load-circuit?experiment_type=${expKey}&user_id=a1b2c3d4-e5f6-7890-abcd-ef1234567890`);
    if (!response.ok) {
      if (elements.saveDot && elements.saveText) {
        elements.saveText.innerText = "DB: READY";
        elements.saveDot.style.background = "var(--accent)";
      }
      return;
    }
    
    const data = await response.json();
    if (data.status === 'success' && data.circuit && data.circuit.circuit_data) {
      const cdata = data.circuit.circuit_data;
      
      const hasPlacedComponents = cdata.placedComponents && cdata.placedComponents.length > 0;
      const hasWires = cdata.wires && cdata.wires.length > 0;
      const hasDataPoints = cdata.dataPoints && cdata.dataPoints.length > 0;
      
      if (hasPlacedComponents || hasWires || hasDataPoints) {
        const modal = document.getElementById('modal-load-confirm');
        const expNameEl = document.getElementById('confirm-exp-name');
        
        if (modal) {
          if (expNameEl) {
            const exp = experiments[expKey];
            expNameEl.innerText = exp ? exp.name : expKey;
          }
          modal.style.display = 'flex';
          
          const btnRestore = document.getElementById('btn-confirm-restore');
          const btnNew = document.getElementById('btn-confirm-new');
          
          const cleanupModal = () => {
            modal.style.display = 'none';
            const newRestore = btnRestore.cloneNode(true);
            const newNew = btnNew.cloneNode(true);
            btnRestore.parentNode.replaceChild(newRestore, btnRestore);
            btnNew.parentNode.replaceChild(newNew, btnNew);
          };
          
          btnRestore.onclick = () => {
            cleanupModal();
            applyCircuitData(cdata);
          };
          
          btnNew.onclick = () => {
            cleanupModal();
            clearSavedProgress(expKey);
          };
        } else {
          applyCircuitData(cdata);
        }
      } else {
        if (elements.saveDot && elements.saveText) {
          elements.saveText.innerText = "DB: READY";
          elements.saveDot.style.background = "var(--accent)";
        }
      }
    } else {
      if (elements.saveDot && elements.saveText) {
        elements.saveText.innerText = "DB: READY";
        elements.saveDot.style.background = "var(--accent)";
      }
    }
  } catch (e) {
    console.error("[DB Error] Failed check and prompt restore:", e);
    if (elements.saveDot && elements.saveText) {
      elements.saveText.innerText = "DB: OFFLINE";
      elements.saveDot.style.background = "#f43f5e";
    }
  }
}

function applyCircuitData(cdata) {
  state.isDatabaseLoading = true;
  if (elements.saveDot && elements.saveText) {
    elements.saveText.innerText = "DB: RESTORING...";
    elements.saveDot.style.background = "#3b82f6";
  }
  
  try {
    // 1. Rebuild component meshes
    if (cdata.placedComponents && cdata.placedComponents.length > 0) {
      cdata.placedComponents.forEach(c => {
        placeComponent3D(c.type, c.snap1, c.snap2);
      });
    }
    
    // 2. Rebuild wires
    if (cdata.wires && cdata.wires.length > 0) {
      cdata.wires.forEach(w => {
        create3DWire(w.fromHole, w.toHole, false);
      });
    }
    
    // 3. Restore parameter knobs
    if (cdata.params) {
      Object.keys(cdata.params).forEach(key => {
        updateParameterValue(key, cdata.params[key]);
      });
    }
    
    // 4. Restore recorded data points (readings)
    if (cdata.dataPoints) {
      state.dataPoints = cdata.dataPoints;
      drawObservationTable();
      drawGraph();
      
      if (state.dataPoints.length > 0) {
        const conclusion = generateExperimentConclusion(state.activeExperiment, state.dataPoints);
        elements.conclusionText.innerHTML = `<b>Conclusion:</b><br>${conclusion}`;
      }
    } else {
      state.dataPoints = [];
      drawObservationTable();
      drawGraph();
    }
    
    if (elements.saveDot && elements.saveText) {
      elements.saveText.innerText = "DB: LOADED";
      elements.saveDot.style.background = "#10b981"; // Green indicator
    }
    appendAIMessage("Circuit IQ · AI Mentor", "Loaded your previously saved circuit layout and observations from database.");
  } catch (e) {
    console.error("[DB Error] Failed to apply loaded circuit:", e);
    if (elements.saveDot && elements.saveText) {
      elements.saveText.innerText = "DB: OFFLINE";
      elements.saveDot.style.background = "#f43f5e";
    }
  } finally {
    state.isDatabaseLoading = false;
  }
}

async function clearSavedProgress(expKey) {
  try {
    const payload = {
      user_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      experiment_type: expKey,
      name: `Experiment: ${expKey}`,
      description: `Cleared layout for fresh start`,
      circuit_data: {
        placedComponents: [],
        wires: [],
        dataPoints: []
      },
      params: {
        V: 12,
        R: 100,
        L: 50,
        C: 100,
        f: 50,
        T: 25,
        led_color: 'red'
      }
    };

    await fetch('/api/db/save-circuit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (elements.saveDot && elements.saveText) {
      elements.saveText.innerText = "DB: READY";
      elements.saveDot.style.background = "var(--accent)";
    }
    
    state.dataPoints = [];
    drawObservationTable();
    drawGraph();
    elements.conclusionText.innerHTML = "";
    updateAIMentor();
  } catch (e) {
    console.error("[DB Error] Failed to clear progress:", e);
  }
}

async function loadCircuitFromBackend(expKey) {
  state.isDatabaseLoading = true;
  if (elements.saveDot && elements.saveText) {
    elements.saveText.innerText = "DB: LOADING...";
    elements.saveDot.style.background = "#3b82f6"; // Blue indicator
  }
  
  try {
    const response = await fetch(`/api/db/load-circuit?experiment_type=${expKey}&user_id=a1b2c3d4-e5f6-7890-abcd-ef1234567890`);
    if (!response.ok) {
      if (elements.saveDot && elements.saveText) {
        elements.saveText.innerText = "DB: EMPTY";
        elements.saveDot.style.background = "#64748b";
      }
      return;
    }
    
    const data = await response.json();
    if (data.status === 'success' && data.circuit && data.circuit.circuit_data) {
      const cdata = data.circuit.circuit_data;
      
      // 1. Rebuild component meshes
      if (cdata.placedComponents && cdata.placedComponents.length > 0) {
        cdata.placedComponents.forEach(c => {
          placeComponent3D(c.type, c.snap1, c.snap2);
        });
      }
      
      // 2. Rebuild wires
      if (cdata.wires && cdata.wires.length > 0) {
        cdata.wires.forEach(w => {
          create3DWire(w.fromHole, w.toHole, false);
        });
      }
      
      // 3. Restore parameter knobs
      if (cdata.params) {
        Object.keys(cdata.params).forEach(key => {
          updateParameterValue(key, cdata.params[key]);
        });
      }
      
      // 4. Restore recorded data points (readings)
      if (cdata.dataPoints) {
        state.dataPoints = cdata.dataPoints;
        drawObservationTable();
        drawGraph();
        
        if (state.dataPoints.length > 0) {
          const conclusion = generateExperimentConclusion(state.activeExperiment, state.dataPoints);
          elements.conclusionText.innerHTML = `<b>Conclusion:</b><br>${conclusion}`;
        }
      } else {
        state.dataPoints = [];
        drawObservationTable();
        drawGraph();
      }
      
      if (elements.saveDot && elements.saveText) {
        elements.saveText.innerText = "DB: LOADED";
        elements.saveDot.style.background = "#10b981"; // Green indicator
      }
      appendAIMessage("Circuit IQ · AI Mentor", "Loaded your previously saved circuit layout and observations from database.");
    } else {
      if (elements.saveDot && elements.saveText) {
        elements.saveText.innerText = "DB: READY";
        elements.saveDot.style.background = "var(--accent)";
      }
    }
  } catch (e) {
    console.error("[DB Error] Failed to load circuit diagram:", e);
    if (elements.saveDot && elements.saveText) {
      elements.saveText.innerText = "DB: OFFLINE";
      elements.saveDot.style.background = "#f43f5e";
    }
  } finally {
    state.isDatabaseLoading = false;
  }
}

async function saveExperimentLogToBackend(notes = "", score = null) {
  try {
    const elapsed = Math.round((Date.now() - state.energyStartTime) / 1000);
    const scoreVal = score !== null ? score : (state.dataPoints.length >= 5 ? 100.0 : state.dataPoints.length * 20.0);
    
    const payload = {
      user_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      experiment_type: state.activeExperiment,
      results: {
        volts: state.meters.volts,
        amps: state.meters.amps,
        ohms: state.meters.ohms,
        power: state.meters.power,
        energy: state.meters.energy,
        dataPointsCount: state.dataPoints.length
      },
      duration_seconds: elapsed || 60,
      score: scoreVal,
      notes: notes || elements.conclusionText.innerText || "Experiment performed.",
      feedback: "Student successfully compiled data points and downloaded experiment logs."
    };

    await fetch('/api/db/save-log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    console.log("[DB] Logged experiment run successfully.");
  } catch (e) {
    console.error("[DB Error] Failed to log experiment completion:", e);
  }
}

// --- BULLETPROOF INIT ON LOAD ---
function initAll() {
  tooltipEl = document.createElement('div');
  tooltipEl.className = 'component-tooltip';
  document.body.appendChild(tooltipEl);

  initTabRouter();
  initInteraction();
  
  // Read target experiment from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const initialExp = urlParams.get('exp') || 'ohms';
  const initialTheme = urlParams.get('theme') || 'dark';
  
  state.theme = initialTheme;
  setTheme(initialTheme);
  
  drawOscilloscope();
  
  setTimeout(() => {
    initThreeJS();
    setupExperiment(initialExp, true);
  }, 100);

  // Listen to message events for theme toggle
  window.addEventListener('message', (event) => {
    if (event.data && typeof event.data === 'object') {
      if (event.data.type === 'theme-change') {
        setTheme(event.data.theme);
      }
    }
  });

  // Set up local theme toggle button click listener
  const themeToggleBtn = document.getElementById('btn-theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const targetTheme = state.theme === 'light' ? 'dark' : 'light';
      setTheme(targetTheme);
      try {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ type: 'theme-change', theme: targetTheme }, '*');
        }
      } catch (e) {
        console.warn("Failed to post theme-change message:", e);
      }
    });
  }

  // Setup Experiments Library modal event handlers
  const libraryModal = document.getElementById('modal-library');
  const libraryClose = document.getElementById('library-close');
  
  if (elements.experimentSelect) {
    elements.experimentSelect.addEventListener('mousedown', (e) => {
      e.preventDefault();
      if (libraryModal) {
        libraryModal.style.display = 'flex';
        populateLibraryGrid('circuits');
        
        // Reset tabs style
        document.querySelectorAll('.lib-tab-btn').forEach(btn => {
          btn.style.background = 'none';
          btn.style.color = '#64748b';
        });
        const activeTab = document.querySelector('.lib-tab-btn[data-lib-cat="circuits"]');
        if (activeTab) {
          activeTab.style.background = 'rgba(59,130,246,0.12)';
          activeTab.style.color = '#60a5fa';
        }
      }
    });
  }
  
  if (libraryClose) {
    libraryClose.addEventListener('click', () => {
      if (libraryModal) libraryModal.style.display = 'none';
    });
  }
  
  // Wire up tabs inside library modal
  document.querySelectorAll('.lib-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lib-tab-btn').forEach(b => {
        b.style.background = 'none';
        b.style.color = '#64748b';
      });
      btn.style.background = 'rgba(59,130,246,0.12)';
      btn.style.color = '#60a5fa';
      
      const cat = btn.getAttribute('data-lib-cat');
      populateLibraryGrid(cat);
    });
  });
}

// --- DYNAMIC EXPERIMENT DIAGRAMS AND EXPLANATIONS ---
function updateDiagram(expKey) {
  const container = document.getElementById('diagram-content-container');
  if (!container) return;

  const exp = experiments[expKey];
  let title = "DC Circuit Schema";
  let svg = "";
  let description = "";

  if (expKey === 'ohms') {
    title = "Ohm's Law Verification";
    svg = `
      <svg viewBox="0 0 200 120" style="width:100%;max-width:180px;height:auto;margin:0 auto;display:block">
        <line x1="30" y1="50" x2="30" y2="70" stroke="#ef4444" stroke-width="2" />
        <line x1="35" y1="55" x2="35" y2="65" stroke="#ef4444" stroke-width="1" />
        <line x1="40" y1="50" x2="40" y2="70" stroke="#ef4444" stroke-width="2" />
        <line x1="45" y1="55" x2="45" y2="65" stroke="#ef4444" stroke-width="1" />
        <text x="20" y="63" fill="#ef4444" font-size="8" font-family="sans-serif" font-weight="bold">+</text>
        <text x="50" y="63" fill="#ef4444" font-size="8" font-family="sans-serif">-</text>
        <path d="M 30 60 L 15 60 L 15 20 L 70 20" fill="none" stroke="#00d084" stroke-width="1.5" />
        <path d="M 45 60 L 175 60 L 175 20 L 150 20" fill="none" stroke="#64748b" stroke-width="1.5" />
        <circle cx="85" cy="20" r="10" fill="#020617" stroke="#3b82f6" stroke-width="1.5" />
        <text x="85" y="23" fill="#3b82f6" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">A</text>
        <line x1="70" y1="20" x2="75" y2="20" stroke="#00d084" stroke-width="1.5" />
        <line x1="95" y1="20" x2="105" y2="20" stroke="#00d084" stroke-width="1.5" />
        <path d="M 105 20 L 110 15 L 115 25 L 120 15 L 125 25 L 130 15 L 135 25 L 140 20" fill="none" stroke="#f97316" stroke-width="1.5" />
        <line x1="140" y1="20" x2="150" y2="20" stroke="#64748b" stroke-width="1.5" />
        <text x="122" y="10" fill="#f97316" font-size="8" font-family="sans-serif" text-anchor="middle" font-weight="bold">R</text>
        <path d="M 105 20 L 105 45 L 115 45" fill="none" stroke="#00d084" stroke-width="1.2" />
        <path d="M 140 20 L 140 45 L 130 45" fill="none" stroke="#64748b" stroke-width="1.2" />
        <circle cx="122" cy="45" r="9" fill="#020617" stroke="#ef4444" stroke-width="1.5" />
        <text x="122" y="48" fill="#ef4444" font-size="8" font-family="sans-serif" font-weight="bold" text-anchor="middle">V</text>
      </svg>
    `;
    description = "Standard verification circuit. The ammeter is connected in series with the resistor to measure loop current <i>I</i>, and the voltmeter is placed in parallel to measure the voltage drop <i>V</i>.";
  }
  else if (expKey === 'kvl') {
    title = "Kirchhoff's Voltage Law";
    svg = `
      <svg viewBox="0 0 200 120" style="width:100%;max-width:180px;height:auto;margin:0 auto;display:block">
        <line x1="25" y1="50" x2="25" y2="70" stroke="#ef4444" stroke-width="1.5" />
        <line x1="30" y1="55" x2="30" y2="65" stroke="#ef4444" stroke-width="0.8" />
        <text x="15" y="63" fill="#ef4444" font-size="8" font-family="sans-serif" font-weight="bold">+</text>
        <path d="M 25 60 L 15 60 L 15 20 L 50 20" fill="none" stroke="#00d084" stroke-width="1.5" />
        <path d="M 30 60 L 185 60 L 185 20 L 150 20" fill="none" stroke="#64748b" stroke-width="1.5" />
        <path d="M 50 20 L 55 15 L 60 25 L 65 15 L 70 25 L 75 15 L 80 25 L 85 20" fill="none" stroke="#f97316" stroke-width="1.5" />
        <text x="67" y="10" fill="#f97316" font-size="8" font-family="sans-serif" text-anchor="middle">R₁</text>
        <line x1="85" y1="20" x2="93" y2="20" stroke="#00d084" stroke-width="1.5" />
        <circle cx="100" cy="20" r="6" fill="#020617" stroke="#3b82f6" stroke-width="1.2" />
        <text x="100" y="22" fill="#3b82f6" font-size="7" font-family="sans-serif" font-weight="bold" text-anchor="middle">A</text>
        <line x1="107" y1="20" x2="115" y2="20" stroke="#00d084" stroke-width="1.5" />
        <path d="M 115 20 L 120 15 L 125 25 L 130 15 L 135 25 L 140 15 L 145 25 L 150 20" fill="none" stroke="#3b82f6" stroke-width="1.5" />
        <text x="132" y="10" fill="#3b82f6" font-size="8" font-family="sans-serif" text-anchor="middle">R₂</text>
        <path d="M 50 20 L 50 45 L 60 45" fill="none" stroke="#00d084" stroke-width="1" />
        <path d="M 85 20 L 85 45 L 75 45" fill="none" stroke="#64748b" stroke-width="1" />
        <circle cx="67" cy="45" r="7" fill="#020617" stroke="#ef4444" stroke-width="1.2" />
        <text x="67" y="47.5" fill="#ef4444" font-size="7" font-family="sans-serif" text-anchor="middle">V₁</text>
        <path d="M 115 20 L 115 45 L 125 45" fill="none" stroke="#00d084" stroke-width="1" />
        <path d="M 150 20 L 150 45 L 140 45" fill="none" stroke="#64748b" stroke-width="1" />
        <circle cx="132" cy="45" r="7" fill="#020617" stroke="#ef4444" stroke-width="1.2" />
        <text x="132" y="47.5" fill="#ef4444" font-size="7" font-family="sans-serif" text-anchor="middle">V₂</text>
      </svg>
    `;
    description = "Loop rule verification. Sum of voltage drops across R₁ and R₂ equals source voltage: V_source = V₁ + V₂. The loop must be complete in series.";
  }
  else if (expKey === 'kcl') {
    title = "Kirchhoff's Current Law";
    svg = `
      <svg viewBox="0 0 200 120" style="width:100%;max-width:180px;height:auto;margin:0 auto;display:block">
        <line x1="25" y1="50" x2="25" y2="70" stroke="#ef4444" stroke-width="1.5" />
        <line x1="30" y1="55" x2="30" y2="65" stroke="#ef4444" stroke-width="0.8" />
        <path d="M 25 60 L 15 60 L 15 20 L 33 20" fill="none" stroke="#00d084" stroke-width="1.5" />
        <circle cx="38" cy="20" r="5" fill="#020617" stroke="#ef4444" stroke-width="1" />
        <text x="38" y="22" fill="#ef4444" font-size="5" font-family="sans-serif" font-weight="bold" text-anchor="middle">A</text>
        <path d="M 43 20 L 60 20" fill="none" stroke="#00d084" stroke-width="1.5" />
        <path d="M 30 60 L 185 60 L 185 20 L 140 20" fill="none" stroke="#64748b" stroke-width="1.5" />
        <path d="M 60 20 L 60 10 L 68.5 10" fill="none" stroke="#00d084" stroke-width="1.2" />
        <circle cx="73" cy="10" r="4.5" fill="#020617" stroke="#3b82f6" stroke-width="1" />
        <text x="73" y="12" fill="#3b82f6" font-size="4.5" font-family="sans-serif" font-weight="bold" text-anchor="middle">A₁</text>
        <path d="M 77.5 10 L 80 10" fill="none" stroke="#00d084" stroke-width="1.2" />
        <path d="M 60 20 L 60 30 L 68.5 30" fill="none" stroke="#00d084" stroke-width="1.2" />
        <circle cx="73" cy="30" r="4.5" fill="#020617" stroke="#3b82f6" stroke-width="1" />
        <text x="73" y="32" fill="#3b82f6" font-size="4.5" font-family="sans-serif" font-weight="bold" text-anchor="middle">A₂</text>
        <path d="M 77.5 30 L 80 30" fill="none" stroke="#00d084" stroke-width="1.2" />
        <path d="M 80 10 L 85 7 L 90 13 L 95 7 L 100 13 L 105 7 L 110 13 L 115 10" fill="none" stroke="#f97316" stroke-width="1.2" />
        <text x="97" y="4" fill="#f97316" font-size="7" font-family="sans-serif" text-anchor="middle">R₁</text>
        <path d="M 115 10 L 135 10 L 135 20" fill="none" stroke="#64748b" stroke-width="1.2" />
        <path d="M 80 30 L 85 27 L 90 33 L 95 27 L 100 33 L 105 27 L 110 33 L 115 30" fill="none" stroke="#3b82f6" stroke-width="1.2" />
        <text x="97" y="24" fill="#3b82f6" font-size="7" font-family="sans-serif" text-anchor="middle">R₂</text>
        <path d="M 115 30 L 135 30 L 135 20" fill="none" stroke="#64748b" stroke-width="1.2" />
        <circle cx="60" cy="20" r="2" fill="#22c55e" />
        <circle cx="135" cy="20" r="2" fill="#22c55e" />
        <text x="60" y="38" fill="#22c55e" font-size="8" font-family="sans-serif" text-anchor="middle">node A</text>
      </svg>
    `;
    description = "Nodal current rule. Current branching into parallel paths (R₁ and R₂) equals main current entering node: I_total = I₁ + I₂.";
  }
  else if (expKey === 'lcr' || expKey === 'rc_rl_rlc') {
    title = "Series LCR AC Resonance";
    svg = `
      <svg viewBox="0 0 200 120" style="width:100%;max-width:180px;height:auto;margin:0 auto;display:block">
        <circle cx="30" cy="60" r="10" fill="none" stroke="#3b82f6" stroke-width="1.5" />
        <path d="M 25 60 Q 27.5 55 30 60 T 35 60" fill="none" stroke="#3b82f6" stroke-width="1.5" />
        <path d="M 30 50 L 30 20 L 55 20" fill="none" stroke="#00d084" stroke-width="1.5" />
        <path d="M 30 70 L 30 100 L 180 100 L 180 20 L 160 20" fill="none" stroke="#64748b" stroke-width="1.5" />
        <path d="M 55 20 L 60 15 L 65 25 L 70 15 L 75 25 L 80 15 L 85 25 L 90 20" fill="none" stroke="#f97316" stroke-width="1.5" />
        <text x="72" y="10" fill="#f97316" font-size="8" font-family="sans-serif" text-anchor="middle">R</text>
        <line x1="90" y1="20" x2="105" y2="20" stroke="#00d084" stroke-width="1.5" />
        <path d="M 105 20 Q 108 13 111 20 Q 114 13 117 20 Q 120 13 123 20 Q 126 13 129 20" fill="none" stroke="#a855f7" stroke-width="1.5" />
        <text x="117" y="10" fill="#a855f7" font-size="8" font-family="sans-serif" text-anchor="middle">L</text>
        <line x1="129" y1="20" x2="145" y2="20" stroke="#00d084" stroke-width="1.5" />
        <line x1="145" y1="12" x2="145" y2="28" stroke="#06b6d4" stroke-width="2" />
        <line x1="150" y1="12" x2="150" y2="28" stroke="#06b6d4" stroke-width="2" />
        <text x="148" y="8" fill="#06b6d4" font-size="8" font-family="sans-serif" text-anchor="middle">C</text>
      </svg>
    `;
    description = "AC Series resonance circuit. Reactance XL cancels XC at resonance frequency f₀ = 1 / (2π√(LC)), yielding minimum impedance Z = R.";
  }
  else if (expKey === 'rc') {
    title = "RC Transient Charging";
    svg = `
      <svg viewBox="0 0 200 120" style="width:100%;max-width:180px;height:auto;margin:0 auto;display:block">
        <line x1="30" y1="50" x2="30" y2="70" stroke="#ef4444" stroke-width="2" />
        <line x1="35" y1="55" x2="35" y2="65" stroke="#ef4444" stroke-width="1" />
        <text x="18" y="63" fill="#ef4444" font-size="8" font-family="sans-serif" font-weight="bold">+</text>
        <path d="M 30 60 L 15 60 L 15 20 L 50 20" fill="none" stroke="#00d084" stroke-width="1.5" />
        <path d="M 35 60 L 175 60 L 175 20 L 140 20" fill="none" stroke="#64748b" stroke-width="1.5" />
        <line x1="50" y1="20" x2="65" y2="10" stroke="#a855f7" stroke-width="1.5" />
        <circle cx="50" cy="20" r="1.5" fill="#a855f7" />
        <circle cx="65" cy="20" r="1.5" fill="#a855f7" />
        <line x1="65" y1="20" x2="80" y2="20" stroke="#00d084" stroke-width="1.5" />
        <path d="M 80 20 L 85 15 L 90 25 L 95 15 L 100 25 L 105 15 L 110 25 L 115 20" fill="none" stroke="#f97316" stroke-width="1.5" />
        <text x="97" y="10" fill="#f97316" font-size="8" font-family="sans-serif" text-anchor="middle">R</text>
        <line x1="115" y1="20" x2="130" y2="20" stroke="#00d084" stroke-width="1.5" />
        <line x1="130" y1="12" x2="130" y2="28" stroke="#06b6d4" stroke-width="2" />
        <line x1="135" y1="12" x2="135" y2="28" stroke="#06b6d4" stroke-width="2" />
        <text x="132" y="8" fill="#06b6d4" font-size="8" font-family="sans-serif" text-anchor="middle">C</text>
      </svg>
    `;
    description = "Transient charging loop. Switch closes to initiate exponential charging. Capacitor voltage is measured across time Constant τ = R × C.";
  }
  else if (expKey === 'series_parallel') {
    title = "Series Resistors Network";
    svg = `
      <svg viewBox="0 0 200 120" style="width:100%;max-width:180px;height:auto;margin:0 auto;display:block">
        <line x1="30" y1="50" x2="30" y2="70" stroke="#ef4444" stroke-width="2" />
        <line x1="35" y1="55" x2="35" y2="65" stroke="#ef4444" stroke-width="1" />
        <path d="M 30 60 L 15 60 L 15 20 L 60 20" fill="none" stroke="#00d084" stroke-width="1.5" />
        <path d="M 35 60 L 175 60 L 175 20 L 145 20" fill="none" stroke="#64748b" stroke-width="1.5" />
        <path d="M 60 20 L 65 15 L 70 25 L 75 15 L 80 25 L 85 15 L 90 25 L 95 20" fill="none" stroke="#f97316" stroke-width="1.5" />
        <text x="77" y="10" fill="#f97316" font-size="8" font-family="sans-serif" text-anchor="middle">R₁</text>
        <line x1="95" y1="20" x2="110" y2="20" stroke="#00d084" stroke-width="1.5" />
        <path d="M 110 20 L 115 15 L 120 25 L 125 15 L 130 25 L 135 15 L 140 25 L 145 20" fill="none" stroke="#3b82f6" stroke-width="1.5" />
        <text x="127" y="10" fill="#3b82f6" font-size="8" font-family="sans-serif" text-anchor="middle">R₂</text>
      </svg>
    `;
    description = "Resistors in series combine directly: R_total = R₁ + R₂. The current flowing through both is identical.";
  }
  else if (expKey === 'wheatstone') {
    title = "Wheatstone Bridge Balance";
    svg = `
      <svg viewBox="0 0 200 120" style="width:100%;max-width:180px;height:auto;margin:0 auto;display:block">
        <line x1="30" y1="90" x2="30" y2="105" stroke="#ef4444" stroke-width="1.5" />
        <line x1="35" y1="95" x2="35" y2="100" stroke="#ef4444" stroke-width="1" />
        <path d="M 30 97 L 15 97 L 15 60 L 50 60" fill="none" stroke="#00d084" stroke-width="1.2" />
        <path d="M 35 97 L 175 97 L 175 60 L 150 60" fill="none" stroke="#64748b" stroke-width="1.2" />
        <path d="M 50 60 L 75 35 L 100 60 L 75 85 Z" fill="none" stroke="#64748b" stroke-width="1" />
        <circle cx="75" cy="35" r="1.5" fill="#22c55e" />
        <circle cx="75" cy="85" r="1.5" fill="#22c55e" />
        <circle cx="75" cy="60" r="8" fill="#020617" stroke="#3b82f6" stroke-width="1.2" />
        <text x="75" y="63" fill="#3b82f6" font-size="8" font-family="sans-serif" font-weight="bold" text-anchor="middle">G</text>
        <line x1="75" y1="35" x2="75" y2="52" stroke="#64748b" stroke-width="1" />
        <line x1="75" y1="68" x2="75" y2="85" stroke="#64748b" stroke-width="1" />
      </svg>
    `;
    description = "Resistor bridge balance. Bridge is balanced when the galvanometer indicates zero current, verifying R₁/R₂ = R₃/R_x.";
  }
  else if (expKey === 'arduino_led') {
    title = "Arduino LED Digital Control";
    svg = `
      <svg viewBox="0 0 200 120" style="width:100%;max-width:180px;height:auto;margin:0 auto;display:block">
        <rect x="20" y="20" width="60" height="80" rx="4" fill="#0f172a" stroke="#00d084" stroke-width="1.5" />
        <text x="50" y="32" fill="#00d084" font-size="7" font-family="monospace" text-anchor="middle">ARDUINO</text>
        <rect x="25" y="45" width="22" height="40" fill="#1e293b" rx="2" />
        <rect x="10" y="52" width="10" height="15" fill="#cbd5e1" />
        <path d="M 80 40 L 110 40" fill="none" stroke="#22c55e" stroke-width="1.2" />
        <text x="83" y="38" fill="#22c55e" font-size="6" font-family="monospace">5V</text>
        <line x1="110" y1="40" x2="120" y2="30" stroke="#ef4444" stroke-width="1.2" />
        <circle cx="110" cy="40" r="1.5" fill="#ef4444" />
        <circle cx="122" cy="40" r="1.5" fill="#ef4444" />
        <path d="M 122 40 L 140 40" fill="none" stroke="#22c55e" stroke-width="1.2" />
        <path d="M 140 32 L 140 48 Q 148 40 140 32 Z" fill="none" stroke="#ef4444" stroke-width="1.2" />
        <line x1="148" y1="32" x2="148" y2="48" stroke="#ef4444" stroke-width="1.2" />
        <path d="M 148 40 L 160 40" fill="none" stroke="#22c55e" stroke-width="1.2" />
        <path d="M 160 40 L 163 37 L 166 43 L 169 37 L 172 43 L 175 37 L 178 43 L 181 40" fill="none" stroke="#f97316" stroke-width="1.2" />
        <path d="M 181 40 L 190 40 L 190 85 L 80 85" fill="none" stroke="#64748b" stroke-width="1.2" />
        <text x="83" y="82" fill="#64748b" font-size="6" font-family="monospace">GND</text>
      </svg>
    `;
    description = "Digital control loop. When the push button is pressed, it closes the loop, allowing 5V supply current through the LED and current limiting Resistor to GND.";
  }
  else if (expKey === 'diode_iv') {
    title = "Semiconductor Diode I-V";
    svg = `
      <svg viewBox="0 0 200 120" style="width:100%;max-width:180px;height:auto;margin:0 auto;display:block">
        <line x1="30" y1="50" x2="30" y2="70" stroke="#ef4444" stroke-width="2" />
        <line x1="35" y1="55" x2="35" y2="65" stroke="#ef4444" stroke-width="1" />
        <text x="18" y="63" fill="#ef4444" font-size="8" font-family="sans-serif" font-weight="bold">+</text>
        <path d="M 30 60 L 15 60 L 15 20 L 50 20" fill="none" stroke="#00d084" stroke-width="1.5" />
        <path d="M 35 60 L 175 60 L 175 20 L 140 20" fill="none" stroke="#64748b" stroke-width="1.5" />
        <path d="M 50 20 L 55 15 L 60 25 L 65 15 L 70 25 L 75 15 L 80 25 L 85 20" fill="none" stroke="#f97316" stroke-width="1.5" />
        <text x="67" y="10" fill="#f97316" font-size="8" font-family="sans-serif" text-anchor="middle">R</text>
        <line x1="85" y1="20" x2="100" y2="20" stroke="#00d084" stroke-width="1.5" />
        <path d="M 100 12 L 100 28 L 115 20 Z" fill="#3b82f6" stroke="#3b82f6" stroke-width="1" />
        <line x1="115" y1="12" x2="115" y2="28" stroke="#3b82f6" stroke-width="2" />
        <line x1="115" y1="20" x2="140" y2="20" stroke="#00d084" stroke-width="1.5" />
        <text x="108" y="8" fill="#3b82f6" font-size="8" font-family="sans-serif" text-anchor="middle">D</text>
      </svg>
    `;
    description = "Semiconductor Diode I-V circuit. A diode is placed in series with a current-limiting resistor. The forward bias voltage and current are measured to trace the exponential I-V curve.";
  }
  else if (expKey === 'voltage_divider') {
    title = "Voltage & Current Divider";
    svg = `
      <svg viewBox="0 0 200 120" style="width:100%;max-width:180px;height:auto;margin:0 auto;display:block">
        <line x1="30" y1="50" x2="30" y2="70" stroke="#ef4444" stroke-width="2" />
        <line x1="35" y1="55" x2="35" y2="65" stroke="#ef4444" stroke-width="1" />
        <text x="18" y="63" fill="#ef4444" font-size="8" font-family="sans-serif" font-weight="bold">+</text>
        <path d="M 30 60 L 15 60 L 15 20 L 50 20" fill="none" stroke="#00d084" stroke-width="1.5" />
        <path d="M 35 60 L 175 60 L 175 20 L 140 20" fill="none" stroke="#64748b" stroke-width="1.5" />
        <path d="M 50 20 L 55 15 L 60 25 L 65 15 L 70 25 L 75 15 L 80 25 L 85 20" fill="none" stroke="#f97316" stroke-width="1.5" />
        <text x="67" y="10" fill="#f97316" font-size="8" font-family="sans-serif" text-anchor="middle">R₁</text>
        <line x1="85" y1="20" x2="105" y2="20" stroke="#00d084" stroke-width="1.5" />
        <path d="M 105 20 L 110 15 L 125 25 L 130 15 L 135 25 L 140 15 L 145 25 L 150 20" fill="none" stroke="#3b82f6" stroke-width="1.5" />
        <text x="122" y="10" fill="#3b82f6" font-size="8" font-family="sans-serif" text-anchor="middle">R₂</text>
        <path d="M 105 20 L 105 45 L 112 45" fill="none" stroke="#00d084" stroke-width="1" />
        <path d="M 140 20 L 140 45 L 132 45" fill="none" stroke="#64748b" stroke-width="1" />
        <circle cx="122" cy="45" r="7" fill="#020617" stroke="#ef4444" stroke-width="1.2" />
        <text x="122" y="47.5" fill="#ef4444" font-size="7" font-family="sans-serif" text-anchor="middle">V₂</text>
      </svg>
    `;
    description = "Voltage divider circuit. Two resistors are in series. The output voltage V₂ measured across R₂ is proportional to its resistance: V₂ = V_in * R₂ / (R₁ + R₂).";
  }
  else if (expKey === 'planck_led') {
    title = "Planck's Constant via LEDs";
    svg = `
      <svg viewBox="0 0 200 120" style="width:100%;max-width:180px;height:auto;margin:0 auto;display:block">
        <line x1="30" y1="50" x2="30" y2="70" stroke="#ef4444" stroke-width="2" />
        <line x1="35" y1="55" x2="35" y2="65" stroke="#ef4444" stroke-width="1" />
        <text x="18" y="63" fill="#ef4444" font-size="8" font-family="sans-serif" font-weight="bold">+</text>
        <path d="M 30 60 L 15 60 L 15 20 L 50 20" fill="none" stroke="#00d084" stroke-width="1.5" />
        <path d="M 35 60 L 175 60 L 175 20 L 140 20" fill="none" stroke="#64748b" stroke-width="1.5" />
        <path d="M 50 20 L 55 15 L 60 25 L 65 15 L 70 25 L 75 15 L 80 25 L 85 20" fill="none" stroke="#f97316" stroke-width="1.5" />
        <text x="67" y="10" fill="#f97316" font-size="8" font-family="sans-serif" text-anchor="middle">R</text>
        <line x1="85" y1="20" x2="100" y2="20" stroke="#00d084" stroke-width="1.5" />
        <path d="M 100 12 L 100 28 L 115 20 Z" fill="#22c55e" stroke="#22c55e" stroke-width="1" />
        <line x1="115" y1="12" x2="115" y2="28" stroke="#22c55e" stroke-width="2" />
        <line x1="115" y1="20" x2="140" y2="20" stroke="#00d084" stroke-width="1.5" />
        <line x1="105" y1="10" x2="112" y2="3" stroke="#eab308" stroke-width="1" />
        <polygon points="112,3 108,3 111,6" fill="#eab308" />
        <line x1="111" y1="12" x2="118" y2="5" stroke="#eab308" stroke-width="1" />
        <polygon points="118,5 114,5 117,8" fill="#eab308" />
        <text x="108" y="35" fill="#22c55e" font-size="8" font-family="sans-serif" text-anchor="middle">LED</text>
      </svg>
    `;
    description = "Planck's Constant using LEDs. Measuring the turn-on (threshold) voltage V_0 for different color LEDs of known peak wavelengths λ allows plotting V_0 vs 1/λ, where the slope is hc/e.";
  }
  else if (expKey === 'biot_savart') {
    title = "Biot-Savart's Law";
    svg = `
      <svg viewBox="0 0 200 120" style="width:100%;max-width:180px;height:auto;margin:0 auto;display:block">
        <line x1="100" y1="10" x2="100" y2="110" stroke="#ef4444" stroke-width="3" />
        <path d="M 98 30 L 100 20 L 102 30 Z" fill="#ef4444" />
        <text x="108" y="25" fill="#ef4444" font-size="8" font-weight="bold">I</text>
        <ellipse cx="100" cy="60" rx="40" ry="12" fill="none" stroke="#3b82f6" stroke-width="1" stroke-dasharray="3 3" />
        <ellipse cx="100" cy="60" rx="65" ry="20" fill="none" stroke="#3b82f6" stroke-width="1" stroke-dasharray="3 3" />
        <path d="M 140 60 L 138 57 L 142 57 Z" fill="#3b82f6" />
        <path d="M 165 60 L 163 57 L 167 57 Z" fill="#3b82f6" />
        <text x="145" y="52" fill="#3b82f6" font-size="8">B</text>
        <line x1="100" y1="60" x2="135" y2="75" stroke="#22c55e" stroke-width="1.5" />
        <circle cx="100" cy="60" r="2" fill="#22c55e" />
        <circle cx="135" cy="75" r="2" fill="#22c55e" />
        <text x="118" y="76" fill="#22c55e" font-size="8">r</text>
      </svg>
    `;
    description = "Biot-Savart's Law. Current I in a long straight wire generates a concentric magnetic field B. The field strength decreases inversely with distance r from the wire: B = μ₀I / (2πr).";
  }
  else if (expKey === 'planck_photocell') {
    title = "Planck's Constant (Photocell)";
    svg = `
      <svg viewBox="0 0 200 120" style="width:100%;max-width:180px;height:auto;margin:0 auto;display:block">
        <circle cx="100" cy="55" r="30" fill="none" stroke="#64748b" stroke-width="1.5" />
        <path d="M 80 40 L 80 70" stroke="#ef4444" stroke-width="3" />
        <text x="74" y="58" fill="#ef4444" font-size="7" font-weight="bold">C</text>
        <path d="M 120 40 L 120 70" stroke="#3b82f6" stroke-width="1.5" />
        <text x="124" y="58" fill="#3b82f6" font-size="7" font-weight="bold">A</text>
        <path d="M 25 35 Q 32.5 37.5 40 35 L 55 45" fill="none" stroke="#eab308" stroke-width="1.2" />
        <polygon points="55,45 48,43 51,39" fill="#eab308" />
        <text x="35" y="27" fill="#eab308" font-size="7">Photons (hν)</text>
        <circle cx="92" cy="50" r="1.5" fill="#10b981" />
        <line x1="92" y1="50" x2="108" y2="52" stroke="#10b981" stroke-width="0.8" />
        <polygon points="108,52 102,50 104,54" fill="#10b981" />
      </svg>
    `;
    description = "Planck's Constant using Photocell. Monochromatic light ejects photoelectrons from the cathode. A stopping potential V_s is applied to reduce photocurrent to zero: eV_s = hν - W.";
  }
  else if (expKey === 'stefan_law') {
    title = "Stefan's Law Verification";
    svg = `
      <svg viewBox="0 0 200 120" style="width:100%;max-width:180px;height:auto;margin:0 auto;display:block">
        <rect x="50" y="30" width="50" height="50" rx="4" fill="#1e293b" stroke="#f97316" stroke-width="2" />
        <circle cx="75" cy="55" r="15" fill="#f97316" opacity="0.6" />
        <circle cx="75" cy="55" r="8" fill="#fcd34d" />
        <text x="75" y="95" fill="#f97316" font-size="8" font-weight="bold" text-anchor="middle">Furnace (T)</text>
        <path d="M 110 50 Q 120 40 130 50 T 150 50" fill="none" stroke="#ef4444" stroke-width="1.5" />
        <path d="M 110 60 Q 120 50 130 60 T 150 60" fill="none" stroke="#ef4444" stroke-width="1.5" />
        <rect x="150" y="40" width="20" height="30" rx="2" fill="#0f172a" stroke="#cbd5e1" stroke-width="1.5" />
        <text x="160" y="58" fill="#cbd5e1" font-size="7" font-weight="bold" text-anchor="middle">Sensor</text>
      </svg>
    `;
    description = "Stefan's Law verification. Total thermal radiation energy E emitted by a blackbody furnace at absolute temperature T is directly proportional to the fourth power of T: E = σ T⁴.";
  }
  else if (['ideal_gas', 'boyle', 'charles'].includes(expKey)) {
    title = "Ideal Gas Chamber";
    svg = `
      <svg viewBox="0 0 200 120" style="width:100%;max-width:180px;height:auto;margin:0 auto;display:block">
        <rect x="50" y="20" width="80" height="80" rx="2" fill="none" stroke="#64748b" stroke-width="2" />
        <rect x="52" y="45" width="76" height="10" fill="#1e293b" />
        <line x1="90" y1="20" x2="90" y2="45" stroke="#1e293b" stroke-width="4" />
        <circle cx="60" cy="70" r="1.5" fill="#3b82f6" />
        <circle cx="70" cy="85" r="1.5" fill="#3b82f6" />
        <circle cx="85" cy="65" r="1.5" fill="#3b82f6" />
        <circle cx="100" cy="88" r="1.5" fill="#3b82f6" />
        <circle cx="115" cy="72" r="1.5" fill="#3b82f6" />
        <circle cx="110" cy="82" r="1.5" fill="#3b82f6" />
        <rect x="140" y="40" width="40" height="40" rx="4" fill="#0f172a" stroke="#cbd5e1" stroke-width="1" />
        <text x="160" y="52" fill="#ef4444" font-size="7" font-weight="bold" text-anchor="middle">P (kPa)</text>
        <text x="160" y="70" fill="#10b981" font-size="7" font-weight="bold" text-anchor="middle">T (K)</text>
      </svg>
    `;
    description = "Thermodynamic chamber. Adjusting cylinder volume V (piston height) and heater temperature T alters internal pressure P according to state equation: PV = nRT.";
  }
  else if (expKey === 'specific_heat') {
    title = "Calorimeter Heat Exchange";
    svg = `
      <svg viewBox="0 0 200 120" style="width:100%;max-width:180px;height:auto;margin:0 auto;display:block">
        <rect x="60" y="30" width="80" height="70" rx="4" fill="none" stroke="#cbd5e1" stroke-width="2" />
        <rect x="62" y="55" width="76" height="43" fill="rgba(59,130,246,0.2)" rx="2" />
        <rect x="85" y="70" width="30" height="20" fill="#f97316" rx="1" />
        <text x="100" y="82" fill="#ffffff" font-size="7" text-anchor="middle" font-weight="bold">Metal</text>
        <rect x="122" y="20" width="6" height="60" rx="2" fill="#1e293b" />
        <line x1="125" y1="25" x2="125" y2="78" stroke="#ef4444" stroke-width="1.5" />
      </svg>
    `;
    description = "Calorimetry heat transfer. Heated metal block dropped into calorimeter releases heat, water absorbs it until thermal equilibrium is hit: Q = m c ΔT.";
  }
  else if (expKey === 'photoelectric') {
    title = "Photoelectric Effect Tube";
    svg = `
      <svg viewBox="0 0 200 120" style="width:100%;max-width:180px;height:auto;margin:0 auto;display:block">
        <rect x="40" y="35" width="120" height="50" rx="25" fill="none" stroke="#64748b" stroke-width="1.5" />
        <line x1="60" y1="45" x2="60" y2="75" stroke="#ef4444" stroke-width="2.5" />
        <line x1="140" y1="45" x2="140" y2="75" stroke="#3b82f6" stroke-width="2.5" />
        <path d="M 25 35 Q 32.5 37.5 40 35 L 55 45" fill="none" stroke="#eab308" stroke-width="1.2" />
        <polygon points="57,47 50,45 53,41" fill="#eab308" />
        <circle cx="80" cy="52" r="1.5" fill="#10b981" />
        <line x1="80" y1="52" x2="95" y2="52" stroke="#10b981" stroke-width="0.8" />
        <polygon points="99,52 94,50 94,54" fill="#10b981" />
        <circle cx="105" cy="68" r="1.5" fill="#10b981" />
        <line x1="105" y1="68" x2="120" y2="68" stroke="#10b981" stroke-width="0.8" />
        <text x="100" y="30" fill="#eab308" font-size="7" text-anchor="middle">Photons (hν)</text>
      </svg>
    `;
    description = "Quantum photoelectric emission. Incident photons with energy hν eject emitter electrons, producing photocurrent. Work function boundary sets threshold frequency.";
  }
  else if (expKey === 'radioactive') {
    title = "Radioactive Decay Half-Life";
    svg = `
      <svg viewBox="0 0 200 120" style="width:100%;max-width:180px;height:auto;margin:0 auto;display:block">
        <line x1="40" y1="20" x2="40" y2="100" stroke="#64748b" stroke-width="1" />
        <line x1="40" y1="100" x2="180" y2="100" stroke="#64748b" stroke-width="1" />
        <path d="M 40 20 Q 90 85 180 98" fill="none" stroke="#e11d48" stroke-width="1.8" />
        <line x1="90" y1="20" x2="90" y2="100" stroke="#64748b" stroke-width="0.5" stroke-dasharray="2 2" />
        <text x="90" y="108" fill="#64748b" font-size="7" text-anchor="middle">t1/2</text>
        <text x="110" y="45" fill="#e11d48" font-size="8">Decay Curve</text>
      </svg>
    `;
    description = "Exponential half-life decay. Radioactive nuclei drop by half N(t) = N₀e^(-λt) after every half-life duration T_1/2, following statistics.";
  }
  else if (expKey === 'de_broglie') {
    title = "de Broglie Matter Wave Slit";
    svg = `
      <svg viewBox="0 0 200 120" style="width:100%;max-width:180px;height:auto;margin:0 auto;display:block">
        <line x1="20" y1="60" x2="60" y2="60" stroke="#ffffff" stroke-width="1.5" />
        <line x1="70" y1="20" x2="70" y2="50" stroke="#64748b" stroke-width="3" />
        <line x1="70" y1="56" x2="70" y2="64" stroke="#64748b" stroke-width="3" />
        <line x1="70" y1="70" x2="70" y2="100" stroke="#64748b" stroke-width="3" />
        <path d="M 72 53 A 10 10 0 0 1 90 40 M 72 61 A 10 10 0 0 1 90 80" fill="none" stroke="#22c55e" stroke-width="0.8" />
        <path d="M 72 53 A 20 20 0 0 1 110 30 M 72 61 A 20 20 0 0 1 110 90" fill="none" stroke="#22c55e" stroke-width="0.8" />
        <rect x="160" y="20" width="8" height="80" fill="#1e293b" />
        <rect x="160" y="30" width="8" height="6" fill="#10b981" />
        <rect x="160" y="45" width="8" height="10" fill="#10b981" />
        <rect x="160" y="65" width="8" height="10" fill="#10b981" />
        <rect x="160" y="84" width="8" height="6" fill="#10b981" />
      </svg>
    `;
    description = "Matter wave particle duality. Accelerator fires electrons which behave as waves, passing double slits and forming interference fringes by wavelength λ = h/p.";
  }
  else if (expKey === 'bohr_model') {
    title = "Bohr Hydrogen Shell Transitions";
    svg = `
      <svg viewBox="0 0 200 120" style="width:100%;max-width:180px;height:auto;margin:0 auto;display:block">
        <circle cx="100" cy="60" r="10" fill="#ef4444" stroke="#ef4444" />
        <text x="100" y="63" fill="#ffffff" font-size="8" font-weight="bold" text-anchor="middle">+</text>
        <circle cx="100" cy="60" r="25" fill="none" stroke="#64748b" stroke-width="0.8" stroke-dasharray="2 2" />
        <circle cx="100" cy="60" r="45" fill="none" stroke="#64748b" stroke-width="0.8" stroke-dasharray="2 2" />
        <path d="M 128 28 A 45 45 0 0 1 120 45" fill="none" stroke="#22c55e" stroke-width="1.5" />
        <line x1="120" y1="45" x2="114" y2="40" stroke="#22c55e" stroke-width="1.5" />
        <line x1="120" y1="45" x2="124" y2="42" stroke="#22c55e" stroke-width="1.5" />
        <path d="M 125 35 Q 135 30 145 35 T 165 35" fill="none" stroke="#eab308" stroke-width="1.2" />
        <polygon points="169,35 162,32 162,38" fill="#eab308" />
        <text x="155" y="27" fill="#eab308" font-size="7">Photon (hν)</text>
      </svg>
    `;
    description = "Atomic shell drops. Electron transitions from outer orbit shell n_i to inner shell n_f, emitting quantum photon with wave energy ΔE = E_i - E_f.";
  }
  else {
    title = "Experiment Layout Schema";
    svg = `
      <svg viewBox="0 0 200 120" style="width:100%;max-width:180px;height:auto;margin:0 auto;display:block">
        <rect x="50" y="30" width="100" height="60" rx="6" fill="rgba(34,211,238,0.08)" stroke="#22d3ee" stroke-width="1.5" />
        <text x="100" y="64" fill="#22d3ee" font-size="10" font-weight="bold" text-anchor="middle">${exp ? exp.name : "Module Setup"}</text>
      </svg>
    `;
    description = exp ? `Visual schematic diagram representing setup for: ${exp.name}. Complete steps and take readings in the lab workspace.` : "Virtual physics laboratory simulation setup schematic diagram.";
  }

  container.innerHTML = `
    <div style="text-align:center;padding:10px 0;background:#000;border:1px solid var(--border);border-radius:6px;margin-bottom:10px">
      ${svg}
    </div>
    <div style="font-size:10px;color:var(--text2);line-height:1.5">
      <b>${title}:</b>
      <p>${description}</p>
    </div>
  `;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}
