import type { TableSectionProps } from "../table.types";

export function TableHeader({ children }: TableSectionProps) {
  return (
    <thead className="astralis-bg-gray-50 astralis-border-b">
      {children}
    </thead>
  );
}
