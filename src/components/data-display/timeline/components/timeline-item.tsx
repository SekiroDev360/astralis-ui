import type { TimelineItemProps } from "../timeline.types";
import { useTimeline } from "../timeline.context";

export function TimelineItem({
  children,
  placement,
  className = "",
  style,
}: TimelineItemProps) {
  const { orientation } = useTimeline();
  const isHorizontal = orientation === "horizontal";

  if (isHorizontal) {
    /* Horizontal: stack indicator above content */
    return (
      <div
        role="listitem"
        className={[
          "astralis-relative astralis-flex astralis-flex-col astralis-items-center astralis-flex-1",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={style}
      >
        {children}
      </div>
    );
  }

  /* Vertical */
  if (placement === "left") {
    /* Content on the left, connector+indicator on the right */
    return (
      <div
        role="listitem"
        className={[
          "astralis-relative astralis-flex astralis-flex-row-reverse astralis-gap-4",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={style}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      role="listitem"
      className={[
        "astralis-relative astralis-flex astralis-flex-row astralis-gap-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}

TimelineItem.displayName = "TimelineItem";
