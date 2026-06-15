import { forwardRef, type ElementType, type ReactNode, type Ref } from "react";
import type { FlexProps } from "./flex.types";
import { astralisMerge } from "../../../utils/astralis-merge";
import { flexVariants } from "./flex.style";
import { boxVariants } from "../box/box.styles";

const VARIANT_KEYS = [
  "direction",
  "justify",
  "align",
  "wrap",
  "gap",
  "rowGap",
  "columnGap",
];

const BOX_VARIANT_KEYS = [
  "bg", "color", "borderColor", "borderStyle", "border",
  "p", "px", "py", "pt", "pb", "pl", "pr",
  "m", "mx", "my", "mt", "mb", "ml", "mr",
  "h", "minH", "maxH", "w", "minW", "maxW",
  "display", "position", "opacity", "zIndex", "size",
  "rounded", "roundedT", "roundedR", "roundedB", "roundedL",
  "roundedTl", "roundedTr", "roundedBr", "roundedBl"
];

type FlexComponent = <T extends ElementType = "div">(
  props: FlexProps<T> & { ref?: Ref<any> },
) => ReactNode;

const Flex = forwardRef(
  <T extends ElementType = "div">(
    { children, as, className, ...props }: FlexProps<T>,
    ref: Ref<any>,
  ) => {
    const Element = (as || "div") as ElementType;

    const variantProps: Record<string, any> = {};
    const boxVariantProps: Record<string, any> = {};
    const htmlProps: Record<string, any> = {};

    Object.entries(props).forEach(([key, value]) => {
      if (VARIANT_KEYS.includes(key)) {
        variantProps[key] = value;
      } else if (BOX_VARIANT_KEYS.includes(key)) {
        boxVariantProps[key] = value;
      } else {
        htmlProps[key] = value;
      }
    });

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

(Flex as any).displayName = "Flex";
export default Flex;
