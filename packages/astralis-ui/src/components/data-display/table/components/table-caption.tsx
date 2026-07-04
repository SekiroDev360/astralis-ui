import { forwardRef } from "react";
import type { TableCaptionProps } from "../table.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className = "", placement = "bottom", ...rest }, ref) => (
    <caption
      ref={ref}
      className={astralisMerge(
        "astralis:text-sm astralis:text-label-muted astralis:py-2",
        placement === "top" ? "astralis:caption-top" : "astralis:caption-bottom",
        className,
      )}
      {...rest}
    />
  ),
);

TableCaption.displayName = "Table.Caption";
