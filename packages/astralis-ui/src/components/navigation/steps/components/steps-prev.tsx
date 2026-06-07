import { cloneElement, isValidElement } from "react";
import { useSteps } from "../steps.context";
import type { StepsPrevProps } from "../steps.types";

export function StepsPrev({
  asChild,
  children,
  onClick,
  className = "",
  ...props
}: StepsPrevProps) {
  const { value, setValue } = useSteps();

  const isDisabled = value <= 0;

  const handlePrev = (e: React.MouseEvent<any>) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    setValue(value - 1);
    onClick?.(e);
  };

  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<any>, {
      onClick: handlePrev,
      disabled: isDisabled,
      ...props,
    });
  }

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={handlePrev}
      className={[
        "astralis-inline-flex astralis-items-center astralis-justify-center astralis-font-medium",
        "astralis-px-4 astralis-h-10 astralis-rounded-lg astralis-transition-all astralis-cursor-pointer",
        "astralis-border astralis-border-base astralis-bg-surface-base astralis-text-label-base hover:astralis-bg-surface-muted",
        "disabled:astralis-opacity-moderate disabled:astralis-cursor-not-allowed",
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
