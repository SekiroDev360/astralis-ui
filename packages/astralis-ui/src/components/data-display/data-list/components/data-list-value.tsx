import type { DataListValueProps } from "../data-list.types";

export function DataListValue({
  children,
}: DataListValueProps) {
  return (
    <dd className="astralis-col-span-2 astralis-text-sm astralis-text-gray-900">
      {children}
    </dd>
  );
}
