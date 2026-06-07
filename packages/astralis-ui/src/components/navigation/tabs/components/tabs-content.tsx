import type { TabsContentProps } from "../tabs.types";
import { useTabs } from "../tabs.context";

export function TabsContent({
  value,
  children,
}: TabsContentProps) {
  const { value: activeValue } = useTabs();

  if (value !== activeValue) return null;

  return (
    <div
      role="tabpanel"
      className="astralis-pt-4"
    >
      {children}
    </div>
  );
}
