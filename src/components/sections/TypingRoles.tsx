'use client';

import { useMounted } from '@/hooks/useMounted';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useTypewriter } from '@/hooks/useTypewriter';
import { ROTATING_ROLES } from '@/data/profile';

/**
 * Cycles the role line beneath the name.
 *
 * Server-rendered output is the first role in full, and the animation only takes
 * over once mounted — so the line is never blank, never mismatched on hydration,
 * and reads correctly with JavaScript disabled.
 */
export function TypingRoles() {
  const mounted = useMounted();
  const prefersReducedMotion = usePrefersReducedMotion();
  const role = useTypewriter(ROTATING_ROLES, { disabled: !mounted || prefersReducedMotion });

  return (
    <p
      className="flex min-h-8 items-center font-mono text-lg text-slate-700 sm:text-xl dark:text-slate-300"
      /* The value changes on a timer; announcing every character would be noise. */
      aria-live="off"
    >
      <span aria-hidden="true" className="mr-2 text-indigo-500">
        &gt;
      </span>
      {role}
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block h-5 w-2 bg-indigo-500 motion-safe:animate-[caret-blink_1.1s_steps(1,end)_infinite]"
      />
      <span className="sr-only">{ROTATING_ROLES.join(', ')}</span>
    </p>
  );
}
