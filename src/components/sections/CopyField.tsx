'use client';

import { Check, Copy } from 'lucide-react';
import type { ReactNode } from 'react';

import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

interface CopyFieldProps {
  readonly label: string;
  /** Shown to the reader, and the text placed on the clipboard. */
  readonly value: string;
  /** Where the value itself links to, e.g. `mailto:` or `tel:`. */
  readonly href: string;
  /**
   * A rendered glyph, not a component reference — component functions cannot
   * cross the server/client boundary, but the elements they produce can.
   */
  readonly icon: ReactNode;
}

/**
 * A contact detail that can be opened or copied.
 *
 * Two actions, kept separate: the value is a link for people who want their mail
 * client, and the button copies for everyone who does not. Bundling both into one
 * control would make it impossible to guess which you were going to get.
 */
export function CopyField({ label, value, href, icon }: CopyFieldProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <div className="surface-interactive flex items-center gap-4 p-4">
      <span
        aria-hidden="true"
        className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"
      >
        {icon}
      </span>

      {/* Label and value are one target. Making only the value clickable left a
          20px-tall link, well under the 44px minimum, and there is nothing to
          gain from a reader having to hit the address exactly. */}
      <a href={href} className="tap-area group min-w-0 flex-1 py-0.5">
        <span className="eyebrow">{label}</span>
        <span className="mt-1 block truncate font-mono text-sm text-slate-800 group-hover:text-indigo-600 dark:text-slate-200 dark:group-hover:text-indigo-400">
          {value}
        </span>
      </a>

      <button
        type="button"
        onClick={() => copy(value)}
        className="grid size-11 shrink-0 place-items-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:text-slate-900 dark:border-white/10 dark:hover:text-white"
      >
        {copied ? (
          <Check aria-hidden="true" className="size-4 text-emerald-500" />
        ) : (
          <Copy aria-hidden="true" className="size-4" />
        )}
        {/* The label changes so the state is announced, not just shown. */}
        <span className="sr-only" aria-live="polite">
          {copied ? `${label} copied` : `Copy ${label.toLowerCase()}`}
        </span>
      </button>
    </div>
  );
}
