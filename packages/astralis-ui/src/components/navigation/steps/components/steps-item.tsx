import React from "react";
import type { StepsItemProps } from "../steps.types";
import {
  StepsItemContext,
  useSteps,
  type StepState,
} from "../steps.context";

/**
 * StepsItem – wrapper for a single step.
 *
 * HORIZONTAL: flat flex-row/flex-col — separators are injected between
 *             items by StepsList as true flex siblings.
 *
 * VERTICAL: two-column gutter layout.
 *   Left column  → indicator + connector line (stacked in flex-col)
 *   Right column → everything else (panel/trigger/title/description)
 *
 * The connector line lives in the SAME column as the indicator so the
 * gap between line-end and next-indicator-top is always equal to the
 * gap between indicator-bottom and line-start — no content-height
 * interference.
 *
 * Any <Steps.Separator> placed manually inside this component is stripped
 * for backward compatibility (horizontal separators come from StepsList,
 * vertical connectors are rendered here internally).
 */
export function StepsItem({
  children,
  index = 0,
  count = 0,
  disabled = false,
  isError = false,
  className = "",
  ...props
}: StepsItemProps) {
  const { value, orientation, alternativeLabel, linear, size } = useSteps();

  let state: StepState = "upcoming";
  if (isError) {
    state = "error";
  } else if (index < value) {
    state = "completed";
  } else if (index === value) {
    state = "active";
  }

  const resolvedDisabled = disabled || (linear && value < index);

  // Strip manually placed separators (backward compat — StepsList / this
  // component now injects them automatically).
  const filteredChildren = React.Children.toArray(children).filter((child) => {
    if (!React.isValidElement(child)) return true;
    const type = child.type as any;
    const name: string = type?.displayName ?? type?.name ?? "";
    return name !== "StepsSeparator";
  });

  const contextValue = {
    index,
    count,
    state,
    disabled: resolvedDisabled,
    isError,
  };

  /* ------------------------------------------------------------------ */
  /* VERTICAL – two-column gutter layout                                 */
  /* ------------------------------------------------------------------ */
  if (orientation === "vertical") {
    const isLast = index >= count - 1;

    // Split children: find the StepsIndicator, put everything else in the
    // right content column.
    const items = filteredChildren;
    const indicatorChild = items.find((c) => {
      if (!React.isValidElement(c)) return false;
      const name =
        (c.type as any)?.displayName ?? (c.type as any)?.name ?? "";
      return name === "StepsIndicator";
    });
    const contentChildren = items.filter((c) => c !== indicatorChild);

    // Connector line colour mirrors the separator logic
    const connectorColor =
      state === "completed"
        ? "astralis-bg-brand-600"
        : "astralis-bg-gray-200 dark:astralis-bg-gray-800";

    // Indicator widths (same as circle sizes in StepsIndicator, used for
    // the left gutter width so the connector centres under the circle)
    const gutterWidth = {
      sm: "astralis-w-6",  // h-6 w-6
      md: "astralis-w-8",  // h-8 w-8
      lg: "astralis-w-10", // h-10 w-10
    }[size];

    // If we can find a standalone indicator, render the two-column layout.
    // Fall back to the flat layout when a Trigger wraps everything.
    if (indicatorChild) {
      return (
        <StepsItemContext.Provider value={contextValue}>
          <div
            role="listitem"
            data-state={state}
            data-index={index}
            className={[
              "astralis-flex astralis-w-fit",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            {...props}
          >
            {/* ── Left gutter: indicator stacked above connector line ── */}
            <div
              className={[
                "astralis-flex astralis-flex-col astralis-items-center astralis-flex-none",
                gutterWidth,
              ].join(" ")}
            >
              {indicatorChild}
              {!isLast && (
                <div
                  role="presentation"
                  aria-hidden="true"
                  className={[
                    "astralis-flex-1 astralis-w-[2px] astralis-my-1 astralis-min-h-[1rem] astralis-transition-colors astralis-duration-fast",
                    connectorColor,
                  ].join(" ")}
                />
              )}
            </div>

            {/* ── Right column: title, description, etc. ── */}
            <div
              className={[
                "astralis-flex-1 astralis-ml-3",
                // Add bottom padding on non-last items so the right
                // column's content aligns with the connector line length
                !isLast ? "astralis-pb-4" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {contentChildren}
            </div>
          </div>
        </StepsItemContext.Provider>
      );
    }

    // Fallback (Trigger wrapping): flat layout, no connector
    return (
      <StepsItemContext.Provider value={contextValue}>
        <div
          role="listitem"
          data-state={state}
          data-index={index}
          className={[
            "astralis-flex astralis-flex-row astralis-items-start astralis-w-fit",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {filteredChildren}
        </div>
      </StepsItemContext.Provider>
    );
  }

  /* ------------------------------------------------------------------ */
  /* HORIZONTAL – flat layout, separators injected by StepsList          */
  /* ------------------------------------------------------------------ */
  return (
    <StepsItemContext.Provider value={contextValue}>
      <div
        role="listitem"
        data-state={state}
        data-index={index}
        className={[
          "astralis-flex astralis-relative astralis-gap-3",
          alternativeLabel
            ? "astralis-flex-col astralis-items-center astralis-text-center astralis-flex-1"
            : "astralis-flex-row astralis-items-center astralis-flex-none",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {filteredChildren}
      </div>
    </StepsItemContext.Provider>
  );
}
