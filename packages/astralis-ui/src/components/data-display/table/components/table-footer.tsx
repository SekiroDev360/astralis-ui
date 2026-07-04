import type { TableSectionProps } from "../table.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function TableFooter({ children, className = "", ...rest }: TableSectionProps) {
  return (
    <tfoot className={astralisMerge("astralis:bg-surface-muted astralis:border-t astralis:border-stroke-base astralis:font-medium", className)} {...rest}>
      {children}
    </tfoot>
  );
}
