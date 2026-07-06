"use client";

import { Accordion, Text, VStack } from "astralis-ui";

const variants = ["enclosed", "outline", "separated", "subtle", "plain"] as const;

export function AccordionVariants() {
  return (
    <VStack gap="6" alignItems="stretch" w="full" maxW="md">
      {variants.map((variant) => (
        <VStack key={variant} gap="2" alignItems="stretch">
          <Text as="span" size="xs" weight="medium" color="muted">
            {variant}
          </Text>
          <Accordion variant={variant} type="single" defaultValue="one" collapsible>
            <Accordion.Item value="one">
              <Accordion.Trigger>First section</Accordion.Trigger>
              <Accordion.Content>Content of the first section.</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="two">
              <Accordion.Trigger>Second section</Accordion.Trigger>
              <Accordion.Content>Content of the second section.</Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </VStack>
      ))}
    </VStack>
  );
}
