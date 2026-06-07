import { useCallback, useMemo, useState } from "react";
import { PaginationContext } from "../pagination.context";
import type { PaginationProps } from "../pagination.types";

export function PaginationRoot({
  page: controlledPage,
  defaultPage = 1,
  totalPages,
  onPageChange,
  variant = "solid",
  size = "md",
  rounded = "md",
  disabled = false,
  children,
}: PaginationProps) {
  const [uncontrolledPage, setUncontrolledPage] = useState(defaultPage);
  const page = controlledPage ?? uncontrolledPage;
  const setPage = useCallback(
    (next: number) => {
      if (disabled) return;
      const clamped = Math.min(Math.max(1, next), totalPages);
      if (controlledPage === undefined) {
        setUncontrolledPage(clamped);
      }
      onPageChange?.(clamped);
    },
    [controlledPage, totalPages, onPageChange, disabled],
  );
  const contextValue = useMemo(
    () => ({ page, totalPages, setPage, variant, size, rounded, disabled }),
    [page, totalPages, setPage, variant, size, rounded, disabled],
  );
  return (
    <PaginationContext.Provider value={contextValue}>
      <nav
        aria-label="Pagination"
        aria-disabled={disabled || undefined}
        className="astralis-flex astralis-justify-center"
      >
        {children}
      </nav>
    </PaginationContext.Provider>
  );
}
