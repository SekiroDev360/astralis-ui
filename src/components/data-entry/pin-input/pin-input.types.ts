export type PinInputType = "numeric" | "alphanumeric" | "alpha";
export type PinInputSize = "sm" | "md" | "lg";
export type PinInputVariant = "outline" | "filled";

export interface PinInputProps {
  /** Number of individual boxes (default 4) */
  length?: number;
  /** Controlled value — the full combined string */
  value?: string;
  /** Default value for uncontrolled usage */
  defaultValue?: string;
  /** Fires whenever any box changes; receives the full combined string */
  onChange?: (value: string) => void;
  /** Fires when every box has been filled */
  onComplete?: (value: string) => void;
  /** Character type validation */
  type?: PinInputType;
  /** Masks characters like a password field */
  mask?: boolean;
  size?: PinInputSize;
  variant?: PinInputVariant;
  disabled?: boolean;
  invalid?: boolean;
  /** Placeholder character shown in empty boxes */
  placeholder?: string;
  /** Auto-focus the first box on mount */
  autoFocus?: boolean;
  className?: string;
  id?: string;
}
