"use client";

import { Button, Icon, HStack } from "astralis-ui";
import { Sparkles } from "lucide-react";

export function ButtonDemo() {
  return (
    <HStack gap="3" wrap="wrap" justifyContent="center">
      <Button leftIcon={<Icon as={Sparkles} size="xs" />}>Get started</Button>
      <Button variant="subtle">Learn more</Button>
      <Button variant="outline" colorScheme="gray">
        Cancel
      </Button>
    </HStack>
  );
}
