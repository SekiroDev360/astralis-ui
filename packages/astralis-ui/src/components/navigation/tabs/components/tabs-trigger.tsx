import { useCallback, type KeyboardEvent } from "react";
import { astralisMerge } from "../../../../utils/astralis-merge";
import { useTabsContext } from "../tabs.context";
import { tabsTriggerVariants } from "../tabs.styles";
import type { TabsTriggerProps } from "../tabs.types";

/**
 * Tabs.Trigger — a single tab button. Implements the ARIA tabs keyboard pattern:
 * roving tabindex (only the selected tab is in the tab order), arrow keys move
 * focus along the orientation, Home/End jump to ends, and `activationMode`
 * decides whether arrowing also selects (automatic) or just moves focus (manual).
 */
export function TabsTrigger({ value, disabled = false, className, children, onClick, onKeyDown, ...rest }: TabsTriggerProps) {
  const { value: active, setValue, orientation, variant, size, fitted, rounded, activationMode, loop, baseId } = useTabsContext();
  const isActive = value === active;

  const triggerId = `${baseId}-trigger-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(e);
      const list = e.currentTarget.closest('[role="tablist"]');
      if (!list) return;
      const tabs = Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'));
      const current = tabs.indexOf(e.currentTarget);
      if (current === -1) return;

      const horizontal = orientation === "horizontal";
      const next = horizontal ? "ArrowRight" : "ArrowDown";
      const prev = horizontal ? "ArrowLeft" : "ArrowUp";

      let target = current;
      if (e.key === next) target = current + 1;
      else if (e.key === prev) target = current - 1;
      else if (e.key === "Home") target = 0;
      else if (e.key === "End") target = tabs.length - 1;
      else return;

      e.preventDefault();
      if (target >= tabs.length) target = loop ? 0 : tabs.length - 1;
      if (target < 0) target = loop ? tabs.length - 1 : 0;

      const tab = tabs[target];
      tab.focus();
      if (activationMode === "automatic") setValue(tab.dataset.value ?? value);
    },
    [onKeyDown, orientation, loop, activationMode, setValue, value],
  );

  return (
    <button
      id={triggerId}
      role="tab"
      type="button"
      data-value={value}
      data-state={isActive ? "active" : "inactive"}
      data-orientation={orientation}
      aria-selected={isActive}
      aria-controls={panelId}
      // Roving tabindex: only the active tab is reachable via Tab.
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      className={astralisMerge(tabsTriggerVariants({ size, variant, fitted, rounded, active: isActive }), className)}
      onClick={(e) => {
        setValue(value);
        onClick?.(e);
      }}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </button>
  );
}

TabsTrigger.displayName = "Tabs.Trigger";
