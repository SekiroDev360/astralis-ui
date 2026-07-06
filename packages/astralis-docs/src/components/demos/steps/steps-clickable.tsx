"use client";

import { Steps, Box } from "astralis-ui";

export function StepsClickable() {
  return (
    /* clickable indicators jump straight to a step; labels sit beneath. */
    <Box w="full" maxW="md">
      <Steps clickable labelPlacement="bottom" defaultStep={1} variant="subtle">
        <Steps.List>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Title>Cart</Steps.Title>
          </Steps.Item>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Title>Payment</Steps.Title>
          </Steps.Item>
          <Steps.Item>
            <Steps.Indicator />
            <Steps.Title>Receipt</Steps.Title>
          </Steps.Item>
        </Steps.List>
      </Steps>
    </Box>
  );
}
