import { Children, cloneElement, isValidElement, useEffect, type ReactElement } from "react";
import { astralisMerge } from "../../../../utils/astralis-merge";
import { useStepsContext } from "../steps.context";
import type { StepsListProps } from "../steps.types";

/**
 * Steps.List — the ordered list of steps. It counts its Item children (feeding
 * `count` back to the context) and injects each item's `index`. Connectors are
 * drawn by each Item itself, so the list stays a simple flex container.
 */
export function StepsList({ children, className, ...rest }: StepsListProps) {
  const { orientation, labelPlacement, setCount } = useStepsContext();

  const items = Children.toArray(children).filter(isValidElement) as ReactElement<{ index?: number }>[];
  const count = items.length;

  useEffect(() => {
    setCount(count);
  }, [count, setCount]);

  const listClass = astralisMerge(
    "astralis:flex",
    orientation === "vertical"
      ? "astralis:flex-col"
      : astralisMerge("astralis:w-full", labelPlacement === "bottom" ? "astralis:items-start" : "astralis:items-center"),
    className,
  );

  return (
    <ol role="list" className={listClass} {...rest}>
      {items.map((child, index) => cloneElement(child, { index }))}
    </ol>
  );
}

StepsList.displayName = "Steps.List";
