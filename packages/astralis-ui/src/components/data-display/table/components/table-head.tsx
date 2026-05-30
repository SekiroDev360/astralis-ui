import { forwardRef } from "react";
import type { TableHeadProps } from "../table.types";
import { useTable } from "../table.context";

const sizeClasses = {
  sm: "astralis-px-3 astralis-py-2",
  md: "astralis-px-4 astralis-py-3",
  lg: "astralis-px-6 astralis-py-4",
};

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
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
            zIndex: 2,
            ...style,
          }
        : sticky === "right"
          ? {
              right: stickyOffset,
              position: "sticky" as const,
              zIndex: 2,
              ...style,
            }
          : style;

    return (
      <th
        ref={ref}
        style={stickyStyle}
        className={[
          "astralis-align-middle astralis-font-medium astralis-text-content-secondary astralis-bg-surface-sunken",
          isNumeric ? "astralis-text-right" : "astralis-text-left",
          sizeClasses[size],
          columnBorder &&
            "astralis-border-r astralis-border-border-subtle last:astralis-border-r-0",
          sticky &&
            "astralis-shadow-[inset_-1px_0_0_0] astralis-shadow-border-subtle",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  },
);

TableHead.displayName = "TableHead";
