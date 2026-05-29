import { createContext, useContext } from "react";

/* ------------------------------------------------------------------ */
/* Root context */
/* ------------------------------------------------------------------ */

export interface StepsContextValue {
  value: number;
  setValue: (value: number) => void;
  orientation: "horizontal" | "vertical";
  size: "default" | "small";
  clickable?: boolean;
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
  registerItem: (id: string) => number;
}

export const StepsListContext = createContext<StepsListContextValue | null>(
  null,
);

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

export type StepState = "wait" | "process" | "finish" | "error";

export interface StepsItemContextValue {
  index: number;
  state: StepState;
  isDisabled: boolean;
}

export const StepsItemContext = createContext<StepsItemContextValue | null>(
  null,
);

export function useStepsItem() {
  const ctx = useContext(StepsItemContext);
  if (!ctx) {
    throw new Error("Steps sub-components must be used within Steps.Item");
  }
  return ctx;
}
