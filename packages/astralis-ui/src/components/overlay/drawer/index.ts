import { DrawerRoot, DrawerTrigger, DrawerClose } from "./components/drawer-root";
import { DrawerContent } from "./components/drawer-content";
import {
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerCloseButton,
} from "./components/drawer-parts";

/** Compound API — `Drawer` is the root; parts hang off it. */
export const Drawer = Object.assign(DrawerRoot, {
  Trigger: DrawerTrigger,
  Content: DrawerContent,
  Header: DrawerHeader,
  Body: DrawerBody,
  Footer: DrawerFooter,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Close: DrawerClose,
  CloseButton: DrawerCloseButton,
});

export {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerCloseButton,
};

export type { DrawerProps, DrawerContentProps, DrawerSectionProps, DrawerSlotProps } from "./drawer.types";
export type { DrawerPlacement, DrawerSize } from "./drawer.context";
