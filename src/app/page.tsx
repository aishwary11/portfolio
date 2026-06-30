'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useSpring,
  type Variants,
} from 'framer-motion';
import {
  ArrowDown, Calendar, ChevronRight, Cloud, Code2, Cpu,
  Database, ExternalLink, Eye, GitBranch, Globe, Layers,
  Mail, Moon, Rocket, Server, Shield, Sun, Terminal, Users, Zap,
} from 'lucide-react';
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import {
  FaAngular,
  FaAws,
  FaDocker, FaEnvelopeOpen,
  FaGithub, FaLinkedin, FaMobile, FaNodeJs, FaReact,
} from 'react-icons/fa';
import {
  SiJenkins,
  SiKubernetes,
  SiMongodb, SiMysql, SiNestjs, SiNextdotjs,
  SiPostgresql,
  SiRabbitmq,
  SiRedis,
  SiSolidity,
  SiTypescript,
} from 'react-icons/si';

// ── Types ──────────────────────────────────────────────────────────────
type Theme = 'dark' | 'light';
type IconComp = React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties; }>;

interface SkillItem { name: string; icon: IconComp | null; color: string; }
interface SkillCat { category: string; icon: IconComp; items: readonly SkillItem[]; }
interface Experience {
  company: string; role: string; period: string; current: boolean;
  domain: string; note?: string; tech: readonly string[]; highlights: readonly string[];
}

// ── Data ───────────────────────────────────────────────────────────────
const START_DATE = new Date(2018, 6);

const calcExp = (d: Date): string => {
  const now = new Date();
  let y = now.getFullYear() - d.getFullYear();
  let m = now.getMonth() - d.getMonth() + (now.getDate() < d.getDate() ? -1 : 0);
  if (m < 0) { y--; m += 12; }
  return y + ' year' + (y !== 1 ? 's' : '') + ' and ' + m + ' month' + (m !== 1 ? 's' : '');
};

const STATS = [
  { value: '8+', label: 'Years Exp' },
  { value: '50+', label: 'Projects' },
  { value: '20+', label: 'Technologies' },
  { value: '5+', label: 'Team Led' },
] satisfies ReadonlyArray<{ value: string; label: string; }>;

