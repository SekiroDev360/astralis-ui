import { forwardRef, type HTMLAttributes, type Ref } from "react";
import { astralisMerge } from "../../utils/astralis-merge";
import { textColors } from "../../const/color-mappings";
import { iconVariants } from "./icon.styles";
import type { IconProps } from "./icon.types";

/**
 * Icon — a bring-your-own-icon wrapper. It standardizes size (our sizing tokens),
 * colour (semantic tokens, inherited via `currentColor`), and stroke width, then
 * renders the icon you supply via `as` (an icon component) or `children` (a raw
 * `<svg>`). The library bundles NO icon set, so consumers ship only what they use.
 *
 * Decorative by default (`aria-hidden`); pass `aria-label` to expose it to AT.
 */
const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ as: As, children, size = "md", color, strokeWidth, className, style, ...rest }, ref) => {
    const isToken = typeof size === "string";
    const classes = astralisMerge(
      iconVariants({ size: isToken ? size : undefined }),
      color ? textColors[color] : "",
      className,
    );
    const mergedStyle = isToken ? style : { width: size, height: size, ...style };
    const a11y = (rest as { "aria-label"?: string })["aria-label"]
      ? { role: "img" as const }
      : { "aria-hidden": true };

    if (As) {
      return (
        <As
          ref={ref}
          className={classes}
          style={mergedStyle}
          {...(strokeWidth != null ? { strokeWidth } : {})}
          {...a11y}
          {...rest}
        />
      );
    }

    if (children) {
      // `rest` carries <svg> attrs; only the shared HTML/aria ones apply to a <span>.
      return (
        <span
          ref={ref as unknown as Ref<HTMLSpanElement>}
          className={classes}
          style={mergedStyle}
          {...a11y}
          {...(rest as HTMLAttributes<HTMLSpanElement>)}
        >
          {children}
        </span>
      );
    }

    return null;
  },
);

Icon.displayName = "Icon";
export default Icon;
