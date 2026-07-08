import { useEffect, useState } from "react";
import type { ChangeEvent, Ref } from "react";
import { useRadioGroupContext } from "../radio.context";
import { useFieldContext } from "../../field/field.context";
import type { RadioProps } from "../radio.types";
import { radioSizes, radioControl, radioControlColor } from "../radio.styles";
import { astralisMerge } from "../../../../utils/astralis-merge";
import { accentClass } from "../../../../const/color-schemes";

export function RadioBase({
  children,
  size = "md",
  colorScheme,
  invalid: invalidProp,
  disabled: disabledProp,
  checked: checkedProp,
  defaultChecked = false,
  onChange: onChangeProp,
  readOnly: readOnlyProp,
  value,
  name: nameProp,
  className = "",
  ref,
  ...props
}: RadioProps & { ref?: Ref<HTMLInputElement> }) {
    const group = useRadioGroupContext();
    const field = useFieldContext();

    const [localChecked, setLocalChecked] = useState(defaultChecked);
    const isGroupMember = group != null && value != null;
    const isControlled = checkedProp !== undefined;

    const isChecked: boolean = isGroupMember
      ? group.groupValue === String(value)
      : isControlled
        ? checkedProp!
        : localChecked;

    const isDisabled = disabledProp ?? group?.disabled ?? field?.disabled;
    const isInvalid = invalidProp ?? field?.invalid;
    const isReadOnly = readOnlyProp ?? field?.readOnly;
    const name = nameProp ?? group?.name;
    const hue = colorScheme ?? group?.colorScheme ?? "brand";

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (isReadOnly) {
        e.preventDefault();
        return;
      }
      if (isGroupMember) group.selectValue(String(value));
      else if (!isControlled) setLocalChecked(e.target.checked);
      onChangeProp?.(e);
    };

    useEffect(() => {
      if (isControlled) setLocalChecked(checkedProp!);
    }, [isControlled, checkedProp]);

    const sz = radioSizes[size];

    return (
      <label
        className={astralisMerge(
          "astralis:inline-flex astralis:items-center astralis:gap-2",
          accentClass(hue),
          isDisabled
            ? "astralis:cursor-not-allowed astralis:opacity-moderate"
            : isReadOnly
              ? "astralis:cursor-default"
              : "astralis:cursor-pointer",
          className,
        )}
      >
        <input
          ref={ref}
          type="radio"
          name={name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          readOnly={isReadOnly}
          aria-invalid={isInvalid || undefined}
          aria-describedby={field?.describedBy}
          aria-readonly={isReadOnly || undefined}
          onChange={handleChange}
          className="astralis:sr-only astralis:peer"
          {...props}
        />

        <span
          aria-hidden="true"
          className={astralisMerge(sz.circle, radioControl, radioControlColor(isChecked, !!isInvalid))}
        >
          {isChecked && (
            <span aria-hidden="true" className={astralisMerge(sz.dot, "astralis:rounded-full astralis:bg-accent-contrast")} />
          )}
        </span>

        {children && (
          <span className={astralisMerge(sz.label, "astralis:text-label-base astralis:select-none")}>
            {children}
          </span>
        )}
      </label>
    );
}

RadioBase.displayName = "Radio";
