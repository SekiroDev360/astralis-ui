import type { ModalHeaderProps } from "../modal.types";
import { X } from "lucide-react";
import Icon from "../../../icon/icon";
import { useModal } from "../modal.context";
import { ModalClose } from "./modal-close";

export function ModalHeader({ children }: ModalHeaderProps) {
  const { titleId } = useModal();

  return (
    <div className="astralis-flex astralis-items-center astralis-justify-between astralis-text-lg astralis-font-semibold astralis-border-b astralis-border-stroke-subtle astralis-p-4 astralis-text-content-primary">
      <span id={titleId}>{children}</span>
      <ModalClose>
        <button
          type="button"
          aria-label="Close dialog"
          className={[
            "astralis-text-content-secondary hover:astralis-text-content-primary astralis-transition-all astralis-duration-200",
            "astralis-outline-none astralis-rounded-md",
            "focus-visible:astralis-ring-2 focus-visible:astralis-ring-primary-500 focus-visible:astralis-ring-offset-2",
          ].join(" ")}
        >
          <Icon as={X} size="md" />
        </button>
      </ModalClose>
    </div>
  );
}
