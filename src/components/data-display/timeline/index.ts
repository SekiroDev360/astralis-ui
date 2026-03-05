import { TimelineRoot } from "./components/timeline-root";
import { TimelineItem } from "./components/timeline-item";
import { TimelineConnector } from "./components/timeline-connector";
import { TimelineIndicator } from "./components/timeline-indicator";
import { TimelineMarker } from "./components/timeline-marker";
import {
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
} from "./components/timeline-content";

/* ------------------------------------------------------------------ */
/* 1️⃣  Compound API                                                     */
/* ------------------------------------------------------------------ */

export const Timeline = Object.assign(TimelineRoot, {
  Item: TimelineItem,
  /** The vertical/horizontal separator line between items */
  Connector: TimelineConnector,
  /** The dot or icon that marks the event */
  Indicator: TimelineIndicator,
  /** Legacy convenience wrapper – prefer Connector + Indicator */
  Marker: TimelineMarker,
  Content: TimelineContent,
  Title: TimelineTitle,
  Description: TimelineDescription,
});

/* ------------------------------------------------------------------ */
/* 2️⃣  Flat exports                                                    */
/* ------------------------------------------------------------------ */

export {
  TimelineItem,
  TimelineConnector,
  TimelineIndicator,
  TimelineMarker,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
};

/* ------------------------------------------------------------------ */
/* 3️⃣  Types                                                           */
/* ------------------------------------------------------------------ */

export type {
  TimelineSize,
  TimelineVariant,
  TimelineOrientation,
  TimelineProps,
  TimelineItemProps,
  TimelineConnectorProps,
  TimelineIndicatorProps,
  TimelineMarkerProps,
  TimelineContentProps,
  TimelineTitleProps,
  TimelineDescriptionProps,
} from "./timeline.types";
