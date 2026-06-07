import { useTabs } from "../tabs.context";
import type { TabsListProps } from "../tabs.types";

export function TabsList({
  children,
  centered = false,
  className,
}: TabsListProps) {
  const { orientation } = useTabs();

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      data-orientation={orientation}
      className={[
        "astralis-flex",
        orientation === "horizontal"
          ? [
              "astralis-flex-row astralis-items-center astralis-border-b astralis-border-base",
              "astralis-overflow-x-auto astralis-scrollbar-hide", // Slide behavior
              centered ? "astralis-justify-center" : "astralis-justify-start",
            ].join(" ")
          : [
              "astralis-flex-col astralis-items-stretch astralis-border-r astralis-border-base",
              "astralis-box-border", // Ensure width handles padding correctly
            ].join(" "),
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
