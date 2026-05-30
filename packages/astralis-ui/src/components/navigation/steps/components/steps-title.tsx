import type { ReactNode } from "react";

export function StepsTitle({ children }: { children: ReactNode }) {
  return (
    <div className="astralis-text-sm astralis-font-medium astralis-text-content-primary astralis-truncate">
      {children}
    </div>
  );
}
