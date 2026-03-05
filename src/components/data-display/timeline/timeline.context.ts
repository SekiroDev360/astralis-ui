import { createContext, useContext } from "react";
import type {
  TimelineSize,
  TimelineVariant,
  TimelineOrientation,
} from "./timeline.types";

export interface TimelineContextValue {
  size: TimelineSize;
  variant: TimelineVariant;
  orientation: TimelineOrientation;
}

export const TimelineContext = createContext<TimelineContextValue | null>(null);

export function useTimeline() {
  const ctx = useContext(TimelineContext);
  if (!ctx) {
    throw new Error("Timeline sub-components must be used within <Timeline>");
  }
  return ctx;
}
