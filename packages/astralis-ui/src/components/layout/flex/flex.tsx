import { forwardRef, type ElementType, type ReactNode, type Ref } from "react";
import type { FlexProps } from "./flex.types";
import { astralisMerge } from "../../../utils/astralis-merge";
import { resolveStyleProps } from "../../../utils/responsive";
import { flexVariants, flexVariantMap } from "./flex.style";
import { boxVariants, boxVariantMap } from "../box/box.styles";
import { BOX_VARIANT_KEYS } from "../box/box";

const VARIANT_KEYS = Object.keys(flexVariantMap);

type FlexComponent = <T extends ElementType = "div">(
  props: FlexProps<T> & { ref?: Ref<any> },
) => ReactNode;

const FlexRoot = forwardRef(
  <T extends ElementType = "div">(
    { children, as, className, ...props }: FlexProps<T>,
    ref: Ref<any>,
  ) => {
    const Element = (as || "div") as ElementType;

    const variantProps: Record<string, any> = {};
    const boxVariantProps: Record<string, any> = {};
    const htmlProps: Record<string, any> = {};

    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        if (VARIANT_KEYS.includes(key)) {
          variantProps[key] = (props as any)[key];
        } else if (BOX_VARIANT_KEYS.includes(key)) {
          boxVariantProps[key] = (props as any)[key];
        } else {
          htmlProps[key] = (props as any)[key];
        }
      }
    }

    return (
      <Element
        className={astralisMerge(
          resolveStyleProps(boxVariantProps, { maps: boxVariantMap, variants: boxVariants }),
          resolveStyleProps(variantProps, { maps: flexVariantMap, variants: flexVariants }),
          className,
        )}
        ref={ref}
        {...htmlProps}
      >
        {children}
      </Element>
    );
  },
) as unknown as FlexComponent;

(FlexRoot as any).displayName = "Flex";
export default FlexRoot;
