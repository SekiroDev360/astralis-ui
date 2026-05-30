import type { CSSProperties, ReactNode } from "react";

export type BadgeVariant =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "solid"
  | "outline";

export type BadgeSize = "xs" | "sm" | "md" | "lg";

export type BadgeStatus =
  | "default"
  | "processing"
  | "success"
  | "warning"
  | "error";

/* ------------------------------------------------------------------ */
/* Standard inline badge (text label)                                  */
/* ------------------------------------------------------------------ */

export interface BadgeProps {
  children?: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Icon rendered before the text */
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Notification badge (wraps another element with count / dot)         */
/* ------------------------------------------------------------------ */

export interface NotificationBadgeProps {
  /** The element the badge attaches to */
  children?: ReactNode;
  /** Number to display */
  count?: number;
  /** Show as a plain dot instead of a number */
  dot?: boolean;
  /** Maximum before showing overflowCount+. Default 99 */
  overflowCount?: number;
  /** Show badge even when count is 0 */
  showZero?: boolean;
  /** Badge colour. Default "danger" red */
  color?:
    | "danger"
    | "primary"
    | "success"
    | "warning"
    | "neutral"
    | (string & {});
  /** [x, y] offset from the top-right corner */
  offset?: [number, number];
  className?: string;
  style?: CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Status badge (standalone coloured dot + label)                      */
/* ------------------------------------------------------------------ */

export interface StatusBadgeProps {
  status: BadgeStatus;
  /** Optional text label alongside the dot */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Ribbon                                                               */
/* ------------------------------------------------------------------ */

export interface RibbonProps {
  children: ReactNode;
  /** Text shown on the ribbon corner */
  text?: ReactNode;
  /** Ribbon colour variant */
  color?:
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "neutral"
    | (string & {});
  /** Which corner of the parent. Default "end" (top-right) */
  placement?: "start" | "end";
  className?: string;
  style?: CSSProperties;
}
