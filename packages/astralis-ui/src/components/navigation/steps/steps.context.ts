import { createContext, useContext } from "react";

/* ------------------------------------------------------------------ */
/* Root context */
/* ------------------------------------------------------------------ */

export interface StepsContextValue {
  value: number;
  setValue: (value: number) => void;
  orientation: "horizontal" | "vertical";
  variant: "solid" | "subtle" | "dot";
  size: "sm" | "md" | "lg";
  linear: boolean;
  alternativeLabel: boolean;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
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
/* Steps Item context */
/* ------------------------------------------------------------------ */

export type StepState = "completed" | "active" | "upcoming" | "error";

export interface StepsItemContextValue {
  index: number;
  count: number;
  state: StepState;
  disabled: boolean;
  isError: boolean;
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
