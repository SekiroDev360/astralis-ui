import { useCallback, useRef, type KeyboardEvent, type RefObject } from "react";

interface UseRovingFocusOptions {
  /** Selector for the focusable items inside the container. */
  itemSelector: string;
  /** Which arrow axis moves focus. @default "vertical" */
  orientation?: "vertical" | "horizontal" | "both";
  /** Wrap from last back to first. @default true */
  loop?: boolean;
  /** Jump focus to the item whose text starts with what the user types. */
  typeahead?: boolean;
}

/**
 * Roving focus for composite widgets (Menu; the APG pattern Tabs/Accordion
 * also implement): arrows move focus between items, Home/End jump, an
 * optional typeahead matches by text. Item lookup is live DOM querying, so
 * items never need to self-register (StrictMode-safe, portals included).
 */
export function useRovingFocus<T extends HTMLElement = HTMLElement>({
  itemSelector,
  orientation = "vertical",
  loop = true,
  typeahead = false,
}: UseRovingFocusOptions): {
  containerRef: RefObject<T | null>;
  onKeyDown: (event: KeyboardEvent) => void;
  focusFirst: () => void;
  focusLast: () => void;
} {
  const containerRef = useRef<T | null>(null);
  const bufferRef = useRef("");
  const bufferTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getItems = useCallback((): HTMLElement[] => {
    const container = containerRef.current;
    if (!container) return [];
    return Array.from(container.querySelectorAll<HTMLElement>(itemSelector)).filter(
      (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-disabled") !== "true" && el.offsetParent !== null,
    );
  }, [itemSelector]);

  const focusIndex = useCallback(
    (items: HTMLElement[], index: number) => {
      if (!items.length) return;
      const clamped = loop
        ? (index + items.length) % items.length
        : Math.min(items.length - 1, Math.max(0, index));
      items[clamped]?.focus();
    },
    [loop],
  );

  const focusFirst = useCallback(() => focusIndex(getItems(), 0), [focusIndex, getItems]);
  const focusLast = useCallback(() => {
    const items = getItems();
    focusIndex(items, items.length - 1);
  }, [focusIndex, getItems]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const items = getItems();
      if (!items.length) return;
      const current = items.indexOf(document.activeElement as HTMLElement);

      const next = orientation !== "horizontal" && event.key === "ArrowDown" ? 1
        : orientation !== "vertical" && event.key === "ArrowRight" ? 1
        : orientation !== "horizontal" && event.key === "ArrowUp" ? -1
        : orientation !== "vertical" && event.key === "ArrowLeft" ? -1
        : 0;

      if (next !== 0) {
        event.preventDefault();
        focusIndex(items, current === -1 ? (next === 1 ? 0 : items.length - 1) : current + next);
        return;
      }
      if (event.key === "Home") {
        event.preventDefault();
        focusIndex(items, 0);
        return;
      }
      if (event.key === "End") {
        event.preventDefault();
        focusIndex(items, items.length - 1);
        return;
      }

      // Typeahead: accumulate printable keys, reset after a pause.
      if (typeahead && event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey && event.key !== " ") {
        bufferRef.current += event.key.toLowerCase();
        if (bufferTimerRef.current) clearTimeout(bufferTimerRef.current);
        bufferTimerRef.current = setTimeout(() => { bufferRef.current = ""; }, 500);
        // Search after the current item first, then wrap.
        const ordered = [...items.slice(current + 1), ...items.slice(0, current + 1)];
        const match = ordered.find((el) => (el.textContent ?? "").trim().toLowerCase().startsWith(bufferRef.current));
        match?.focus();
      }
    },
    [getItems, focusIndex, orientation, typeahead],
  );

  return { containerRef, onKeyDown, focusFirst, focusLast };
}
