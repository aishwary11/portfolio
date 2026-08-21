import {
  Activity,
  Boxes,
  Cloud,
  Database,
  Eye,
  GitBranch,
  Globe,
  KeyRound,
  Layers,
  Lock,
  Server,
  Shield,
  Sparkles,
  Terminal,
  Workflow,
  Zap,
} from 'lucide-react';
import { FaAws, FaGithub, FaNodeJs } from 'react-icons/fa';
import {
  SiAngular,
  SiApachekafka,
  SiAuth0,
  SiCypress,
  SiDocker,
  SiEthereum,
  SiEthers,
  SiExpress,
  SiFastify,
  SiGit,
  SiGithubactions,
  SiGo,
  SiGooglecloud,
  SiGrafana,
  SiGraphql,
  SiHono,
  SiJavascript,
  SiJenkins,
  SiJest,
  SiJsonwebtokens,
  SiKubernetes,
  SiMocha,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiOllama,
  SiPostgresql,
  SiPrometheus,
  SiRabbitmq,
  SiRancher,
  SiRazorpay,
  SiReact,
  SiRedis,
  SiRedux,
  SiSolidity,
  SiSonarqubecloud,
  SiStripe,
  SiTestinglibrary,
  SiTypescript,
} from 'react-icons/si';

import type { SkillCategory } from '@/types/resume';

/**
 * Technical stack, grouped to mirror the resume's own skill headings.
 *
 * `group` drives the filter tabs in the skills explorer. Brand glyphs come from
 * `react-icons`; anything without an official glyph falls back to a `lucide`
 * icon or a coloured dot (`icon: null`).
 */
