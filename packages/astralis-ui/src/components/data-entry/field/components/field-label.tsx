import { forwardRef } from "react";
import { useFieldContext } from "../field.context";
import type { FieldLabelProps } from "../field.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ children, className = "", ...props }, ref) => {
    const field = useFieldContext();

    return (
      <label
        ref={ref}
        htmlFor={field?.id}
        data-invalid={field?.invalid ? "" : undefined}
        data-disabled={field?.disabled ? "" : undefined}
        className={astralisMerge(
          "astralis:text-sm astralis:font-medium astralis:select-none",
          field?.disabled ? "astralis:text-label-subtle" : "astralis:text-label-base",
          className,
        )}
        {...props}
      >
        {children}
        {field?.required && (
          <span aria-hidden="true" className="astralis:ml-0.5 astralis:text-label-error">
            *
          </span>
        )}
      </label>
    );
  },
);

FieldLabel.displayName = "Field.Label";
