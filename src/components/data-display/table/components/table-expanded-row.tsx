import { forwardRef } from "react";
import type { TableExpandedRowProps } from "../table.types";
import { useTable } from "../table.context";

const sizeClasses = {
  sm: "astralis-px-3 astralis-py-2",
  md: "astralis-px-4 astralis-py-3",
  lg: "astralis-px-6 astralis-py-4",
};

export const TableExpandedRow = forwardRef<
  HTMLTableRowElement,
  TableExpandedRowProps
>(({ colSpan, className, children, ...props }, ref) => {
  const { size } = useTable();

  return (
    <tr
      ref={ref}
      className={["astralis-bg-surface-sunken", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <td
        colSpan={colSpan}
        className={[
          "astralis-align-top astralis-border-b astralis-border-border-subtle",
          sizeClasses[size],
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </td>
    </tr>
  );
});

TableExpandedRow.displayName = "TableExpandedRow";
