import { ModalRoot } from "./components/modal-root";
import { ModalContent } from "./components/modal-content";
import { ModalTrigger } from "./components/modal-trigger";
import { ModalFooter } from "./components/modal-footer";
import { ModalOverlay } from "./components/modal-overlay";
import { ModalHeader } from "./components/modal-header";

// 1️⃣ Compound DX API
export const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Content: ModalContent,
  Overlay: ModalOverlay,
  Footer: ModalFooter,
  Header: ModalHeader,
});

// 2️⃣ Flat exports for tree-shaking
export { ModalTrigger, ModalContent, ModalOverlay, ModalFooter, ModalHeader };

// 3️⃣ Type exports
export type {
  ModalContentProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalOverlayProps,
  ModalProps,
  ModalTriggerProps,
} from "./modal.types";
