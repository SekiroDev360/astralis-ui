"use client";

import { Tooltip, Button, HStack } from "astralis-ui";

const sides = ["top", "right", "bottom", "left"] as const;

export function TooltipSides() {
  return (
    <HStack gap="3" wrap="wrap" justifyContent="center">
      {sides.map((side) => (
        <Tooltip key={side} side={side} delay={100}>
          <Tooltip.Trigger>
            <Button variant="subtle" size="sm">{side}</Button>
          </Tooltip.Trigger>
          <Tooltip.Content withArrow>Anchored {side}</Tooltip.Content>
        </Tooltip>
      ))}
    </HStack>
  );
}
