import type { TimelineContentProps, TimelineTextProps } from "../timeline.types";
import { useTimeline } from "../timeline.context";
import { timelineTitleSize } from "../timeline.styles";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function TimelineContent({ children, className = "" }: TimelineContentProps) {
  return <div className={astralisMerge("astralis:flex astralis:flex-col astralis:gap-0.5 astralis:pt-0.5", className)}>{children}</div>;
}
TimelineContent.displayName = "Timeline.Content";

export function TimelineTitle({ children, className = "" }: TimelineTextProps) {
  const { size } = useTimeline();
  return <span className={astralisMerge("astralis:font-medium astralis:text-label-base", timelineTitleSize[size], className)}>{children}</span>;
}
TimelineTitle.displayName = "Timeline.Title";

export function TimelineDescription({ children, className = "" }: TimelineTextProps) {
  return <span className={astralisMerge("astralis:text-sm astralis:text-label-muted", className)}>{children}</span>;
}
TimelineDescription.displayName = "Timeline.Description";
