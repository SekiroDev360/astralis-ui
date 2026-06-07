import type { StepsContentProps } from "../steps.types";
import { useSteps } from "../steps.context";

export function StepsContent({
  value,
  children,
  className = "",
  ...props
}: StepsContentProps) {
  const { value: activeValue } = useSteps();

  if (activeValue !== value) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      className={[
        "astralis-w-full astralis-transition-all astralis-text-label-base",
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
