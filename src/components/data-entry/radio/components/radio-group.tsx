import { useId, useState } from "react";
import RadioGroupContext from "../radio.context";
import type { RadioGroupProps } from "../radio.types";

export function RadioGroup({
  value,
  defaultValue = "",
  onChange,
  name: nameProp,
  disabled,
  orientation = "vertical",
  children,
}: RadioGroupProps) {
  const generatedName = useId();
  const name = nameProp ?? generatedName;

  const [internalValue, setInternalValue] = useState<string>(defaultValue);
  const groupValue = value ?? internalValue;

  const selectValue = (val: string) => {
    setInternalValue(val);
    onChange?.(val);
  };

  return (
    <RadioGroupContext.Provider
      value={{ groupValue, selectValue, name, disabled }}
    >
      <div
        role="radiogroup"
        className={[
          "astralis-flex",
          orientation === "horizontal"
            ? "astralis-flex-row astralis-flex-wrap astralis-gap-x-6 astralis-gap-y-2"
            : "astralis-flex-col astralis-gap-2.5",
        ].join(" ")}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}
