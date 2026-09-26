import type { NavLink, Statistic } from '@/types/resume';

/**
 * Canonical site origin. Overridable per-environment so preview deployments
 * emit correct absolute URLs in metadata, sitemap and structured data.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://aishwaryshah.vercel.app';

/** Month the first professional role began — drives the computed tenure. */
export const CAREER_START = { year: 2018, month: 7 } as const;

export const PROFILE = {
  name: 'Aishwary Shah',
  initials: 'AS',
  title: 'Technical Lead',
  headline:
    'Technical Lead | Backend Architect | Node.js | Go | Python | Microservices | Distributed Systems | Kafka | Kubernetes | AI/LLM | RAG | pgvector',
  availability: 'Available for Technical Lead & Architect roles',
  summary:
    'Technical Lead / Backend Architect with 8+ years of experience designing, building, and scaling FinTech, BFSI, and enterprise platforms. Hands-on expertise in Node.js, Go, Python/FastAPI, Kafka, PostgreSQL, Redis, Kubernetes, and AWS, with strong experience in microservices, distributed systems, event-driven architecture, multi-tenant SaaS, and API design.',
  summaryExtended:
    'Led 6+ engineers across architecture, technical decision-making, code reviews, mentoring, engineering standards, sprint planning, and production releases. Experienced in system design, performance optimization, CI/CD, cloud and hybrid infrastructure, security, observability, and production reliability. Built AI-powered RAG solutions using Python, FastAPI, Pydantic, Ollama, embeddings, and pgvector.',
  location: {
    city: 'Mumbai',
    region: 'Maharashtra',
    postalCode: '400067',
    country: 'India',
    formatted: 'Mumbai, Maharashtra, 400067, India',
  },
  email: 'aishwary46@gmail.com',
  phone: '+91-8591693650',
  /** RFC 3966 form for `tel:` links — no separators. */
  phoneHref: '+918591693650',
  resumePath: '/Aishwary_Shah_Tech_Lead.pdf',
  links: {
    linkedin: 'https://www.linkedin.com/in/aishwary-shah-web-developer/',
    github: 'https://github.com/aishwary11',
    portfolio: SITE_URL,
  },
} as const;

/**
 * Roles the hero cycles through. Each is a claim the resume supports.
 */
export const ROTATING_ROLES = [
  'Technical Lead',
  'Backend Architect',
  'Distributed Systems Engineer',
  'Go · Node.js · Python Specialist',
  'Event-Driven Platform Designer',
  'AI/LLM Platform Engineer',
] as const;

/**
 * Headline figures. Every value is countable directly from the resume —
 * nothing here relies on a metric that cannot be defended in an interview.
 */
export const STATS: readonly Statistic[] = [
  { value: '8+', label: 'Years Engineering', detail: 'Fintech, BFSI & HealthTech platforms' },
  { value: '8', label: 'Companies Shipped For', detail: 'Enterprise & high-growth teams' },
  { value: '6+', label: 'Engineers Led', detail: 'Architecture, reviews & mentorship' },
  { value: '35%', label: 'Faster Critical APIs', detail: 'PostgreSQL tuning at First Credit' },
];

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];