const SKILL_CATS: readonly SkillCat[] = [
  {
    category: 'Languages', icon: Terminal,
    items: [{ name: 'JavaScript', icon: null, color: '#F7DF1E' }, { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' }, { name: 'Golang', icon: null, color: '#00ADD8' }]
  },
  {
    category: 'Frontend', icon: Globe,
    items: [{ name: 'React.js', icon: FaReact, color: '#61DAFB' }, { name: 'Next.js', icon: SiNextdotjs, color: '#888' }, { name: 'Angular', icon: FaAngular, color: '#DD0031' }, { name: 'React Native', icon: FaReact, color: '#61DAFB' }, { name: 'Redux', icon: null, color: '#764ABC' }]
  },
  {
    category: 'Backend', icon: Server,
    items: [{ name: 'Node.js', icon: FaNodeJs, color: '#339933' }, { name: 'Express.js', icon: null, color: '#888' }, { name: 'NestJS', icon: SiNestjs, color: '#E0234E' }, { name: 'Fastify', icon: null, color: '#999' }, { name: 'Hono.js', icon: null, color: '#E36002' }, { name: 'GraphQL', icon: null, color: '#E10098' }]
  },
  {
    category: 'Databases', icon: Database,
    items: [{ name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' }, { name: 'MySQL', icon: SiMysql, color: '#4479A1' }, { name: 'MongoDB', icon: SiMongodb, color: '#47A248' }, { name: 'Redis', icon: SiRedis, color: '#DC382D' }, { name: 'Valkey', icon: null, color: '#FF4785' }, { name: 'Dragonfly', icon: null, color: '#7C3AED' }]
  },
  {
    category: 'Cloud & AWS', icon: Cloud,
    items: [{ name: 'AWS EC2', icon: FaAws, color: '#FF9900' }, { name: 'AWS ECS', icon: FaAws, color: '#FF9900' }, { name: 'AWS EKS', icon: FaAws, color: '#FF9900' }, { name: 'AWS S3', icon: FaAws, color: '#FF9900' }, { name: 'AWS Lambda', icon: FaAws, color: '#FF9900' }, { name: 'GCP', icon: null, color: '#4285F4' }]
  },
  {
    category: 'DevOps & CI/CD', icon: GitBranch,
    items: [{ name: 'Docker', icon: FaDocker, color: '#2496ED' }, { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' }, { name: 'GitHub Actions', icon: null, color: '#2088FF' }, { name: 'Jenkins', icon: SiJenkins, color: '#D24939' }, { name: 'Rancher', icon: null, color: '#0075A8' }]
  },
  {
    category: 'Messaging & Events', icon: Zap,
    items: [{ name: 'Kafka', icon: null, color: '#231F20' }, { name: 'RabbitMQ', icon: SiRabbitmq, color: '#FF6600' }]
  },
  {
    category: 'Observability', icon: Eye,
    items: [{ name: 'OpenObserve', icon: null, color: '#6366F1' }, { name: 'SonarQube', icon: null, color: '#4E9BCD' }, { name: 'Logger', icon: null, color: '#22C55E' }]
  },
  {
    category: 'Blockchain & Payments', icon: Shield,
    items: [{ name: 'Solidity', icon: SiSolidity, color: '#363636' }, { name: 'Web3.js', icon: null, color: '#F16822' }, { name: 'Ethers.js', icon: null, color: '#2535A0' }, { name: 'Stripe', icon: null, color: '#635BFF' }, { name: 'PayPal', icon: null, color: '#003087' }]
  },
];

const EXPERIENCES: readonly Experience[] = [
  {
    company: 'First Credit Services', role: 'Tech Lead', period: 'Jan 2026 – Present',
    current: true, domain: 'Fintech',
    tech: ['PostgreSQL', 'Node.js', 'React.js', 'Express.js', 'Kafka', 'AWS EKS', 'Docker', 'Kubernetes', 'OpenObserve', 'GitHub Actions'],
    highlights: [
      'Leading v2 platform re-architecture using PERN stack (PostgreSQL, Express.js, React.js, Node.js) for a credit lending product',
      'Driving a team of 5+ engineers — sprint planning, code reviews, architectural decisions, and engineering standards',
      'Designed event-driven microservices with Kafka for real-time loan processing and credit assessment pipelines',
      'Orchestrated containerised deployments on AWS EKS (Kubernetes), achieving 99.9% uptime SLA across all v2 services',
      'Integrated OpenObserve for centralised observability, distributed tracing, and alerting across v2 services',
      'PostgreSQL partitioning, query planner tuning, and indexing strategies reduced critical API response times by 35%',
    ],
  },
  {
    company: 'Periscope Tech', role: 'Tech Lead', period: 'Jul 2025 – Jan 2026',
    current: false, domain: 'Healthcare',
    tech: ['PostgreSQL', 'Node.js', 'React.js', 'Express.js', 'AWS EC2/ECS/S3/Lambda', 'Redis', 'GitHub Actions', 'Docker'],
    highlights: [
      'Joined as Tech Lead to architect and deliver a PERN stack (PostgreSQL, Express.js, React.js, Node.js) healthcare platform',
      'Led a team of 12 engineers — set technical direction, conducted code reviews, and drove sprint delivery',
      'Designed AWS cloud architecture (EC2, ECS, S3, Lambda) for patient data management with security-first principles',
      'Implemented Redis caching with connection pooling, improving healthcare dashboard load times by 40%',
      'Automated CI/CD pipelines via GitHub Actions with blue/green deployments to staging and production on AWS',
    ],
  },
  {
    company: 'ETeam InfoServices', role: 'Senior Software Developer', period: 'Sep 2024 – Jan 2025',
    current: false, domain: 'Enterprise',
    note: 'Role concluded due to company-wide restructuring and budget optimisation.',
    tech: ['Node.js', 'React.js', 'Express.js', 'Kafka', 'Docker', 'Kubernetes', 'GitHub Actions', 'Rancher'],
    highlights: [
      'Increased system throughput by 25% using Kafka for real-time event processing across microservices',
      'Automated CI/CD pipelines via GitHub Actions, reducing deployment time by 25% and improving release frequency',
      'Containerised backend services with Docker and orchestrated via Kubernetes (Rancher), achieving 99.9% uptime',
      'Implemented API security hardening — reduced potential vulnerabilities by 30%',
    ],
  },
  {
    company: 'SMFG India Credit', role: 'Senior Software Developer', period: 'Jun 2023 – Sep 2024',
    current: false, domain: 'Fintech',
    tech: ['Angular', 'React.js', 'Node.js', 'Express.js', 'Redis', 'RabbitMQ', 'MySQL'],
    highlights: [
      'Developed internal applications with Angular and Node.js, reducing manual processes by 40%',
      'Led re-architecture of critical backend services, improving scalability by 20% for increased user loads',
      'Implemented Redis caching, improving API performance by 30%',
      'Integrated RabbitMQ for real-time messaging with 99.5% message delivery reliability',
      'Built customer-facing loan application using React.js and Express.js',
    ],
  },
  {
    company: 'HCL Technologies', role: 'Senior Software Developer', period: 'Sep 2022 – Jun 2023',
    current: false, domain: 'Research / Publishing',
    tech: ['Node.js', 'React.js', 'Express.js', 'Redis', 'GraphQL', 'MySQL'],
    highlights: [
      'Built scalable research publishing platform with Node.js, processing 10,000+ articles per month',
      'Boosted data retrieval speed by 30% through Redis optimisation and query tuning',
      'Built GraphQL POC demonstrating 25% reduction in API calls for complex data retrieval',
      'Recognised for best delivery within first 6 months at HCL Technologies',
    ],
  },
  {
    company: 'Vernost Marketing Technology', role: 'Software Developer', period: 'Sep 2021 – Sep 2022',
    current: false, domain: 'MarTech',
    tech: ['Angular', 'Node.js', 'React.js', 'Express.js', 'Node-cache'],
    highlights: [
      'Created admin dashboard with Angular and Node.js, reducing operational overhead by 15%',
      'Implemented gift card system increasing user engagement by 25%',
      'Improved app performance by 30% using Node-cache',
      'Built reusable React.js components for admin dashboards and internal tooling',
    ],
  },
  {
    company: 'Blockwoks Technologies', role: 'Software Developer', period: 'Jun 2020 – Sep 2021',
    current: false, domain: 'Blockchain / Web3',
    tech: ['Solidity', 'Web3.js', 'Ethers.js', 'React.js', 'Node.js', 'Express.js', 'Stripe', 'PayPal'],
    highlights: [
      'Developed secure Solidity smart contracts for Ethereum dApps, processing over $500K in digital assets',
      'Integrated Stripe and PayPal payments, expanding payment options by 20%',
      'Deployed dApps with Web3.js, enhancing platform transparency and user engagement by 15%',
      'Built dApp dashboards with React.js and Express.js for seamless decentralised interaction',
    ],
  },
  {
    company: 'Dealmoney Securities', role: 'Software Developer', period: 'Jul 2018 – Apr 2020',
    current: false, domain: 'Fintech',
    tech: ['Node.js', 'React.js', 'Express.js', 'Redis', 'MySQL'],
    highlights: [
      'Designed and deployed RESTful APIs with Express.js on self-managed servers, cutting hosting costs by 10%',
      'Enhanced app speed by 30% using Redis for caching',
      'Created internal trading dashboards with React.js for traders and admin staff',
    ],
  },
];

const EXPERTISE = [
  { icon: Rocket, title: 'Full Stack Architecture', desc: 'End-to-end system design from React frontends to Node.js microservices — PostgreSQL, Kafka, Redis — optimised for scale and reliability.' },
  { icon: Cpu, title: 'Performance Engineering', desc: 'Query optimisation, Redis/Dragonfly caching, profiling, and CI/CD improvements that reduce latency and build times by 30–40%.' },
  { icon: Users, title: 'Tech Leadership', desc: 'Leading teams of 5+ engineers — sprint planning, code reviews, architectural decisions, mentoring, and delivery ownership.' },
  { icon: Layers, title: 'Cloud-Native & DevOps', desc: 'AWS (EC2/ECS/EKS/S3/Lambda), Docker, Kubernetes, GitHub Actions, and OpenObserve for production-grade observability.' },
] as const;

// ── Animation Variants ────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// ── Hooks ─────────────────────────────────────────────────────────────
function useTyping(words: readonly string[], speed = 80, del = 42, pause = 2400): string {
  const [s, set] = useState({ t: '', wi: 0, del: false });
  useEffect(() => {
    const w = words[s.wi % words.length];
    const isFull = s.t === w;
    const isEmpty = s.t === '';
    if (!s.del && isFull) {
      const id = setTimeout(() => set(x => ({ ...x, del: true })), pause);
      return () => clearTimeout(id);
    }
    if (s.del && isEmpty) { set(x => ({ ...x, del: false, wi: x.wi + 1 })); return; }
    const id = setTimeout(
      () => set(x => ({ ...x, t: s.del ? w.slice(0, x.t.length - 1) : w.slice(0, x.t.length + 1) })),
      s.del ? del : speed,
    );
    return () => clearTimeout(id);
  }, [s, words, speed, del, pause]);
  return s.t;
}

function useScrolled(n = 50) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const h = () => setV(window.scrollY > n);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, [n]);
  return v;
}

// ── UI Pieces ─────────────────────────────────────────────────────────
function Orbs() {
  const orbs = useMemo(() => [
    { g: 'radial-gradient(circle,#6366f1 0%,transparent 70%)', s: 440, l: '8%', t: '15%', d: 10, x: [0, 50, -25, 0] as number[], y: [0, -55, 20, 0] as number[] },
    { g: 'radial-gradient(circle,#8b5cf6 0%,transparent 70%)', s: 560, l: '58%', t: '52%', d: 13, x: [0, -35, 30, 0] as number[], y: [0, 45, -35, 0] as number[] },
    { g: 'radial-gradient(circle,#06b6d4 0%,transparent 70%)', s: 320, l: '32%', t: '72%', d: 8, x: [0, 25, -45, 0] as number[], y: [0, -25, 35, 0] as number[] },
  ], []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {orbs.map((o, i) => (
        <motion.div key={i} className="absolute rounded-full opacity-20 dark:opacity-[0.07]"
          style={{ background: o.g, width: o.s, height: o.s, left: o.l, top: o.t, filter: 'blur(70px)' }}
          animate={{ x: o.x, y: o.y, scale: [1, 1.1, 0.94, 1] }}
          transition={{ duration: o.d, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  );
}

function GridBg() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
      backgroundImage: 'linear-gradient(rgba(99,102,241,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.08) 1px,transparent 1px)',
      backgroundSize: '60px 60px',
      maskImage: 'radial-gradient(ellipse 90% 70% at 50% 0%,black 30%,transparent 100%)',
      WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 0%,black 30%,transparent 100%)',
    }} />
  );
}

function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 20, restDelta: 0.001 });
  return <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 z-50 origin-left" style={{ scaleX }} />;
}

function Nav({ isDark, toggle, pending }: { isDark: boolean; toggle: () => void; pending: boolean; }) {
  const scrolled = useScrolled();
  return (
    <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={['fixed top-[2px] left-0 right-0 z-40 transition-all duration-300', scrolled && 'bg-white/90 dark:bg-[#030308]/85 backdrop-blur-xl border-b border-slate-200/60 dark:border-white/[0.06] shadow-sm'].filter(Boolean).join(' ')}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <motion.span className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400 tracking-widest select-none" whileHover={{ scale: 1.06 }}>
          <span className="text-slate-400 dark:text-slate-600 font-normal">{'<'}</span>AS<span className="text-slate-400 dark:text-slate-600 font-normal">{' />'}</span>
        </motion.span>
        <div className="hidden sm:flex items-center gap-8">
          {(['About', 'Skills', 'Experience', 'Contact'] as const).map(l => (
            <a key={l} href={'#' + l.toLowerCase()} className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">{l}</a>
          ))}
        </div>
        <button onClick={toggle} disabled={pending} aria-label={'Switch to ' + (isDark ? 'light' : 'dark') + ' mode'}
          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700/60 transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
          <AnimatePresence mode="wait">
            <motion.div key={isDark ? 'sun' : 'moon'} initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.18 }}>
              {isDark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-slate-600" />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>
    </motion.nav>
  );
}

