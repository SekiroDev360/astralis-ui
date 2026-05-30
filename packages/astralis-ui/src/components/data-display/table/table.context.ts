import { createContext, useContext } from "react";
import type { TableSize, TableVariant } from "./table.types";

export interface TableContextValue {
  size: TableSize;
  variant: TableVariant;
  bordered: boolean;
  columnBorder: boolean;
  hoverable: boolean;
  stickyHeader: boolean;
}

export const TableContext = createContext<TableContextValue>({
  size: "md",
  variant: "simple",
  bordered: false,
  columnBorder: false,
  hoverable: true,
  stickyHeader: false,
});

export function useTable() {
  const ctx = useContext(TableContext);
  if (!ctx) {
    throw new Error("Table components must be used within <Table>");
  }
  return ctx;
}
