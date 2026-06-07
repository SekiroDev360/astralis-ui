import type { StatLabelProps } from "../stat.types";

export function StatLabel({ children }: StatLabelProps) {
  return (
    <span className="astralis-text-sm astralis-text-gray-500">
      {children}
    </span>
  );
}
