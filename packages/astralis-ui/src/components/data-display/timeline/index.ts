import { TimelineRoot } from "./components/timeline-root";
import { TimelineItem } from "./components/timeline-item";
import { TimelineIndicator } from "./components/timeline-indicator";
import { TimelineContent, TimelineTitle, TimelineDescription } from "./components/timeline-content";

/** Compound API — `Timeline` is the root; parts hang off it. */
export const Timeline = Object.assign(TimelineRoot, {
  Item: TimelineItem,
  Indicator: TimelineIndicator,
  Content: TimelineContent,
  Title: TimelineTitle,
  Description: TimelineDescription,
});

export { TimelineItem, TimelineIndicator, TimelineContent, TimelineTitle, TimelineDescription };

export type {
  TimelineProps,
  TimelineSize,
  TimelineVariant,
  TimelineItemProps,
  TimelineIndicatorProps,
  TimelineContentProps,
  TimelineTextProps,
} from "./timeline.types";
