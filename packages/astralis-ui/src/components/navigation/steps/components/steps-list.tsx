import React, { useEffect } from "react";
import type { StepsListProps } from "../steps.types";
import { useSteps } from "../steps.context";
import { StepsSeparator } from "./steps-separator";

/**
 * StepsList – renders the ordered list of step items.
 *
 * HORIZONTAL: injects <StepsSeparator> between items as true flex
 *   siblings so lines perfectly span between indicators.
 *
 * VERTICAL: does NOT inject separators. Each StepsItem renders its own
 *   connector line internally in a left-gutter column, which means the
 *   line is always perfectly aligned with the indicator circle above and
 *   the next indicator circle below — no content-height interference.
 *   The list also avoids `w-full` in vertical mode so the component can
 *   be centred by a parent flex container.
 */
export function StepsList({ children, className = "", ...props }: StepsListProps) {
  const { orientation, alternativeLabel, setCount, value } = useSteps();

  const items = React.Children.toArray(children).filter(React.isValidElement);
  const count = items.length;

  useEffect(() => {
    setCount(count);
  }, [count, setCount]);

  /* ------------------------------------------------------------------ */
  /* VERTICAL — plain flex-col, no separator injection                   */
  /* ------------------------------------------------------------------ */
  if (orientation === "vertical") {
    return (
      <div
        role="list"
        className={[
          "astralis-flex astralis-flex-col astralis-w-fit",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {items.map((child, index) =>
          React.cloneElement(child as React.ReactElement<any>, {
            key: index,
            index,
            count,
          })
        )}
      </div>
    );
  }

  /* ------------------------------------------------------------------ */
  /* HORIZONTAL — inject separators between items as flex siblings       */
  /* ------------------------------------------------------------------ */
  const withSeparators: React.ReactNode[] = [];

  items.forEach((child, index) => {
    const cloned = React.cloneElement(child as React.ReactElement<any>, {
      index,
      count,
    });

    withSeparators.push(
      <React.Fragment key={`item-${index}`}>{cloned}</React.Fragment>
    );

    if (index < count - 1) {
      withSeparators.push(
        <StepsSeparator
          key={`sep-${index}`}
          _isCompleted={index < value}
        />
      );
    }
  });

  return (
    <div
      role="list"
      className={[
        "astralis-flex astralis-w-full",
        alternativeLabel
          ? "astralis-flex-row astralis-items-start"
          : "astralis-flex-row astralis-items-center",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {withSeparators}
    </div>
  );
}
