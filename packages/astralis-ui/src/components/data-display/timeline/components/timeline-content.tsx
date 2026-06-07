import type { TimelineContentProps } from "../timeline.types";

export function TimelineContent({
  children,
}: TimelineContentProps) {
  return (
    <div className="astralis-flex astralis-flex-col astralis-gap-1">
      {children}
    </div>
  );
}
