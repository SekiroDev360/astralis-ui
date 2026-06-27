import { astralisMerge } from "../../../../utils/astralis-merge";
import { useStepsContext } from "../steps.context";
import { stepNavVariants } from "../steps.styles";
import type { StepsNavProps } from "../steps.types";

/** Steps.Next — steps forward (up to `count`, which marks completion). */
export function StepsNext({ children, className, disabled, onClick, ...rest }: StepsNavProps) {
  const { step, count, setStep } = useStepsContext();
  const isDisabled = disabled ?? step >= count;

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={(e) => {
        setStep(step + 1);
        onClick?.(e);
      }}
      className={astralisMerge(stepNavVariants(), className)}
      {...rest}
    >
      {children ?? "Next"}
    </button>
  );
}

StepsNext.displayName = "Steps.Next";
