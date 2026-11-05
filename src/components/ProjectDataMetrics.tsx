import React, { useState } from 'react';
import { Star, GitFork, Clock, GitCommit, Activity, Scale } from 'lucide-react';
import { ProjectMetrics } from '../data/portfolioData';

interface ProjectDataMetricsProps {
  metrics: ProjectMetrics;
  accentColor: string;
}

export const ProjectDataMetrics: React.FC<ProjectDataMetricsProps> = ({
  metrics,
  accentColor,
}) => {
  const [hoveredBarIdx, setHoveredBarIdx] = useState<number | null>(null);

  const maxVal = Math.max(...metrics.activityVelocity, 1);

  return (
    <div className="mt-4 p-3.5 rounded-2xl bg-[#08080a] border border-[rgba(241,238,232,0.08)] font-mono text-xs space-y-3">
      {/* Top Stat Pills Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[rgba(241,238,232,0.07)] text-[11px]">
        <div className="flex flex-wrap items-center gap-3">
          {/* Stars */}
          <div className="flex items-center gap-1.5 text-amber-300 bg-amber-950/20 px-2 py-0.5 rounded border border-amber-800/30">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="font-bold text-[#f1eee8]">{metrics.stars}</span>
            <span className="text-[10px] text-amber-300/80">Stars</span>
          </div>

          {/* Forks */}
          <div className="flex items-center gap-1.5 text-[#aaa9a4] bg-[rgba(241,238,232,0.03)] px-2 py-0.5 rounded border border-[rgba(241,238,232,0.08)]">
            <GitFork className="w-3 h-3 text-[#ff8c59]" />
            <span className="font-bold text-[#f1eee8]">{metrics.forks}</span>
            <span className="text-[10px] text-[#aaa9a4]">Forks</span>
          </div>

          {/* Commits */}
          <div className="flex items-center gap-1.5 text-[#aaa9a4] bg-[rgba(241,238,232,0.03)] px-2 py-0.5 rounded border border-[rgba(241,238,232,0.08)]">
            <GitCommit className="w-3 h-3 text-emerald-400" />
            <span className="font-bold text-[#f1eee8]">{metrics.commits}</span>
            <span className="text-[10px] text-[#aaa9a4]">Commits</span>
          </div>
        </div>

        {/* Last Updated & License */}
        <div className="flex items-center gap-3 text-[10px] text-[#aaa9a4]">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#ff8c59]" />
            <span>Updated:</span>
            <span className="text-[#f1eee8] font-medium">{metrics.lastUpdated}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-[#aaa9a4]/60">
            <Scale className="w-3 h-3" />
            <span>{metrics.license}</span>
          </div>
        </div>
      </div>

      {/* Data Visualization Section */}
      <div className="grid sm:grid-cols-12 gap-3 items-center">
        {/* Left Data Viz: Language Breakdown Stacked Bar */}
        <div className="sm:col-span-7 space-y-1.5">
          <div className="flex justify-between text-[10px] text-[#aaa9a4]">
            <span className="uppercase tracking-wider">Source Composition</span>
            <span className="text-[#aaa9a4]/60">Verified LOC</span>
          </div>

          {/* Stacked Progress Bar */}
          <div className="h-2 w-full rounded-full bg-[#121215] overflow-hidden flex shadow-inner">
            {metrics.languages.map((lang, idx) => (
              <div
                key={idx}
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: lang.color,
                }}
                className="h-full transition-all duration-500 hover:brightness-125"
                title={`${lang.name}: ${lang.percentage}%`}
              />
            ))}
          </div>

          {/* Micro Legend */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] pt-0.5">
            {metrics.languages.map((lang, idx) => (
              <span key={idx} className="flex items-center gap-1 text-[#aaa9a4]">
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{ backgroundColor: lang.color }}
                />
                <span className="text-[#f1eee8]">{lang.name}</span>
                <span className="text-[#aaa9a4]/70">{lang.percentage}%</span>
              </span>
            ))}
          </div>
        </div>

        {/* Right Data Viz: Commit Velocity Activity Chart */}
        <div className="sm:col-span-5 bg-[#0e0e11] p-2 rounded-xl border border-[rgba(241,238,232,0.06)]">
          <div className="flex items-center justify-between text-[10px] text-[#aaa9a4] mb-1">
            <span className="flex items-center gap-1">
              <Activity className="w-2.5 h-2.5 text-[#ff8c59]" /> Sprint Velocity
            </span>
            <span className="text-emerald-400 text-[9px] font-bold">
              {metrics.healthScore}% Reliability
            </span>
          </div>

          {/* Interactive Sparkline / Micro Bar Chart */}
          <div className="flex items-end justify-between gap-1 h-7 pt-1 px-1">
            {metrics.activityVelocity.map((val, idx) => {
              const heightPercent = Math.max(Math.round((val / maxVal) * 100), 18);
              const isHovered = hoveredBarIdx === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredBarIdx(idx)}
                  onMouseLeave={() => setHoveredBarIdx(null)}
                  className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer"
                >
                  {/* Tooltip on hover */}
                  {isHovered && (
                    <div className="absolute -top-6 bg-[#16161a] border border-[#ff8c59]/40 text-[#ff8c59] text-[9px] px-1.5 py-0.5 rounded shadow whitespace-nowrap z-20">
                      {val} commits
                    </div>
                  )}
                  <div
                    style={{
                      height: `${heightPercent}%`,
                      backgroundColor: isHovered ? '#ff8c59' : accentColor,
                      opacity: isHovered ? 1 : 0.6 + (idx / metrics.activityVelocity.length) * 0.4,
                    }}
                    className="w-full rounded-t transition-all group-hover:scale-y-110"
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-between text-[8px] text-[#aaa9a4]/60 pt-1 px-0.5 uppercase">
            <span>Sprint 1</span>
            <span>Sprint {metrics.activityVelocity.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
