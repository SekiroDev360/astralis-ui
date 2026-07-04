import type { DataListValueProps } from "../data-list.types";
import { useDataList } from "../data-list.context";
import { astralisMerge } from "../../../../utils/astralis-merge";

const textForSize = { sm: "astralis:text-xs", md: "astralis:text-sm", lg: "astralis:text-base" } as const;

export function DataListValue({ children, className = "" }: DataListValueProps) {
  const { size } = useDataList();
  return (
    <dd className={astralisMerge("astralis:flex-1 astralis:min-w-0 astralis:text-label-base", textForSize[size], className)}>
      {children}
    </dd>
  );
}
