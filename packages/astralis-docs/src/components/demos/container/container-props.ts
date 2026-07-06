import type { PropRow } from "@/components/docs/props-table";

/** Keep in sync with container.types.ts */
export const containerProps: PropRow[] = [
  {
    prop: "maxW",
    type: `"xs" – "8xl" | any Box width token`,
    default: `"5xl"`,
    description: "Width cap; the container centers itself with auto inline margins.",
  },
  {
    prop: "px",
    type: `"0.5" – "96" (spacing scale)`,
    default: `"4"`,
    description: "Gutter padding so content never touches the viewport edge.",
  },
  {
    prop: "centerContent",
    type: "boolean",
    default: "false",
    description: "Also stacks and centers the children themselves (flex column, centered).",
  },
];
