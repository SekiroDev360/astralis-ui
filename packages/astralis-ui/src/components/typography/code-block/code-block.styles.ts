import { cva } from "class-variance-authority";

/**
 * CodeBlock is a compound surface: a rounded, coloured container (Root) holding
 * an optional Header row (Title / WindowControls / Control) and a scrollable
 * `<pre>` (Content). `variant` colours the Root; `size` flows through context
 * and drives the Content's font-size + padding.
 */
export const codeBlockRootVariants = cva(
  "astralis:block astralis:w-full astralis:rounded-md astralis:overflow-hidden",
  {
    variants: {
      variant: {
        subtle: "astralis:bg-surface-muted astralis:text-label-base",
        // Same-polarity surface — tracks the active theme (dark block in dark
        // mode) rather than inverting against it.
        solid: "astralis:bg-surface-subtle astralis:text-label-base",
        outline: "astralis:border-normal astralis:border-stroke-base astralis:text-label-base",
      },
    },
    defaultVariants: { variant: "subtle" },
  },
);

export const codeBlockHeaderClasses =
  "astralis:flex astralis:items-center astralis:gap-2 astralis:px-4 astralis:py-2 astralis:text-xs astralis:font-mono astralis:font-medium astralis:border-b astralis:border-stroke-base astralis:select-none";

export const codeBlockTitleClasses = "astralis:truncate astralis:opacity-higher";

/** Trailing slot — pushes itself to the end of the Header row. */
export const codeBlockControlClasses =
  "astralis:ms-auto astralis:flex astralis:items-center astralis:gap-1.5";

export const codeBlockCopyTriggerClasses =
  "astralis:inline-flex astralis:items-center astralis:justify-center astralis:size-7 astralis:rounded-md astralis:text-current astralis:opacity-high astralis:cursor-pointer astralis:transition astralis:hover:opacity-100 astralis:hover:bg-surface-emphasized astralis:focus-visible:outline-2 astralis:focus-visible:outline-offset-2 astralis:focus-visible:outline-accent-ring";

export const codeBlockContentVariants = cva(
  // Whitespace preserved; long lines scroll horizontally rather than wrap.
  "astralis:font-mono astralis:block astralis:m-0 astralis:overflow-x-auto astralis:whitespace-pre",
  {
    variants: {
      size: {
        sm: "astralis:text-xs astralis:p-3",
        md: "astralis:text-sm astralis:p-4",
        lg: "astralis:text-md astralis:p-5",
      },
    },
    defaultVariants: { size: "md" },
  },
);
