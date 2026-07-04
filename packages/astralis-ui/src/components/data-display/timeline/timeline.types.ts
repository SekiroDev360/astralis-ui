import type { ReactNode } from "react";
import type { ColorScheme } from "../../../const/color-schemes";

export type TimelineSize = "sm" | "md" | "lg";
export type TimelineVariant = "solid" | "subtle" | "outline";

export interface TimelineProps {
  children: ReactNode;
  size?: TimelineSize;
  variant?: TimelineVariant;
  /** Default hue for indicators. @default "brand" */
  colorScheme?: ColorScheme;
  className?: string;
}

export interface TimelineItemProps {
  children: ReactNode;
  className?: string;
}

export interface TimelineIndicatorProps {
  children?: ReactNode;
  /** Override the item's hue (e.g. green for done, red for error). */
  colorScheme?: ColorScheme;
  className?: string;
}

export interface TimelineContentProps {
  children: ReactNode;
  className?: string;
}

export interface TimelineTextProps {
  children: ReactNode;
  className?: string;
}
