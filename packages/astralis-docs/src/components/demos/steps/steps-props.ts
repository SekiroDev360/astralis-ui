import type { PropRow } from "@/components/docs/props-table";

/** Keep in sync with steps.types.ts */
export const stepsProps: PropRow[] = [
  {
    prop: "step · defaultStep · onStepChange",
    type: "number · number · (step: number) => void",
    default: "— · 0 · —",
    description: "Controlled / initial step (0-based), and the change callback.",
  },
  {
    prop: "variant",
    type: `"solid" | "subtle" | "dot"`,
    default: `"solid"`,
    description: "Filled circles, outlined circles, or minimal dots.",
  },
  {
    prop: "size",
    type: `"sm" | "md" | "lg"`,
    default: `"md"`,
    description: "Indicator and typography scale together.",
  },
  {
    prop: "orientation",
    type: `"horizontal" | "vertical"`,
    default: `"horizontal"`,
    description: "Step layout direction.",
  },
  {
    prop: "labelPlacement",
    type: `"inline" | "bottom"`,
    default: `"inline"`,
    description: "Horizontal only — titles beside or centered beneath indicators.",
  },
  {
    prop: "clickable",
    type: "boolean",
    default: "false",
    description: "Indicators become buttons that jump to their step.",
  },
  {
    prop: "linear",
    type: "boolean",
    default: "false",
    description: "Restricts navigation to one step forward — no skipping ahead.",
  },
  {
    prop: "count",
    type: "number",
    description: "Total steps; usually auto-counted from Steps.List children.",
  },
];

export const stepsPartsProps: PropRow[] = [
  {
    prop: "Steps.Item",
    type: "disabled?: boolean · error?: boolean",
    description: "One step; status (completed/active/upcoming/error) is derived from the active index.",
  },
  {
    prop: "Steps.Indicator",
    type: "children?: ReactNode",
    description: "Circle/dot — shows the number, a check when completed, or ! on error. Children override.",
  },
  {
    prop: "Steps.Title / Steps.Description",
    type: "children",
    description: "Labels that recolor with the step's status.",
  },
  {
    prop: "Steps.Content",
    type: "index: number",
    description: "Panel shown while its index is active.",
  },
  {
    prop: "Steps.Completed",
    type: "children",
    description: "Shown once the flow advances past the last step.",
  },
  {
    prop: "Steps.Prev / Steps.Next",
    type: "children?: ReactNode · disabled?: boolean",
    default: `"Back" / "Next"`,
    description: "Navigation buttons with automatic disabling at the ends.",
  },
];
