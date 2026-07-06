import type { PropRow } from "@/components/docs/props-table";

/** Keep in sync with grid.styles.ts / grid.types.ts */
export const gridProps: PropRow[] = [
  {
    prop: "columns",
    type: `"1" – "12" | "none"`,
    description: "Number of equal columns.",
  },
  {
    prop: "rows",
    type: `"1" – "6" | "none"`,
    description: "Number of equal rows.",
  },
  {
    prop: "gap · rowGap · columnGap",
    type: `"0.5" – "96" (spacing scale)`,
    description: "Track gaps, together or per axis.",
  },
  {
    prop: "flow",
    type: `"row" | "col" | "dense" | "col-dense"`,
    default: `"row"`,
    description: "Auto-placement direction.",
  },
  {
    prop: "autoColumns · autoRows",
    type: `"auto" | "min" | "max" | "fr"`,
    description: "Sizing for implicitly created tracks.",
  },
  {
    prop: "justifyItems · alignItems · placeItems",
    type: `"start" | "center" | "end" | "stretch" (+ "baseline" for alignItems)`,
    description: "Item alignment within their cells.",
  },
  {
    prop: "justifyContent · alignContent · placeContent",
    type: `"start" | "center" | "end" | "between" | "around" | "evenly" | "stretch"`,
    description: "Track alignment within the container.",
  },
  {
    prop: "templateColumns · templateRows · templateAreas",
    type: "string",
    description: "Escape hatches — arbitrary track/area templates, applied as inline styles.",
  },
];

/** Keep in sync with gridItemVariants */
export const gridItemProps: PropRow[] = [
  {
    prop: "colSpan · rowSpan",
    type: `"1" – "12" | "full"`,
    description: "How many tracks the item spans.",
  },
  {
    prop: "colStart/colEnd · rowStart/rowEnd",
    type: `"1" – "13" | "auto"`,
    description: "Explicit grid-line placement.",
  },
  {
    prop: "area",
    type: "string",
    description: "Named area matching the container's templateAreas.",
  },
  {
    prop: "order",
    type: `"1" – "12" | "first" | "last" | "none"`,
    description: "Visual order, independent of source order.",
  },
  {
    prop: "alignSelf · justifySelf · placeSelf",
    type: `"auto" | "start" | "end" | "center" | "stretch"`,
    description: "Per-item alignment override.",
  },
];
