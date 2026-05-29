import { useCallback, useMemo, useRef } from "react";
import type { StepsListProps } from "../../steps";
import { StepsListContext, useSteps } from "../steps.context";

export function StepsList({ children }: StepsListProps) {
  const { orientation } = useSteps();

  const itemRegisteryRef = useRef<string[]>([])

  itemRegisteryRef.current = []

  const registerItem = useCallback((id: string) => {
    if(!itemRegisteryRef.current.includes(id)){
      itemRegisteryRef.current.push(id)
    }

    return itemRegisteryRef.current.indexOf(id)
  }, []);

  const contextValue = useMemo(() => ({ registerItem }), [registerItem]);

  return (
    <StepsListContext.Provider value={contextValue}>
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
