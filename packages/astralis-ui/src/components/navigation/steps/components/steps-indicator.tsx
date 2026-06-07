import type { StepsIndicatorProps } from "../steps.types";
import { useStepsItem } from "../steps.context";

export function StepsIndicator({
  children,
}: StepsIndicatorProps) {
  const { index, state } = useStepsItem();

  return (
    <div
      data-state={state}
      aria-current={state === "active" ? "step" : undefined}
      className={[
        "astralis-flex astralis-items-center astralis-justify-center",
        "astralis-h-8 astralis-w-8 astralis-rounded-full astralis-border",
        "astralis-text-sm astralis-font-medium",
        state === "completed" &&
          "astralis-bg-primary astralis-text-white astralis-border-primary",
        state === "active" &&
          "astralis-border-primary astralis-text-primary",
        state === "upcoming" &&
          "astralis-border-gray-300 astralis-text-gray-400",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children ?? (state === "completed" ? "✓" : index + 1)}
    </div>
  );
}
