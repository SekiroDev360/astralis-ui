import { forwardRef, useEffect, useState } from "react";
import { useRadioGroupContext } from "../radio.context";
import { useFieldContext } from "../../field/field.context";
import type { RadioProps, RadioSize } from "../radio.types";

const sizeClasses: Record<
  RadioSize,
  { circle: string; dot: string; label: string }
> = {
  sm: {
    circle: "astralis-h-3.5 astralis-w-3.5",
    dot: "astralis-h-1.5 astralis-w-1.5",
    label: "astralis-text-xs",
  },
  md: {
    circle: "astralis-h-4 astralis-w-4",
    dot: "astralis-h-2 astralis-w-2",
    label: "astralis-text-sm",
  },
  lg: {
    circle: "astralis-h-5 astralis-w-5",
    dot: "astralis-h-2.5 astralis-w-2.5",
    label: "astralis-text-base",
  },
};

export const RadioBase = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      children,
      size = "md",
      invalid: invalidProp,
      disabled: disabledProp,
      checked: checkedProp,
      defaultChecked = false,
      onChange: onChangeProp,
      readOnly: readOnlyProp,
      value,
      name: nameProp,
      className = "",
      ...props
    },
    ref,
  ) => {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isReadOnly) {
        e.preventDefault();
        return;
      }
      if (isGroupMember) {
        group.selectValue(String(value));
      } else if (!isControlled) {
        setLocalChecked(e.target.checked);
      }
      onChangeProp?.(e);
    };

    useEffect(() => {
      if (isControlled) setLocalChecked(checkedProp!);
    }, [isControlled, checkedProp]);

    const sz = sizeClasses[size];

    return (
      <label
        className={[
          "astralis-inline-flex astralis-items-center astralis-gap-2",
          isDisabled
            ? "astralis-cursor-not-allowed astralis-opacity-50"
            : isReadOnly
              ? "astralis-cursor-default"
              : "astralis-cursor-pointer",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
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
          aria-readonly={isReadOnly || undefined}
          onChange={handleChange}
          className="astralis-sr-only astralis-peer"
          {...props}
        />

        <span
          aria-hidden="true"
          className={[
            sz.circle,
            "astralis-shrink-0 astralis-rounded-full astralis-border astralis-transition-all astralis-duration-150",
            "astralis-flex astralis-items-center astralis-justify-center",
            "astralis-peer-focus-visible:astralis-ring-2 astralis-peer-focus-visible:astralis-ring-primary-200 astralis-peer-focus-visible:astralis-ring-offset-2 dark:astralis-peer-focus-visible:astralis-ring-offset-zinc-950",
            isChecked
              ? isInvalid
                ? "astralis-border-error-600 astralis-bg-error-600"
                : "astralis-border-primary-600 astralis-bg-primary-600"
              : isInvalid
                ? "astralis-border-error-500 astralis-bg-surface-base"
                : "astralis-border-stroke-strong astralis-bg-surface-base",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {isChecked && (
            <span
              aria-hidden="true"
              className={`${sz.dot} astralis-rounded-full astralis-bg-white`}
            />
          )}
        </span>

        {children && (
          <span
            className={`${sz.label} astralis-text-content-primary astralis-select-none`}
          >
            {children}
          </span>
        )}
      </label>
    );
  },
);

RadioBase.displayName = "Radio";
