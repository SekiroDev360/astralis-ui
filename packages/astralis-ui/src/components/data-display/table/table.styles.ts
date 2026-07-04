import type { TableSize } from "./table.types";

/** Cell padding + text size, shared by Head and Cell. */
export const tableCellSize: Record<TableSize, string> = {
  sm: "astralis:px-3 astralis:py-2 astralis:text-xs",
  md: "astralis:px-4 astralis:py-3 astralis:text-sm",
  lg: "astralis:px-5 astralis:py-4 astralis:text-base",
};
