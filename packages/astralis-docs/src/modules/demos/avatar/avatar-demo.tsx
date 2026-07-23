"use client";

import { Avatar, HStack } from "astralis-ui";

export function AvatarDemo() {
  return (
    <HStack gap="3">
      {/* Initials with a hue derived deterministically from the name. */}
      <Avatar name="Nova Starling" />
      <Avatar name="Alex Kim" />
      <Avatar name="Maria Lopez" />
      {/* No name, no image → icon fallback. */}
      <Avatar />
      <Avatar name="Sam Patel">
        <Avatar.Badge status="online" />
      </Avatar>
    </HStack>
  );
}
