import { astralisMerge } from "../../../../utils/astralis-merge";
import { useStepItemContext, useStepsContext } from "../steps.context";
import { stepIndicatorVariants, stepDotVariants } from "../steps.styles";
import type { StepsIndicatorProps } from "../steps.types";

/** Check mark shown on completed steps. */
const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" className="astralis:size-[1.1em]" aria-hidden="true">
    <path d="M5 10.5l3.5 3.5L15 6.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Steps.Indicator — the circle (solid/subtle) or dot. Defaults to the step number,
 * a check when completed, or "!" on error; override by passing children.
 */
export function StepsIndicator({ children, className, ...rest }: StepsIndicatorProps) {
  const { variant, size } = useStepsContext();
  const { index, status } = useStepItemContext();

  if (variant === "dot") {
    return (
      <span
        data-status={status}
        aria-current={status === "active" ? "step" : undefined}
        className={astralisMerge(stepDotVariants({ size, status }), className)}
        {...rest}
      />
    );
  }

  const content =
    children ??
    (status === "error" ? "!" : status === "completed" ? <CheckIcon /> : index + 1);

  return (
    <span
      data-status={status}
      aria-current={status === "active" ? "step" : undefined}
      className={astralisMerge(stepIndicatorVariants({ size, variant, status }), className)}
      {...rest}
    >
      {content}
    </span>
  );
}

StepsIndicator.displayName = "Steps.Indicator";
