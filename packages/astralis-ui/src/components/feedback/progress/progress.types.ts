import type { ComponentPropsWithoutRef } from "react";
import type { ColorScheme } from "../../../const/color-schemes";

export type ProgressShape = "line" | "circle";
export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Current progress. Omit it entirely for an indeterminate animation
   * (unknown duration).
   */
  value?: number;
  /** The value that counts as 100%. @default 100 */
  max?: number;
  /** Linear bar or circular ring. @default "line" */
  shape?: ProgressShape;
  size?: ProgressSize;
  /** Hue of the filled portion (via the accent channel). @default "brand" */
  colorScheme?: ColorScheme;
  /** Render the percentage as text (beside the bar / inside the ring). */
  showValueLabel?: boolean;
}
