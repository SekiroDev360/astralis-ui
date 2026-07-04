import { cva } from "class-variance-authority";
import type { CSSProperties } from "react";
import type { DrawerPlacement, DrawerSize } from "./drawer.context";

export const drawerBackdropClasses =
  "astralis:fixed astralis:inset-0 astralis:z-high astralis:backdrop-blur-sm";
export const SCRIM_COLOR = "rgba(0, 0, 0, 0.5)";

/** Position + which edges get a border, per placement. */
export const drawerPanelVariants = cva(
  "astralis:fixed astralis:z-high astralis:flex astralis:flex-col astralis:bg-surface-base astralis:text-label-base astralis:shadow-xl astralis:border-stroke-subtle astralis:outline-none",
  {
    variants: {
      placement: {
        right: "astralis:top-0 astralis:right-0 astralis:h-full astralis:border-l",
        left: "astralis:top-0 astralis:left-0 astralis:h-full astralis:border-r",
        top: "astralis:top-0 astralis:inset-x-0 astralis:w-full astralis:border-b",
        bottom: "astralis:bottom-0 astralis:inset-x-0 astralis:w-full astralis:border-t",
      },
    },
    defaultVariants: { placement: "right" },
  },
);

// Dimensions are applied inline — fixed widths / viewport-relative heights —
// which sidesteps fraction + arbitrary-value utilities that don't emit here.
const width: Record<DrawerSize, string> = { sm: "18rem", md: "22rem", lg: "26rem", xl: "32rem", full: "100vw" };
const height: Record<DrawerSize, string> = { sm: "30vh", md: "45vh", lg: "60vh", xl: "80vh", full: "100vh" };

/** Left/right size the width; top/bottom size the height. */
export function drawerSizeStyle(placement: DrawerPlacement, size: DrawerSize): CSSProperties {
  return placement === "left" || placement === "right" ? { width: width[size] } : { height: height[size] };
}

/** Off-screen resting transform per placement (the open state is translate-0). */
export const drawerClosedTransform: Record<DrawerPlacement, string> = {
  right: "astralis:translate-x-full",
  left: "astralis:-translate-x-full",
  top: "astralis:-translate-y-full",
  bottom: "astralis:translate-y-full",
};
