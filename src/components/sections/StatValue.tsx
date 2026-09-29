'use client';

import { useCountUp, parseStatValue } from '@/hooks/useCountUp';
import { useInView } from '@/hooks/useInView';
import { useMounted } from '@/hooks/useMounted';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface StatValueProps {
  /** The figure as written in the data file, e.g. "8+", "35%", "8". */
  readonly value: string;
  /** 1-based position in the row; drives the sequential start offset. */
  readonly position: number;
}

/**
 * One stat figure, counted up in sequence with its siblings.
 *
 * The stat's final value is what renders on the server and without JavaScript,
 * so nothing depends on the animation running. Once mounted, in view and
 * (for the first time only) not under reduced motion, each figure animates
 * from zero; the index offset makes them land one after another rather than
 * all at once. Figures without a number (none today) render untouched.
 */
export function StatValue({ value, position }: StatValueProps) {
  const mounted = useMounted();
  const [ref, inView] = useInView<HTMLSpanElement>();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { prefix, target, suffix } = parseStatValue(value);
  const animate = mounted && inView && !prefersReducedMotion && target > 0;

  const count = useCountUp(target, {
    enabled: animate,
    delayMs: (position - 1) * 150,
    durationMs: 1000,
  });

  if (target === 0) return <span ref={ref}>{value}</span>;

  /* While animating, the changing number is hidden and the real figure is given
     once, statically; when not animating the value renders alone, so it is
     never announced twice. */
  if (animate) {
    return (
      <span ref={ref}>
        <span aria-hidden="true" className="tabular-nums">
          {prefix}
          {count}
          {suffix}
        </span>
        <span className="sr-only">{value}</span>
      </span>
    );
  }

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}
