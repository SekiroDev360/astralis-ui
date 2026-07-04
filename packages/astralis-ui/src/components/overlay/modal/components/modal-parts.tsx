import { useEffect } from "react";
import { useModal } from "../modal.context";
import type { ModalSectionProps } from "../modal.types";
import { astralisMerge } from "../../../../utils/astralis-merge";
import Icon from "../../../icon/icon";
import { XIcon } from "../../../icon/internal-icons";

export function ModalHeader({ children, className = "" }: ModalSectionProps) {
  return (
    <div className={astralisMerge("astralis:flex astralis:flex-col astralis:gap-1 astralis:px-6 astralis:pt-6 astralis:pb-2", className)}>
      {children}
    </div>
  );
}

export function ModalBody({ children, className = "" }: ModalSectionProps) {
  return (
    <div className={astralisMerge("astralis:px-6 astralis:py-4 astralis:text-label-muted", className)}>
      {children}
    </div>
  );
}

export function ModalFooter({ children, className = "" }: ModalSectionProps) {
  return (
    <div className={astralisMerge("astralis:flex astralis:items-center astralis:justify-end astralis:gap-3 astralis:px-6 astralis:pt-2 astralis:pb-6", className)}>
      {children}
    </div>
  );
}

export function ModalTitle({ children, className = "" }: ModalSectionProps) {
  const { titleId, setHasTitle } = useModal();
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

export function ModalDescription({ children, className = "" }: ModalSectionProps) {
  const { descriptionId, setHasDescription } = useModal();
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

/** The corner ✕ button — place inside a Header. */
export function ModalCloseButton({ className = "" }: { className?: string }) {
  const { close } = useModal();
  return (
    <button
      type="button"
      aria-label="Close"
      onClick={close}
      className={astralisMerge(
        "astralis:absolute astralis:top-4 astralis:right-4 astralis:inline-flex astralis:items-center astralis:justify-center astralis:size-8 astralis:rounded-md astralis:text-label-muted astralis:cursor-pointer astralis:transition-colors astralis:hover:bg-surface-muted astralis:hover:text-label-base astralis:outline-none astralis:focus-visible:outline-2 astralis:focus-visible:outline-offset-2 astralis:focus-visible:outline-accent-ring",
        className,
      )}
    >
      <Icon size="sm"><XIcon /></Icon>
    </button>
  );
}
