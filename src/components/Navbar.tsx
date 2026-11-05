import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, FileText } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [blogModalOpen, setBlogModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Floating Capsule Navigation Bar matching Sarthak Sharma style */}
      <header className="sticky top-4 sm:top-6 z-50 px-4 sm:px-6 w-full flex justify-center pointer-events-none mb-2">
        <div
          className={`w-full max-w-4xl sm:max-w-5xl rounded-full transition-all duration-300 pointer-events-auto flex items-center justify-between px-6 sm:px-8 py-2.5 sm:py-3 border shadow-[0_8px_32px_rgba(0,0,0,0.65)] ${
            scrolled
              ? 'bg-[#101013]/90 backdrop-blur-xl border-white/[0.12] shadow-2xl'
              : 'bg-[#121216]/80 backdrop-blur-md border-white/[0.08]'
          }`}
        >
          {/* Brand Name with exact Playfair Display styling from screenshot */}
          <a
            href="#hero"
            className="text-xl sm:text-[22px] text-[#ffffff] hover:text-[#ff8c59] transition-colors select-none leading-none tracking-[-0.015em]"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 500,
            }}
          >
            {PORTFOLIO_DATA.personal.name}
          </a>

          {/* Desktop Nav Items & Action Button */}
          <div className="hidden md:flex items-center gap-7 lg:gap-8">
            <nav className="flex items-center gap-7 lg:gap-8 font-sans text-[13.5px] font-normal text-[#a1a1aa]">
              <a
                href="#projects"
                className="hover:text-[#ffffff] transition-colors"
              >
                Work
              </a>
              <a
                href="#about"
                className="hover:text-[#ffffff] transition-colors"
              >
                About
              </a>
              <button
                type="button"
                onClick={() => setBlogModalOpen(true)}
                className="hover:text-[#ffffff] transition-colors cursor-pointer"
              >
                Blog
              </button>
            </nav>

            {/* "Let's talk ↗" Pill Button */}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 hover:border-white/30 text-[13px] font-sans font-medium text-[#f4f4f5] transition-all shadow-sm group"
            >
              <span>Let's talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#a1a1aa] group-hover:text-white transition-colors" />
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/15 text-xs font-sans font-medium text-[#f4f4f5]"
            >
              <span>Let's talk</span>
              <ArrowUpRight className="w-3 h-3 text-[#a1a1aa]" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#a1a1aa] hover:text-white rounded-full hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-16 inset-x-4 max-w-md mx-auto rounded-3xl bg-[#0e0e12]/95 backdrop-blur-2xl border border-white/10 p-5 shadow-2xl pointer-events-auto space-y-3 font-sans text-sm animate-fadeIn">
            <div className="flex flex-col space-y-2 text-[#a1a1aa]">
              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-white/5 hover:text-white transition-colors"
              >
                Work
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-white/5 hover:text-white transition-colors"
              >
                About
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setBlogModalOpen(true);
                }}
                className="text-left px-3 py-2 rounded-xl hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
              >
                Blog
              </button>
              <a
                href="/Spandan_Roy_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Spandan_Roy_Resume.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-white/5 hover:text-white transition-colors flex items-center justify-between"
              >
                <span>Resume (PDF)</span>
                <FileText className="w-4 h-4 text-[#ff8c59]" />
              </a>
            </div>

            <div className="pt-2 border-t border-white/10">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-xs font-sans font-medium text-center flex items-center justify-center gap-1.5 text-white transition-all shadow-sm"
              >
                <span>Let's talk</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#a1a1aa]" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Blog & Articles Info Modal */}
      {blogModalOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#0e0e12] border border-white/12 rounded-3xl p-6 sm:p-7 shadow-[0_16px_50px_rgba(0,0,0,0.85)] text-[#f1eee8] space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#ff8c59] tracking-wider uppercase">
                // ENGINEERING BLOG
              </span>
              <button
                onClick={() => setBlogModalOpen(false)}
                aria-label="Close engineering blog modal"
                className="p-1 rounded-lg text-[#aaa9a4] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="font-serif text-2xl text-[#f4f4f5]">
              Articles &amp; Architecture Notes
            </h3>

            <p className="text-sm text-[#aaa9a4] leading-relaxed font-sans">
              Technical articles on distributed backend systems, Java Spring Boot microservices, and AI clinical risk modeling are currently being curated for publication.
            </p>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono text-[#aaa9a4] space-y-1.5">
              <p className="text-[#f4f4f5] font-sans font-semibold">Upcoming Papers:</p>
              <p>› Designing Low-Latency Microservices in Java Spring Boot</p>
              <p>› Filtering Sonar Seabed Reverberation for AUV Planners</p>
              <p>› Multi-Target Predictive Variance in Pharmaceutical AI</p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setBlogModalOpen(false)}
                className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-sans font-medium text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
