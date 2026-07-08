import { useCallback, useId, useMemo, useRef } from "react";
import { MenuContext } from "../menu.context";
import type { MenuProps } from "../menu.types";
import { useControllableState } from "../../../hooks/use-controllable-state";

export function MenuRoot({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  side = "bottom",
  align = "start",
  sideOffset = 6,
  closeOnSelect = true,
}: MenuProps) {
  const [open, setOpen] = useControllableState({ value: openProp, defaultValue: defaultOpen, onChange: onOpenChange });
  const id = useId();
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => setOpen(false), [setOpen]);
  const toggle = useCallback(() => setOpen(!open), [setOpen, open]);

  const ctx = useMemo(
    () => ({
      open, setOpen, toggle, close,
      triggerRef, contentRef,
      contentId: `${id}-menu`,
      side, align, sideOffset, closeOnSelect,
    }),
    [open, setOpen, toggle, close, id, side, align, sideOffset, closeOnSelect],
  );

  return <MenuContext.Provider value={ctx}>{children}</MenuContext.Provider>;
}
