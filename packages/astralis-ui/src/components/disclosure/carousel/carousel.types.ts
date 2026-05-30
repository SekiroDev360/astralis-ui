import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Root */
/* ------------------------------------------------------------------ */

export interface CarouselProps {
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  children: ReactNode;
}

/* ------------------------------------------------------------------ */
/* Sub-components */
/* ------------------------------------------------------------------ */

export interface CarouselTrackProps {
  children: ReactNode;
}

export interface CarouselSlideProps {
  children: ReactNode;
}

export interface CarouselControlProps {
  children?: ReactNode;
}

export interface CarouselIndicatorProps {
  index: number;
  className?: string;
}

export interface CarouselIndicatorsProps {
  className?: string;
}
