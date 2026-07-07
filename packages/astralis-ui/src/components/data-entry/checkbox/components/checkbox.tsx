import { forwardRef, useEffect, useRef, useState } from "react";
import type { ChangeEvent, RefObject } from "react";
import { useCheckboxGroupContext } from "../checkbox.context";
import { useFieldContext } from "../../field/field.context";
import type { CheckboxProps } from "../checkbox.types";
import { checkboxSizes, checkboxControl, checkboxControlColor } from "../checkbox.styles";
import { astralisMerge } from "../../../../utils/astralis-merge";
import { accentClass } from "../../../../const/color-schemes";
import { CheckIcon, MinusIcon } from "../../../icon/internal-icons";

export const CheckboxBase = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      children,
      size = "md",
      colorScheme,
      indeterminate = false,
      invalid: invalidProp,
      disabled: disabledProp,
      checked: checkedProp,
      defaultChecked = false,
      onChange: onChangeProp,
      readOnly: readOnlyProp,
      value,
      className = "",
      id,
      ...props
    },
    ref,
  ) => {
    const group = useCheckboxGroupContext();
    const field = useFieldContext();

    const [localChecked, setLocalChecked] = useState(defaultChecked);
    const isGroupMember = group != null && value != null;
    const isControlled = checkedProp !== undefined;

    const isChecked: boolean = isGroupMember
      ? group.groupValue.includes(String(value))
      : isControlled
        ? checkedProp!
        : localChecked;

    const isDisabled = disabledProp ?? group?.disabled ?? field?.disabled;
    const isInvalid = invalidProp ?? field?.invalid;
    const isReadOnly = readOnlyProp ?? field?.readOnly;
    const hue = colorScheme ?? group?.colorScheme ?? "brand";

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (isReadOnly) {
        e.preventDefault();
        return;
      }
      if (isGroupMember) group.toggleValue(String(value));
      else if (!isControlled) setLocalChecked(e.target.checked);
      onChangeProp?.(e);
    };

    useEffect(() => {
      if (isControlled) setLocalChecked(checkedProp!);
    }, [isControlled, checkedProp]);

    const innerRef = useRef<HTMLInputElement>(null);
    const resolvedRef = (ref ?? innerRef) as RefObject<HTMLInputElement>;
    useEffect(() => {
      if (resolvedRef.current) resolvedRef.current.indeterminate = indeterminate;
    }, [indeterminate, resolvedRef]);

    const sz = checkboxSizes[size];
    const active = isChecked || indeterminate;

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
          ref={resolvedRef}
          type="checkbox"
          id={id}
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
          className={astralisMerge(sz.box, checkboxControl, checkboxControlColor(active, !!isInvalid))}
        >
          {indeterminate ? (
            <MinusIcon className={astralisMerge(sz.icon, "astralis:text-accent-contrast")} />
          ) : isChecked ? (
            <CheckIcon className={astralisMerge(sz.icon, "astralis:text-accent-contrast")} />
          ) : null}
        </span>

        {children && (
          <span className={astralisMerge(sz.label, "astralis:text-label-base astralis:select-none")}>
            {children}
          </span>
        )}
      </label>
    );
  },
);

CheckboxBase.displayName = "Checkbox";
