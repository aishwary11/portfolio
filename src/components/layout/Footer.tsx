import { Download, Mail } from 'lucide-react';

import { NAV_LINKS, PROFILE } from '@/data/profile';

/**
 * Closing frame: quick navigation, the two actions a reader is most likely to
 * want (email, resume), and the meta row.
 *
 * Also provides the scroll room the last section's reveal animation needs to
 * complete its range before the document runs out of scroll.
 */
export function Footer() {
  return (
    <footer className="hairline border-t px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-10 sm:flex-row sm:items-start">
          <div>
            <a href="#top" className="tap-area group inline-flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-lg border border-indigo-500/40 bg-indigo-500/10 font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-300">
                {PROFILE.initials}
              </span>
              <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
                {PROFILE.name}
              </span>
              <span className="sr-only">Back to top</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {PROFILE.availability}.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <a
                href={`mailto:${PROFILE.email}`}
                className="surface-interactive inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                <Mail aria-hidden="true" className="size-3.5 text-indigo-500" />
                Email
              </a>
              <a
                href={PROFILE.resumePath}
                download
                className="surface-interactive inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                <Download aria-hidden="true" className="size-3.5 text-indigo-500" />
                Resume
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow">Sections</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-14 gap-y-1.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="tap-area text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="hairline mt-10 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="meta">
            {PROFILE.name} · {PROFILE.title}
          </p>
          <p className="meta">
            Built with Next.js, React and Tailwind CSS ·{' '}
            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="tap-area hover:text-indigo-500"
            >
              Source
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
