import { cva } from "class-variance-authority";

export const skeletonVariants = cva("astralis:bg-surface-emphasized", {
  variants: {
    variant: {
      text: "astralis:h-4 astralis:w-full astralis:rounded-md",
      circle: "astralis:rounded-full",
      rect: "astralis:rounded-lg",
    },
    animated: {
      // motion-reduce pauses the pulse for users who asked for less motion.
      true: "astralis:animate-pulse astralis:motion-reduce:animate-none",
      false: "",
    },
  },
  defaultVariants: { variant: "text", animated: true },
});
