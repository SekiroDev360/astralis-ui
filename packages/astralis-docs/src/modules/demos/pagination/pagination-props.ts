import type { PropRow } from "@/modules/docs/props-table";

/** Keep in sync with pagination.types.ts */
export const paginationProps: PropRow[] = [
  {
    prop: "page · defaultPage · onPageChange",
    type: "number · number · (page: number) => void",
    default: "— · 1 · —",
    description: "Controlled / initial page, and the change callback.",
  },
  {
    prop: "totalPages",
    type: "number",
    description: "Explicit page count — use this OR count + pageSize.",
  },
  {
    prop: "count · pageSize",
    type: "number · number",
    default: "— · 10",
    description: "Total items; the page count is derived.",
  },
  {
    prop: "variant",
    type: `"solid" | "outline" | "subtle" | "plain"`,
    default: `"solid"`,
    description: "Page-button styling; the active page carries the accent.",
  },
  {
    prop: "size",
    type: `"xs" | "sm" | "md" | "lg"`,
    default: `"md"`,
    description: "Button sizing.",
  },
  {
    prop: "rounded",
    type: `"none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"`,
    default: `"md"`,
    description: "Button corner radius.",
  },
  {
    prop: "colorScheme",
    type: `"brand" | "gray" | … (all 11 schemes)`,
    default: `"brand"`,
    description: "Active page and focus-ring hue.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the whole control.",
  },
];

export const paginationPartsProps: PropRow[] = [
  {
    prop: "Pagination.Pages",
    type: "siblings?: number · boundaryCount?: number",
    default: "1 · 1",
    description: "Page buttons around the current page and pinned at the ends, with ellipses between.",
  },
  {
    prop: "Pagination.Prev / Next / First / Last",
    type: "icon?: ReactNode",
    description: "Step and jump buttons; default chevron icons.",
  },
  {
    prop: "Pagination.PageText",
    type: "format?: (state) => ReactNode",
    default: `"Page 3 of 8"`,
    description: "Live-region readout of the current state.",
  },
  {
    prop: "Pagination.Jumper",
    type: "label?: ReactNode",
    default: `"Go to"`,
    description: "Number input that jumps straight to a page.",
  },
  {
    prop: "Pagination.Item",
    type: "page: number",
    description: "A single page button, for fully manual layouts.",
  },
];
