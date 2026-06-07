import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Root */
/* ------------------------------------------------------------------ */

export interface DataListProps {
  children: ReactNode;
}

/* ------------------------------------------------------------------ */
/* Sub-components */
/* ------------------------------------------------------------------ */

export interface DataListItemProps {
  children: ReactNode;
}

export interface DataListLabelProps {
  children: ReactNode;
}

export interface DataListValueProps {
  children: ReactNode;
}
