import type { TableRowProps } from "../table.types";
import { useTable } from "../table.context";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function TableRow({ children, className = "", ...rest }: TableRowProps) {
  const { striped, interactive } = useTable();
  return (
    <tr
      className={astralisMerge(
        "astralis:transition-colors",
        striped ? "astralis:even:bg-surface-subtle" : "",
        interactive ? "astralis:hover:bg-surface-muted" : "",
        className,
      )}
      {...rest}
    >
      {children}
    </tr>
  );
}
