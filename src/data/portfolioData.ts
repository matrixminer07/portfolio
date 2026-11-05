export interface SkillCategory {
  title: string;
  subtitle: string;
  focus: string;
  icon: string;
  color: 'cyan' | 'emerald' | 'violet' | 'amber' | 'sky' | 'pink';
  skills: { name: string; level?: 'Core' | 'Advanced' | 'Practicing' }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'AI & Analytics' | 'Robotics & Systems' | 'Full-Stack & Civic';
  tagline: string;
  badge: string;
  badgeColor: string;
  techStack: string[];
  description: string;
  bullets: string[];
  tags: string[];
  githubUrl: string;
  demoType: 'pharma' | 'sonar' | 'civic';
  accentColor: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  isCurrent: boolean;
  tag: string;
  description: string;
  bullets: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  highlights: string[];
  isCurrent?: boolean;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Spandan Roy',
    monogram: 'SR',
    title: 'Backend Developer & CSE Student',
    university: 'VIT-AP University',
    degree: 'B.Tech CSE (Data Analytics)',
    gradYear: '2029',
    hometown: 'Durgapur, West Bengal',
    currentLocation: 'Based in India',
    email: 'spandanr098@gmail.com',
    github: 'https://github.com/matrixminer07',
    linkedin: 'https://www.linkedin.com/in/spandan-roy/',
    status: 'Open to SDE & Backend Internships (2025–2026)',
    workModel: 'Remote / Hybrid / On-site',
    leadership: 'Co Lead @ Microsoft Student Chapter (MSC) VIT-AP',
    hackathonWins: '1x Winner',
    summary: 'A Computer Science and Engineering undergraduate specializing in Data Analytics at VIT-AP University. Deeply immersed in Java, Spring Boot, distributed APIs, SQL, and DSA, with conceptual architectures across AI-driven marine anomaly detection and pharmaceutical risk engines.',
  },

  currentFocusList: [
    'Java, Spring Boot & Microservices',
    'Algorithmic Problem Solving (DSA)',
    'AI Pharmaceutical Analytics (NexaCliniQ)',
    'Marine Sonar Anomaly Detection (Sonarix)',
    'Co-Leading Hi-tech @ Microsoft Student Chapter',
    'Distributed Systems & SQL Query Optimization'
  ],

  skillCategories: [
    {
      title: 'Programming Languages',
      subtitle: 'Core Foundations',
      focus: 'Primary: Java & Python',
      icon: 'code',
      color: 'cyan',
      skills: [
        { name: 'Java', level: 'Core' },
        { name: 'Python', level: 'Core' },
        { name: 'JavaScript (ES6+)', level: 'Advanced' },
        { name: 'SQL', level: 'Core' },
        { name: 'TypeScript (Basic)', level: 'Practicing' }
      ]
    },
    {
      title: 'Backend & Services',
      subtitle: 'APIs & Microservices',
      focus: 'Architecture: REST & Distributed',
      icon: 'server',
      color: 'emerald',
      skills: [
        { name: 'Spring Boot', level: 'Core' },
        { name: 'Node.js', level: 'Advanced' },
        { name: 'Express.js', level: 'Advanced' },
        { name: 'RESTful APIs', level: 'Core' },
        { name: 'Flask', level: 'Practicing' }
      ]
    },
    {
      title: 'Databases & Storage',
      subtitle: 'Persistence Layers',
      focus: 'Relational & Document DBs',
      icon: 'database',
      color: 'violet',
      skills: [
        { name: 'MySQL', level: 'Core' },
        { name: 'MongoDB', level: 'Advanced' },
        { name: 'DBMS Principles', level: 'Core' },
        { name: 'Firebase', level: 'Advanced' }
      ]
    },
    {
      title: 'Core Computer Science',
      subtitle: 'Theoretical Foundations',
      focus: 'Complexity O(n) & System Protocols',
      icon: 'cpu',
      color: 'amber',
      skills: [
        { name: 'Data Structures & Algo (DSA)', level: 'Core' },
        { name: 'Computer Networks', level: 'Core' },
        { name: 'TCP/IP', level: 'Core' },
        { name: 'HTTP / HTTPS Protocols', level: 'Core' }
      ]
    },
    {
      title: 'Frontend Web',
      subtitle: 'User Interface & Presentation',
      focus: 'Full-Stack Integration',
      icon: 'layout',
      color: 'sky',
      skills: [
        { name: 'React.js', level: 'Advanced' },
        { name: 'Tailwind CSS', level: 'Advanced' },
        { name: 'HTML5 / CSS3', level: 'Core' },
        { name: 'Responsive Design', level: 'Core' }
      ]
    },
    {
      title: 'Dev Tools & AI',
      subtitle: 'Workflow Acceleration',
      focus: 'Certified: HackerRank & Gemini',
      icon: 'wrench',
      color: 'pink',
      skills: [
        { name: 'Git & GitHub', level: 'Core' },
        { name: 'VS Code', level: 'Core' },
        { name: 'Google Gemini AI', level: 'Advanced' },
        { name: 'Prompt Engineering', level: 'Advanced' }
      ]
    }
  ] as SkillCategory[],

  certifications: [
    { title: 'Python Certification', issuer: 'HackerRank', color: 'emerald' },
    { title: 'SQL Certification', issuer: 'HackerRank', color: 'cyan' },
    { title: 'MATLAB Certified', issuer: 'MathWorks', color: 'violet' },
    { title: 'Google Gemini Academy', issuer: 'Google', color: 'amber' }
  ],

  projects: [
    {
      id: 'nexacliniq',
      title: 'NexaCliniQ — AI-Powered Pharmaceutical Risk Prediction',
      category: 'AI & Analytics',
      tagline: 'Enterprise-level architectural platform designed for pharmaceutical risk prediction and strategic clinical decision support.',
      badge: 'Concept & Architecture',
      badgeColor: 'border-cyan-800 bg-cyan-950/70 text-cyan-400',
      techStack: ['Java', 'Spring Boot', 'Python', 'FastAPI', 'REST APIs', 'Docker'],
      description: 'An enterprise-level architectural platform designed for pharmaceutical risk prediction and strategic decision support. Focuses on real-time clinical trial analytics, drug pipeline tracking, and predictive evaluation using probabilistic machine learning models to mitigate adverse drug interactions and pipeline delays.',
      bullets: [
        'Scenario planning engine for data-informed clinical decisions and risk mitigation.',
        'Modular AI pipelines engineered to evaluate compound toxicity risk vectors with latency under 45ms.',
        'Multi-stage data ingestion from clinical trials into predictive scoring engines with automated alert dispatch.'
      ],
      tags: ['Python', 'Risk Modeling', 'Data Analytics', 'Predictive AI', 'Clinical Informatics'],
      githubUrl: 'https://github.com/matrixminer07/NexaCliniQ',
      demoType: 'pharma',
      accentColor: '#00F0FF'
    },
    {
      id: 'sonarix',
      title: 'Sonarix — Marine Debris & Sonar Anomaly Detection',
      category: 'Robotics & Systems',
      tagline: 'Formulated a conceptual acoustic intelligence system for identifying discarded plastics, submerged containers, and benthic anomalies.',
      badge: 'Concept & Detection Workflow',
      badgeColor: 'border-violet-800 bg-violet-950/70 text-violet-400',
      techStack: ['Python', 'TypeScript', 'C++', 'OpenCV', 'Sonar Acoustics', 'AUV Telemetry'],
      description: 'Formulated a conceptual intelligence system for identifying discarded plastic, submerged containers, and anomalous obstructions in side-scan sonar acoustic imagery. Streamlines survey operator reviews and equips autonomous underwater vehicle (AUV) planners with target coordinates.',
      bullets: [
        'Detection workflow algorithms designed to slash manual sonar review hours by 70%.',
        'Modular telemetry API for AUV trajectory recalculations and environmental bathymetric mapping.',
        'Real-time acoustic blip categorization with confidence score thresholds.'
      ],
      tags: ['TypeScript', 'Sonar Acoustics', 'Anomaly Detection', 'AUV Planning', 'Side-Scan Sonar'],
      githubUrl: 'https://github.com/matrixminer07/SONARIX',
      demoType: 'sonar',
      accentColor: '#8B5CF6'
    },
    {
      id: 'civic-tech',
      title: 'Your City, Your Services — Municipal Civic Issue Tracker',
      category: 'Full-Stack & Civic',
      tagline: 'Full-stack municipal citizen portal allowing residents to capture, report, and track civic infrastructure bottlenecks.',
      badge: 'In Active Development',
      badgeColor: 'border-emerald-800 bg-emerald-950/70 text-emerald-400',
      techStack: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'Firebase Auth', 'Tailwind CSS'],
      description: 'A full-stack municipal citizen portal allowing residents to capture, report, and track civic infrastructure bottlenecks (potholes, sanitation outages, power line hazards) to municipal departments with real-time issue lifecycle tracking.',
      bullets: [
        'GPS geotagging & photo upload pipeline with automated department assignment.',
        'Real-time status tracking from Citizen Submission → Ward Triage → Resolution Broadcast.',
        'Reduces civic complaint resolution delay by organizing department workflows and public accountability.'
      ],
      tags: ['Firebase Auth & Firestore', 'JavaScript / React', 'Geo-tagging', 'Issue Lifecycle', 'Municipal APIs'],
      githubUrl: 'https://github.com/matrixminer07',
      demoType: 'civic',
      accentColor: '#10B981'
    }
  ] as ProjectItem[],

  experiences: [
    {
      role: 'Co Lead, Hi-tech Team',
      organization: 'Microsoft Student Chapter (MSC) VIT-AP',
      period: 'Sep 2026 – Present · 2 mo',
      isCurrent: true,
      tag: 'Present Leadership',
      description: '',
      bullets: [
        'Leading the Hi-tech team, planning technical sessions, projects and developer initiatives',
        'Mentoring members and coordinating hackathons and bootcamps'
      ]
    },
    {
      role: 'Hi-tech Team Member',
      organization: 'Microsoft Student Chapter (MSC) VIT-AP',
      period: 'Nov 2025 – Sep 2026 · 10 mo',
      isCurrent: false,
      tag: 'Core Committee',
      description: '',
      bullets: [
        'Helped organize workshops, bootcamps and hackathons for student developers',
        'Contributed to the Hi-tech team\'s projects and events'
      ]
    }
  ] as ExperienceItem[],

  education: [
    {
      institution: 'Vellore Institute of Technology (VIT-AP)',
      degree: 'B.Tech in Computer Science and Engineering (Data Analytics)',
      period: 'Aug 2025 – Sep 2029',
      location: 'Amaravati / Vijayawada, Andhra Pradesh, India',
      isCurrent: true,
      highlights: [
        'Specialization in Data Analytics with coursework in Data Structures, Algorithms, DBMS, and Distributed Architectures.',
        'Active contributor and leader in campus high-technology developer societies.',
        'Maintains strong focus on algorithmic problem solving (DSA) in Java.'
      ]
    },
    {
      institution: 'D.A.V. Model School, Durgapur',
      degree: 'Senior Secondary (Science) & Secondary Schooling',
      period: 'Apr 2011 – Apr 2025',
      location: 'Durgapur, West Bengal, India',
      isCurrent: false,
      highlights: [
        'Senior Secondary (Class XI–XII, Apr 2023 – Apr 2025): Rigorous focus on Physics, Chemistry, and Advanced Mathematics.',
        'Secondary (Class I–X, Apr 2011 – Mar 2023): Strong quantitative, logical, and foundational science education.'
      ]
    }
  ] as EducationItem[]
};
