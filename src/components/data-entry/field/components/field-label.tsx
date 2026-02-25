import { forwardRef } from "react";
import { useFieldContext } from "../field.context";
import type { FieldLabelProps } from "../field.types";

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ children, className = "", ...props }, ref) => {
    const field = useFieldContext();

    return (
      <label
        ref={ref}
        htmlFor={field?.id}
        data-invalid={field?.invalid ? "" : undefined}
        data-disabled={field?.disabled ? "" : undefined}
        className={`astralis-text-sm astralis-font-medium astralis-text-content-primary data-[disabled]:astralis-text-content-disabled astralis-select-none ${className}`}
        {...props}
      >
        {children}
        {field?.required && (
          <span
            aria-hidden="true"
            className="astralis-ml-1 astralis-text-error-500"
          >
            *
          </span>
        )}
      </label>
    );
  },
);

FieldLabel.displayName = "Field.Label";
