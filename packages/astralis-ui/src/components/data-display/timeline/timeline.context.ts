import { createContext, useContext } from "react";

export interface TimelineContextValue {}

export const TimelineContext =
  createContext<TimelineContextValue | null>(null);

export function useTimeline() {
  const ctx = useContext(TimelineContext);
  if (!ctx) {
    throw new Error(
      "Timeline components must be used within <Timeline>"
    );
  }
  return ctx;
}
