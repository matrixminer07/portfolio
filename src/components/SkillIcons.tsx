import React from 'react';
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiSpringboot,
  SiNodedotjs,
  SiExpress,
  SiFlask,
  SiMysql,
  SiMongodb,
  SiFirebase,
  SiReact,
  SiTailwindcss,
  SiHtml5,
  SiGit,
  SiGithub,
  SiGoogle,
  SiHackerrank,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import { TbSql, TbBrandVscode } from 'react-icons/tb';

// 1. Custom SVG Line Icons for skills without standard logos
export const DsaIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <circle cx="12" cy="4" r="2.5" />
    <circle cx="6" cy="18" r="2.5" />
    <circle cx="18" cy="18" r="2.5" />
    <path d="M10.5 6.5L7.5 15.5" />
    <path d="M13.5 6.5L16.5 15.5" />
  </svg>
);

export const TcpIpIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2" y="4" width="20" height="5" rx="1.5" />
    <rect x="2" y="15" width="20" height="5" rx="1.5" />
    <path d="M6 9v6" />
    <path d="M18 9v6" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const RestApiIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M4 12h16" />
    <path d="M15 7l5 5-5 5" />
    <path d="M9 17l-5-5 5-5" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

export const NetworksIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="9" y="2" width="6" height="5" rx="1" />
    <rect x="2" y="17" width="6" height="5" rx="1" />
    <rect x="16" y="17" width="6" height="5" rx="1" />
    <path d="M12 7v5" />
    <path d="M5 17v-3h14v3" />
  </svg>
);

export const HttpProtocolsIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M3.6 9h16.8" />
    <path d="M3.6 15h16.8" />
    <ellipse cx="12" cy="12" rx="4.5" ry="9" />
  </svg>
);

export const DbmsPrinciplesIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
    <path d="M15 21V9" />
  </svg>
);

export const ResponsiveDesignIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <rect x="15" y="11" width="6" height="9" rx="1" fill="#030303" stroke="currentColor" />
  </svg>
);

export const PromptEngIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M4 17l6-6-6-6" />
    <line x1="12" y1="19" x2="20" y2="19" />
    <path d="M19 5l1.5 3 3 1.5-3 1.5L19 14l-1.5-3-3-1.5 3-1.5z" fill="currentColor" />
  </svg>
);

export const GeminiSparkIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" />
  </svg>
);

// MathWorks official L-shaped membrane wave icon
export const MathWorksIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
    <path d="M3.2 21.6c4.5-8.2 8.4-15.1 11.2-15.1 2.5 0 4.1 6.1 7.2 13.9 1.4-3.2 3.1-6.4 5.3-6.4 2.1 0 3.8 3.5 5.1 7.8-1.5 2.1-4 3.7-7.2 3.7-4.1 0-7.3-6.8-9.8-13.3-1.6 4.8-4.2 12.3-7.5 12.3-1.8 0-3.3-1.3-4.3-2.9z" />
  </svg>
);

// 2. Skill Config Interface
export interface SkillConfig {
  name: string;
  level: 'Core' | 'Advanced' | 'Practicing';
  icon: React.ComponentType<{ className?: string }>;
  brandColor: string;
  category: string;
}

