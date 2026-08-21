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
  headline: 'Technical Lead | Backend Architect | Node.js | Golang | Distributed Systems',
  availability: 'Available for Technical Lead & Architect roles',
  summary:
    'Technical Lead with 8+ years of experience designing, building, and scaling enterprise-grade fintech and BFSI platforms using Node.js, Go (Golang), React.js, PostgreSQL, Redis, Apache Kafka, and Kubernetes.',
  summaryExtended:
    'Proven expertise in architecting distributed microservices, event-driven systems, multi-tenant SaaS platforms, and high-volume transactional applications across cloud and on-premises infrastructure. Experienced in leading engineering teams, driving architecture decisions, optimizing database performance, and implementing secure, highly available production systems using modern DevOps practices.',
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
  resumePath: '/Aishwary-Shah-Technical-Lead.pdf',
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
  'Go & Node.js Specialist',
  'Event-Driven Platform Designer',
] as const;

/**
 * Headline figures. Every value is countable directly from the resume —
 * nothing here relies on a metric that cannot be defended in an interview.
 */
export const STATS: readonly Statistic[] = [
  { value: '8+', label: 'Years Engineering', detail: 'Fintech, BFSI & trading platforms' },
  { value: '8', label: 'Companies Shipped For', detail: 'Enterprise & high-growth teams' },
  { value: '6+', label: 'Engineers Led', detail: 'Architecture, reviews & mentorship' },
  { value: '2', label: 'Technical Lead Roles', detail: 'Platform re-architecture programmes' },
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
