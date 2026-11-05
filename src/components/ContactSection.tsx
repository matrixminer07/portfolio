import React, { useState, useMemo } from 'react';
import { Mail, Linkedin, Github, Copy, Check, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { getContactEmail, createRateLimiter } from '../utils/security';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const emailAddress = useMemo(() => getContactEmail(), []);
  const copyLimiter = useMemo(() => createRateLimiter(800), []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    copyLimiter(() => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailAddress).then(() => {
          setCopiedEmail(true);
          setTimeout(() => setCopiedEmail(false), 2000);
        }).catch(() => {
          // Graceful fallback
        });
      }
    });
  };

  return (
    <section id="contact" className="py-24 hairline-t">
      <div className="max-w-4xl mx-auto text-center space-y-8 pt-12">
        <div className="eyebrow mx-auto justify-center">
          // INQUIRIES & CONTACT
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight [text-wrap:balance]">
          <span className="font-serif italic font-normal text-[#ff8c59]">
            Let's build meaningful
          </span>{' '}
          <span className="font-sans font-medium text-[#f1eee8]">
            systems together.
          </span>
        </h2>

        <p className="text-[#aaa9a4] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-sans">
          Whether you have an internship opportunity, a backend software initiative, hackathon collaboration, or wish to discuss distributed architectures and Java Spring Boot—my inbox is always open.
        </p>

        {/* Direct Contact Links */}
        <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
          <a
            href={`mailto:${emailAddress}`}
            className="px-6 py-3.5 rounded-full bg-[#f1eee8] text-[#030303] hover:bg-[#ff8c59] hover:text-[#030303] font-mono text-xs uppercase tracking-wider font-medium flex items-center gap-2 transition-all shadow-md"
          >
            <Mail className="w-4 h-4" />
            <span>{emailAddress}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="px-5 py-3.5 rounded-full border border-[rgba(241,238,232,0.15)] hover:border-[#ff8c59] bg-[rgba(241,238,232,0.03)] text-[#f1eee8] font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#aaa9a4]" />}
            <span>{copiedEmail ? 'Email Copied' : 'Copy Email'}</span>
          </button>
        </div>

        {/* Social Links Row */}
        <div className="pt-4 flex justify-center items-center gap-6 font-mono text-xs text-[#aaa9a4]">
          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f1eee8] flex items-center gap-1.5 transition-colors group"
          >
            <Linkedin className="w-4 h-4 text-[#ff8c59] group-hover:scale-110 transition-transform" />
            <span>LinkedIn</span>
            <span className="text-[10px] text-[#ff8c59]">↗</span>
          </a>

          <span className="text-[rgba(241,238,232,0.2)]">/</span>

          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f1eee8] flex items-center gap-1.5 transition-colors group"
          >
            <Github className="w-4 h-4 text-[#ff8c59] group-hover:scale-110 transition-transform" />
            <span>GitHub</span>
            <span className="text-[10px] text-[#ff8c59]">↗</span>
          </a>

          <span className="text-[rgba(241,238,232,0.2)]">/</span>

          <span className="text-[#aaa9a4]">Amaravati, India</span>
        </div>
      </div>
    </section>
  );
};
