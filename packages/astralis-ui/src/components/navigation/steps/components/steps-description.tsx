import type { ReactNode } from "react";

export function StepsDescription({ children }: { children: ReactNode }) {
  return (
    <div className="astralis-text-xs astralis-whitespace-nowrap astralis-text-content-secondary astralis-mt-1">
      {children}
    </div>
  );
}
