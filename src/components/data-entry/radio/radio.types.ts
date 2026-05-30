import type { InputHTMLAttributes, ReactNode } from "react";

export type RadioSize = "sm" | "md" | "lg";

export interface RadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /** Visual size */
  size?: RadioSize;
  /** Label content */
  children?: ReactNode;
  /** Invalid/error state */
  invalid?: boolean;
  /** Read-only state */
  readOnly?: boolean;
}

export interface RadioGroupProps {
  /** Controlled selected value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Name attribute applied to all radio inputs in the group */
  name?: string;
  /** Disables all radios in the group */
  disabled?: boolean;
  /** Layout direction */
  orientation?: "horizontal" | "vertical";
  children: ReactNode;
}

export interface RadioGroupContextValue {
  groupValue: string;
  selectValue: (val: string) => void;
  name: string;
  disabled?: boolean;
}
