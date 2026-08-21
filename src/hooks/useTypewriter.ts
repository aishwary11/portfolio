'use client';

import { useEffect, useState } from 'react';

/** Options controlling the typewriter cadence, in milliseconds. */
interface TypewriterOptions {
  readonly typeMs?: number;
  readonly deleteMs?: number;
  readonly holdMs?: number;
  /** When true, skips animation and shows the first word — for reduced motion. */
  readonly disabled?: boolean;
}

/**
 * Cycles through `words`, typing and deleting one character at a time.
 *
 * A single timer is scheduled per render pass and cleared on cleanup, so the
 * effect never leaves a pending timeout behind on unmount.
 */
export function useTypewriter(
  words: readonly string[],
  { typeMs = 75, deleteMs = 35, holdMs = 2200, disabled = false }: TypewriterOptions = {},
): string {
  const [state, setState] = useState({ text: '', index: 0, deleting: false });

  useEffect(() => {
    if (disabled || words.length === 0) return;

    const word = words[state.index % words.length];
    const atFullWord = state.text === word;
    const atEmpty = state.text === '';

    if (!state.deleting && atFullWord) {
      const timer = setTimeout(() => setState((s) => ({ ...s, deleting: true })), holdMs);
      return () => clearTimeout(timer);
    }

    if (state.deleting && atEmpty) {
      const timer = setTimeout(
        () => setState((s) => ({ text: '', index: s.index + 1, deleting: false })),
        deleteMs,
      );
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(
      () =>
        setState((s) => ({
          ...s,
          text: s.deleting ? word.slice(0, s.text.length - 1) : word.slice(0, s.text.length + 1),
        })),
      state.deleting ? deleteMs : typeMs,
    );

    return () => clearTimeout(timer);
  }, [state, words, typeMs, deleteMs, holdMs, disabled]);

  if (disabled) return words[0] ?? '';
  return state.text;
}
