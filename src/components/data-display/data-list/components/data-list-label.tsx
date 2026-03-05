import type { DataListLabelProps } from "../data-list.types";
import { useDataList } from "../data-list.context";

const SIZE_TEXT: Record<string, string> = {
  sm: "astralis-text-xs",
  md: "astralis-text-sm",
  lg: "astralis-text-base",
};

export function DataListLabel({
  children,
  info,
  grow = false,
  className = "",
  style,
}: DataListLabelProps) {
  const { size } = useDataList();

  return (
    <dt
      className={[
        "astralis-inline-flex astralis-items-center astralis-gap-1",
        "astralis-font-medium astralis-text-content-secondary",
        SIZE_TEXT[size],
        grow ? "astralis-flex-1" : "astralis-min-w-[8rem]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
      {info && (
        <span
          title={typeof info === "string" ? info : undefined}
          className="astralis-inline-flex astralis-items-center astralis-justify-center astralis-h-3.5 astralis-w-3.5 astralis-rounded-full astralis-bg-gray-200 dark:astralis-bg-gray-700 astralis-text-gray-500 astralis-text-[9px] astralis-font-bold astralis-cursor-help astralis-shrink-0"
        >
          {typeof info === "string" ? "?" : info}
        </span>
      )}
    </dt>
  );
}
