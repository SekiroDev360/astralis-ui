import type { StatLabelProps } from "../stat.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function StatLabel({ children, className = "" }: StatLabelProps) {
  return (
    <span className={astralisMerge("astralis:text-sm astralis:font-medium astralis:text-label-muted", className)}>
      {children}
    </span>
  );
}
