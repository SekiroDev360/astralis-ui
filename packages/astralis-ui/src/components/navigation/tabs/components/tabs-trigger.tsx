import { useCallback } from "react";
import type { TabsTriggerProps } from "../tabs.types";
import { useTabs } from "../tabs.context";

export function TabsTrigger({
  value,
  disabled = false,
  className,
  children,
}: TabsTriggerProps) {
  const { value: activeValue, setValue, orientation, loop, baseId } = useTabs();
  const active = value === activeValue;

  const triggerId = `${baseId}-trigger-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  const handleClick = useCallback(() => {
    if (!disabled) {
      setValue(value);
    }
  }, [disabled, value, setValue]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      const tabList = e.currentTarget.closest('[role="tablist"]');
      if (!tabList) return;

      // Find all interactive tabs inside this tablist (skipping disabled ones)
      const tabs = Array.from(
        tabList.querySelectorAll('[role="tab"]:not([disabled])')
      ) as HTMLButtonElement[];

      const currentIndex = tabs.indexOf(e.currentTarget);
      if (currentIndex === -1) return;

      let nextIndex = currentIndex;
      const isHorizontal = orientation === "horizontal";
      const isVertical = orientation === "vertical";

      if (
        (isHorizontal && e.key === "ArrowRight") ||
        (isVertical && e.key === "ArrowDown")
      ) {
        e.preventDefault();
        nextIndex = currentIndex + 1;
        if (nextIndex >= tabs.length) {
          nextIndex = loop ? 0 : tabs.length - 1;
        }
      } else if (
        (isHorizontal && e.key === "ArrowLeft") ||
        (isVertical && e.key === "ArrowUp")
      ) {
        e.preventDefault();
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
          nextIndex = loop ? tabs.length - 1 : 0;
        }
      } else if (e.key === "Home") {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        nextIndex = tabs.length - 1;
      }

      if (nextIndex !== currentIndex) {
        const nextTab = tabs[nextIndex];
        nextTab.focus();
        const nextValue = nextTab.getAttribute("data-value");
        if (nextValue) {
          setValue(nextValue);
        }
      }
    },
    [disabled, orientation, loop, setValue],
  );

  return (
    <button
      id={triggerId}
      aria-controls={panelId}
      data-value={value}
      role="tab"
      type="button"
      aria-selected={active}
      aria-disabled={disabled}
      data-state={active ? "active" : "inactive"}
      data-orientation={orientation}
      data-disabled={disabled ? "" : undefined}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={[
        "astralis-group astralis-flex astralis-items-center astralis-justify-center astralis-gap-2",
        "astralis-whitespace-nowrap astralis-px-4 astralis-py-2 astralis-text-sm astralis-font-medium",
        "astralis-transition-all astralis-outline-none focus-visible:astralis-ring-2 focus-visible:astralis-ring-brand-500 focus-visible:astralis-ring-offset-2 focus-visible:astralis-rounded-md",
        disabled
          ? "astralis-opacity-moderate astralis-cursor-not-allowed"
          : "astralis-cursor-pointer",
        // Orientation specific styles
        orientation === "horizontal"
          ? [
              "astralis-border-b-2",
              active
                ? "astralis-border-brand-600 astralis-text-brand-600"
                : "astralis-border-transparent astralis-text-label-muted hover:astralis-text-brand-600 hover:astralis-border-brand-600",
            ].join(" ")
          : [
              "astralis-border-r-2 astralis-w-full astralis-justify-start",
              active
                ? "astralis-border-brand-600 astralis-text-brand-600"
                : "astralis-border-transparent astralis-text-label-muted  hover:astralis-text-brand-600 hover:astralis-border-brand-600",
            ].join(" "),
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
