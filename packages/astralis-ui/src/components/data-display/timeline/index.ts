import { TimelineRoot } from "./components/timeline-root";
import { TimelineItem } from "./components/timeline-item";
import { TimelineMarker } from "./components/timeline-marker";
import { TimelineContent } from "./components/timeline-content";

/* 1️⃣ Compound API */
export const Timeline = Object.assign(TimelineRoot, {
  Item: TimelineItem,
  Marker: TimelineMarker,
  Content: TimelineContent,
});

/* 2️⃣ Flat exports */
export {
  TimelineItem,
  TimelineMarker,
  TimelineContent,
};

/* 3️⃣ Types */
export type {
  TimelineProps,
  TimelineItemProps,
  TimelineMarkerProps,
  TimelineContentProps,
} from "./timeline.types";
