import { useAccordionContext, useAccordionItemContext } from "../accordion.context";

interface AccordionContentProps {
  value?: string;
  id?: string;
  className?: string;
}

export function AccordionContent({
  value,
  id,
  className = "",
  children,
}: React.PropsWithChildren<AccordionContentProps>) {
  const { isOpen } = useAccordionContext();
  const itemContext = useAccordionItemContext();

  const resolvedValue = value ?? itemContext?.value;

  if (resolvedValue === undefined) {
    console.warn(
      "[Astralis Accordion] AccordionContent must be used within AccordionItem or provided a direct value prop."
    );
  }

  const open = resolvedValue ? isOpen(resolvedValue) : false;

  if (!open) return null;

  return (
    <div
      id={id ?? itemContext?.contentId}
      role="region"
      aria-labelledby={itemContext?.triggerId}
      className={`astralis-w-full astralis-text-sm astralis-px-4 astralis-pb-4 astralis-pt-2 astralis-text-label-base ${className}`}
    >
      {children}
    </div>
  );
}
