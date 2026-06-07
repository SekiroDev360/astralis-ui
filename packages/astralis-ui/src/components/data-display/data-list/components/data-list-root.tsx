import type { DataListProps } from "../data-list.types";
import { DataListContext } from "../data-list.context";

export function DataListRoot({ children }: DataListProps) {
  return (
    <DataListContext.Provider value={{}}>
      <dl className="astralis-grid astralis-grid-cols-1 astralis-gap-y-4">
        {children}
      </dl>
    </DataListContext.Provider>
  );
}
