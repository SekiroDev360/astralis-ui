import { createContext, useContext } from "react";

export interface DataListContextValue {}

export const DataListContext =
  createContext<DataListContextValue | null>(null);

export function useDataList() {
  const ctx = useContext(DataListContext);
  if (!ctx) {
    throw new Error(
      "DataList components must be used within <DataList>"
    );
  }
  return ctx;
}
