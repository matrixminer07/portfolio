import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CheckCircle2, CornerDownLeft } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { getContactEmail } from '../utils/security';

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

const MAX_HISTORY_LENGTH = 50;
const MAX_CMD_LENGTH = 100;
const COMMAND_COOLDOWN_MS = 250;

export const InteractiveTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const lastCommandTime = useRef<number>(0);
  const contactEmail = React.useMemo(() => getContactEmail(), []);
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      id: 'init-curl',
      command: 'curl -s https://spandanroy.dev/api/profile.json | jq',
      output: (
        <div className="text-slate-300 leading-relaxed pl-2 border-l-2 border-cyan-400/30 space-y-1">
          <p><span className="text-slate-500">"name":</span> <span className="text-cyan-300">"{PORTFOLIO_DATA.personal.name}"</span>,</p>
          <p><span className="text-slate-500">"role":</span> <span className="text-emerald-300">"{PORTFOLIO_DATA.personal.title}"</span>,</p>
          <p><span className="text-slate-500">"university":</span> <span className="text-amber-300">"{PORTFOLIO_DATA.personal.university}"</span>,</p>
          <p><span className="text-slate-500">"degree":</span> <span className="text-slate-200">"B.Tech CSE (Data Analytics) [2025 - 2029]"</span>,</p>
          <p><span className="text-slate-500">"leadership":</span> <span className="text-violet-300">"{PORTFOLIO_DATA.personal.leadership}"</span>,</p>
          <p><span className="text-slate-500">"core_stack":</span> [</p>
          <p className="pl-4 text-cyan-400">"Java", "Spring Boot", "Python", "SQL", "DSA", "APIs"</p>
          <p className="pl-2">],</p>
          <p><span className="text-slate-500">"status":</span> <span className="text-emerald-400">"Ready for Summer/Fall Internships"</span></p>
        </div>
      ),
    },
    {
      id: 'init-ping',
      command: 'ping vit-ap-cluster.in -c 1',
      output: (
        <div className="text-slate-400 text-[11px] pt-1">
          64 bytes from 16.51.80.65: icmp_seq=1 ttl=56 time=<span className="text-emerald-400">12.4 ms [HEALTHY]</span>
        </div>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    // Sanitization: slice max length and trim
    const sanitizedRaw = String(rawCmd || '').slice(0, MAX_CMD_LENGTH).trim();
    if (!sanitizedRaw) return;

    // Rate limiting: throttle rapid inputs
    const now = Date.now();
    if (now - lastCommandTime.current < COMMAND_COOLDOWN_MS) {
      return;
    }
    lastCommandTime.current = now;

    const cmd = sanitizedRaw.toLowerCase();

    let responseContent: React.ReactNode;

    switch (cmd) {
      case 'help':
        responseContent = (
          <div className="text-slate-300 space-y-1 text-xs">
            <p className="text-cyan-400 font-bold">Available Commands:</p>
            <p><span className="text-emerald-400">about</span> - Background and education overview</p>
            <p><span className="text-emerald-400">skills</span> - Core languages, backend frameworks & databases</p>
            <p><span className="text-emerald-400">projects</span> - View NexaCliniQ, Sonarix & Civic Tracker</p>
            <p><span className="text-emerald-400">leadership</span> - Microsoft Student Chapter role</p>
            <p><span className="text-emerald-400">contact</span> - Email, GitHub, LinkedIn</p>
            <p><span className="text-emerald-400">ping</span> - Test latency to cluster node</p>
            <p><span className="text-emerald-400">sudo hire</span> - Fast-track interview dispatch</p>
            <p><span className="text-emerald-400">clear</span> - Clear the terminal output</p>
          </div>
        );
        break;

      case 'about':
      case 'bio':
        responseContent = (
          <div className="text-slate-300 text-xs leading-relaxed space-y-1">
            <p className="text-cyan-300 font-bold">Spandan Roy — VIT-AP University (Class of 2029)</p>
            <p>Specializing in Data Analytics with focused mastery in Java, Spring Boot, distributed system fundamentals, DBMS, and algorithms.</p>
            <p className="text-slate-400">Hometown: Durgapur, West Bengal | Campus: Amaravati, AP</p>
          </div>
        );
        break;

      case 'skills':
      case 'stack':
        responseContent = (
          <div className="text-slate-300 text-xs space-y-1">
            <p><span className="text-cyan-400 font-bold">Languages:</span> Java, Python, JavaScript, SQL, TypeScript</p>
            <p><span className="text-emerald-400 font-bold">Backend:</span> Spring Boot, Node.js, Express, REST APIs, Microservices</p>
            <p><span className="text-violet-400 font-bold">Storage:</span> MySQL, MongoDB, Firebase Firestore</p>
            <p><span className="text-amber-400 font-bold">Theory:</span> DSA (Algorithms), Computer Networks, TCP/IP</p>
          </div>
        );
        break;

      case 'projects':
        responseContent = (
          <div className="text-slate-300 text-xs space-y-1.5">
            <p className="text-cyan-400 font-bold">Featured Projects:</p>
            <p>1. <span className="text-cyan-300 font-semibold">NexaCliniQ:</span> AI-powered pharmaceutical risk & clinical trials prediction platform.</p>
            <p>2. <span className="text-violet-300 font-semibold">Sonarix:</span> Side-scan acoustic sonar marine debris anomaly detector.</p>
            <p>3. <span className="text-emerald-300 font-semibold">Your City, Your Services:</span> Municipal citizen civic bottleneck resolution system.</p>
          </div>
        );
        break;

      case 'leadership':
      case 'msc':
        responseContent = (
          <div className="text-slate-300 text-xs space-y-1">
            <p className="text-cyan-300 font-bold">Co Lead @ Microsoft Student Chapter (MSC), VIT-AP</p>
            <p>Leading Hi-tech team. Spearheading workshops, bootcamps, and hackathons for student developers across campus.</p>
          </div>
        );
        break;

      case 'contact':
      case 'email':
        responseContent = (
          <div className="text-slate-300 text-xs space-y-1">
            <p>Email: <a href={`mailto:${contactEmail}`} className="text-cyan-400 underline">{contactEmail}</a></p>
            <p>GitHub: <a href="https://github.com/matrixminer07" target="_blank" rel="noopener noreferrer" className="text-violet-400 underline">github.com/matrixminer07</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/spandan-roy/" target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline">linkedin.com/in/spandan-roy</a></p>
          </div>
        );
        break;

      case 'ping':
        responseContent = (
          <div className="text-emerald-400 text-xs">
            64 bytes from vit-ap.edge-cloud: seq=1 time={(Math.random() * 8 + 8).toFixed(1)} ms [STABLE]
          </div>
        );
        break;

      case 'sudo hire':
      case 'hire':
        responseContent = (
          <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ACCESS GRANTED: Candidate Spandan Roy is ready to deploy!
            </p>
            <p className="text-slate-300">
              Target role: Backend / SDE Intern. Preparing direct dispatch to <span className="text-cyan-300 font-semibold">{contactEmail}</span>.
            </p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        responseContent = (
          <div className="text-rose-400 text-xs">
            bash: command not found: {sanitizedRaw}. Type <span className="text-cyan-300 underline cursor-pointer" onClick={() => handleCommand('help')}>'help'</span> for available commands.
          </div>
        );
        break;
    }

    setHistory((prev) => {
      const trimmedHistory = prev.length >= MAX_HISTORY_LENGTH ? prev.slice(prev.length - MAX_HISTORY_LENGTH + 1) : prev;
      return [
        ...trimmedHistory,
        {
          id: `cmd-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          command: sanitizedRaw,
          output: responseContent,
        },
      ];
    });
    setInputVal('');
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  return (
    <div className="editorial-panel rounded-2xl overflow-hidden shadow-2xl relative flex flex-col h-[460px]">
      {/* Window header */}
      <div className="px-4 py-3 bg-[#0a0a0d] border-b border-[rgba(241,238,232,0.08)] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          <span className="ml-2 font-mono text-[11px] text-[#aaa9a4] flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-[#ff8c59]" />
            spandan@vit-ap:~ (bash)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-mono text-[10px] text-[#ff8c59] bg-[#ff8c59]/10 px-2 py-0.5 rounded border border-[#ff8c59]/30">
            SESSION ACTIVE
          </span>
        </div>
      </div>

      {/* Terminal output body */}
      <div
        role="log"
        aria-live="polite"
        aria-label="Interactive terminal history log"
        className="p-5 font-mono text-xs space-y-4 bg-[#050507] flex-1 overflow-y-auto"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item) => (
          <div key={item.id} className="space-y-1.5">
            <p className="text-[#aaa9a4]">
              <span className="text-emerald-400">visitor@web</span>:
              <span className="text-[#ff8c59]">~</span>$ {item.command}
            </p>
            <div className="text-[#f1eee8]">{item.output}</div>
          </div>
        ))}

        {/* Interactive command input prompt */}
        <form onSubmit={onSubmit} className="flex items-center gap-2 text-[#ff8c59] pt-1">
          <span className="text-emerald-400 shrink-0">visitor@web</span>:
          <span className="text-[#ff8c59] shrink-0">~</span>
          <span className="text-[#aaa9a4] shrink-0">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            maxLength={MAX_CMD_LENGTH}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'projects', 'sudo hire'..."
            className="flex-1 bg-transparent border-none text-[#f1eee8] focus:outline-none placeholder-slate-600 font-mono text-xs"
          />
          <button
            type="submit"
            className="text-slate-500 hover:text-[#ff8c59] p-1 transition-colors cursor-pointer"
            title="Execute"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>

        <div ref={terminalEndRef} />
      </div>

      {/* Quick Interactive Command Pills */}
      <div className="px-4 py-2 bg-[#09090c] border-t border-[rgba(241,238,232,0.06)] flex items-center gap-2 overflow-x-auto shrink-0 text-[10px] font-mono">
        <span className="text-slate-500 shrink-0">Quick run:</span>
        {['help', 'skills', 'projects', 'sudo hire', 'clear'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="px-2 py-0.5 rounded bg-[rgba(241,238,232,0.04)] hover:bg-[#ff8c59]/20 text-[#aaa9a4] hover:text-[#ff8c59] border border-[rgba(241,238,232,0.08)] shrink-0 transition-colors cursor-pointer"
          >
            ${cmd}
          </button>
        ))}
      </div>

      {/* Footer stats */}
      <div className="px-4 py-2 bg-[#060608] border-t border-[rgba(241,238,232,0.06)] flex items-center justify-between text-[11px] font-mono text-[#aaa9a4] shrink-0">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff8c59]"></span>
          Node: Amaravati-AP
        </span>
        <span>Memory: 98.4% Free</span>
      </div>
    </div>
  );
};
