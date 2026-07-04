import type { StatValueProps } from "../stat.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function StatValue({ children, className = "" }: StatValueProps) {
  return (
    <span className={astralisMerge("astralis:text-3xl astralis:font-semibold astralis:text-label-base astralis:tabular-nums", className)}>
      {children}
    </span>
  );
}
