import { Text } from "../../../typography/text";
import { useStepsContext } from "../steps.context";
import { stepSizeClasses } from "../steps.styles";
import type { StepsDescriptionProps } from "../steps.types";

/** Steps.Description — secondary text beneath the title. Always muted. */
export function StepsDescription({ children, className }: StepsDescriptionProps) {
  const { size } = useStepsContext();

  return (
    <Text size={stepSizeClasses[size].descSize} color="muted" className={className}>
      {children}
    </Text>
  );
}

StepsDescription.displayName = "Steps.Description";
