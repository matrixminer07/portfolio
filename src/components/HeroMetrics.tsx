import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const HeroMetrics: React.FC = () => {
  return (
    <div className="w-full py-10 my-4 border-y border-[rgba(241,238,232,0.1)] bg-[rgba(14,14,17,0.4)] backdrop-blur-sm rounded-xl">
      <ScrollReveal direction="up" delay={50}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 px-4 sm:px-8 divide-y lg:divide-y-0 lg:divide-x divide-[rgba(241,238,232,0.08)]">
          {/* Column 1: Community */}
          <div className="pt-4 sm:pt-0 lg:pr-6">
            <div className="text-[11px] font-mono tracking-widest text-[#aaa9a4] uppercase mb-2">
              01 // COMMUNITY
            </div>
            <div className="font-serif italic text-[28px] sm:text-4xl lg:text-[40px] text-[#f1eee8] mb-2 leading-[1.15] [text-wrap:balance]">
              Community <span className="text-[#ff8c59]">first</span>
            </div>
            <p className="text-xs font-mono text-[#aaa9a4] leading-relaxed">
              I love helping fellow students learn, through workshops, bootcamps and hackathons with the Microsoft Student Chapter at VIT-AP.
            </p>
          </div>

          {/* Column 2: Hackathons */}
          <div className="pt-6 lg:pt-0 lg:px-6">
            <div className="text-[11px] font-mono tracking-widest text-[#aaa9a4] uppercase mb-2">
              02 // HACKATHONS
            </div>
            <div className="font-serif italic text-[28px] sm:text-4xl lg:text-[40px] text-[#f1eee8] mb-2 leading-[1.15] [text-wrap:balance]">
              Hackathon <span className="text-[#ff8c59]">winner</span>
            </div>
            <p className="text-xs font-mono text-[#aaa9a4] leading-relaxed">
              I enjoy building under pressure and learning fast alongside great teammates.
            </p>
          </div>

          {/* Column 3: Build Quality */}
          <div className="pt-6 lg:pt-0 lg:px-6">
            <div className="text-[11px] font-mono tracking-widest text-[#aaa9a4] uppercase mb-2">
              03 // BUILD QUALITY
            </div>
            <div className="font-serif italic text-[28px] sm:text-4xl lg:text-[40px] text-[#f1eee8] mb-2 leading-[1.15] [text-wrap:balance]">
              Built to <span className="text-[#ff8c59]">last</span>
            </div>
            <p className="text-xs font-mono text-[#aaa9a4] leading-relaxed">
              I care about clean, dependable backend systems: the APIs, databases and small details that keep things running smoothly.
            </p>
          </div>

          {/* Column 4: Explore */}
          <div className="pt-6 lg:pt-0 lg:pl-6 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono tracking-widest text-[#ff8c59] uppercase mb-2 flex items-center gap-1.5">
                <span>04 // EXPLORE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
              <div className="font-serif italic text-[28px] sm:text-4xl lg:text-[40px] text-[#f1eee8] mb-2 leading-[1.15] [text-wrap:balance]">
                See my <span className="text-[#ff8c59]">work</span>
              </div>
              <p className="text-xs font-mono text-[#aaa9a4] leading-relaxed">
                Curious what I have been building? Take a look at my projects.
              </p>
            </div>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#ff8c59] hover:text-[#f1eee8] transition-colors mt-3 group"
            >
              <span>Explore Chapter 01</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};

