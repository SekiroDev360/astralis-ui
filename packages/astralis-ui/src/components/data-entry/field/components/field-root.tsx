import { useId, useMemo, useState } from "react";
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

  // HelpText/ErrorText report their presence so inputs can point
  // aria-describedby at only the ids that actually exist in the DOM.
  const [hasHelpText, setHasHelpText] = useState(false);
  const [hasErrorText, setHasErrorText] = useState(false);
  const helpTextId = `${id}-help`;
  const errorTextId = `${id}-error`;

  const ctx = useMemo(() => {
    const describedBy =
      [hasErrorText ? errorTextId : null, hasHelpText ? helpTextId : null]
        .filter(Boolean)
        .join(" ") || undefined;
    return {
      id, invalid, disabled, required, readOnly,
      helpTextId, errorTextId, describedBy,
      setHasHelpText, setHasErrorText,
    };
  }, [id, invalid, disabled, required, readOnly, helpTextId, errorTextId, hasHelpText, hasErrorText]);

  return (
    <FieldContext.Provider value={ctx}>
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
