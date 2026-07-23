"use client";

import { Steps, Text, VStack } from "astralis-ui";

const variants = ["solid", "subtle", "dot"] as const;

export function StepsVariants() {
  return (
    <VStack gap="6" alignItems="stretch" w="full" maxW="md">
      {variants.map((variant) => (
        <VStack key={variant} gap="2" alignItems="stretch">
          <Text as="span" size="xs" color="muted">{variant}</Text>
          <Steps variant={variant} defaultStep={1} size="sm">
            <Steps.List>
              <Steps.Item>
                <Steps.Indicator />
                <Steps.Title>Done</Steps.Title>
              </Steps.Item>
              <Steps.Item>
                <Steps.Indicator />
                <Steps.Title>Active</Steps.Title>
              </Steps.Item>
              <Steps.Item>
                <Steps.Indicator />
                <Steps.Title>Upcoming</Steps.Title>
              </Steps.Item>
            </Steps.List>
          </Steps>
        </VStack>
      ))}
    </VStack>
  );
}
