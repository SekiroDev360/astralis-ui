import type { ComponentPropsWithoutRef } from "react";

export type SkeletonVariant = "text" | "circle" | "rect";

export interface SkeletonProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Placeholder shape: `text` is a line the height of body text, `circle`
   * suits avatars (size it square via className/style), `rect` is a generic
   * rounded block.
   * @default "text"
   */
  variant?: SkeletonVariant;
  /** Disable the pulse (it also pauses automatically under prefers-reduced-motion). */
  animated?: boolean;
  /**
   * Render children instead of the placeholder once loading is done —
   * `<Skeleton loaded={!!data}>…</Skeleton>` keeps layout stable.
   */
  loaded?: boolean;
}
