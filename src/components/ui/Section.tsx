import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface SectionProps {
  readonly id: string;
  /** Mono label naming the section. */
  readonly eyebrow: string;
  readonly title: ReactNode;
  readonly description?: ReactNode;
  readonly children: ReactNode;
  readonly className?: string;
}

/**
 * Shared section frame: consistent rhythm, one heading treatment, one rule.
 *
 * Every section is left-aligned on the same axis. Centring each block is what
 * made the page read as a template, and it costs the reader a fresh alignment
 * to track on every scroll.
 */
export function Section({ id, eyebrow, title, description, children, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn('deferred-section relative px-6 py-24 sm:py-28', className)}
    >
      <div className="mx-auto max-w-6xl">
        <header className="reveal mb-14 max-w-3xl">
          <p className="eyebrow">
            <span aria-hidden="true" className="h-px w-6 bg-indigo-500/60" />
            {eyebrow}
          </p>
          <h2
            id={`${id}-title`}
            className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
              {description}
            </p>
          ) : null}
        </header>

        {children}
      </div>
    </section>
  );
}
