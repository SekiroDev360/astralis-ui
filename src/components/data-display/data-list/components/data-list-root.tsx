import type { DataListProps } from "../data-list.types";
import { DataListContext } from "../data-list.context";

const VARIANT_WRAPPER: Record<string, string> = {
  plain: "",
  subtle: "astralis-rounded-lg astralis-bg-surface-raised astralis-p-4",
  outline:
    "astralis-rounded-lg astralis-border astralis-border-border-subtle astralis-p-4",
};

export function DataListRoot({
  children,
  size = "md",
  variant = "plain",
  orientation = "horizontal",
  divided = false,
  className = "",
  style,
}: DataListProps) {
  return (
    <DataListContext.Provider value={{ size, variant, orientation }}>
      <dl
        className={[
          "astralis-flex astralis-flex-col",
          divided
            ? "astralis-divide-y astralis-divide-border-subtle"
            : "astralis-gap-0",
          VARIANT_WRAPPER[variant],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={style}
      >
        {children}
      </dl>
    </DataListContext.Provider>
  );
}
