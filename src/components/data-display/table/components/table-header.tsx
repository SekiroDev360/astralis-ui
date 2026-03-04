import { forwardRef } from "react";
import type { TableSectionProps } from "../table.types";
import { useTable } from "../table.context";

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableSectionProps
>(({ className, style, ...props }, ref) => {
  const { stickyHeader } = useTable();

  return (
    <thead
      ref={ref}
      style={
        stickyHeader
          ? { position: "sticky", top: 0, zIndex: 3, ...style }
          : style
      }
      className={[
        "astralis-bg-surface-sunken astralis-text-content-secondary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
});

TableHeader.displayName = "TableHeader";
