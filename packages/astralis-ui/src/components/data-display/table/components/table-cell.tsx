import type { TableCellProps } from "../table.types";
import { useTable } from "../table.context";
import { tableCellSize } from "../table.styles";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function TableCell({ children, className = "", ...rest }: TableCellProps) {
  const { size } = useTable();
  return (
    <td className={astralisMerge("astralis:text-label-base", tableCellSize[size], className)} {...rest}>
      {children}
    </td>
  );
}
