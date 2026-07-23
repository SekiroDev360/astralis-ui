"use client";

import { Tooltip, Button, Icon } from "astralis-ui";
import { Wand2 } from "lucide-react";

export function TooltipDemo() {
  return (
    <Tooltip>
      <Tooltip.Trigger>
        <Button variant="outline" colorScheme="gray" leftIcon={<Icon as={Wand2} size="xs" />} aria-label="Auto-format" />
      </Tooltip.Trigger>
      <Tooltip.Content withArrow>Auto-format the document</Tooltip.Content>
    </Tooltip>
  );
}
