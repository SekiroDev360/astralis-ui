import { Text } from "../../../typography/text";
import { useStepItemContext, useStepsContext } from "../steps.context";
import { stepSizeClasses } from "../steps.styles";
import type { StepsTitleProps } from "../steps.types";

/** Steps.Title — the step's heading. Composes our Text primitive; colour tracks status. */
export function StepsTitle({ children, className }: StepsTitleProps) {
  const { size } = useStepsContext();
  const { status } = useStepItemContext();

  const color = status === "error" ? "error" : status === "upcoming" ? "muted" : "base";

  return (
    <Text as="p" size={stepSizeClasses[size].titleSize} weight="medium" color={color} className={className}>
      {children}
    </Text>
  );
}

StepsTitle.displayName = "Steps.Title";