const ROLES = ['Senior Software Developer', 'Tech Lead', 'PERN / MERN Architect', 'Cloud & DevOps Engineer'] as const;

function Hero({ exp }: { exp: string; }) {
  const typed = useTyping(ROLES);
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <Orbs /><GridBg />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="mb-7">
          <span className="inline-flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" /></span>
            Open to senior engineering roles
          </span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[90px] font-extrabold tracking-tight leading-none mb-5">
          <span className="text-slate-900 dark:text-white">Aishwary</span>{' '}
          <span className="text-transparent bg-clip-text animate-gradient-shift" style={{ backgroundImage: 'linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4,#6366f1)' }}>Shah</span>
        </motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }} className="h-10 flex items-center justify-center mb-7">
          <p className="text-xl sm:text-2xl font-medium text-slate-500 dark:text-slate-400 font-mono">
            {typed}
            <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.65, repeat: Infinity, repeatType: 'reverse' }} className="inline-block w-[3px] h-[1.15em] bg-indigo-500 ml-1 rounded-sm align-middle" />
          </p>
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.48 }} suppressHydrationWarning
          className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-11 leading-relaxed">
          {exp} building scalable production systems across fintech, healthcare, and blockchain. Bridging full-stack engineering, cloud architecture, and tech leadership.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.58 }} className="flex flex-wrap items-center justify-center gap-3 mb-20">
          <a href="#contact" className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5">
            {"Let's Connect"}<ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a href="#experience" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all duration-200 hover:-translate-y-0.5">
            <Code2 size={14} />View Experience
          </a>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.72 }} className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl mx-auto">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text mb-1" style={{ backgroundImage: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>{value}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400 dark:text-slate-600">
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}><ArrowDown size={13} /></motion.div>
      </motion.div>
    </section>
  );
}

