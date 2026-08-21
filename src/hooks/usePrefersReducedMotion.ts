'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onStoreChange: () => void): () => void {
  const media = window.matchMedia(QUERY);
  media.addEventListener('change', onStoreChange);
  return () => media.removeEventListener('change', onStoreChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Tracks the OS "reduce motion" setting, and keeps tracking it — the preference
 * can change mid-session.
 *
 * The stylesheet already neutralises CSS animations. This exists for the timers
 * CSS cannot reach, which media queries have no way to stop.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
