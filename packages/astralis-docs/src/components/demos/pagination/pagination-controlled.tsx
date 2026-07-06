"use client";

import { useState } from "react";
import { Pagination, Text, VStack } from "astralis-ui";

export function PaginationControlled() {
  const [page, setPage] = useState(1);

  return (
    <VStack gap="3">
      <Pagination totalPages={8} page={page} onPageChange={setPage} variant="subtle">
        <Pagination.List>
          <Pagination.Prev />
          <Pagination.Pages />
          <Pagination.Next />
          <Pagination.PageText />
        </Pagination.List>
      </Pagination>
      <Text size="sm" color="muted">
        Fetching results for page {page}…
      </Text>
    </VStack>
  );
}
