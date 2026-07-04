import type { TableSectionProps } from "../table.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function TableBody({ children, className = "", ...rest }: TableSectionProps) {
  return (
    <tbody className={astralisMerge("astralis:divide-y astralis:divide-stroke-subtle", className)} {...rest}>
      {children}
    </tbody>
  );
}
