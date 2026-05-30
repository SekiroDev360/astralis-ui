import type { InputHTMLAttributes, ReactNode } from "react";

export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /** Visual size of the toggle */
  size?: SwitchSize;
  /** Label rendered beside the switch */
  children?: ReactNode;
  /** Marks the switch as invalid */
  invalid?: boolean;
  /** Read-only state */
  readOnly?: boolean;
}
