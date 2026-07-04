import { useState, useId, useMemo, useCallback, type KeyboardEvent } from "react";
import { AccordionContext } from "../accordion.context";
import { accordionRootVariants } from "../accordion.styles";
import type { AccordionProps } from "../accordion.types";
import { astralisMerge } from "../../../../utils/astralis-merge";
import { accentClass } from "../../../../const/color-schemes";

export function AccordionRoot({
  children,
  type = "single",
  variant = "enclosed",
  size = "md",
  colorScheme = "gray",
  value,
  defaultValue,
  collapsible = false,
  disabled = false,
  keepMounted = false,
  indicator,
  indicatorPosition = "end",
  hideIndicator = false,
  headingLevel = 3,
  onValueChange,
  className = "",
}: AccordionProps) {
  const rootId = useId();
  const [internalValue, setInternalValue] = useState<string | string[] | undefined>(defaultValue);
  const currentValue = value ?? internalValue;

  const isOpen = useCallback(
    (item: string) =>
      type === "multiple"
        ? Array.isArray(currentValue) && currentValue.includes(item)
        : currentValue === item,
    [type, currentValue],
  );

  const toggle = useCallback(
    (item: string) => {
      let next: string | string[];
      if (type === "multiple") {
        const values = Array.isArray(currentValue) ? currentValue : [];
        next = values.includes(item) ? values.filter((v) => v !== item) : [...values, item];
      } else {
        next = currentValue === item && collapsible ? "" : item;
      }
      if (value === undefined) setInternalValue(next);
      onValueChange?.(next);
    },
    [type, currentValue, collapsible, onValueChange, value],
  );

  // Roving focus across triggers (the accordion pattern's keyboard contract).
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target.matches('button[data-accordion-trigger="true"]')) return;

    const triggers = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>(
        'button[data-accordion-trigger="true"]:not([disabled])',
      ),
    );
    const i = triggers.indexOf(target as HTMLButtonElement);
    if (i === -1) return;

    const focus = (n: number) => {
      e.preventDefault();
      triggers[(n + triggers.length) % triggers.length]?.focus();
    };
    if (e.key === "ArrowDown") focus(i + 1);
    else if (e.key === "ArrowUp") focus(i - 1);
    else if (e.key === "Home") focus(0);
    else if (e.key === "End") focus(triggers.length - 1);
  }, []);

  const ctx = useMemo(
    () => ({
      isOpen,
      toggle,
      rootId,
      variant,
      size,
      disabled,
      keepMounted,
      indicator,
      indicatorPosition,
      hideIndicator,
      headingLevel,
    }),
    [isOpen, toggle, rootId, variant, size, disabled, keepMounted, indicator, indicatorPosition, hideIndicator, headingLevel],
  );

  return (
    <AccordionContext.Provider value={ctx}>
      <div
        onKeyDown={handleKeyDown}
        className={astralisMerge(accordionRootVariants({ variant }), accentClass(colorScheme), className)}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}
