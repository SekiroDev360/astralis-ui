import { createContext, useContext } from "react";

export type TabsOrientation = "horizontal" | "vertical";
export type TabsVariant = "line" | "subtle" | "segmented" | "outline" | "plain";
export type TabsSize = "sm" | "md" | "lg";
/** automatic = arrow keys select on focus; manual = arrow moves focus, Enter/Space selects. */
export type TabsActivationMode = "automatic" | "manual";

export interface TabsContextValue {
  /** The active tab's value. */
  value: string | undefined;
  setValue: (value: string) => void;
  orientation: TabsOrientation;
  variant: TabsVariant;
  size: TabsSize;
  /** Stretch triggers to fill the list width. */
  fitted: boolean;
  /** Apply pill/rounded radii to applicable variants (subtle/segmented/outline). */
  rounded: boolean;
  activationMode: TabsActivationMode;
  /** Keep inactive panels mounted (hidden) instead of unmounting them. */
  keepMounted: boolean;
  /** Wrap focus around the ends during arrow-key navigation. */
  loop: boolean;
  /** Stable id root for trigger/panel aria wiring. */
  baseId: string;
}

export const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs sub-components must be used within <Tabs.Root>");
  return ctx;
}
