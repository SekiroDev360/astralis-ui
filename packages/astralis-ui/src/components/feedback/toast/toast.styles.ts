import type { ToasterPlacement } from "./toast.types";

/** Fixed viewport region per placement; the stack grows away from the edge. */
export const toasterRegionClasses: Record<ToasterPlacement, string> = {
  "top-start": "astralis:top-4 astralis:left-4 astralis:items-start",
  "top-center": "astralis:top-4 astralis:left-1/2 astralis:-translate-x-1/2 astralis:items-center",
  "top-end": "astralis:top-4 astralis:right-4 astralis:items-end",
  "bottom-start": "astralis:bottom-4 astralis:left-4 astralis:items-start",
  "bottom-center": "astralis:bottom-4 astralis:left-1/2 astralis:-translate-x-1/2 astralis:items-center",
  "bottom-end": "astralis:bottom-4 astralis:right-4 astralis:items-end",
};

export const toasterBaseClasses =
  "astralis:fixed astralis:z-highest astralis:flex astralis:flex-col astralis:gap-3 astralis:pointer-events-none astralis:max-w-[calc(100vw-2rem)]";

export const toastPanelClasses =
  "astralis:pointer-events-auto astralis:flex astralis:items-start astralis:gap-3 astralis:w-80 astralis:max-w-full " +
  "astralis:rounded-xl astralis:border-normal astralis:border-stroke-subtle astralis:bg-surface-panel astralis:shadow-lg " +
  "astralis:px-4 astralis:py-3 astralis:text-sm astralis:transition-all astralis:duration-moderate";

/** Enter/exit transform depends on which edge the stack lives on. */
export const toastMotionClasses = (open: boolean, placement: ToasterPlacement): string => {
  if (open) return "astralis:opacity-100 astralis:translate-y-0";
  return placement.startsWith("top")
    ? "astralis:opacity-0 astralis:-translate-y-2"
    : "astralis:opacity-0 astralis:translate-y-2";
};

export const toastIconClasses = "astralis:h-5 astralis:w-5 astralis:shrink-0 astralis:mt-0.5 astralis:text-accent-solid";
export const toastTitleClasses = "astralis:font-semibold astralis:text-label-base";
export const toastDescriptionClasses = "astralis:mt-0.5 astralis:text-label-muted";
export const toastActionClasses =
  "astralis:shrink-0 astralis:cursor-pointer astralis:self-center astralis:rounded-md astralis:px-2 astralis:py-1 " +
  "astralis:text-sm astralis:font-medium astralis:text-accent-label astralis:transition-colors astralis:hover:bg-accent-subtle " +
  "astralis:focus-visible:outline-2 astralis:focus-visible:outline-offset-2 astralis:focus-visible:outline-accent-ring";
export const toastCloseClasses =
  "astralis:shrink-0 astralis:cursor-pointer astralis:rounded-md astralis:p-1 astralis:-m-1 astralis:text-label-subtle " +
  "astralis:transition-colors astralis:hover:text-label-base astralis:focus-visible:outline-2 astralis:focus-visible:outline-offset-2 astralis:focus-visible:outline-accent-ring";
