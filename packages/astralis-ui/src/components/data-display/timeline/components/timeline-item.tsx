import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import type { TimelineItemProps } from "../timeline.types";
import { useTimeline, useTimelineItem } from "../timeline.context";
import { timelineColumnWidth } from "../timeline.styles";
import { astralisMerge } from "../../../../utils/astralis-merge";

/**
 * Lays out one entry: an indicator column with the connecting line drawn beneath
 * it (hidden on the last item), and the content beside it. Splits its children
 * into the Indicator and everything else by displayName.
 */
export function TimelineItem({ children, className = "" }: TimelineItemProps) {
  const { size } = useTimeline();
  const { isLast } = useTimelineItem();

  let indicator: ReactElement | null = null;
  const rest: ReactNode[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && (child.type as { displayName?: string })?.displayName === "Timeline.Indicator") {
      indicator = child;
    } else {
      rest.push(child);
    }
  });

  return (
    <div className={astralisMerge("astralis:flex astralis:gap-3", className)}>
      <div className={astralisMerge("astralis:flex astralis:flex-col astralis:items-center astralis:shrink-0", timelineColumnWidth[size])}>
        {indicator}
        {!isLast && <div className="astralis:w-px astralis:flex-1 astralis:min-h-6 astralis:bg-stroke-base astralis:mt-1" />}
      </div>
      <div className="astralis:flex-1 astralis:min-w-0 astralis:pb-6">{rest}</div>
    </div>
  );
}
