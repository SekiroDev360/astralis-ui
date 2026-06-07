import type { StepsPanelProps } from "../steps.types";
import { useSteps } from "../steps.context";

export function StepsPanel({ children, className = "", ...props }: StepsPanelProps) {
  const { orientation, alternativeLabel } = useSteps();

  return (
    <div
      className={[
        "astralis-flex astralis-flex-col astralis-gap-1 astralis-shrink-0",
        orientation === "horizontal" && alternativeLabel
          ? "astralis-items-center astralis-text-center astralis-mt-2"
          : "astralis-items-start astralis-text-left",
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
