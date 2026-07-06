"use client";

import { Select, Text, VStack } from "astralis-ui";

const options = [{ value: "one", label: "Option one" }];

export function SelectStates() {
  return (
    <VStack gap="4" alignItems="stretch" w="full" maxW="3xs">
      <VStack gap="1" alignItems="stretch">
        <Text as="span" size="xs" color="muted">filled variant</Text>
        <Select options={options} variant="filled" placeholder="Filled" />
      </VStack>
      <VStack gap="1" alignItems="stretch">
        <Text as="span" size="xs" color="muted">loading</Text>
        <Select options={[]} loading placeholder="Fetching options…" />
      </VStack>
      <VStack gap="1" alignItems="stretch">
        <Text as="span" size="xs" color="muted">invalid</Text>
        <Select options={options} invalid placeholder="Required field" />
      </VStack>
      <VStack gap="1" alignItems="stretch">
        <Text as="span" size="xs" color="muted">disabled</Text>
        <Select options={options} disabled placeholder="Unavailable" />
      </VStack>
    </VStack>
  );
}
