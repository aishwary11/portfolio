/**
 * Domain types for the resume content that drives the portfolio.
 *
 * Every field here maps to something that exists on the source resume so the
 * site and the PDF can never drift apart.
 */
import type { ComponentType, SVGProps } from 'react';

/**
 * Shape shared by `lucide-react` and `react-icons` components, so either
 * library can be used interchangeably in the data layer.
 */
export type IconComponent = ComponentType<
  { size?: number | string; className?: string } & SVGProps<SVGSVGElement>
>;

/** Groups used by the skills explorer filter. */
export const SKILL_GROUPS = [
  'architecture',
  'backend',
  'cloud',
  'ai-data',
  'frontend',
  'security',
] as const;

export type SkillGroup = (typeof SKILL_GROUPS)[number];

export interface Skill {
  readonly name: string;
  /** `null` renders a coloured dot instead of a brand glyph. */
  readonly icon: IconComponent | null;
  /** Brand colour, used for the glyph or the fallback dot. */
  readonly color: string;
}

export interface SkillCategory {
  readonly category: string;
  readonly icon: IconComponent;
  readonly group: SkillGroup;
  readonly items: readonly Skill[];
}

export interface Role {
  readonly company: string;
  readonly title: string;
  readonly location: string;
  /** Display period, e.g. `01/2026 — 07/2026`. */
  readonly period: string;
  /** ISO `YYYY-MM` bounds, used for structured data and sorting. */
  readonly startedOn: string;
  readonly endedOn: string | null;
  readonly domain: string;
  /** Verbatim resume bullets. */
  readonly highlights: readonly string[];
  /** Architectural themes drawn from the bullets above. */
  readonly focus?: readonly string[];
  readonly stack: readonly string[];
  /** Context for a short tenure, shown verbatim. */
  readonly note?: string;
}

export interface Achievement {
  readonly title: string;
  readonly description: string;
  readonly icon: IconComponent;
  readonly badge: string;
}

export interface Qualification {
  readonly degree: string;
  readonly institution: string;
  readonly location: string;
  readonly period: string;
  readonly startedOn: string;
  readonly endedOn: string;
}

export interface ArchitecturePillar {
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly icon: IconComponent;
  readonly tags: readonly string[];
  readonly color: string;
}

export interface Statistic {
  readonly value: string;
  readonly label: string;
  readonly detail: string;
}

export interface NavLink {
  readonly label: string;
  readonly href: `#${string}`;
}
