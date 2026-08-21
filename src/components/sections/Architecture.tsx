import { Section } from '@/components/ui/Section';
import { Tag } from '@/components/ui/Tag';
import { ARCHITECTURE_PILLARS } from '@/data/architecture';

/**
 * The four themes that recur across the roles below.
 *
 * Placed before the timeline on purpose: it answers "what does this person
 * actually do" once, so the reader can then treat the timeline as evidence
 * rather than having to synthesise the pattern themselves.
 */
export function Architecture() {
  return (
    <Section
      id="architecture"
      eyebrow="Architecture"
      title="Four problems I keep being brought in to solve"
      description="Each theme below is drawn from the roles that follow — the same patterns, applied across lending, broking and risk platforms."
    >
      <ul className="stagger grid gap-5 md:grid-cols-2">
        {ARCHITECTURE_PILLARS.map((pillar) => (
          <li key={pillar.title} className="reveal surface-interactive p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="grid size-10 shrink-0 place-items-center rounded-xl"
                style={{
                  color: pillar.color,
                  backgroundColor: `color-mix(in oklab, ${pillar.color} 14%, transparent)`,
                }}
              >
                <pillar.icon size={18} />
              </span>

              <div className="min-w-0">
                <p className="eyebrow">{pillar.subtitle}</p>
                <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                  {pillar.title}
                </h3>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {pillar.description}
            </p>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {pillar.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
