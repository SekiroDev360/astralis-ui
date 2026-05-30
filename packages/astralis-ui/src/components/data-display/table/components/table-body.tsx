import { forwardRef } from "react";
import type { TableSectionProps } from "../table.types";
import { useTable } from "../table.context";

export const TableBody = forwardRef<HTMLTableSectionElement, TableSectionProps>(
  ({ className, ...props }, ref) => {
    const { variant } = useTable();

    return (
      <tbody
        ref={ref}
        className={[
          "astralis-divide-y astralis-divide-border-subtle",
          variant === "striped" &&
            "[&_tr:nth-child(even)]:astralis-bg-surface-sunken",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  },
);

TableBody.displayName = "TableBody";
