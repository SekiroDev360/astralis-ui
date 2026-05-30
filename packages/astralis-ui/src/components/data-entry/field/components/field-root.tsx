import { useId } from "react";
import FieldContext from "../field.context";
import type { FieldRootProps } from "../field.types";

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
    <FieldContext.Provider
      value={{ id, invalid, disabled, required, readOnly }}
    >
      <div
        data-invalid={invalid ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
        className={`astralis-flex astralis-flex-col astralis-gap-1.5 ${className}`}
        {...props}
      >
        {children}
      </div>
    </FieldContext.Provider>
  );
}
