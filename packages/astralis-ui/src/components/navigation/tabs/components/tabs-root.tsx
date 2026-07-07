import { useCallback, useId, useMemo, useState } from "react";
import { astralisMerge } from "../../../../utils/astralis-merge";
import { accentClass } from "../../../../const/color-schemes";
import { TabsContext } from "../tabs.context";
import type { TabsProps } from "../tabs.types";

/**
 * Tabs.Root — owns the active-value state (controlled or uncontrolled) and shares
 * it + config via a memoized context. Renders a flex container that stacks the
 * list and panels (column for horizontal tabs, row for vertical).
 */
export function TabsRoot({
  value: valueProp,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  variant = "line",
  colorScheme = "brand",
  size = "md",
  fitted = false,
  rounded = false,
  activationMode = "automatic",
  keepMounted = false,
  loop = true,
  className,
  children,
  ...rest
}: TabsProps) {
  const isControlled = valueProp !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = isControlled ? valueProp : uncontrolled;
  const baseId = useId();

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolled(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const ctx = useMemo(
    () => ({ value, setValue, orientation, variant, size, fitted, rounded, activationMode, keepMounted, loop, baseId }),
    [value, setValue, orientation, variant, size, fitted, rounded, activationMode, keepMounted, loop, baseId],
  );

  return (
    <TabsContext.Provider value={ctx}>
      <div
        data-orientation={orientation}
        data-variant={variant}
        className={astralisMerge(
          "astralis:flex astralis:gap-4",
          orientation === "horizontal" ? "astralis:flex-col" : "astralis:flex-row",
          // Rebinds the accent channel for the whole subtree — the indicator
          // and active-trigger styles paint with accent-* tokens.
          accentClass(colorScheme),
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

TabsRoot.displayName = "Tabs.Root";
