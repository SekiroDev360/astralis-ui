"use client";

import { Accordion, Box } from "astralis-ui";

export function AccordionMultiple() {
  return (
    <Box w="full" maxW="md">
      <Accordion type="multiple" defaultValue={["a", "b"]} variant="separated">
        <Accordion.Item value="a">
          <Accordion.Trigger>Open by default</Accordion.Trigger>
          <Accordion.Content>Several items can be open at once.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="b">
          <Accordion.Trigger>Also open by default</Accordion.Trigger>
          <Accordion.Content>defaultValue takes an array in multiple mode.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="c">
          <Accordion.Trigger>Closed until clicked</Accordion.Trigger>
          <Accordion.Content>Opening this one closes nothing else.</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Box>
  );
}
