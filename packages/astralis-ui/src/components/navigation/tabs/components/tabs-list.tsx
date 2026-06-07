import type { TabsListProps } from "../tabs.types";

export function TabsList({ children }: TabsListProps) {
  return (
    <div
      role="tablist"
      className="astralis-flex astralis-gap-2 astralis-border-b"
    >
      {children}
    </div>
  );
}
