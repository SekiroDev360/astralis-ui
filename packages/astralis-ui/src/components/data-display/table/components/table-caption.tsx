import type { Ref } from "react";
import type { TableCaptionProps } from "../table.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function TableCaption({
  className = "",
  placement = "bottom",
  ref,
  ...rest
}: TableCaptionProps & { ref?: Ref<HTMLTableCaptionElement> }) {
  return (
    <caption
      ref={ref}
      className={astralisMerge(
        "astralis:text-sm astralis:text-label-muted astralis:py-2",
        placement === "top" ? "astralis:caption-top" : "astralis:caption-bottom",
        className,
      )}
      {...rest}
    />
  );
}

TableCaption.displayName = "Table.Caption";
