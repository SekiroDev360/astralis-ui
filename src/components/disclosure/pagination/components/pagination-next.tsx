import { useCallback } from "react";
import type { PaginationControlProps } from "../pagination.types";
import { usePagination } from "../pagination.context";
import Icon from "../../../icon/icon";

export function PaginationNext({
  children,
}: PaginationControlProps) {
  const { page, totalPages, setPage } = usePagination();

  const handleClick = useCallback(() => {
    setPage(page + 1);
  }, [page, setPage]);

  return (
    <li>
      <button
        type="button"
        aria-label="Next page"
        disabled={page >= totalPages}
        onClick={handleClick}
        className={[
          "astralis-h-8 astralis-w-8 astralis-flex astralis-items-center astralis-justify-center",
          "astralis-rounded-md astralis-text-content-secondary hover:astralis-bg-surface-raised hover:astralis-text-content-primary",
          "astralis-transition-all astralis-duration-200 astralis-outline-none focus-visible:astralis-ring-2 focus-visible:astralis-ring-primary-500 focus-visible:astralis-ring-offset-2",
          "disabled:astralis-opacity-40 disabled:astralis-cursor-not-allowed",
        ].join(" ")}
      >
        {children ?? <Icon name="ChevronRight" size="sm" />}
      </button>
    </li>
  );
}
