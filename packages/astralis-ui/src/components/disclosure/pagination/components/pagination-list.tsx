import type { PaginationListProps } from "../pagination.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function PaginationList({ children, className = "" }: PaginationListProps) {
  return (
    <ul className={astralisMerge("astralis:flex astralis:items-center astralis:gap-1", className)}>
      {children}
    </ul>
  );
}
