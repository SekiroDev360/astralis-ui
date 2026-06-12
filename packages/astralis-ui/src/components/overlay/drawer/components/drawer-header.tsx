import type { DrawerHeaderProps } from "../drawer.types";
import { X } from "lucide-react";
import Icon from "../../../icon/icon";
import { useDrawer } from "../drawer.context";
import { DrawerClose } from "./drawer-close";

export function DrawerHeader({ children }: DrawerHeaderProps) {
  const { titleId } = useDrawer();

  return (
    <div className="astralis-flex astralis-items-center astralis-justify-between astralis-text-lg astralis-font-semibold astralis-border-b astralis-border-stroke-subtle astralis-p-4 astralis-text-content-primary">
      <span id={titleId}>{children}</span>
      <DrawerClose>
        <button
          type="button"
          aria-label="Close drawer"
          className={[
            "astralis-text-content-secondary hover:astralis-text-content-primary astralis-transition-all astralis-duration-200",
            "astralis-outline-none astralis-rounded-md",
            "focus-visible:astralis-ring-2 focus-visible:astralis-ring-primary-500 focus-visible:astralis-ring-offset-2",
          ].join(" ")}
        >
          <Icon as={X} size="md" />
        </button>
      </DrawerClose>
    </div>
  );
}
