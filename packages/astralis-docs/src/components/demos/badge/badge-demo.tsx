"use client";

import { Badge, HStack } from "astralis-ui";

export function BadgeDemo() {
  return (
    <HStack gap="2" wrap="wrap" justifyContent="center">
      <Badge colorScheme="green" variant="solid">Active</Badge>
      <Badge colorScheme="yellow">Pending</Badge>
      <Badge colorScheme="red" variant="surface">Failed</Badge>
      <Badge colorScheme="blue" variant="outline">Beta</Badge>
      <Badge>Default</Badge>
    </HStack>
  );
}
