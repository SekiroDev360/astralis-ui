import { forwardRef, type ElementType, type ReactNode, type Ref } from "react";
import type { FloatProps } from "./float.types";
import { astralisMerge } from "../../../utils/astralis-merge";
import { resolveStyleProps } from "../../../utils/responsive";
import { floatVariants, floatVariantMap } from "./float.styles";
import { boxVariants, boxVariantMap } from "../box/box.styles";
import { BOX_VARIANT_KEYS } from "../box/box";

const VARIANT_KEYS = Object.keys(floatVariantMap);

type FloatComponent = <T extends ElementType = "div">(
  props: FloatProps<T> & { ref?: Ref<any> },
) => ReactNode;

/**
 * Float positions its content at the edge/corner of the nearest positioned
 * ancestor — wrap it in a `position="relative"` Box. Ideal for badges, dots,
 * and close buttons overlaid on a container.
 */
const Float = forwardRef(
  <T extends ElementType = "div">(
    { children, as, className, ...props }: FloatProps<T>,
    ref: Ref<any>,
  ) => {
    const Element = (as || "div") as ElementType;

    const variantProps: Record<string, any> = {};
    const boxVariantProps: Record<string, any> = {};
    const htmlProps: Record<string, any> = {};

    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        if (VARIANT_KEYS.includes(key)) variantProps[key] = (props as any)[key];
        else if (BOX_VARIANT_KEYS.includes(key)) boxVariantProps[key] = (props as any)[key];
        else htmlProps[key] = (props as any)[key];
      }
    }

    return (
      <Element
        className={astralisMerge(
          resolveStyleProps(boxVariantProps, { maps: boxVariantMap, variants: boxVariants }),
          resolveStyleProps(variantProps, { maps: floatVariantMap, variants: floatVariants }),
          className,
        )}
        ref={ref}
        {...htmlProps}
      >
        {children}
      </Element>
    );
  },
) as unknown as FloatComponent;

(Float as any).displayName = "Float";
export default Float;
