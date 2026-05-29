import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Root */
/* ------------------------------------------------------------------ */

export interface PaginationProps {
  page?: number;
  defaultPage?: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  children: ReactNode;
}

/* ------------------------------------------------------------------ */
/* Sub-components */
/* ------------------------------------------------------------------ */

export interface PaginationListProps {
  children: ReactNode;
}

export interface PaginationItemProps {
  page: number;
  children: ReactNode;
}

export interface PaginationControlProps {
  children?: ReactNode;
}

export interface PaginationPagesProps {
  siblings?: number;
  className?: string;
}
