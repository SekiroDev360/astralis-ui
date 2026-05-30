import type { StatValueProps } from "../stat.types";
import { useStat } from "../stat.context";

const SIZE_TEXT = {
  sm: "astralis-text-2xl",
  md: "astralis-text-3xl",
  lg: "astralis-text-4xl",
};
const SIZE_UNIT = {
  sm: "astralis-text-sm",
  md: "astralis-text-base",
  lg: "astralis-text-xl",
};

export function StatValue({
  children,
  prefix,
  suffix,
  className = "",
  style,
}: StatValueProps) {
  const { size } = useStat();
  return (
    <div
      className={[
        "astralis-flex astralis-items-baseline astralis-gap-1 astralis-font-bold astralis-text-content-primary astralis-leading-none",
        SIZE_TEXT[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {prefix && (
        <span
          className={[
            SIZE_UNIT[size],
            "astralis-text-content-secondary astralis-font-medium",
          ].join(" ")}
        >
          {prefix}
        </span>
      )}
      {children}
      {suffix && (
        <span
          className={[
            SIZE_UNIT[size],
            "astralis-text-content-secondary astralis-font-medium",
          ].join(" ")}
        >
          {suffix}
        </span>
      )}
    </div>
  );
}
StatValue.displayName = "StatValue";
