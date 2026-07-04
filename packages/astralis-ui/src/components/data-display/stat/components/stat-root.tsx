import type { StatProps } from "../stat.types";
import { StatContext } from "../stat.context";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function StatRoot({ children, className = "" }: StatProps) {
  return (
    <StatContext.Provider value={{}}>
      <div className={astralisMerge("astralis:flex astralis:flex-col astralis:gap-1", className)}>{children}</div>
    </StatContext.Provider>
  );
}
