export const menuContentClasses =
  "astralis:fixed astralis:z-higher astralis:min-w-44 astralis:max-w-72 astralis:rounded-xl " +
  "astralis:border-normal astralis:border-stroke-subtle astralis:bg-surface-panel astralis:shadow-lg " +
  "astralis:p-1 astralis:outline-none astralis:transition-all astralis:duration-fast";

export const menuMotionClasses = (state: "open" | "closed"): string =>
  state === "open" ? "astralis:opacity-100 astralis:scale-100" : "astralis:opacity-0 astralis:scale-95";

export const menuItemClasses =
  "astralis:flex astralis:w-full astralis:cursor-pointer astralis:select-none astralis:items-center astralis:gap-2 " +
  "astralis:rounded-lg astralis:px-2.5 astralis:py-1.5 astralis:text-sm astralis:text-label-base astralis:outline-none " +
  "astralis:transition-colors astralis:focus:bg-surface-subtle " +
  "astralis:aria-disabled:opacity-moderate astralis:aria-disabled:pointer-events-none";

export const menuItemDangerClasses = "astralis:text-label-error astralis:focus:bg-surface-error";

export const menuLabelClasses =
  "astralis:px-2.5 astralis:py-1.5 astralis:text-xs astralis:font-medium astralis:text-label-subtle";

export const menuSeparatorClasses = "astralis:my-1 astralis:h-px astralis:bg-stroke-subtle";

export const menuIconSlotClasses = "astralis:h-4 astralis:w-4 astralis:shrink-0 astralis:text-label-muted";

export const menuShortcutClasses = "astralis:ml-auto astralis:pl-4 astralis:text-xs astralis:text-label-subtle";
