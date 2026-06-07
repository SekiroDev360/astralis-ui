import type { TimelineMarkerProps } from "../timeline.types";

export function TimelineMarker({ children }: TimelineMarkerProps) {
  return (
    <div className="astralis-relative">
      <div className="astralis-h-3 astralis-w-3 astralis-rounded-full astralis-bg-primary" />

      {/* vertical line */}
      <div className="astralis-absolute astralis-top-3 astralis-left-1/2 astralis-h-full astralis-w-px astralis-bg-gray-200 -astralis-translate-x-1/2" />

      {children}
    </div>
  );
}