// 3. Central registry of skill metadata with real logos and brand colors
export const SKILL_REGISTRY: Record<string, SkillConfig> = {
  // Programming Languages
  'Java': {
    name: 'Java',
    level: 'Core',
    icon: FaJava,
    brandColor: '#ea2d2e',
    category: 'Programming Languages'
  },
  'Python': {
    name: 'Python',
    level: 'Core',
    icon: SiPython,
    brandColor: '#3776ab',
    category: 'Programming Languages'
  },
  'JavaScript (ES6+)': {
    name: 'JavaScript (ES6+)',
    level: 'Advanced',
    icon: SiJavascript,
    brandColor: '#f7df1e',
    category: 'Programming Languages'
  },
  'SQL': {
    name: 'SQL',
    level: 'Core',
    icon: TbSql,
    brandColor: '#00758f',
    category: 'Programming Languages'
  },
  'TypeScript (Basic)': {
    name: 'TypeScript (Basic)',
    level: 'Practicing',
    icon: SiTypescript,
    brandColor: '#3178c6',
    category: 'Programming Languages'
  },

  // Backend & Services
  'Spring Boot': {
    name: 'Spring Boot',
    level: 'Core',
    icon: SiSpringboot,
    brandColor: '#6db33f',
    category: 'Backend & Services'
  },
  'Node.js': {
    name: 'Node.js',
    level: 'Advanced',
    icon: SiNodedotjs,
    brandColor: '#5fa04e',
    category: 'Backend & Services'
  },
  'Express.js': {
    name: 'Express.js',
    level: 'Advanced',
    icon: SiExpress,
    brandColor: '#e0e0e0',
    category: 'Backend & Services'
  },
  'RESTful APIs': {
    name: 'RESTful APIs',
    level: 'Core',
    icon: RestApiIcon,
    brandColor: '#ff8c59',
    category: 'Backend & Services'
  },
  'Flask': {
    name: 'Flask',
    level: 'Practicing',
    icon: SiFlask,
    brandColor: '#f1eee8',
    category: 'Backend & Services'
  },

  // Databases & Storage
  'MySQL': {
    name: 'MySQL',
    level: 'Core',
    icon: SiMysql,
    brandColor: '#4479a1',
    category: 'Databases & Storage'
  },
  'MongoDB': {
    name: 'MongoDB',
    level: 'Advanced',
    icon: SiMongodb,
    brandColor: '#47a248',
    category: 'Databases & Storage'
  },
  'DBMS Principles': {
    name: 'DBMS Principles',
    level: 'Core',
    icon: DbmsPrinciplesIcon,
    brandColor: '#ff8c59',
    category: 'Databases & Storage'
  },
  'Firebase': {
    name: 'Firebase',
    level: 'Advanced',
    icon: SiFirebase,
    brandColor: '#ffca28',
    category: 'Databases & Storage'
  },

  // Core Computer Science
  'Data Structures & Algo (DSA)': {
    name: 'Data Structures & Algo (DSA)',
    level: 'Core',
    icon: DsaIcon,
    brandColor: '#ff8c59',
    category: 'Core Computer Science'
  },
  'Computer Networks': {
    name: 'Computer Networks',
    level: 'Core',
    icon: NetworksIcon,
    brandColor: '#00f0ff',
    category: 'Core Computer Science'
  },
  'TCP/IP': {
    name: 'TCP/IP',
    level: 'Core',
    icon: TcpIpIcon,
    brandColor: '#10b981',
    category: 'Core Computer Science'
  },
  'HTTP / HTTPS Protocols': {
    name: 'HTTP / HTTPS Protocols',
    level: 'Core',
    icon: HttpProtocolsIcon,
    brandColor: '#c084fc',
    category: 'Core Computer Science'
  },

  // Frontend Web
  'React.js': {
    name: 'React.js',
    level: 'Advanced',
    icon: SiReact,
    brandColor: '#61dafb',
    category: 'Frontend Web'
  },
  'Tailwind CSS': {
    name: 'Tailwind CSS',
    level: 'Advanced',
    icon: SiTailwindcss,
    brandColor: '#06b6d4',
    category: 'Frontend Web'
  },
  'HTML5 / CSS3': {
    name: 'HTML5 / CSS3',
    level: 'Core',
    icon: SiHtml5,
    brandColor: '#e34f26',
    category: 'Frontend Web'
  },
  'Responsive Design': {
    name: 'Responsive Design',
    level: 'Core',
    icon: ResponsiveDesignIcon,
    brandColor: '#ff8c59',
    category: 'Frontend Web'
  },

  // Dev Tools & AI
  'Git & GitHub': {
    name: 'Git & GitHub',
    level: 'Core',
    icon: SiGit,
    brandColor: '#f05032',
    category: 'Dev Tools & AI'
  },
  'VS Code': {
    name: 'VS Code',
    level: 'Core',
    icon: TbBrandVscode,
    brandColor: '#007acc',
    category: 'Dev Tools & AI'
  },
  'Google Gemini AI': {
    name: 'Google Gemini AI',
    level: 'Advanced',
    icon: GeminiSparkIcon,
    brandColor: '#4285f4',
    category: 'Dev Tools & AI'
  },
  'Prompt Engineering': {
    name: 'Prompt Engineering',
    level: 'Advanced',
    icon: PromptEngIcon,
    brandColor: '#c084fc',
    category: 'Dev Tools & AI'
  }
};

