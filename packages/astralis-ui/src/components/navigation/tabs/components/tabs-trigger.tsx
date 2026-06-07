import type { TabsTriggerProps } from "../tabs.types";
import { useTabs } from "../tabs.context";

export function TabsTrigger({
  value,
  children,
}: TabsTriggerProps) {
  const { value: activeValue, setValue } = useTabs();
  const active = value === activeValue;

  return (
    <button
      role="tab"
      aria-selected={active}
      data-state={active ? "active" : "inactive"}
      onClick={() => setValue(value)}
      className={[
        "astralis-px-3 astralis-py-2 astralis-text-sm astralis-font-medium",
        "astralis-border-b-2 astralis-transition-colors",
        active
          ? "astralis-border-primary astralis-text-primary"
          : "astralis-border-transparent astralis-text-gray-500 hover:astralis-text-gray-900",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
