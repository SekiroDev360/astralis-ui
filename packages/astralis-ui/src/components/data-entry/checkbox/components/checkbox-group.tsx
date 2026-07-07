import { useState } from "react";
import CheckboxGroupContext from "../checkbox.context";
import type { CheckboxGroupProps } from "../checkbox.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function CheckboxGroup({
  value,
  defaultValue = [],
  onChange,
  disabled,
  colorScheme,
  orientation = "vertical",
  children,
  className,
  ...rest
}: CheckboxGroupProps) {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const groupValue = value ?? internalValue;

  const toggleValue = (val: string) => {
    const next = groupValue.includes(val)
      ? groupValue.filter((v) => v !== val)
      : [...groupValue, val];
    setInternalValue(next);
    onChange?.(next);
  };

  return (
    <CheckboxGroupContext.Provider value={{ groupValue, toggleValue, disabled, colorScheme }}>
      <div
        role="group"
        className={astralisMerge(
          "astralis:flex",
          orientation === "horizontal"
            ? "astralis:flex-row astralis:flex-wrap astralis:gap-x-6 astralis:gap-y-2"
            : "astralis:flex-col astralis:gap-2.5",
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
}

CheckboxGroup.displayName = "Checkbox.Group";
