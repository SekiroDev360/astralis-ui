import { useCallback, useMemo, useState } from "react";
import { PaginationContext } from "../pagination.context";
import type { PaginationProps } from "../pagination.types";
import { astralisMerge } from "../../../../utils/astralis-merge";
import { accentClass } from "../../../../const/color-schemes";

export function PaginationRoot({
  page: controlledPage,
  defaultPage = 1,
  totalPages,
  count,
  pageSize = 10,
  onPageChange,
  variant = "solid",
  size = "md",
  rounded = "md",
  colorScheme = "brand",
  disabled = false,
  className = "",
  children,
}: PaginationProps) {
  // Pages come from `totalPages`, or are derived from `count` + `pageSize`.
  const resolvedTotal = Math.max(1, totalPages ?? Math.ceil((count ?? 0) / pageSize));

  const [uncontrolledPage, setUncontrolledPage] = useState(defaultPage);
  const page = controlledPage ?? uncontrolledPage;

  const setPage = useCallback(
    (next: number) => {
      if (disabled) return;
      const clamped = Math.min(Math.max(1, next), resolvedTotal);
      if (controlledPage === undefined) setUncontrolledPage(clamped);
      onPageChange?.(clamped);
    },
    [controlledPage, resolvedTotal, onPageChange, disabled],
  );

  const ctx = useMemo(
    () => ({ page, totalPages: resolvedTotal, setPage, count, pageSize, variant, size, rounded, disabled }),
    [page, resolvedTotal, setPage, count, pageSize, variant, size, rounded, disabled],
  );

  return (
    <PaginationContext.Provider value={ctx}>
      <nav
        aria-label="Pagination"
        aria-disabled={disabled || undefined}
        className={astralisMerge("astralis:flex astralis:justify-center", accentClass(colorScheme), className)}
      >
        {children}
      </nav>
    </PaginationContext.Provider>
  );
}
