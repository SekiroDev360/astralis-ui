import { useCallback, useMemo, useState } from "react";
import type { StepsProps } from "../../steps";
import { StepsContext } from "../steps.context";

export function StepsRoot({
  value: controlledValue,
  defaultValue = 0,
  onValueChange,
  orientation = "horizontal",
  size = "default",
  clickable = false,
  children,
  className = "",
}: StepsProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const value = controlledValue ?? uncontrolledValue;

  const setValue = useCallback(
    (next: number) => {
      if (controlledValue === undefined) {
        setUncontrolledValue(next);
      }
      onValueChange?.(next);
    },
    [controlledValue, onValueChange],
  );

  const data = useMemo(
    () => ({
      value,
      setValue,
      orientation,
      size,
      clickable,
    }),
    [value, setValue, orientation, size, clickable],
  );

  return (
    <StepsContext.Provider value={data}>
      <div
        data-orientation={orientation}
        className={[
          "astralis-flex astralis-gap-4",
          orientation === "horizontal"
            ? "astralis-flex-row astralis-items-center"
            : "astralis-flex-col",
          className,
        ].join(" ")}
      >
        {children}
      </div>
    </StepsContext.Provider>
  );
}
