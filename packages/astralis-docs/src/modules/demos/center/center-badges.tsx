"use client";

import { Center, Icon, HStack, Text } from "astralis-ui";
import { Star, Bell, Rocket } from "lucide-react";

export function CenterBadges() {
  return (
    /* The classic Center use: fixed-size icon chips. */
    <HStack gap="4">
      <Center size="12" bg="yellow-subtle" rounded="full">
        <Icon as={Star} size="sm" />
      </Center>
      <Center size="12" bg="red-subtle" rounded="xl">
        <Icon as={Bell} size="sm" />
      </Center>
      <Center size="12" bg="purple-solid" rounded="lg">
        <Icon as={Rocket} size="sm" color="inverted" />
      </Center>
      <Center px="3" h="8" bg="subtle" rounded="full">
        <Text size="xs">42 stars</Text>
      </Center>
    </HStack>
  );
}
