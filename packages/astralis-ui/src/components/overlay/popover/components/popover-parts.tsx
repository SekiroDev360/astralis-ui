import { useEffect } from "react";
import { usePopover } from "../popover.context";
import type { PopoverSectionProps } from "../popover.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function PopoverTitle({ children, className = "" }: PopoverSectionProps) {
  const { titleId, setHasTitle } = usePopover();
  useEffect(() => {
    setHasTitle(true);
    return () => setHasTitle(false);
  }, [setHasTitle]);
  return (
    <h3 id={titleId} className={astralisMerge("astralis:text-sm astralis:font-semibold astralis:text-label-base", className)}>
      {children}
    </h3>
  );
}

export function PopoverDescription({ children, className = "" }: PopoverSectionProps) {
  const { descriptionId, setHasDescription } = usePopover();
  useEffect(() => {
    setHasDescription(true);
    return () => setHasDescription(false);
  }, [setHasDescription]);
  return (
    <p id={descriptionId} className={astralisMerge("astralis:mt-1 astralis:text-sm astralis:text-label-muted", className)}>
      {children}
    </p>
  );
}
