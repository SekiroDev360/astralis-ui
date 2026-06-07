import { createContext, useContext } from "react";

export interface StatContextValue {}

export const StatContext =
  createContext<StatContextValue | null>(null);

export function useStat() {
  const ctx = useContext(StatContext);
  if (!ctx) {
    throw new Error("Stat components must be used within <Stat>");
  }
  return ctx;
}
