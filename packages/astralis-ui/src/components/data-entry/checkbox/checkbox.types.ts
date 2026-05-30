import type { InputHTMLAttributes, ReactNode } from "react";

export type CheckboxSize = "sm" | "md" | "lg";

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /** Whether the checkbox is checked (controlled) */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Visual size */
  size?: CheckboxSize;
  /** Indeterminate state — visually shows a dash instead of check */
  indeterminate?: boolean;
  /** Label content rendered next to the checkbox */
  children?: ReactNode;
  /** Invalid/error state */
  invalid?: boolean;
  /** Read-only state */
  readOnly?: boolean;
}

export interface CheckboxGroupProps {
  /** Controlled selected values */
  value?: string[];
  /** Default selected values (uncontrolled) */
  defaultValue?: string[];
  /** Callback fired when selection changes */
  onChange?: (value: string[]) => void;
  /** Disables all checkboxes in the group */
  disabled?: boolean;
  /** Layout direction */
  orientation?: "horizontal" | "vertical";
  children: ReactNode;
}

export interface CheckboxGroupContextValue {
  groupValue: string[];
  toggleValue: (val: string) => void;
  disabled?: boolean;
}