function About({ exp }: Readonly<{ exp: string; }>) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const pts = [
    'Architected microservices handling 1M+ requests per day',
    'Reduced CI/CD pipeline duration by 40%+ via GitHub Actions',
    'Led cross-functional teams of 5+ engineers at FCS & Periscope Tech',
    'Deep expertise in PostgreSQL, Redis, Kafka, and AWS cloud services',
    'Mentored 10+ junior and mid-level developers across multiple companies',
    'Delivered across fintech, healthcare, blockchain, and martech domains',
  ] as const;
  return (
    <section id="about" className="py-24 lg:py-32" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20 items-start">
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 mb-5"><Code2 size={10} />About Me</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-5 leading-tight">
              Building systems that{' '}<span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>{'scale & perform'}</span>
            </h2>
            <p suppressHydrationWarning className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
              With over {exp} of engineering experience across fintech, healthcare, and blockchain, I architect full-stack systems that power real businesses. I specialise in the JavaScript/TypeScript ecosystem — PostgreSQL, Kafka, Redis, and AWS at scale.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <a href="mailto:aishwary46@gmail.com" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-700 dark:text-indigo-400 text-sm font-medium transition-colors border border-indigo-600/10 dark:border-indigo-600/20"><Mail size={13} />aishwary46@gmail.com</a>
              <a href="tel:+918591693650" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/40 hover:bg-slate-200 dark:hover:bg-slate-700/40 text-slate-600 dark:text-slate-400 text-sm font-medium transition-colors border border-slate-200/80 dark:border-slate-700/30"><FaMobile size={12} />+91-8591693650</a>
            </div>
          </motion.div>
          <motion.div variants={stagger} className="flex flex-col gap-2.5">
            {pts.map((t, i) => (
              <motion.div key={i + 1} variants={fadeUp} className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/25 border border-slate-200/80 dark:border-slate-700/25 hover:border-indigo-500/30 dark:hover:border-indigo-500/20 transition-all group cursor-default">
                <span className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors leading-relaxed">{t}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  return (
    <section id="skills" className="py-24 lg:py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/70 to-transparent dark:via-white/[0.02] pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 mb-4"><Cpu size={10} />Tech Stack</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
            Technical{' '}<span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg,#06b6d4,#6366f1)' }}>Skills</span>
          </h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATS.map(({ category, icon: CatIcon, items }) => (
            <motion.div key={category} variants={scaleIn} whileHover={{ y: -4 }}
              className="group p-6 rounded-2xl bg-white dark:bg-slate-800/20 border border-slate-200/80 dark:border-slate-700/25 hover:border-indigo-500/30 dark:hover:border-indigo-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"><CatIcon size={14} /></div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map(({ name, icon: SI, color }) => (
                  <motion.span key={name} whileHover={{ scale: 1.06, y: -1 }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-700/35 border border-slate-200/80 dark:border-slate-600/25 text-slate-700 dark:text-slate-300 text-xs font-medium hover:border-indigo-500/30 transition-all cursor-default select-none">
                    {SI ? <SI size={11} style={{ color }} /> : <span className="inline-block w-2 h-2 rounded-full shrink-0" style={{ background: color }} />}
                    {name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ExpCard({ e, i }: Readonly<{ e: Experience; i: number; }>) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.2) }} className="relative pl-12 sm:pl-20">
      <div className="absolute left-[11px] sm:left-[27px] top-5">
        <div className={['w-3 h-3 rounded-full ring-4 ring-white dark:ring-[#030308] relative z-10', e.current ? 'bg-emerald-500' : 'bg-indigo-500/70'].join(' ')}>
          {e.current && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />}
        </div>
      </div>
      <div className="group p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800/20 border border-slate-200/80 dark:border-slate-700/25 hover:border-indigo-500/25 dark:hover:border-indigo-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">{e.company}</h3>
              {e.current && <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">Current</span>}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/15 font-medium">{e.domain}</span>
            </div>
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{e.role}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono shrink-0 mt-0.5"><Calendar size={11} />{e.period}</span>
        </div>
        {e.note && <p className="text-xs text-amber-600 dark:text-amber-400 mb-3 italic">{e.note}</p>}
        <ul className="space-y-1.5 mb-4">
          {e.highlights.map((h, hi) => (
            <li key={hi} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <span className="mt-[7px] shrink-0 w-1 h-1 rounded-full bg-indigo-500/60" />{h}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5">
          {e.tech.map(t => (
            <span key={t} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-600/25 text-slate-600 dark:text-slate-400 font-medium">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });
  return (
    <section id="experience" className="py-24 lg:py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent dark:via-white/[0.015] pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 mb-4"><GitBranch size={10} />Work History</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
            Professional{' '}<span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>Experience</span>
          </h2>
        </motion.div>
        <div className="relative">
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/60 via-violet-500/30 to-transparent" />
          <div className="space-y-6">
            {EXPERIENCES.map((e, i) => <ExpCard key={e.company} e={e} i={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Expertise() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  return (
    <section id="expertise" className="py-24 lg:py-32" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 mb-4"><Layers size={10} />What I Do</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
            Areas of{' '}<span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg,#8b5cf6,#6366f1)' }}>Expertise</span>
          </h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="grid sm:grid-cols-2 gap-5">
          {EXPERTISE.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} variants={fadeUp} whileHover={{ y: -5 }}
              className="group flex items-start gap-5 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800/20 border border-slate-200/80 dark:border-slate-700/25 hover:border-indigo-500/30 dark:hover:border-indigo-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/5">
              <div className="shrink-0 p-3 rounded-xl bg-gradient-to-br from-indigo-500/15 to-violet-500/15 group-hover:from-indigo-500/25 group-hover:to-violet-500/25 transition-all duration-300">
                <Icon size={20} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div><h3 className="font-bold text-slate-900 dark:text-white mb-2">{title}</h3><p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Contact({ year }: Readonly<{ year: number; }>) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  return (
    <section id="contact" className="py-24 lg:py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/60 to-slate-100/80 dark:via-black/15 dark:to-black/30 pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 mb-6"><Mail size={10} />Get In Touch</div>
          <h2 className="text-4xl sm:text-5xl lg:text-[60px] font-bold text-slate-900 dark:text-white mb-5 leading-tight">
            {"Let's architect"}{' '}<span className="text-transparent bg-clip-text animate-gradient-shift" style={{ backgroundImage: 'linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4,#6366f1)' }}>the future</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-xl mx-auto leading-relaxed">Open to Tech Lead and senior engineering roles. Passionate about building scalable systems, mentoring teams, and driving technical excellence. Let&apos;s create impact together.</p>
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            <motion.a href="mailto:aishwary46@gmail.com" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-indigo-500/20">
              <FaEnvelopeOpen size={13} />Send Email<ExternalLink size={11} className="opacity-60" />
            </motion.a>
            <motion.a href="https://www.linkedin.com/in/aishwary-shah-web-developer/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
              <FaLinkedin size={13} className="text-blue-500" />LinkedIn
            </motion.a>
            <motion.a href="https://github.com/aishwary11" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
              <FaGithub size={13} />GitHub
            </motion.a>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
            <p suppressHydrationWarning className="text-sm text-slate-400 dark:text-slate-600">&copy; {year} Aishwary Shah &mdash; Built with Next.js, TypeScript &amp; Framer Motion</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Main ──────────────────────────────────────────────────────────────
export default function Home() {
  const [theme, setTheme] = useLocalStorage<Theme>('portfolio-theme', 'dark');
  const [mounted, setMounted] = useState(false);
  const [pending, start] = useTransition();

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); }, [theme]);

  const toggle = useCallback(() => { start(() => { setTheme(p => p === 'dark' ? 'light' : 'dark'); }); }, [setTheme]);
  const isDark = theme === 'dark';
  const rawExp = mounted ? calcExp(START_DATE) : '8+ years';
  const exp = useDeferredValue(rawExp);
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <>
      <SpeedInsights />
      <ScrollBar />
      <div suppressHydrationWarning className="min-h-screen w-full font-sans bg-white dark:bg-[#030308] text-slate-900 dark:text-white transition-colors duration-500">
        <Nav isDark={isDark} toggle={toggle} pending={pending} />
        <main>
          <Hero exp={exp} />
          <About exp={exp} />
          <Skills />
          <Experience />
          <Expertise />
          <Contact year={year} />
        </main>
      </div>
    </>
  );
}
