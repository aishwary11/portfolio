/**
 * First focusable element on the page, so keyboard and screen-reader users can
 * jump past the navigation instead of tabbing through seven anchors.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-100"
    >
      Skip to content
    </a>
  );
}
