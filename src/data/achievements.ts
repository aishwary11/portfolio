import { Gauge, Rocket, Sparkles, Users } from 'lucide-react';

import type { Achievement } from '@/types/resume';

/**
 * Highlights, each sourced from a fact the new resume states: the quantified
 * PostgreSQL result, the team-led scope, the production RAG assistant and the
 * Kafka migration. Deliberately free of figures the resume does not state.
 */
export const ACHIEVEMENTS: readonly Achievement[] = [
  {
    title: '35% Faster Critical APIs',
    description:
      'Optimized PostgreSQL query plans, indexing, and partitioning, reducing critical API response times by 35% on a high-volume credit lending platform.',
    icon: Gauge,
    badge: 'Measured Result',
  },
  {
    title: 'Engineering Leadership',
    description:
      'Led 6+ engineers across architecture, technical decision-making, code reviews, mentoring, engineering standards, sprint planning, and production releases.',
    icon: Users,
    badge: 'Leadership',
  },
  {
    title: 'Production RAG Assistant',
    description:
      'Built an AI-powered RAG assistant with Python, FastAPI, Pydantic, Ollama, pgvector, and embeddings, with structured validation and a guardrail-oriented architecture.',
    icon: Sparkles,
    badge: 'AI / LLM',
  },
  {
    title: 'Platform Modernization',
    description:
      'Led platform re-architecture from legacy services to event-driven, DDD-based microservices, and migrated asynchronous messaging from RabbitMQ to Apache Kafka.',
    icon: Rocket,
    badge: 'Architecture',
  },
];
