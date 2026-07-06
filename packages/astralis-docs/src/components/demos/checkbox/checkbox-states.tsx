"use client";

import { Checkbox, HStack, VStack } from "astralis-ui";

export function CheckboxStates() {
  return (
    <VStack gap="4" alignItems="start">
      <HStack gap="5">
        <Checkbox size="sm" defaultChecked>sm</Checkbox>
        <Checkbox size="md" defaultChecked>md</Checkbox>
        <Checkbox size="lg" defaultChecked>lg</Checkbox>
      </HStack>
      <HStack gap="5">
        <Checkbox colorScheme="green" defaultChecked>green</Checkbox>
        <Checkbox colorScheme="purple" defaultChecked>purple</Checkbox>
        <Checkbox indeterminate>indeterminate</Checkbox>
        <Checkbox disabled defaultChecked>disabled</Checkbox>
      </HStack>
    </VStack>
  );
}
