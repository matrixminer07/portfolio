import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="hairline-t py-16 relative z-10 bg-[#020203]">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Large Editorial Name Signature */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-[rgba(241,238,232,0.08)]">
          <div>
            <span className="eyebrow block mb-2">PORTFOLIO EDITION // 2026</span>
            <h2 className="font-serif italic font-normal text-5xl sm:text-7xl lg:text-8xl text-[#f1eee8] tracking-tight">
              Spandan Roy
            </h2>
            <p className="font-mono text-xs text-[#aaa9a4] mt-2">
              Backend Developer & CSE Student · VIT-AP University, Amaravati
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[rgba(241,238,232,0.04)] hover:bg-[#ff8c59] hover:text-[#030303] text-[#aaa9a4] border border-[rgba(241,238,232,0.08)] hover:border-[#ff8c59] font-mono text-xs uppercase tracking-wider transition-all w-fit cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Links & Attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-[#aaa9a4]">
          <div className="flex flex-wrap items-center gap-6">
            <a href="#projects" className="hover:text-[#ff8c59] transition-colors">
              01 // Work
            </a>
            <a href="#skills" className="hover:text-[#ff8c59] transition-colors">
              02 // Expertise
            </a>
            <a href="#experience" className="hover:text-[#ff8c59] transition-colors">
              03 // Journey
            </a>
            <a href="#about" className="hover:text-[#ff8c59] transition-colors">
              04 // About
            </a>
            <a href="#contact" className="hover:text-[#ff8c59] transition-colors">
              05 // Contact
            </a>
          </div>

          <div className="text-[11px] text-[#aaa9a4]/70">
            © {new Date().getFullYear()} Spandan Roy. Designed for reliability and scale.
          </div>
        </div>
      </div>
    </footer>
  );
};
