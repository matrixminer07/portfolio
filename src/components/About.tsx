import React from 'react';
import { Info, Download, ArrowUpRight, FileText } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface AboutProps {
  onOpenResume: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenResume }) => {
  return (
    <section id="about" className="py-20 hairline-t">
      <div className="max-w-3xl mb-12 pt-12">
        <div className="eyebrow mb-2">
          // PERSPECTIVE & BACKGROUND
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight [text-wrap:balance]">
          <span className="font-serif italic font-normal text-[#ff8c59]">
            Deconstructing complex problems
          </span>{' '}
          <span className="font-sans font-medium text-[#f1eee8]">
            into elegant backend pipelines.
          </span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Narrative & Focus */}
        <div className="lg:col-span-7 space-y-6 text-[#aaa9a4] leading-relaxed text-base font-sans">
          <p>
            I am a Computer Science and Engineering undergraduate specializing in{' '}
            <strong className="text-[#f1eee8]">Data Analytics at {PORTFOLIO_DATA.personal.university}</strong>. My core passion lies in understanding how distributed systems, database management engines, and backend frameworks communicate efficiently behind the user interface.
          </p>
          <p>
            From engineering conceptual architectures like{' '}
            <strong className="text-[#f1eee8]">NexaCliniQ</strong> (an AI-assisted pharmaceutical risk prediction platform) to{' '}
            <strong className="text-[#f1eee8]">Sonarix</strong> (marine debris sonar anomaly detection), I combine foundational CS fundamentals (DSA, DBMS, Computer Networks, TCP/IP) with practical implementations in Java, Python, and modern RESTful APIs.
          </p>
          <p>
            Beyond solo engineering, I co-lead the{' '}
            <strong className="text-[#f1eee8]">Hi-tech team at the Microsoft Student Chapter (VIT-AP)</strong>, facilitating technical workshops, bootcamps, and hackathons for student peers. I thrive in collaborative, high-velocity engineering environments.
          </p>
        </div>

        {/* Quick Facts Card */}
        <div className="lg:col-span-5">
          <div className="editorial-panel p-6 sm:p-7 rounded-2xl space-y-6">
            <h3 className="font-sans text-base font-bold text-[#f1eee8] flex items-center gap-2">
              <Info className="w-4 h-4 text-[#ff8c59]" />
              Quick Specifications
            </h3>

            <div className="space-y-4 font-mono text-xs">
              <div className="flex justify-between py-2 border-b border-[rgba(241,238,232,0.08)]">
                <span className="text-[#aaa9a4]">Degree</span>
                <span className="text-[#f1eee8] text-right">{PORTFOLIO_DATA.personal.degree}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[rgba(241,238,232,0.08)]">
                <span className="text-[#aaa9a4]">Graduation</span>
                <span className="text-[#ff8c59] font-semibold">{PORTFOLIO_DATA.personal.gradYear} (Expected)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[rgba(241,238,232,0.08)]">
                <span className="text-[#aaa9a4]">Campus</span>
                <span className="text-[#f1eee8] flex items-center gap-2">
                  <span>VIT-AP, Amaravati</span>
                  <span className="h-5 px-1 bg-white rounded flex items-center justify-center shrink-0 shadow-sm border border-white/20">
                    <img src="/assets/vit-logo.png" alt="VIT-AP" width="20" height="14" loading="lazy" className="h-3.5 w-auto object-contain" />
                  </span>
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[rgba(241,238,232,0.08)]">
                <span className="text-[#aaa9a4]">Hometown School</span>
                <span className="text-[#f1eee8] flex items-center gap-2">
                  <span>D.A.V. Model School, Durgapur</span>
                  <span className="w-5 h-5 bg-white rounded p-0.5 flex items-center justify-center shrink-0 shadow-sm border border-white/20 overflow-hidden">
                    <img src="/assets/dav-logo.jpg" alt="DAV" width="20" height="20" loading="lazy" className="w-full h-full object-contain" />
                  </span>
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[rgba(241,238,232,0.08)]">
                <span className="text-[#aaa9a4]">Leadership</span>
                <span className="text-[#f1eee8] font-medium flex items-center gap-1.5">
                  <svg viewBox="0 0 21 21" fill="none" className="w-3 h-3 shrink-0" aria-hidden="true">
                    <rect x="1" y="1" width="9" height="9" fill="#f25022" rx="0.5" />
                    <rect x="11" y="1" width="9" height="9" fill="#7fba00" rx="0.5" />
                    <rect x="1" y="11" width="9" height="9" fill="#00a4ef" rx="0.5" />
                    <rect x="11" y="11" width="9" height="9" fill="#ffb900" rx="0.5" />
                  </svg>
                  <span>Co Lead, Hi-tech (MSC)</span>
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#aaa9a4]">Work Model</span>
                <span className="text-[#f1eee8]">{PORTFOLIO_DATA.personal.workModel}</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <a
                href="/Spandan_Roy_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Spandan_Roy_Resume.pdf"
                className="w-full py-2.5 px-4 rounded-lg bg-[#ff8c59] hover:bg-[#ffa073] text-[#030303] text-xs font-mono font-semibold text-center flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume (PDF)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onOpenResume}
                className="w-full py-2 px-4 rounded-lg bg-[rgba(241,238,232,0.04)] hover:bg-[rgba(241,238,232,0.08)] text-[#aaa9a4] hover:text-[#f1eee8] border border-[rgba(241,238,232,0.08)] text-[11px] font-mono text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#ff8c59]" />
                <span>View Full Curriculum Vitae</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
