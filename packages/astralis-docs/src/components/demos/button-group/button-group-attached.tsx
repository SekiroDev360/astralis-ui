"use client";

import { Button, ButtonGroup, Icon, VStack } from "astralis-ui";
import { AlignLeft, AlignCenter, AlignRight, ChevronLeft, ChevronRight } from "lucide-react";

export function ButtonGroupAttached() {
  return (
    <VStack gap="4">
      <ButtonGroup attached variant="outline" colorScheme="gray">
        <Button leftIcon={<Icon as={AlignLeft} size="xs" />} aria-label="Align left" />
        <Button leftIcon={<Icon as={AlignCenter} size="xs" />} aria-label="Align center" />
        <Button leftIcon={<Icon as={AlignRight} size="xs" />} aria-label="Align right" />
      </ButtonGroup>

      <ButtonGroup attached variant="subtle">
        <Button leftIcon={<Icon as={ChevronLeft} size="xs" />}>Previous</Button>
        <Button rightIcon={<Icon as={ChevronRight} size="xs" />}>Next</Button>
      </ButtonGroup>
    </VStack>
  );
}
