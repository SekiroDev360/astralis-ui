import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Tracks the user's OS-level reduced-motion preference (WCAG 2.3.3).
 * SSR-safe: renders `false` on the server and re-syncs after mount.
 * Components with non-essential continuous motion (Marquee scroll,
 * Carousel autoplay) consult this to pause/skip their animation.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
