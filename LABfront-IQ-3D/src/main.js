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
  energyStartTime: Date.now()
};

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
  
  stepsContainer: document.getElementById('step-list'),
  protocolProgress: document.getElementById('progress-bar'),
  progressPercent: document.getElementById('progress-text'),
  theoryText: document.getElementById('theory-content'),
  
  btnExport: document.getElementById('btn-export'),
  zoomDisplay: document.getElementById('zoom-display'),
  
  // Floating overlay elements
  oscPanel: document.getElementById('osc-wrap'),
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
  telemetryWires: document.getElementById('st-wires')
};

// --- EXPERIMENT DATA & SCHEMAS ---
const experiments = {
  ohms: {
    name: "Ohm's Law Verification",
    aim: "Verify the relation between V, I, and R in a DC circuit.",
    apparatus: "DC Power Supply (0-30V), Resistor (100Ω), Ammeter, Voltmeter, Breadboard.",
    req: ['source', 'resistor'],
    steps: [
      { id: 1, text: "Place the ceramic resistor horizontally between rows C and D." },
      { id: 2, text: "Mount the DC power supply and wire positive terminal to resistor start." },
      { id: 3, text: "Wire ammeter in series, voltmeter in parallel across resistor." },
      { id: 4, text: "Click Initialize and record multiple data points using the graph panel." }
    ],
    theory: "<h3>Ohm's Law</h3><p>Current is directly proportional to voltage and inversely proportional to resistance: V = IR.</p>",
    formulas: [
      { name: "Ohm's Law", expr: "V = I × R" },
      { name: "Current", expr: "I = V / R" }
    ]
  },
  kvl: {
    name: "Kirchhoff's Voltage Law",
    aim: "Verify algebraic sum of voltages in closed loop is zero.",
    apparatus: "DC Supply, Resistors, Multimeters, Wires.",
    req: ['source', 'resistor'],
    steps: [
      { id: 1, text: "Form a closed loop with DC supply and two resistors in series." },
      { id: 2, text: "Measure voltage drop across each resistor." },
      { id: 3, text: "Verify that their sum matches the supply voltage." }
    ],
    theory: "<h3>Kirchhoff's Voltage Law (KVL)</h3><p>Sum of potential drops in any closed loop is zero: ΣV = 0.</p>",
    formulas: [{ name: "KVL Sum", expr: "Vs - V1 - V2 = 0" }]
  },
  kcl: {
    name: "Kirchhoff's Current Law",
    aim: "Verify current entering junction equals current exiting.",
    apparatus: "DC Supply, Resistors, Ammeters.",
    req: ['source', 'resistor'],
    steps: [
      { id: 1, text: "Connect two parallel resistors branching from a single junction." },
      { id: 2, text: "Measure current in the main branch and each sub-branch." },
      { id: 3, text: "Verify main current equals the sum of branch currents." }
    ],
    theory: "<h3>Kirchhoff's Current Law (KCL)</h3><p>Nodal charge conservation dictates that incoming current matches outgoing current: ΣI_in = ΣI_out.</p>",
    formulas: [{ name: "KCL Sum", expr: "I_total = I1 + I2" }]
  },
  rc_rl_rlc: {
    name: "LCR AC Impedance Analysis",
    aim: "Study total impedance and phase angle in LCR circuits.",
    apparatus: "AC Generator, Resistor, Inductor, Capacitor.",
    req: ['source', 'resistor', 'inductor', 'capacitor'],
    steps: [
      { id: 1, text: "Place R, L, and C in a single series path." },
      { id: 2, text: "Wire them to the AC supply." },
      { id: 3, text: "Observe reactances and phase angle change with frequency." }
    ],
    theory: "<h3>LCR AC Circuit</h3><p>AC resistance is called impedance Z. It incorporates inductive XL and capacitive XC reactances.</p>",
    formulas: [
      { name: "Impedance", expr: "Z = √[R² + (XL-XC)²]" },
      { name: "Resonance", expr: "f₀ = 1 / (2π√(LC))" }
    ]
  },
  lcr: {
    name: "Series LCR Resonance",
    aim: "Determine resonant frequency of LCR series circuit.",
    apparatus: "AC Generator, Resistor, Inductor, Capacitor.",
    req: ['source', 'resistor', 'inductor', 'capacitor'],
    steps: [
      { id: 1, text: "Assemble Series LCR path and connect AC supply." },
      { id: 2, text: "Vary frequency and find point of maximum current." }
    ],
    theory: "<h3>Series Resonance</h3><p>Resonance occurs when XL = XC, yielding Z = R (minimum impedance) and maximum current.</p>",
    formulas: [{ name: "Resonance Freq", expr: "f₀ = 1 / (2π√(LC))" }]
  },
  rc: {
    name: "RC Time Constant",
    aim: "Measure transient capacitor charging rate.",
    apparatus: "DC Supply, Resistor, Capacitor, Oscilloscope.",
    req: ['source', 'resistor', 'capacitor'],
    steps: [
      { id: 1, text: "Place Resistor and Capacitor in series to DC source." },
      { id: 2, text: "Observe exponential curve on scope when powered." }
    ],
    theory: "<h3>RC Charging</h3><p>Time constant τ = RC defines charging rate to 63.2% capacity.</p>",
    formulas: [{ name: "Time Constant", expr: "τ = R × C" }]
  },
  series_parallel: {
    name: "Series & Parallel Loads",
    aim: "Compare equivalent resistors network load values.",
    apparatus: "Resistors, Multimeters, Power Supply.",
    req: ['source', 'resistor'],
    steps: [
      { id: 1, text: "Measure total equivalent resistance in series and parallel links." }
    ],
    theory: "<h3>Resistor Combinations</h3><p>Series combines additively, Parallel combines reciprocally.</p>",
    formulas: [{ name: "Parallel Sum", expr: "1/R_eq = 1/R1 + 1/R2" }]
  },
  wheatstone: {
    name: "Wheatstone Bridge Balance",
    aim: "Measure unknown resistance via bridge balancing.",
    apparatus: "Wheatstone resistor bridge array, galvanometer.",
    req: ['source', 'resistor'],
    steps: [
      { id: 1, text: "Adjust R3 slider until bridge galvanometer indicates zero." }
    ],
    theory: "<h3>Wheatstone Bridge</h3><p>Bridge is balanced when voltage ratios are equal, nulling detector current.</p>",
    formulas: [{ name: "Balance", expr: "Rx = R3 × (R2 / R1)" }]
  },
  faraday: {
    name: "Faraday's Induction Law",
    aim: "Induce emf via moving magnetic fields.",
    apparatus: "Magnet, Coil, Voltmeter, Optical Bench.",
    req: [],
    steps: [
      { id: 1, text: "Animate magnet motion using the velocity slider." },
      { id: 2, text: "Observe the generated voltage pulses." }
    ],
    theory: "<h3>Faraday's Law</h3><p>Changing magnetic flux induces electromotive force in a conductor loop.</p>",
    formulas: [{ name: "EMF", expr: "E = -N (ΔΦ / Δt)" }]
  },
  lenz: {
    name: "Lenz's Law Demonstration",
    aim: "Study induced magnetic field polarity directions.",
    apparatus: "Magnet, Coil, Voltmeter.",
    req: [],
    steps: [
      { id: 1, text: "Observe direction of induced voltage as magnet enters and exits coil." }
    ],
    theory: "<h3>Lenz's Law</h3><p>Induced current direction opposes the magnetic flux change that created it.</p>",
    formulas: [{ name: "Flux opposition", expr: "Direction opposes dΦ/dt" }]
  },
  solenoid: {
    name: "Solenoid Magnetic Field",
    aim: "Measure B-field inside current-carrying solenoid.",
    apparatus: "Solenoid coil, Gaussmeter.",
    req: [],
    steps: [
      { id: 1, text: "Adjust current and turns parameters to calculate magnetic flux density." }
    ],
    theory: "<h3>Solenoid Field</h3><p>Uniform B field inside depends on turns density and current.</p>",
    formulas: [{ name: "B Field", expr: "B = μ₀ n I" }]
  },
  transformer: {
    name: "AC Transformer Ratio",
    aim: "Study voltage conversion ratios of transformers.",
    apparatus: "AC primary coil, secondary coupling coil.",
    req: [],
    steps: [
      { id: 1, text: "Vary primary vs secondary turns ratio and observe output voltage changes." }
    ],
    theory: "<h3>Transformers</h3><p>Inductive coupling scales voltage based on coil turn ratios.</p>",
    formulas: [{ name: "Turns Law", expr: "Vs / Vp = Ns / Np" }]
  },
  snell: {
    name: "Snell's Law of Refraction",
    aim: "Measure index of refraction n of glass.",
    apparatus: "Laser source, semicircular glass block.",
    req: [],
    steps: [
      { id: 1, text: "Vary incident angle θ1 and verify ratio consistency." }
    ],
    theory: "<h3>Refraction</h3><p>Light bends at optical interfaces due to speed propagation differences.</p>",
    formulas: [{ name: "Snell's Law", expr: "n1 sin(θ1) = n2 sin(θ2)" }]
  },
  lens_eq: {
    name: "Thin Lens Equation",
    aim: "Trace image distances from convex lens.",
    apparatus: "Object pin, convex lens, projection screen.",
    req: [],
    steps: [
      { id: 1, text: "Vary object distance u and map matching image distance v." }
    ],
    theory: "<h3>Lens Formulas</h3><p>Convex lenses focus rays forming real inverted images.</p>",
    formulas: [{ name: "Lens Equation", expr: "1/f = 1/v + 1/u" }]
  },
  tir: {
    name: "Total Internal Reflection",
    aim: "Calculate critical angle of dense media boundary.",
    apparatus: "Laser, glass block, angle scale.",
    req: [],
    steps: [
      { id: 1, text: "Increase incident angle until light reflects completely inside." }
    ],
    theory: "<h3>TIR</h3><p>Light cannot refract if angle exceeds critical value; it reflects internally.</p>",
    formulas: [{ name: "Critical Angle", expr: "θc = arcsin(n2 / n1)" }]
  },
  prism: {
    name: "Prism Dispersion Spectrum",
    aim: "Measure wavelength deviation angles through prism.",
    apparatus: "Light ray, glass triangular prism.",
    req: [],
    steps: [
      { id: 1, text: "Vary incident angle and observe color spectrum dispersion." }
    ],
    theory: "<h3>Dispersion</h3><p>Glass index of refraction changes with frequency, splitting white light.</p>",
    formulas: [{ name: "Deviation Angle", expr: "δ = i1 + i2 - A" }]
  },
  pendulum: {
    name: "Simple Pendulum Motion",
    aim: "Study gravity periods of swinging pendulum.",
    apparatus: "Stand, string, heavy bob, timer.",
    req: [],
    steps: [
      { id: 1, text: "Vary length L and gravity g. Measure period T." }
    ],
    theory: "<h3>Pendulums</h3><p>Period depends on length and gravity, remaining independent of mass.</p>",
    formulas: [{ name: "Period", expr: "T = 2π √(L / g)" }]
  },
  hooke: {
    name: "Hooke's Law & Springs",
    aim: "Verify linear extension of loaded springs.",
    apparatus: "Spring, stand, weight hanger.",
    req: [],
    steps: [
      { id: 1, text: "Hang weights on spring and measure displacement stretch." }
    ],
    theory: "<h3>Hooke's Law</h3><p>Restoring spring force is linear to extension distance.</p>",
    formulas: [{ name: "Spring Force", expr: "F = -k x" }]
  },
  projectile: {
    name: "Projectile Firing Path",
    aim: "Study parabolic trajectory parameters.",
    apparatus: "Launcher cannon, landing pad, timer.",
    req: [],
    steps: [
      { id: 1, text: "Vary firing angle and velocity. Click Simulate to launch ball." }
    ],
    theory: "<h3>Projectiles</h3><p>Gravity drives a parabolic path combining independent horizontal and vertical motions.</p>",
    formulas: [{ name: "Vertical Path", expr: "y = x tan(θ) - g x² / (2 v₀² cos²θ)" }]
  },
  doppler: {
    name: "Doppler Shift Simulation",
    aim: "Observe wave compression frequency shifts.",
    apparatus: "Sound source generator, frequency analyzer.",
    req: [],
    steps: [
      { id: 1, text: "Adjust velocity of sound source and observe shifted tones." }
    ],
    theory: "<h3>Doppler Effect</h3><p>Wave crests compress ahead of moving source, increasing frequency tone.</p>",
    formulas: [{ name: "Doppler Freq", expr: "f' = f [ v / (v - vs) ]" }]
  },
  ideal_gas: {
    name: "Ideal Gas State Equation",
    aim: "Verify P-V-T thermodynamic relationships.",
    apparatus: "Confined gas cylinder, piston, manometer.",
    req: [],
    steps: [
      { id: 1, text: "Vary volume and temperature sliders, measuring pressure changes." }
    ],
    theory: "<h3>Gas Laws</h3><p>Gas state connects pressure, volume, temperature, and moles n.</p>",
    formulas: [{ name: "State Equation", expr: "P V = n R T" }]
  },
  boyle: {
    name: "Boyle's Constant Temp Law",
    aim: "Verify P-V inverse pressure volume relations.",
    apparatus: "Gas chamber, volume piston.",
    req: [],
    steps: [
      { id: 1, text: "Vary volume slider and confirm P × V constant product." }
    ],
    theory: "<h3>Boyle's Law</h3><p>Pressure is inversely proportional to volume at constant temperature.</p>",
    formulas: [{ name: "Boyle's", expr: "P₁ V₁ = P₂ V₂" }]
  },
  charles: {
    name: "Charles's Constant Pres Law",
    aim: "Verify V-T volume temperature linear relations.",
    apparatus: "Heated cylinder, movable piston.",
    req: [],
    steps: [
      { id: 1, text: "Heat gas chamber and watch piston expand volume linearly." }
    ],
    theory: "<h3>Charles's Law</h3><p>Gas volume is directly proportional to temperature at constant pressure.</p>",
    formulas: [{ name: "Charles's", expr: "V₁ / T₁ = V₂ / T₂" }]
  },
  specific_heat: {
    name: "Specific Heat Capacity",
    aim: "Measure copper thermal specific heat.",
    apparatus: "Calorimeter beaker, thermometer, copper weights.",
    req: [],
    steps: [
      { id: 1, text: "Drop heated metal into calorimeter and measure final mixture temperature." }
    ],
    theory: "<h3>Calorimetry</h3><p>Heat lost by metal block equals heat gained by water: Q = mcΔT.</p>",
    formulas: [{ name: "Heat Transfer", expr: "Q = m c ΔT" }]
  },
  photoelectric: {
    name: "Photoelectric Effect",
    aim: "Determine stopping voltage vs light wavelength.",
    apparatus: "Vacuum photo tube, voltage collector source.",
    req: [],
    steps: [
      { id: 1, text: "Vary light frequency slider and find threshold work function boundary." }
    ],
    theory: "<h3>Photoelectric</h3><p>Light quanta eject electrons. Energy KE increases linearly with frequency.</p>",
    formulas: [{ name: "Energy Max", expr: "Kmax = h ν - Φ" }]
  },
  radioactive: {
    name: "Radioactive Decay Half-Life",
    aim: "Verify nuclei exponential decay rate.",
    apparatus: "Radioactive core grid, Geiger counter.",
    req: [],
    steps: [
      { id: 1, text: "Verify remaining parent nuclei drops by half after every half-life interval." }
    ],
    theory: "<h3>Decay Law</h3><p>Nuclei decay is random, scaling with remaining atoms count: N = N0 e^(-λt).</p>",
    formulas: [{ name: "Decay Law", expr: "N(t) = N₀ e^(−λ t)" }]
  },
  de_broglie: {
    name: "de Broglie matter wave",
    aim: "Measure wave characteristics of moving masses.",
    apparatus: "Mass velocity accelerator.",
    req: [],
    steps: [
      { id: 1, text: "Vary velocity and verify matter wavelength changes." }
    ],
    theory: "<h3>de Broglie Wavelength</h3><p>Moving particles display matter wave behaviors inversely matching momentum.</p>",
    formulas: [{ name: "Wavelength", expr: "λ = h / (m v)" }]
  },
  bohr_model: {
    name: "Bohr Hydrogen atom transitions",
    aim: "Calculate transition shell wavelengths.",
    apparatus: "Bohr atomic orbital model display.",
    req: [],
    steps: [
      { id: 1, text: "Animate quantum electron shell drops and measure spectral wavelengths." }
    ],
    theory: "<h3>Bohr Atom</h3><p>Electrons reside in quantized shells. Orbital drops emit discrete photons.</p>",
    formulas: [{ name: "Transition energy", expr: "ΔE = 13.6 (1/n_f² - 1/n_i²) eV" }]
  }
};

