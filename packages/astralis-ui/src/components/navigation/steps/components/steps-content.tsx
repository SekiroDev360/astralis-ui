import type { StepsContentProps } from "../steps.types";

export function StepsContent({ children }: StepsContentProps) {
  return (
    <div className="astralis-flex astralis-flex-col astralis-gap-1">
      {children}
    </div>
  );
}
