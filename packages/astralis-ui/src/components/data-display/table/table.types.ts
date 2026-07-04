import type {
  ReactNode,
  HTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";

export type TableVariant = "line" | "outline";
export type TableSize = "sm" | "md" | "lg";

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  children: ReactNode;
  variant?: TableVariant;
  size?: TableSize;
  /** Zebra-stripe the body rows. */
  striped?: boolean;
  /** Highlight rows on hover. */
  interactive?: boolean;
  /** Pin the header while the body scrolls. */
  stickyHeader?: boolean;
  className?: string;
}

export interface TableSectionProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
  className?: string;
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
  className?: string;
}

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
  className?: string;
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
  className?: string;
}

export interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {
  placement?: "top" | "bottom";
  className?: string;
}
