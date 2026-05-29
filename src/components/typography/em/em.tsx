import { forwardRef } from "react";
import type { EmProps } from "./em.types";

export const Em = forwardRef<HTMLElement, EmProps>(function Em(
  { children, className = "", style },
  ref,
) {
  return (
    <em
      ref={ref as React.Ref<HTMLElement>}
      className={["astralis-italic astralis-transition-colors", className]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </em>
  );
});

export default Em;
