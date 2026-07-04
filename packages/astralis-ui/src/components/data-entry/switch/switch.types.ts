import type { InputHTMLAttributes, ReactNode } from "react";
import type { ColorScheme } from "../../../const/color-schemes";

export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /** Visual size of the toggle */
  size?: SwitchSize;
  /** Hue the "on" track paints with (via the accent channel). @default "brand" */
  colorScheme?: ColorScheme;
  /** Label rendered beside the switch */
  children?: ReactNode;
  /** Marks the switch as invalid */
  invalid?: boolean;
  /** Read-only state */
  readOnly?: boolean;
}
