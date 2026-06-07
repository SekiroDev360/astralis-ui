import type { ReactNode } from "react";

export function StepsTitle({ children }: { children: ReactNode }) {
  return (
    <p className="astralis-text-sm astralis-font-medium astralis-font-heading astralis-text-label-base">
      {children}
    </p>
  );
}
