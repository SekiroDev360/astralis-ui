import { createContext, useContext } from "react";

export interface TabsContextValue {
  value?: string;
  setValue: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  loop?: boolean; 
  baseId: string;
}
 
export const TabsContext = createContext<TabsContextValue | undefined>(
  undefined,
);

export function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within a TabsProvider");
  }
  return context;
}
