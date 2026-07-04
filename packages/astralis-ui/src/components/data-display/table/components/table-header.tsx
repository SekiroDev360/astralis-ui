import type { TableSectionProps } from "../table.types";
import { useTable } from "../table.context";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function TableHeader({ children, className = "", ...rest }: TableSectionProps) {
  const { stickyHeader } = useTable();
  return (
    <thead
      className={astralisMerge(
        "astralis:bg-surface-muted astralis:border-b astralis:border-stroke-base",
        stickyHeader ? "astralis:sticky astralis:top-0 astralis:z-10" : "",
        className,
      )}
      {...rest}
    >
      {children}
    </thead>
  );
}
