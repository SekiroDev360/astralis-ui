import { useCallback, useState } from "react";
import { TabsContext } from "../tabs.context";
import type { TabsProps } from "../tabs.types";

export function TabsRoot({
  value: controlledValue,
  defaultValue,
  onValueChange,
  children,
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] =
    useState(defaultValue);

  const value = controlledValue ?? uncontrolledValue;

  const setValue = useCallback(
    (next: string) => {
      if (controlledValue === undefined) {
        setUncontrolledValue(next);
      }
      onValueChange?.(next);
    },
    [controlledValue, onValueChange]
  );

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className="astralis-flex astralis-flex-col astralis-gap-4">
        {children}
      </div>
    </TabsContext.Provider>
  );
}
