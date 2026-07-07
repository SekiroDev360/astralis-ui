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
  /** Stable id Field.HelpText renders with (`{id}-help`) */
  helpTextId: string;
  /** Stable id Field.ErrorText renders with (`{id}-error`) */
  errorTextId: string;
  /**
   * Space-separated ids of the help/error text currently rendered — inputs
   * pass this straight to aria-describedby so screen readers announce the
   * descriptions together with the control. Undefined when neither part is
   * mounted.
   */
  describedBy?: string;
  /** Registration hooks called by HelpText/ErrorText on mount/unmount. */
  setHasHelpText: (present: boolean) => void;
  setHasErrorText: (present: boolean) => void;
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
