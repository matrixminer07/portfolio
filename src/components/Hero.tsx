import React from 'react';
import { ArrowDown, ArrowUpRight, Github } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import HalftonePortrait from './HalftonePortrait';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[95vh] flex flex-col justify-between pt-6 pb-12 overflow-x-clip">
      {/* Top Header Row with Location & Availability Status */}
      <div className="flex items-center justify-between text-xs font-mono tracking-widest text-[#aaa9a4] uppercase z-20 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="text-[#ff8c59]">✦</span>
          <span>SYSTEMS &amp; DATA ANALYTICS</span>
        </div>
        <div className="flex items-center gap-2.5 tracking-[0.18em] text-[#b8b5ad]">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>AVAILABLE FOR 2026 ROLES</span>
        </div>
      </div>

      {/* Left Vertical Kicker (Editorial signature present in reference layout) */}
      <div className="hidden lg:flex flex-col gap-2.5 absolute left-4 xl:left-8 top-1/3 text-[10px] font-mono tracking-[0.22em] text-[#aaa9a4] uppercase select-none pointer-events-none z-10">
        <span className="text-[#f1eee8] font-bold">01 // PRESENCE</span>
        <span className="text-[#ff8c59] text-xs">+</span>
        <span>ENGINEERING</span>
        <span>DATA ANALYTICS</span>
        <span>SYSTEMS ARCHITECTURE</span>
      </div>

      {/* Centerpiece: Halftone WebGL Portrait with Overlaid Name */}
      <div className="relative my-auto flex flex-col items-center justify-center w-full">
        {/* Halftone WebGL Portrait Wrapper */}
        <div
          className="relative pointer-events-none z-0 aspect-[2/3] h-[min(58vh,520px)] md:h-[min(70vh,720px)] lg:h-[min(88vh,940px)]"
        >
          <HalftonePortrait
            src="/assets/portrait-halftone.jpg"
            alt="Portrait of Spandan Roy"
            className="w-full h-full"
          />
        </div>

        {/* Overlaid Title & Serif Name positioned over lower chest & shoulders (bottom ~25% of portrait) */}
        <div className="absolute inset-x-0 bottom-[8%] sm:bottom-[10%] md:bottom-[12%] lg:bottom-[15%] flex flex-col items-center justify-center text-center pointer-events-none z-20 px-4">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#aaa9a4] mb-1 sm:mb-2 drop-shadow-md">
            A HUMAN PERSPECTIVE ON TECHNOLOGY
          </span>
          <h1 className="font-serif italic font-normal text-[clamp(3.2rem,8.5vw,9.8rem)] tracking-tight text-[#f1eee8] leading-[0.88] drop-shadow-2xl select-none">
            Spandan Roy
          </h1>
        </div>
      </div>

      {/* Editorial Narrative & Direct Actions */}
      <div className="relative z-20 max-w-2xl mx-auto text-center space-y-6 pt-3 px-4 sm:px-6">
        <p className="text-[#aaa9a4] text-base sm:text-lg leading-relaxed font-sans [text-wrap:pretty]">
          Computer Science undergraduate at{' '}
          <span className="text-[#f1eee8] font-medium">{PORTFOLIO_DATA.personal.university}</span>{' '}
          specializing in Data Analytics. Engineering resilient backend architectures, distributed microservices, and AI-driven telemetry platforms.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-1 font-mono text-xs uppercase tracking-wider">
          <a
            href="#projects"
            className="px-6 py-3.5 rounded-full bg-[#f1eee8] text-[#030303] hover:bg-[#ff8c59] hover:text-[#030303] transition-all flex items-center gap-2 font-medium shadow-md group cursor-pointer"
          >
            <span>Explore Work</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <a
            href="/Spandan_Roy_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Spandan_Roy_Resume.pdf"
            className="px-5 py-3.5 rounded-full border border-[rgba(241,238,232,0.15)] hover:border-[#ff8c59] text-[#f1eee8] hover:bg-[rgba(241,238,232,0.04)] transition-all flex items-center gap-2 group cursor-pointer"
          >
            <span>Resume (PDF)</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#ff8c59] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="#contact"
            className="px-5 py-3.5 rounded-full border border-[rgba(241,238,232,0.15)] hover:border-[#ff8c59] text-[#f1eee8] hover:bg-[rgba(241,238,232,0.04)] transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Direct Inquiries</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#ff8c59]" />
          </a>

          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-full border border-[rgba(241,238,232,0.15)] hover:border-[rgba(241,238,232,0.3)] text-[#aaa9a4] hover:text-[#f1eee8] transition-colors"
            title="GitHub Repositories"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Hero Bottom Hairline Bar (Reference alignment) */}
      <div className="w-full pt-10 mt-10 border-t border-[rgba(241,238,232,0.1)] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono tracking-[0.2em] text-[#aaa9a4] uppercase gap-4 z-20 px-4 sm:px-6">
        <a
          href="#projects"
          className="flex items-center gap-2 hover:text-[#f1eee8] transition-colors group cursor-pointer"
        >
          <span className="text-[#ff8c59] font-bold">|</span>
          <span>SCROLL TO DISCOVER</span>
          <ArrowDown className="w-3 h-3 text-[#ff8c59] group-hover:translate-y-0.5 transition-transform" />
        </a>

        <div className="text-center text-[#73726d] hidden sm:block">
          <span>BUILDING &amp; SCALING SINCE 2023</span>
        </div>

        <div className="flex items-center gap-2 text-[#b8b5ad]">
          <span>BASED IN INDIA · THINKING BEYOND</span>
          <span className="text-[#ff8c59]">↗</span>
        </div>
      </div>
    </section>
  );
};
