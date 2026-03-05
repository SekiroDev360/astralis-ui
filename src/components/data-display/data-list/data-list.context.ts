import { createContext, useContext } from "react";
import type {
  DataListSize,
  DataListVariant,
  DataListOrientation,
} from "./data-list.types";

export interface DataListContextValue {
  size: DataListSize;
  variant: DataListVariant;
  orientation: DataListOrientation;
}

export const DataListContext = createContext<DataListContextValue | null>(null);

export function useDataList() {
  const ctx = useContext(DataListContext);
  if (!ctx)
    throw new Error("DataList sub-components must be used within <DataList>");
  return ctx;
}
