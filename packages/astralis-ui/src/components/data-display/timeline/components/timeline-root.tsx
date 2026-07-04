import { Children } from "react";
import type { TimelineProps } from "../timeline.types";
import { TimelineContext, TimelineItemContext } from "../timeline.context";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function TimelineRoot({ children, size = "md", variant = "solid", colorScheme = "brand", className = "" }: TimelineProps) {
  const items = Children.toArray(children);
  const lastIndex = items.length - 1;

  return (
    <TimelineContext.Provider value={{ size, variant, colorScheme }}>
      <div className={astralisMerge("astralis:flex astralis:flex-col", className)}>
        {items.map((child, i) => (
          <TimelineItemContext.Provider key={i} value={{ isLast: i === lastIndex }}>
            {child}
          </TimelineItemContext.Provider>
        ))}
      </div>
    </TimelineContext.Provider>
  );
}
