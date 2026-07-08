import type { ComponentPropsWithoutRef } from "react";
import type { ColorScheme } from "../../../const/color-schemes";

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface SpinnerProps extends ComponentPropsWithoutRef<"span"> {
  size?: SpinnerSize;
  /** Hue of the spinning arc (via the accent channel). @default "brand" */
  colorScheme?: ColorScheme;
  /**
   * Accessible loading text announced to screen readers (visually hidden).
   * @default "Loading…"
   */
  label?: string;
}
