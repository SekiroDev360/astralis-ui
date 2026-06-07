import type { InfoListValueProps } from "../info-list.types";

export function InfoListValue({
  children,
}: InfoListValueProps) {
  return (
    <dd className="astralis-col-span-2 astralis-text-sm astralis-text-gray-900">
      {children}
    </dd>
  );
}