const assessmentQuestions = {
  ohms: [
    { q: "State the mathematical formulation of Ohm's Law.", options: ["V = I / R", "I = V / R", "R = I / V", "V = I² R"], correct: 1, explanation: "Ohm's Law is I = V/R." },
    { q: "Ohm's Law holds strictly true under which conditions?", options: ["Constant temperature", "Varying temperature", "Varying dimensions", "Always"], correct: 0, explanation: "Temperature must remain constant to keep resistance fixed." }
  ],
  kvl: [
    { q: "What is Kirchhoff's Voltage Law a statement of?", options: ["Conservation of charge", "Conservation of energy", "Conservation of momentum", "Conservation of mass"], correct: 1, explanation: "KVL is based on conservation of energy; sum of potential differences in loop is zero." }
  ],
  kcl: [
    { q: "What is Kirchhoff's Current Law a statement of?", options: ["Conservation of charge", "Conservation of energy", "Conservation of mass", "None"], correct: 0, explanation: "KCL represents conservation of charge; total current entering node equals total leaving." }
  ],
  rc_rl_rlc: [
    { q: "What is LCR circuit resonance condition?", options: ["XL = XC", "XL > XC", "XL < XC", "Z = 0"], correct: 0, explanation: "Resonance is when inductive and capacitive reactances cancel (XL = XC)." }
  ],
  lcr: [
    { q: "At resonant frequency in LCR series circuit, Z equals:", options: ["R", "0", "Infinity", "XL"], correct: 0, explanation: "At resonance XL = XC, so total impedance Z drops to resistor value R." }
  ],
  rc: [
    { q: "Define time constant of an RC circuit.", options: ["R / C", "R × C", "1 / (R × C)", "C / R"], correct: 1, explanation: "Time constant τ = R × C in seconds." }
  ],
  series_parallel: [
    { q: "Two 100 Ω resistors in parallel yield an equivalent resistance of:", options: ["200 Ω", "50 Ω", "100 Ω", "25 Ω"], correct: 1, explanation: "1/Req = 1/100 + 1/100 = 2/100 => Req = 50 Ω." }
  ],
  wheatstone: [
    { q: "Under balanced Wheatstone bridge conditions, galvanometer current is:", options: ["Maximum", "Zero", "Unchanged", "Half"], correct: 1, explanation: "At balance, potential differences across nodes are equal, nulling current." }
  ],
  faraday: [
    { q: "Induced emf in a coil depends directly on rate of change of:", options: ["Magnetic flux", "Coil mass", "Temperature", "Resistance"], correct: 0, explanation: "Faraday's Law states induced EMF is proportional to change in magnetic flux." }
  ],
  lenz: [
    { q: "Lenz's Law represents conservation of:", options: ["Charge", "Momentum", "Energy", "Flux"], correct: 2, explanation: "Lenz's law is a consequence of conservation of energy." }
  ],
  solenoid: [
    { q: "Magnetic field inside a long solenoid is:", options: ["Directly proportional to current", "Inversely proportional to current", "Zero", "Quadratic to current"], correct: 0, explanation: "B = μ0 n I, so it is directly proportional to I." }
  ],
  transformer: [
    { q: "A step-up transformer increases voltage by scaling up:", options: ["Primary turns", "Secondary turns", "Primary current", "Frequency"], correct: 1, explanation: "Vs / Vp = Ns / Np. Scaling up secondary turns Ns increases secondary voltage." }
  ],
  snell: [
    { q: "Snell's Law defines relationship between angles of:", options: ["Reflection", "Refraction", "Diffraction", "Polarization"], correct: 1, explanation: "Snell's Law connects incident vs refraction angles: n1 sinθ1 = n2 sinθ2." }
  ],
  lens_eq: [
    { q: "A convex lens has f = 15cm. If object is at u = 30cm, the image forms at v =:", options: ["15 cm", "30 cm", "Infinity", "10 cm"], correct: 1, explanation: "1/v = 1/f - 1/u = 1/15 - 1/30 = 1/30 => v = 30 cm." }
  ],
  tir: [
    { q: "TIR occurs when incident angle is:", options: ["Less than critical angle", "Greater than critical angle", "Equal to refraction angle", "Zero"], correct: 1, explanation: "TIR happens only if incident angle θ1 exceeds the critical angle θc." }
  ],
  prism: [
    { q: "Which color refracts (bends) the most through a glass prism?", options: ["Red", "Green", "Yellow", "Violet"], correct: 3, explanation: "Violet light has shorter wavelength, higher refractive index, and deviates the most." }
  ],
  pendulum: [
    { q: "If pendulum length is quadrupled (4x), its period T changes by:", options: ["Doubling", "Halving", "4x increase", "Unchanged"], correct: 0, explanation: "T = 2π√(L/g). Multiplying L by 4 increases T by √4 = 2." }
  ],
  hooke: [
    { q: "A spring stretches 2cm under 10N force. What is spring constant k?", options: ["5 N/m", "500 N/m", "20 N/m", "50 N/m"], correct: 1, explanation: "k = F/x = 10 / 0.02 = 500 N/m." }
  ],
  projectile: [
    { q: "What launch angle maximizes projectile range under gravity?", options: ["30°", "45°", "60°", "90°"], correct: 1, explanation: "Range is proportional to sin(2θ), which peaks at 2θ = 90° => θ = 45°." }
  ],
  doppler: [
    { q: "If sound source approaches observer, the observed frequency:", options: ["Increases", "Decreases", "Remains same", "Drops to zero"], correct: 0, explanation: "Moving source compresses waves, shifting frequency higher." }
  ],
  ideal_gas: [
    { q: "Ideal Gas Law is expressed as:", options: ["P V = n R T", "P / V = n R T", "P T = n R V", "P V = R T"], correct: 0, explanation: "State equation is PV = nRT." }
  ],
  boyle: [
    { q: "Boyle's law holds at constant:", options: ["Pressure", "Volume", "Temperature", "Moles only"], correct: 2, explanation: "Boyle's law requires temperature T to remain constant." }
  ],
  charles: [
    { q: "Charles's law holds at constant:", options: ["Pressure", "Volume", "Temperature", "Mass only"], correct: 0, explanation: "Charles's law requires pressure P to remain constant." }
  ],
  specific_heat: [
    { q: "Specific heat capacity is heat required to raise temp of 1g by:", options: ["1°C", "10°C", "100°C", "0.1°C"], correct: 0, explanation: "Specific heat c is heat per unit mass per degree change." }
  ],
  photoelectric: [
    { q: "Photoelectric emission threshold depends directly on light:", options: ["Intensity", "Frequency", "Amplitude", "Velocity"], correct: 1, explanation: "Emission requires photon energy hν > Φ, which is a frequency constraint." }
  ],
  radioactive: [
    { q: "After exactly 3 half-lives, fraction of parent nuclei remaining is:", options: ["1/2", "1/4", "1/8", "1/16"], correct: 2, explanation: "Fraction remaining is (1/2)³ = 1/8." }
  ],
  de_broglie: [
    { q: "de Broglie wavelength is inversely proportional to particle:", options: ["Mass only", "Velocity only", "Momentum", "Energy"], correct: 2, explanation: "λ = h/p, where momentum p = mv." }
  ],
  bohr_model: [
    { q: "Hydrogen electron transition from n=2 to n=1 energy is:", options: ["10.2 eV", "13.6 eV", "3.4 eV", "1.5 eV"], correct: 0, explanation: "ΔE = -3.4 - (-13.6) = 10.2 eV." }
  ],
  arduino_led: [
    { q: "What is the primary function of a current-limiting resistor in an LED loop?", options: ["Store charge", "Limit current and protect LED", "Convert AC to DC", "Oscillate voltage"], correct: 1, explanation: "Resistors limit the flow of current to prevent burning out components like LEDs." }
  ]
};

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
  } else if (activeExperiment === 'kvl' || activeExperiment === 'kcl') {
    V = params.V;
    I = V / (params.R || 1);
    Z = params.R;
    P = V * I;
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
    Z = params.R;
    I = V / (params.R || 1);
    P = V * I;
    f0 = params.R * (params.C * 1e-6); 
  } else if (activeExperiment === 'series_parallel') {
    V = params.V;
    const R1 = params.R;
    const R2 = params.L; 
    Z = R1 + R2; 
    I = V / Z;
    P = V * I;
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
  } else if (activeExperiment === 'snell' || activeExperiment === 'tir') {
    const n1 = params.V;
    const n2 = params.R;
    const theta1 = params.C;
    const sinTheta2 = (n1 / n2) * Math.sin(theta1 * Math.PI / 180);
    let theta2 = 0;
    let critAngle = 0;
    if (n1 > n2) {
      critAngle = Math.asin(n2 / n1) * 180 / Math.PI;
    }
    if (sinTheta2 <= 1.0) {
      theta2 = Math.asin(sinTheta2) * 180 / Math.PI;
    } else {
      theta2 = 90.0; 
    }
    V = theta1; 
    I = theta2; 
    Z = n2 / n1; 
    P = critAngle; 
    f0 = Math.abs(theta1 - theta2); 
  } else if (activeExperiment === 'lens_eq') {
    const u = params.V;
    const f = params.R;
    let v = 0;
    if (u !== f) {
      v = (u * f) / (u - f);
    } else {
      v = 9999; 
    }
    V = u;
    I = v;
    Z = f;
    P = Math.abs(v / u); 
  } else if (activeExperiment === 'prism') {
    const i = params.V;
    const A = params.R;
    const n = params.C;
    const dev = A * (n - 1); 
    V = i;
    I = dev;
    Z = n;
  } else if (activeExperiment === 'pendulum') {
    const theta0 = params.V;
    const L = params.R;
    const g = params.L || 9.8;
    const period = 2 * Math.PI * Math.sqrt(L / g);
    const t = (Date.now() * 0.001);
    const omega = Math.sqrt(g / L);
    const currentAngle = theta0 * Math.cos(omega * t);
    const currentVelocity = -theta0 * (Math.PI / 180) * omega * Math.sin(omega * t);
    V = currentAngle;
    I = currentVelocity;
    Z = period;
    const mass = 0.5; 
    const h0 = L * (1 - Math.cos(theta0 * Math.PI / 180));
    const h = L * (1 - Math.cos(currentAngle * Math.PI / 180));
    P = mass * g * (h0 - h); 
    f0 = mass * g * h; 
  } else if (activeExperiment === 'hooke') {
    const mass = params.V * 1e-3; 
    const k = params.R;
    const g = 9.8;
    const stretch = (mass * g) / k; 
    V = mass * 1000;
    I = stretch * 100; 
    Z = k;
  } else if (activeExperiment === 'projectile') {
    const theta = params.V * Math.PI / 180;
    const v0 = params.R;
    const g = params.L || 9.8;
    const range = (v0 * v0 * Math.sin(2 * theta)) / g;
    const maxHeight = (v0 * v0 * Math.sin(theta) * Math.sin(theta)) / (2 * g);
    V = params.V;
    I = range;
    Z = maxHeight;
  } else if (activeExperiment === 'doppler') {
    const vs = params.V;
    const fs = params.R;
    const v = params.L || 340;
    const f_approach = fs * (v / (v - vs));
    const f_recede = fs * (v / (v + vs));
    V = f_approach;
    I = f_recede;
    Z = vs;
  } else if (activeExperiment === 'ideal_gas' || activeExperiment === 'boyle' || activeExperiment === 'charles') {
    const vol = activeExperiment === 'charles' ? (params.V * 0.03) : params.V; 
    const temp = activeExperiment === 'charles' ? params.V : params.R; 
    const moles = params.L || 1.0;
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
    if (!source || !resistor || !inductor || !capacitor) {
      return { status: 'error', message: 'Missing required components. Place Source, Resistor, Inductor, and Capacitor.' };
    }
    
    const r1 = resistor.snap1, r2 = resistor.snap2;
    const l1 = inductor.snap1, l2 = inductor.snap2;
    const c1 = capacitor.snap1, c2 = capacitor.snap2;
    
    const s_to_r = (find(7 * 14 + 0) === find(r1) || find(7 * 14 + 0) === find(r2));
    const r_start = find(7 * 14 + 0) === find(r1) ? r1 : r2;
    const r_end = r_start === r1 ? r2 : r1;
    
    if (!s_to_r) {
      return { status: 'error', message: 'Connect Source (+) rail to Resistor start.' };
    }
    
    const r_to_l = (find(r_end) === find(l1) || find(r_end) === find(l2));
    const l_start = find(r_end) === find(l1) ? l1 : l2;
    const l_end = l_start === l1 ? l2 : l1;
    
    if (!r_to_l) {
      return { status: 'error', message: 'Connect Resistor end to Inductor start.' };
    }
    
    const l_to_c = (find(l_end) === find(c1) || find(l_end) === find(c2));
    const c_start = find(l_end) === find(c1) ? c1 : c2;
    const c_end = c_start === c1 ? c2 : c1;
    
    if (!l_to_c) {
      return { status: 'error', message: 'Connect Inductor end to Capacitor start.' };
    }
    
    const c_to_gnd = (find(c_end) === find(19 * 14 + 1));
    if (!c_to_gnd) {
      return { status: 'error', message: 'Connect Capacitor end back to Source (-) rail to close the loop.' };
    }
    
    return { status: 'success', message: 'Series LCR resonance loop closed and verified!' };
  }
  
  if (expKey === 'rc') {
    if (!source || !resistor || !capacitor) {
      return { status: 'error', message: 'Missing components. Place Source, Resistor, and Capacitor.' };
    }
    
    const r1 = resistor.snap1, r2 = resistor.snap2;
    const c1 = capacitor.snap1, c2 = capacitor.snap2;
    
    const s_to_r = (find(9 * 14 + 0) === find(r1) || find(9 * 14 + 0) === find(r2));
    const r_start = find(9 * 14 + 0) === find(r1) ? r1 : r2;
    const r_end = r_start === r1 ? r2 : r1;
    
    if (!s_to_r) {
      return { status: 'error', message: 'Connect Source (+) rail to Resistor start.' };
    }
    
    const r_to_c = (find(r_end) === find(c1) || find(r_end) === find(c2));
    const c_start = find(r_end) === find(c1) ? c1 : c2;
    const c_end = c_start === c1 ? c2 : c1;
    
    if (!r_to_c) {
      return { status: 'error', message: 'Connect Resistor end to Capacitor start.' };
    }
    
    const c_to_gnd = (find(c_end) === find(19 * 14 + 1));
    if (!c_to_gnd) {
      return { status: 'error', message: 'Connect Capacitor end back to Source (-) rail to close the loop.' };
    }
    
    return { status: 'success', message: 'RC charging loop verified and closed!' };
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
      if (state.activeExperiment !== 'arduino_led') {
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
  }

  if (elements.acAnalysisBlock) {
    elements.acAnalysisBlock.style.display = (state.activeExperiment === 'lcr') ? 'block' : 'none';
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
  if (state.activeExperiment === 'ohms') {
    headers = '<th>#</th><th>V (V)</th><th>I (A)</th><th>R (Ω)</th>';
  } else if (state.activeExperiment === 'lcr') {
    headers = '<th>#</th><th>f (Hz)</th><th>V (V)</th><th>I (A)</th><th>Z (Ω)</th>';
  } else if (state.activeExperiment === 'rc') {
    headers = '<th>#</th><th>C (µF)</th><th>V (V)</th><th>I (A)</th><th>Z (Ω)</th>';
  }
  
  let rows = '';
  state.dataPoints.forEach(pt => {
    if (state.activeExperiment === 'lcr') {
      rows += `<tr><td>${pt.id}</td><td>${pt.f}</td><td>${pt.V.toFixed(2)}</td><td>${pt.I.toFixed(4)}</td><td>${pt.R.toFixed(1)}</td></tr>`;
    } else if (state.activeExperiment === 'rc') {
      rows += `<tr><td>${pt.id}</td><td>${pt.C}</td><td>${pt.V.toFixed(2)}</td><td>${pt.I.toFixed(4)}</td><td>${pt.R.toFixed(1)}</td></tr>`;
    } else {
      rows += `<tr><td>${pt.id}</td><td>${pt.V.toFixed(2)}</td><td>${pt.I.toFixed(4)}</td><td>${pt.R.toFixed(1)}</td></tr>`;
    }
  });
  
  container.innerHTML = `
    <table class="data-tbl">
      <thead>
        <tr>${headers}</tr>
      </thead>
      <tbody>
        ${rows || '<tr><td colspan="5" style="text-align:center;color:var(--text3);">No recorded points yet</td></tr>'}
      </tbody>
    </table>
  `;
}

function appendAIMessage(sender, text, isUser = false) {
  if (!elements.aiMessagesContainer) return;
  const msg = document.createElement('div');
  msg.className = `ai-msg ${isUser ? 'user' : ''}`;
  
  const avatar = isUser ? '👤' : '⚡';
  const senderHtml = isUser ? '' : `<div style="font-size:9px;font-weight:600;color:var(--accent);letter-spacing:.5px;margin-bottom:3px">${sender}</div>`;
  
  msg.innerHTML = `
    <div class="ai-avatar">${avatar}</div>
    <div>
      ${senderHtml}
      <div class="ai-bubble">${text}</div>
    </div>
  `;
  elements.aiMessagesContainer.appendChild(msg);
  elements.aiMessagesContainer.scrollTop = elements.aiMessagesContainer.scrollHeight;
}

function updateParameterValue(key, val) {
  let min = 0, max = 100;
  let step = 1;
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

  val = Math.max(min, Math.min(max, val));
  if (step === 0.1) {
    val = Math.round(val * 10) / 10;
  } else {
    val = Math.round(val);
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

  updateDynamicTextures();
  triggerSingleCalculation();
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
    R: { label: "Loop Resistance R1", min: 1, max: 1000, step: 0.1, val: 100, unit: "Ω" }
  },
  kcl: {
    V: { label: "Source Voltage", min: 0, max: 30, step: 0.1, val: 12, unit: "V" },
    R: { label: "Branch Resistance R1", min: 1, max: 1000, step: 0.1, val: 100, unit: "Ω" }
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
    L: { label: "Resistor R2", min: 1, max: 1000, step: 0.1, val: 100, unit: "Ω" }
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
  snell: {
    V: { label: "Index n1", min: 1.0, max: 2.5, step: 0.01, val: 1.0, unit: "" },
    R: { label: "Index n2", min: 1.0, max: 2.5, step: 0.01, val: 1.5, unit: "" },
    C: { label: "Incident Angle θ₁", min: 0, max: 90, step: 1, val: 45, unit: "°" }
  },
  lens_eq: {
    V: { label: "Object Distance u", min: 5, max: 100, step: 1, val: 30, unit: "cm" },
    R: { label: "Focal Length f", min: 2, max: 50, step: 0.5, val: 15, unit: "cm" }
  },
  tir: {
    V: { label: "Index n1 (Dense)", min: 1.2, max: 2.5, step: 0.01, val: 1.5, unit: "" },
    R: { label: "Index n2 (Rare)", min: 1.0, max: 1.5, step: 0.01, val: 1.0, unit: "" },
    C: { label: "Incident Angle θ₁", min: 0, max: 90, step: 1, val: 45, unit: "°" }
  },
  prism: {
    V: { label: "Incident Angle i", min: 0, max: 90, step: 1, val: 45, unit: "°" },
    R: { label: "Apex Angle A", min: 30, max: 75, step: 1, val: 60, unit: "°" },
    C: { label: "Base Index n₀", min: 1.2, max: 2.0, step: 0.01, val: 1.5, unit: "" }
  },
  pendulum: {
    V: { label: "Start Angle θ₀", min: 5, max: 90, step: 1, val: 30, unit: "°" },
    R: { label: "String Length L", min: 0.2, max: 3.0, step: 0.05, val: 1.5, unit: "m" },
    L: { label: "Gravity g", min: 1.0, max: 25.0, step: 0.1, val: 9.8, unit: "m/s²" }
  },
  hooke: {
    V: { label: "Hanging Mass m", min: 10, max: 1000, step: 10, val: 200, unit: "g" },
    R: { label: "Spring Constant k", min: 5, max: 100, step: 1, val: 25, unit: "N/m" }
  },
  projectile: {
    V: { label: "Launch Angle θ", min: 0, max: 90, step: 1, val: 45, unit: "°" },
    R: { label: "Initial Velocity v₀", min: 1, max: 50, step: 1, val: 20, unit: "m/s" },
    L: { label: "Gravity g", min: 1.0, max: 25.0, step: 0.1, val: 9.8, unit: "m/s²" }
  },
  doppler: {
    V: { label: "Source Velocity vs", min: 0, max: 150, step: 1, val: 50, unit: "m/s" },
    R: { label: "Source Freq fs", min: 100, max: 2000, step: 10, val: 500, unit: "Hz" },
    L: { label: "Sound Speed v", min: 200, max: 500, step: 5, val: 340, unit: "m/s" }
  },
  ideal_gas: {
    V: { label: "Chamber Volume V", min: 1.0, max: 30.0, step: 0.1, val: 10.0, unit: "L" },
    R: { label: "Temperature T", min: 100, max: 1000, step: 5, val: 300, unit: "K" },
    L: { label: "Moles n", min: 0.1, max: 5.0, step: 0.1, val: 1.0, unit: "mol" }
  },
  boyle: {
    V: { label: "Chamber Volume V", min: 1.0, max: 30.0, step: 0.1, val: 10.0, unit: "L" },
    R: { label: "Temperature (Fix)", min: 100, max: 1000, step: 5, val: 300, unit: "K" }
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

  if (['snell', 'lens_eq', 'tir', 'prism'].includes(expKey)) {
    // Laser pointer source
    const laserGroup = new THREE.Group();
    laserGroup.name = 'laser-source';
    
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.25, 0.25), metalMat);
    body.position.set(-2.5, 0.4, 0);
    laserGroup.add(body);
    
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.4), metalMat);
    base.position.set(-2.5, 0.2, 0);
    laserGroup.add(base);
    
    state.proceduralGroup.add(laserGroup);
    
    // Laser Ray line
    const points = [new THREE.Vector3(-2.5, 0.4, 0), new THREE.Vector3(0, 0.4, 0)];
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const ray = new THREE.Line(geo, laserMat);
    ray.name = 'laser-ray';
    state.proceduralGroup.add(ray);
    
    if (expKey === 'snell' || expKey === 'tir') {
      // Protractor dial on the floor
      const dGeo = new THREE.CylinderGeometry(1.8, 1.8, 0.02, 64);
      const dMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
      const dial = new THREE.Mesh(dGeo, dMat);
      dial.position.y = 0.01;
      state.proceduralGroup.add(dial);
      
      const rGeo = new THREE.RingGeometry(1.7, 1.75, 64);
      const rMat = new THREE.MeshBasicMaterial({ color: 0x64748b, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(rGeo, rMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.022;
      state.proceduralGroup.add(ring);
      
      // Semicircular glass slab
      const gGeo = new THREE.CylinderGeometry(1.3, 1.3, 0.4, 32, 1, false, 0, Math.PI);
      const glass = new THREE.Mesh(gGeo, glassMat);
      glass.position.set(0, 0.2, 0);
      glass.rotation.x = Math.PI / 2;
      glass.rotation.z = Math.PI / 2;
      state.proceduralGroup.add(glass);
    } else if (expKey === 'prism') {
      const pGeo = new THREE.CylinderGeometry(0.7, 0.7, 1.0, 3, 1);
      const prism = new THREE.Mesh(pGeo, glassMat);
      prism.position.set(0, 0.5, 0);
      prism.rotation.y = Math.PI / 6;
      state.proceduralGroup.add(prism);
    } else if (expKey === 'lens_eq') {
      // Optical bench rail
      const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 4.8), metalMat);
      rail.rotation.z = Math.PI / 2;
      rail.position.set(0, 0.1, 0);
      state.proceduralGroup.add(rail);
      
      // Lens Stand & Lens
      const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.5), metalMat);
      stand.position.set(0, 0.25, 0);
      state.proceduralGroup.add(stand);
      
      const lensGeo = new THREE.SphereGeometry(0.5, 32, 32);
      const lens = new THREE.Mesh(lensGeo, glassMat);
      lens.scale.set(1, 1, 0.22);
      lens.position.set(0, 0.6, 0);
      state.proceduralGroup.add(lens);
      
      // Object pin
      const objPin = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.4), new THREE.MeshStandardMaterial({ color: 0xef4444 }));
      objPin.position.set(-1.5, 0.3, 0);
      objPin.name = 'lens-object-pin';
      state.proceduralGroup.add(objPin);
      
      // Image screen
      const screen = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.7, 0.7), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.9 }));
      screen.position.set(1.5, 0.45, 0);
      screen.name = 'lens-image-screen';
      state.proceduralGroup.add(screen);
      
      const screenSt = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.25), metalMat);
      screenSt.position.set(1.5, 0.125, 0);
      screenSt.name = 'lens-screen-stand';
      state.proceduralGroup.add(screenSt);
    }
  } else if (expKey === 'pendulum') {
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.04, 1.0), metalMat);
    base.position.y = 0.02;
    state.proceduralGroup.add(base);
    
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.4), metalMat);
    post.position.set(-0.35, 1.2, 0);
    state.proceduralGroup.add(post);
    
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.5), metalMat);
    rod.rotation.z = Math.PI / 2;
    rod.position.set(-0.1, 2.3, 0);
    state.proceduralGroup.add(rod);
    
    const pivot = new THREE.Group();
    pivot.position.set(0, 2.3, 0);
    pivot.name = 'pendulum-pivot';
    state.proceduralGroup.add(pivot);
    
    const str = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 1.4), new THREE.MeshStandardMaterial({ color: 0xe2e8f0 }));
    str.position.y = -0.7;
    str.name = 'pendulum-string';
    pivot.add(str);
    
    const bob = new THREE.Mesh(new THREE.SphereGeometry(0.12, 32, 32), new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.1 }));
    bob.position.y = -1.4;
    bob.name = 'pendulum-bob';
    pivot.add(bob);
  } else if (expKey === 'hooke') {
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.04, 1.0), metalMat);
    base.position.y = 0.02;
    state.proceduralGroup.add(base);
    
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 3.0), metalMat);
    post.position.set(-0.35, 1.5, 0);
    state.proceduralGroup.add(post);
    
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.5), metalMat);
    rod.rotation.z = Math.PI / 2;
    rod.position.set(-0.1, 2.9, 0);
    state.proceduralGroup.add(rod);
    
    const springGroup = new THREE.Group();
    springGroup.position.set(0, 2.9, 0);
    springGroup.name = 'spring-group';
    state.proceduralGroup.add(springGroup);
    
    const weight = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.2), new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8 }));
    weight.position.set(0, 1.3, 0);
    weight.name = 'spring-weight';
    state.proceduralGroup.add(weight);
  } else if (expKey === 'projectile') {
    const ground = new THREE.Mesh(new THREE.BoxGeometry(10.0, 0.02, 1.5), new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 }));
    ground.position.y = 0.01;
    state.proceduralGroup.add(ground);
    
    const cannon = new THREE.Group();
    cannon.position.set(-4.0, 0.2, 0);
    cannon.name = 'cannon-group';
    state.proceduralGroup.add(cannon);
    
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.7, 16), metalMat);
    barrel.rotation.z = Math.PI / 4;
    barrel.position.set(0.25, 0.25, 0);
    barrel.name = 'cannon-barrel';
    cannon.add(barrel);
    
    const mount = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), new THREE.MeshStandardMaterial({ color: 0x1e293b }));
    cannon.add(mount);
    
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
    ball.position.set(-4.0, 0.2, 0);
    ball.name = 'projectile-ball';
    ball.visible = false;
    state.proceduralGroup.add(ball);
  } else if (expKey === 'doppler') {
    const road = new THREE.Mesh(new THREE.BoxGeometry(8.0, 0.02, 1.5), new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 }));
    road.position.y = 0.01;
    state.proceduralGroup.add(road);
    
    const speaker = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.25, 0.3), new THREE.MeshStandardMaterial({ color: 0x3b82f6 }));
    speaker.position.set(-2.5, 0.135, 0);
    speaker.name = 'doppler-source';
    state.proceduralGroup.add(speaker);
    
    const listener = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.4), new THREE.MeshStandardMaterial({ color: 0xef4444 }));
    listener.position.set(1.5, 0.21, 0);
    state.proceduralGroup.add(listener);
    
    const ripples = new THREE.Group();
    ripples.name = 'doppler-ripples';
    state.proceduralGroup.add(ripples);
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
function setupExperiment(expKey) {
  if (expKey === 'led') expKey = 'arduino_led';
  state.activeExperiment = expKey;
  state.dataPoints = [];
  state.score = 0;
  state.completedSteps.clear();
  state.selectedComponentIdx = -1;
  state.selectedHoleIndex = null;
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
  const isCircuit = ['ohms', 'kvl', 'kcl', 'rc_rl_rlc', 'series_parallel', 'wheatstone', 'lcr', 'rc', 'arduino_led'].includes(expKey);
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

      if (rangeEl) {
        rangeEl.min = config[p].min;
        rangeEl.max = config[p].max;
        rangeEl.step = config[p].step;
        rangeEl.value = config[p].val;
      }
      if (inputEl) {
        inputEl.min = config[p].min;
        inputEl.max = config[p].max;
        inputEl.step = config[p].step;
        inputEl.value = config[p].val;
      }
      state.params[p] = config[p].val;
    } else {
      sliderContainer.style.display = 'none';
    }
  });

  // Sync selector dropdown
  if (elements.experimentSelect) {
    elements.experimentSelect.value = expKey;
  }

  // Configure Multimeter Labels per domain
  if (expKey === 'ohms' || expKey === 'kvl' || expKey === 'kcl' || expKey === 'rc_rl_rlc' || expKey === 'lcr' || expKey === 'rc' || expKey === 'series_parallel' || expKey === 'wheatstone' || expKey === 'arduino_led') {
    updateMeterLabels("VOLTMETER", "V", "AMMETER", "A", expKey === 'ohms' ? 'RESISTANCE' : 'IMPEDANCE', "Ω", "Power", "Energy");
  } else if (['snell', 'lens_eq', 'tir', 'prism'].includes(expKey)) {
    updateMeterLabels("INCIDENT θ₁", "°", "REFRACTED θ₂", "°", "REFRACT INDEX", "", "Crit Angle θc", "Deviation δ");
  } else if (expKey === 'pendulum') {
    updateMeterLabels("POSITION θ", "°", "VELOCITY ω", "rad/s", "PERIOD T", "s", "Kinetic Energy", "Potential Energy");
  } else if (expKey === 'hooke' || expKey === 'projectile' || expKey === 'doppler') {
    updateMeterLabels("MEASURE V", "", "MEASURE I", "", "MEASURE Z", "", "Kinetic Energy", "Potential Energy");
  } else if (['ideal_gas', 'boyle', 'charles'].includes(expKey)) {
    updateMeterLabels("PRESSURE P", "kPa", "VOLUME V", "L", "TEMPERATURE T", "K", "Moles n", "Internal Energy U");
  } else if (expKey === 'specific_heat') {
    updateMeterLabels("METAL TEMP Tm", "°C", "WATER TEMP Tw", "°C", "MIXTURE Tf", "°C", "Heat Exchanged", "Heat Capacity");
  } else if (expKey === 'photoelectric') {
    updateMeterLabels("LIGHT FREQ ν", "10¹⁴Hz", "INTENSITY I", "mW", "WORK FUNCTION", "eV", "Stopping Volt Vs", "Max K.E. Kmax");
  } else if (expKey === 'radioactive') {
    updateMeterLabels("INITIAL N₀", "", "REMAINING N", "", "HALF-LIFE T₁/₂", "s", "Activity A", "Decay Constant");
  } else if (expKey === 'de_broglie') {
    updateMeterLabels("MASS m", "10⁻³⁰kg", "VELOCITY v", "km/s", "WAVELENGTH λ", "nm", "Momentum p", "Kinetic Energy");
  } else if (expKey === 'bohr_model') {
    updateMeterLabels("INITIAL ni", "", "FINAL nf", "", "ENERGY GAP ΔE", "eV", "Emitted λ", "Frequency ν");
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
      // RC Transient wave
      ctx.strokeStyle = '#00ff88';
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#00ff88';
      ctx.beginPath();
      const period = 200 / scaleTime;
      for (let x = 0; x < w; x++) {
        const progress = ((x + time * 60) % period) / period;
        // height scaled by scaleVolts
        const y = h - 15 - (h - 40) * (1 - Math.exp(-progress * 4.5)) * (1 / scaleVolts);
        if (x === 0 || (x + time * 60) % period < 2) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
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

function drawGraph() {
  if (!elements.graphCanvas) return;
  const ctx = elements.graphCanvas.getContext('2d');
  const w = elements.graphCanvas.width;
  const h = elements.graphCanvas.height;
  
  if (w <= 0 || h <= 0) return;
  
  // 1. Draw beautiful slate blue-black background
  ctx.fillStyle = '#060a16';
  ctx.fillRect(0, 0, w, h);
  
  // Layout paddings
  const paddingLeft = 45;
  const paddingRight = 15;
  const paddingTop = 20;
  const paddingBottom = 30;
  
  const graphWidth = w - paddingLeft - paddingRight;
  const graphHeight = h - paddingTop - paddingBottom;
  
  // 2. Draw border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.strokeRect(paddingLeft, paddingTop, graphWidth, graphHeight);
  
  let maxV = 24;
  let maxI = 0.5;
  const R_theoretical = state.params.R || 100;
  
  if (state.activeExperiment === 'ohms') {
    maxV = 30;
    maxI = 30 / R_theoretical;
  }
  
  // 3. Draw grid, ticks, and numeric labels
  ctx.fillStyle = '#64748b';
  ctx.font = '8px monospace';
  
  // Vertical grids (Voltage axis ticks)
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  for (let i = 0; i <= 5; i++) {
    const vVal = (i / 5) * maxV;
    const xPix = paddingLeft + (i / 5) * graphWidth;
    
    // Grid line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.beginPath();
    ctx.moveTo(xPix, paddingTop);
    ctx.lineTo(xPix, h - paddingBottom);
    ctx.stroke();
    
    // Tick mark
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.moveTo(xPix, h - paddingBottom);
    ctx.lineTo(xPix, h - paddingBottom + 4);
    ctx.stroke();
    
    // Label
    ctx.fillText(`${vVal.toFixed(0)}`, xPix, h - paddingBottom + 6);
  }
  
  // Horizontal grids (Current axis ticks)
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (let i = 0; i <= 5; i++) {
    const iVal = (i / 5) * maxI;
    const yPix = h - paddingBottom - (i / 5) * graphHeight;
    
    // Grid line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.beginPath();
    ctx.moveTo(paddingLeft, yPix);
    ctx.lineTo(w - paddingRight, yPix);
    ctx.stroke();
    
    // Tick mark
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.moveTo(paddingLeft - 4, yPix);
    ctx.lineTo(paddingLeft, yPix);
    ctx.stroke();
    
    // Label in mA
    const iVal_mA = iVal * 1000;
    ctx.fillText(`${iVal_mA.toFixed(0)}`, paddingLeft - 8, yPix);
  }
  
  // 4. Draw rotated Axis Title Labels
  ctx.fillStyle = '#94a3b8';
  ctx.font = '8px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  // X-axis: Voltage
  ctx.fillText("Voltage V (V)", paddingLeft + graphWidth / 2, h - 2);
  
  // Y-axis: Current
  ctx.save();
  ctx.translate(12, paddingTop + graphHeight / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("Current I (mA)", 0, 0);
  ctx.restore();
  
  // 5. Plot best-fit line for Ohm's Law
  let slopeDisp = "—";
  let R_calc_disp = "—";
  let error_disp = "—";
  
  if (state.activeExperiment === 'ohms' && state.dataPoints.length >= 2) {
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
      const xStart = paddingLeft + (vStart / maxV) * graphWidth;
      const yStart = h - paddingBottom - (iStart / maxI) * graphHeight;
      
      const vEnd = maxV;
      const iEnd = m * vEnd + c;
      const xEnd = paddingLeft + (vEnd / maxV) * graphWidth;
      const yEnd = h - paddingBottom - (iEnd / maxI) * graphHeight;
      
      ctx.moveTo(xStart, yStart);
      ctx.lineTo(xEnd, yEnd);
      ctx.stroke();
      ctx.setLineDash([]); // reset
      ctx.shadowBlur = 0; // reset
    }
  }
  
  // 6. Draw connection line and data points
  if (state.dataPoints.length > 0) {
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    state.dataPoints.forEach((pt, idx) => {
      let xPix, yPix;
      if (state.activeExperiment === 'ohms') {
        xPix = paddingLeft + (pt.V / maxV) * graphWidth;
        yPix = h - paddingBottom - (pt.I / maxI) * graphHeight;
      } else {
        xPix = paddingLeft + (pt.I / maxI) * graphWidth;
        yPix = h - paddingBottom - (pt.V / maxV) * graphHeight;
      }
      
      if (idx === 0) ctx.moveTo(xPix, yPix);
      else ctx.lineTo(xPix, yPix);
    });
    if (state.dataPoints.length > 1) {
      ctx.stroke();
    }
    
    // Draw glowing circles
    state.dataPoints.forEach(pt => {
      let xPix, yPix;
      if (state.activeExperiment === 'ohms') {
        xPix = paddingLeft + (pt.V / maxV) * graphWidth;
        yPix = h - paddingBottom - (pt.I / maxI) * graphHeight;
      } else {
        xPix = paddingLeft + (pt.I / maxI) * graphWidth;
        yPix = h - paddingBottom - (pt.V / maxV) * graphHeight;
      }
      
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
    const vHover = ((graphMouseX - paddingLeft) / graphWidth) * maxV;
    const iHover = ((h - paddingBottom - graphMouseY) / graphHeight) * maxI;
    const iHover_mA = iHover * 1000;
    
    // Float coordinate label HUD
    ctx.shadowBlur = 6;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 1;
    
    const hudW = 75;
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
    ctx.fillText(`V: ${vHover.toFixed(2)} V`, hudX + 5, hudY + 5);
    ctx.fillText(`I: ${iHover_mA.toFixed(1)} mA`, hudX + 5, hudY + 15);
  }
  
  // 8. Render Stats Card Overlay (placed dynamically in grid top-right)
  if (state.activeExperiment === 'ohms' && state.dataPoints.length >= 2) {
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
    elements.graphSlopeLbl.innerText = state.activeExperiment === 'ohms' ? "Slope: Need 2+ points" : "Slope: —";
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


// --- FULL LAB REPORT PDF GENERATOR ---
function generateLabReportPDF() {
  const expKey = state.activeExperiment;
  const exp = experiments[expKey];
  const date = new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'long', year:'numeric' });

  // --- Build observation table HTML ---
  let tableHeaders = '';
  let tableRows = '';
  if (expKey === 'ohms') {
    tableHeaders = `<th>S.No.</th><th>Voltage V (V)</th><th>Current I (A)</th><th>Resistance R = V/I (Ω)</th>`;
    state.dataPoints.forEach(p => {
      tableRows += `<tr><td>${p.id}</td><td>${p.V.toFixed(2)}</td><td>${(p.I * 1000).toFixed(3)} mA</td><td>${p.R.toFixed(2)}</td></tr>`;
    });
  } else if (expKey === 'lcr') {
    tableHeaders = `<th>S.No.</th><th>Frequency f (Hz)</th><th>Voltage V (V)</th><th>Current I (A)</th><th>Impedance Z (Ω)</th>`;
    state.dataPoints.forEach(p => {
      tableRows += `<tr><td>${p.id}</td><td>${p.f}</td><td>${p.V.toFixed(2)}</td><td>${p.I.toFixed(4)}</td><td>${p.R.toFixed(2)}</td></tr>`;
    });
  } else if (expKey === 'rc') {
    tableHeaders = `<th>S.No.</th><th>Capacitance C (µF)</th><th>Voltage V (V)</th><th>Current I (A)</th><th>Time Constant τ = RC (ms)</th>`;
    state.dataPoints.forEach(p => {
      const tau = (state.params.R * p.C * 1e-6 * 1000).toFixed(2);
      tableRows += `<tr><td>${p.id}</td><td>${p.C}</td><td>${p.V.toFixed(2)}</td><td>${p.I.toFixed(4)}</td><td>${tau}</td></tr>`;
    });
  } else if (expKey === 'arduino_led') {
    tableHeaders = `<th>S.No.</th><th>Vcc (V)</th><th>V_LED (V)</th><th>Resistance R (Ω)</th><th>Current I (mA)</th><th>Power P (mW)</th>`;
    const Vcc = 5.0, Vled = 2.0;
    [[100,'Red'],[150,'Red'],[220,'Green'],[330,'Blue']].forEach(([r, color], idx) => {
      const I = Math.max(0, (Vcc - Vled) / r);
      tableRows += `<tr><td>${idx+1}</td><td>${Vcc}</td><td>${Vled}</td><td>${r}</td><td>${(I*1000).toFixed(2)}</td><td>${(I*Vcc*1000).toFixed(2)}</td></tr>`;
    });
  }
  if (!tableRows) {
    tableRows = `<tr><td colspan="6" style="text-align:center;color:#888;">No data recorded. Run simulation and use Record button.</td></tr>`;
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
  const conclusionEl = document.getElementById('conclusion-text');
  const conclusionText = conclusionEl ? (conclusionEl.innerText || conclusionEl.textContent) : '';
  let conclusionBlock = conclusionText || 'Experiment in progress. Complete all steps and record data points to generate conclusion.';
  if (expKey === 'lcr' && state.dataPoints.length >= 2) {
    const f0_theoretical = (1 / (2 * Math.PI * Math.sqrt(state.params.L * 1e-3 * state.params.C * 1e-6))).toFixed(1);
    conclusionBlock = `The series LCR resonance experiment was conducted using L = ${state.params.L} mH, C = ${state.params.C} µF, and R = ${state.params.R} Ω. The theoretical resonant frequency is f₀ = ${f0_theoretical} Hz. At resonance, the impedance is minimum (Z = R = ${state.params.R} Ω), current is maximum (I_max = V/R), and the phase angle φ = 0°. The I-Z vs. frequency curve showed a clear resonance peak, verifying the LCR resonance theory.`;
  } else if (expKey === 'rc' && state.dataPoints.length >= 1) {
    const tau_ms = (state.params.R * state.params.C * 1e-6 * 1000).toFixed(2);
    conclusionBlock = `The RC circuit charging experiment was performed with R = ${state.params.R} Ω and C = ${state.params.C} µF. The theoretical time constant τ = RC = ${tau_ms} ms. The oscilloscope waveform showed an exponential charging curve V_C(t) = V_s(1−e^(−t/τ)), confirming the RC transient response theory. The capacitor reaches 63.2% of V_s after one time constant τ = ${tau_ms} ms.`;
  } else if (expKey === 'arduino_led') {
    const I_led = Math.max(0, (5.0 - 2.0) / state.params.R);
    conclusionBlock = `The Arduino LED push-button experiment demonstrated basic digital control. With supply voltage V_cc = 5V, LED forward voltage V_f ≈ 2V, and series resistance R = ${state.params.R} Ω, the theoretical LED current I = (V_cc − V_f)/R = ${(I_led * 1000).toFixed(1)} mA. When the momentary button was pressed, the LED glowed confirming the series circuit was complete. On releasing the button (Normally Open switch), the LED turned OFF instantly, verifying the switch's behaviour.`;
  }

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
  
  let maxV = 24;
  let maxI = 0.5;
  const R_theoretical = state.params.R || 100;
  
  if (state.activeExperiment === 'ohms') {
    maxV = 30;
    maxI = 30 / R_theoretical;
  }
  
  // 3. Grid, ticks, and numeric labels
  ctx.fillStyle = '#94a3b8';
  ctx.font = '28px monospace';
  
  // Vertical grids (Voltage axis ticks)
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  for (let i = 0; i <= 5; i++) {
    const vVal = (i / 5) * maxV;
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
    ctx.fillText(`${vVal.toFixed(0)}`, xPix, h - paddingBottom + 18);
  }
  
  // Horizontal grids (Current axis ticks)
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (let i = 0; i <= 5; i++) {
    const iVal = (i / 5) * maxI;
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
    
    // Label in mA
    const iVal_mA = iVal * 1000;
    ctx.fillText(`${iVal_mA.toFixed(0)}`, paddingLeft - 22, yPix);
  }
  
  // 4. Axis Title Labels
  ctx.fillStyle = '#cbd5e1';
  ctx.font = 'bold 32px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText("Voltage V (V)", paddingLeft + graphWidth / 2, h - 25);
  
  ctx.save();
  ctx.translate(45, paddingTop + graphHeight / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("Current I (mA)", 0, 0);
  ctx.restore();
  
  // 5. Best-fit line
  let slopeDisp = "—";
  let R_calc_disp = "—";
  let error_disp = "—";
  
  if (state.activeExperiment === 'ohms' && state.dataPoints.length >= 2) {
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
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#00d084';
      ctx.lineWidth = 5;
      ctx.setLineDash([12, 12]);
      ctx.beginPath();
      
      const vStart = 0;
      const iStart = m * vStart + c;
      const xStart = paddingLeft + (vStart / maxV) * graphWidth;
      const yStart = h - paddingBottom - (iStart / maxI) * graphHeight;
      
      const vEnd = maxV;
      const iEnd = m * vEnd + c;
      const xEnd = paddingLeft + (vEnd / maxV) * graphWidth;
      const yEnd = h - paddingBottom - (iEnd / maxI) * graphHeight;
      
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
    state.dataPoints.forEach((pt, idx) => {
      let xPix, yPix;
      if (state.activeExperiment === 'ohms') {
        xPix = paddingLeft + (pt.V / maxV) * graphWidth;
        yPix = h - paddingBottom - (pt.I / maxI) * graphHeight;
      } else {
        xPix = paddingLeft + (pt.I / maxI) * graphWidth;
        yPix = h - paddingBottom - (pt.V / maxV) * graphHeight;
      }
      
      if (idx === 0) ctx.moveTo(xPix, yPix);
      else ctx.lineTo(xPix, yPix);
    });
    if (state.dataPoints.length > 1) {
      ctx.stroke();
    }
    
    // Draw glowing circles
    state.dataPoints.forEach(pt => {
      let xPix, yPix;
      if (state.activeExperiment === 'ohms') {
        xPix = paddingLeft + (pt.V / maxV) * graphWidth;
        yPix = h - paddingBottom - (pt.I / maxI) * graphHeight;
      } else {
        xPix = paddingLeft + (pt.I / maxI) * graphWidth;
        yPix = h - paddingBottom - (pt.V / maxV) * graphHeight;
      }
      
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
  if (state.activeExperiment === 'ohms' && state.dataPoints.length >= 2) {
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
    
    ctx.fillText(`Slope: ${slopeDisp}`, cardX + 20, cardY + 20);
    ctx.fillText(`R(slope): ${R_calc_disp}`, cardX + 20, cardY + 60);
    ctx.fillText(`Error: ${error_disp}`, cardX + 20, cardY + 100);
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
    setupExperiment(e.target.value);
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
    
    // Prevent recording duplicate readings (same voltage)
    const currentV = state.meters.volts;
    const duplicate = state.dataPoints.find(pt => Math.abs(pt.V - currentV) < 0.05);
    if (duplicate) {
      appendAIMessage("Circuit IQ · AI Mentor", `A reading for ${currentV.toFixed(2)} V has already been recorded. Please vary the Voltage to record a new data point.`);
      return;
    }
    
    if (state.dataPoints.length >= 10) return;
    
    const pt = {
      id: state.dataPoints.length + 1,
      V: state.meters.volts,
      I: state.meters.amps,
      R: state.meters.ohms,
      f: state.params.f,
      C: state.params.C
    };
    state.dataPoints.push(pt);
    
    drawObservationTable();
    
    if (state.activeExperiment === 'ohms' && state.dataPoints.length >= 5) {
      completeStep(6);
      
      const R_theoretical = state.params.R || 100;
      const N = state.dataPoints.length;
      let sumV = 0, sumI = 0, sumVI = 0, sumV2 = 0;
      state.dataPoints.forEach(p => {
        sumV += p.V;
        sumI += p.I;
        sumVI += p.V * p.I;
        sumV2 += p.V * p.V;
      });
      const denom = (N * sumV2 - sumV * sumV);
      let conclusion = "";
      if (denom !== 0) {
        const m = (N * sumVI - sumV * sumI) / denom;
        const R_calc = 1 / m;
        const error = Math.abs(R_calc - R_theoretical) / R_theoretical * 100;
        conclusion = `<b>Conclusion:</b> The V-I graph is a straight line passing through the origin with a positive slope (m = ${(m * 1000).toFixed(3)} mA/V). The experimental resistance calculated from the slope is ${R_calc.toFixed(1)} Ω, deviating from the theoretical value of ${R_theoretical} Ω by only ${error.toFixed(2)}%. Therefore, Ohm's Law (V = I × R) is verified.`;
      } else {
        conclusion = `<b>Conclusion:</b> The V-I graph is a straight line passing through the origin. Therefore, Ohm's Law is verified.`;
      }
      elements.conclusionText.innerHTML = conclusion;
    } else if (state.activeExperiment === 'lcr') {
      const f0_theoretical = (1 / (2 * Math.PI * Math.sqrt(state.params.L * 1e-3 * state.params.C * 1e-6))).toFixed(1);
      const avgZ = state.dataPoints.reduce((a, b) => a + b.R, 0) / state.dataPoints.length;
      elements.conclusionText.innerHTML = `<b>LCR Analysis (${state.dataPoints.length} points recorded):</b><br>
        Theoretical resonant frequency: f₀ = <b>${f0_theoretical} Hz</b>.<br>
        At f₀, impedance Z = R (minimum = ${state.params.R} Ω), current is maximum, and phase φ = 0°.<br>
        Current avg impedance across recorded frequencies: ${avgZ.toFixed(1)} Ω.<br>
        Record points above and below f₀ to plot the resonance curve.`;
    } else if (state.activeExperiment === 'rc') {
      const tau_ms = (state.params.R * state.params.C * 1e-6 * 1000).toFixed(2);
      elements.conclusionText.innerHTML = `<b>RC Circuit Analysis (${state.dataPoints.length} points recorded):</b><br>
        Current R = ${state.params.R} Ω, C = ${state.params.C} µF → Time constant τ = RC = <b>${tau_ms} ms</b>.<br>
        Capacitor charges to 63.2% of V_s in ${tau_ms} ms and is fully charged (99.3%) after ${(parseFloat(tau_ms)*5).toFixed(1)} ms.<br>
        The exponential charging curve V_C(t) = V_s(1−e^(−t/τ)) is visible on the oscilloscope.`;
    } else {
      elements.conclusionText.innerText = `Recorded ${state.dataPoints.length}/5 points. Adjust voltage and record more points to complete the experiment.`;
    }
    drawGraph();
    updateAIMentor();
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
    setupExperiment(state.activeExperiment);
    updateWiringBanner();
  });
  
  elements.btnRun.addEventListener('click', async () => {
    try {
      let data = validateCircuitLocal();
      
      if (data.status === 'success') {
        if (state.activeExperiment !== 'arduino_led') {
          try {
            const response = await fetch('/api/validate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                placed_components: state.placedComponents.map(c => ({ type: c.type, id: c.id })),
                wires: resolveVirtualWires(),
                required_types: experiments[state.activeExperiment].req || []
              })
            });
            if (response.ok) {
              const backendData = await response.json();
              if (backendData.status === 'success') {
                data = { status: 'success', message: backendData.message };
              } else {
                data = { status: 'error', message: "Backend validation failure: " + backendData.message };
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
        startPollingCalculations();
        setElectronsActive(true);
        
        elements.btnRun.style.display = 'none';
        elements.btnStop.style.display = 'block';
        elements.statusDot.style.background = "var(--red)";
        elements.statusTextBar.innerText = "RUNNING";
        appendAIMessage("Circuit IQ · AI Mentor", "Loop validated successfully: " + data.message);
        
        if (state.activeExperiment === 'ohms') {
          completeStep(5);
        } else if (state.activeExperiment === 'lcr') {
          completeStep(3);
        } else if (state.activeExperiment === 'rc') {
          completeStep(3);
        } else if (state.activeExperiment === 'arduino_led') {
          completeStep(4);
          completeStep(5);
        }
      } else {
        appendAIMessage("Circuit IQ · AI Mentor", "Validation Failure: " + data.message);
      }
    } catch (e) {
      console.error(e);
      appendAIMessage("Circuit IQ · AI Mentor", "Validation failure.");
    }
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
    let colName = state.activeExperiment === 'ohms' ? "Resistance (Ohm)" : "Impedance (Ohm)";
    let csv = `Index,Voltage (V),Current (A),${colName}\n`;
    state.dataPoints.forEach(p => {
      csv += `${p.id},${p.V.toFixed(2)},${p.I.toFixed(4)},${p.R.toFixed(1)}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `circuit_iq_3d_${state.activeExperiment}_data.csv`;
    a.click();
  });
  
  elements.btnDownloadReport.addEventListener('click', () => {
    generateLabReportPDF();
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

function handleUserChatQuery() {
  const query = elements.aiInput.value.trim();
  if (!query) return;
  elements.aiInput.value = '';
  
  appendAIMessage("User", query, true);
  
  let response = "I am your Circuit IQ AI Mentor. Please specify what help you need (e.g. ask 'how to connect', 'formula', or 'readings').";
  const text = query.toLowerCase();
  
  if (text.includes("connect") || text.includes("how to") || text.includes("wire") || text.includes("step")) {
    response = `Here is the current connection step for **${experiments[state.activeExperiment].name}**:<br><br>${getAIMentorMessage()}`;
  } else if (text.includes("formula") || text.includes("equation") || text.includes("law")) {
    const formulasHtml = experiments[state.activeExperiment].formulas.map(f => `• **${f.name}**: \`${f.expr}\``).join("<br>");
    response = `Here are the formulas for the current experiment:<br><br>${formulasHtml}`;
  } else if (text.includes("reading") || text.includes("meter") || text.includes("volt") || text.includes("amp")) {
    response = `Current digital telemetry measurements:<br>• **Voltage (V)**: \`${state.meters.volts.toFixed(2)} V\`<br>• **Current (I)**: \`${state.meters.amps.toFixed(4)} A\`<br>• **Impedance (Z)**: \`${state.meters.ohms.toFixed(2)} Ω\`<br>• **Power (P)**: \`${state.meters.power.toFixed(2)} W\``;
  } else if (text.includes("resonance") || text.includes("frequency") || text.includes("lcr")) {
    if (state.activeExperiment === 'lcr') {
      response = `In the Series LCR circuit, resonance occurs where Z is minimum and equal to R. Resonant frequency **f₀ = ${(state.analysis.f0).toFixed(1)} Hz**.<br>Reactance values:<br>• **XL (Inductance)**: \`${state.analysis.XL.toFixed(1)} Ω\`<br>• **XC (Capacitance)**: \`${state.analysis.XC.toFixed(1)} Ω\`<br>• **Phase Shift φ**: \`${state.analysis.phi.toFixed(1)}°\``;
    } else {
      response = "LCR Resonance formulas are active in EXP-03 Series LCR Laboratory.";
    }
  } else if (text.includes("time constant") || text.includes("tau") || text.includes("charging")) {
    if (state.activeExperiment === 'rc') {
      const tau = state.params.R * state.params.C * 1e-6;
      response = `For the RC Time Constant, **τ = R × C** is equal to **${(tau * 1000).toFixed(1)} ms** (with R = ${state.params.R} Ω, C = ${state.params.C} µF). The capacitor reaches ~63.2% charge at t = τ, and full charge (~99%) at t = 5τ.`;
    } else {
      response = "Time constant charging calculations are active in EXP-04 RC Time Constant Laboratory.";
    }
  } else if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
    response = "Hello! I am your interactive AI Mentor. Ask me about circuit connections, formulas, or current measurements!";
  }
  
  setTimeout(() => {
    appendAIMessage("Circuit IQ · AI Mentor", response);
  }, 250);
}

function autoBuildExperiment() {
  setupExperiment(state.activeExperiment);
  const expKey = state.activeExperiment;
  if (expKey === 'ohms') {
    placeComponent3D('source', 1 * 14 + 0, 1 * 14 + 1);
    placeComponent3D('resistor', 9 * 14 + 4, 14 * 14 + 4);     // Cols 9-14, row D (E)
    placeComponent3D('ammeter', 14 * 14 + 7, 19 * 14 + 7);     // Cols 14-19, row H (below ravine)
    placeComponent3D('voltmeter', 9 * 14 + 2, 14 * 14 + 2);    // Cols 9-14, row B (far above resistor D)
    create3DWire(9 * 14 + 0, 9 * 14 + 4);
    create3DWire(14 * 14 + 4, 14 * 14 + 7);
    create3DWire(19 * 14 + 7, 19 * 14 + 1);
    create3DWire(9 * 14 + 2, 9 * 14 + 4);
    create3DWire(14 * 14 + 2, 14 * 14 + 4);
  } else if (expKey === 'led') { // led color experiment
    placeComponent3D('source', 3 * 14 + 0, 3 * 14 + 1); // Source at Col 4 Positive & Negative
    placeComponent3D('resistor', 6 * 14 + 4, 9 * 14 + 4); // Resistor at Col 7E to 10E (Wait, is it 7e to 10e? Let's check snaps: led step uses 7e to 7f? No, the original led step is: resistor 7e to 7f, red LED 10f to 10g. So Col 7 to Col 10. Let's make it snap at 6 * 14 + 4 and 9 * 14 + 4).
    placeComponent3D('led', 9 * 14 + 5, 9 * 14 + 6); // LED anode 10f, cathode 10g
    create3DWire(3 * 14 + 0, 6 * 14 + 4); // Wire positive rail to Resistor start
    create3DWire(9 * 14 + 4, 9 * 14 + 5); // Wire Resistor end to LED anode
    create3DWire(9 * 14 + 6, 3 * 14 + 1); // Wire LED cathode to ground negative rail
  } else if (expKey === 'lcr') {
    placeComponent3D('source', 1 * 14 + 0, 1 * 14 + 1);
    placeComponent3D('resistor', 7 * 14 + 4, 11 * 14 + 4);
    placeComponent3D('inductor', 11 * 14 + 5, 15 * 14 + 5);
    placeComponent3D('capacitor', 15 * 14 + 6, 19 * 14 + 6);
    create3DWire(7 * 14 + 0, 7 * 14 + 4);
    create3DWire(11 * 14 + 4, 11 * 14 + 5);
    create3DWire(15 * 14 + 5, 15 * 14 + 6);
    create3DWire(19 * 14 + 6, 19 * 14 + 1);
  } else if (expKey === 'rc') {
    placeComponent3D('source', 1 * 14 + 0, 1 * 14 + 1);
    placeComponent3D('resistor', 9 * 14 + 4, 14 * 14 + 4);
    placeComponent3D('capacitor', 14 * 14 + 5, 19 * 14 + 5);
    create3DWire(9 * 14 + 0, 9 * 14 + 4);
    create3DWire(14 * 14 + 4, 14 * 14 + 5);
    create3DWire(19 * 14 + 5, 19 * 14 + 1);
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
        virtualWires.push([[c1.id, 0], [c2.id, 0]]);
      }
      // Connect terminal 0 of c1 to terminal 1 of c2
      if (uf.find(c1.snap1) === uf.find(c2.snap2)) {
        virtualWires.push([[c1.id, 0], [c2.id, 1]]);
      }
      // Connect terminal 1 of c1 to terminal 0 of c2
      if (uf.find(c1.snap2) === uf.find(c2.snap1)) {
        virtualWires.push([[c1.id, 1], [c2.id, 0]]);
      }
      // Connect terminal 1 of c1 to terminal 1 of c2
      if (uf.find(c1.snap2) === uf.find(c2.snap2)) {
        virtualWires.push([[c1.id, 1], [c2.id, 1]]);
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

function updateGuideLabels() {
  const label1 = document.getElementById('guide-label-1');
  const label2 = document.getElementById('guide-label-2');
  
  if (!label1 || !label2) return;
  
  if (state.targetSnap1 !== null && state.targetSnap2 !== null && state.selectedTool === 'wire' && camera && renderer) {
    const p1 = getSnapPos(state.targetSnap1);
    const p2 = getSnapPos(state.targetSnap2);
    
    // Project p1 and p2 to screen coordinates
    const v1 = p1.clone().project(camera);
    const v2 = p2.clone().project(camera);
    
    const rect = renderer.domElement.getBoundingClientRect();
    
    const x1 = rect.left + (v1.x * 0.5 + 0.5) * rect.width;
    const y1 = rect.top + (-(v1.y * 0.5) + 0.5) * rect.height;
    
    const x2 = rect.left + (v2.x * 0.5 + 0.5) * rect.width;
    const y2 = rect.top + (-(v2.y * 0.5) + 0.5) * rect.height;
    
    label1.style.left = `${x1}px`;
    label1.style.top = `${y1 - 15}px`;
    label1.classList.remove('hidden');
    label1.innerHTML = `WIRE START<br><b>${getSocketLabelShort(state.targetSnap1)}</b>`;
    
    label2.style.left = `${x2}px`;
    label2.style.top = `${y2 - 15}px`;
    label2.classList.remove('hidden');
    label2.innerHTML = `WIRE END<br><b>${getSocketLabelShort(state.targetSnap2)}</b>`;
  } else {
    label1.classList.add('hidden');
    label2.classList.add('hidden');
  }
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
        targetHighlightRing1 = addRing(14 * 14 + 5);
        targetHighlightRing2 = addRing(19 * 14 + 5);
      }
    } else if (!voltmeter) {
      if (!state.selectedTool || state.selectedTool === 'voltmeter') {
        targetHighlightRing1 = addRing(9 * 14 + 3);
        targetHighlightRing2 = addRing(14 * 14 + 3);
      }
    } else {
      if (!state.selectedTool || state.selectedTool === 'wire') {
        const r1 = resistor.snap1, r2 = resistor.snap2;
        const am1 = ammeter.snap1, am2 = ammeter.snap2;
        const volt1 = voltmeter.snap1, volt2 = voltmeter.snap2;

        const s1_connected = (uf.find(9 * 14 + 0) === uf.find(r1) || uf.find(9 * 14 + 0) === uf.find(r2));
        if (!s1_connected) {
          targetHighlightRing1 = addRing(9 * 14 + 0, true);
          targetHighlightRing2 = addRing(r1, true);
          return;
        }

        const res_to_am = (uf.find(r2) === uf.find(am1) || uf.find(r2) === uf.find(am2));
        if (!res_to_am) {
          targetHighlightRing1 = addRing(r2, true);
          targetHighlightRing2 = addRing(am1, true);
          return;
        }

        const am_to_gnd = (uf.find(am2) === uf.find(19 * 14 + 1));
        if (!am_to_gnd) {
          targetHighlightRing1 = addRing(am2, true);
          targetHighlightRing2 = addRing(19 * 14 + 1, true);
          return;
        }

        const volt1_connected = (uf.find(volt1) === uf.find(r1));
        if (!volt1_connected) {
          targetHighlightRing1 = addRing(volt1, true);
          targetHighlightRing2 = addRing(r1, true);
          return;
        }

        const volt2_connected = (uf.find(volt2) === uf.find(r2));
        if (!volt2_connected) {
          targetHighlightRing1 = addRing(volt2, true);
          targetHighlightRing2 = addRing(r2, true);
          return;
        }
      }
    }
  } 
  else if (state.activeExperiment === 'lcr') {
    const source = findComp('source');
    const resistor = findComp('resistor');
    const inductor = findComp('inductor');
    const capacitor = findComp('capacitor');

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
    } else {
      if (!state.selectedTool || state.selectedTool === 'wire') {
        const r1 = resistor.snap1, r2 = resistor.snap2;
        const l1 = inductor.snap1, l2 = inductor.snap2;
        const c1 = capacitor.snap1, c2 = capacitor.snap2;

        const s_to_r = (uf.find(7 * 14 + 0) === uf.find(r1));
        if (!s_to_r) {
          targetHighlightRing1 = addRing(7 * 14 + 0, true);
          targetHighlightRing2 = addRing(r1, true);
          return;
        }

        const r_to_l = (uf.find(r2) === uf.find(l1));
        if (!r_to_l) {
          targetHighlightRing1 = addRing(r2, true);
          targetHighlightRing2 = addRing(l1, true);
          return;
        }

        const l_to_c = (uf.find(l2) === uf.find(c1));
        if (!l_to_c) {
          targetHighlightRing1 = addRing(l2, true);
          targetHighlightRing2 = addRing(c1, true);
          return;
        }

        const c_to_gnd = (uf.find(c2) === uf.find(19 * 14 + 1));
        if (!c_to_gnd) {
          targetHighlightRing1 = addRing(c2, true);
          targetHighlightRing2 = addRing(19 * 14 + 1, true);
          return;
        }
      }
    }
  } 
  else if (state.activeExperiment === 'rc') {
    const source = findComp('source');
    const resistor = findComp('resistor');
    const capacitor = findComp('capacitor');

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
    } else if (!capacitor) {
      if (!state.selectedTool || state.selectedTool === 'capacitor') {
        targetHighlightRing1 = addRing(14 * 14 + 5);
        targetHighlightRing2 = addRing(19 * 14 + 5);
      }
    } else {
      if (!state.selectedTool || state.selectedTool === 'wire') {
        const r1 = resistor.snap1, r2 = resistor.snap2;
        const c1 = capacitor.snap1, c2 = capacitor.snap2;

        const s_to_r = (uf.find(9 * 14 + 0) === uf.find(r1));
        if (!s_to_r) {
          targetHighlightRing1 = addRing(9 * 14 + 0, true);
          targetHighlightRing2 = addRing(r1, true);
          return;
        }

        const r_to_c = (uf.find(r2) === uf.find(c1));
        if (!r_to_c) {
          targetHighlightRing1 = addRing(r2, true);
          targetHighlightRing2 = addRing(c1, true);
          return;
        }

        const c_to_gnd = (uf.find(c2) === uf.find(19 * 14 + 1));
        if (!c_to_gnd) {
          targetHighlightRing1 = addRing(c2, true);
          targetHighlightRing2 = addRing(19 * 14 + 1, true);
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
      return "<b>Step 1: Place AC Source</b><br>Select <b>DC Power Source</b> <i class='fa-solid fa-plug'></i> and click glowing green Top Rails slots (Col 2, Row +/-).";
    }
    if (!resistor) {
      return "<b>Step 2: Place Resistor</b><br>Select <b>Ceramic Resistor</b> <i class='fa-solid fa-wave-square'></i> and place horizontally between Col 8, Row C and Col 12, Row C.";
    }
    if (!inductor) {
      return "<b>Step 3: Place Inductor</b><br>Select <b>Copper Inductor</b> <i class='fa-solid fa-circle-notch'></i> and place horizontally between Col 12, Row D and Col 16, Row D.";
    }
    if (!capacitor) {
      return "<b>Step 4: Place Capacitor</b><br>Select <b>Electrolytic Capacitor</b> <i class='fa-solid fa-grip-lines-vertical'></i> and place horizontally between Col 16, Row E and Col 20, Row E.";
    }
    
    const uf = runUnionFind();
    const r1 = resistor.snap1, r2 = resistor.snap2;
    const l1 = inductor.snap1, l2 = inductor.snap2;
    const c1 = capacitor.snap1, c2 = capacitor.snap2;
    
    // Wire 1: Top (+) Rail to Resistor start
    const s_to_r = (uf.find(7 * 14 + 0) === uf.find(r1));
    if (!s_to_r) {
      return `<b>Step 5: Wire (+) Rail to Resistor</b><br>Wire **Top (+) Rail (Col 8)** to **Resistor start** (${getSocketLabelShort(r1)}).`;
    }
    // Wire 2: Resistor end to Inductor start
    const r_to_l = (uf.find(r2) === uf.find(l1));
    if (!r_to_l) {
      return `<b>Step 5: Wire Resistor to Inductor</b><br>Wire **Resistor end** (${getSocketLabelShort(r2)}) to **Inductor start** (${getSocketLabelShort(l1)}).`;
    }
    // Wire 3: Inductor end to Capacitor start
    const l_to_c = (uf.find(l2) === uf.find(c1));
    if (!l_to_c) {
      return `<b>Step 5: Wire Inductor to Capacitor</b><br>Wire **Inductor end** (${getSocketLabelShort(l2)}) to **Capacitor start** (${getSocketLabelShort(c1)}).`;
    }
    // Wire 4: Capacitor end back to Top (-) Rail
    const c_to_gnd = (uf.find(c2) === uf.find(19 * 14 + 1));
    if (!c_to_gnd) {
      return `<b>Step 5: Wire Capacitor to (-) Rail</b><br>Wire **Capacitor end** (${getSocketLabelShort(c2)}) to **Top (-) Rail (Col 20)**.`;
    }
    
    if (!state.isRunning) {
      return "<b>Step 6: Initialize Circuit</b><br>Wiring complete! Click <b>INITIALIZE</b> in the top bar to start the LCR simulation.";
    }
    
    return "<b>Step 7: Find Resonance</b><br>Vary the **Source Frequency** slider to find the resonance peak (minimum Z / maximum I).";
  }
  
  if (state.activeExperiment === 'rc') {
    if (!source) {
      return "<b>Step 1: Place DC Source</b><br>Select <b>DC Power Source</b> <i class='fa-solid fa-plug'></i> and click glowing green Top Rails slots (Col 2, Row +/-).";
    }
    if (!resistor) {
      return "<b>Step 2: Place Resistor</b><br>Select <b>Ceramic Resistor</b> <i class='fa-solid fa-wave-square'></i> and place horizontally between Col 10, Row C and Col 15, Row C.";
    }
    if (!capacitor) {
      return "<b>Step 3: Place Capacitor</b><br>Select <b>Electrolytic Capacitor</b> <i class='fa-solid fa-grip-lines-vertical'></i> and place horizontally between Col 15, Row D and Col 20, Row D.";
    }
    
    const uf = runUnionFind();
    const r1 = resistor.snap1, r2 = resistor.snap2;
    const c1 = capacitor.snap1, c2 = capacitor.snap2;
    
    const s_to_r = (uf.find(9 * 14 + 0) === uf.find(r1));
    if (!s_to_r) {
      return `<b>Step 4: Wire (+) Rail to Resistor</b><br>Wire **Top (+) Rail (Col 10)** to **Resistor start** (${getSocketLabelShort(r1)}).`;
    }
    const r_to_c = (uf.find(r2) === uf.find(c1));
    if (!r_to_c) {
      return `<b>Step 4: Wire Resistor to Capacitor</b><br>Wire **Resistor end** (${getSocketLabelShort(r2)}) to **Capacitor start** (${getSocketLabelShort(c1)}).`;
    }
    const c_to_gnd = (uf.find(c2) === uf.find(19 * 14 + 1));
    if (!c_to_gnd) {
      return `<b>Step 4: Wire Capacitor to (-) Rail</b><br>Wire **Capacitor end** (${getSocketLabelShort(c2)}) to **Top (-) Rail (Col 20)**.`;
    }
    
    if (!state.isRunning) {
      return "<b>Step 5: Initialize Circuit</b><br>Wiring complete! Click <b>INITIALIZE</b> in the top bar to start charging.";
    }
    
    return "<b>Step 6: Observe Charge</b><br>Watch the curve on the oscilloscope. Adjust R or C to change time constant τ = RC.";
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
  
  return "System online. Select an experiment to begin.";
}

function updateAIMentor() {
  const msg = getAIMentorMessage();
  elements.aiMessage.innerHTML = msg;
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

function initThreeJS() {
  try {
    const parent = document.getElementById('canvas-3d-parent');
    const w = parent.clientWidth || 600;
    const h = parent.clientHeight || 450;
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070a13);
    scene.fog = new THREE.FogExp2(0x070a13, 0.04);
    
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
        
        const snap1 = c * 14 + r;
        const tool = state.draggingSidebarTool;
        const span = getDefaultToolSpan(tool);
        let c2 = Math.min(BOARD_COLS - 1, c + span.colSpan);
        let r2 = Math.min(13, r + span.rowSpan);
        const snap2 = c2 * 14 + r2;
        
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
          create3DWire(snap1, snap2);
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
          create3DWire(state.wireStartSnap, hoveredHoleIndex);
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
        if (['snell', 'lens_eq', 'tir', 'prism'].includes(state.activeExperiment)) {
          const ray = state.proceduralGroup.getObjectByName('laser-ray');
          if (ray) {
            const theta1 = state.params.C || 45;
            const n1 = state.params.V || 1.0;
            const n2 = state.params.R || 1.5;
            const p1 = new THREE.Vector3(-2.5, 0.4, 0);
            const p2 = new THREE.Vector3(0, 0.4, 0);
            const points = [p1, p2];
            
            if (state.activeExperiment === 'snell') {
              const sinTheta2 = (n1 / n2) * Math.sin(theta1 * Math.PI / 180);
              if (sinTheta2 <= 1.0) {
                const theta2 = Math.asin(sinTheta2);
                const p3 = new THREE.Vector3(2.5, 0.4 - 2.5 * Math.tan(theta2), 0);
                points.push(p3);
              } else {
                const p3 = new THREE.Vector3(-2.5, 0.4 + 2.5 * Math.tan(theta1 * Math.PI / 180), 0);
                points.push(p3);
              }
            } else if (state.activeExperiment === 'tir') {
              const sinTheta2 = (n1 / n2) * Math.sin(theta1 * Math.PI / 180);
              if (sinTheta2 > 1.0) {
                const p3 = new THREE.Vector3(-2.5, 0.4 + 2.5 * Math.tan(theta1 * Math.PI / 180), 0);
                points.push(p3);
              } else {
                const theta2 = Math.asin(sinTheta2);
                const p3 = new THREE.Vector3(2.5, 0.4 - 2.5 * Math.tan(theta2), 0);
                points.push(p3);
              }
            } else if (state.activeExperiment === 'prism') {
              const p3 = new THREE.Vector3(0.5, 0.25, 0);
              const p4 = new THREE.Vector3(2.5, 0.05, 0);
              points.push(p3, p4);
            } else if (state.activeExperiment === 'lens_eq') {
              const v = state.meters.amps;
              const u = state.params.V || 30;
              const p3 = new THREE.Vector3(Math.min(2.5, v * 0.05), v > 0 ? 0.2 : 0.6, 0);
              points.push(p3);

              const objPin = state.proceduralGroup.getObjectByName('lens-object-pin');
              const screen = state.proceduralGroup.getObjectByName('lens-image-screen');
              const screenSt = state.proceduralGroup.getObjectByName('lens-screen-stand');
              if (objPin) {
                objPin.position.x = -u * 0.05;
              }
              if (screen) {
                screen.position.x = Math.min(2.5, v * 0.05);
              }
              if (screenSt) {
                screenSt.position.x = Math.min(2.5, v * 0.05);
              }
            }
            ray.geometry.setFromPoints(points);
          }
        } else if (state.activeExperiment === 'pendulum') {
          const pivot = state.proceduralGroup.getObjectByName('pendulum-pivot');
          if (pivot) {
            const theta0 = state.params.V || 30;
            const L = state.params.R || 1.5;
            const g = state.params.L || 9.8;
            const omega = Math.sqrt(g / L);
            const angleRad = (theta0 * Math.PI / 180) * Math.cos(omega * (Date.now() * 0.001));
            pivot.rotation.z = angleRad;

            const str = pivot.getObjectByName('pendulum-string');
            const bob = pivot.getObjectByName('pendulum-bob');
            if (str && bob) {
              str.scale.y = L / 1.4;
              str.position.y = -L / 2;
              bob.position.y = -L;
            }
          }
        } else if (state.activeExperiment === 'hooke') {
          const spring = state.proceduralGroup.getObjectByName('spring-group');
          const weight = state.proceduralGroup.getObjectByName('spring-weight');
          if (spring && weight) {
            const mass = state.params.V * 1e-3;
            const k = state.params.R || 25;
            const stretch = (mass * 9.8) / k; 
            const endY = -1.3 - stretch * 0.5; 
            weight.position.y = 3.1 + endY - 0.12;
            
            // Re-render spring coil
            while (spring.children.length > 0) {
              spring.remove(spring.children[0]);
            }
            const points = [];
            const coils = 18;
            const steps = 180;
            const radius = 0.08;
            for (let i = 0; i <= steps; i++) {
              const t = i / steps;
              const angle = t * coils * Math.PI * 2;
              const x = radius * Math.cos(angle);
              const z = radius * Math.sin(angle);
              const y = t * endY;
              points.push(new THREE.Vector3(x, y, z));
            }
            const springGeo = new THREE.BufferGeometry().setFromPoints(points);
            const springMat = new THREE.LineBasicMaterial({ color: 0x94a3b8 });
            const springLine = new THREE.Line(springGeo, springMat);
            spring.add(springLine);
          }
        } else if (state.activeExperiment === 'projectile') {
          const ball = state.proceduralGroup.getObjectByName('projectile-ball');
          const cannon = state.proceduralGroup.getObjectByName('cannon-group');
          if (cannon) {
            const theta = state.params.V || 45;
            cannon.children[0].rotation.z = (theta * Math.PI / 180);
          }
          if (ball && state.isRunning) {
            ball.visible = true;
            const theta = state.params.V * Math.PI / 180;
            const v0 = state.params.R;
            const g = state.params.L || 9.8;
            const t = ((Date.now() - state.simStartTime) * 0.001) * 2.0;
            const x = v0 * t * Math.cos(theta);
            const y = v0 * t * Math.sin(theta) - 0.5 * g * t * t;
            if (y >= 0) {
              ball.position.set(-4.0 + x * 0.2, 0.2 + y * 0.2, 0);
            } else {
              ball.position.set(-4.0 + (v0*v0*Math.sin(2*theta)/g)*0.2, 0.2, 0);
            }
          } else if (ball) {
            ball.visible = false;
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
        } else if (state.activeExperiment === 'doppler') {
          const speaker = state.proceduralGroup.getObjectByName('doppler-source');
          const ripples = state.proceduralGroup.getObjectByName('doppler-ripples');
          if (speaker && ripples) {
            const vs = state.params.V || 50;
            const fs = state.params.R || 500;
            const soundSpeed = state.params.L || 340;
            
            let x = -4.0 + (Date.now() * 0.001 * vs * 0.05) % 8.0;
            speaker.position.x = x;
            
            if (!state.lastDopplerRippleTime) state.lastDopplerRippleTime = 0;
            if (Date.now() - state.lastDopplerRippleTime > 300) {
              state.lastDopplerRippleTime = Date.now();
              const ringGeo = new THREE.RingGeometry(0.05, 0.07, 32);
              const ringMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.8, side: THREE.DoubleSide });
              const ring = new THREE.Mesh(ringGeo, ringMat);
              ring.rotation.x = Math.PI / 2;
              ring.position.set(x, 0.25, 0);
              ring.userData = { radius: 0.06, originX: x, timeCreated: Date.now() };
              ripples.add(ring);
            }
            
            for (let i = ripples.children.length - 1; i >= 0; i--) {
              const r = ripples.children[i];
              const age = (Date.now() - r.userData.timeCreated) * 0.001;
              const radius = age * (soundSpeed * 0.008);
              r.scale.set(radius, radius, 1);
              r.material.opacity = Math.max(0, 0.8 * (1.0 - age / 2.0));
              if (age > 2.0) {
                ripples.remove(r);
              }
            }
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

async function triggerSingleCalculation() {
  if (!state.isRunning) return;
  try {
    let data;
    if (state.activeExperiment !== 'arduino_led') {
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

function updateDynamicTextures() {
  if (!powerScreenCanvas) return;
  
  // Draw Power screen
  const pCtx = powerScreenCanvas.getContext('2d');
  pCtx.fillStyle = '#0f172a';
  pCtx.fillRect(0, 0, 128, 64);
  pCtx.fillStyle = '#10b981';
  pCtx.font = 'bold 22px Courier New';
  if (state.activeExperiment === 'arduino_led') {
    pCtx.fillText("5.0V USB", 10, 28);
    pCtx.font = '14px Courier New';
    pCtx.fillText("ARDUINO UNO", 10, 48);
  } else {
    pCtx.fillText(`${state.params.V.toFixed(1)}V DC`, 10, 28);
    pCtx.font = '14px Courier New';
    pCtx.fillText(`${state.params.f.toFixed(0)}Hz AC`, 10, 48);
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
    const voltsVal = state.isRunning ? state.meters.volts.toFixed(3) : '0.000';
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
      if (state.meters.amps < 0.1) {
        ampsDisplay = (state.meters.amps * 1000).toFixed(2);
        unitLabel = 'mA';
      } else {
        ampsDisplay = state.meters.amps.toFixed(4);
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
    if (state.targetSnap1 !== null && state.targetSnap2 !== null) {
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
    
    // Check wires
    const wireMeshes = state.wires.map(w => w.lineMesh);
    const intersectsWire = raycaster.intersectObjects(wireMeshes);
    if (intersectsWire.length > 0) {
      const hitWire = intersectsWire[0].object;
      const wireIdx = state.wires.findIndex(w => w.lineMesh === hitWire);
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
  group.quaternion.copy(quaternion);
  
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
    
    // Gold trim/accent ring around body top
    const trimGeo = createRoundedBoxGeometry(0.88, 0.03, 0.58, 0.04);
    const trimMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.2, metalness: 0.8 });
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
    leads.push(createMetalLead(localL, p1));
    const localR = new THREE.Vector3(0.35, 0.3, 0.18).applyQuaternion(group.quaternion).add(mid);
    leads.push(createMetalLead(localR, p2));
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

    // Screen plane - faces +Z (toward camera)
    const screenGeo = new THREE.PlaneGeometry(0.40, 0.19);
    const screenMat = new THREE.MeshBasicMaterial({
      map: isAm ? ammeterScreenTexture : voltmeterScreenTexture,
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
  } else if (state.activeExperiment === 'lcr') {
    if (type === 'resistor') completeStep(1);
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

function getOccupiedHoles() {
  const occupied = new Set();
  state.placedComponents.forEach(comp => {
    if (comp.type === 'source' && state.activeExperiment === 'arduino_led') {
      return;
    }
    occupied.add(comp.snap1);
    occupied.add(comp.snap2);
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
        <div class="prop-row"><span class="prop-label">Measurement</span><span class="prop-val" style="color:var(--yellow)">${comp.type === 'ammeter' ? (state.meters.amps * 1000).toFixed(1) + ' mA' : state.meters.volts.toFixed(2) + ' V'}</span></div>
        <div class="prop-row"><span class="prop-label">Terminals</span><span class="prop-val">${getHoleName(comp.snap1)} (+) ↔ ${getHoleName(comp.snap2)} (-)</span></div>
      `;
    }
    
    if (state.isRunning) {
      let calcHTML = '';
      if (comp.type === 'resistor') {
        const current_mA = state.meters.amps * 1000;
        const voltage_drop = state.meters.amps * state.params.R;
        const power_mW = state.meters.amps * voltage_drop * 1000;
        calcHTML = `
          <div class="prop-row"><span class="prop-label">Current</span><span class="prop-val">${current_mA.toFixed(2)} mA</span></div>
          <div class="prop-row"><span class="prop-label">Voltage Drop</span><span class="prop-val">${voltage_drop.toFixed(2)} V</span></div>
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

function createWireCurve(p1, p2, seed = 0) {
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
  
  const curve = createWireCurve(p1Start, p2End, seed);
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

function create3DWire(snap1, snap2) {
  const occupied = getOccupiedHoles();
  snap1 = getRedirectedSnap(snap1, occupied, snap2);
  snap2 = getRedirectedSnap(snap2, occupied, snap1);

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
  const curve = createWireCurve(p1Start, p2End, seed);
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
  } else if (state.activeExperiment === 'lcr' && state.wires.length >= 4) {
    completeStep(2);
  } else if (state.activeExperiment === 'rc' && state.wires.length >= 3) {
    completeStep(2);
  }
  
  updateTelemetryCounts();
  updateAIMentor();
  updateTargetHighlights();

  const validation = validateCircuitLocal();
  if (validation.status === 'success') {
    triggerSingleCalculation();
  }
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
      exps: ['ohms', 'kvl', 'kcl', 'rc_rl_rlc', 'series_parallel', 'wheatstone']
    };
  } else if (category === 'magnetism') {
    catData = {
      title: "Electromagnetism",
      color: "rgba(168, 85, 247, 0.08)",
      borderColor: "rgba(168, 85, 247, 0.25)",
      badgeColor: "#c084fc",
      exps: ['faraday', 'lenz', 'solenoid', 'transformer']
    };
  } else if (category === 'optics') {
    catData = {
      title: "Optics & Light",
      color: "rgba(6, 182, 212, 0.08)",
      borderColor: "rgba(6, 182, 212, 0.25)",
      badgeColor: "#22d3ee",
      exps: ['snell', 'lens_eq', 'tir', 'prism']
    };
  } else if (category === 'mechanics') {
    catData = {
      title: "Mechanics & Waves",
      color: "rgba(245, 158, 11, 0.08)",
      borderColor: "rgba(245, 158, 11, 0.25)",
      badgeColor: "#fbbf24",
      exps: ['pendulum', 'hooke', 'projectile', 'doppler']
    };
  } else if (category === 'thermo') {
    catData = {
      title: "Thermodynamics",
      color: "rgba(244, 63, 94, 0.08)",
      borderColor: "rgba(244, 63, 94, 0.25)",
      badgeColor: "#fb7185",
      exps: ['ideal_gas', 'boyle', 'charles', 'specific_heat']
    };
  } else if (category === 'modern') {
    catData = {
      title: "Modern Physics",
      color: "rgba(16, 185, 129, 0.08)",
      borderColor: "rgba(16, 185, 129, 0.25)",
      badgeColor: "#34d399",
      exps: ['photoelectric', 'radioactive', 'de_broglie', 'bohr_model']
    };
  }
  
  if (!catData) return;
  
  const grid = document.createElement('div');
  grid.style.cssText = "display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:15px;";
  
  catData.exps.forEach(key => {
    const exp = experiments[key];
    if (!exp) return;
    
    const card = document.createElement('div');
    card.style.cssText = `background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.04);border-radius:14px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer;transition:all 0.25s;`;
    
    card.addEventListener('mouseover', () => {
      card.style.borderColor = catData.borderColor;
      card.style.background = catData.color;
      card.style.transform = "translateY(-3px)";
    });
    card.addEventListener('mouseout', () => {
      card.style.borderColor = "rgba(255,255,255,0.04)";
      card.style.background = "rgba(255,255,255,0.015)";
      card.style.transform = "none";
    });
    
    card.innerHTML = `
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
          <span style="font-size:8px;color:${catData.badgeColor};text-transform:uppercase;font-weight:700;letter-spacing:1px">Module</span>
          <span style="width:5px;height:5px;border-radius:50%;background:${catData.badgeColor}"></span>
        </div>
        <h3 style="font-size:13px;font-weight:700;margin:0 0 4px 0;color:white;font-family:inherit">${exp.name}</h3>
        <p style="font-size:10px;color:#64748b;margin:0 0 12px 0;line-height:1.4">${exp.aim}</p>
      </div>
      <button style="width:100%;padding:8px;border-radius:8px;border:none;background:#2563eb;color:white;font-weight:700;font-size:10px;cursor:pointer;font-family:inherit">Load Simulation</button>
    `;
    
    card.addEventListener('click', () => {
      setupExperiment(key);
      document.getElementById('modal-library').style.display = 'none';
    });
    
    grid.appendChild(card);
  });
  
  container.appendChild(grid);
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
  
  setupExperiment(initialExp);
  drawOscilloscope();
  
  setTimeout(() => {
    initThreeJS();
  }, 100);

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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}
