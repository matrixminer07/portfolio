import React, { useState } from 'react';
import { ArrowUpRight, Github, Filter, ChevronDown } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { PharmaPipeline } from './PharmaPipeline';
import { SonarRadar } from './SonarRadar';
import { CivicFlowTracker } from './CivicFlowTracker';
import { ScrollReveal } from './ScrollReveal';

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({
    nexacliniq: false,
    sonarix: false,
    'civic-tech': false,
  });

  const toggleNotes = (id: string) => {
    setExpandedNotes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProjects = PORTFOLIO_DATA.projects.filter(
    (p) => filter === 'All' || p.category === filter
  );

  const getChapterNumber = (idx: number) => {
    return `0${idx + 1}`;
  };

  const getProjectNotes = (id: string) => {
    switch (id) {
      case 'nexacliniq':
        return 'Architected using modular Python microservices with an asynchronous event dispatch pipeline. Designed to evaluate multi-target compound variances against clinical databases with p99 response times constrained to under 45ms. Incorporates automated risk vector alerts.';
      case 'sonarix':
        return 'Leverages TypeScript and high-speed telemetry workers to ingest acoustic side-scan sonar arrays. Algorithms filter reverberant seabed backscatter and flag high-confidence anomalies to autonomous underwater vehicle (AUV) waypoint planners.';
      case 'civic-tech':
        return 'Engineered on Firebase Auth & Firestore with role-based access rules. Citizen reports automatically calculate ward geographical boundaries, route tickets to sanitation or road divisions, and send real-time SMS/web status broadcasts.';
      default:
        return 'Architected with resilience, modular code separation, and production-ready data structures.';
    }
  };

  const getTechBadgeConfig = (tech: string) => {
    const t = tech.toLowerCase().trim();

    // Java: warm coffee amber/orange with vibrant accent
    if (t === 'java') {
      return {
        container: 'bg-[#ea580c]/12 text-[#fb923c] border-[#ea580c]/35 hover:border-[#fb923c]/70 hover:bg-[#ea580c]/20 shadow-[0_0_12px_rgba(234,88,12,0.12)]',
        dot: 'bg-[#fb923c]',
      };
    }

    // Spring Boot: iconic vivid spring leaf green
    if (t.includes('spring')) {
      return {
        container: 'bg-[#16a34a]/12 text-[#4ade80] border-[#16a34a]/35 hover:border-[#4ade80]/70 hover:bg-[#16a34a]/20 shadow-[0_0_12px_rgba(22,163,74,0.12)]',
        dot: 'bg-[#4ade80]',
      };
    }

    // Python: electric blue / cyan
    if (t.includes('python')) {
      return {
        container: 'bg-[#0284c7]/12 text-[#38bdf8] border-[#0284c7]/35 hover:border-[#38bdf8]/70 hover:bg-[#0284c7]/20 shadow-[0_0_12px_rgba(2,132,199,0.12)]',
        dot: 'bg-[#38bdf8]',
      };
    }

    // TypeScript: cobalt royal blue
    if (t.includes('typescript') || t === 'ts') {
      return {
        container: 'bg-[#2563eb]/12 text-[#60a5fa] border-[#2563eb]/35 hover:border-[#60a5fa]/70 hover:bg-[#2563eb]/20 shadow-[0_0_12px_rgba(37,99,235,0.12)]',
        dot: 'bg-[#60a5fa]',
      };
    }

    // React: electric cyan
    if (t.includes('react')) {
      return {
        container: 'bg-[#0891b2]/12 text-[#22d3ee] border-[#0891b2]/35 hover:border-[#22d3ee]/70 hover:bg-[#0891b2]/20 shadow-[0_0_12px_rgba(8,145,178,0.12)]',
        dot: 'bg-[#22d3ee]',
      };
    }

    // C++ / C: rose crimson
    if (t.includes('c++') || t === 'c') {
      return {
        container: 'bg-[#e11d48]/12 text-[#fb7185] border-[#e11d48]/35 hover:border-[#fb7185]/70 hover:bg-[#e11d48]/20 shadow-[0_0_12px_rgba(225,29,72,0.12)]',
        dot: 'bg-[#fb7185]',
      };
    }

    // MySQL / SQL / DBMS: deep indigo
    if (t.includes('sql') || t.includes('mysql') || t.includes('dbms')) {
      return {
        container: 'bg-[#4f46e5]/12 text-[#818cf8] border-[#4f46e5]/35 hover:border-[#818cf8]/70 hover:bg-[#4f46e5]/20 shadow-[0_0_12px_rgba(79,70,229,0.12)]',
        dot: 'bg-[#818cf8]',
      };
    }

    // Firebase: warm honey amber
    if (t.includes('firebase') || t.includes('firestore')) {
      return {
        container: 'bg-[#d97706]/12 text-[#fbbf24] border-[#d97706]/35 hover:border-[#fbbf24]/70 hover:bg-[#d97706]/20 shadow-[0_0_12px_rgba(217,119,6,0.12)]',
        dot: 'bg-[#fbbf24]',
      };
    }

    // FastAPI / APIs / REST: bright teal
    if (t.includes('api') || t.includes('rest') || t.includes('fastapi')) {
      return {
        container: 'bg-[#0d9488]/12 text-[#2dd4bf] border-[#0d9488]/35 hover:border-[#2dd4bf]/70 hover:bg-[#0d9488]/20 shadow-[0_0_12px_rgba(13,148,136,0.12)]',
        dot: 'bg-[#2dd4bf]',
      };
    }

    // Docker: sky blue
    if (t.includes('docker')) {
      return {
        container: 'bg-[#0284c7]/12 text-[#38bdf8] border-[#0284c7]/35 hover:border-[#38bdf8]/70 hover:bg-[#0284c7]/20 shadow-[0_0_12px_rgba(2,132,199,0.12)]',
        dot: 'bg-[#38bdf8]',
      };
    }

    // Tailwind CSS: modern cyan
    if (t.includes('tailwind')) {
      return {
        container: 'bg-[#06b6d4]/12 text-[#67e8f9] border-[#06b6d4]/35 hover:border-[#67e8f9]/70 hover:bg-[#06b6d4]/20 shadow-[0_0_12px_rgba(6,182,212,0.12)]',
        dot: 'bg-[#67e8f9]',
      };
    }

    // OpenCV / Sonar / Telemetry: vibrant purple
    if (t.includes('opencv') || t.includes('sonar') || t.includes('telemetry') || t.includes('acoustics')) {
      return {
        container: 'bg-[#9333ea]/12 text-[#c084fc] border-[#9333ea]/35 hover:border-[#c084fc]/70 hover:bg-[#9333ea]/20 shadow-[0_0_12px_rgba(147,51,234,0.12)]',
        dot: 'bg-[#c084fc]',
      };
    }

    // Fallback: warm editorial orange
    return {
      container: 'bg-[#ff8c59]/12 text-[#ff8c59] border-[#ff8c59]/30 hover:border-[#ff8c59]/60 hover:bg-[#ff8c59]/20 shadow-[0_0_12px_rgba(255,140,89,0.1)]',
      dot: 'bg-[#ff8c59]',
    };
  };

  return (
    <section id="projects" className="py-20 hairline-t">
      {/* Chapter 01 Header */}
      <ScrollReveal direction="up">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pt-12 gap-6">
          <div>
            <div className="eyebrow mb-2">
              CHAPTER 01 // SELECTED WORK
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight [text-wrap:balance]">
              <span className="font-serif italic font-normal text-[#ff8c59]">
                Architectures, pipelines &
              </span>{' '}
              <span className="font-sans font-medium text-[#f1eee8]">
                engineering systems.
              </span>
            </h2>
          </div>
          <p className="font-mono text-xs text-[#aaa9a4] max-w-sm">
            Highlighting predictive AI decision platforms, acoustic robotics pipelines, and scalable civic infrastructure.
          </p>
        </div>
      </ScrollReveal>

      {/* Filter Tabs */}
      <ScrollReveal direction="up" delay={100}>
        <div className="flex flex-wrap items-center gap-2 mb-12 font-mono text-xs">
          <span className="text-[#aaa9a4] mr-2 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-[#ff8c59]" /> Filter Work:
          </span>
          {['All', 'AI & Analytics', 'Robotics & Systems', 'Full-Stack & Civic'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-[#ff8c59]/15 text-[#ff8c59] border-[#ff8c59]/50 shadow-[0_0_15px_rgba(255,140,89,0.15)] font-semibold'
                  : 'bg-[rgba(241,238,232,0.03)] text-[#aaa9a4] border-[rgba(241,238,232,0.08)] hover:text-[#f1eee8] hover:border-[rgba(241,238,232,0.18)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Project Showcase Cards */}
      <div className="space-y-14">
        {filteredProjects.map((project, idx) => {
          const isExpanded = !!expandedNotes[project.id];
          return (
            <ScrollReveal key={project.id} direction="up" delay={idx * 120}>
              <div className="editorial-panel p-6 sm:p-9 rounded-3xl relative overflow-hidden group">
                
                {/* Subtle corner warmth */}
                <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-15 group-hover:opacity-30 transition-opacity duration-700 bg-[#ff8c59]" />

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Case Study Narrative & Data Metrics */}
                  <div className="lg:col-span-7 space-y-4">
                    {/* Chapter & Badge */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="eyebrow">
                        {getChapterNumber(idx)} / {project.category.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-mono text-[#aaa9a4] bg-[rgba(241,238,232,0.04)] px-2.5 py-0.5 rounded border border-[rgba(241,238,232,0.08)]">
                        {project.badge}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="font-sans text-2xl sm:text-3xl font-bold text-[#f1eee8]">
                      <span className="font-serif italic font-normal text-[#f1eee8] group-hover:text-[#ff8c59] transition-colors">
                        {project.title.split('—')[0].trim()}
                      </span>
                      {project.title.includes('—') && (
                        <span className="text-xl sm:text-2xl font-light text-[#aaa9a4]">
                          {' '}— {project.title.split('—')[1].trim()}
                        </span>
                      )}
                    </h3>

                    {/* Small Color-Coded Technology Badges (Visually Identifies Stack) */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5 pb-1">
                      <span className="text-[10px] font-mono text-[#aaa9a4]/70 uppercase tracking-widest mr-1">
                        Stack:
                      </span>
                      {project.techStack?.map((tech) => {
                        const config = getTechBadgeConfig(tech);
                        return (
                          <span
                            key={tech}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10.5px] sm:text-[11px] font-mono font-medium border transition-all cursor-default select-none ${config.container}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
                            <span>{tech}</span>
                          </span>
                        );
                      })}
                    </div>

                    {/* Description */}
                    <p className="text-[#aaa9a4] leading-relaxed text-sm sm:text-base">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2 text-xs font-mono text-[#f1eee8] pt-1">
                      {project.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span className="text-[#ff8c59] font-bold shrink-0">›</span>
                          <span className="text-[#aaa9a4]">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-[rgba(241,238,232,0.03)] border border-[rgba(241,238,232,0.08)] text-[11px] font-mono text-[#aaa9a4]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Expandable Engineering Notes Accordion (Inspired by Sarthak's Workbench Detail) */}
                    <div className="pt-2">
                      <button
                        onClick={() => toggleNotes(project.id)}
                        className="w-full text-left py-2 px-3 rounded-lg bg-[rgba(241,238,232,0.02)] hover:bg-[rgba(241,238,232,0.05)] border border-[rgba(241,238,232,0.07)] flex items-center justify-between text-xs font-mono text-[#aaa9a4] hover:text-[#f1eee8] transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-[#ff8c59]">✦</span>
                          <span>Inside the architectural notes</span>
                        </span>
                        <span className="text-sm font-bold text-[#ff8c59]">
                          {isExpanded ? '−' : '+'}
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="p-3.5 mt-2 rounded-xl bg-[#070709] border border-[rgba(241,238,232,0.08)] text-xs text-[#aaa9a4] leading-relaxed font-sans space-y-2 animate-fadeIn">
                          <p>{getProjectNotes(project.id)}</p>
                          <div className="text-[10px] font-mono text-[#ff8c59] pt-1">
                            Architecture verified for scalable distributed workloads.
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[rgba(241,238,232,0.05)] hover:bg-[#ff8c59] text-[#f1eee8] hover:text-[#030303] border border-[rgba(241,238,232,0.12)] hover:border-[#ff8c59] font-mono text-xs transition-all shadow-sm font-medium"
                      >
                        <Github className="w-4 h-4" />
                        <span>Inspect {project.title.split('—')[0].trim()} Repository</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Interactive Simulation Visualizer */}
                  <div className="lg:col-span-5 sticky top-24">
                    {project.demoType === 'pharma' && <PharmaPipeline />}
                    {project.demoType === 'sonar' && <SonarRadar />}
                    {project.demoType === 'civic' && <CivicFlowTracker />}
                  </div>

                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};
