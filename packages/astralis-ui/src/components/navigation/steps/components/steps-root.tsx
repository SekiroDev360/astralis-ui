import { useCallback, useState } from "react";
import { StepsContext } from "../steps.context";
import type { StepsProps } from "../steps.types";

export function StepsRoot({
  value: controlledValue,
  defaultValue = 0,
  onValueChange,
  orientation = "horizontal",
  variant = "solid",
  size = "md",
  linear = false,
  alternativeLabel = false,
  count: propCount,
  children,
}: StepsProps) {
  const [uncontrolledValue, setUncontrolledValue] =
    useState(defaultValue);

  const value = controlledValue ?? uncontrolledValue;

  const [count, setCount] = useState(propCount ?? 0);

  const setValue = useCallback(
    (next: number) => {
      // Linear mode restriction check
      if (linear && next > value + 1) {
        return; // Can't skip steps in linear mode
      }
      
      if (controlledValue === undefined) {
        setUncontrolledValue(next);
      }
      onValueChange?.(next);
    },
    [controlledValue, onValueChange, linear, value]
  );

  return (
    <StepsContext.Provider
      value={{
        value,
        setValue,
        orientation,
        variant,
        size,
        linear,
        alternativeLabel,
        count,
        setCount,
      }}
    >
      <div
        data-orientation={orientation}
        data-variant={variant}
        data-size={size}
        className={[
          "astralis-flex astralis-gap-6",
          orientation === "horizontal"
            ? "astralis-flex-col astralis-w-full"
            : "astralis-flex-col astralis-items-start",
        ].join(" ")}
      >
        {children}
      </div>
    </StepsContext.Provider>
  );
}
