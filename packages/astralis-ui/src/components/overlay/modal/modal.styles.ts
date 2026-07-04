import { cva } from "class-variance-authority";

/** The fixed full-screen layer that holds the backdrop + panel. */
export const modalViewportVariants = cva(
  "astralis:fixed astralis:inset-0 astralis:z-high astralis:flex astralis:justify-center astralis:p-4 astralis:overflow-y-auto",
  {
    variants: {
      centered: { true: "astralis:items-center", false: "astralis:items-start astralis:pt-16" },
    },
    defaultVariants: { centered: true },
  },
);

/** Scrim colour is set inline (opacity-modifier utilities don't emit here). */
export const modalBackdropClasses =
  "astralis:fixed astralis:inset-0 astralis:backdrop-blur-sm";
export const SCRIM_COLOR = "rgba(0, 0, 0, 0.5)";

export const modalPanelVariants = cva(
  "astralis:relative astralis:w-full astralis:my-auto astralis:bg-surface-base astralis:text-label-base astralis:rounded-xl astralis:border-normal astralis:border-stroke-subtle astralis:shadow-xl",
  {
    variants: {
      size: {
        sm: "astralis:max-w-sm",
        md: "astralis:max-w-md",
        lg: "astralis:max-w-lg",
        xl: "astralis:max-w-2xl",
        full: "astralis:max-w-[calc(100vw-2rem)]",
      },
    },
    defaultVariants: { size: "md" },
  },
);
