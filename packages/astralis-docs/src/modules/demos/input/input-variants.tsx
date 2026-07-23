"use client";

import { Input, Text, VStack } from "astralis-ui";

const variants = ["outline", "filled", "underline", "unstyled"] as const;

export function InputVariants() {
  return (
    <VStack gap="4" alignItems="stretch" w="full" maxW="xs">
      {variants.map((variant) => (
        <VStack key={variant} gap="1" alignItems="stretch">
          <Text as="span" size="xs" color="muted">{variant}</Text>
          <Input variant={variant} placeholder={`The ${variant} variant`} />
        </VStack>
      ))}
    </VStack>
  );
}
