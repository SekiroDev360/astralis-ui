import type { TableSectionProps } from "../table.types";

export function TableBody({ children }: TableSectionProps) {
  return (
    <tbody className="astralis-divide-y">
      {children}
    </tbody>
  );
}
