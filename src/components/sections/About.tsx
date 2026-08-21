import { Section } from '@/components/ui/Section';
import { ROLES } from '@/data/experience';
import { PROFILE } from '@/data/profile';

/**
 * Domains, in the order they were first worked in, with the number of roles
 * spent in each. Derived from `ROLES` rather than restated, so it cannot drift.
 */
function domainBreakdown() {
  const counts = new Map<string, number>();
  // Reversed so the list reads chronologically, oldest domain first.
  for (const role of [...ROLES].reverse()) {
    counts.set(role.domain, (counts.get(role.domain) ?? 0) + 1);
  }
  return [...counts].map(([domain, roles]) => ({ domain, roles }));
}

export function About() {
  const domains = domainBreakdown();

  return (
    <Section
      id="about"
      eyebrow="About"
      title="Backend architecture for regulated, high-volume platforms"
    >
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="reveal space-y-5 text-base leading-relaxed text-slate-600 dark:text-slate-400">
          <p>{PROFILE.summary}</p>
          <p>{PROFILE.summaryExtended}</p>
        </div>

        <div className="reveal surface p-6 sm:p-7">
          <div className="hairline flex items-baseline justify-between border-b pb-4">
            <span className="eyebrow">Domains</span>
            <span className="meta">{domains.length} sectors</span>
          </div>

          <ul className="mt-5 space-y-3">
            {domains.map((entry) => (
              <li key={entry.domain} className="flex items-baseline justify-between gap-4">
                <span className="text-sm text-slate-800 dark:text-slate-200">{entry.domain}</span>
                <span className="meta shrink-0">
                  {entry.roles} {entry.roles === 1 ? 'role' : 'roles'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
