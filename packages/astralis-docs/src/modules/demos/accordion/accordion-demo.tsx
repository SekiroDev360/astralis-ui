"use client";

import { Accordion, Box } from "astralis-ui";

export function AccordionDemo() {
  return (
    <Box w="full" maxW="md">
      <Accordion type="single" defaultValue="tokens" collapsible>
        <Accordion.Item value="tokens">
          <Accordion.Trigger>What are semantic tokens?</Accordion.Trigger>
          <Accordion.Content>
            Named colors like surface, label and stroke that resolve differently
            in light and dark mode — components never reference raw hex values.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="build">
          <Accordion.Trigger>Do I need a build step?</Accordion.Trigger>
          <Accordion.Content>
            No. The library ships precompiled CSS — import one stylesheet and
            every component works.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="theming">
          <Accordion.Trigger>How does brand theming work?</Accordion.Trigger>
          <Accordion.Content>
            Pass a brand color to AstralisProvider and the full shade scale is
            generated at runtime.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Box>
  );
}
