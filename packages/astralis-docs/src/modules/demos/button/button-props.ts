import type { PropRow } from "@/modules/docs/props-table";

/** Keep in sync with packages/astralis-ui/src/components/buttons/button/button.types.ts */
export const buttonProps: PropRow[] = [
  {
    prop: "variant",
    type: `"solid" | "subtle" | "surface" | "outline" | "text" | "link"`,
    default: `"solid"`,
    description:
      "Visual style. surface is the bordered sibling of subtle; text is the ghost style.",
  },
  {
    prop: "colorScheme",
    type: `"brand" | "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "cyan" | "purple" | "pink"`,
    default: `"brand"`,
    description: "Hue the variant paints with. Use gray for a neutral button.",
  },
  {
    prop: "size",
    type: `"xs" | "sm" | "md" | "lg" | "xl"`,
    default: `"md"`,
    description: "Height, padding, font size and icon gap scale together.",
  },
  {
    prop: "rounded",
    type: `"none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"`,
    default: `"lg"`,
    description: "Corner radius.",
  },
  {
    prop: "fullWidth",
    type: "boolean",
    default: "false",
    description: "Stretches the button to fill its container.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description:
      "Disables the button. On non-button elements this maps to aria-disabled and removes it from the tab order.",
  },
  {
    prop: "loading",
    type: "boolean",
    default: "false",
    description: "Shows a spinner and disables interaction.",
  },
  {
    prop: "loadingText",
    type: "ReactNode",
    description: "Replaces the label while loading (e.g. “Saving…”); the spinner still shows.",
  },
  {
    prop: "loaderPlacement",
    type: `"start" | "end"`,
    default: `"start"`,
    description: "Which side the spinner renders on.",
  },
  {
    prop: "loader",
    type: "ReactNode",
    description: "Custom spinner element, replacing the built-in one.",
  },
  {
    prop: "leftIcon",
    type: "ReactNode",
    description: "Icon rendered before the label. With no label the button becomes icon-only.",
  },
  {
    prop: "rightIcon",
    type: "ReactNode",
    description: "Icon rendered after the label.",
  },
  {
    prop: "as",
    type: "ElementType",
    default: `"button"`,
    description:
      "Element or component to render. Forwarded HTML props follow the chosen element automatically.",
  },
];
