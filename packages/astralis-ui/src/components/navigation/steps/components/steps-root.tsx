import { useCallback, useMemo, useState } from "react";
import { astralisMerge } from "../../../../utils/astralis-merge";
import { StepsContext } from "../steps.context";
import type { StepsProps } from "../steps.types";

/**
 * Steps.Root — owns the step state machine and shares it via context so the
 * sub-parts never prop-drill. Supports controlled (`step`) and uncontrolled
 * (`defaultStep`) usage. The context value is memoized so static parts (titles,
 * descriptions) don't re-render unless something they read actually changes.
 */
export function StepsRoot({
  step: stepProp,
  defaultStep = 0,
  onStepChange,
  count: countProp,
  orientation = "horizontal",
  variant = "solid",
  size = "md",
  linear = false,
  labelPlacement = "inline",
  clickable = false,
  className,
  children,
  ...rest
}: StepsProps) {
  const isControlled = stepProp !== undefined;
  const [uncontrolledStep, setUncontrolledStep] = useState(defaultStep);
  const step = isControlled ? stepProp : uncontrolledStep;

  const [count, setCount] = useState(countProp ?? 0);

  const setStep = useCallback(
    (next: number) => {
      // Linear mode: forbid skipping past the next step (back nav still allowed).
      if (linear && next > step + 1) return;
      const clamped = Math.max(0, Math.min(next, count));
      if (!isControlled) setUncontrolledStep(clamped);
      onStepChange?.(clamped);
    },
    [linear, step, count, isControlled, onStepChange],
  );

  const ctx = useMemo(
    () => ({
      step,
      setStep,
      count,
      setCount,
      orientation,
      variant,
      size,
      linear,
      labelPlacement,
      clickable,
    }),
    [step, setStep, count, orientation, variant, size, linear, labelPlacement, clickable],
  );

  return (
    <StepsContext.Provider value={ctx}>
      <div
        data-orientation={orientation}
        data-variant={variant}
        className={astralisMerge(
          "astralis:flex astralis:flex-col astralis:gap-6",
          orientation === "horizontal" && "astralis:w-full",
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    </StepsContext.Provider>
  );
}

StepsRoot.displayName = "Steps.Root";
