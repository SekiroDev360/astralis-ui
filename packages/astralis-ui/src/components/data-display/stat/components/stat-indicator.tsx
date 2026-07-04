import type { StatIndicatorProps } from "../stat.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function StatIndicator({ type = "increase", children, className = "" }: StatIndicatorProps) {
  const isIncrease = type === "increase";
  return (
    <span
      className={astralisMerge(
        "astralis:inline-flex astralis:items-center astralis:gap-1 astralis:text-sm astralis:font-medium",
        isIncrease ? "astralis:text-green-solid" : "astralis:text-red-solid",
        className,
      )}
    >
      <span aria-hidden>{isIncrease ? "▲" : "▼"}</span>
      {children}
    </span>
  );
}
