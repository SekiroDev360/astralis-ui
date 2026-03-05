import type { ReactNode } from "react";
import type { TimelineProps } from "../timeline.types";
import { TimelineContext } from "../timeline.context";
import { TimelineItem } from "./timeline-item";
import { TimelineConnector } from "./timeline-connector";
import { TimelineIndicator } from "./timeline-indicator";
import { TimelineContent } from "./timeline-content";
import { TimelineTitle } from "./timeline-content";

/* ------------------------------------------------------------------ */
/* Pending Spinner Item                                                 */
/* ------------------------------------------------------------------ */

function PendingItem({ label }: { label: string }) {
  return (
    <TimelineItem>
      <TimelineConnector>
        <TimelineIndicator
          icon={
            <svg
              className="astralis-animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              style={{ width: "1em", height: "1em" }}
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="31.4 31.4"
                strokeLinecap="round"
              />
            </svg>
          }
        />
      </TimelineConnector>
      <TimelineContent>
        <TimelineTitle>{label}</TimelineTitle>
      </TimelineContent>
    </TimelineItem>
  );
}

/* ------------------------------------------------------------------ */
/* Root                                                                 */
/* ------------------------------------------------------------------ */

export function TimelineRoot({
  children,
  size = "md",
  variant = "subtle",
  orientation = "vertical",
  pending = false,
  reverse = false,
  className = "",
  style,
}: TimelineProps) {
  let items: ReactNode[] = Array.isArray(children) ? [...children] : [children];

  if (reverse) items = [...items].reverse();

  if (pending) {
    const label = typeof pending === "string" ? pending : "Loading...";
    items = [...items, <PendingItem key="__pending__" label={label} />];
  }

  const isHorizontal = orientation === "horizontal";

  return (
    <TimelineContext.Provider value={{ size, variant, orientation }}>
      <div
        className={[
          "astralis-relative",
          isHorizontal
            ? "astralis-flex astralis-flex-row astralis-items-start"
            : "astralis-flex astralis-flex-col",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={style}
      >
        {items}
      </div>
    </TimelineContext.Provider>
  );
}

TimelineRoot.displayName = "TimelineRoot";
