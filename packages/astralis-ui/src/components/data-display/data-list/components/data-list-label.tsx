import type { DataListLabelProps } from "../data-list.types";

export function DataListLabel({
  children,
}: DataListLabelProps) {
  return (
    <dt className="astralis-col-span-1 astralis-text-sm astralis-font-medium astralis-text-gray-500">
      {children}
    </dt>
  );
}
