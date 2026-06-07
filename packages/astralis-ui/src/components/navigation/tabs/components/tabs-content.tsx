import type { TabsContentProps } from "../tabs.types";
import { useTabs } from "../tabs.context";

export function TabsContent({ value, className, children }: TabsContentProps) {
  const { value: activeValue, orientation, baseId } = useTabs();

  if (value !== activeValue) return null;

  const triggerId = `${baseId}-trigger-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  return (
    <div
      id={panelId}
      aria-labelledby={triggerId}
      role="tabpanel"
      tabIndex={0}
      data-state="active"
      data-orientation={orientation}
      className={[
        "astralis-flex-1 astralis-text-label-base astralis-w-full astralis-outline-none focus-visible:astralis-ring-2 focus-visible:astralis-ring-brand-600 focus-visible:astralis-ring-offset-2 focus-visible:astralis-rounded-md",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
