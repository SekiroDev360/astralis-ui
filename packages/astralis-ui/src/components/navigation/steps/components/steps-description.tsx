import type { ReactNode } from "react";

export function StepsDescription({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <p className="astralis-text-sm astralis-text-gray-500">
      {children}
    </p>
  );
}
