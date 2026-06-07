import type { TableProps } from "../table.types";
import { TableContext } from "../table.context";

export function TableRoot({ children }: TableProps) {
  return (
    <TableContext.Provider value={{}}>
      <div className="astralis-w-full astralis-overflow-x-auto">
        <table className="astralis-w-full astralis-border-collapse astralis-text-sm">
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
}
