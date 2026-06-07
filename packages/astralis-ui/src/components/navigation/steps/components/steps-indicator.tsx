import type { StepsIndicatorProps } from "../steps.types";
import { useSteps, useStepsItem } from "../steps.context";

export function StepsIndicator({
  children,
  className = "",
  ...props
}: StepsIndicatorProps) {
  const { variant, size } = useSteps();
  const { index, state } = useStepsItem();

  // 1. Dot variant styles
  if (variant === "dot") {
    const dotSizes = {
      sm: {
        active: "astralis-h-2.5 astralis-w-2.5 astralis-ring-2",
        completed: "astralis-h-2 astralis-w-2",
        upcoming: "astralis-h-1.5 astralis-w-1.5",
        error: "astralis-h-2 astralis-w-2",
      },
      md: {
        active: "astralis-h-3.5 astralis-w-3.5 astralis-ring-4",
        completed: "astralis-h-2.5 astralis-w-2.5",
        upcoming: "astralis-h-2 astralis-w-2",
        error: "astralis-h-2.5 astralis-w-2.5",
      },
      lg: {
        active: "astralis-h-4 astralis-w-4 astralis-ring-4",
        completed: "astralis-h-3 astralis-w-3",
        upcoming: "astralis-h-2.5 astralis-w-2.5",
        error: "astralis-h-3 astralis-w-3",
      },
    }[size][state];

    const dotColors = {
      active: "astralis-bg-brand-600 astralis-ring-brand-100 dark:astralis-ring-brand-900/40",
      completed: "astralis-bg-brand-600",
      upcoming: "astralis-bg-border",
      error: "astralis-bg-surface-error",
    }[state];

    return (
      <div
        data-state={state}
        aria-current={state === "active" ? "step" : undefined}
        className={[
          "astralis-flex astralis-items-center astralis-justify-center astralis-rounded-full astralis-transition-all astralis-shrink-0",
          dotSizes,
          dotColors,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  }

  // 2. Standard Circle Variant Styles
  const circleSizes = {
    sm: "astralis-h-6 astralis-w-6 astralis-text-xs",
    md: "astralis-h-8 astralis-w-8 astralis-text-sm",
    lg: "astralis-h-10 astralis-w-10 astralis-text-base",
  }[size];

  const variantStyles = {
    solid: {
      active: "astralis-bg-brand-600 astralis-text-white astralis-border-brand-600",
      completed: "astralis-bg-brand-600 astralis-text-white astralis-border-brand-600",
      upcoming: "astralis-bg-surface-subtle astralis-text-label-muted astralis-border-base",
      error: "astralis-bg-surface-error astralis-text-label-error astralis-border-error",
    },
    subtle: {
      active: "astralis-bg-surface-base astralis-text-brand-600 astralis-border-brand-600 astralis-ring-2 astralis-ring-brand-100 dark:astralis-ring-brand-900/40",
      completed: "astralis-bg-brand-50 dark:astralis-bg-brand-950/40 astralis-text-brand-600 astralis-border-brand-600",
      upcoming: "astralis-bg-transparent astralis-text-label-subtle astralis-border-base",
      error: "astralis-bg-surface-error astralis-text-label-error astralis-border-error",
    },
  }[variant][state];

  // Fallback indicator icon/number
  const defaultIndicatorContent =
    state === "error" ? (
      "!"
    ) : state === "completed" ? (
      <svg
        className="astralis-h-4 astralis-w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="3"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ) : (
      index + 1
    );

  return (
    <div
      data-state={state}
      aria-current={state === "active" ? "step" : undefined}
      className={[
        "astralis-flex astralis-items-center astralis-justify-center astralis-rounded-full astralis-border-2 astralis-font-medium astralis-transition-all astralis-shrink-0",
        circleSizes,
        variantStyles,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children ?? defaultIndicatorContent}
    </div>
  );
}

StepsIndicator.displayName = "StepsIndicator";
