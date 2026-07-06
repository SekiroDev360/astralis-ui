import type { PropRow } from "@/components/docs/props-table";

/** Keep in sync with tabs.types.ts */
export const tabsProps: PropRow[] = [
  {
    prop: "value · defaultValue · onValueChange",
    type: "string · string · (value: string) => void",
    description: "Controlled / initial tab, and the change callback.",
  },
  {
    prop: "variant",
    type: `"line" | "subtle" | "segmented" | "outline" | "plain"`,
    default: `"line"`,
    description: "Underline with sliding indicator, filled pill, raised track, folder tabs, or minimal.",
  },
  {
    prop: "size",
    type: `"sm" | "md" | "lg"`,
    default: `"md"`,
    description: "Trigger padding and text size.",
  },
  {
    prop: "orientation",
    type: `"horizontal" | "vertical"`,
    default: `"horizontal"`,
    description: "Layout and arrow-key axis.",
  },
  {
    prop: "fitted",
    type: "boolean",
    default: "false",
    description: "Stretch triggers to fill the list width.",
  },
  {
    prop: "rounded",
    type: "boolean",
    default: "false",
    description: "Pill radii for the subtle/segmented/outline variants.",
  },
  {
    prop: "activationMode",
    type: `"automatic" | "manual"`,
    default: `"automatic"`,
    description: "Whether arrow-key focus selects immediately, or Enter/Space confirms.",
  },
  {
    prop: "keepMounted",
    type: "boolean",
    default: "false",
    description: "Hide inactive panels instead of unmounting them.",
  },
  {
    prop: "loop",
    type: "boolean",
    default: "true",
    description: "Arrow-key focus wraps around the ends.",
  },
];

export const tabsPartsProps: PropRow[] = [
  {
    prop: "Tabs.Trigger",
    type: "value: string · disabled?: boolean",
    description: "One tab button; value links it to its panel.",
  },
  {
    prop: "Tabs.Content",
    type: "value: string",
    description: "The panel shown while its value is active.",
  },
];
