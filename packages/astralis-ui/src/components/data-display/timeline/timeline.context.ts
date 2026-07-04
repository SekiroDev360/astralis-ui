import { createContext, useContext } from "react";
import type { TimelineSize, TimelineVariant } from "./timeline.types";
import type { ColorScheme } from "../../../const/color-schemes";

export interface TimelineContextValue {
  size: TimelineSize;
  variant: TimelineVariant;
  colorScheme: ColorScheme;
}

export const TimelineContext = createContext<TimelineContextValue | null>(null);

export function useTimeline(): TimelineContextValue {
  const ctx = useContext(TimelineContext);
  if (!ctx) throw new Error("Timeline sub-components must be used within <Timeline>");
  return ctx;
}

/** Per-item: whether this is the final item (so the connector line is hidden). */
export const TimelineItemContext = createContext<{ isLast: boolean }>({ isLast: false });
export function useTimelineItem() {
  return useContext(TimelineItemContext);
}
