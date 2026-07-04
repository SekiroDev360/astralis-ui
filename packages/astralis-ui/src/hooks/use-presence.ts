import { useEffect, useState } from "react";

export type PresenceState = "open" | "closed";

/**
 * Keeps a component mounted long enough to play an exit transition. Returns
 * `mounted` (whether to render at all) and `state` ("open"/"closed") to drive
 * enter/exit classes. On open it mounts, then flips to "open" on the next frame
 * so the transition runs from the closed styles; on close it flips to "closed"
 * and unmounts after `duration`.
 */
export function usePresence(open: boolean, duration = 200): { mounted: boolean; state: PresenceState } {
  // `retained` keeps the element mounted through the exit transition after close.
  const [retained, setRetained] = useState(open);
  const [state, setState] = useState<PresenceState>(open ? "open" : "closed");

  useEffect(() => {
    if (open) {
      setRetained(true);
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setState("open")));
      return () => cancelAnimationFrame(raf);
    }
    setState("closed");
    const timer = setTimeout(() => setRetained(false), duration);
    return () => clearTimeout(timer);
  }, [open, duration]);

  // Mount immediately on open (same commit) so positioners can measure the node;
  // stay mounted while closing until the exit transition finishes.
  return { mounted: open || retained, state };
}
