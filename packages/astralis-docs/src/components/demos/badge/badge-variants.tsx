"use client";

import { Badge, Text, HStack, VStack } from "astralis-ui";

const variants = ["solid", "subtle", "surface", "outline"] as const;
const sizes = ["xs", "sm", "md", "lg"] as const;

export function BadgeVariants() {
  return (
    <VStack gap="4" alignItems="start">
      <VStack gap="1" alignItems="start">
        <Text as="span" size="xs" color="subtle">variants</Text>
        <HStack gap="2">
          {variants.map((variant) => (
            <Badge key={variant} variant={variant} colorScheme="brand">{variant}</Badge>
          ))}
        </HStack>
      </VStack>
      <VStack gap="1" alignItems="start">
        <Text as="span" size="xs" color="subtle">sizes</Text>
        <HStack gap="2" alignItems="center">
          {sizes.map((size) => (
            <Badge key={size} size={size} colorScheme="teal">{size}</Badge>
          ))}
        </HStack>
      </VStack>
    </VStack>
  );
}
