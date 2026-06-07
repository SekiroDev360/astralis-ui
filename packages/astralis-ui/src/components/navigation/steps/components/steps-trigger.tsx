import { useSteps, useStepsItem } from "../steps.context";
import type { StepsTriggerProps } from "../steps.types";

export function StepsTrigger({
  children,
  className = "",
  onClick,
  ...props
}: StepsTriggerProps) {
  const { value, setValue, orientation, alternativeLabel } = useSteps();
  const { index, disabled, state } = useStepsItem();

  const isClickable = !disabled;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    setValue(index);
    onClick?.(e);
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      aria-current={state === "active" ? "step" : undefined}
      className={[
        "astralis-flex astralis-items-center astralis-transition-all",
        orientation === "horizontal"
          ? alternativeLabel
            ? "astralis-flex-col astralis-items-center astralis-gap-2"
            : "astralis-flex-row astralis-gap-3 astralis-py-1.5 astralis-px-2"
          : "astralis-flex-row astralis-gap-3 astralis-py-2 astralis-px-3 astralis-w-full",
        isClickable
          ? "astralis-cursor-pointer hover:astralis-bg-surface-subtle astralis-rounded-md"
          : "astralis-cursor-not-allowed",
        disabled ? "astralis-opacity-moderate" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
