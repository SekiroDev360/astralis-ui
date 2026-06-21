import { forwardRef, type ElementType, type ReactNode, type Ref } from "react";
import type { FlexItemProps } from "./flex.types";
import { astralisMerge } from "../../../utils/astralis-merge";
import { resolveStyleProps } from "../../../utils/responsive";
import { flexItemVariants, flexItemVariantMap } from "./flex.style";
import { boxVariants, boxVariantMap } from "../box/box.styles";
import { BOX_VARIANT_KEYS } from "../box/box";

const ITEM_VARIANT_KEYS = Object.keys(flexItemVariantMap);

type FlexItemComponent = <T extends ElementType = "div">(
  props: FlexItemProps<T> & { ref?: Ref<any> },
) => ReactNode;

const FlexItem = forwardRef(
  <T extends ElementType = "div">(
    { children, as, className, ...props }: FlexItemProps<T>,
    ref: Ref<any>,
  ) => {
    const Element = (as || "div") as ElementType;

    const variantProps: Record<string, any> = {};
    const boxVariantProps: Record<string, any> = {};
    const htmlProps: Record<string, any> = {};

    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        const value = (props as any)[key];
        if (ITEM_VARIANT_KEYS.includes(key)) {
          variantProps[key] = value;
        } else if (BOX_VARIANT_KEYS.includes(key)) {
          boxVariantProps[key] = value;
        } else {
          htmlProps[key] = value;
        }
      }
    }

    return (
      <Element
        className={astralisMerge(
          resolveStyleProps(boxVariantProps, { maps: boxVariantMap, variants: boxVariants }),
          resolveStyleProps(variantProps, { maps: flexItemVariantMap, variants: flexItemVariants }),
          className,
        )}
        ref={ref}
        {...htmlProps}
      >
        {children}
      </Element>
    );
  },
) as unknown as FlexItemComponent;

(FlexItem as any).displayName = "Flex.Item";
export default FlexItem;
