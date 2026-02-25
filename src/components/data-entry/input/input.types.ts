import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

export type InputSize = "sm" | "md" | "lg";
export type InputVariant = "outline" | "filled" | "underline" | "unstyled";

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  /** Visual size of the input */
  size?: InputSize;
  /** Visual variant */
  variant?: InputVariant;
  /** Marks the input as invalid. Can also be inherited from Field context */
  invalid?: boolean;
  /** Shows a clear (×) button when the input has a value */
  allowClear?: boolean;
  /** Callback fired when the clear button is clicked */
  onClear?: () => void;
  /** Extra class names */
  className?: string;
}

export interface InputGroupProps {
  /** Icon or element rendered at the start of the input */
  prefix?: ReactNode;
  /** Icon or element rendered at the end of the input */
  suffix?: ReactNode;
  children: ReactNode;
  className?: string;
}

export interface InputPasswordProps extends Omit<InputProps, "type"> {}

export interface InputSearchProps extends Omit<InputProps, "type"> {
  /** Callback fired when the search is submitted (Enter key or button click) */
  onSearch?: (value: string) => void;
  /** Whether to show the search button */
  showSearchButton?: boolean;
}

export interface InputTextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
> {
  /** Visual size */
  size?: InputSize;
  /** Visual variant */
  variant?: InputVariant;
  /** Marks the textarea as invalid */
  invalid?: boolean;
  /** Shows a character counter below the textarea */
  showCount?: boolean;
  /** Extra class names */
  className?: string;
}
