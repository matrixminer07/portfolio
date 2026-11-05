import React, { useState, useRef, useEffect } from 'react';
import {
  Code2,
  Server,
  Database,
  Cpu,
  Layout,
  Wrench,
  Search,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { SiGoogle, SiHackerrank } from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import {
  SKILL_REGISTRY,
  CardWatermark,
  MathWorksIcon,
  RestApiIcon,
  DsaIcon,
  GeminiSparkIcon,
} from './SkillIcons';
import { PORTFOLIO_DATA } from '../data/portfolioData';

// ---------------------------------------------------------------------------
// Marquee Items Definition
// ---------------------------------------------------------------------------
const MARQUEE_ITEMS = [
  { name: 'Java', skillKey: 'Java' },
  { name: 'Spring Boot', skillKey: 'Spring Boot' },
  { name: 'Python', skillKey: 'Python' },
  { name: 'SQL', skillKey: 'SQL' },
  { name: 'MySQL', skillKey: 'MySQL' },
  { name: 'MongoDB', skillKey: 'MongoDB' },
  { name: 'Node.js', skillKey: 'Node.js' },
  { name: 'React.js', skillKey: 'React.js' },
  { name: 'TypeScript', skillKey: 'TypeScript (Basic)' },
  { name: 'Tailwind CSS', skillKey: 'Tailwind CSS' },
  { name: 'Git & GitHub', skillKey: 'Git & GitHub' },
  { name: 'VS Code', skillKey: 'VS Code' },
  { name: 'Google Gemini', skillKey: 'Google Gemini AI' },
  { name: 'Firebase', skillKey: 'Firebase' },
  { name: 'REST APIs', skillKey: 'RESTful APIs' },
  { name: 'Data Structures', skillKey: 'Data Structures & Algo (DSA)' },
];

// ---------------------------------------------------------------------------
// 3-Level Proficiency Indicator with Hover Tooltip
// ---------------------------------------------------------------------------
const ProficiencyIndicator: React.FC<{ level: 'Core' | 'Advanced' | 'Practicing' }> = ({
  level,
}) => {
  const config = {
    Core: {
      filled: 3,
      label: 'Strong',
      description: 'Core Proficiency · Production-Ready',
    },
    Advanced: {
      filled: 2,
      label: 'Comfortable',
      description: 'Advanced · Extensively Applied',
    },
    Practicing: {
      filled: 1,
      label: 'Learning',
      description: 'Practicing · Active Exploration',
    },
  }[level];

  return (
    <div className="relative group/tooltip flex items-center ml-auto pl-1">
      <div
        className="flex items-center gap-0.5 cursor-help"
        aria-label={`Proficiency: ${config.label} (${config.description})`}
      >
        {[1, 2, 3].map((bar) => (
          <span
            key={bar}
            className={`w-1 rounded-full transition-all duration-200 ${
              bar <= config.filled
                ? 'h-2.5 bg-[#ff8c59] shadow-[0_0_6px_rgba(255,140,89,0.7)]'
                : 'h-1.5 bg-[rgba(241,238,232,0.15)]'
            }`}
          />
        ))}
      </div>

      {/* Floating Tooltip */}
      <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-md bg-[#09090c] border border-[#ff8c59]/40 text-[#f1eee8] font-mono text-[10px] whitespace-nowrap shadow-2xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-150 z-30">
        <span className="text-[#ff8c59] font-semibold">{config.label}</span>
        <span className="text-[#aaa9a4]"> · {config.description.split(' · ')[1]}</span>
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#09090c]" />
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Interactive Skill Chip (Logo in muted cream, switches to brand color on hover)
// ---------------------------------------------------------------------------
interface SkillChipProps {
  name: string;
  level: 'Core' | 'Advanced' | 'Practicing';
  index: number;
  isInView: boolean;
}

const SkillChip: React.FC<SkillChipProps> = ({ name, level, index, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const skillMeta = SKILL_REGISTRY[name];
  const IconComponent = skillMeta?.icon || Code2;
  const brandColor = skillMeta?.brandColor || '#ff8c59';

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group/chip relative px-3 py-1.5 rounded-xl bg-[rgba(241,238,232,0.03)] border border-[rgba(241,238,232,0.08)] hover:border-[#ff8c59]/50 hover:bg-[rgba(241,238,232,0.06)] text-xs font-mono text-[#f1eee8] transition-all duration-200 flex items-center gap-2 cursor-default select-none opacity-0 shadow-sm"
      style={{
        animation: isInView
          ? `chipEntrance 0.35s cubic-bezier(0.16, 1, 0.3, 1) ${index * 45}ms forwards`
          : 'none',
      }}
    >
      {/* Real brand logo: muted cream (70% opacity) at rest, switches to brand color with soft glow on hover */}
      <span
        className="transition-all duration-200 shrink-0 flex items-center justify-center"
        style={{
          color: isHovered ? brandColor : 'rgba(241, 238, 232, 0.7)',
          transform: isHovered ? 'scale(1.15)' : 'scale(1)',
          filter: isHovered ? `drop-shadow(0 0 8px ${brandColor}99)` : 'none',
        }}
      >
        <IconComponent className="w-3.5 h-3.5" />
      </span>

      <span className="font-medium text-[#f1eee8]">{name}</span>

      {/* 3-Level Proficiency Indicator */}
      <ProficiencyIndicator level={level} />
    </div>
  );
};

// ---------------------------------------------------------------------------
// TiltCard Component: Mouse-following Radial Spotlight & Subtle 3D Tilt (Max 4°)
// ---------------------------------------------------------------------------
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  categoryTitle: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = '', categoryTitle }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Respect prefers-reduced-motion and touch devices
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalized [-1, 1]
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    // Max 3.5 degrees (capped under 4 degrees)
    const rotateY = normX * 3.2;
    const rotateX = -normY * 3.2;

    setTilt({ x: rotateX, y: rotateY });
    setMousePos({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`editorial-panel p-6 sm:p-7 rounded-2xl relative group flex flex-col justify-between overflow-hidden transition-transform duration-200 ease-out border border-[rgba(241,238,232,0.1)] hover:border-[#ff8c59]/50 hover:shadow-[0_16px_40px_-15px_rgba(0,0,0,0.8),0_0_30px_-10px_rgba(255,140,89,0.15)] ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Mouse-following Orange Radial Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 140, 89, 0.12), transparent 75%)`,
        }}
      />

      {/* Large Faded Logo-Cluster Watermark in Top-Right Corner */}
      <CardWatermark categoryTitle={categoryTitle} />

      <div className="relative z-10 flex flex-col h-full justify-between">{children}</div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Category Generic Icon Helper
// ---------------------------------------------------------------------------
const getCategoryIcon = (icon: string) => {
  const iconClass = 'w-4 h-4 text-[#ff8c59]';
  switch (icon) {
    case 'code':
      return <Code2 className={iconClass} />;
    case 'server':
      return <Server className={iconClass} />;
    case 'database':
      return <Database className={iconClass} />;
    case 'cpu':
      return <Cpu className={iconClass} />;
    case 'layout':
      return <Layout className={iconClass} />;
    case 'wrench':
      return <Wrench className={iconClass} />;
    default:
      return <Code2 className={iconClass} />;
  }
};

// ---------------------------------------------------------------------------
// Concrete Proof: Project Mapping
// ---------------------------------------------------------------------------
const getProjectUsage = (title: string): string => {
  switch (title) {
    case 'Programming Languages':
      return 'NexaCliniQ, Sonarix, Civic-tech';
    case 'Backend & Services':
      return 'NexaCliniQ (FastAPI/Spring), Civic-tech (Spring Boot)';
    case 'Databases & Storage':
      return 'NexaCliniQ (SQL), Civic-tech (MySQL & Firebase)';
    case 'Core Computer Science':
      return 'Sonarix (Acoustics & DSP Algorithms)';
    case 'Frontend Web':
      return 'Civic-tech (React & Tailwind), Portfolio';
    case 'Dev Tools & AI':
      return 'NexaCliniQ & Microsoft Student Chapter';
    default:
      return 'NexaCliniQ, Sonarix';
  }
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export const SkillsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Staggered entrance trigger when section scrolls into viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = PORTFOLIO_DATA.skillCategories;

  const filteredCategories = categories.filter((cat) => {
    const matchesTag =
      selectedTag === 'All' ||
      cat.title.toLowerCase().includes(selectedTag.toLowerCase()) ||
      (selectedTag === 'Backend' && cat.title.includes('Backend')) ||
      (selectedTag === 'Core' && cat.title.includes('Core')) ||
      (selectedTag === 'Tools' && cat.title.includes('Tools'));

    const matchesSearch =
      !searchQuery ||
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.skills.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      cat.focus.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTag && matchesSearch;
  });

  return (
    <section id="skills" ref={sectionRef} className="py-20 hairline-t">
      {/* Chapter 02 Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pt-12 gap-6">
        <div>
          <div className="eyebrow mb-2">// CHAPTER 02 // TECHNICAL MATRIX</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight [text-wrap:balance]">
            <span className="font-serif italic font-normal text-[#ff8c59]">
              Engineering across
            </span>{' '}
            <span className="font-sans font-medium text-[#f1eee8]">
              the backend lifecycle.
            </span>
          </h2>
        </div>
        <p className="font-mono text-xs text-[#aaa9a4] max-w-sm">
          Categorized proficiency spanning compiled languages, microservice runtimes, persistence
          layers, and algorithmic theory.
        </p>
      </div>

      {/* Infinite Logo Marquee Strip with Edge Fades */}
      <div className="relative w-full overflow-hidden py-4 mb-10 border-y border-[rgba(241,238,232,0.07)] bg-[rgba(241,238,232,0.015)]">
        {/* Left & Right Gradient Fade Masks */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 md:w-36 bg-gradient-to-r from-[#030303] to-transparent z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 md:w-36 bg-gradient-to-l from-[#030303] to-transparent z-10"
          aria-hidden="true"
        />

        {/* Marquee Track: continuous loop, pauses on hover */}
        <div className="animate-marquee flex items-center gap-4">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => {
            const meta = SKILL_REGISTRY[item.skillKey];
            const Icon = meta?.icon || Code2;
            const brandColor = meta?.brandColor || '#ff8c59';

            return (
              <div
                key={`${item.name}-${idx}`}
                className="group/mitem flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[rgba(241,238,232,0.03)] border border-[rgba(241,238,232,0.08)] hover:border-[#ff8c59]/50 hover:bg-[rgba(241,238,232,0.06)] transition-all cursor-default shrink-0 select-none"
              >
                <span
                  className="transition-colors duration-200 text-[#f1eee8]/70 group-hover/mitem:text-[#ff8c59]"
                  style={{ color: meta ? brandColor : undefined }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span className="font-mono text-xs text-[#f1eee8]">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cleaner Filter Bar & Live Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10">
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {['All', 'Programming', 'Backend', 'Databases', 'Core', 'Frontend', 'Tools'].map(
            (tag) => {
              const isActive = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3.5 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer font-mono text-xs flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#ff8c59]/15 text-[#ff8c59] border-[#ff8c59]/60 shadow-[0_0_14px_rgba(255,140,89,0.2)] font-semibold'
                      : 'bg-[rgba(241,238,232,0.03)] text-[#aaa9a4] border-[rgba(241,238,232,0.08)] hover:text-[#f1eee8] hover:border-[rgba(241,238,232,0.25)]'
                  }`}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#ff8c59]" />}
                  {tag}
                </button>
              );
            }
          )}
        </div>

        <div className="relative w-full sm:w-72 font-mono text-xs">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills (e.g. Java, SQL)..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#09090c] border border-[rgba(241,238,232,0.1)] text-[#f1eee8] placeholder-slate-600 focus:outline-none focus:border-[#ff8c59] transition-colors"
          />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {filteredCategories.map((category) => {
          const isFeatured = category.title === 'Backend & Services';

          return (
            <TiltCard
              key={category.title}
              categoryTitle={category.title}
              className={
                isFeatured && selectedTag === 'All'
                  ? 'md:col-span-2 lg:col-span-2 border-t-2 border-t-[#ff8c59]'
                  : ''
              }
            >
              <div>
                {/* Card Header Row */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[rgba(241,238,232,0.04)] border border-[rgba(241,238,232,0.12)] flex items-center justify-center">
                      {getCategoryIcon(category.icon)}
                    </div>
                    <div>
                      <h3 className="font-sans font-semibold text-[#f1eee8] text-base flex items-center gap-2">
                        <span>{category.title}</span>
                        {isFeatured && (
                          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase text-[#ff8c59] bg-[#ff8c59]/15 border border-[#ff8c59]/30">
                            Primary Specialization
                          </span>
                        )}
                      </h3>
                      <span className="text-[11px] font-mono text-[#aaa9a4]">
                        {category.subtitle}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subtitle / Focus detail for featured card */}
                {isFeatured && selectedTag === 'All' && (
                  <p className="text-xs text-[#aaa9a4] font-sans mb-4 max-w-xl leading-relaxed">
                    Production architecture encompassing distributed microservice contracts, thread-safe concurrency, RESTful lifecycle endpoints, and resilient database transactions.
                  </p>
                )}

                {/* Skill Chips with Real Logos & 3-Level Proficiency Indicators */}
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, index) => (
                    <SkillChip
                      key={skill.name}
                      name={skill.name}
                      level={skill.level as 'Core' | 'Advanced' | 'Practicing'}
                      index={index}
                      isInView={isInView}
                    />
                  ))}
                </div>
              </div>

              {/* Card Footer: Concrete Proof linking to matching projects */}
              <div className="mt-6 pt-4 border-t border-[rgba(241,238,232,0.06)] text-[11px] font-mono text-[#aaa9a4] flex flex-wrap items-center justify-between gap-2">
                <span className="text-[#aaa9a4] flex items-center gap-1">
                  <span>Application:</span>
                </span>
                <a
                  href="#projects"
                  className="group/link inline-flex items-center gap-1 text-[#ff8c59] hover:text-[#ffa073] hover:underline transition-colors"
                >
                  <span>Used in: {getProjectUsage(category.title)}</span>
                  <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </TiltCard>
          );
        })}
      </div>

      {/* Verified Industry Credentials Strip as Badge Cards with Issuer Logos */}
      <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#08080a] border border-[rgba(241,238,232,0.08)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[rgba(241,238,232,0.08)]">
          <div>
            <span className="eyebrow block mb-1">// VERIFIED INDUSTRY CREDENTIALS</span>
            <h3 className="text-base sm:text-lg text-[#f1eee8] font-bold font-sans">
              Evaluated Practical Competencies
            </h3>
          </div>
          <span className="font-mono text-xs text-[#aaa9a4] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#ff8c59]" />
            Rigorous Technical Evaluations
          </span>
        </div>

        {/* 4 Credential Badge Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. HackerRank Python */}
          <div className="p-4 rounded-xl bg-[rgba(241,238,232,0.02)] border border-[rgba(241,238,232,0.08)] hover:border-[#ff8c59]/50 hover:bg-[rgba(241,238,232,0.04)] transition-all duration-200 flex flex-col justify-between group cursor-default">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#00ea64]/10 border border-[#00ea64]/20 flex items-center justify-center text-[#00ea64] group-hover:scale-110 transition-transform">
                <SiHackerrank className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00ea64]/10 text-[#00ea64] border border-[#00ea64]/20 flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5" />
                Verified
              </span>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase text-[#aaa9a4] tracking-wider block">
                HackerRank
              </span>
              <h4 className="font-sans text-sm font-semibold text-[#f1eee8] mt-0.5">
                Python Certification
              </h4>
            </div>
          </div>

          {/* 2. HackerRank SQL */}
          <div className="p-4 rounded-xl bg-[rgba(241,238,232,0.02)] border border-[rgba(241,238,232,0.08)] hover:border-[#ff8c59]/50 hover:bg-[rgba(241,238,232,0.04)] transition-all duration-200 flex flex-col justify-between group cursor-default">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#00ea64]/10 border border-[#00ea64]/20 flex items-center justify-center text-[#00ea64] group-hover:scale-110 transition-transform">
                <SiHackerrank className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00ea64]/10 text-[#00ea64] border border-[#00ea64]/20 flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5" />
                Verified
              </span>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase text-[#aaa9a4] tracking-wider block">
                HackerRank
              </span>
              <h4 className="font-sans text-sm font-semibold text-[#f1eee8] mt-0.5">
                SQL Certification
              </h4>
            </div>
          </div>

          {/* 3. MathWorks MATLAB */}
          <div className="p-4 rounded-xl bg-[rgba(241,238,232,0.02)] border border-[rgba(241,238,232,0.08)] hover:border-[#ff8c59]/50 hover:bg-[rgba(241,238,232,0.04)] transition-all duration-200 flex flex-col justify-between group cursor-default">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#d14414]/15 border border-[#d14414]/30 flex items-center justify-center text-[#d14414] group-hover:scale-110 transition-transform">
                <MathWorksIcon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#d14414]/15 text-[#ff8c59] border border-[#d14414]/30 flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5" />
                Certified
              </span>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase text-[#aaa9a4] tracking-wider block">
                MathWorks
              </span>
              <h4 className="font-sans text-sm font-semibold text-[#f1eee8] mt-0.5">
                MATLAB Certified
              </h4>
            </div>
          </div>

          {/* 4. Google Gemini Academy */}
          <div className="p-4 rounded-xl bg-[rgba(241,238,232,0.02)] border border-[rgba(241,238,232,0.08)] hover:border-[#ff8c59]/50 hover:bg-[rgba(241,238,232,0.04)] transition-all duration-200 flex flex-col justify-between group cursor-default">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#4285f4]/15 border border-[#4285f4]/30 flex items-center justify-center text-[#4285f4] group-hover:scale-110 transition-transform">
                <SiGoogle className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#4285f4]/15 text-[#4285f4] border border-[#4285f4]/30 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                Specialist
              </span>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase text-[#aaa9a4] tracking-wider block">
                Google
              </span>
              <h4 className="font-sans text-sm font-semibold text-[#f1eee8] mt-0.5">
                Google Gemini Academy
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
