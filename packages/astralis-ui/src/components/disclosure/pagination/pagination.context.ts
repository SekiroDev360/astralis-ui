import { createContext, useContext } from "react";
import type { PaginationVariant, PaginationSize, PaginationRounded } from "./pagination.types";

export interface PaginationContextValue {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  /** Present when the consumer supplied `count` (for item-range text). */
  count?: number;
  pageSize?: number;
  variant: PaginationVariant;
  size: PaginationSize;
  rounded: PaginationRounded;
  disabled: boolean;
}

export const PaginationContext = createContext<PaginationContextValue | null>(null);

export function usePagination(): PaginationContextValue {
  const ctx = useContext(PaginationContext);
  if (!ctx) throw new Error("Pagination sub-components must be used within <Pagination>");
  return ctx;
}
