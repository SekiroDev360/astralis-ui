import { useSteps } from "../steps.context";
import type { StepsCompletedContentProps } from "../steps.types";

export function StepsCompletedContent({
  children,
  className = "",
  ...props
}: StepsCompletedContentProps) {
  const { value, count } = useSteps();

  if (value < count) {
    return null;
  }

  return (
    <div
      className={[
        "astralis-w-full astralis-transition-all",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
