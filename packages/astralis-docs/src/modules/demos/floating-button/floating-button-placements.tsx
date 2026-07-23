"use client";

import { FloatingButton } from "astralis-ui";

const anchors = [
  { placement: "top-left", colorScheme: "teal" },
  { placement: "center-top", colorScheme: "blue" },
  { placement: "top-right", colorScheme: "purple" },
  { placement: "bottom-left", colorScheme: "pink" },
  { placement: "center-bottom", colorScheme: "brand" },
  { placement: "bottom-right", colorScheme: "green" },
] as const;

/* One panel, six resting anchors — four corners plus the two edge midpoints.
   The transform scopes `fixed` to the panel; see floating-button-demo.tsx. */
export function FloatingButtonPlacements() {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-xl border border-stroke-subtle bg-surface-subtle [transform:translateZ(0)]">
      {anchors.map(({ placement, colorScheme }) => (
        <FloatingButton
          key={placement}
          placement={placement}
          colorScheme={colorScheme}
          offset="sm"
          size="xs"
          draggable={false}
          aria-label={placement}
        >
          {placement}
        </FloatingButton>
      ))}
    </div>
  );
}
