import type { ComponentPropsWithoutRef } from "react";
import type { InputSize, InputVariant } from "../input/input.types";

export interface NumberInputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "size" | "value" | "defaultValue" | "onChange" | "min" | "max" | "step"> {
  /** Controlled numeric value; `null` = empty. */
  value?: number | null;
  defaultValue?: number | null;
  /** Fires with the parsed (and clamped) number, or `null` when cleared. */
  onChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  /** Increment applied by the steppers and arrow keys. @default 1 */
  step?: number;
  /** Round committed values to this many decimal places. */
  precision?: number;
  size?: InputSize;
  variant?: InputVariant;
  invalid?: boolean;
  /** Hide the increment/decrement buttons. */
  hideSteppers?: boolean;
}
