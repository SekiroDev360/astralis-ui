import { createContext, useContext } from "react";

/* ------------------------------------------------------------------ */
/* Root context */
/* ------------------------------------------------------------------ */

export interface StepsContextValue {
  value: number;
  setValue: (value: number) => void;
  orientation: "horizontal" | "vertical";
}

export const StepsContext = createContext<StepsContextValue | null>(null);

export function useSteps() {
  const ctx = useContext(StepsContext);
  if (!ctx) {
    throw new Error("Steps components must be used within <Steps>");
  }
  return ctx;
}

/* ------------------------------------------------------------------ */
/* Steps List context */
/* ------------------------------------------------------------------ */

export interface StepsListContextValue {
  registerItem: () => number;
}

export const StepsListContext =
  createContext<StepsListContextValue | null>(null);

export function useStepsList() {
  const ctx = useContext(StepsListContext);
  if (!ctx) {
    throw new Error("Steps.Item must be used within Steps.List");
  }
  return ctx;
}

/* ------------------------------------------------------------------ */
/* Steps Item context */
/* ------------------------------------------------------------------ */

export type StepState = "completed" | "active" | "upcoming";

export interface StepsItemContextValue {
  index: number;
  state: StepState;
}

export const StepsItemContext =
  createContext<StepsItemContextValue | null>(null);

export function useStepsItem() {
  const ctx = useContext(StepsItemContext);
  if (!ctx) {
    throw new Error(
      "Steps sub-components must be used within Steps.Item"
    );
  }
  return ctx;
}
