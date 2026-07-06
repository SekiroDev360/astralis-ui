"use client";

import { useState } from "react";
import { Accordion, Button, ButtonGroup, VStack } from "astralis-ui";

export function AccordionControlled() {
  const [open, setOpen] = useState<string | string[]>("shipping");

  return (
    <VStack gap="4" alignItems="stretch" w="full" maxW="md">
      <ButtonGroup size="sm" variant="outline" colorScheme="gray">
        <Button onClick={() => setOpen("shipping")}>Open shipping</Button>
        <Button onClick={() => setOpen("returns")}>Open returns</Button>
        <Button onClick={() => setOpen("")}>Close all</Button>
      </ButtonGroup>

      <Accordion type="single" collapsible value={open} onValueChange={setOpen}>
        <Accordion.Item value="shipping">
          <Accordion.Trigger>Shipping</Accordion.Trigger>
          <Accordion.Content>Ships worldwide within 3–5 days.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="returns">
          <Accordion.Trigger>Returns</Accordion.Trigger>
          <Accordion.Content>Free returns within 30 days.</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </VStack>
  );
}
