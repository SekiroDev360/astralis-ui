"use client";

import { FloatingButton, Icon, Text } from "astralis-ui";
import { MessageCircle } from "lucide-react";

/*
 * The `[transform:translateZ(0)]` on the panel is load-bearing: a transformed
 * ancestor becomes the containing block for `position: fixed`, so the button
 * pins to this panel instead of the real viewport. Dragging is disabled in
 * these contained demos — the drag math works in viewport coordinates, which a
 * containing block deliberately breaks. The assistant launcher on this site is
 * the free-range, draggable configuration.
 */
export function FloatingButtonDemo() {
  return (
    <div className="relative h-56 w-full max-w-md overflow-hidden rounded-xl border border-stroke-subtle bg-surface-subtle [transform:translateZ(0)]">
      <div className="flex flex-col gap-2 p-5">
        <Text size="xl" weight="medium">
          Your app
        </Text>
        <Text size="sm" color="muted">
          The button floats above the content, pinned to a corner.
        </Text>
      </div>
      <FloatingButton
        draggable={false}
        aria-label="Open chat"
        leftIcon={<Icon as={MessageCircle} size="sm" />}
      >
        Chat
      </FloatingButton>
    </div>
  );
}
