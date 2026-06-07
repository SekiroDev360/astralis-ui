import type { TimelineItemProps } from "../timeline.types";

export function TimelineItem({ children }: TimelineItemProps) {
  return (
    <div className="astralis-relative astralis-flex astralis-gap-4">
      {children}
    </div>
  );
}
