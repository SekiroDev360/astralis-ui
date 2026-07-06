"use client";

import { Switch, HStack, VStack } from "astralis-ui";

export function SwitchStates() {
  return (
    <VStack gap="4" alignItems="start">
      <HStack gap="5">
        <Switch size="sm" defaultChecked>sm</Switch>
        <Switch size="md" defaultChecked>md</Switch>
        <Switch size="lg" defaultChecked>lg</Switch>
      </HStack>
      <HStack gap="5">
        <Switch colorScheme="green" defaultChecked>green</Switch>
        <Switch colorScheme="orange" defaultChecked>orange</Switch>
        <Switch disabled>disabled</Switch>
        <Switch disabled defaultChecked>disabled on</Switch>
      </HStack>
    </VStack>
  );
}
