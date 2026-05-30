import type { PaginationListProps } from "../pagination.types";

export function PaginationList({
  children,
}: PaginationListProps) {
  return (
    <ul className="astralis-flex astralis-items-center astralis-gap-1">
      {children}
    </ul>
  );
}
