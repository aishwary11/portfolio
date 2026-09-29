'use client';

import { useEffect, useRef, useState } from 'react';

/** Options for the count-up animation. */
interface CountUpOptions {
  /** Run only when true — lets the caller gate on visibility and mount state. */
  readonly enabled: boolean;
  /** Total animation duration in milliseconds. */
  readonly durationMs?: number;
  /** Delay before the animation starts, in milliseconds. */
  readonly delayMs?: number;
}

/** Parse a stat figure like "8+", "6+", "35%" or "8" into prefix, number, suffix. */
export function parseStatValue(raw: string): { prefix: string; target: number; suffix: string } {
  // Scanned by hand rather than one backtracking regex — the figures are short,
  // and a linear walk has no pathological cases to argue about.
  const start = raw.search(/\d/);
  if (start === -1) return { prefix: raw, target: 0, suffix: '' };
  let end = start;
  while (end < raw.length && raw[end] >= '0' && raw[end] <= '9') end++;
  return {
    prefix: raw.slice(0, start),
    target: parseInt(raw.slice(start, end), 10),
    suffix: raw.slice(end),
  };
}

/**
 * Animate a stat from 0 to `target` with an ease-out curve.
 *
 * Runs only when `enabled` flips true, and is skipped entirely under reduced
 * motion or without JavaScript — the caller renders the final value in both
 * cases, so the figure is never blank or stuck at zero.
 */
export function useCountUp(
  target: number,
  { enabled, durationMs = 1100, delayMs = 0 }: CountUpOptions,
): number {
  const [value, setValue] = useState(target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || target === 0) return;

    let start: number | null = null;
    const step = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start - delayMs;
      if (elapsed < 0) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      const t = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, target, durationMs, delayMs]);

  return value;
}