// 4. Large Faded Logo-Cluster Watermark for each Card
export const CardWatermark: React.FC<{ categoryTitle: string }> = ({ categoryTitle }) => {
  switch (categoryTitle) {
    case 'Programming Languages':
      return (
        <div className="absolute top-3 right-3 pointer-events-none opacity-[0.07] group-hover:opacity-[0.24] transition-opacity duration-500 flex items-center gap-2 -rotate-12 select-none overflow-hidden" aria-hidden="true">
          <FaJava className="w-16 h-16 text-[#ea2d2e]" />
          <SiPython className="w-16 h-16 text-[#3776ab]" />
          <SiJavascript className="w-14 h-14 text-[#f7df1e]" />
        </div>
      );
    case 'Backend & Services':
      return (
        <div className="absolute top-2 right-4 pointer-events-none opacity-[0.08] group-hover:opacity-[0.28] transition-opacity duration-500 flex items-center gap-3 -rotate-6 select-none overflow-hidden" aria-hidden="true">
          <SiSpringboot className="w-20 h-20 text-[#6db33f]" />
          <SiNodedotjs className="w-16 h-16 text-[#5fa04e]" />
          <SiFlask className="w-14 h-14 text-white" />
        </div>
      );
    case 'Databases & Storage':
      return (
        <div className="absolute top-3 right-3 pointer-events-none opacity-[0.07] group-hover:opacity-[0.24] transition-opacity duration-500 flex items-center gap-2 -rotate-6 select-none overflow-hidden" aria-hidden="true">
          <SiMysql className="w-16 h-16 text-[#4479a1]" />
          <SiMongodb className="w-16 h-16 text-[#47a248]" />
          <SiFirebase className="w-14 h-14 text-[#ffca28]" />
        </div>
      );
    case 'Core Computer Science':
      return (
        <div className="absolute top-3 right-3 pointer-events-none opacity-[0.07] group-hover:opacity-[0.24] transition-opacity duration-500 flex items-center gap-2 rotate-6 select-none overflow-hidden" aria-hidden="true">
          <DsaIcon className="w-16 h-16 text-[#ff8c59]" />
          <TcpIpIcon className="w-16 h-16 text-[#10b981]" />
        </div>
      );
    case 'Frontend Web':
      return (
        <div className="absolute top-3 right-3 pointer-events-none opacity-[0.07] group-hover:opacity-[0.24] transition-opacity duration-500 flex items-center gap-2 -rotate-12 select-none overflow-hidden" aria-hidden="true">
          <SiReact className="w-16 h-16 text-[#61dafb]" />
          <SiTailwindcss className="w-16 h-16 text-[#06b6d4]" />
          <SiHtml5 className="w-14 h-14 text-[#e34f26]" />
        </div>
      );
    case 'Dev Tools & AI':
      return (
        <div className="absolute top-3 right-3 pointer-events-none opacity-[0.07] group-hover:opacity-[0.24] transition-opacity duration-500 flex items-center gap-2 -rotate-6 select-none overflow-hidden" aria-hidden="true">
          <SiGit className="w-16 h-16 text-[#f05032]" />
          <TbBrandVscode className="w-16 h-16 text-[#007acc]" />
          <GeminiSparkIcon className="w-14 h-14 text-[#4285f4]" />
        </div>
      );
    default:
      return null;
  }
};

