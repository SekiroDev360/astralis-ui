import type { HTMLAttributes, LabelHTMLAttributes } from "react";

export interface FieldContextValue {
  /** Auto-generated or user-provided id wired to the input */
  id: string;
  /** Whether the field is in an invalid/error state */
  invalid?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is read-only */
  readOnly?: boolean;
}

export interface FieldRootProps extends HTMLAttributes<HTMLDivElement> {
  /** Marks the field as invalid — turns border red, shows error text */
  invalid?: boolean;
  /** Disables the entire field and its children */
  disabled?: boolean;
  /** Marks the field as required — shows * in label */
  required?: boolean;
  /** Marks the field as read-only */
  readOnly?: boolean;
  /** Explicit id for the input; auto-generated if not provided */
  id?: string;
}

export interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export interface FieldHelpTextProps extends HTMLAttributes<HTMLParagraphElement> {}

export interface FieldErrorTextProps extends HTMLAttributes<HTMLParagraphElement> {}
