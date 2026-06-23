import { forwardRef, type ElementType, type ReactNode, type Ref } from "react";
import type { ContainerProps } from "./container.types";
import { astralisMerge } from "../../../utils/astralis-merge";
import { resolveStyleProps } from "../../../utils/responsive";
import { boxVariants, boxVariantMap } from "../box/box.styles";
import { BOX_VARIANT_KEYS } from "../box/box";

type ContainerComponent = <T extends ElementType = "div">(
  props: ContainerProps<T> & { ref?: Ref<any> },
) => ReactNode;

/**
 * Container centers its content horizontally (`margin-inline: auto`) up to a max
 * width, with default horizontal padding. `maxW` and `px` are Box props with sane
 * defaults — override them like any style prop. `centerContent` stacks children
 * in a centered column.
 */
const Container = forwardRef(
  <T extends ElementType = "div">(
    {
      as,
      className,
      children,
      centerContent = false,
      maxW = "5xl",
      px = "4",
      ...props
    }: ContainerProps<T>,
    ref: Ref<any>,
  ) => {
    const Element = (as || "div") as ElementType;

    // Defaults first; any matching box prop in `...props` (e.g. a custom `w`) overrides.
    const boxVariantProps: Record<string, any> = { w: "full", maxW, px };
    const htmlProps: Record<string, any> = {};
    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        if (BOX_VARIANT_KEYS.includes(key)) boxVariantProps[key] = (props as any)[key];
        else htmlProps[key] = (props as any)[key];
      }
    }

    return (
      <Element
        className={astralisMerge(
          resolveStyleProps(boxVariantProps, { maps: boxVariantMap, variants: boxVariants }),
          "astralis:mx-auto",
          centerContent && "astralis:flex astralis:flex-col astralis:items-center",
          className,
        )}
        ref={ref}
        {...htmlProps}
      >
        {children}
      </Element>
    );
  },
) as unknown as ContainerComponent;

(Container as any).displayName = "Container";
export default Container;
