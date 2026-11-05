import React from 'react';
import { X, Printer, Copy, Check, ExternalLink, Mail, MapPin, Download, FileText } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { getContactEmail, createRateLimiter } from '../utils/security';

const MicrosoftIcon = () => (
  <svg viewBox="0 0 21 21" fill="none" className="w-3 h-3 shrink-0" aria-hidden="true">
    <rect x="1" y="1" width="9" height="9" fill="#f25022" rx="0.5" />
    <rect x="11" y="1" width="9" height="9" fill="#7fba00" rx="0.5" />
    <rect x="1" y="11" width="9" height="9" fill="#00a4ef" rx="0.5" />
    <rect x="11" y="11" width="9" height="9" fill="#ffb900" rx="0.5" />
  </svg>
);

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);
  const emailAddress = React.useMemo(() => getContactEmail(), []);
  const copyLimiter = React.useMemo(() => createRateLimiter(800), []);

  if (!isOpen) return null;

  const handleCopy = () => {
    copyLimiter(() => {
      const resumeText = `
${PORTFOLIO_DATA.personal.name}
${PORTFOLIO_DATA.personal.title} | ${PORTFOLIO_DATA.personal.degree}
Email: ${emailAddress}
LinkedIn: ${PORTFOLIO_DATA.personal.linkedin} | GitHub: ${PORTFOLIO_DATA.personal.github}

SUMMARY:
${PORTFOLIO_DATA.personal.summary}

EDUCATION:
${PORTFOLIO_DATA.education.map(e => `${e.institution} - ${e.degree} (${e.period})`).join('\n')}

TECHNICAL SKILLS:
Languages: Java, Python, JavaScript, SQL, TypeScript
Backend: Spring Boot, Node.js, Express, REST APIs, Microservices
Databases: MySQL, MongoDB, Firebase
Theory: DSA, Computer Networks, TCP/IP, DBMS

EXPERIENCE:
${PORTFOLIO_DATA.experiences.map(exp => `${exp.role} - ${exp.organization} (${exp.period})\n${exp.description}`).join('\n\n')}
    `.trim();

      navigator.clipboard.writeText(resumeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#08080a] border border-[rgba(241,238,232,0.14)] rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-[#f1eee8]">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-[#0c0c0f] border-b border-[rgba(241,238,232,0.08)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[rgba(241,238,232,0.04)] text-[#ff8c59] border border-[rgba(241,238,232,0.12)] flex items-center justify-center font-bold text-xs font-mono">
              CV
            </div>
            <div>
              <h2 className="font-serif italic font-normal text-[#f1eee8] text-lg">Spandan Roy — Curriculum Vitae</h2>
              <p className="text-[11px] font-mono text-[#aaa9a4]">Verified Academic & Backend Portfolio Spec</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/Spandan_Roy_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Spandan_Roy_Resume.pdf"
              className="px-3 py-1.5 rounded-lg bg-[#ff8c59] hover:bg-[#ffa073] text-[#030303] text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              title="Download Verified Resume PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-[rgba(241,238,232,0.04)] hover:bg-[rgba(241,238,232,0.08)] text-xs font-mono text-[#f1eee8] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy Resume Plain Text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#ff8c59]" />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-[rgba(241,238,232,0.04)] hover:bg-[rgba(241,238,232,0.08)] text-xs font-mono text-[#aaa9a4] hover:text-[#f1eee8] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print to PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[rgba(241,238,232,0.04)] hover:bg-rose-500/20 hover:text-rose-400 text-[#aaa9a4] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Printable Sheet */}
        <div className="p-8 overflow-y-auto space-y-6 font-sans text-sm">
          {/* Quick PDF Redirect Banner */}
          <div className="p-4 rounded-xl bg-[rgba(255,140,89,0.08)] border border-[#ff8c59]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-[#ff8c59] shrink-0" />
              <span className="text-[#f1eee8]">
                Official verified one-page PDF resume ready for immediate download and review.
              </span>
            </div>
            <a
              href="/Spandan_Roy_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Spandan_Roy_Resume.pdf"
              className="px-3.5 py-1.5 rounded-lg bg-[#ff8c59] hover:bg-[#ffa073] text-[#030303] font-bold font-mono text-xs flex items-center gap-1.5 transition-all shadow-sm shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Document</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          {/* Header */}
          <div className="border-b border-[rgba(241,238,232,0.08)] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-serif italic text-[#f1eee8]">SPANDAN ROY</h1>
              <p className="text-[#ff8c59] font-mono text-xs mt-1 uppercase tracking-wider">Backend Developer & CSE Undergraduate (Data Analytics)</p>
              <p className="text-[#aaa9a4] text-xs mt-1">Vellore Institute of Technology (VIT-AP) · Expected 2029</p>
            </div>
            <div className="font-mono text-xs text-[#aaa9a4] space-y-1 sm:text-right">
              <p className="flex sm:justify-end items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#ff8c59]" />
                <a href={`mailto:${emailAddress}`} className="hover:text-[#ff8c59] underline">
                  {emailAddress}
                </a>
              </p>
              <p className="flex sm:justify-end items-center gap-1.5 text-[#aaa9a4]">
                <MapPin className="w-3.5 h-3.5 text-violet-400" />
                {PORTFOLIO_DATA.personal.currentLocation}
              </p>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="eyebrow block mb-2">// PROFESSIONAL SUMMARY</h3>
            <p className="text-[#aaa9a4] leading-relaxed text-sm">
              {PORTFOLIO_DATA.personal.summary}
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="eyebrow block mb-3">// TECHNICAL STACK</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#070709] border border-[rgba(241,238,232,0.08)]">
                <span className="text-[#aaa9a4] block mb-1">LANGUAGES</span>
                <span className="text-[#f1eee8] font-medium">Java, Python, JavaScript (ES6+), SQL, TypeScript</span>
              </div>
              <div className="p-3 rounded-lg bg-[#070709] border border-[rgba(241,238,232,0.08)]">
                <span className="text-[#aaa9a4] block mb-1">BACKEND & FRAMEWORKS</span>
                <span className="text-[#f1eee8] font-medium">Spring Boot, Node.js, Express.js, RESTful APIs, Flask</span>
              </div>
              <div className="p-3 rounded-lg bg-[#070709] border border-[rgba(241,238,232,0.08)]">
                <span className="text-[#aaa9a4] block mb-1">DATABASES & CLOUD</span>
                <span className="text-[#f1eee8] font-medium">MySQL, MongoDB, DBMS, Firebase Auth & Firestore</span>
              </div>
              <div className="p-3 rounded-lg bg-[#070709] border border-[rgba(241,238,232,0.08)]">
                <span className="text-[#aaa9a4] block mb-1">SYSTEMS & THEORY</span>
                <span className="text-[#f1eee8] font-medium">DSA, Computer Networks, TCP/IP, HTTP/HTTPS Protocols</span>
              </div>
            </div>
          </div>

          {/* Featured Projects */}
          <div>
            <h3 className="eyebrow block mb-3">// ENGINEERING PROJECTS</h3>
            <div className="space-y-4">
              {PORTFOLIO_DATA.projects.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-[#070709] border border-[rgba(241,238,232,0.08)] space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between">
                    <span className="text-[#f1eee8] font-bold">{proj.title}</span>
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-[#ff8c59] hover:underline flex items-center gap-1"
                    >
                      Repo Link <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-xs text-[#aaa9a4]">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[rgba(241,238,232,0.03)] border border-[rgba(241,238,232,0.08)] text-[#aaa9a4]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership & Experience */}
          <div>
            <h3 className="eyebrow block mb-3">// LEADERSHIP & ACTIVITIES</h3>
            <div className="space-y-3">
              {PORTFOLIO_DATA.experiences.map((exp, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#070709] border border-[rgba(241,238,232,0.08)] space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#f1eee8] font-bold flex items-center gap-1.5">
                      <MicrosoftIcon />
                      <span>{exp.role} — {exp.organization}</span>
                    </span>
                    <span className="font-mono text-[#ff8c59]">{exp.period}</span>
                  </div>
                  {exp.description ? (
                    <p className="text-xs text-[#aaa9a4]">{exp.description}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="eyebrow block mb-3">// EDUCATION</h3>
            <div className="space-y-2">
              {PORTFOLIO_DATA.education.map((edu, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#070709] border border-[rgba(241,238,232,0.08)] flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[#f1eee8] font-bold block">{edu.institution}</span>
                    <span className="text-[#aaa9a4]">{edu.degree}</span>
                  </div>
                  <span className="font-mono text-[#aaa9a4]">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0c0c0f] border-t border-[rgba(241,238,232,0.08)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#aaa9a4]">
          <span>Ready for Software Development Engineer & Backend Internships</span>
          <div className="flex items-center gap-2">
            <a
              href="/Spandan_Roy_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Spandan_Roy_Resume.pdf"
              className="px-4 py-1.5 rounded-lg bg-[#ff8c59] text-[#030303] hover:bg-[#ffa073] font-bold uppercase text-[11px] transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Document</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[rgba(241,238,232,0.06)] hover:bg-[rgba(241,238,232,0.12)] text-[#f1eee8] font-semibold uppercase text-[11px] transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
