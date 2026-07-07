import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type MarqueeDirection = "left" | "right" | "up" | "down";

/* ------------------------------------------------------------------ */
/* MarqueeRoot                                                          */
/* ------------------------------------------------------------------ */

export interface MarqueeRootProps extends HTMLAttributes<HTMLDivElement> {
  /** Scroll direction */
  direction?: MarqueeDirection;
  /** Scroll speed in pixels per second */
  speed?: number;
  /** Gap between repeated items */
  gap?: string;
  /** Pause scrolling when the user hovers over the element */
  pauseOnHover?: boolean;
  /** Pause scrolling when the user focuses an element within */
  pauseOnFocus?: boolean;
  /** Reverse the scroll direction */
  reverse?: boolean;
  /** Show fade-out gradient at both edges */
  gradient?: boolean;
  /** The colour used for the gradient overlay (defaults to bg colour) */
  gradientColor?: string;
  /** Width of the gradient overlay (default: 10%) */
  gradientWidth?: string;
  /** Number of loops before stopping (0 = infinite) */
  loopCount?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/* ------------------------------------------------------------------ */
/* MarqueeItem                                                          */
/* ------------------------------------------------------------------ */

export interface MarqueeItemProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
