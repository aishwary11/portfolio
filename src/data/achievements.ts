import { Cloud, Rocket, Users, Zap } from 'lucide-react';

import type { Achievement } from '@/types/resume';

/**
 * Achievements, reproduced verbatim from the resume's ACHIEVEMENTS section.
 * Deliberately free of figures the resume does not state.
 */
export const ACHIEVEMENTS: readonly Achievement[] = [
  {
    title: 'Platform Modernization',
    description:
      'Led multiple platform modernization initiatives from monolithic architectures to event-driven microservices.',
    icon: Rocket,
    badge: 'Architecture',
  },
  {
    title: 'High-Availability Infrastructure',
    description:
      'Designed and deployed production systems on AWS and on-premises Kubernetes infrastructure with high availability.',
    icon: Cloud,
    badge: 'Cloud & DevOps',
  },
  {
    title: 'Event-Driven Fintech Platforms',
    description:
      'Built scalable event-driven architectures using Kafka, PostgreSQL, Redis, and RabbitMQ for fintech platforms.',
    icon: Zap,
    badge: 'Fintech & BFSI',
  },
  {
    title: 'Engineering Leadership',
    description:
      'Mentored engineering teams, established coding standards, and drove architecture reviews across multiple projects.',
    icon: Users,
    badge: 'Leadership',
  },
];
