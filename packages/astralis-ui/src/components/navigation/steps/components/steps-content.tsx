import { astralisMerge } from "../../../../utils/astralis-merge";
import { useStepsContext } from "../steps.context";
import type { StepsContentProps } from "../steps.types";

/** Steps.Content — renders only when its `index` matches the active step. */
export function StepsContent({ index, children, className, ...rest }: StepsContentProps) {
  const { step } = useStepsContext();
  if (step !== index) return null;

  return (
    <div role="tabpanel" className={astralisMerge("astralis:w-full astralis:text-label-base", className)} {...rest}>
      {children}
    </div>
  );
}

StepsContent.displayName = "Steps.Content";
