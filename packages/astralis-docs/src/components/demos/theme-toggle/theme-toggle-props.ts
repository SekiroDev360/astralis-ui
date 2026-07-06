import type { PropRow } from "@/components/docs/props-table";

/** Keep in sync with packages/astralis-ui/src/components/buttons/theme-toggle/theme-toggle.types.ts */
export const themeToggleProps: PropRow[] = [
  {
    prop: "showLabel",
    type: "boolean",
    default: "false",
    description:
      "Shows a text label next to the icon — “Light Mode” or “Dark Mode”, reflecting what a click switches to.",
  },
  {
    prop: "variant",
    type: `"solid" | "subtle" | "surface" | "outline" | "text" | "link"`,
    default: `"outline"`,
    description: "Inherited from Button — every Button variant works.",
  },
  {
    prop: "size",
    type: `"xs" | "sm" | "md" | "lg" | "xl"`,
    default: `"md"`,
    description: "Inherited from Button; the icon scales with it.",
  },
];
