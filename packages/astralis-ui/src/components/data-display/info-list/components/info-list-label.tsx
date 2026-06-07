import type { InfoListLabelProps } from "../info-list.types";

export function InfoListLabel({
  children,
}: InfoListLabelProps) {
  return (
    <dt className="astralis-col-span-1 astralis-text-sm astralis-font-medium astralis-text-gray-500">
      {children}
    </dt>
  );
}
