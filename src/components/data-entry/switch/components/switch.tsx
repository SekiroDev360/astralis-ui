import { forwardRef, useEffect, useState } from "react";
import { useFieldContext } from "../../field/field.context";
import type { SwitchProps, SwitchSize } from "../switch.types";

const sizeMap: Record<
  SwitchSize,
  {
    track: string;
    thumb: string;
    thumbOn: string;
    thumbOff: string;
    label: string;
  }
> = {
  sm: {
    track: "astralis-h-4 astralis-w-7",
    thumb: "astralis-h-3 astralis-w-3",
    thumbOn: "astralis-translate-x-3.5",
    thumbOff: "astralis-translate-x-0.5",
    label: "astralis-text-xs",
  },
  md: {
    track: "astralis-h-5 astralis-w-9",
    thumb: "astralis-h-3.5 astralis-w-3.5",
    thumbOn: "astralis-translate-x-4",
    thumbOff: "astralis-translate-x-0.5",
    label: "astralis-text-sm",
  },
  lg: {
    track: "astralis-h-6 astralis-w-11",
    thumb: "astralis-h-5 astralis-w-5",
    thumbOn: "astralis-translate-x-5",
    thumbOff: "astralis-translate-x-0.5",
    label: "astralis-text-base",
  },
};

export const SwitchBase = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      size = "md",
      children,
      invalid: invalidProp,
      disabled: disabledProp,
      checked: checkedProp,
      defaultChecked = false,
      onChange: onChangeProp,
      className = "",
      id: idProp,
      ...props
    },
    ref,
  ) => {
    const field = useFieldContext();

    // Uncontrolled / controlled state — same proven pattern as Checkbox/Radio
    const [localChecked, setLocalChecked] = useState(defaultChecked);
    const isControlled = checkedProp !== undefined;
    const isChecked = isControlled ? checkedProp! : localChecked;

    const isDisabled = disabledProp ?? field?.disabled;
    const isInvalid = invalidProp ?? field?.invalid;
    const id = idProp ?? field?.id;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setLocalChecked(e.target.checked);
      onChangeProp?.(e);
    };

    useEffect(() => {
      if (isControlled) setLocalChecked(checkedProp!);
    }, [isControlled, checkedProp]);

    const sz = sizeMap[size];

    return (
      <label
        className={[
          "astralis-inline-flex astralis-items-center astralis-gap-2.5 astralis-cursor-pointer",
          isDisabled ? "astralis-cursor-not-allowed astralis-opacity-50" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* Hidden native input */}
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={id}
          checked={isChecked}
          disabled={isDisabled}
          aria-invalid={isInvalid || undefined}
          aria-checked={isChecked}
          onChange={handleChange}
          className="astralis-sr-only"
          {...props}
        />

        {/* Track */}
        <span
          aria-hidden="true"
          className={[
            sz.track,
            "astralis-relative astralis-inline-flex astralis-shrink-0 astralis-rounded-full",
            "astralis-transition-colors astralis-duration-200",
            isChecked
              ? isInvalid
                ? "astralis-bg-error-500"
                : "astralis-bg-primary-600"
              : isInvalid
                ? "astralis-bg-error-200"
                : "astralis-bg-surface-raised border astralis-border-border-strong",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {/* Thumb */}
          <span
            aria-hidden="true"
            className={[
              sz.thumb,
              "astralis-absolute astralis-top-1/2 -astralis-translate-y-1/2",
              "astralis-rounded-full astralis-bg-white",
              "astralis-shadow-sm astralis-transition-transform astralis-duration-200",
              isChecked ? sz.thumbOn : sz.thumbOff,
            ].join(" ")}
          />
        </span>

        {/* Label */}
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

SwitchBase.displayName = "Switch";
