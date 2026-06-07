import { DrawerRoot } from "./components/drawer-root";
import { DrawerContent } from "./components/drawer-content";
import { DrawerTrigger } from "./components/drawer-trigger";
import { DrawerFooter } from "./components/drawer-footer";
import { DrawerOverlay } from "./components/drawer-overlay";
import { DrawerHeader } from "./components/drawer-header";

// 1️⃣ Compound DX API
export const Drawer = Object.assign(DrawerRoot, {
  Trigger: DrawerTrigger,
  Content: DrawerContent,
  Overlay: DrawerOverlay,
  Footer: DrawerFooter,
  Header: DrawerHeader,
});

// 2️⃣ Flat exports for tree-shaking
export { DrawerTrigger, DrawerContent, DrawerOverlay, DrawerFooter, DrawerHeader };

// 3️⃣ Type exports
export type {
  DrawerContentProps,
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerOverlayProps,
  DrawerProps,
  DrawerTriggerProps,
} from "./drawer.types";
