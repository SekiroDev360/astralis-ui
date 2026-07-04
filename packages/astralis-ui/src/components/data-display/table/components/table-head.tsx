import type { TableHeadProps } from "../table.types";
import { useTable } from "../table.context";
import { tableCellSize } from "../table.styles";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function TableHead({ children, className = "", scope = "col", ...rest }: TableHeadProps) {
  const { size } = useTable();
  return (
    <th
      scope={scope}
      className={astralisMerge("astralis:text-left astralis:font-medium astralis:text-label-muted astralis:whitespace-nowrap", tableCellSize[size], className)}
      {...rest}
    >
      {children}
    </th>
  );
}
