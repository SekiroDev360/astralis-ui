import type { InfoListProps } from "../info-list.types";
import { InfoListContext } from "../info-list.context";

export function InfoListRoot({ children }: InfoListProps) {
  return (
    <InfoListContext.Provider value={{}}>
      <dl className="astralis-grid astralis-grid-cols-1 astralis-gap-y-4">
        {children}
      </dl>
    </InfoListContext.Provider>
  );
}
