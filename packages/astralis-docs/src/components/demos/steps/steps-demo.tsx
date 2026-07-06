"use client";

import { useState } from "react";
import { Steps, Text, Box, HStack, VStack } from "astralis-ui";

export function StepsDemo() {
  const [step, setStep] = useState(0);

  return (
    <VStack gap="6" alignItems="stretch" w="full" maxW="md">
      <Steps step={step} onStepChange={setStep}>
        <Steps.List>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Title>Account</Steps.Title>
          </Steps.Item>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Title>Shipping</Steps.Title>
          </Steps.Item>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Title>Confirm</Steps.Title>
          </Steps.Item>
        </Steps.List>

        <Box minH="16" pt="4">
          <Steps.Content index={0}>
            <Text size="sm" color="muted">Email and password.</Text>
          </Steps.Content>
          <Steps.Content index={1}>
            <Text size="sm" color="muted">Where should we ship?</Text>
          </Steps.Content>
          <Steps.Content index={2}>
            <Text size="sm" color="muted">Review your order.</Text>
          </Steps.Content>
          <Steps.Completed>
            <Text size="sm" color="success" weight="medium">Order placed — all steps complete.</Text>
          </Steps.Completed>
        </Box>

        <HStack gap="3">
          <Steps.Prev />
          <Steps.Next />
        </HStack>
      </Steps>
    </VStack>
  );
}