export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    category: 'Architecture & System Design',
    icon: Workflow,
    group: 'architecture',
    items: [
      { name: 'Microservices', icon: Boxes, color: '#6366F1' },
      { name: 'Distributed Systems', icon: null, color: '#8B5CF6' },
      { name: 'Event-Driven Architecture', icon: Zap, color: '#F59E0B' },
      { name: 'Transactional Outbox Pattern', icon: null, color: '#10B981' },
      { name: 'Multi-Tenant SaaS', icon: null, color: '#06B6D4' },
      { name: 'Domain-Driven Design (DDD)', icon: null, color: '#EC4899' },
      { name: 'System Design', icon: null, color: '#3B82F6' },
      { name: 'REST APIs', icon: null, color: '#0EA5E9' },
      { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
    ],
  },
  {
    category: 'Languages',
    icon: Terminal,
    group: 'backend',
    items: [
      { name: 'Go (Golang)', icon: SiGo, color: '#00ADD8' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Solidity', icon: SiSolidity, color: '#6E7B8B' },
    ],
  },
  {
    category: 'Backend Frameworks & Runtimes',
    icon: Server,
    group: 'backend',
    items: [
      { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
      { name: 'NestJS', icon: SiNestjs, color: '#E0234E' },
      { name: 'Express.js', icon: SiExpress, color: '#94A3B8' },
      { name: 'Fastify', icon: SiFastify, color: '#94A3B8' },
      { name: 'Hono.js', icon: SiHono, color: '#E36002' },
      { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
    ],
  },
  {
    category: 'Messaging & Event Streaming',
    icon: Zap,
    group: 'backend',
    items: [
      { name: 'Apache Kafka', icon: SiApachekafka, color: '#7C7C7C' },
      { name: 'RabbitMQ', icon: SiRabbitmq, color: '#FF6600' },
    ],
  },
  {
    category: 'Databases & In-Memory Stores',
    icon: Database,
    group: 'ai-data',
    items: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'Redis', icon: SiRedis, color: '#DC382D' },
      { name: 'Valkey', icon: null, color: '#FF4785' },
      { name: 'PgBouncer', icon: null, color: '#3B82F6' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    ],
  },
  {
    category: 'AI, LLM & Vector Search',
    icon: Sparkles,
    group: 'ai-data',
    items: [
      { name: 'Retrieval-Augmented Generation (RAG)', icon: null, color: '#10B981' },
      { name: 'pgvector', icon: SiPostgresql, color: '#336791' },
      { name: 'Ollama', icon: SiOllama, color: '#94A3B8' },
      { name: 'Embeddings & Vector Search', icon: null, color: '#8B5CF6' },
      { name: 'Prompt Engineering', icon: null, color: '#F59E0B' },
      { name: 'Claude Code / Cursor / Copilot', icon: null, color: '#D97706' },
    ],
  },
  {
    category: 'Cloud, Containers & Infrastructure',
    icon: Cloud,
    group: 'cloud',
    items: [
      { name: 'AWS', icon: FaAws, color: '#FF9900' },
      { name: 'AWS EKS', icon: FaAws, color: '#FF9900' },
      { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Rancher', icon: SiRancher, color: '#0075A8' },
      { name: 'GCP', icon: SiGooglecloud, color: '#4285F4' },
    ],
  },
  {
    category: 'CI/CD & Code Quality',
    icon: GitBranch,
    group: 'cloud',
    items: [
      { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF' },
      { name: 'Jenkins', icon: SiJenkins, color: '#D24939' },
      { name: 'SonarQube', icon: SiSonarqubecloud, color: '#4E9BCD' },
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: FaGithub, color: '#94A3B8' },
    ],
  },
  {
    category: 'Observability & Monitoring',
    icon: Eye,
    group: 'security',
    items: [
      { name: 'OpenObserve', icon: Activity, color: '#6366F1' },
      { name: 'Prometheus', icon: SiPrometheus, color: '#E6522C' },
      { name: 'Grafana', icon: SiGrafana, color: '#F46800' },
    ],
  },
  {
    category: 'Authentication & Security',
    icon: Shield,
    group: 'security',
    items: [
      { name: 'JWT', icon: SiJsonwebtokens, color: '#D63AFF' },
      { name: 'Refresh Token Rotation', icon: null, color: '#A855F7' },
      { name: 'Argon2', icon: Lock, color: '#10B981' },
      { name: 'OAuth 2.0', icon: SiAuth0, color: '#EB5424' },
      { name: 'RBAC', icon: Shield, color: '#6366F1' },
      { name: 'TOTP MFA', icon: KeyRound, color: '#F59E0B' },
    ],
  },
  {
    category: 'Testing & Quality Assurance',
    icon: Activity,
    group: 'security',
    items: [
      { name: 'Jest', icon: SiJest, color: '#C21325' },
      { name: 'Mocha', icon: SiMocha, color: '#8D6748' },
      { name: 'Cypress', icon: SiCypress, color: '#69D3A7' },
      { name: 'React Testing Library', icon: SiTestinglibrary, color: '#E33332' },
    ],
  },
  {
    category: 'Frontend & Mobile',
    icon: Globe,
    group: 'frontend',
    items: [
      { name: 'React.js', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#94A3B8' },
      { name: 'Angular', icon: SiAngular, color: '#DD0031' },
      { name: 'React Native', icon: SiReact, color: '#61DAFB' },
      { name: 'Redux', icon: SiRedux, color: '#764ABC' },
    ],
  },
  {
    category: 'Blockchain & Web3',
    icon: Layers,
    group: 'frontend',
    items: [
      { name: 'Solidity', icon: SiSolidity, color: '#6E7B8B' },
      { name: 'Web3.js', icon: SiEthereum, color: '#F16822' },
      { name: 'Ethers.js', icon: SiEthers, color: '#2535A0' },
    ],
  },
  {
    category: 'Payment Integrations',
    icon: Boxes,
    group: 'backend',
    items: [
      { name: 'Stripe', icon: SiStripe, color: '#635BFF' },
      { name: 'Razorpay', icon: SiRazorpay, color: '#3395FF' },
      { name: 'PayPal', icon: null, color: '#003087' },
    ],
  },
];

/** Total distinct skills, used in the section subheading. */
export const SKILL_COUNT = SKILL_CATEGORIES.reduce((total, cat) => total + cat.items.length, 0);
