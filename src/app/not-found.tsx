import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
        This page does not exist
      </h1>
      <p className="mt-4 max-w-md text-base text-slate-600 dark:text-slate-400">
        The portfolio is a single page. Head back to the start and use the navigation to find what
        you were after.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
      >
        Back to the portfolio
      </Link>
    </section>
  );
}
