import { Section } from '@/components/ui/Section';
import { Tag } from '@/components/ui/Tag';
import { SKILL_CATEGORIES, SKILL_COUNT } from '@/data/skills';

/**
 * The stack, grouped under the resume's own headings.
 *
 * Rendered in full rather than behind filter tabs: fourteen categories is a
 * quantity a reader can scan faster than they can operate a filter, and it keeps
 * every skill in the page for search engines and for Ctrl+F.
 */
export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Stack"
      title="Tools I have shipped production systems with"
      description={`${SKILL_COUNT} technologies across ${SKILL_CATEGORIES.length} categories, grouped the way the resume lists them.`}
    >
      <ul className="stagger grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {SKILL_CATEGORIES.map((category) => (
          <li key={category.category} className="reveal surface-interactive flex flex-col p-6">
            <div className="hairline flex items-center gap-3 border-b pb-4">
              <span
                aria-hidden="true"
                className="grid size-8 shrink-0 place-items-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"
              >
                <category.icon size={15} />
              </span>
              <h3 className="min-w-0 flex-1 text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
                {category.category}
              </h3>
              <span className="meta shrink-0 tabular-nums">
                {String(category.items.length).padStart(2, '0')}
              </span>
            </div>

            <ul className="mt-4 flex flex-wrap gap-1.5">
              {category.items.map((item) => (
                <Tag key={item.name} label={item.name} icon={item.icon} color={item.color} />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
