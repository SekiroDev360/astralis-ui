import type { ReactNode } from "react";

export function StepsDescription({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <p className="astralis-text-sm astralis-text-label-subtle">
      {children}
    </p>
  );
}
