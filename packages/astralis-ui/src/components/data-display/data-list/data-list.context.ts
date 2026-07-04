import { createContext, useContext } from "react";
import type { DataListOrientation, DataListSize } from "./data-list.types";

export interface DataListContextValue {
  orientation: DataListOrientation;
  size: DataListSize;
}

export const DataListContext = createContext<DataListContextValue | null>(null);

export function useDataList(): DataListContextValue {
  const ctx = useContext(DataListContext);
  if (!ctx) throw new Error("DataList sub-components must be used within <DataList>");
  return ctx;
}
