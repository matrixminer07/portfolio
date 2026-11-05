import React from 'react';
import { GraduationCap, School, MapPin, Calendar } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-20 hairline-t">
      {/* Chapter / Section Header with 48px space above */}
      <div className="max-w-3xl mb-12 pt-12">
        <div className="eyebrow mb-2">
          // ACADEMIC FOUNDATION
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight [text-wrap:balance]">
          <span className="font-serif italic font-normal text-[#ff8c59]">
            Education & academic
          </span>{' '}
          <span className="font-sans font-medium text-[#f1eee8]">
            background.
          </span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        {/* University (VIT-AP) */}
        <ScrollReveal delay={0} className="h-full">
          <div className="editorial-panel p-7 sm:p-8 rounded-2xl flex flex-col h-full border border-[rgba(241,238,232,0.1)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#ff8c59]/50 hover:shadow-[0_16px_40px_-15px_rgba(0,0,0,0.8),0_0_30px_-10px_rgba(255,140,89,0.15)] motion-reduce:hover:translate-y-0">
            {/* Header Block */}
            <div className="space-y-4">
              {/* Row 1: Eyebrow label on the left & date pill on the right */}
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <span className="font-mono text-xs text-[#ff8c59] uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#ff8c59]" />
                  Undergraduate Degree
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#aaa9a4] border border-[rgba(241,238,232,0.12)] bg-[rgba(241,238,232,0.03)] shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-[#ff8c59]" />
                  Aug 2025 – Sep 2029
                </span>
              </div>

              {/* Row 2: 72px Tall Logo Tile (4px padding) */}
              <div className="pt-1">
                <div
                  className="inline-flex items-center justify-center rounded-xl bg-[#f1eee8] p-1 border border-[rgba(241,238,232,0.15)] shadow-sm h-[72px] w-auto max-w-[190px] transition-transform transition-shadow duration-150 ease-out hover:scale-[1.04] hover:shadow-[0_0_18px_rgba(255,140,89,0.35)] select-none motion-reduce:hover:scale-100"
                >
                  <img
                    src="/assets/logos/vit-ap-logo.png"
                    alt="VIT-AP University logo"
                    className="h-full w-auto max-h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Row 3: Institution Name, Degree line, and Location line */}
              <div className="space-y-1.5">
                <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#f1eee8] tracking-tight leading-snug">
                  Vellore Institute of Technology (VIT-AP)
                </h3>
                <p className="text-sm font-medium text-[#aaa9a4]">
                  B.Tech in Computer Science and Engineering (Data Analytics)
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[#aaa9a4] font-mono pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#ff8c59] shrink-0" />
                  <span>Amaravati, Andhra Pradesh</span>
                </div>
              </div>
            </div>

            {/* Hairline Divider with 20px space above & below */}
            <div className="my-5 hairline-t" />

            {/* Bullets with accent markers, hanging indent, text-wrap: pretty, max 62ch */}
            <ul className="space-y-3 text-xs sm:text-sm text-[#aaa9a4] font-sans">
              <li className="flex items-start gap-2.5 max-w-[62ch]">
                <span className="text-[#ff8c59] text-xs mt-[3px] shrink-0 select-none" aria-hidden="true">✦</span>
                <span className="leading-[1.6] [text-wrap:pretty]">Rigorous coursework in Data Structures, Algorithms, DBMS, and Distributed Architectures.</span>
              </li>
              <li className="flex items-start gap-2.5 max-w-[62ch]">
                <span className="text-[#ff8c59] text-xs mt-[3px] shrink-0 select-none" aria-hidden="true">✦</span>
                <span className="leading-[1.6] [text-wrap:pretty]">Active contributor to high-technology developer societies and hackathon teams.</span>
              </li>
              <li className="flex items-start gap-2.5 max-w-[62ch]">
                <span className="text-[#ff8c59] text-xs mt-[3px] shrink-0 select-none" aria-hidden="true">✦</span>
                <span className="leading-[1.6] [text-wrap:pretty]">Specialized in predictive analytics, relational querying, and scalable backend services.</span>
              </li>
            </ul>

            {/* Pinned Footer with 24px space above divider, 20px below it, neutral mono styling */}
            <div className="mt-auto pt-6">
              <div className="border-t border-[rgba(241,238,232,0.08)] mb-5" />
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider text-[#aaa9a4] bg-[rgba(241,238,232,0.03)] border border-[rgba(241,238,232,0.1)]">
                  B.TECH · CSE (DATA ANALYTICS)
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* High School (D.A.V. Model School) */}
        <ScrollReveal delay={120} className="h-full">
          <div className="editorial-panel p-7 sm:p-8 rounded-2xl flex flex-col h-full border border-[rgba(241,238,232,0.1)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#ff8c59]/50 hover:shadow-[0_16px_40px_-15px_rgba(0,0,0,0.8),0_0_30px_-10px_rgba(255,140,89,0.15)] motion-reduce:hover:translate-y-0">
            {/* Header Block */}
            <div className="space-y-4">
              {/* Row 1: Eyebrow label on the left & date pill on the right */}
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <span className="font-mono text-xs text-[#ff8c59] uppercase tracking-wider flex items-center gap-1.5">
                  <School className="w-4 h-4 text-[#ff8c59]" />
                  Schooling & Science
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#aaa9a4] border border-[rgba(241,238,232,0.12)] bg-[rgba(241,238,232,0.03)] shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-[#ff8c59]" />
                  2011 – 2025
                </span>
              </div>

              {/* Row 2: 72px Tall Square Logo Tile (4px padding, tightly cropped crest) */}
              <div className="pt-1">
                <div
                  className="inline-flex items-center justify-center rounded-xl bg-[#f1eee8] p-1 border border-[rgba(241,238,232,0.15)] shadow-sm h-[72px] w-[72px] shrink-0 transition-transform transition-shadow duration-150 ease-out hover:scale-[1.04] hover:shadow-[0_0_18px_rgba(255,140,89,0.35)] select-none motion-reduce:hover:scale-100"
                >
                  <img
                    src="/assets/logos/dav-logo.png"
                    alt="D.A.V. College Managing Committee, D.A.V. Model School Durgapur logo"
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Row 3: Institution Name, Degree line, and Location line */}
              <div className="space-y-1.5">
                <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#f1eee8] tracking-tight leading-snug">
                  D.A.V. Model School, Durgapur
                </h3>
                <p className="text-sm font-medium text-[#aaa9a4]">
                  Senior Secondary (Science) & Secondary
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[#aaa9a4] font-mono pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#ff8c59] shrink-0" />
                  <span>Durgapur, West Bengal, India</span>
                </div>
              </div>
            </div>

            {/* Hairline Divider with 20px space above & below */}
            <div className="my-5 hairline-t" />

            {/* Bullets with removed repeated date ranges, text-wrap: pretty, max 62ch */}
            <ul className="space-y-3 text-xs sm:text-sm text-[#aaa9a4] font-sans">
              <li className="flex items-start gap-2.5 max-w-[62ch]">
                <span className="text-[#ff8c59] text-xs mt-[3px] shrink-0 select-none" aria-hidden="true">✦</span>
                <span className="leading-[1.6] [text-wrap:pretty]">Senior Secondary (Class XI–XII): Rigorous focus on Physics, Chemistry, and Advanced Mathematics.</span>
              </li>
              <li className="flex items-start gap-2.5 max-w-[62ch]">
                <span className="text-[#ff8c59] text-xs mt-[3px] shrink-0 select-none" aria-hidden="true">✦</span>
                <span className="leading-[1.6] [text-wrap:pretty]">Secondary (Class I–X): Strong quantitative, analytical, and computational foundation.</span>
              </li>
              <li className="flex items-start gap-2.5 max-w-[62ch]">
                <span className="text-[#ff8c59] text-xs mt-[3px] shrink-0 select-none" aria-hidden="true">✦</span>
                <span className="leading-[1.6] [text-wrap:pretty]">Regional science exhibitions and Olympiad participation.</span>
              </li>
            </ul>

            {/* Pinned Footer with 24px space above divider, 20px below it, neutral mono styling */}
            <div className="mt-auto pt-6">
              <div className="border-t border-[rgba(241,238,232,0.08)] mb-5" />
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider text-[#aaa9a4] bg-[rgba(241,238,232,0.03)] border border-[rgba(241,238,232,0.1)]">
                  CLASS XII · SCIENCE
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
