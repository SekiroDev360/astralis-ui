import { createContext, useContext } from "react";

export interface PaginationContextValue {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
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
