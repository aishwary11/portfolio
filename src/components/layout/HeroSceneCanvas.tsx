'use client';

import { useEffect, useRef } from 'react';

import type { HeroSceneHandle } from '@/lib/hero-scene';

/**
 * Client shell for the hero's 3D scene.
 *
 * The heavy dependency is imported only after mount, so it never competes with
 * the load metrics of the content above it. Before it arrives (and with
 * JavaScript disabled) the CSS ambient wash underneath carries the mood — same
 * palette, zero bytes of WebGL.
 */
export function HeroSceneCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HeroSceneHandle | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    import('@/lib/hero-scene').then(({ createHeroScene }) => {
      if (disposed || !containerRef.current) return;
      sceneRef.current = createHeroScene({ container: containerRef.current });
    });

    return () => {
      disposed = true;
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    />
  );
}
