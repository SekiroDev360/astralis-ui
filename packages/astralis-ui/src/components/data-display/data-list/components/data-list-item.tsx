import type { DataListItemProps } from "../data-list.types";
import { useDataList } from "../data-list.context";

const SIZE_PADDING: Record<string, string> = {
  sm: "astralis-py-1.5",
  md: "astralis-py-2.5",
  lg: "astralis-py-3.5",
};

export function DataListItem({
  children,
  className = "",
  style,
}: DataListItemProps) {
  const { orientation, size } = useDataList();
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={[
        "astralis-flex astralis-gap-3",
        isHorizontal
          ? "astralis-flex-row astralis-items-baseline astralis-justify-between"
          : "astralis-flex-col",
        SIZE_PADDING[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}
