'use client';

import { Moon, Sun } from 'lucide-react';

import { useThemeToggle } from '@/hooks/useTheme';

/**
 * Theme switch.
 *
 * Which glyph shows is decided in CSS from the `dark` class on `<html>`, not
 * from React state. That means the correct icon is painted on the very first
 * frame — before this component hydrates — and there is no server/client
 * mismatch to work around.
 */
export function ThemeToggle() {
  const toggle = useThemeToggle();

  return (
    <button
      type="button"
      onClick={toggle}
      className="surface-interactive grid size-11 place-items-center text-slate-600 dark:text-slate-300"
    >
      <Moon aria-hidden="true" className="size-4 dark:hidden" />
      <Sun aria-hidden="true" className="hidden size-4 dark:block" />
      <span className="sr-only dark:hidden">Switch to dark theme</span>
      <span className="sr-only hidden dark:inline">Switch to light theme</span>
    </button>
  );
}
