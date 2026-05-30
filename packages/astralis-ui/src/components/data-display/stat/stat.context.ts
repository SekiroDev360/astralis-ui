import { createContext, useContext } from "react";
import type { StatSize } from "./stat.types";

export interface StatContextValue {
  size: StatSize;
}

export const StatContext = createContext<StatContextValue | null>(null);

export function useStat(): StatContextValue {
  return useContext(StatContext) ?? { size: "md" };
}
