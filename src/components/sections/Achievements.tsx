import { Section } from '@/components/ui/Section';
import { ACHIEVEMENTS } from '@/data/achievements';

export function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Impact"
      title="What the work added up to"
      description="Stated as the resume states it — the outcomes, without figures that cannot be evidenced."
    >
      <ul className="stagger grid gap-5 md:grid-cols-2">
        {ACHIEVEMENTS.map((achievement) => (
          <li key={achievement.title} className="reveal surface-interactive p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"
              >
                <achievement.icon size={18} />
              </span>
              <span className="tag">{achievement.badge}</span>
            </div>

            <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              {achievement.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {achievement.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
