import { ModalRoot, ModalTrigger, ModalClose } from "./components/modal-root";
import { ModalContent } from "./components/modal-content";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalCloseButton,
} from "./components/modal-parts";

/** Compound API — `Modal` is the root; parts hang off it. */
export const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Content: ModalContent,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  Title: ModalTitle,
  Description: ModalDescription,
  Close: ModalClose,
  CloseButton: ModalCloseButton,
});

export {
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
  ModalCloseButton,
};

export type { ModalProps, ModalContentProps, ModalSectionProps, ModalSlotProps } from "./modal.types";
export type { ModalSize } from "./modal.context";
