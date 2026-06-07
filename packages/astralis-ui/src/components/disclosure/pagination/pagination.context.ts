import { createContext, useContext } from "react";
import type { PaginationVariant, PaginationSize, PaginationRounded } from "./pagination.types";
export interface PaginationContextValue {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  variant: PaginationVariant;
  size: PaginationSize;
  rounded: PaginationRounded;
  disabled: boolean;
}
export const PaginationContext =
  createContext<PaginationContextValue | null>(null);
export function usePagination() {
  const ctx = useContext(PaginationContext);
  if (!ctx) {
    throw new Error(
      "Pagination components must be used within <Pagination>"
    );
  }
  return ctx;
}
