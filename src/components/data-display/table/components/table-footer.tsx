import { forwardRef } from "react";
import type { TableSectionProps } from "../table.types";

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  TableSectionProps
>(({ className, ...props }, ref) => {
  return (
    <tfoot
      ref={ref}
      className={[
        "astralis-bg-surface-sunken astralis-border-t astralis-border-subtle astralis-font-medium",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
});

TableFooter.displayName = "TableFooter";
