import { usePagination } from "../pagination.context";
import type { PaginationPageTextProps } from "../pagination.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

/** A live text readout of the current page (Chakra's PageText / Ant's showTotal). */
export function PaginationPageText({ className = "", format }: PaginationPageTextProps) {
  const { page, totalPages, count, pageSize } = usePagination();
  return (
    <li
      aria-live="polite"
      className={astralisMerge("astralis:px-2 astralis:text-sm astralis:tabular-nums astralis:text-label-muted", className)}
    >
      {format ? format({ page, totalPages, count, pageSize }) : `Page ${page} of ${totalPages}`}
    </li>
  );
}
