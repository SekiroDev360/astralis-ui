import { useCallback, useId, useMemo } from "react";
import {
  StepsItemContext,
  useSteps,
  useStepsList,
  type StepState,
} from "../steps.context";
import type { StepsItemProps } from "../steps.types";

export function StepsItem({
  children,
  status,
  disabled = false,
  className = "",
}: StepsItemProps) {
  const { value, setValue, clickable } = useSteps();
  const { registerItem } = useStepsList();

  const id = useId();
  const index = registerItem(id);

  let state: StepState = "wait";

  if (status) {
    state = status;
  } else if (index < value) {
    state = "finish";
  } else if (index === value) {
    state = "process";
  } else {
    state = "wait";
  }

  const handleClick = useCallback(() => {
    if (!disabled) {
      setValue(index);
    }
  }, [disabled, index, setValue]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setValue(index);
      }
    },
    [disabled, index, setValue],
  );

  const contextValue = useMemo(
    () => ({
      index,
      state,
      isDisabled: disabled,
    }),
    [index, state, disabled],
  );

  const isClickable = clickable && !disabled;

  return (
    <StepsItemContext.Provider value={contextValue}>
      <div
        role={clickable ? "button" : "listitem"}
        aria-disabled={disabled ? true : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onClick={isClickable ? handleClick : undefined}
        onKeyDown={isClickable ? handleKeyDown : undefined}
        data-state={state}
        data-status={state}
        className={[
          "astralis-flex astralis-items-start astralis-gap-4",
          "astralis-flex-1",
          // Base container styling
          "astralis-group",
          isClickable
            ? "astralis-cursor-pointer astralis-transition-all astralis-duration-200 astralis-outline-none focus-visible:astralis-ring-2 focus-visible:astralis-ring-primary-500 focus-visible:astralis-ring-offset-2 focus-visible:astralis-rounded-md"
            : "",
          className,
        ].join(" ")}
      >
        {children}
      </div>
    </StepsItemContext.Provider>
  );
}
