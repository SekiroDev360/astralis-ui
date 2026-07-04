import type { DataListProps } from "../data-list.types";
import { DataListContext } from "../data-list.context";
import { astralisMerge } from "../../../../utils/astralis-merge";

const gapForSize = { sm: "astralis:gap-2", md: "astralis:gap-3", lg: "astralis:gap-4" } as const;

export function DataListRoot({ children, orientation = "horizontal", size = "md", className = "" }: DataListProps) {
  return (
    <DataListContext.Provider value={{ orientation, size }}>
      <dl className={astralisMerge("astralis:flex astralis:flex-col", gapForSize[size], className)}>{children}</dl>
    </DataListContext.Provider>
  );
}
