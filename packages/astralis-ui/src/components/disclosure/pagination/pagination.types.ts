import type { ReactNode } from "react";
/* ------------------------------------------------------------------ */
/* Shared union types                                                   */
/* ------------------------------------------------------------------ */
export type PaginationVariant = "solid" | "outline" | "subtle" | "plain";
export type PaginationSize = "xs" | "sm" | "md" | "lg";
export type PaginationRounded = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
/* ------------------------------------------------------------------ */
/* Root                                                                 */
/* ------------------------------------------------------------------ */
export interface PaginationProps {
  /** Current page (controlled). */
  page?: number;
  /** Initial page when uncontrolled. */
  defaultPage?: number;
  /** Total number of pages. */
  totalPages: number;
  /** Callback fired on page change. */
  onPageChange?: (page: number) => void;
  /** Visual style of page items. @default "solid" */
  variant?: PaginationVariant;
  /** Size of every page item. @default "md" */
  size?: PaginationSize;
  /** Border-radius scale applied to every page item. @default "md" */
  rounded?: PaginationRounded;
  /** Disables the entire pagination. @default false */
  disabled?: boolean;
  children: ReactNode;
}
/* ------------------------------------------------------------------ */
/* Sub-components                                                       */
/* ------------------------------------------------------------------ */
export interface PaginationListProps {
  children: ReactNode;
}
export interface PaginationItemProps {
  page: number;
  children: ReactNode;
}
export interface PaginationControlProps {
  /** Override the default chevron with any node. */
  icon?: ReactNode;
}
export interface PaginationPagesProps {
  /**
   * Pages always shown on each side of the current page.
   * @default 1
   */
  siblings?: number;
  /**
   * Pages always shown at the start and end of the range.
   * @default 1
   */
  boundaryCount?: number;
}
