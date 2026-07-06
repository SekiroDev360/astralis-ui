"use client";

import { Radio, VStack } from "astralis-ui";

export function RadioHorizontal() {
  return (
    <VStack gap="4" alignItems="start">
      <Radio.Group defaultValue="md" orientation="horizontal" colorScheme="teal">
        <Radio value="sm" size="sm">Small</Radio>
        <Radio value="md">Medium</Radio>
        <Radio value="lg" size="lg">Large</Radio>
      </Radio.Group>
      <Radio.Group defaultValue="a" orientation="horizontal" disabled>
        <Radio value="a">Disabled group</Radio>
        <Radio value="b">Also disabled</Radio>
      </Radio.Group>
    </VStack>
  );
}
