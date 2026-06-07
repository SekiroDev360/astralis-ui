import type { TableCellProps } from "../table.types";

export function TableCell({ children }: TableCellProps) {
  return (
    <td className="astralis-px-4 astralis-py-3 astralis-text-gray-700">
      {children}
    </td>
  );
}
