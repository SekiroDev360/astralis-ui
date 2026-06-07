import { useCallback, useState } from "react";
import { StepsContext } from "../steps.context";
import type { StepsProps } from "../steps.types";

export function StepsRoot({
  value: controlledValue,
  defaultValue = 0,
  onValueChange,
  orientation = "horizontal",
  children,
}: StepsProps) {
  const [uncontrolledValue, setUncontrolledValue] =
    useState(defaultValue);

  const value = controlledValue ?? uncontrolledValue;

  const setValue = useCallback(
    (next: number) => {
      if (controlledValue === undefined) {
        setUncontrolledValue(next);
      }
      onValueChange?.(next);
    },
    [controlledValue, onValueChange]
  );

  return (
    <StepsContext.Provider value={{ value, setValue, orientation }}>
      <div
        data-orientation={orientation}
        className={[
          "astralis-flex",
          orientation === "horizontal"
            ? "astralis-flex-row"
            : "astralis-flex-col",
        ].join(" ")}
      >
        {children}
      </div>
    </StepsContext.Provider>
  );
}
