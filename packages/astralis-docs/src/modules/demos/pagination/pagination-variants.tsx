"use client";

import { Pagination, Text, VStack } from "astralis-ui";

const variants = ["solid", "outline", "subtle", "plain"] as const;

export function PaginationVariants() {
  return (
    <VStack gap="5" alignItems="start">
      {variants.map((variant) => (
        <VStack key={variant} gap="1" alignItems="start">
          <Text as="span" size="xs" color="muted">{variant}</Text>
          <Pagination totalPages={5} defaultPage={2} variant={variant} size="sm">
            <Pagination.List>
              <Pagination.Prev />
              <Pagination.Pages />
              <Pagination.Next />
            </Pagination.List>
          </Pagination>
        </VStack>
      ))}
    </VStack>
  );
}
