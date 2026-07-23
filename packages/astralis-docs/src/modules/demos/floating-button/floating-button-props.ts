import type { PropRow } from "@/modules/docs/props-table";

/** Keep in sync with packages/astralis-ui/src/components/buttons/floating-button/floating-button.types.ts */
export const floatingButtonProps: PropRow[] = [
  {
    prop: "placement",
    type: `"bottom-right" | "bottom-left" | "top-right" | "top-left" | "center-bottom" | "center-top"`,
    default: `"bottom-right"`,
    description: "Anchor the button rests at until it is dragged — a corner or an edge midpoint.",
  },
  {
    prop: "offset",
    type: `"sm" | "md" | "lg"`,
    default: `"md"`,
    description: "Distance from the viewport edges at rest.",
  },
  {
    prop: "draggable",
    type: "boolean",
    default: "true",
    description: "Allow repositioning by pointer drag and arrow keys. Disable for a button that must stay put.",
  },
  {
    prop: "position",
    type: "{ x: number; y: number } | null",
    description:
      "Controlled position in viewport pixels. Pass with onPositionChange to own the position yourself; omit to let the button track it internally.",
  },
  {
    prop: "onPositionChange",
    type: "(position: { x: number; y: number }) => void",
    description: "Fires on every drag frame, and on keyboard repositioning.",
  },
  {
    prop: "onPositionCommit",
    type: "(position: { x: number; y: number }) => void",
    description: "Fires once when a drag ends — the right hook for persisting a position.",
  },
  {
    prop: "edgePadding",
    type: "number",
    default: "8",
    description: "Clearance kept between the button and the viewport edges when clamping.",
  },
  {
    prop: "dragThreshold",
    type: "number",
    default: "4",
    description:
      "Pointer travel (px) before a press becomes a drag. Below it the gesture is still a click, so a shaky tap does not swallow the action.",
  },
  {
    prop: "wrapperClassName",
    type: "string",
    description: "Class for the fixed wrapper element; className still targets the button itself.",
  },
];
