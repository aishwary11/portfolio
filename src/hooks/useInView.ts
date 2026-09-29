'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Latching "has entered the viewport" flag.
 *
 * Returns a ref to attach and a boolean that flips true the first time the
 * element crosses into view, and stays true — one observation, no flicker
 * when the element scrolls back out.
 */
export function useInView<T extends Element>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [inView]);

  return [ref, inView];
}
