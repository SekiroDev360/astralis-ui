import { useAccordionContext, useAccordionItemContext } from "../accordion.context";

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
}

export function AccordionTrigger({
  value,
  children,
  className = "",
  disabled,
  id,
  ...props
}: AccordionTriggerProps) {
  const { isOpen, toggle } = useAccordionContext();
  const itemContext = useAccordionItemContext();

  const resolvedValue = value ?? itemContext?.value;
  const resolvedDisabled = disabled ?? itemContext?.disabled ?? false;
  
  if (resolvedValue === undefined) {
    console.warn(
      "[Astralis Accordion] AccordionTrigger must be used within AccordionItem or provided a direct value prop."
    );
  }

  const open = resolvedValue ? isOpen(resolvedValue) : false;

  return (
    <button
      type="button"
      id={id ?? itemContext?.triggerId}
      onClick={() => resolvedValue && toggle(resolvedValue)}
      aria-expanded={open}
      aria-controls={props["aria-controls"] ?? itemContext?.contentId}
      aria-disabled={resolvedDisabled ? "true" : undefined}
      disabled={resolvedDisabled}
      data-astralis-accordion-trigger="true"
      className={[
        "astralis-accordion-trigger",
        "astralis-w-full astralis-flex astralis-items-center astralis-justify-between",
        "astralis-gap-3 astralis-px-4 astralis-py-3 astralis-text-left",
        "astralis-font-medium astralis-outline-none astralis-transition-all astralis-duration-200",
        "astralis-bg-surface-raised hover:astralis-bg-surface-overlay astralis-text-content-primary",
        "focus-visible:astralis-ring-2 focus-visible:astralis-ring-primary-500 focus-visible:astralis-ring-offset-2",
        "disabled:astralis-opacity-50 disabled:astralis-cursor-not-allowed",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
