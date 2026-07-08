import type { CSSProperties, Ref } from "react";
import type { ProgressProps } from "./progress.types";
import {
  progressTrackVariants,
  progressBarClasses,
  progressCircleSizes,
  progressValueLabelClasses,
} from "./progress.styles";
import { astralisMerge } from "../../../utils/astralis-merge";
import { accentClass } from "../../../const/color-schemes";

const INDETERMINATE_ANIMATION: CSSProperties = {
  // Longhands only — mixing the `animation` shorthand with other animation-*
  // props makes React warn on rerender (same lesson as Marquee).
  animationName: "astralis-progress-slide",
  animationDuration: "1.2s",
  animationTimingFunction: "ease-in-out",
  animationIterationCount: "infinite",
};

/**
 * Determinate or indeterminate progress, as a linear bar or a circular ring.
 * Omitting `value` switches to the indeterminate animation.
 */
export function Progress({
  value,
  max = 100,
  shape = "line",
  size = "md",
  colorScheme = "brand",
  showValueLabel = false,
  className = "",
  ref,
  ...rest
}: ProgressProps & { ref?: Ref<HTMLDivElement> }) {
    const indeterminate = value == null;
    const percent = indeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100));
    const valueText = `${Math.round(percent)}%`;

    const ariaProps = {
      role: "progressbar" as const,
      "aria-valuemin": 0,
      "aria-valuemax": max,
      // Indeterminate bars omit aria-valuenow — that IS the ARIA signal.
      "aria-valuenow": indeterminate ? undefined : value,
      "aria-valuetext": indeterminate ? undefined : valueText,
    };

    if (shape === "circle") {
      const { px, stroke } = progressCircleSizes[size];
      const radius = 24 - stroke / 2; // viewBox is 48×48
      const circumference = 2 * Math.PI * radius;

      return (
        <div
          ref={ref}
          {...ariaProps}
          className={astralisMerge(
            "astralis:relative astralis:inline-flex astralis:items-center astralis:justify-center",
            accentClass(colorScheme),
            className,
          )}
          {...rest}
        >
          <svg
            width={px}
            height={px}
            viewBox="0 0 48 48"
            className={indeterminate ? "astralis:animate-spin" : undefined}
            aria-hidden="true"
          >
            <circle
              cx="24" cy="24" r={radius} fill="none" strokeWidth={stroke}
              className="astralis:stroke-surface-emphasized"
            />
            <circle
              cx="24" cy="24" r={radius} fill="none" strokeWidth={stroke} strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={indeterminate ? circumference * 0.75 : circumference * (1 - percent / 100)}
              transform="rotate(-90 24 24)"
              className="astralis:stroke-accent-solid astralis:transition-all astralis:duration-moderate"
            />
          </svg>
          {showValueLabel && !indeterminate && (
            <span className={astralisMerge("astralis:absolute astralis:text-xs", progressValueLabelClasses)}>
              {valueText}
            </span>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={astralisMerge("astralis:flex astralis:items-center astralis:gap-3", accentClass(colorScheme), className)}
        {...rest}
      >
        <div {...ariaProps} className={progressTrackVariants({ size })}>
          <div
            className={astralisMerge(progressBarClasses, indeterminate && "astralis:w-1/3")}
            style={indeterminate ? INDETERMINATE_ANIMATION : { width: `${percent}%` }}
          />
        </div>
        {showValueLabel && !indeterminate && (
          <span className={astralisMerge("astralis:text-sm astralis:shrink-0", progressValueLabelClasses)}>
            {valueText}
          </span>
        )}
      </div>
    );
}

Progress.displayName = "Progress";
