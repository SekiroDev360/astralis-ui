"use client";

import { PinInput, Text, VStack } from "astralis-ui";

export function PinInputMask() {
  return (
    <VStack gap="5" alignItems="start">
      <VStack gap="1" alignItems="start">
        <Text as="span" size="xs" color="muted">masked, 6 digits, filled</Text>
        <PinInput length={6} mask variant="filled" />
      </VStack>
      <VStack gap="1" alignItems="start">
        <Text as="span" size="xs" color="muted">alphanumeric, size lg</Text>
        <PinInput length={5} type="alphanumeric" size="lg" placeholder="•" />
      </VStack>
    </VStack>
  );
}
