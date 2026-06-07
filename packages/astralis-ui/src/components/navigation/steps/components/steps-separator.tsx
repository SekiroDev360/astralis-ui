import { useSteps } from "../steps.context";
import type { StepsSeparatorProps } from "../steps.types";

/**
 * Internal separator rendered by StepsList between each StepsItem.
 * It is NOT placed by the user inside StepsItem any more – StepsList
 * injects it automatically so the geometry is always correct.
 *
 * Props injected by StepsList:
 *  - _isCompleted  – whether the preceding step is completed
 *  - _size         – inherited from the Steps context (forwarded for perf)
 */
interface InternalSeparatorProps extends StepsSeparatorProps {
  _isCompleted?: boolean;
}

export function StepsSeparator({
  className = "",
  _isCompleted = false,
  ...props
}: InternalSeparatorProps) {
  const { orientation, alternativeLabel, size } = useSteps();

  const colorClass = _isCompleted
    ? "astralis-bg-brand-600"
    : "astralis-bg-border";

  /* ------------------------------------------------------------------ */
  /* Horizontal – alternative label (labels sit below indicators)        */
  /* The separator must span from the right edge of one indicator to the */
  /* left edge of the next. Both items already have flex:1, so we just   */
  /* need a full-width bar that sits between them as a flex child.       */
  /* ------------------------------------------------------------------ */
  if (orientation === "horizontal" && alternativeLabel) {
    return (
      <div
        role="presentation"
        aria-hidden="true"
        className={[
          "astralis-flex-1 astralis-h-[2px] astralis-self-start astralis-mx-2 astralis-transition-colors astralis-duration-fast",
          // Vertically align with the centre of the indicator
          {
            sm: "astralis-mt-[0.75rem]",
            md: "astralis-mt-[1rem]",
            lg: "astralis-mt-[1.25rem]",
          }[size],
          colorClass,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  }

  /* ------------------------------------------------------------------ */
  /* Horizontal – normal (indicator + text side-by-side)                 */
  /* A simple flex-1 bar that fills the space between items.             */
  /* ------------------------------------------------------------------ */
  if (orientation === "horizontal") {
    return (
      <div
        role="presentation"
        aria-hidden="true"
        className={[
          "astralis-flex-1 astralis-h-[2px] astralis-self-center astralis-mx-2 astralis-transition-colors astralis-duration-200",
          colorClass,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  }

  /* ------------------------------------------------------------------ */
  /* Vertical                                                            */
  /* The list uses flex-col. The separator sits between two StepsItems   */
  /* and must draw a vertical line aligned with the indicator's centre.  */
  /* We use a fixed left offset (= half the indicator diameter) and let  */
  /* the line grow to fill the available space with flex-1.             */
  /* ------------------------------------------------------------------ */
  const leftOffset = {
    sm: "astralis-ml-[0.75rem]", // half of h-6 (1.5rem)
    md: "astralis-ml-[1rem]",    // half of h-8 (2rem)
    lg: "astralis-ml-[1.25rem]", // half of h-10 (2.5rem)
  }[size];

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={[
        // Give it a fixed pixel height so it is always visible.
        // my-1 creates a small gap above/below so the line doesn't touch the indicators.
        "astralis-flex-none astralis-w-[2px] astralis-min-h-[1rem] astralis-h-5 astralis-my-1 astralis-transition-colors astralis-duration-200",
        leftOffset,
        colorClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

StepsSeparator.displayName = "StepsSeparator";
