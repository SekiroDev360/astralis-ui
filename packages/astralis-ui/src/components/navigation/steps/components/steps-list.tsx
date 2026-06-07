import { useCallback, useRef } from "react";
import type { StepsListProps } from "../steps.types";
import { useSteps, StepsListContext } from "../steps.context";

export function StepsList({ children }: StepsListProps) {
  const { orientation } = useSteps();
  const indexRef = useRef(0);

  const registerItem = useCallback(() => {
    return indexRef.current++;
  }, []);

  return (
    <StepsListContext.Provider value={{ registerItem }}>
      <div
        role="list"
        className={[
          "astralis-flex astralis-gap-6",
          orientation === "horizontal"
            ? "astralis-flex-row"
            : "astralis-flex-col",
        ].join(" ")}
      >
        {children}
      </div>
    </StepsListContext.Provider>
  );
}
