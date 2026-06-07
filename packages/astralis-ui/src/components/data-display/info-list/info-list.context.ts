import { createContext, useContext } from "react";

export interface InfoListContextValue {}

export const InfoListContext =
  createContext<InfoListContextValue | null>(null);

export function useInfoList() {
  const ctx = useContext(InfoListContext);
  if (!ctx) {
    throw new Error(
      "InfoList components must be used within <InfoList>"
    );
  }
  return ctx;
}
