import type { PropRow } from "@/components/docs/props-table";

/** Keep in sync with flex.style.ts / flex.types.ts */
export const flexProps: PropRow[] = [
  {
    prop: "direction",
    type: `"row" | "column" | "row-reverse" | "column-reverse"`,
    default: `"row"`,
    description: "Main-axis direction.",
  },
  {
    prop: "justifyContent",
    type: `"start" | "center" | "end" | "between" | "around" | "evenly"`,
    default: `"start"`,
    description: "Distribution along the main axis.",
  },
  {
    prop: "alignItems",
    type: `"start" | "center" | "end" | "baseline" | "stretch"`,
    default: `"start"`,
    description: "Alignment along the cross axis.",
  },
  {
    prop: "wrap",
    type: `"wrap" | "nowrap" | "wrap-reverse"`,
    default: `"nowrap"`,
    description: "Whether children wrap onto new lines.",
  },
  {
    prop: "gap · rowGap · columnGap",
    type: `"0.5" – "96" (spacing scale)`,
    description: "Gap between children, together or per axis.",
  },
  {
    prop: "alignContent · placeContent",
    type: `"start" | "center" | "end" | "between" | "around" | "evenly" | "stretch"`,
    description: "Multi-line / shorthand content alignment.",
  },
];

/** Keep in sync with flexItemVariants */
export const flexItemProps: PropRow[] = [
  {
    prop: "basis",
    type: `spacing scale | "3xs"–"8xl" | fractions | "auto" | "full" | "min" | "max" | "fit"`,
    description: "flex-basis — the item's starting size.",
  },
  {
    prop: "flex",
    type: `"1" | "auto" | "initial" | "none"`,
    description: "The flex shorthand.",
  },
  {
    prop: "grow · shrink",
    type: `boolean | "0" | "1"`,
    description: "Whether the item grows into / gives up free space.",
  },
  {
    prop: "order",
    type: `"1" – "12" | "first" | "last" | "none"`,
    description: "Visual order, independent of source order.",
  },
  {
    prop: "alignSelf",
    type: `"auto" | "start" | "end" | "center" | "stretch" | "baseline"`,
    description: "Overrides the container's alignItems for this item.",
  },
];
