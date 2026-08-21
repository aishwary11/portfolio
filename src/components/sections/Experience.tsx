import { ChevronDown, Info } from 'lucide-react';

import { Section } from '@/components/ui/Section';
import { Tag } from '@/components/ui/Tag';
import { ROLES } from '@/data/experience';

/**
 * Career history as an append-only log.
 *
 * The structure is the point: a mono timestamp in the gutter, a marker, a spine
 * connecting each entry to the next. Order genuinely carries information here —
 * it is a progression from developer to lead — which is what earns the device.
 *
 * Each entry shows the architectural themes up front and keeps the verbatim
 * resume bullets one click away, so the section can be scanned in full or read
 * in depth without the page having to choose for the reader.
 */
export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Eight roles, newest first"
      description="Responsibilities are reproduced word for word from the resume, so nothing here can drift from the PDF."
    >
      <ol className="stagger">
        {ROLES.map((role) => (
          <li key={`${role.company}-${role.startedOn}`} className="log-entry reveal">
            <div className="flex gap-5 sm:gap-6">
              <span aria-hidden="true" className="log-marker" />

              <div className="min-w-0 flex-1 pb-12">
                <p className="meta flex flex-wrap items-center gap-x-2">
                  <time dateTime={role.startedOn}>{role.period}</time>
                  <span aria-hidden="true">·</span>
                  <span>{role.location}</span>
                </p>

                <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  {role.title}
                </h3>

                <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {role.company}
                  </span>
                  <span className="tag">{role.domain}</span>
                </p>

                {role.note ? (
                  <p className="mt-4 flex items-start gap-2.5 rounded-lg border border-amber-500/25 bg-amber-500/8 px-3 py-2.5 text-xs leading-relaxed text-amber-800 dark:text-amber-200">
                    <Info aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
                    {role.note}
                  </p>
                ) : null}

                {role.focus ? (
                  <div className="mt-5">
                    <p className="eyebrow">Architecture focus</p>
                    <ul className="mark-list mark-list-spec mt-3 space-y-2">
                      {role.focus.map((item) => (
                        <li
                          key={item}
                          className="text-sm leading-relaxed text-slate-700 dark:text-slate-300"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <details className="group surface mt-5">
                  <summary className="flex items-center justify-between gap-4 px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                    <span>
                      Responsibilities
                      <span className="meta ml-2 tabular-nums">{role.highlights.length}</span>
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className="size-4 shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-180"
                    />
                  </summary>

                  <ul className="mark-list mark-list-note hairline mx-4 mt-1 mb-4 space-y-3 border-t pt-4">
                    {role.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="text-sm leading-relaxed text-slate-600 dark:text-slate-400"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </details>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {role.stack.map((tech) => (
                    <Tag key={tech} label={tech} />
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
