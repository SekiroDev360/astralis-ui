import { useCallback } from "react";
import type { PaginationItemProps } from "../pagination.types";
import { usePagination } from "../pagination.context";

/* ------------------------------------------------------------------ */
/* Size maps                                                            */
/* ------------------------------------------------------------------ */
const sizeMap = {
  xs: "astralis-h-7 astralis-min-w-7 astralis-px-2 astralis-text-xs",
  sm: "astralis-h-8 astralis-min-w-8 astralis-px-2.5 astralis-text-sm",
  md: "astralis-h-9 astralis-min-w-9 astralis-px-3 astralis-text-sm",
  lg: "astralis-h-10 astralis-min-w-10 astralis-px-4 astralis-text-base",
};
const roundedMap = {
  none: "astralis-rounded-none",
  sm: "astralis-rounded-sm",
  md: "astralis-rounded-md",
  lg: "astralis-rounded-lg",
  xl: "astralis-rounded-xl",
  "2xl": "astralis-rounded-2xl",
  full: "astralis-rounded-full",
};
/* ------------------------------------------------------------------ */
/* Variant maps — active / inactive                                     */
/* ------------------------------------------------------------------ */
const variantActive = {
  solid: "astralis-bg-brand-600 astralis-text-white",
  outline:
    "astralis-border astralis-border-brand-600 astralis-text-brand-600 astralis-bg-transparent",
  subtle:
    "astralis-bg-surface-subtle astralis-text-brand-600 astralis-border astralis-border-base",
  plain:
    "astralis-text-brand-600 astralis-font-semibold astralis-bg-transparent",
};
const variantInactive = {
  solid:
    "astralis-text-label-base hover:astralis-bg-surface-muted hover:astralis-text-label-base",
  outline:
    "astralis-text-label-muted astralis-border astralis-border-transparent hover:astralis-border-base hover:astralis-text-label-base",
  subtle:
    "astralis-text-label-muted hover:astralis-bg-surface-subtle hover:astralis-text-label-base",
  plain:
    "astralis-text-label-muted hover:astralis-text-label-base astralis-bg-transparent",
};
export function PaginationItem({ page, children }: PaginationItemProps) {
  const {
    page: activePage,
    setPage,
    variant,
    size,
    rounded,
    disabled,
  } = usePagination();
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
        disabled={disabled}
        onClick={handleClick}
        className={[
          "astralis-inline-flex astralis-items-center astralis-justify-center astralis-font-medium astralis-cursor-pointer",
          "astralis-transition-all astralis-duration-200",
          "astralis-outline-none focus-visible:astralis-ring-2 focus-visible:astralis-ring-brand-600 focus-visible:astralis-ring-offset-2",
          "disabled:astralis-opacity-moderate disabled:astralis-cursor-not-allowed",
          sizeMap[size],
          roundedMap[rounded],
          active ? variantActive[variant] : variantInactive[variant],
        ].join(" ")}
      >
        {children}
      </button>
    </li>
  );
}
