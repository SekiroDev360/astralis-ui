import type { DataListItemProps } from "../data-list.types";
import { useDataList } from "../data-list.context";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function DataListItem({ children, className = "" }: DataListItemProps) {
  const { orientation } = useDataList();
  return (
    <div
      className={astralisMerge(
        orientation === "horizontal" ? "astralis:flex astralis:gap-4" : "astralis:flex astralis:flex-col astralis:gap-0.5",
        className,
      )}
    >
      {children}
    </div>
  );
}
