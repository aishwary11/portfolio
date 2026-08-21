export type Theme = 'light' | 'dark';

/**
 * Single source of truth for the persisted theme key.
 *
 * Both the blocking init script below and the `useTheme` hook read this, which
 * is what keeps the pre-paint class and React's view of the theme in agreement.
 */
export const THEME_STORAGE_KEY = 'portfolio-theme';

export const DEFAULT_THEME: Theme = 'dark';

export function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark';
}

/**
 * Applies the persisted theme to `<html>` before first paint, so the page never
 * renders in the wrong palette and then corrects itself.
 *
 * Runs as a blocking inline script, so it is deliberately terse ES5 and must not
 * reference anything outside the browser globals.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});var t=s?JSON.parse(s):null;if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":${JSON.stringify(
  DEFAULT_THEME,
)};}var r=document.documentElement;r.classList.toggle("dark",t==="dark");r.style.colorScheme=t;}catch(e){document.documentElement.classList.add("dark");}})();`;
