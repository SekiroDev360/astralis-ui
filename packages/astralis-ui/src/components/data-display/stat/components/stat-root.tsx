import type { StatProps } from "../stat.types";
import { StatContext } from "../stat.context";

export function StatRoot({ children }: StatProps) {
  return (
    <StatContext.Provider value={{}}>
      <div className="astralis-flex astralis-flex-col astralis-gap-1">
        {children}
      </div>
    </StatContext.Provider>
  );
}
