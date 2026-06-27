import { astralisMerge } from "../../../../utils/astralis-merge";
import { useStepsContext } from "../steps.context";
import { stepNavVariants } from "../steps.styles";
import type { StepsNavProps } from "../steps.types";

/** Steps.Prev — steps backward. Auto-disabled at the first step. */
export function StepsPrev({ children, className, disabled, onClick, ...rest }: StepsNavProps) {
  const { step, setStep } = useStepsContext();
  const isDisabled = disabled ?? step <= 0;

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={(e) => {
        setStep(step - 1);
        onClick?.(e);
      }}
      className={astralisMerge(stepNavVariants(), className)}
      {...rest}
    >
      {children ?? "Back"}
    </button>
  );
}

StepsPrev.displayName = "Steps.Prev";
