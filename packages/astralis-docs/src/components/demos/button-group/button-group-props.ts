import type { PropRow } from "@/components/docs/props-table";

/** Keep in sync with packages/astralis-ui/src/components/buttons/button-group/button-group.types.ts */
export const buttonGroupProps: PropRow[] = [
  {
    prop: "orientation",
    type: `"horizontal" | "vertical"`,
    default: `"horizontal"`,
    description: "Lays the buttons out in a row or a column.",
  },
  {
    prop: "attached",
    type: "boolean",
    default: "false",
    description:
      "Welds the buttons into one segmented control: inner radii collapse and adjacent borders merge. spacing is ignored.",
  },
  {
    prop: "spacing",
    type: `"none" | "sm" | "md" | "lg"`,
    default: `"md"`,
    description: "Gap between buttons when not attached.",
  },
  {
    prop: "variant",
    type: `"solid" | "subtle" | "surface" | "outline" | "text" | "link"`,
    description: "Shared visual style pushed onto every child Button.",
  },
  {
    prop: "colorScheme",
    type: `"brand" | "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "cyan" | "purple" | "pink"`,
    description: "Shared hue pushed onto every child Button.",
  },
  {
    prop: "size",
    type: `"xs" | "sm" | "md" | "lg" | "xl"`,
    description: "Shared size pushed onto every child Button.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables every child Button at once.",
  },
];
