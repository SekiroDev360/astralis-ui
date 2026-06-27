import { astralisMerge } from "../../../../utils/astralis-merge";
import { useStepsContext } from "../steps.context";
import type { StepsCompletedProps } from "../steps.types";

/** Steps.Completed — renders once every step is done (`step === count`). */
export function StepsCompleted({ children, className, ...rest }: StepsCompletedProps) {
  const { step, count } = useStepsContext();
  if (count === 0 || step < count) return null;

  return (
    <div className={astralisMerge("astralis:w-full astralis:text-label-base", className)} {...rest}>
      {children}
    </div>
  );
}

StepsCompleted.displayName = "Steps.Completed";
