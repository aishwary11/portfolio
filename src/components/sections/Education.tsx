import { GraduationCap } from 'lucide-react';

import { Section } from '@/components/ui/Section';
import { QUALIFICATIONS } from '@/data/education';

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Formal qualifications">
      <ul className="stagger grid gap-5 md:grid-cols-2">
        {QUALIFICATIONS.map((qualification) => (
          <li key={qualification.degree} className="reveal surface-interactive p-6">
            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"
              >
                <GraduationCap size={18} />
              </span>

              <div className="min-w-0">
                <p className="meta">
                  <time dateTime={qualification.startedOn}>{qualification.period}</time>
                </p>
                <h3 className="mt-2 text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                  {qualification.degree}
                </h3>
                <p className="mt-1 text-sm text-indigo-600 dark:text-indigo-400">
                  {qualification.institution}
                </p>
                <p className="meta mt-1.5">{qualification.location}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
