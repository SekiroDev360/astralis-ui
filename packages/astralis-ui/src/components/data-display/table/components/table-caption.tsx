import { forwardRef } from "react";
import type { TableCaptionProps } from "../table.types";

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, placement = "bottom", ...props }, ref) => {
  return (
    <caption
      ref={ref}
      className={[
        "astralis-mt-4 astralis-text-sm astralis-text-content-secondary",
        placement === "top"
          ? "astralis-caption-top"
          : "astralis-caption-bottom",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
});

TableCaption.displayName = "TableCaption";
