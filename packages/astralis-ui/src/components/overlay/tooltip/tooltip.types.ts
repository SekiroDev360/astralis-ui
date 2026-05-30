import type { ReactNode, ReactElement } from "react";

export interface TooltipProps {
  /** Tooltip text or content */
  label?: ReactNode;
  content?: ReactNode;

  /** Position relative to trigger */
  side?: "top" | "right" | "bottom" | "left";

  /** Distance from trigger */
  offset?: number;

  /** Delay before showing (ms) */
  delay?: number;

  children: ReactElement;
}
