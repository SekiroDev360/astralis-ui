import type { ReactNode } from "react";
import type { ColorScheme } from "../../../const/color-schemes";

export type PaginationVariant = "solid" | "outline" | "subtle" | "plain";
export type PaginationSize = "xs" | "sm" | "md" | "lg";
export type PaginationRounded = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface PaginationProps {
  /** Current page (controlled). */
  page?: number;
  /** Initial page when uncontrolled. @default 1 */
  defaultPage?: number;
  /** Total number of pages. Provide this OR `count` + `pageSize`. */
  totalPages?: number;
  /** Total item count — with `pageSize`, pages are derived as `ceil(count / pageSize)`. */
  count?: number;
  /** Items per page, used with `count`. @default 10 */
  pageSize?: number;
  onPageChange?: (page: number) => void;
  /** Visual style of page items. @default "solid" */
  variant?: PaginationVariant;
  size?: PaginationSize;
  rounded?: PaginationRounded;
  /** Hue of the active page and focus rings. @default "brand" */
  colorScheme?: ColorScheme;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export interface PaginationListProps {
  children: ReactNode;
  className?: string;
}

export interface PaginationItemProps {
  page: number;
  children: ReactNode;
  className?: string;
}

export interface PaginationControlProps {
  /** Override the default chevron with any node. */
  icon?: ReactNode;
  className?: string;
}

export interface PaginationPagesProps {
  /** Pages shown on each side of the current page. @default 1 */
  siblings?: number;
  /** Pages pinned at the start and end. @default 1 */
  boundaryCount?: number;
}

export interface PaginationPageTextProps {
  className?: string;
  /** Custom text; receives the pagination state. Defaults to "Page X of Y". */
  format?: (state: { page: number; totalPages: number; count?: number; pageSize?: number }) => ReactNode;
}

export interface PaginationJumperProps {
  className?: string;
  /** Label before the input. @default "Go to" */
  label?: ReactNode;
}
