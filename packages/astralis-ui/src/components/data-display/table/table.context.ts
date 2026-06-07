import { createContext, useContext } from "react";

export interface TableContextValue {
  dense?: boolean;
}

export const TableContext =
  createContext<TableContextValue | null>(null);

export function useTable() {
  const ctx = useContext(TableContext);
  if (!ctx) {
    throw new Error("Table components must be used within <Table>");
  }
  return ctx;
}
