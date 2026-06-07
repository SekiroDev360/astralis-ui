import type { TimelineProps } from "../timeline.types";
import { TimelineContext } from "../timeline.context";

export function TimelineRoot({ children }: TimelineProps) {
  return (
    <TimelineContext.Provider value={{}}>
      <div className="astralis-relative astralis-flex astralis-flex-col astralis-gap-6">
        {children}
      </div>
    </TimelineContext.Provider>
  );
}
