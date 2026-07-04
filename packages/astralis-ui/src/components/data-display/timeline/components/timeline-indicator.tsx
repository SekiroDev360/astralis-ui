import type { TimelineIndicatorProps } from "../timeline.types";
import { useTimeline } from "../timeline.context";
import { timelineIndicatorVariants } from "../timeline.styles";
import { astralisMerge } from "../../../../utils/astralis-merge";
import { accentClass } from "../../../../const/color-schemes";

export function TimelineIndicator({ children, colorScheme, className = "" }: TimelineIndicatorProps) {
  const { size, variant, colorScheme: rootScheme } = useTimeline();
  return (
    <span
      aria-hidden={children ? undefined : true}
      className={astralisMerge(timelineIndicatorVariants({ size, variant }), accentClass(colorScheme ?? rootScheme), className)}
    >
      {children}
    </span>
  );
}

TimelineIndicator.displayName = "Timeline.Indicator";
