import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Root */
/* ------------------------------------------------------------------ */

export interface TimelineProps {
  children: ReactNode;
}

/* ------------------------------------------------------------------ */
/* Sub-components */
/* ------------------------------------------------------------------ */

export interface TimelineItemProps {
  children: ReactNode;
}

export interface TimelineMarkerProps {
  children?: ReactNode;
}

export interface TimelineContentProps {
  children: ReactNode;
}
