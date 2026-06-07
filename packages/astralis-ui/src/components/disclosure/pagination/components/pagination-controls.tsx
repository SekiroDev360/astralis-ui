import { useCallback } from "react";
import type { PaginationControlProps } from "../pagination.types";
import { usePagination } from "../pagination.context";
import Icon from "../../../icon/icon";

const sizeMap = {
  xs: "astralis-h-7 astralis-w-7",
  sm: "astralis-h-8 astralis-w-8",
  md: "astralis-h-9 astralis-w-9",
  lg: "astralis-h-10 astralis-w-10",
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

const iconSizeMap = {
  xs: "xs" as const,
  sm: "xs" as const,
  md: "sm" as const,
  lg: "sm" as const,
};

export function PaginationPrev({ icon }: PaginationControlProps) {
  const { page, setPage, size, rounded, disabled } = usePagination();
  const isDisabled = disabled || page <= 1;

  const handleClick = useCallback(() => {
    setPage(page - 1);
  }, [page, setPage]);

  return (
    <li>
      <button
        type="button"
        aria-label="Previous page"
        disabled={isDisabled}
        onClick={handleClick}
        className={[
          "astralis-inline-flex astralis-items-center astralis-justify-center astralis-cursor-pointer",
          "astralis-text-label-muted hover:astralis-bg-surface-muted hover:astralis-text-label-base",
          "astralis-transition-all astralis-duration-200",
          "astralis-outline-none focus-visible:astralis-ring-2 focus-visible:astralis-ring-brand-600 focus-visible:astralis-ring-offset-2",
          "disabled:astralis-opacity-moderate disabled:astralis-cursor-not-allowed",
          sizeMap[size],
          roundedMap[rounded],
        ].join(" ")}
      >
        {icon ?? <Icon name="ChevronLeft" size={iconSizeMap[size]} />}
      </button>
    </li>
  );
}

export function PaginationNext({ icon }: PaginationControlProps) {
  const { page, totalPages, setPage, size, rounded, disabled } = usePagination();
  const isDisabled = disabled || page >= totalPages;

  const handleClick = useCallback(() => {
    setPage(page + 1);
  }, [page, setPage]);

  return (
    <li>
      <button
        type="button"
        aria-label="Next page"
        disabled={isDisabled}
        onClick={handleClick}
        className={[
          "astralis-inline-flex astralis-items-center astralis-justify-center astralis-cursor-pointer",
          "astralis-text-label-muted hover:astralis-bg-surface-muted hover:astralis-text-label-base",
          "astralis-transition-all astralis-duration-200",
          "astralis-outline-none focus-visible:astralis-ring-2 focus-visible:astralis-ring-brand-600 focus-visible:astralis-ring-offset-2",
          "disabled:astralis-opacity-moderate disabled:astralis-cursor-not-allowed",
          sizeMap[size],
          roundedMap[rounded],
        ].join(" ")}
      >
        {icon ?? <Icon name="ChevronRight" size={iconSizeMap[size]} />}
      </button>
    </li>
  );
}

export function PaginationFirst({ icon }: PaginationControlProps) {
  const { page, setPage, size, rounded, disabled } = usePagination();
  const isDisabled = disabled || page <= 1;

  const handleClick = useCallback(() => {
    setPage(1);
  }, [setPage]);

  return (
    <li>
      <button
        type="button"
        aria-label="First page"
        disabled={isDisabled}
        onClick={handleClick}
        className={[
          "astralis-inline-flex astralis-items-center astralis-justify-center astralis-cursor-pointer",
          "astralis-text-label-muted hover:astralis-bg-surface-muted hover:astralis-text-label-base",
          "astralis-transition-all astralis-duration-200",
          "astralis-outline-none focus-visible:astralis-ring-2 focus-visible:astralis-ring-brand-600 focus-visible:astralis-ring-offset-2",
          "disabled:astralis-opacity-moderate disabled:astralis-cursor-not-allowed",
          sizeMap[size],
          roundedMap[rounded],
        ].join(" ")}
      >
        {icon ?? <Icon name="ChevronsLeft" size={iconSizeMap[size]} />}
      </button>
    </li>
  );
}

export function PaginationLast({ icon }: PaginationControlProps) {
  const { page, totalPages, setPage, size, rounded, disabled } = usePagination();
  const isDisabled = disabled || page >= totalPages;

  const handleClick = useCallback(() => {

    setPage(totalPages);
  }, [setPage, totalPages]);

  return (
    <li>
      <button
        type="button"
        aria-label="Last page"
        disabled={isDisabled}
        onClick={handleClick}
        className={[
          "astralis-inline-flex astralis-items-center astralis-justify-center astralis-cursor-pointer",
          "astralis-text-label-muted hover:astralis-bg-surface-muted hover:astralis-text-label-base",
          "astralis-transition-all astralis-duration-200",
          "astralis-outline-none focus-visible:astralis-ring-2 focus-visible:astralis-ring-brand-600 focus-visible:astralis-ring-offset-2",
          "disabled:astralis-opacity-moderate disabled:astralis-cursor-not-allowed",
          sizeMap[size],
          roundedMap[rounded],
        ].join(" ")}
      >
        {icon ?? <Icon name="ChevronsRight" size={iconSizeMap[size]} />}
      </button>
    </li>
  );
}
