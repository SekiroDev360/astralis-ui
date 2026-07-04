import { useEffect } from "react";
import { useDrawer } from "../drawer.context";
import type { DrawerSectionProps } from "../drawer.types";
import { astralisMerge } from "../../../../utils/astralis-merge";
import Icon from "../../../icon/icon";
import { XIcon } from "../../../icon/internal-icons";

export function DrawerHeader({ children, className = "" }: DrawerSectionProps) {
  return (
    <div className={astralisMerge("astralis:flex astralis:items-center astralis:justify-between astralis:gap-4 astralis:px-6 astralis:py-4 astralis:border-b astralis:border-stroke-subtle", className)}>
      {children}
    </div>
  );
}

export function DrawerBody({ children, className = "" }: DrawerSectionProps) {
  return (
    <div className={astralisMerge("astralis:flex-1 astralis:overflow-y-auto astralis:px-6 astralis:py-4 astralis:text-label-muted", className)}>
      {children}
    </div>
  );
}

export function DrawerFooter({ children, className = "" }: DrawerSectionProps) {
  return (
    <div className={astralisMerge("astralis:flex astralis:items-center astralis:justify-end astralis:gap-3 astralis:px-6 astralis:py-4 astralis:border-t astralis:border-stroke-subtle", className)}>
      {children}
    </div>
  );
}

export function DrawerTitle({ children, className = "" }: DrawerSectionProps) {
  const { titleId, setHasTitle } = useDrawer();
  useEffect(() => {
    setHasTitle(true);
    return () => setHasTitle(false);
  }, [setHasTitle]);
  return (
    <h2 id={titleId} className={astralisMerge("astralis:text-lg astralis:font-semibold astralis:text-label-base", className)}>
      {children}
    </h2>
  );
}

export function DrawerDescription({ children, className = "" }: DrawerSectionProps) {
  const { descriptionId, setHasDescription } = useDrawer();
  useEffect(() => {
    setHasDescription(true);
    return () => setHasDescription(false);
  }, [setHasDescription]);
  return (
    <p id={descriptionId} className={astralisMerge("astralis:text-sm astralis:text-label-muted", className)}>
      {children}
    </p>
  );
}

export function DrawerCloseButton({ className = "" }: { className?: string }) {
  const { close } = useDrawer();
  return (
    <button
      type="button"
      aria-label="Close"
      onClick={close}
      className={astralisMerge(
        "astralis:inline-flex astralis:items-center astralis:justify-center astralis:size-8 astralis:rounded-md astralis:text-label-muted astralis:cursor-pointer astralis:transition-colors astralis:hover:bg-surface-muted astralis:hover:text-label-base astralis:outline-none astralis:focus-visible:outline-2 astralis:focus-visible:outline-offset-2 astralis:focus-visible:outline-accent-ring",
        className,
      )}
    >
      <Icon size="sm"><XIcon /></Icon>
    </button>
  );
}
