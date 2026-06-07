import type { StatValueProps } from "../stat.types";

export function StatValue({ children }: StatValueProps) {
  return (
    <span className="astralis-text-2xl astralis-font-semibold astralis-text-gray-900">
      {children}
    </span>
  );
}
