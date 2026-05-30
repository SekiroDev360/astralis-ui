import { forwardRef } from "react";
import type { TableRowProps } from "../table.types";
import { useTable } from "../table.context";

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected, ...props }, ref) => {
    const { hoverable } = useTable();
    return (
      <tr
        ref={ref}
        className={[
          "astralis-transition-colors",
          hoverable && "hover:astralis-bg-surface-raised",
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
