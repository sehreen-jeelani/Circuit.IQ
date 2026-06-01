import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Trash2, 
  HelpCircle, 
  RotateCw, 
  Sparkles, 
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Flame,
  Info
} from 'lucide-react';

// Socket types
type SocketType = 'plus' | 'minus' | 'grid';

interface SocketCoords {
  type: SocketType;
  row: number; // grid: 0..4 (A..E), rails: always 0
  col: number; // 0..21 (columns 1..22)
}

// Placed Component type
interface PlacedComponent {
  id: string;
  type: 'led' | 'resistor' | 'wire' | 'capacitor';
  color?: string; // for LED / wire
  value?: string; // resistor resistance
  from: SocketCoords;
  to: SocketCoords;
  lit?: boolean; // dynamic state computed by trace
}

// Graph Node for conductivity trace
interface GraphNode {
  id: string; // "+", "-", "col_0"..."col_21"
  neighbors: { neighborId: string; component: PlacedComponent }[];
}

export default function InteractiveBreadboard() {
  const [selectedTool, setSelectedTool] = useState<'led' | 'resistor' | 'wire' | 'capacitor' | 'select' | 'eraser'>('led');
  const [ledColor, setLedColor] = useState<string>('red');
  const [resistorValue, setResistorValue] = useState<string>('220Ω');
  const [wireColor, setWireColor] = useState<string>('blue');
  const [placedComponents, setPlacedComponents] = useState<PlacedComponent[]>([
    // A pre-loaded tutorial loop (Positive Rail to col 3 via wire, col 3 to col 8 via LED, col 8 to Negative Rail via resistor)
    {
      id: 'pre-wire',
      type: 'wire',
      color: 'red',
      from: { type: 'plus', row: 0, col: 2 },
      to: { type: 'grid', row: 0, col: 2 },
      lit: false
    },
    {
      id: 'pre-led',
      type: 'led',
      color: 'red',
      from: { type: 'grid', row: 0, col: 2 },
      to: { type: 'grid', row: 0, col: 8 },
      lit: false
    },
    {
      id: 'pre-resistor',
      type: 'resistor',
      value: '220Ω',
      from: { type: 'grid', row: 3, col: 8 }, // notice column 8 is shared with led to complete connection! Standard breadboard vertical connection row A to E
      to: { type: 'minus', row: 0, col: 8 },
      lit: false
    }
  ]);

  const [pendingFrom, setPendingFrom] = useState<SocketCoords | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showHelp, setShowHelp] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);

  // SVG Geometry constants
  const COLS_COUNT = 22;
  const GRID_ROWS = 5;
  const colSpacing = 28;
  const leftMargin = 50;
  
  const getX = (col: number) => leftMargin + col * colSpacing;
  
  const getY = (type: SocketType, row: number) => {
    if (type === 'plus') return 35;
    if (type === 'minus') return 60;
    // Row 0 is A, Row 4 is E
    return 115 + row * 24;
  };

  // Human-readable labels
  const getSocketLabel = (coords: SocketCoords) => {
    const colLabel = coords.col + 1;
    if (coords.type === 'plus') return `(+) Rail, Pin ${colLabel}`;
    if (coords.type === 'minus') return `(-) Rail, Pin ${colLabel}`;
    const rowLetters = ['A', 'B', 'C', 'D', 'E'];
    return `Grid Row ${rowLetters[coords.row]}, Col ${colLabel}`;
  };

  // Check if two coords are identical
  const isSameSocket = (c1: SocketCoords, c2: SocketCoords) => {
    return c1.type === c2.type && c1.row === c2.row && c1.col === c2.col;
  };

  // Convert socket to a graph node representation
  const getPoolId = (coords: SocketCoords): string => {
    if (coords.type === 'plus') return '+';
    if (coords.type === 'minus') return '-';
    // Breadboard logic: all rows A..E in the same column are connected
    return `col_${coords.col}`;
  };

  // Live trace the electrical paths when components or power state changes
  const { litCompIds, circuitStatus } = useMemo(() => {
    // 1. Build adjacency graph of nodes: '+', '-', 'col_0'..'col_21'
    const graph: { [id: string]: GraphNode } = {
      '+': { id: '+', neighbors: [] },
      '-': { id: '-', neighbors: [] }
    };
    for (let c = 0; c < COLS_COUNT; c++) {
      graph[`col_${c}`] = { id: `col_${c}`, neighbors: [] };
    }

    // Connect nodes through placed components
    placedComponents.forEach((comp) => {
      const nodeA = getPoolId(comp.from);
      const nodeB = getPoolId(comp.to);
      if (nodeA !== nodeB) {
        graph[nodeA].neighbors.push({ neighborId: nodeB, component: comp });
        graph[nodeB].neighbors.push({ neighborId: nodeA, component: comp });
      }
    });

    // 2. Run graph search (BFS) starting from Positive Rail '+' to see what paths reach Negative Rail '-'
    const visited = new Set<string>();
    const queue: string[] = ['+'];
    visited.add('+');

    const pathMap: { [nodeId: string]: string } = {}; // To trace path backwards
    const pathEdges: { [nodeId: string]: PlacedComponent } = {};

    let pathFound = false;

    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (curr === '-') {
        pathFound = true;
        break;
      }

      const node = graph[curr];
      if (node) {
        for (const edge of node.neighbors) {
          if (!visited.has(edge.neighborId)) {
            visited.add(edge.neighborId);
            pathMap[edge.neighborId] = curr;
            pathEdges[edge.neighborId] = edge.component;
            queue.push(edge.neighborId);
          }
        }
      }
    }

    // Reconstruct the active connected paths to light up LEDs and trace wires
    const litCompIds = new Set<string>();
    const activePathComps: PlacedComponent[] = [];

    if (pathFound) {
      let nodeStr = '-';
      while (nodeStr !== '+') {
        const prevNode = pathMap[nodeStr];
        const edgeComp = pathEdges[nodeStr];
        if (edgeComp) {
          litCompIds.add(edgeComp.id);
          activePathComps.push(edgeComp);
        }
        nodeStr = prevNode;
      }
    }

    // Determine circuitStatus
    let status: { code: 'idle' | 'closed' | 'short' | 'high-res'; msg: string };
    if (pathFound) {
      // Analyze types in the active path
      const hasLED = activePathComps.some(c => c.type === 'led');
      const hasResistor = activePathComps.some(c => c.type === 'resistor');
      const onlyWiresObj = activePathComps.every(c => c.type === 'wire');

      if (onlyWiresObj) {
        status = {
          code: 'short',
          msg: '💥 SHORT-CIRCUIT DETECTED! Unrestricted direct loop between (+) and (-) can damage your gear. Add an LED or Resistor to add impedance!'
        };
      } else if (hasLED && !hasResistor) {
        status = {
          code: 'closed',
          msg: '💡 WARNING: Lit up LED directly without a current-limiting resistor! In a real lab, this LED would burn out from overcurrent!'
        };
      } else if (hasLED && hasResistor) {
        status = {
          code: 'closed',
          msg: '🌟 STABLE CLOSED CIRCUIT! Resistor restricts optimal current, feeding bright, safe illumination to your LED layout.'
        };
      } else {
        status = {
          code: 'closed',
          msg: '⚡ ACTIVE CURRENT LOOP! Path is closed and electricity is flowing freely through passive components.'
        };
      }
    } else {
      status = {
        code: 'idle',
        msg: 'No power loop detected. Click on tools and connect pins to bridge the top Positive (+) and Negative (-) rails!'
      };
    }

    return { litCompIds, circuitStatus: status };
  }, [placedComponents]);

  // Handle click on any socket hole
  const handleSocketClick = (coords: SocketCoords) => {
    if (selectedTool === 'eraser' || selectedTool === 'select') {
      return;
    }

    if (!pendingFrom) {
      // First point selected
      setPendingFrom(coords);
    } else {
      // Prevent placing on the same socket
      if (isSameSocket(pendingFrom, coords)) {
        setPendingFrom(null);
        return;
      }

      // We have from and to, place the component
      const id = `${selectedTool}-${Date.now()}`;
      const newComp: PlacedComponent = {
        id,
        type: selectedTool as PlacedComponent['type'],
        from: pendingFrom,
        to: coords,
        color: selectedTool === 'led' ? ledColor : selectedTool === 'wire' ? wireColor : undefined,
        value: selectedTool === 'resistor' ? resistorValue : undefined,
        lit: false
      };

      setPlacedComponents((prev) => [...prev, newComp]);
      setPendingFrom(null);
    }
  };

  // Keyboard Escape listener to cancel placing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPendingFrom(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Tracking cursor on the board for real-time elastic wire dragging preview
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!pendingFrom || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Erase component
  const eraseComponent = (id: string) => {
    setPlacedComponents((prev) => prev.filter((comp) => comp.id !== id));
  };

  // Reset Board completely
  const clearBoard = () => {
    setPlacedComponents([]);
    setPendingFrom(null);
  };

  // Load a demo circuit
  const loadDemo = () => {
    setPlacedComponents([
      {
        id: 'demo-wire',
        type: 'wire',
        color: 'red',
        from: { type: 'plus', row: 0, col: 1 },
        to: { type: 'grid', row: 0, col: 1 },
        lit: false
      },
      {
        id: 'demo-led',
        type: 'led',
        color: 'green',
        from: { type: 'grid', row: 0, col: 1 },
        to: { type: 'grid', row: 0, col: 12 },
        lit: false
      },
      {
        id: 'demo-resistor',
        type: 'resistor',
        value: '1kΩ',
        from: { type: 'grid', row: 4, col: 12 },
        to: { type: 'minus', row: 0, col: 12 },
        lit: false
      }
    ]);
    setPendingFrom(null);
  };

  // Render Resistor Bands based on value
  const getResistorBandsColor = (val: string) => {
    if (val === '220Ω') return ['#ef4444', '#ef4444', '#b45309']; // Red, Red, Brown
    if (val === '1kΩ') return ['#b45309', '#0284c7', '#ef4444'];   // Brown, Black, Red
    return ['#b45309', '#0284c7', '#eab308'];                     // Brown, Black, Orange (10k)
  };

  return (
    <div className="w-full bg-white dark:bg-slate-950/45 border border-slate-200/60 dark:border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col gap-6 mt-12">
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 dark:border-white/5 pb-5 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-[10px] font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-2">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span>Sandbox Lab</span>
          </div>
          <h3 className="text-2xl font-display font-medium text-slate-900 dark:text-white flex items-center gap-2">
            Quantum Breadboard Simulator
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl font-light">
            An interactive prototyping shield. Connect rails, wire components, and construct complete, live electronic circuits dynamically right on the grid below.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={loadDemo}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/20 transition-all duration-200 flex items-center gap-1.5"
          >
            <RotateCw className="w-3.5 h-3.5" />
            Load Sample Loop
          </button>
          <button
            onClick={clearBoard}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all duration-200 flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Layout
          </button>
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="p-1.5 rounded-xl border border-slate-200 dark:border-white/10 dark:text-slate-400 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
            title="Help Manual"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Manual Instructions panel */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200/50 dark:border-white/5 p-4 text-xs space-y-2 text-slate-600 dark:text-slate-400 overflow-hidden relative z-10"
          >
            <span className="font-bold text-slate-800 dark:text-white flex items-center gap-1">
              <Info className="w-4 h-4 text-indigo-500" /> Breadboard Prototyping Quick Guide
            </span>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li><strong>Rails:</strong> Top rails represent a 9V Battery power supply. The red rail (+) is hot; the blue rail (-) goes to ground.</li>
              <li><strong>Grid:</strong> Each of the vertical column channels (1 to 22) is fully tied underneath. Pins A through E in the same column are electrically connected.</li>
              <li><strong>Placing:</strong> Pick a component below, click once on a breadboard pin to anchor, then click on another pin to span the connection.</li>
              <li><strong>Canceling:</strong> Hit your keyboard <kbd className="px-1.5 py-0.5 rounded border dark:border-slate-800 font-mono font-bold bg-white dark:bg-slate-950">ESC</kbd> to reset the placement path.</li>
              <li><strong>Removing:</strong> Select the Eraser tool and click directly on any element to wipe it.</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tool Selector Dashboard */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/50 dark:border-white/5 relative z-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black mr-2">Components Tray</span>
          
          {/* LED Tool */}
          <button
            onClick={() => setSelectedTool('led')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${selectedTool === 'led' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-400 border border-slate-200/80 dark:border-white/5 hover:border-slate-300'}`}
          >
            <Lightbulb className={`w-3.5 h-3.5 ${selectedTool === 'led' ? 'text-indigo-200' : 'text-indigo-500'}`} />
            LED Diode
          </button>

          {/* Resistor Tool */}
          <button
            onClick={() => setSelectedTool('resistor')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${selectedTool === 'resistor' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-400 border border-slate-200/80 dark:border-white/5 hover:border-slate-300'}`}
          >
            <Zap className={`w-3.5 h-3.5 ${selectedTool === 'resistor' ? 'text-indigo-200' : 'text-amber-500'}`} />
            Resistor
          </button>

          {/* Jumper Wire */}
          <button
            onClick={() => setSelectedTool('wire')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${selectedTool === 'wire' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-400 border border-slate-200/80 dark:border-white/5 hover:border-slate-300'}`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${selectedTool === 'wire' ? 'text-indigo-200' : 'text-green-500'}`} />
            Jumper Wire
          </button>

          <div className="w-px h-6 bg-slate-200 dark:bg-white/5 mx-1" />

          {/* Eraser */}
          <button
            onClick={() => setSelectedTool('eraser')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${selectedTool === 'eraser' ? 'bg-red-600 text-white shadow-md' : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-400 border border-slate-200/80 dark:border-white/5 hover:border-slate-300'}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            Eraser (Click item)
          </button>
        </div>

        {/* Dynamic Context Settings */}
        <AnimatePresence mode="wait">
          {selectedTool === 'led' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-2"
            >
              <span className="text-[10px] font-mono text-slate-400">LED Color:</span>
              {['red', 'green', 'blue', 'yellow', 'purple'].map((col) => (
                <button
                  key={col}
                  onClick={() => setLedColor(col)}
                  className={`w-5 h-5 rounded-full border transition-transform ${col === ledColor ? 'scale-125 border-slate-900 dark:border-white ring-2 ring-indigo-500/40' : 'border-black/10'}`}
                  style={{
                    backgroundColor: 
                      col === 'red' ? '#ef4444' :
                      col === 'green' ? '#10b981' :
                      col === 'blue' ? '#3b82f6' :
                      col === 'yellow' ? '#f59e0b' : '#a855f7'
                  }}
                  title={`${col.toUpperCase()} Emission`}
                />
              ))}
            </motion.div>
          )}

          {selectedTool === 'resistor' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-2 text-xs"
            >
              <span className="text-[10px] font-mono text-slate-400">Resistance:</span>
              {['220Ω', '1kΩ', '10kΩ'].map((val) => (
                <button
                  key={val}
                  onClick={() => setResistorValue(val)}
                  className={`px-2.5 py-1 rounded-lg border-2 text-[10px] font-mono font-bold transition-all ${val === resistorValue ? 'bg-amber-500 border-amber-500 text-white' : 'bg-transparent border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-slate-300'}`}
                >
                  {val}
                </button>
              ))}
            </motion.div>
          )}

          {selectedTool === 'wire' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-2"
            >
              <span className="text-[10px] font-mono text-slate-400">Wire Cable:</span>
              {['red', 'blue', 'green', 'orange', 'white'].map((col) => (
                <button
                  key={col}
                  onClick={() => setWireColor(col)}
                  className={`w-5 h-5 rounded-full border transition-transform ${col === wireColor ? 'scale-125 border-slate-900 dark:border-white ring-2 ring-indigo-500/40' : 'border-black/10'}`}
                  style={{
                    backgroundColor: 
                      col === 'red' ? '#ef4444' :
                      col === 'blue' ? '#3b82f6' :
                      col === 'green' ? '#10b981' :
                      col === 'orange' ? '#f97316' : '#f8fafc'
                  }}
                  title={`${col.toUpperCase()} jacket`}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Interactive Breadboard Layout */}
      <div className="w-full relative overflow-x-auto select-none py-4 px-1 scrollbar-thin scrollbar-thumb-slate-800">
        <div className="min-w-[700px] max-w-full mx-auto relative bg-[#f1f5f9] dark:bg-[#1a2332] rounded-2xl border-4 border-slate-300 dark:border-slate-900/90 shadow-[0_12px_24px_rgba(0,0,0,0.15)] overflow-hidden">
          
          {/* Real-time pre-wired Power supply connection indicators */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-200/50 dark:bg-slate-800/40 border-r border-slate-300/40 dark:border-slate-800/80 flex flex-col items-center justify-around py-6 z-0">
            <div className="flex flex-col items-center">
              <span className="text-[8px] font-mono text-red-500 font-extrabold">+</span>
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] animate-pulse" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[8px] font-mono text-indigo-500 font-extrabold">9V</span>
              <Zap className="w-4.5 h-4.5 text-amber-500 animate-[bounce_2s_infinite]" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[8px] font-mono text-blue-500 font-extrabold">-</span>
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
            </div>
          </div>

          <svg
            ref={svgRef}
            className="w-full aspect-[700/255]"
            viewBox="0 0 700 255"
            onMouseMove={handleMouseMove}
          >
            {/* Horizontal partition bar separating rails and logic grid */}
            <line x1="12" y1="85" x2="688" y2="85" stroke="#cbd5e1" strokeWidth="2.5" className="dark:stroke-slate-800" strokeDasharray="4 4" />
            
            {/* Center channel trough canal of breadboard */}
            <rect x="12" y="154" width="676" height="15" fill="#e2e8f0" className="dark:fill-[#121927]" />
            <line x1="12" y1="154" x2="688" y2="154" stroke="#cbd5e1" strokeWidth="1.5" className="dark:stroke-slate-800" />
            <line x1="12" y1="169" x2="688" y2="169" stroke="#cbd5e1" strokeWidth="1.5" className="dark:stroke-slate-800" />

            {/* Print coordinate labels */}
            {/* Numbers: 1 to 22 */}
            {Array.from({ length: COLS_COUNT }).map((_, c) => (
              <text
                key={`lbl-n-${c}`}
                x={getX(c)}
                y="15"
                fontSize="8"
                fontWeight="900"
                fill="#94a3b8"
                textAnchor="middle"
                className="font-mono"
              >
                {c + 1}
              </text>
            ))}

            {/* Row Letters labels on right and left margins */}
            {['A', 'B', 'C', 'D', 'E'].map((letter, r) => (
              <g key={`lbl-l-${r}`}>
                <text x="35" y={getY('grid', r) + 3} fontSize="8.5" fontWeight="900" fill="#94a3b8" className="font-mono" textAnchor="end">{letter}</text>
                <text x="680" y={getY('grid', r) + 3} fontSize="8.5" fontWeight="900" fill="#94a3b8" className="font-mono" textAnchor="start">{letter}</text>
              </g>
            ))}

            {/* Rail markings +/- */}
            <text x="35" y="38" fontSize="12" fontWeight="bold" fill="#ef4444" className="font-mono select-none" textAnchor="end">+</text>
            <text x="35" y="64" fontSize="12" fontWeight="bold" fill="#3b82f6" className="font-mono select-none" textAnchor="end">-</text>

            {/* Horizontal line stripes for power bus lines */}
            <line x1="45" y1="23" x2="665" y2="23" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="45" y1="72" x2="665" y2="72" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1" strokeDasharray="3 3" />

            {/* Render Socket Holes (Grid coordinates mapping) */}
            
            {/* Positive Rail (+) */}
            {Array.from({ length: COLS_COUNT }).map((_, c) => {
              const coords = { type: 'plus' as SocketType, row: 0, col: c };
              const selected = pendingFrom && isSameSocket(pendingFrom, coords);
              return (
                <circle
                  key={`hs-plus-${c}`}
                  cx={getX(c)}
                  cy={getY('plus', 0)}
                  r={selected ? 5 : 4}
                  className={`cursor-pointer transition-all ${
                    selected 
                      ? 'fill-indigo-600 stroke-indigo-400 stroke-2 shadow-lg' 
                      : 'fill-slate-300 stroke-slate-400 hover:fill-indigo-400 hover:stroke-indigo-300 hover:scale-130 dark:fill-slate-800 dark:stroke-slate-700'
                  }`}
                  onClick={() => handleSocketClick(coords)}
                >
                  <title>{getSocketLabel(coords)}</title>
                </circle>
              );
            })}

            {/* Negative Rail (-) */}
            {Array.from({ length: COLS_COUNT }).map((_, c) => {
              const coords = { type: 'minus' as SocketType, row: 0, col: c };
              const selected = pendingFrom && isSameSocket(pendingFrom, coords);
              return (
                <circle
                  key={`hs-minus-${c}`}
                  cx={getX(c)}
                  cy={getY('minus', 0)}
                  r={selected ? 5 : 4}
                  className={`cursor-pointer transition-all ${
                    selected 
                      ? 'fill-indigo-600 stroke-indigo-400 stroke-2 shadow-lg' 
                      : 'fill-slate-300 stroke-slate-400 hover:fill-indigo-400 hover:stroke-indigo-300 hover:scale-130 dark:fill-slate-800 dark:stroke-slate-700'
                  }`}
                  onClick={() => handleSocketClick(coords)}
                >
                  <title>{getSocketLabel(coords)}</title>
                </circle>
              );
            })}

            {/* Main connected grid mapping */}
            {Array.from({ length: COLS_COUNT }).map((_, c) =>
              Array.from({ length: GRID_ROWS }).map((__, r) => {
                const coords = { type: 'grid' as SocketType, row: r, col: c };
                const selected = pendingFrom && isSameSocket(pendingFrom, coords);
                return (
                  <circle
                    key={`hs-grid-${c}-${r}`}
                    cx={getX(c)}
                    cy={getY('grid', r)}
                    r={selected ? 5 : 4}
                    className={`cursor-pointer transition-all ${
                      selected 
                        ? 'fill-indigo-600 stroke-indigo-400 stroke-2 shadow-lg' 
                        : 'fill-slate-300 stroke-slate-400 hover:fill-indigo-400 hover:stroke-indigo-300 hover:scale-130 dark:fill-slate-800 dark:stroke-slate-700'
                    }`}
                    onClick={() => handleSocketClick(coords)}
                  >
                    <title>{getSocketLabel(coords)}</title>
                  </circle>
                );
              })
            )}

            {/* Render Placed Components with high-precision aesthetic graphics */}
            {placedComponents.map((comp) => {
              const isLit = litCompIds.has(comp.id);
              const x1 = getX(comp.from.col);
              const y1 = getY(comp.from.type, comp.from.row);
              const x2 = getX(comp.to.col);
              const y2 = getY(comp.to.type, comp.to.row);
              
              const midX = (x1 + x2) / 2;
              const midY = (y1 + y2) / 2;
              const distance = Math.hypot(x2 - x1, y2 - y1);
              const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

              // Click callback for eraser tool
              const handleComponentClick = (e: React.MouseEvent) => {
                e.stopPropagation();
                if (selectedTool === 'eraser') {
                  eraseComponent(comp.id);
                }
              };

              // Let's render corresponding styling per component type
              if (comp.type === 'wire') {
                // Curved aesthetic wire
                const controlOffset = Math.max(15, distance * 0.25);
                const controlX1 = x1 + (y2 - y1) * 0.1;
                const controlY1 = y1 - controlOffset;
                const controlX2 = x2 - (y2 - y1) * 0.1;
                const controlY2 = y2 - controlOffset;
                
                const wireColorHex = 
                  comp.color === 'red' ? '#ef4444' :
                  comp.color === 'blue' ? '#3b82f6' :
                  comp.color === 'green' ? '#10b981' :
                  comp.color === 'orange' ? '#f97316' : '#94a3b8';

                return (
                  <g 
                    key={comp.id} 
                    className="cursor-pointer group"
                    onClick={handleComponentClick}
                  >
                    {/* Ghost selection border for easy erasing */}
                    <path
                      d={`M ${x1} ${y1} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${x2} ${y2}`}
                      fill="none"
                      stroke="transparent"
                      strokeWidth="12"
                    />
                    
                    {/* Outer core casing shadow */}
                    <path
                      d={`M ${x1} ${y1} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${x2} ${y2}`}
                      fill="none"
                      stroke="rgba(0, 0, 0, 0.2)"
                      strokeWidth="4.5"
                    />

                    {/* Colored wire curve */}
                    <path
                      d={`M ${x1} ${y1} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${x2} ${y2}`}
                      fill="none"
                      stroke={wireColorHex}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      className="transition-all"
                    />

                    {/* Flowing animated grid current dots if lit */}
                    {isLit && (
                      <path
                        d={`M ${x1} ${y1} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${x2} ${y2}`}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="1.2"
                        strokeDasharray="4 12"
                        strokeLinecap="round"
                        style={{
                          animation: 'flowCurrent linear infinite 1s'
                        }}
                      />
                    )}

                    {/* Highlight outline hover */}
                    {selectedTool === 'eraser' && (
                      <path
                        d={`M ${x1} ${y1} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${x2} ${y2}`}
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="1.2"
                        strokeDasharray="2 4"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    )}
                  </g>
                );
              }

              if (comp.type === 'resistor') {
                const bands = getResistorBandsColor(comp.value || '220Ω');
                return (
                  <g 
                    key={comp.id} 
                    className="cursor-pointer group" 
                    onClick={handleComponentClick}
                  >
                    {/* Metal leads pins */}
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                    
                    {/* Live metal glow indicator if loop closed */}
                    {isLit && (
                      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f59e0b" strokeWidth="3" className="opacity-25" />
                    )}

                    {/* Resistor main core body */}
                    <g transform={`translate(${midX}, ${midY}) rotate(${angle})`}>
                      <rect
                        x="-18"
                        y="-5"
                        width="36"
                        height="10"
                        rx="3"
                        fill="#fef08a"
                        stroke="#eab308"
                        strokeWidth="1"
                        className="shadow-sm"
                      />
                      
                      {/* Resistor stripes */}
                      <rect x="-10" y="-5" width="2.5" height="10" fill={bands[0]} />
                      <rect x="-4" y="-5" width="2.5" height="10" fill={bands[1]} />
                      <rect x="2" y="-5" width="2.5" height="10" fill={bands[2]} />
                      
                      {/* Gold tolerance strip */}
                      <rect x="10" y="-5" width="2.5" height="10" fill="#fbbf24" />
                    </g>

                    {/* Hover erase boundary */}
                    {selectedTool === 'eraser' && (
                      <circle cx={midX} cy={midY} r="18" fill="transparent" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 3" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </g>
                );
              }

              if (comp.type === 'led') {
                const ledColorHex = 
                  comp.color === 'red' ? '#ef4444' :
                  comp.color === 'green' ? '#10b981' :
                  comp.color === 'blue' ? '#3b82f6' :
                  comp.color === 'yellow' ? '#f59e0b' : '#a855f7';

                return (
                  <g 
                    key={comp.id} 
                    className="cursor-pointer group" 
                    onClick={handleComponentClick}
                  >
                    {/* Skeumorphic bent LED lead legs pins */}
                    <path
                      d={`M ${x1} ${y1} L ${midX - 3} ${midY + 4} L ${midX - 2} ${midY}`}
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="1.2"
                    />
                    <path
                      d={`M ${x2} ${y2} L ${midX + 3} ${midY + 4} L ${midX + 2} ${midY}`}
                      fill="none"
                      stroke="#64748b"
                      strokeWidth="1.2"
                    />

                    {/* Bright radiating light circle back glow if operating */}
                    {isLit && (
                      <circle
                        cx={midX}
                        cy={midY}
                        r="18"
                        fill={ledColorHex}
                        className="opacity-25 animate-pulse filter blur-[4px]"
                      />
                    )}

                    {/* Cylindrical LED diode head casing */}
                    <circle
                      cx={midX}
                      cy={midY}
                      r="6.5"
                      fill={ledColorHex}
                      opacity={isLit ? 0.95 : 0.65}
                      stroke="#ffffff"
                      strokeWidth="0.8"
                      className="transition-opacity"
                    />

                    {/* Dynamic shining spark dot inside diode */}
                    <circle
                      cx={midX - 2}
                      cy={midY - 2}
                      r="2"
                      fill="#ffffff"
                      opacity={isLit ? 1 : 0.4}
                    />

                    {/* Hover erase visualizer */}
                    {selectedTool === 'eraser' && (
                      <circle
                        cx={midX}
                        cy={midY}
                        r="14"
                        fill="transparent"
                        stroke="#ef4444"
                        strokeWidth="1.2"
                        strokeDasharray="2 3"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    )}
                  </g>
                );
              }

              return null;
            })}

            {/* Elastic connections guide path line when drawing in progress */}
            {pendingFrom && (
              <g>
                <line
                  x1={getX(pendingFrom.col)}
                  y1={getY(pendingFrom.type, pendingFrom.row)}
                  x2={mousePos.x}
                  y2={mousePos.y}
                  stroke="#6366f1"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                  className="animate-[pulse_1s_infinite]"
                />
                <circle cx={mousePos.x} cy={mousePos.y} r="3" fill="#6366f1" />
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Diagnostics Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch mt-2">
        {/* State/Formula display panel */}
        <div className="md:col-span-2 flex items-center gap-4 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200/50 dark:border-white/5">
          <div className={`p-3 rounded-xl flex-none ${
            circuitStatus.code === 'short' ? 'bg-red-500/10 text-red-600 dark:text-red-400 animate-bounce' :
            circuitStatus.code === 'closed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
            'bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-500'
          }`}>
            {circuitStatus.code === 'short' ? (
              <Flame className="w-6 h-6" />
            ) : circuitStatus.code === 'closed' ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            )}
          </div>
          
          <div className="flex-1">
            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black block">Circuit Diagnostics</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mt-1 transition-colors duration-200">
              {circuitStatus.msg}
            </span>
          </div>
        </div>

        {/* Live current stats ticker */}
        <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200/50 dark:border-white/5 flex flex-col justify-center">
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black">Simulation Metrics</span>
          <div className="flex items-baseline mt-1 group">
            <span className={`text-2xl font-mono font-black mr-1.5 transition-colors duration-200 ${circuitStatus.code === 'closed' ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>
              {circuitStatus.code === 'closed' ? '9.00' : '0.00'}
            </span>
            <span className="text-[10px] font-mono text-slate-400 font-extrabold">Volts (V)</span>
          </div>
          <div className="flex justify-between text-[10px] font-mono mt-1 text-slate-500 dark:text-slate-400 border-t border-slate-200/50 dark:border-white/5 pt-1">
            <span>Grid resistance:</span>
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {placedComponents.some(c => c.type === 'resistor' && litCompIds.has(c.id)) ? 'Balanced' : '0.1 Ω'}
            </span>
          </div>
        </div>
      </div>

      {/* Embedded CSS animation for electricity current dot loops */}
      <style>{`
        @keyframes flowCurrent {
          to {
            stroke-dashoffset: -16;
          }
        }
      `}</style>
    </div>
  );
}
