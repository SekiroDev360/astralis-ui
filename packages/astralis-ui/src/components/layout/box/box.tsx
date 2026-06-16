import { forwardRef, type ElementType, type ReactNode, type Ref } from "react";
import type { BoxProps } from "./box.types";
import { astralisMerge } from "../../../utils/astralis-merge";
import { boxVariants } from "./box.styles";

export const BOX_VARIANT_KEYS = [
  "bg",
  "color",
  "borderColor",
  "borderStyle",
  "border",
  "p",
  "px",
  "py",
  "pt",
  "pb",
  "pl",
  "pr",
  "m",
  "mx",
  "my",
  "mt",
  "mb",
  "ml",
  "mr",
  "h",
  "minH",
  "maxH",
  "w",
  "minW",
  "maxW",
  "inline",
  "minInline",
  "maxInline",
  "block",
  "minBlock",
  "maxBlock",
  "display",
  "position",
  "opacity",
  "zIndex",
  "size",
  "rounded",
  "roundedT",
  "roundedR",
  "roundedB",
  "roundedL",
  "roundedTl",
  "roundedTr",
  "roundedBr",
  "roundedBl",
];

type BoxComponent = <T extends ElementType = "div">(
  props: BoxProps<T> & { ref?: Ref<any> },
) => ReactNode;

const Box = forwardRef(
  <T extends ElementType = "div">(
    { children, as, className, ...props }: BoxProps<T>,
    ref: Ref<any>,
  ) => {
    const Element = (as || "div") as ElementType;

    const variantProps: Record<string, any> = {};
    const htmlProps: Record<string, any> = {};

    // Object.entries(props).forEach(([key, value]) => {
    //   if (BOX_VARIANT_KEYS.includes(key)) {
    //     variantProps[key] = value;
    //   } else {
    //     htmlProps[key] = value;
    //   }
    // });

    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        if (BOX_VARIANT_KEYS.includes(key)) {
          variantProps[key] = (props as any)[key];
        } else {
          htmlProps[key] = (props as any)[key];
        }
      }
    }

    return (
      <Element
        className={astralisMerge(boxVariants(variantProps), className)}
        ref={ref}
        {...htmlProps}
      >
        {children}
      </Element>
    );
  },
) as unknown as BoxComponent;

(Box as any).displayName = "Box";
export default Box;
