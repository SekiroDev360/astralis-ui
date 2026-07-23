import type { PropRow } from "@/modules/docs/props-table";

/** Keep in sync with text.types.ts / text.styles.ts */
export const textProps: PropRow[] = [
  {
    prop: "size",
    type: `"xs" – "9xl" (type scale)`,
    default: `"md"`,
    description: "Font size token.",
  },
  {
    prop: "weight",
    type: `"thin" | "extralight" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black"`,
    description: "Font weight token.",
  },
  {
    prop: "color",
    type: `"base" | "muted" | "subtle" | "inverted" | status tokens | palette shades`,
    default: `"base"`,
    description: "Text color from semantic roles or raw palette shades.",
  },
  {
    prop: "align",
    type: `"left" | "center" | "right" | "justify"`,
    description: "Text alignment.",
  },
  {
    prop: "casing",
    type: `"uppercase" | "lowercase" | "capitalize" | "normal"`,
    description: "Text transform.",
  },
  {
    prop: "lineHeight",
    type: `"none" | "tight" | "snug" | "normal" | "relaxed" | "loose"`,
    description: "Leading token.",
  },
  {
    prop: "letterSpacing",
    type: `"tighter" | "tight" | "normal" | "wide" | "wider" | "widest"`,
    description: "Tracking token.",
  },
  {
    prop: "fontFamily",
    type: `"heading" | "body" | "sans" | "serif" | "mono"`,
    description: "Font family token.",
  },
  {
    prop: "fontStyle · textDecoration",
    type: `"italic" · "underline" | "line-through" | "overline" | "none"`,
    description: "Style and decoration.",
  },
  {
    prop: "truncate",
    type: "boolean",
    default: "false",
    description: "Single-line ellipsis overflow.",
  },
  {
    prop: "lineClamp",
    type: `"1" – "6"`,
    description: "Multi-line clamp with ellipsis (ignored when truncate is set).",
  },
  {
    prop: "gutterBottom · paragraph",
    type: "boolean",
    default: "false",
    description: "Rhythm helpers — small / paragraph-sized bottom margin (paragraph also forces a <p>).",
  },
  {
    prop: "as",
    type: "ElementType",
    default: `"p"`,
    description: "Rendered element — span, label, figcaption, …",
  },
];
