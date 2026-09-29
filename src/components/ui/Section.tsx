import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface SectionProps {
  readonly id: string;
  /** Mono label naming the section. */
  readonly eyebrow: string;
  /** Optional ordinal, rendered in the eyebrow for an editorial index. */
  readonly index?: number;
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
export function Section({
  id,
  eyebrow,
  index,
  title,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn('deferred-section relative px-6 py-14 sm:py-16 lg:py-20', className)}
    >
      <div className="mx-auto max-w-6xl">
        <header className="reveal mb-8 max-w-3xl sm:mb-10">
          <p className="eyebrow">
            <span aria-hidden="true" className="h-px w-6 bg-indigo-500/60" />
            {index !== undefined ? (
              <span className="text-indigo-500 tabular-nums dark:text-indigo-400">
                {String(index).padStart(2, '0')}
              </span>
            ) : null}
            {eyebrow}
          </p>
          <h2
            id={`${id}-title`}
            className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
              {description}
            </p>
          ) : null}
        </header>

        {children}
      </div>
    </section>
  );
}
