import { cloneElement, isValidElement } from "react";
import { useSteps } from "../steps.context";
import type { StepsNextProps } from "../steps.types";

export function StepsNext({
  asChild,
  children,
  onClick,
  className = "",
  ...props
}: StepsNextProps) {
  const { value, setValue, count } = useSteps();

  const isDisabled = value >= count - 1;

  const handleNext = (e: React.MouseEvent<any>) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    setValue(value + 1);
    onClick?.(e);
  };

  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<any>, {
      onClick: handleNext,
      disabled: isDisabled,
      ...props,
    });
  }

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={handleNext}
      className={[
        "astralis-inline-flex astralis-items-center astralis-justify-center astralis-font-medium",
        "astralis-px-4 astralis-h-10 astralis-rounded-lg astralis-transition-all astralis-cursor-pointer",
        "astralis-bg-brand-600 astralis-text-white hover:astralis-bg-brand-700",
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
