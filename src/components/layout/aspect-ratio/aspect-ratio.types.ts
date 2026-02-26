import type { HTMLAttributes, ReactNode } from "react";

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Desired ratio expressed as a number, e.g. `16/9`, `4/3`, `1`.
   * Default: `1` (square)
   */
  ratio?: number;
  children?: ReactNode;
}
