import type { ReactNode } from "react";
/* ------------------------------------------------------------------ */
/* Shared union types                                                   */
/* ------------------------------------------------------------------ */
export type CarouselAnimation = "slide" | "fade";
export type CarouselOrientation = "horizontal" | "vertical";
export type CarouselIndicatorVariant = "dot" | "line" | "number";
/* ------------------------------------------------------------------ */
/* Root                                                                 */
/* ------------------------------------------------------------------ */
export interface CarouselProps {
  /** Active slide index (controlled). */
  index?: number;
  /** Initial slide index when uncontrolled. @default 0 */
  defaultIndex?: number;
  /** Callback fired when slide changes. */
  onIndexChange?: (index: number) => void;
  /** Callback fired before a slide transition starts. */
  beforeChange?: (from: number, to: number) => void;
  /** Callback fired after a slide transition completes. */
  afterChange?: (current: number) => void;
  /** Wrap around from last slide to first (and vice versa). @default false */
  loop?: boolean;
  /** Auto-advance slides. @default false */
  autoPlay?: boolean;
  /** Milliseconds between auto-advances. @default 3000 */
  autoPlayInterval?: number;
  /** Pause autoPlay when the pointer is over the carousel. @default true */
  pauseOnHover?: boolean;
  /** Slide transition style. @default "slide" */
  animation?: CarouselAnimation;
  /** Slide direction. @default "horizontal" */
  orientation?: CarouselOrientation;
  /** Transition duration in ms. @default 300 */
  speed?: number;
  /** CSS transition timing function. @default "ease-out" */
  easing?: string;
  /** Disables the entire carousel. @default false */
  disabled?: boolean;
  /** Enable touch swipe on mobile. @default true */
  swipeable?: boolean;
  /** Enable mouse drag on desktop. @default false */
  draggable?: boolean;
  children: ReactNode;
}
/* ------------------------------------------------------------------ */
/* Sub-components                                                       */
/* ------------------------------------------------------------------ */
export interface CarouselTrackProps {
  children: ReactNode;
}
export interface CarouselSlideProps {
  children: ReactNode;
}
export interface CarouselControlProps {
  /** Override the default chevron icon. */
  icon?: ReactNode;
  /**
   * When true the button is `position: absolute` overlaid on the carousel.
   * Set to false to render in-flow (e.g. in a control bar or vertical side panel).
   * @default true
   */
  overlay?: boolean;
}
export interface CarouselIndicatorProps {
  index: number;
  className?: string;
}
export interface CarouselIndicatorsProps {
  className?: string;
  /** Visual style of indicator dots. @default "dot" */
  variant?: CarouselIndicatorVariant;
}
export interface CarouselProgressTextProps {
  className?: string;
  /** Custom format function. Receives (activeIndex, slideCount). */
  format?: (index: number, total: number) => ReactNode;
}
export interface CarouselAutoPlayTriggerProps {
  className?: string;
  /**
   * Render prop receiving the current playing state.
   * Defaults to a Play/Pause icon.
   */
  children?: (isPlaying: boolean) => ReactNode;
}