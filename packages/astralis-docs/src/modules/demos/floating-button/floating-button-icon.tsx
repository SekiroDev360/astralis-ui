"use client";

import { FloatingButton, Icon } from "astralis-ui";
import { Plus, Pencil, ArrowUp } from "lucide-react";

/* Icon-only: with no label, Button gives the FAB a square frame, and the
   default `rounded="full"` turns it into the classic circle. */
export function FloatingButtonIcon() {
  return (
    <div className="relative h-56 w-full max-w-md overflow-hidden rounded-xl border border-stroke-subtle bg-surface-subtle [transform:translateZ(0)]">
      <FloatingButton
        placement="bottom-right"
        size="lg"
        draggable={false}
        aria-label="Create"
        leftIcon={<Icon as={Plus} size="md" />}
      />
      <FloatingButton
        placement="center-bottom"
        colorScheme="gray"
        variant="surface"
        draggable={false}
        aria-label="Compose"
        leftIcon={<Icon as={Pencil} size="sm" />}
      />
      <FloatingButton
        placement="bottom-left"
        size="sm"
        colorScheme="teal"
        draggable={false}
        aria-label="Back to top"
        leftIcon={<Icon as={ArrowUp} size="sm" />}
      />
    </div>
  );
}
