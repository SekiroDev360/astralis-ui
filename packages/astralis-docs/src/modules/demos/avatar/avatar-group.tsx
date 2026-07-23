"use client";

import { Avatar } from "astralis-ui";

export function AvatarGroup() {
  return (
    /* Overlapping stack; everything past `max` collapses into "+N". */
    <Avatar.Group max={3}>
      <Avatar name="Nova Starling" />
      <Avatar name="Alex Kim" />
      <Avatar name="Maria Lopez" />
      <Avatar name="Sam Patel" />
      <Avatar name="Jo Ellis" />
    </Avatar.Group>
  );
}
