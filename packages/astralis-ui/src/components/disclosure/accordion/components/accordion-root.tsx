import { useState, useId, useMemo, useCallback } from "react";
import { AccordionContext } from "../accordion.context";
import type { AccordionProps } from "../accordion.types";

export function AccordionRoot({
  children,
  type = "single",
  variant = "enclosed",
  value,
  defaultValue,
  collapsible = false,
  onValueChange,
}: React.PropsWithChildren<AccordionProps>) {
  const rootId = useId();
  const [internalValue, setInternalValue] = useState<
    string | string[] | undefined
  >(defaultValue);

  const currentValue = value ?? internalValue;

  const isOpen = useCallback(
    (item: string) => {
      if (type === "multiple") {
        return Array.isArray(currentValue) && currentValue.includes(item);
      }
      return currentValue === item;
    },
    [type, currentValue],
  );

  const toggle = useCallback(
    (item: string) => {
      let nextValue: string | string[];

      if (type === "multiple") {
        const values = Array.isArray(currentValue) ? currentValue : [];
        nextValue = values.includes(item)
          ? values.filter((v) => v !== item)
          : [...values, item];
      } else {
        if (currentValue === item && collapsible) {
          nextValue = "";
        } else {
          nextValue = item;
        }
      }

      setInternalValue(nextValue);
      onValueChange?.(nextValue);
    },
    [type, currentValue, collapsible, onValueChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName !== "BUTTON" ||
        !target.hasAttribute("data-astralis-accordion-trigger")
      ) {
        return;
      }

      const container = e.currentTarget;
      const triggers = Array.from(
        container.querySelectorAll(
          'button[data-astralis-accordion-trigger="true"]:not([disabled])',
        ),
      ) as HTMLButtonElement[];

      const activeIndex = triggers.indexOf(target as HTMLButtonElement);
      if (activeIndex === -1) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = (activeIndex + 1) % triggers.length;
        triggers[nextIndex]?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = (activeIndex - 1 + triggers.length) % triggers.length;
        triggers[prevIndex]?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        triggers[0]?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        triggers[triggers.length - 1]?.focus();
      }
    },
    [],
  );

  const contextValue = useMemo(
    () => ({
      isOpen,
      toggle,
      rootId,
      variant,
    }),
    [isOpen, toggle, rootId, variant],
  );

  const wrapperClass = {
    spaced: "astralis-w-full astralis-flex astralis-flex-col astralis-gap-2",
    outline: "astralis-w-full",
    enclosed:
      "astralis-w-full astralis-border astralis-border-base astralis-rounded-lg astralis-overflow-hidden",
    plain: "astralis-w-full",
  }[variant];

  return (
    <AccordionContext.Provider value={contextValue}>
      <div onKeyDown={handleKeyDown} className={wrapperClass}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}
