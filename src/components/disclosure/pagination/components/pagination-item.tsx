import { useCallback } from "react";
import type { PaginationItemProps } from "../pagination.types";
import { usePagination } from "../pagination.context";

export function PaginationItem({
  page,
  children,
}: PaginationItemProps) {
  const { page: activePage, setPage } = usePagination();
  const active = page === activePage;

  const handleClick = useCallback(() => {
    setPage(page);
  }, [page, setPage]);

  return (
    <li>
      <button
        type="button"
        aria-current={active ? "page" : undefined}
        data-state={active ? "active" : "inactive"}
        onClick={handleClick}
        className={[
          "astralis-h-8 astralis-min-w-8 astralis-px-3 astralis-flex astralis-items-center astralis-justify-center",
          "astralis-rounded-md astralis-text-sm astralis-font-medium astralis-cursor-pointer",
          "astralis-transition-all astralis-duration-200 astralis-outline-none focus-visible:astralis-ring-2 focus-visible:astralis-ring-primary-500 focus-visible:astralis-ring-offset-2",
          active
            ? "astralis-bg-primary-500 astralis-text-white astralis-shadow-sm"
            : "astralis-text-content-secondary hover:astralis-bg-surface-raised hover:astralis-text-content-primary",
        ].join(" ")}
      >
        {children}
      </button>
    </li>
  );
}
