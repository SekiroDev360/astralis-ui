import type { Ref } from "react";
import { useFieldContext } from "../../field/field.context";
import { textareaVariants } from "../input.styles";
import type { InputTextareaProps } from "../input.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function InputTextarea({
  size = "md",
  variant = "outline",
  invalid: invalidProp,
  disabled: disabledProp,
  readOnly: readOnlyProp,
  showCount = false,
  maxLength,
  value,
  defaultValue,
  className = "",
  id: idProp,
  rows = 4,
  ref,
  ...props
}: InputTextareaProps & { ref?: Ref<HTMLTextAreaElement> }) {
    const field = useFieldContext();
    const isInvalid = invalidProp ?? field?.invalid;
    const isDisabled = disabledProp ?? field?.disabled;
    const isReadOnly = readOnlyProp ?? field?.readOnly;
    const isRequired = field?.required;
    const id = idProp ?? field?.id;

    const currentLength =
      typeof value === "string"
        ? value.length
        : typeof defaultValue === "string"
          ? defaultValue.length
          : 0;

    return (
      <div className="astralis:flex astralis:flex-col astralis:gap-1">
        <textarea
          ref={ref}
          id={id}
          disabled={isDisabled}
          readOnly={isReadOnly}
          required={isRequired}
          aria-invalid={isInvalid || undefined}
          aria-describedby={field?.describedBy}
          aria-required={isRequired || undefined}
          aria-readonly={isReadOnly || undefined}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          rows={rows}
          className={astralisMerge(textareaVariants({ size, variant, invalid: !!isInvalid }), className)}
          {...props}
        />
        {showCount && (
          <span className="astralis:self-end astralis:text-xs astralis:text-label-subtle astralis:tabular-nums">
            {currentLength}
            {maxLength != null && `/${maxLength}`}
          </span>
        )}
      </div>
    );
}

InputTextarea.displayName = "Input.TextArea";
