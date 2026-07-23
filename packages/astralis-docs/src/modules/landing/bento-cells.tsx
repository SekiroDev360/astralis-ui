"use client";

import { ThemeToggle, Button, Box, Text, HStack } from "astralis-ui";

export function BentoInteractive() {
  return <ThemeToggle showLabel variant="outline" colorScheme="gray" />;
}

const schemes = ["brand", "red", "orange", "green", "teal", "blue", "purple", "pink"] as const;

export function BentoSchemeCell() {
  return (
    <HStack gap="2" wrap="wrap">
      {schemes.map((scheme) => (
        <Button key={scheme} size="xs" variant="subtle" colorScheme={scheme}>
          {scheme}
        </Button>
      ))}
    </HStack>
  );
}

export function BentoResponsiveCell() {
  return (
    <HStack gap="3" alignItems="center" w="full">
      <Box
        bg={{ base: "brand-subtle", md: "brand-solid" }}
        rounded={{ base: "md", md: "full" }}
        p={{ base: "3", md: "4" }}
      />
      <Text as="span" size="sm" color="muted">
        {"p={{ base: '3', md: '4' }}"} — this box changes at the md breakpoint.
      </Text>
    </HStack>
  );
}
