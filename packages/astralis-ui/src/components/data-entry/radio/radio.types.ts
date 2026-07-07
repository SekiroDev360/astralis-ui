import type { ComponentPropsWithoutRef, InputHTMLAttributes, ReactNode } from "react";
import type { ColorScheme } from "../../../const/color-schemes";

export type RadioSize = "sm" | "md" | "lg";

export interface RadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /** Visual size */
  size?: RadioSize;
  /** Hue the selected radio paints with (via the accent channel). @default "brand" */
  colorScheme?: ColorScheme;
  /** Label content */
  children?: ReactNode;
  /** Invalid/error state */
  invalid?: boolean;
  /** Read-only state */
  readOnly?: boolean;
}

export interface RadioGroupProps
  extends Omit<ComponentPropsWithoutRef<"div">, "onChange" | "defaultValue"> {
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
  /** Hue applied to every radio in the group (each can still override). */
  colorScheme?: ColorScheme;
  /** Layout direction */
  orientation?: "horizontal" | "vertical";
  children: ReactNode;
}

export interface RadioGroupContextValue {
  groupValue: string;
  selectValue: (val: string) => void;
  name: string;
  disabled?: boolean;
  colorScheme?: ColorScheme;
}
