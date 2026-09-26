import { Cloud, Database, Sparkles, Zap } from 'lucide-react';

import type { ArchitecturePillar } from '@/types/resume';

/**
 * The four architectural themes that recur across the resume's roles. Each
 * pillar summarises work described in `ROLES` rather than adding new claims.
 */
export const ARCHITECTURE_PILLARS: readonly ArchitecturePillar[] = [
  {
    title: 'Distributed & Event-Driven Systems',
    subtitle: 'Asynchronous pipelines',
    description:
      'Event streams built on Apache Kafka and RabbitMQ, with the Transactional Outbox Pattern for reliable event publishing, inter-service choreography and fault-tolerant distributed communication.',
    icon: Zap,
    tags: ['Apache Kafka', 'Transactional Outbox', 'RabbitMQ', 'Microservices'],
    color: '#6366F1',
  },
  {
    title: 'Multi-Tenant SaaS & Data Architecture',
    subtitle: 'Tenant isolation & caching',
    description:
      'Centralized multi-tenant models in PostgreSQL with low-latency Redis configuration caching and query-plan, indexing and partitioning tuning, reducing database lookups while keeping tenants isolated.',
    icon: Database,
    tags: ['Multi-Tenant SaaS', 'PostgreSQL', 'Redis / Valkey', 'Query Tuning'],
    color: '#06B6D4',
  },
  {
    title: 'Cloud-Native & Hybrid Kubernetes',
    subtitle: 'AWS EKS, Rancher & telemetry',
    description:
      'Hybrid infrastructure spanning AWS EKS and on-premises Kubernetes clusters, with CI/CD automated through GitHub Actions and centralized observability via OpenObserve, Prometheus and Grafana.',
    icon: Cloud,
    tags: ['AWS EKS', 'Kubernetes', 'Docker', 'OpenObserve', 'GitHub Actions', 'Rancher'],
    color: '#8B5CF6',
  },
  {
    title: 'AI, LLMs & Vector Retrieval',
    subtitle: 'Production RAG assistants',
    description:
      'AI-powered RAG assistants built with Python and FastAPI, using Pydantic for structured validation, a guardrail-oriented architecture for controlled, grounded responses, and Ollama, pgvector and embeddings for retrieval.',
    icon: Sparkles,
    tags: ['RAG', 'Python / FastAPI', 'Pydantic', 'pgvector', 'Ollama', 'Embeddings'],
    color: '#10B981',
  },
];
