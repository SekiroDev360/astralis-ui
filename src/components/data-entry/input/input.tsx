import { forwardRef } from "react";
import { useFieldContext } from "../field/field.context";
import { useInputGroupContext } from "./input-group.context";
import type { InputProps, InputSize, InputVariant } from "./input.types";

const sizeClasses: Record<InputSize, string> = {
  sm: "astralis-h-8 astralis-px-3 astralis-text-xs",
  md: "astralis-h-10 astralis-px-3 astralis-text-sm",
  lg: "astralis-h-12 astralis-px-4 astralis-text-base",
};

const variantClasses: Record<InputVariant, string> = {
  outline:
    "astralis-border astralis-border-border-subtle astralis-bg-surface-base astralis-rounded-lg " +
    "hover:astralis-border-border-strong " +
    "focus:astralis-outline-none focus:astralis-border-primary-500 focus:astralis-ring-2 focus:astralis-ring-primary-200",
  filled:
    "astralis-border astralis-border-transparent astralis-bg-surface-raised astralis-rounded-lg " +
    "hover:astralis-bg-surface-overlay " +
    "focus:astralis-outline-none focus:astralis-bg-surface-base focus:astralis-border-primary-500 focus:astralis-ring-2 focus:astralis-ring-primary-200",
  underline:
    "astralis-border-0 astralis-border-b-2 astralis-border-border-subtle astralis-bg-transparent astralis-rounded-none astralis-px-0 " +
    "hover:astralis-border-border-strong " +
    "focus:astralis-outline-none focus:astralis-border-primary-500",
  unstyled:
    "astralis-border-0 astralis-bg-transparent astralis-rounded-none focus:astralis-outline-none",
};

const invalidClasses: Record<InputVariant, string> = {
  outline:
    "astralis-border-error-500 hover:astralis-border-error-500 focus:astralis-border-error-500 focus:astralis-ring-error-200",
  filled:
    "astralis-border-error-500 hover:astralis-border-error-500 focus:astralis-border-error-500 focus:astralis-ring-error-200",
  underline:
    "astralis-border-error-500 hover:astralis-border-error-500 focus:astralis-border-error-500",
  unstyled: "",
};

export const InputBase = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "md",
      variant = "outline",
      invalid: invalidProp,
      disabled: disabledProp,
      className = "",
      id: idProp,
      ...props
    },
    ref,
  ) => {
    // Merge own props with Field context (own props take precedence)
    const field = useFieldContext();
    const group = useInputGroupContext();

    const isInvalid = invalidProp ?? field?.invalid;
    const isDisabled = disabledProp ?? field?.disabled;
    const isRequired = field?.required;
    const id = idProp ?? field?.id;

    // When inside an InputGroup, add side padding to make room for prefix/suffix icons
    const prefixPadding = group.hasPrefix ? "astralis-pl-9" : "";
    const suffixPadding = group.hasSuffix ? "astralis-pr-9" : "";

    return (
      <input
        ref={ref}
        id={id}
        disabled={isDisabled}
        required={isRequired}
        aria-invalid={isInvalid || undefined}
        aria-required={isRequired || undefined}
        className={[
          "astralis-w-full astralis-font-normal astralis-text-content-primary",
          "astralis-transition-colors astralis-duration-150",
          "placeholder:astralis-text-content-tertiary",
          "disabled:astralis-cursor-not-allowed disabled:astralis-opacity-50 disabled:astralis-bg-surface-raised",
          sizeClasses[size],
          prefixPadding,
          suffixPadding,
          variantClasses[variant],
          isInvalid ? invalidClasses[variant] : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  },
);

InputBase.displayName = "Input";
