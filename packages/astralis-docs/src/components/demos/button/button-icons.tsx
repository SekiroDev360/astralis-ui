"use client";

import { Button, Icon, HStack } from "astralis-ui";
import { Search, ChevronDown, Settings, Trash2 } from "lucide-react";

export function ButtonIcons() {
  return (
    <HStack gap="3" wrap="wrap" justifyContent="center">
      <Button leftIcon={<Icon as={Search} size="xs" />}>Search</Button>
      <Button variant="outline" rightIcon={<Icon as={ChevronDown} size="xs" />}>
        Open menu
      </Button>
      {/* Icon-only buttons need an aria-label for assistive tech. */}
      <Button variant="subtle" leftIcon={<Icon as={Settings} size="xs" />} aria-label="Settings" />
      <Button
        variant="subtle"
        colorScheme="red"
        leftIcon={<Icon as={Trash2} size="xs" />}
        aria-label="Delete"
      />
    </HStack>
  );
}
