import type { Ref } from "react";
import type { SkeletonProps } from "./skeleton.types";
import { skeletonVariants } from "./skeleton.styles";
import { astralisMerge } from "../../../utils/astralis-merge";

/**
 * A pulsing placeholder that holds space while content loads. Hidden from
 * assistive tech (`aria-hidden`) — pair the surrounding region with
 * `aria-busy` or a Spinner if the loading state itself must be announced.
 */
export function Skeleton({
  variant = "text",
  animated = true,
  loaded = false,
  className = "",
  children,
  ref,
  ...rest
}: SkeletonProps & { ref?: Ref<HTMLDivElement> }) {
    if (loaded) return <>{children}</>;

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={astralisMerge(skeletonVariants({ variant, animated }), className)}
        {...rest}
      />
    );
}

Skeleton.displayName = "Skeleton";
