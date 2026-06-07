import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Root */
/* ------------------------------------------------------------------ */

export interface TableProps {
  children: ReactNode;
}

/* ------------------------------------------------------------------ */
/* Sections */
/* ------------------------------------------------------------------ */

export interface TableSectionProps {
  children: ReactNode;
}

/* ------------------------------------------------------------------ */
/* Rows & Cells */
/* ------------------------------------------------------------------ */

export interface TableRowProps {
  children: ReactNode;
}

export interface TableHeadProps {
  children: ReactNode;
}

export interface TableCellProps {
  children: ReactNode;
}
