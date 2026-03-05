import type { StatProps } from "../stat.types";
import { StatContext } from "../stat.context";

export function StatRoot({
  children,
  size = "md",
  className = "",
  style,
}: StatProps) {
  return (
    <StatContext.Provider value={{ size }}>
      <div
        className={["astralis-flex astralis-flex-col astralis-gap-1", className]
          .filter(Boolean)
          .join(" ")}
        style={style}
      >
        {children}
      </div>
    </StatContext.Provider>
  );
}
StatRoot.displayName = "StatRoot";
