import { useState } from "react";
import type { StepsItemProps } from "../steps.types";
import {
  StepsItemContext,
  useSteps,
  useStepsList,
  type StepState,
} from "../steps.context";

export function StepsItem({ children }: StepsItemProps) {
  const { value } = useSteps();
  const { registerItem } = useStepsList();

  const [index] = useState(() => registerItem());

  const state: StepState =
    index < value
      ? "completed"
      : index === value
      ? "active"
      : "upcoming";

  return (
    <StepsItemContext.Provider value={{ index, state }}>
      <div
        role="listitem"
        data-state={state}
        className="astralis-flex astralis-items-start astralis-gap-3"
      >
        {children}
      </div>
    </StepsItemContext.Provider>
  );
}
