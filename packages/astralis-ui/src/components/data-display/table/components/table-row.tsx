import type { TableRowProps } from "../table.types";

export function TableRow({ children }: TableRowProps) {
  return (
    <tr className="hover:astralis-bg-gray-50">
      {children}
    </tr>
  );
}
