import type { CSSProperties, ReactNode } from "react";

export type StatSize = "sm" | "md" | "lg";
export type StatTrendType = "increase" | "decrease" | "neutral";

/* ------------------------------------------------------------------ */
/* Root */
/* ------------------------------------------------------------------ */

export interface StatProps {
  children: ReactNode;
  /** Controls font sizes throughout. Default "md" */
  size?: StatSize;
  className?: string;
  style?: CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Label */
/* ------------------------------------------------------------------ */

export interface StatLabelProps {
  children: ReactNode;
  /** Tooltip shown on the info icon */
  info?: string;
  className?: string;
  style?: CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Value */
/* ------------------------------------------------------------------ */

export interface StatValueProps {
  children: ReactNode;
  /** Rendered before the value (e.g. "$", "€") */
  prefix?: ReactNode;
  /** Rendered after the value (e.g. "%", "ms", "K") */
  suffix?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Help text */
/* ------------------------------------------------------------------ */

export interface StatHelpTextProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Trend (replaces / extends Indicator) */
/* ------------------------------------------------------------------ */

export interface StatTrendProps {
  /** Direction of the trend */
  type: StatTrendType;
  /** The change value to display (e.g. 12.5 → "+12.5%") */
  value?: number;
  /** Pre-formatted string override (overrides value) */
  formatted?: string;
  className?: string;
  style?: CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Indicator (legacy – kept for back-compat) */
/* ------------------------------------------------------------------ */

export interface StatIndicatorProps {
  type?: "increase" | "decrease";
  children?: ReactNode;
}

/* ------------------------------------------------------------------ */
/* Progress */
/* ------------------------------------------------------------------ */

export interface StatProgressProps {
  /** Progress 0–100 */
  value: number;
  colorScheme?: "primary" | "success" | "warning" | "danger" | "neutral";
  className?: string;
  style?: CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Icon */
/* ------------------------------------------------------------------ */

export interface StatIconProps {
  children: ReactNode;
  colorScheme?: "primary" | "success" | "warning" | "danger" | "neutral";
  className?: string;
  style?: CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Countdown */
/* ------------------------------------------------------------------ */

export interface StatCountdownProps {
  /** Target date/time for the countdown */
  targetDate: Date | number;
  /** Called when countdown reaches zero */
  onFinish?: () => void;
  /** Label shown above the countdown */
  label?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
