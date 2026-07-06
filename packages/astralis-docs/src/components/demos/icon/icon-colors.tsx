"use client";

import { Icon, Text, HStack, VStack } from "astralis-ui";
import { Heart, CircleCheck, TriangleAlert, Info } from "lucide-react";

export function IconColors() {
  return (
    <VStack gap="4">
      <HStack gap="4">
        <Icon as={CircleCheck} color="success" />
        <Icon as={TriangleAlert} color="warning" />
        <Icon as={Heart} color="error" />
        <Icon as={Info} color="info" />
        <Icon as={Heart} color="muted" />
      </HStack>
      {/* Without a color prop, icons inherit the surrounding text color. */}
      <Text color="subtle" size="sm">
        <Icon as={Heart} size="xs" /> inherits via currentColor
      </Text>
    </VStack>
  );
}
