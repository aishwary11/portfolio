'use client';

import dynamic from 'next/dynamic';
import { useInView } from '@/hooks/useInView';

/**
 * The graph is an interactive extra, not content, so its JavaScript only loads
 * once the section approaches the viewport — below the fold, it never touches
 * the load metrics that the page above it is measured on.
 */
const ArchitectureGraphCanvas = dynamic(() => import('./ArchitectureGraphCanvas'), {
  ssr: false,
  loading: () => <GraphSkeleton />,
});

/** Reserves the graph's height so the section below doesn't jump when it mounts. */
function GraphSkeleton() {
  return (
    <div className="surface w-full p-4 sm:p-6" aria-hidden="true">
      <div className="h-[17rem] animate-pulse rounded-xl bg-slate-900/4 sm:h-[24rem] dark:bg-white/4" />
    </div>
  );
}

/**
 * Mounts the force-directed topology graph when its slot scrolls into view.
 *
 * The reveal is one-way and latched (`useInView`), so a graph that leaves the
 * viewport is never torn down and remounted — the simulation is computed at
 * module scope, and re-running it per scroll would be waste.
 */
export function ArchitectureGraph() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="reveal mt-10">
      {inView ? <ArchitectureGraphCanvas /> : <GraphSkeleton />}
    </div>
  );
}
