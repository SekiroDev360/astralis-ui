import type { AccordionTitleProps } from "../accordion.types";

export function AccordionTitle({ children }: AccordionTitleProps) {
  return (
    <h2 className="astralis-text-base astralis-font-heading astralis-font-semibold astralis-text-label-base">
        {children}
    </h2>
  );
}