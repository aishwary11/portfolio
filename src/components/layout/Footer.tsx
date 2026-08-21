import { PROFILE } from '@/data/profile';

/**
 * Also provides the scroll room the last section's reveal animation needs to
 * complete its range before the document runs out of scroll.
 */
export function Footer() {
  return (
    <footer className="hairline border-t px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
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
    </footer>
  );
}
