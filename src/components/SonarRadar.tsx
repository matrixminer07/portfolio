import React, { useState } from 'react';
import { Radio, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';

interface TargetBlip {
  id: string;
  x: number; // percentage
  y: number; // percentage
  label: string;
  depth: string;
  type: 'Plastic Debris' | 'Submerged Container' | 'Natural Formation';
  confidence: number;
  threatLevel: 'Low' | 'Medium' | 'High';
}

const DEFAULT_BLIPS: TargetBlip[] = [
  {
    id: 'blip-1',
    x: 68,
    y: 28,
    label: 'Target Alpha [A-04]',
    depth: '42.8m',
    type: 'Submerged Container',
    confidence: 94.2,
    threatLevel: 'High',
  },
  {
    id: 'blip-2',
    x: 32,
    y: 74,
    label: 'Target Beta [B-12]',
    depth: '18.4m',
    type: 'Plastic Debris',
    confidence: 88.7,
    threatLevel: 'Medium',
  },
  {
    id: 'blip-3',
    x: 75,
    y: 70,
    label: 'Target Gamma [G-09]',
    depth: '55.1m',
    type: 'Natural Formation',
    confidence: 96.5,
    threatLevel: 'Low',
  },
];

export const SonarRadar: React.FC = () => {
  const [selectedBlip, setSelectedBlip] = useState<TargetBlip | null>(DEFAULT_BLIPS[0]);
  const [isScanning, setIsScanning] = useState(true);

  return (
    <div className="bg-black/70 rounded-2xl p-6 border border-slate-800/80 font-mono text-xs flex flex-col items-center justify-center relative overflow-hidden">
      {/* Status Bar */}
      <div className="w-full flex items-center justify-between text-slate-400 mb-4 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
          <span className="text-[11px] text-violet-300">SONARIX ACOUSTIC TELEMETRY</span>
        </div>
        <button
          onClick={() => setIsScanning(!isScanning)}
          className="text-[10px] text-slate-400 hover:text-violet-300 flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/10"
          title="Toggle Sweep"
        >
          <RefreshCw className={`w-2.5 h-2.5 ${isScanning ? 'animate-spin' : ''}`} />
          {isScanning ? 'ACTIVE' : 'PAUSED'}
        </button>
      </div>

      {/* Radar Display Canvas / Circle */}
      <div className="relative w-56 h-56 sm:w-60 sm:h-60 rounded-full border border-violet-500/30 bg-[#040612] flex items-center justify-center shadow-[inset_0_0_30px_rgba(139,92,246,0.15)]">
        {/* Distance Rings */}
        <div className="absolute w-44 h-44 rounded-full border border-violet-500/20 pointer-events-none"></div>
        <div className="absolute w-28 h-28 rounded-full border border-violet-500/20 pointer-events-none"></div>
        <div className="absolute w-12 h-12 rounded-full border border-violet-500/30 pointer-events-none"></div>

        {/* Crosshair Grids */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-[1px] bg-violet-500/20"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-full w-[1px] bg-violet-500/20"></div>
        </div>
        {/* Diagonal Grids */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none rotate-45">
          <div className="w-full h-[1px] bg-violet-500/10"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -rotate-45">
          <div className="w-full h-[1px] bg-violet-500/10"></div>
        </div>

        {/* Rotating Radar beam */}
        {isScanning && (
          <div className="absolute inset-0 animate-radar origin-center pointer-events-none">
            <div className="w-1/2 h-1/2 bg-gradient-to-br from-violet-500/40 via-violet-500/10 to-transparent origin-bottom-right rounded-tl-full"></div>
          </div>
        )}

        {/* Sonar Blips */}
        {DEFAULT_BLIPS.map((blip) => {
          const isSelected = selectedBlip?.id === blip.id;
          return (
            <button
              key={blip.id}
              onClick={() => setSelectedBlip(blip)}
              style={{ left: `${blip.x}%`, top: `${blip.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-10"
              title={`Click to inspect ${blip.label}`}
            >
              <span
                className={`relative flex h-3.5 w-3.5 items-center justify-center`}
              >
                <span
                  className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
                    blip.threatLevel === 'High'
                      ? 'bg-rose-400'
                      : blip.threatLevel === 'Medium'
                      ? 'bg-cyan-400'
                      : 'bg-emerald-400'
                  }`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 border ${
                    isSelected
                      ? 'ring-2 ring-white scale-125'
                      : 'border-white/60'
                  } ${
                    blip.threatLevel === 'High'
                      ? 'bg-rose-500'
                      : blip.threatLevel === 'Medium'
                      ? 'bg-cyan-400'
                      : 'bg-emerald-500'
                  }`}
                ></span>
              </span>
            </button>
          );
        })}

        {/* Submarine Center Icon */}
        <div className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_8px_#8B5CF6] pointer-events-none"></div>
      </div>

      {/* Target Inspector telemetry panel */}
      {selectedBlip ? (
        <div className="w-full mt-4 p-3 rounded-xl bg-slate-900/90 border border-violet-500/30 text-[11px] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-white font-bold flex items-center gap-1.5">
              {selectedBlip.threatLevel === 'High' ? (
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              ) : (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              )}
              {selectedBlip.label}
            </span>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] ${
                selectedBlip.threatLevel === 'High'
                  ? 'bg-rose-950 text-rose-300 border border-rose-800'
                  : selectedBlip.threatLevel === 'Medium'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}
            >
              {selectedBlip.threatLevel} Anomaly
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 text-slate-300">
            <div>
              <span className="text-slate-500 block text-[10px]">CLASSIFICATION</span>
              <span className="text-violet-300 font-semibold">{selectedBlip.type}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">EST. DEPTH</span>
              <span className="text-cyan-300 font-semibold">{selectedBlip.depth}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">CONFIDENCE</span>
              <span className="text-emerald-300 font-semibold">{selectedBlip.confidence}%</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-[11px] text-slate-400 mt-4 text-center">
          Click any target blip on radar for side-scan telemetry
        </div>
      )}

      <div className="w-full mt-2 flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/60">
        <span>Acoustic Frequency: 455 kHz</span>
        <span className="text-violet-400">AUV Telemetry Live</span>
      </div>
    </div>
  );
};
