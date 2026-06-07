import type { InfoListItemProps } from "../info-list.types";

export function InfoListItem({
  children,
}: InfoListItemProps) {
  return (
    <div className="astralis-grid astralis-grid-cols-3 astralis-gap-x-4">
      {children}
    </div>
  );
}
