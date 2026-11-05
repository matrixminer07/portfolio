import React from 'react';
import { Calendar } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';

// Official Microsoft 4-Color Tile Logo (20px)
const MicrosoftIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} shrink-0`}
    aria-hidden="true"
  >
    <rect x="1" y="1" width="9" height="9" fill="#f25022" rx="0.5" />
    <rect x="11" y="1" width="9" height="9" fill="#7fba00" rx="0.5" />
    <rect x="1" y="11" width="9" height="9" fill="#00a4ef" rx="0.5" />
    <rect x="11" y="11" width="9" height="9" fill="#ffb900" rx="0.5" />
  </svg>
);

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 hairline-t">
      {/* Chapter 03 Header */}
      <div className="max-w-3xl mb-12">
        <div className="eyebrow mb-2">
          CHAPTER 03 // JOURNEY & LEADERSHIP
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight [text-wrap:balance]">
          <span className="font-serif italic font-normal text-[#ff8c59]">
            Leading developer societies
          </span>{' '}
          <span className="font-sans font-medium text-[#f1eee8]">
            & technical initiatives.
          </span>
        </h2>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative pl-6 sm:pl-10 space-y-7 sm:space-y-8">
        {/* Continuous 1px Vertical Timeline Line running full height & fading out at bottom */}
        <div
          className="absolute left-[6px] sm:left-[8px] top-8 bottom-4 w-[1px] bg-gradient-to-b from-[rgba(241,238,232,0.18)] via-[rgba(241,238,232,0.14)] to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {PORTFOLIO_DATA.experiences.map((exp, idx) => {
          return (
            <ScrollReveal key={exp.role} delay={idx * 120} className="relative group">
              {/* 14px Timeline Bead vertically aligned with the card's title row */}
              {exp.isCurrent ? (
                <div
                  className="absolute -left-[24px] sm:-left-[39px] top-[63px] sm:top-[67px] w-3.5 h-3.5 rounded-full bg-[#ff8c59] flex items-center justify-center z-10 shadow-[0_0_12px_rgba(255,140,89,0.5)]"
                  aria-hidden="true"
                >
                  {/* Soft pulsing ring on current role (respects prefers-reduced-motion) */}
                  <span className="absolute -inset-1 rounded-full border border-[#ff8c59]/60 animate-ping opacity-75 motion-reduce:hidden" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#030303]" />
                </div>
              ) : (
                <div
                  className="absolute -left-[24px] sm:-left-[39px] top-[63px] sm:top-[67px] w-3.5 h-3.5 rounded-full bg-[#26262a] border-2 border-[rgba(241,238,232,0.3)] flex items-center justify-center z-10"
                  aria-hidden="true"
                >
                  <span className="w-1 h-1 rounded-full bg-[rgba(241,238,232,0.5)]" />
                </div>
              )}

              {/* Role Card */}
              <div className="editorial-panel p-7 sm:p-8 rounded-2xl border border-[rgba(241,238,232,0.1)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#ff8c59]/50 hover:shadow-[0_12px_30px_-10px_rgba(255,140,89,0.15)] motion-reduce:hover:translate-y-0">
                {/* Status tag sitting above the title as a small mono pill */}
                <div>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider uppercase mb-2 ${
                      exp.isCurrent
                        ? 'bg-[#ff8c59]/10 text-[#ff8c59] border border-[#ff8c59]/30'
                        : 'bg-[rgba(241,238,232,0.04)] text-[#aaa9a4] border border-[rgba(241,238,232,0.1)]'
                    }`}
                  >
                    {exp.tag}
                  </span>
                </div>

                {/* Header row: Role Title on the left, Date pill on the right */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
                  <h3 className="font-sans text-lg sm:text-xl font-semibold text-[#f1eee8] tracking-tight">
                    {exp.role}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#aaa9a4] border border-[rgba(241,238,232,0.12)] bg-[rgba(241,238,232,0.03)] shrink-0 self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-[#ff8c59]" />
                    <span>{exp.period}</span>
                  </span>
                </div>

                {/* Organization Line with single 20px Microsoft 4-square logo */}
                <div className="flex items-center gap-2 mt-2 text-sm font-medium text-[#aaa9a4]">
                  <MicrosoftIcon className="w-5 h-5" />
                  <span className="text-[#aaa9a4]">{exp.organization}</span>
                </div>

                {/* Hairline Divider */}
                <div className="my-4 border-t border-[rgba(241,238,232,0.08)]" />

                {/* Bullets with small accent '→' markers and hanging indent */}
                <ul className="space-y-3 text-xs sm:text-sm font-sans text-[#aaa9a4]">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 max-w-prose">
                      <span
                        className="text-[#ff8c59] font-mono text-sm leading-[1.6] shrink-0 select-none"
                        aria-hidden="true"
                      >
                        →
                      </span>
                      <span className="leading-[1.6] text-[#aaa9a4]">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};
