import type { StatLabelProps } from "../stat.types";
import { useStat } from "../stat.context";

const SIZE_TEXT = {
  sm: "astralis-text-xs",
  md: "astralis-text-sm",
  lg: "astralis-text-base",
};

export function StatLabel({
  children,
  info,
  className = "",
  style,
}: StatLabelProps) {
  const { size } = useStat();
  return (
    <p
      className={[
        "astralis-font-medium astralis-text-content-secondary astralis-inline-flex astralis-items-center astralis-gap-1",
        SIZE_TEXT[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
      {info && (
        <span
          title={info}
          className="astralis-inline-flex astralis-items-center astralis-justify-center astralis-h-3.5 astralis-w-3.5 astralis-rounded-full astralis-bg-gray-200 dark:astralis-bg-gray-700 astralis-text-gray-500 dark:astralis-text-gray-400 astralis-text-[9px] astralis-font-bold astralis-cursor-help astralis-shrink-0"
        >
          ?
        </span>
      )}
    </p>
  );
}
StatLabel.displayName = "StatLabel";
