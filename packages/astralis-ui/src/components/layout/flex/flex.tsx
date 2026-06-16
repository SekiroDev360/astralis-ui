import { forwardRef, type ElementType, type ReactNode, type Ref } from "react";
import type { FlexProps } from "./flex.types";
import { astralisMerge } from "../../../utils/astralis-merge";
import { flexVariants } from "./flex.style";
import { boxVariants } from "../box/box.styles";
import { BOX_VARIANT_KEYS } from "../box/box";

const VARIANT_KEYS = [
  "direction",
  "justifyContent",
  "alignItems",
  "alignContent",
  "placeContent",
  "placeItems",
  "wrap",
  "gap",
  "rowGap",
  "columnGap",
];

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
          boxVariants(boxVariantProps),
          flexVariants(variantProps),
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
