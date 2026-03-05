import type { CSSProperties, ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Shared tokens                                                        */
/* ------------------------------------------------------------------ */

export type TimelineSize = "sm" | "md" | "lg";
export type TimelineVariant = "subtle" | "outline" | "solid";
export type TimelineOrientation = "vertical" | "horizontal";

/* ------------------------------------------------------------------ */
/* Root                                                                 */
/* ------------------------------------------------------------------ */

export interface TimelineProps {
  children: ReactNode;
  /** Visual size – controls indicator & gap. Default: "md" */
  size?: TimelineSize;
  /** Indicator dot style. Default: "subtle" */
  variant?: TimelineVariant;
  /** Axis the timeline runs along. Default: "vertical" */
  orientation?: TimelineOrientation;
  /**
   * Show a loading/pending indicator as the last item.
   * Pass `true` for a default spinner, or a string to customise the label.
   */
  pending?: boolean | string;
  /** Reverse the order of items */
  reverse?: boolean;
  className?: string;
  style?: CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Item                                                                 */
/* ------------------------------------------------------------------ */

export interface TimelineItemProps {
  children: ReactNode;
  /**
   * Override the automatic alternating placement.
   * When the root uses alternating layout this is set for you.
   */
  placement?: "left" | "right";
  className?: string;
  style?: CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Connector (the line between items)                                   */
/* ------------------------------------------------------------------ */

export interface TimelineConnectorProps {
  className?: string;
  style?: CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Indicator (the dot / icon)                                           */
/* ------------------------------------------------------------------ */

export interface TimelineIndicatorProps {
  /** Custom icon node rendered inside the indicator circle */
  icon?: ReactNode;
  /**
   * Override dot colour. Accepts any CSS colour or one of the
   * semantic shorthand: "primary" | "success" | "warning" | "danger" | "neutral"
   */
  color?:
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "neutral"
    | (string & {});
  className?: string;
  style?: CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Marker (legacy convenience wrapper = Connector + Indicator)         */
/* ------------------------------------------------------------------ */

export interface TimelineMarkerProps {
  /** @deprecated Use <Timeline.Connector> + <Timeline.Indicator> instead */
  children?: ReactNode;
}

/* ------------------------------------------------------------------ */
/* Content area                                                         */
/* ------------------------------------------------------------------ */

export interface TimelineContentProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface TimelineTitleProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface TimelineDescriptionProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}
