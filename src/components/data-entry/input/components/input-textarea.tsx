import { forwardRef } from "react";
import { useFieldContext } from "../../field/field.context";
import type {
  InputTextareaProps,
  InputSize,
  InputVariant,
} from "../input.types";

const sizeClasses: Record<InputSize, string> = {
  sm: "astralis-px-3 astralis-py-1.5 astralis-text-xs",
  md: "astralis-px-3 astralis-py-2 astralis-text-sm",
  lg: "astralis-px-4 astralis-py-3 astralis-text-base",
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
    "astralis-border-0 astralis-border-b-2 astralis-border-border-subtle astralis-bg-transparent astralis-rounded-none " +
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

export const InputTextarea = forwardRef<
  HTMLTextAreaElement,
  InputTextareaProps
>(
  (
    {
      size = "md",
      variant = "outline",
      invalid: invalidProp,
      disabled: disabledProp,
      showCount = false,
      maxLength,
      value,
      defaultValue,
      className = "",
      id: idProp,
      ...props
    },
    ref,
  ) => {
    const field = useFieldContext();
    const isInvalid = invalidProp ?? field?.invalid;
    const isDisabled = disabledProp ?? field?.disabled;
    const isRequired = field?.required;
    const id = idProp ?? field?.id;

    const currentLength =
      typeof value === "string"
        ? value.length
        : typeof defaultValue === "string"
          ? defaultValue.length
          : 0;

    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-1">
        <textarea
          ref={ref}
          id={id}
          disabled={isDisabled}
          required={isRequired}
          aria-invalid={isInvalid || undefined}
          aria-required={isRequired || undefined}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          rows={4}
          className={[
            "astralis-w-full astralis-font-normal astralis-text-content-primary astralis-resize-y",
            "astralis-transition-colors astralis-duration-150",
            "placeholder:astralis-text-content-tertiary",
            "disabled:astralis-cursor-not-allowed disabled:astralis-opacity-50 disabled:astralis-bg-surface-raised",
            sizeClasses[size],
            variantClasses[variant],
            isInvalid ? invalidClasses[variant] : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
        {showCount && (
          <span className="astralis-self-end astralis-text-xs astralis-text-content-tertiary">
            {currentLength}
            {maxLength != null && `/${maxLength}`}
          </span>
        )}
      </div>
    );
  },
);

InputTextarea.displayName = "Input.TextArea";
