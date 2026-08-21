/**
 * Ambient wash behind the hero.
 *
 * One slow gradient rather than the several independently pulsing orbs this
 * replaced: at that density the movement competes with the text for attention,
 * which is the opposite of what a hero needs to do.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="ambient-wash -top-40 -left-32 size-[34rem] bg-indigo-500/25 dark:bg-indigo-500/20"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="ambient-wash top-1/3 -right-40 size-[30rem] bg-violet-500/20 dark:bg-violet-500/15"
        style={{ animationDelay: '-8s' }}
      />

      {/* Hairline grid, masked to fade out before it reaches the copy. */}
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in oklab, var(--color-indigo-accent) 12%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--color-indigo-accent) 12%, transparent) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 55% at 50% 0%, #000 40%, transparent 100%)',
        }}
      />
    </div>
  );
}
