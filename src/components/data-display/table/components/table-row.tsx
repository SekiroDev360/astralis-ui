import { forwardRef } from "react";
import type { TableRowProps } from "../table.types";

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={[
          "astralis-transition-colors hover:astralis-bg-surface-raised",
          selected &&
            "astralis-bg-primary-50 dark:astralis-bg-primary-950 hover:astralis-bg-primary-100 dark:hover:astralis-bg-primary-900",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  },
);

TableRow.displayName = "TableRow";
