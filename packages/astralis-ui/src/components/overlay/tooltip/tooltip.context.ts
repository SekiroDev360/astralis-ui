import { createContext, useContext, type RefObject } from "react";
import type { Side, Align } from "../../../hooks/use-anchor-position";

export interface TooltipContextValue {
  open: boolean;
  /** Show after the configured delay (pointer enter). */
  show: () => void;
  /** Show immediately (keyboard focus). */
  showNow: () => void;
  hide: () => void;
  triggerRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  tooltipId: string;
  side: Side;
  align: Align;
  sideOffset: number;
  avoidCollisions: boolean;
}

export const TooltipContext = createContext<TooltipContextValue | null>(null);

export function useTooltip(): TooltipContextValue {
  const ctx = useContext(TooltipContext);
  if (!ctx) throw new Error("Tooltip sub-components must be used within <Tooltip>");
  return ctx;
}
