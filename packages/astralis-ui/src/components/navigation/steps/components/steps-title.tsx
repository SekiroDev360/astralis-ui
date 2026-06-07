import type { ReactNode } from "react";

export function StepsTitle({ children }: { children: ReactNode }) {
  return (
    <p className="astralis-text-sm astralis-font-medium">
      {children}
    </p>
  );
}
