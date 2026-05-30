/**
 * TimelineMarker — legacy convenience component.
 * Wraps TimelineConnector (which already renders Indicator + line).
 * Prefer using <Timeline.Connector><Timeline.Indicator /></Timeline.Connector>.
 */
import type { TimelineMarkerProps } from "../timeline.types";
import { TimelineConnector } from "./timeline-connector";
import { TimelineIndicator } from "./timeline-indicator";

export function TimelineMarker({ children }: TimelineMarkerProps) {
  return (
    <TimelineConnector>
      <TimelineIndicator />
      {children}
    </TimelineConnector>
  );
}

TimelineMarker.displayName = "TimelineMarker";
