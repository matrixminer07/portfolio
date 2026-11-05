import React, { useState } from 'react';
import { MapPin, ArrowRight, CheckCircle2, Send, Building2, Radio } from 'lucide-react';

interface CivicTicket {
  id: string;
  category: string;
  location: string;
  step: 1 | 2 | 3;
  status: 'Received' | 'Assigned to Ward #4' | 'Dispatched & Resolved';
}

export const CivicFlowTracker: React.FC = () => {
  const [ticket, setTicket] = useState<CivicTicket>({
    id: 'TKT-2026-8941',
    category: 'Road Hazard (Pothole Cluster)',
    location: 'Sector 14, Ring Road Corridor',
    step: 2,
    status: 'Assigned to Ward #4',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timersRef = React.useRef<number[]>([]);

  React.useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  const simulateNewIssue = (category: string) => {
    setIsSubmitting(true);
    const newId = `TKT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicket({
      id: newId,
      category,
      location: 'Ward 7 Central Junction',
      step: 1,
      status: 'Received',
    });

    const t1 = window.setTimeout(() => {
      setTicket((prev) => ({
        ...prev,
        step: 2,
        status: 'Assigned to Ward #4',
      }));
    }, 1000);

    const t2 = window.setTimeout(() => {
      setTicket((prev) => ({
        ...prev,
        step: 3,
        status: 'Dispatched & Resolved',
      }));
      setIsSubmitting(false);
    }, 2200);

    timersRef.current.push(t1, t2);
  };

  return (
    <div className="bg-black/70 rounded-2xl p-6 border border-slate-800/80 font-mono text-xs space-y-4">
      {/* Tracker Header */}
      <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Building2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-300 font-semibold">[CIVIC RESOLUTION FLOW]</span>
        </div>
        <span className="text-[10px] text-slate-400">ID: {ticket.id}</span>
      </div>

      {/* 3 Step Interactive Workflow */}
      <div className="space-y-3">
        {/* Step 1 */}
        <div
          className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
            ticket.step === 1
              ? 'bg-emerald-950/60 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                ticket.step >= 1
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-slate-800 text-slate-500'
              }`}
            >
              1
            </span>
            <div>
              <span className="text-slate-200 block font-medium">Citizen Reports Issue (GPS + Photo)</span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 text-emerald-400" /> {ticket.location}
              </span>
            </div>
          </div>
          {ticket.step >= 1 && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
        </div>

        {/* Step 2 */}
        <div
          className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
            ticket.step === 2
              ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                ticket.step >= 2
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                  : 'bg-slate-800 text-slate-500'
              }`}
            >
              2
            </span>
            <div>
              <span className="text-slate-200 block font-medium">Auto-routed to Ward Department</span>
              <span className="text-[10px] text-cyan-300">Target: Municipal Road & Sanitation Div</span>
            </div>
          </div>
          {ticket.step >= 2 && <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />}
        </div>

        {/* Step 3 */}
        <div
          className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
            ticket.step === 3
              ? 'bg-violet-950/60 border-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.2)]'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                ticket.step >= 3
                  ? 'bg-violet-500/20 text-violet-400 border border-violet-500/40'
                  : 'bg-slate-800 text-slate-500'
              }`}
            >
              3
            </span>
            <div>
              <span className="text-slate-200 block font-medium">Status Broadcasted & Resolved</span>
              <span className="text-[10px] text-slate-400">Citizen alert dispatched via SMS/App</span>
            </div>
          </div>
          {ticket.step >= 3 && <CheckCircle2 className="w-4 h-4 text-violet-400" />}
        </div>
      </div>

      {/* Interactive Quick Simulation triggers */}
      <div className="pt-2 border-t border-slate-800/80">
        <div className="text-[10px] text-slate-400 mb-2">Test Live Civic Pipeline:</div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => simulateNewIssue('Water Pipeline Leakage')}
            disabled={isSubmitting}
            className="px-2.5 py-1 rounded bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 text-[10px] text-slate-300 hover:text-emerald-300 transition-all"
          >
            + Report Water Leak
          </button>
          <button
            onClick={() => simulateNewIssue('Traffic Signal Malfunction')}
            disabled={isSubmitting}
            className="px-2.5 py-1 rounded bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/40 text-[10px] text-slate-300 hover:text-cyan-300 transition-all"
          >
            + Report Traffic Light
          </button>
        </div>
      </div>

      {/* Impact Banner */}
      <div className="p-3 bg-emerald-950/20 rounded-xl border border-emerald-800/40 text-[11px] text-emerald-300 flex items-center gap-2">
        <span className="text-emerald-400 font-bold">✓</span>
        <span>Reduces civic complaint resolution delay by organizing department workflows.</span>
      </div>
    </div>
  );
};
