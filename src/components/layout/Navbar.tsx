import { Download } from 'lucide-react';

import { MobileNav } from '@/components/layout/MobileNav';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { NAV_LINKS, PROFILE } from '@/data/profile';

/**
 * Fixed site header.
 *
 * The frosted background on scroll is a CSS scroll-driven animation, not a
 * scroll listener, so this stays a Server Component — only the theme switch and
 * the mobile menu ship JavaScript.
 */
export function Navbar() {
  return (
    <header className="site-nav fixed inset-x-0 top-0 z-50">
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-6">
        <a href="#top" className="group tap flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-lg border border-indigo-500/40 bg-indigo-500/10 font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-300">
            {PROFILE.initials}
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-slate-900 sm:block dark:text-white">
            {PROFILE.name}
          </span>
          <span className="sr-only">Back to top</span>
        </a>

        <ul className="mx-auto hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="tap-area rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <a
            href={PROFILE.resumePath}
            download
            className="tap-area hidden items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 sm:inline-flex dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            <Download aria-hidden="true" className="size-3.5" />
            Resume
          </a>
          <ThemeToggle />
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
