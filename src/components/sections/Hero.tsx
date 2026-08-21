import { ArrowUpRight, Download, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import { AmbientBackground } from '@/components/layout/AmbientBackground';
import { TypingRoles } from '@/components/sections/TypingRoles';
import { CAREER_START, PROFILE, STATS } from '@/data/profile';
import { computeTenure } from '@/lib/tenure';

/** Ordered so the strongest credential is read first. */
function manifestRows(tenure: string) {
  return [
    { key: 'role', value: PROFILE.title },
    { key: 'tenure', value: tenure },
    { key: 'domains', value: 'Fintech · BFSI · Trading' },
    { key: 'languages', value: 'Go · TypeScript · Node.js' },
    { key: 'platform', value: 'Kubernetes · Kafka · PostgreSQL' },
    { key: 'location', value: `${PROFILE.location.city}, IN` },
  ];
}

/**
 * Opening statement.
 *
 * The panel on the right states the credentials as structured data rather than
 * prose, in the register the audience reads all day. It replaces a row of
 * headline percentages — those numbers were not on the resume, and a hiring
 * manager will ask about every one of them.
 */
export function Hero() {
  const tenure = computeTenure(CAREER_START);
  const rows = manifestRows(tenure.precise);

  return (
    <section
      id="top"
      aria-labelledby="hero-name"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden px-6 pt-28 pb-10"
    >
      <AmbientBackground />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <p className="reveal inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/8 px-3 py-1 font-mono text-xs text-emerald-700 dark:text-emerald-300">
            <span aria-hidden="true" className="relative flex size-1.5">
              <span className="absolute inline-flex size-full rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            {PROFILE.availability}
          </p>

          <h1
            id="hero-name"
            className="reveal mt-7 text-5xl leading-[0.95] font-semibold tracking-[-0.03em] text-balance text-slate-900 sm:text-6xl lg:text-7xl dark:text-white"
          >
            Aishwary
            <br />
            <span className="accent-text">Shah</span>
          </h1>

          <div className="reveal mt-6">
            <TypingRoles />
          </div>

          <p className="reveal mt-6 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
            {PROFILE.summary}
          </p>

          <div className="reveal mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Get in touch
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
            <a
              href={PROFILE.resumePath}
              download
              className="surface-interactive inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              <Download aria-hidden="true" className="size-4" />
              Download resume
            </a>

            <span aria-hidden="true" className="hairline hidden h-6 border-l sm:block" />

            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="surface-interactive grid size-11 place-items-center text-slate-600 dark:text-slate-300"
            >
              <FaLinkedin aria-hidden="true" className="size-4" />
              <span className="sr-only">LinkedIn profile</span>
            </a>
            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="surface-interactive grid size-11 place-items-center text-slate-600 dark:text-slate-300"
            >
              <FaGithub aria-hidden="true" className="size-4" />
              <span className="sr-only">GitHub profile</span>
            </a>
          </div>
        </div>

        {/* Credentials as a manifest: the page's data voice, established here and
            used for every period, count and label that follows. */}
        <div className="reveal surface p-6 sm:p-7">
          <div className="hairline flex items-center justify-between border-b pb-4">
            <span className="eyebrow">Profile</span>
            <span className="meta flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-500" />
              open
            </span>
          </div>

          <dl className="mt-5 space-y-3.5">
            {rows.map((row) => (
              <div key={row.key} className="flex items-baseline gap-4">
                <dt className="meta w-24 shrink-0">{row.key}</dt>
                <dd className="font-mono text-sm text-slate-800 dark:text-slate-200">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="hairline mt-6 flex items-center gap-2 border-t pt-5 text-sm text-slate-600 dark:text-slate-400">
            <MapPin aria-hidden="true" className="size-3.5 shrink-0 text-indigo-500" />
            {PROFILE.location.formatted}
          </p>
        </div>
      </div>

      {/* Only figures that can be counted straight off the resume. */}
      <ul className="stagger mx-auto mt-16 grid w-full max-w-6xl grid-cols-2 gap-x-8 sm:grid-cols-4">
        {STATS.map((stat) => (
          <li key={stat.label} className="reveal hairline border-t pt-5">
            <p className="font-mono text-2xl font-semibold text-slate-900 tabular-nums dark:text-white">
              {stat.value}
            </p>
            <p className="mt-1 text-xs font-medium text-slate-700 dark:text-slate-300">
              {stat.label}
            </p>
            <p className="meta mt-1 hidden sm:block">{stat.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
