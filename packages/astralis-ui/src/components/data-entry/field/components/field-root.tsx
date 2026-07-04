import { useId } from "react";
import FieldContext from "../field.context";
import type { FieldRootProps } from "../field.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

/**
 * Groups a control with its label, help text, and error text — sharing state
 * (id, invalid, disabled, required, readOnly) with descendants via context.
 */
export function FieldRoot({
  children,
  invalid,
  disabled,
  required,
  readOnly,
  id: userProvidedId,
  className = "",
  ...props
}: FieldRootProps) {
  const generatedId = useId();
  const id = userProvidedId ?? generatedId;

  return (
    <FieldContext.Provider value={{ id, invalid, disabled, required, readOnly }}>
      <div
        data-invalid={invalid ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
        className={astralisMerge("astralis:flex astralis:flex-col astralis:gap-1.5", className)}
        {...props}
      >
        {children}
      </div>
    </FieldContext.Provider>
  );
}

FieldRoot.displayName = "Field";
