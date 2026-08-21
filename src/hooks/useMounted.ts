'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const getServerSnapshot = () => false;

/** True only after the first client render, stable for the rest of the session. */
function getSnapshot(): boolean {
  return true;
}

/**
 * Hydration-safe mount flag.
 *
 * Any component that must not render server markup (localStorage reads,
 * `useInView`, timers) returns different output before and after hydration;
 * this hook keeps that difference explicit and guaranteed.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
