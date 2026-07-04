import { createContext, useContext } from "react";
import type { TableSize, TableVariant } from "./table.types";

export interface TableContextValue {
  size: TableSize;
  variant: TableVariant;
  striped: boolean;
  interactive: boolean;
  stickyHeader: boolean;
}

export const TableContext = createContext<TableContextValue | null>(null);

export function useTable(): TableContextValue {
  const ctx = useContext(TableContext);
  if (!ctx) throw new Error("Table sub-components must be used within <Table>");
  return ctx;
}
