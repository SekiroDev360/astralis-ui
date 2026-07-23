"use client";

import { Icon, HStack } from "astralis-ui";
import { Rocket, Star, Compass, Orbit } from "lucide-react";

export function IconDemo() {
  return (
    <HStack gap="4">
      <Icon as={Rocket} />
      <Icon as={Star} />
      <Icon as={Compass} />
      <Icon as={Orbit} />
    </HStack>
  );
}
