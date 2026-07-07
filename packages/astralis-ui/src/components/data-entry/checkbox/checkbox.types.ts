import type { ComponentPropsWithoutRef, InputHTMLAttributes, ReactNode } from "react";
import type { ColorScheme } from "../../../const/color-schemes";

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
  /** Hue the checked box paints with (via the accent channel). @default "brand" */
  colorScheme?: ColorScheme;
  /** Indeterminate state — visually shows a dash instead of check */
  indeterminate?: boolean;
  /** Label content rendered next to the checkbox */
  children?: ReactNode;
  /** Invalid/error state */
  invalid?: boolean;
  /** Read-only state */
  readOnly?: boolean;
}

export interface CheckboxGroupProps
  extends Omit<ComponentPropsWithoutRef<"div">, "onChange" | "defaultValue"> {
  /** Controlled selected values */
  value?: string[];
  /** Default selected values (uncontrolled) */
  defaultValue?: string[];
  /** Callback fired when selection changes */
  onChange?: (value: string[]) => void;
  /** Disables all checkboxes in the group */
  disabled?: boolean;
  /** Hue applied to every checkbox in the group (each can still override). */
  colorScheme?: ColorScheme;
  /** Layout direction */
  orientation?: "horizontal" | "vertical";
  children: ReactNode;
}

export interface CheckboxGroupContextValue {
  groupValue: string[];
  toggleValue: (val: string) => void;
  disabled?: boolean;
  colorScheme?: ColorScheme;
}
