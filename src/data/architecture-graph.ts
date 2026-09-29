/**
 * Platform topology for the force-directed graph in the Architecture section.
 *
 * Every node is a system the resume names and every link is a dependency those
 * roles describe — a map of the work, not an invention. Groups reuse the four
 * pillar colours from `architecture.ts`, so the graph and the cards read as one
 * system.
 */

export type GraphGroup = 'edge' | 'service' | 'data' | 'ai';

export interface GraphNode {
  readonly id: string;
  readonly label: string;
  readonly group: GraphGroup;
  /** One-line role, shown in the caption line while the node is hovered. */
  readonly detail: string;
}

export interface GraphLink {
  readonly source: string;
  readonly target: string;
}

/** Legend metadata: one line per group, keyed by the graph group. */
export const GROUP_META: Readonly<Record<GraphGroup, { label: string; color: string }>> = {
  edge: { label: 'Entry points', color: '#8B5CF6' },
  service: { label: 'Services', color: '#6366F1' },
  data: { label: 'Streams & stores', color: '#06B6D4' },
  ai: { label: 'AI / LLM', color: '#10B981' },
};

export const GRAPH_NODES: readonly GraphNode[] = [
  {
    id: 'clients',
    label: 'Web & mobile clients',
    group: 'edge',
    detail: 'React, Angular and React Native front ends.',
  },
  {
    id: 'gateway',
    label: 'API Gateway',
    group: 'edge',
    detail: 'Configuration-driven Go gateway — routing, auth, rate limiting.',
  },
  {
    id: 'lending',
    label: 'Lending platform',
    group: 'service',
    detail: 'DDD microservices for credit lending, multi-tenant by design.',
  },
  {
    id: 'healthcare',
    label: 'Healthcare services',
    group: 'service',
    detail: 'Connected-care APIs with controlled patient-data access.',
  },
  {
    id: 'risk',
    label: 'Risk workflows',
    group: 'service',
    detail: 'Insurance and real-estate risk processing services.',
  },
  {
    id: 'events',
    label: 'Event & content APIs',
    group: 'service',
    detail: 'Express/GraphQL enterprise services and FastAPI event workflows.',
  },
  {
    id: 'kafka',
    label: 'Apache Kafka',
    group: 'data',
    detail: 'Event backbone with the Transactional Outbox Pattern.',
  },
  {
    id: 'rabbitmq',
    label: 'RabbitMQ',
    group: 'data',
    detail: 'Messaging later migrated to Kafka for scale.',
  },
  {
    id: 'postgres',
    label: 'PostgreSQL',
    group: 'data',
    detail: 'Primary store — query tuning cut critical API times by 35%.',
  },
  {
    id: 'redis',
    label: 'Redis',
    group: 'data',
    detail: 'Caching, tenant configuration and session storage.',
  },
  {
    id: 'pgvector',
    label: 'pgvector',
    group: 'data',
    detail: 'Vector store backing retrieval-augmented generation.',
  },
  {
    id: 'rag',
    label: 'RAG assistant',
    group: 'ai',
    detail: 'Python/FastAPI assistant with guardrail-oriented validation.',
  },
  {
    id: 'ollama',
    label: 'Ollama',
    group: 'ai',
    detail: 'Local model runtime serving the assistant.',
  },
];

export const GRAPH_LINKS: readonly GraphLink[] = [
  { source: 'clients', target: 'gateway' },
  { source: 'gateway', target: 'lending' },
  { source: 'gateway', target: 'healthcare' },
  { source: 'gateway', target: 'risk' },
  { source: 'gateway', target: 'events' },
  { source: 'lending', target: 'kafka' },
  { source: 'lending', target: 'postgres' },
  { source: 'lending', target: 'redis' },
  { source: 'lending', target: 'rag' },
  { source: 'healthcare', target: 'kafka' },
  { source: 'healthcare', target: 'postgres' },
  { source: 'healthcare', target: 'redis' },
  { source: 'risk', target: 'kafka' },
  { source: 'risk', target: 'postgres' },
  { source: 'events', target: 'rabbitmq' },
  { source: 'events', target: 'postgres' },
  { source: 'rag', target: 'pgvector' },
  { source: 'rag', target: 'ollama' },
];
