import type { PaginationItemProps } from "../pagination.types";
import { usePagination } from "../pagination.context";
import { paginationItemVariants } from "../pagination.styles";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function PaginationItem({ page, children, className = "" }: PaginationItemProps) {
  const { page: activePage, setPage, variant, size, rounded, disabled } = usePagination();
  const active = page === activePage;

  return (
    <li>
      <button
        type="button"
        aria-label={`Go to page ${page}`}
        aria-current={active ? "page" : undefined}
        data-state={active ? "active" : "inactive"}
        disabled={disabled}
        onClick={() => setPage(page)}
        className={astralisMerge(paginationItemVariants({ size, rounded, variant, active }), className)}
      >
        {children}
      </button>
    </li>
  );
}
