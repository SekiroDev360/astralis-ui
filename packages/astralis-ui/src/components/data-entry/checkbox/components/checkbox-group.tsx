import { useState } from "react";
import CheckboxGroupContext from "../checkbox.context";
import type { CheckboxGroupProps } from "../checkbox.types";

export function CheckboxGroup({
  value,
  defaultValue = [],
  onChange,
  disabled,
  orientation = "vertical",
  children,
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
    <CheckboxGroupContext.Provider
      value={{ groupValue, toggleValue, disabled }}
    >
      <div
        role="group"
        className={[
          "astralis-flex",
          orientation === "horizontal"
            ? "astralis-flex-row astralis-flex-wrap astralis-gap-x-6 astralis-gap-y-2"
            : "astralis-flex-col astralis-gap-2.5",
        ].join(" ")}
      >
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
}
