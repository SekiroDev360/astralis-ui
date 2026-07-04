import type { StatHelpTextProps } from "../stat.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function StatHelpText({ children, className = "" }: StatHelpTextProps) {
  return (
    <span className={astralisMerge("astralis:text-sm astralis:text-label-muted", className)}>{children}</span>
  );
}
