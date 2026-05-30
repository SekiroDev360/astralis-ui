import type { ReactNode } from "react";
import type { TimelineConnectorProps } from "../timeline.types";
import { useTimeline } from "../timeline.context";

/**
 * TimelineConnector — a flex-column wrapper that places children (the Indicator)
 * at the top, then renders the connecting line stretching downward.
 * It sits as a shrink-0 column inside the Item's horizontal flex row.
 */
export function TimelineConnector({
  children,
  className = "",
  style,
}: TimelineConnectorProps & { children?: ReactNode }) {
  const { orientation } = useTimeline();
  const isHorizontal = orientation === "horizontal";

  if (isHorizontal) {
    /**
     * Horizontal: render a full-width row with a line on each side of the indicator.
     * Used as the top section of a column-oriented TimelineItem.
     */
    return (
      <div
        className={[
          "astralis-flex astralis-flex-row astralis-items-center astralis-w-full",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={style}
      >
        <div className="astralis-flex-1 astralis-h-px astralis-bg-border-subtle" />
        {children}
        <div className="astralis-flex-1 astralis-h-px astralis-bg-border-subtle" />
      </div>
    );
  }

  /**
   * Vertical (default): the indicator goes at top, then a flex-1 vertical line
   * stretches downward alongside the content. The whole connector column is
   * shrink-0 so it never expands into the content area.
   */
  return (
    <div
      className={[
        "astralis-flex astralis-flex-col astralis-items-center astralis-shrink-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {/* Indicator lives here — rendered by children */}
      {children}
      {/* Vertical separator line */}
      <div className="astralis-flex-1 astralis-w-px astralis-min-h-8 astralis-bg-border-subtle" />
    </div>
  );
}

TimelineConnector.displayName = "TimelineConnector";
