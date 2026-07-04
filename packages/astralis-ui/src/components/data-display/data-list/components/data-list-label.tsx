import type { DataListLabelProps } from "../data-list.types";
import { useDataList } from "../data-list.context";
import { astralisMerge } from "../../../../utils/astralis-merge";

const textForSize = { sm: "astralis:text-xs", md: "astralis:text-sm", lg: "astralis:text-base" } as const;

export function DataListLabel({ children, className = "" }: DataListLabelProps) {
  const { orientation, size } = useDataList();
  return (
    <dt
      className={astralisMerge(
        "astralis:font-medium astralis:text-label-muted",
        textForSize[size],
        orientation === "horizontal" ? "astralis:w-40 astralis:shrink-0" : "",
        className,
      )}
    >
      {children}
    </dt>
  );
}
