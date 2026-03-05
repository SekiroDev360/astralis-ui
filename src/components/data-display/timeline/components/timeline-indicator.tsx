import type { TimelineIndicatorProps } from "../timeline.types";
import { useTimeline } from "../timeline.context";

/* ------------------------------------------------------------------ */
/* Colour token map                                                     */
/* ------------------------------------------------------------------ */

const colorMap: Record<string, { bg: string; ring: string; text: string }> = {
  primary: {
    bg: "astralis-bg-primary-600",
    ring: "astralis-ring-primary-600",
    text: "astralis-text-white",
  },
  success: {
    bg: "astralis-bg-success-500",
    ring: "astralis-ring-success-500",
    text: "astralis-text-white",
  },
  warning: {
    bg: "astralis-bg-warning-400",
    ring: "astralis-ring-warning-400",
    text: "astralis-text-white",
  },
  danger: {
    bg: "astralis-bg-danger-500",
    ring: "astralis-ring-danger-500",
    text: "astralis-text-white",
  },
  neutral: {
    bg: "astralis-bg-gray-400",
    ring: "astralis-ring-gray-400",
    text: "astralis-text-white",
  },
};

/* ------------------------------------------------------------------ */
/* Size map                                                             */
/* ------------------------------------------------------------------ */

const sizeMap = {
  sm: {
    dot: "astralis-h-2 astralis-w-2",
    icon: "astralis-h-4 astralis-w-4 astralis-text-[8px]",
  },
  md: {
    dot: "astralis-h-3 astralis-w-3",
    icon: "astralis-h-6 astralis-w-6 astralis-text-[10px]",
  },
  lg: {
    dot: "astralis-h-4 astralis-w-4",
    icon: "astralis-h-8 astralis-w-8 astralis-text-[13px]",
  },
};

/* ------------------------------------------------------------------ */
/* Component                                                            */
/* ------------------------------------------------------------------ */

export function TimelineIndicator({
  icon,
  color = "primary",
  className = "",
  style,
}: TimelineIndicatorProps) {
  const { size, variant } = useTimeline();

  const isCustomCss = color && !colorMap[color];
  const tokens = colorMap[color] ?? colorMap.primary;

  const { dot, icon: iconSize } = sizeMap[size];

  if (icon) {
    /* Icon mode — larger circle with icon inside */
    const bgClass = isCustomCss ? "" : tokens.bg;
    const textClass = isCustomCss ? "astralis-text-white" : tokens.text;
    return (
      <div
        className={[
          "astralis-flex astralis-items-center astralis-justify-center astralis-rounded-full astralis-shrink-0",
          iconSize,
          variant === "outline"
            ? `astralis-bg-transparent astralis-ring-2 ${isCustomCss ? "" : tokens.ring}`
            : bgClass,
          textClass,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={isCustomCss ? { backgroundColor: color, ...style } : style}
      >
        {icon}
      </div>
    );
  }

  /* Dot mode */
  const variantClasses: Record<string, string> = {
    subtle: `${isCustomCss ? "" : tokens.bg} astralis-opacity-80`,
    outline: `astralis-bg-transparent astralis-ring-2 ${isCustomCss ? "" : tokens.ring}`,
    solid: `${isCustomCss ? "" : tokens.bg}`,
  };

  return (
    <div
      className={[
        "astralis-rounded-full astralis-shrink-0",
        dot,
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        isCustomCss
          ? variant === "outline"
            ? { boxShadow: `0 0 0 2px ${color}`, ...style }
            : { backgroundColor: color, ...style }
          : style
      }
    />
  );
}

TimelineIndicator.displayName = "TimelineIndicator";
