import type { Ref } from "react";
import { useFieldContext } from "../../field/field.context";
import { useInputGroupContext } from "../input.context";
import { inputVariants } from "../input.styles";
import type { InputProps } from "../input.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function InputBase({
  size = "md",
  variant = "outline",
  invalid: invalidProp,
  disabled: disabledProp,
  readOnly: readOnlyProp,
  className = "",
  id: idProp,
  ref,
  ...props
}: InputProps & { ref?: Ref<HTMLInputElement> }) {
    const field = useFieldContext();
    const group = useInputGroupContext();

    const isInvalid = invalidProp ?? field?.invalid;
    const isDisabled = disabledProp ?? field?.disabled;
    const isReadOnly = readOnlyProp ?? field?.readOnly;
    const isRequired = field?.required;
    const id = idProp ?? field?.id;

    return (
      <input
        ref={ref}
        id={id}
        disabled={isDisabled}
        readOnly={isReadOnly}
        required={isRequired}
        aria-invalid={isInvalid || undefined}
        aria-describedby={field?.describedBy}
        aria-required={isRequired || undefined}
        aria-readonly={isReadOnly || undefined}
        className={astralisMerge(
          inputVariants({ size, variant, invalid: !!isInvalid }),
          group.hasPrefix && "astralis:pl-9",
          group.hasSuffix && "astralis:pr-9",
          className,
        )}
        {...props}
      />
    );
}

InputBase.displayName = "Input";
