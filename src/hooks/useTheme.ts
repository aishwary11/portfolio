'use client';

import { useCallback, useEffect } from 'react';

import { isTheme, THEME_STORAGE_KEY, type Theme } from '@/lib/theme';

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
}

/**
 * Returns a callback that flips the active theme and persists the choice.
 *
 * `<html>` is the single source of truth: the blocking script in the document
 * head sets the class before first paint, and the toggle reads that class back
 * rather than mirroring it into React state. Keeping the value out of React is
 * deliberate — a mirrored copy is what previously let the pre-paint class and
 * the rendered icon disagree, and it means components can decide their
 * appearance in CSS and stay correct before hydration.
 */
export function useThemeToggle(): () => void {
  // Another tab may change the theme; follow it so the two stay in step.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY || !event.newValue) return;
      try {
        const next: unknown = JSON.parse(event.newValue);
        if (isTheme(next)) applyTheme(next);
      } catch {
        // A malformed value from another tab is not worth acting on.
      }
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return useCallback(() => {
    const next: Theme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Private browsing or a full quota. The class still applied, so the
      // toggle works for this session even though it will not persist.
    }
  }, []);
}
