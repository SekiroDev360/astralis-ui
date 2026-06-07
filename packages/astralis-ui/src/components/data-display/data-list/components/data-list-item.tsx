import type { DataListItemProps } from "../data-list.types";

export function DataListItem({
  children,
}: DataListItemProps) {
  return (
    <div className="astralis-grid astralis-grid-cols-3 astralis-gap-x-4">
      {children}
    </div>
  );
}
