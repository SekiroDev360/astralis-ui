import type { DataListValueProps } from "../data-list.types";
import { useDataList } from "../data-list.context";

const SIZE_TEXT: Record<string, string> = {
  sm: "astralis-text-xs",
  md: "astralis-text-sm",
  lg: "astralis-text-base",
};

export function DataListValue({
  children,
  grow = false,
  className = "",
  style,
}: DataListValueProps) {
  const { size } = useDataList();

  return (
    <dd
      className={[
        "astralis-font-medium astralis-text-content-primary",
        SIZE_TEXT[size],
        grow ? "astralis-flex-1" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </dd>
  );
}
