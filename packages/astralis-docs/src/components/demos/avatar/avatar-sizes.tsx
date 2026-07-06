"use client";

import { Avatar, HStack } from "astralis-ui";

const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

export function AvatarSizes() {
  return (
    <HStack gap="4" alignItems="end" wrap="wrap" justifyContent="center">
      {sizes.map((size) => (
        <Avatar key={size} name="Nova Starling" size={size} />
      ))}
      <Avatar name="Nova Starling" shape="rounded" />
      <Avatar name="Nova Starling" shape="square" />
    </HStack>
  );
}
