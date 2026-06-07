import {
  useAccordionContext,
  useAccordionItemContext,
} from "../accordion.context";

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
  const { isOpen, toggle, variant } = useAccordionContext();
  const itemContext = useAccordionItemContext();

  const resolvedValue = value ?? itemContext?.value;
  const resolvedDisabled = disabled ?? itemContext?.disabled ?? false;

  if (resolvedValue === undefined) {
    console.warn(
      "[Astralis Accordion] AccordionTrigger must be used within AccordionItem or provided a direct value prop.",
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
        "astralis-font-medium astralis-outline-none astralis-transition-all",
        variant !== "plain" ? "hover:astralis-bg-surface-subtle" : "",
        "astralis-text-label-base astralis-cursor-pointer",
        "disabled:astralis-opacity-moderate disabled:astralis-cursor-not-allowed",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
