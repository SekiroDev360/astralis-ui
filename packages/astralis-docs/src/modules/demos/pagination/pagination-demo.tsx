"use client";

import { Pagination } from "astralis-ui";

export function PaginationDemo() {
  return (
    <Pagination totalPages={10} defaultPage={3}>
      <Pagination.List>
        <Pagination.Prev />
        <Pagination.Pages />
        <Pagination.Next />
      </Pagination.List>
    </Pagination>
  );
}
