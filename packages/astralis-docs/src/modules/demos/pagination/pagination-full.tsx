"use client";

import { Pagination } from "astralis-ui";

export function PaginationFull() {
  return (
    /* Derive pages from an item count, pin boundaries, and add every control. */
    <Pagination count={195} pageSize={10} defaultPage={7} colorScheme="teal">
      <Pagination.List>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Pages siblings={1} boundaryCount={1} />
        <Pagination.Next />
        <Pagination.Last />
        <Pagination.Jumper />
      </Pagination.List>
    </Pagination>
  );
}
