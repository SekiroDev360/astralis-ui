import type { PropRow } from "@/components/docs/props-table";

/** Keep in sync with accordion.types.ts */
export const accordionProps: PropRow[] = [
  {
    prop: "type",
    type: `"single" | "multiple"`,
    default: `"single"`,
    description: "One open item at a time, or any number.",
  },
  {
    prop: "variant",
    type: `"enclosed" | "outline" | "separated" | "subtle" | "plain"`,
    default: `"enclosed"`,
    description: "Container styling family.",
  },
  {
    prop: "size",
    type: `"sm" | "md" | "lg"`,
    default: `"md"`,
    description: "Trigger and content density.",
  },
  {
    prop: "colorScheme",
    type: `"gray" | "brand" | … (all 11 schemes)`,
    default: `"gray"`,
    description: "Accent hue for focus rings and highlights.",
  },
  {
    prop: "value · defaultValue",
    type: `string | string[]`,
    description: "Controlled / initial open item(s) — an array in multiple mode.",
  },
  {
    prop: "onValueChange",
    type: `(value: string | string[]) => void`,
    description: "Fires with the next open value(s).",
  },
  {
    prop: "collapsible",
    type: "boolean",
    default: "false",
    description: "In single mode, allows closing the open item.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables every item.",
  },
  {
    prop: "keepMounted",
    type: "boolean",
    default: "false",
    description: "Render content in the DOM before first open (SEO / heavy content).",
  },
  {
    prop: "indicator · indicatorPosition · hideIndicator",
    type: `ReactNode · "start" | "end" · boolean`,
    default: `chevron · "end" · false`,
    description: "Customize or hide the rotating open indicator.",
  },
  {
    prop: "headingLevel",
    type: "1 – 6",
    default: "3",
    description: "Heading level wrapping each trigger, for the document outline.",
  },
];

export const accordionItemProps: PropRow[] = [
  {
    prop: "value",
    type: "string",
    description: "Required — identifies the item in value/defaultValue.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables just this item.",
  },
];
