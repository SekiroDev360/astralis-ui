import { useEffect, useState } from "react";
import type { ChangeEvent, Ref } from "react";
import { useFieldContext } from "../../field/field.context";
import type { SwitchProps } from "../switch.types";
import { switchSizes, switchTrack, switchTrackColor } from "../switch.styles";
import { astralisMerge } from "../../../../utils/astralis-merge";
import { accentClass } from "../../../../const/color-schemes";

export function SwitchBase({
  size = "md",
  children,
  colorScheme = "brand",
  invalid: invalidProp,
  disabled: disabledProp,
  checked: checkedProp,
  defaultChecked = false,
  onChange: onChangeProp,
  readOnly: readOnlyProp,
  className = "",
  id: idProp,
  ref,
  ...props
}: SwitchProps & { ref?: Ref<HTMLInputElement> }) {
    const field = useFieldContext();

    const [localChecked, setLocalChecked] = useState(defaultChecked);
    const isControlled = checkedProp !== undefined;
    const isChecked = isControlled ? checkedProp! : localChecked;

    const isDisabled = disabledProp ?? field?.disabled;
    const isInvalid = invalidProp ?? field?.invalid;
    const isReadOnly = readOnlyProp ?? field?.readOnly;
    const id = idProp ?? field?.id;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (isReadOnly) {
        e.preventDefault();
        return;
      }
      if (!isControlled) setLocalChecked(e.target.checked);
      onChangeProp?.(e);
    };

    useEffect(() => {
      if (isControlled) setLocalChecked(checkedProp!);
    }, [isControlled, checkedProp]);

    const sz = switchSizes[size];

    return (
      <label
        className={astralisMerge(
          "astralis:inline-flex astralis:items-center astralis:gap-2.5",
          accentClass(colorScheme),
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
          type="checkbox"
          role="switch"
          id={id}
          checked={isChecked}
          disabled={isDisabled}
          readOnly={isReadOnly}
          aria-invalid={isInvalid || undefined}
          aria-describedby={field?.describedBy}
          aria-readonly={isReadOnly || undefined}
          aria-checked={isChecked}
          onChange={handleChange}
          className="astralis:sr-only astralis:peer"
          {...props}
        />

        <span aria-hidden="true" className={astralisMerge(sz.track, switchTrack, switchTrackColor(isChecked, !!isInvalid))}>
          <span
            aria-hidden="true"
            className={astralisMerge(
              sz.thumb,
              // Deliberately white in BOTH themes (Chakra/Material convention):
              // a theme-following thumb would go dark on the dark off-track and
              // vanish. `bg-white` resolves var(--astralis-color-white), so it
              // stays themable at the primitive layer.
              "astralis:rounded-full astralis:bg-white astralis:shadow-sm astralis:transition-transform",
              isChecked ? sz.on : "astralis:translate-x-0",
            )}
          />
        </span>

        {children && (
          <span className={astralisMerge(sz.label, "astralis:text-label-base astralis:select-none")}>
            {children}
          </span>
        )}
      </label>
    );
}

SwitchBase.displayName = "Switch";
