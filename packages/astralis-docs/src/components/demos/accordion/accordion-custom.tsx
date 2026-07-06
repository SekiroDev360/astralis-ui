"use client";

import { Accordion, Icon, Box } from "astralis-ui";
import { Plus } from "lucide-react";

export function AccordionCustom() {
  return (
    <Box w="full" maxW="md">
      <Accordion
        variant="outline"
        colorScheme="purple"
        indicator={<Icon as={Plus} size="xs" />}
        indicatorPosition="start"
        type="single"
        collapsible
      >
        <Accordion.Item value="one">
          <Accordion.Trigger>Custom indicator, leading position</Accordion.Trigger>
          <Accordion.Content>
            The indicator rotates as the item opens; colorScheme drives the
            focus ring and accents.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="two" disabled>
          <Accordion.Trigger>A disabled item</Accordion.Trigger>
          <Accordion.Content>Unreachable.</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Box>
  );
}
