import React, { useState } from 'react';
import { Play, CheckCircle2, Activity, Cpu, BellRing, RotateCcw } from 'lucide-react';

export const PharmaPipeline: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(2);
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedCompound, setSelectedCompound] = useState('NXC-802 (Kinase Inhibitor)');
  const [riskScore, setRiskScore] = useState(14.2);
  const [latencyMs, setLatencyMs] = useState(38);
  const timersRef = React.useRef<number[]>([]);

  React.useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  const runSimulation = () => {
    setIsSimulating(true);
    setActiveStage(1);
    setLatencyMs(18);

    const t1 = window.setTimeout(() => {
      setActiveStage(2);
      setLatencyMs(34);
    }, 700);

    const t2 = window.setTimeout(() => {
      setActiveStage(3);
      setLatencyMs(41);
      const newScore = Number((Math.random() * 20 + 8).toFixed(1));
      setRiskScore(newScore);
      setIsSimulating(false);
    }, 1500);

    timersRef.current.push(t1, t2);
  };

  return (
    <div className="bg-black/70 rounded-2xl p-6 border border-slate-800/80 font-mono text-xs space-y-4">
      {/* Schematic Header */}
      <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-cyan-300 font-semibold">[MODULE: PHARMA_PIPELINE]</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-medium">STATUS: VERIFIED</span>
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-950 hover:bg-cyan-900 border border-cyan-700 text-cyan-300 text-[10px] transition-all disabled:opacity-50"
            title="Simulate Data Ingestion & Scoring"
          >
            {isSimulating ? (
              <>
                <RotateCcw className="w-2.5 h-2.5 animate-spin" />
                <span>EVALUATING</span>
              </>
            ) : (
              <>
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>SIMULATE</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Target Compound Selector */}
      <div className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 text-[11px]">
        <span className="text-slate-400">Target Pipeline:</span>
        <select
          value={selectedCompound}
          onChange={(e) => setSelectedCompound(e.target.value)}
          className="bg-black/60 border border-slate-700 rounded px-2 py-0.5 text-cyan-300 focus:outline-none text-[11px]"
        >
          <option value="NXC-802 (Kinase Inhibitor)">NXC-802 (Kinase Inhibitor)</option>
          <option value="GLP-441 (Peptide Analog)">GLP-441 (Peptide Analog)</option>
          <option value="IMM-904 (Immuno-Oncology)">IMM-904 (Immuno-Oncology)</option>
        </select>
      </div>

      {/* Flow Stages */}
      <div className="space-y-2.5">
        {/* Stage 1 */}
        <div
          onClick={() => setActiveStage(1)}
          className={`cursor-pointer p-3 rounded-xl border transition-all flex justify-between items-center ${
            activeStage === 1
              ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px]">
              1
            </span>
            <span className="text-slate-200">Clinical Raw Data Ingestion</span>
          </div>
          <span className="text-emerald-400 text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
            JSON / SQL Inflow
          </span>
        </div>

        {/* Down connector arrow */}
        <div className="flex justify-center text-slate-600 text-xs py-0.5">
          <span className={`${activeStage >= 2 ? 'text-cyan-400' : 'text-slate-600'}`}>↓</span>
        </div>

        {/* Stage 2 */}
        <div
          onClick={() => setActiveStage(2)}
          className={`cursor-pointer p-3 rounded-xl border transition-all flex justify-between items-center ${
            activeStage === 2
              ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <div>
              <span className="text-cyan-300 font-medium block">2. ML Risk Scoring & Variance</span>
              <span className="text-[10px] text-slate-400">Probabilistic compound toxicity index</span>
            </div>
          </div>
          <span className="text-cyan-300 text-[10px] bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
            Python Engine
          </span>
        </div>

        {/* Down connector arrow */}
        <div className="flex justify-center text-slate-600 text-xs py-0.5">
          <span className={`${activeStage >= 3 ? 'text-emerald-400' : 'text-slate-600'}`}>↓</span>
        </div>

        {/* Stage 3 */}
        <div
          onClick={() => setActiveStage(3)}
          className={`cursor-pointer p-3 rounded-xl border transition-all flex justify-between items-center ${
            activeStage === 3
              ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <BellRing className="w-5 h-5 text-emerald-400" />
            <span className="text-slate-200">3. Decision Vector & Alert Dispatch</span>
          </div>
          <span className="text-emerald-400 text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
            REST Endpoints
          </span>
        </div>
      </div>

      {/* Real-time telemetry summary footer */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
        <div>
          <span className="text-slate-500 block text-[10px]">PREDICTED RISK VARIANCE</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            {riskScore}% (Safe Threshold)
          </span>
        </div>
        <div className="text-right">
          <span className="text-slate-500 block text-[10px]">PIPELINE LATENCY</span>
          <span className="text-cyan-400 font-bold">{latencyMs} ms (&lt; 45ms target)</span>
        </div>
      </div>
    </div>
  );
};
