import type { HTMLAttributes, ReactNode } from "react";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Layout orientation. Default: `"horizontal"` */
  orientation?: "horizontal" | "vertical";
  /** Optional centred label text or node */
  label?: ReactNode;
  /** Border style. Default: `"solid"` */
  variant?: "solid" | "dashed" | "dotted";
}
