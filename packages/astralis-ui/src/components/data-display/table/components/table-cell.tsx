import { forwardRef } from "react";
import type { TableCellProps } from "../table.types";
import { useTable } from "../table.context";

const sizeClasses = {
  sm: "astralis-px-3 astralis-py-2",
  md: "astralis-px-4 astralis-py-3",
  lg: "astralis-px-6 astralis-py-4",
};

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    { className, isNumeric, sticky, stickyOffset = 0, style, ...props },
    ref,
  ) => {
    const { size, columnBorder } = useTable();

    const stickyStyle =
      sticky === "left"
        ? {
            left: stickyOffset,
            position: "sticky" as const,
            zIndex: 1,
            ...style,
          }
        : sticky === "right"
          ? {
              right: stickyOffset,
              position: "sticky" as const,
              zIndex: 1,
              ...style,
            }
          : style;

    return (
      <td
        ref={ref}
        style={stickyStyle}
        className={[
          "astralis-align-middle astralis-bg-inherit",
          isNumeric ? "astralis-text-right" : "astralis-text-left",
          sizeClasses[size],
          columnBorder &&
            "astralis-border-r astralis-border-border-subtle last:astralis-border-r-0",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  },
);

TableCell.displayName = "TableCell";
