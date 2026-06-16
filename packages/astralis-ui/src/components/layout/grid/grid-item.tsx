import { forwardRef, type ElementType, type ReactNode, type Ref } from "react";
import type { GridItemProps } from "./grid.types";
import { astralisMerge } from "../../../utils/astralis-merge";
import { gridItemVariants } from "./grid.styles";
import { boxVariants } from "../box/box.styles";
import { BOX_VARIANT_KEYS } from "../box/box";

const ITEM_VARIANT_KEYS = [
  "colSpan",
  "colStart",
  "colEnd",
  "rowSpan",
  "rowStart",
  "rowEnd",
  "order",
  "alignSelf",
  "justifySelf",
  "placeSelf"
];

type GridItemComponent = <T extends ElementType = "div">(
  props: GridItemProps<T> & { ref?: Ref<any> },
) => ReactNode;

const GridItem = forwardRef(
  <T extends ElementType = "div">(
    { children, as, className, ...props }: GridItemProps<T>,
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
          boxVariants(boxVariantProps),
          gridItemVariants(variantProps),
          className,
        )}
        ref={ref}
        {...htmlProps}
      >
        {children}
      </Element>
    );
  },
) as unknown as GridItemComponent;

(GridItem as any).displayName = "Grid.Item";
export default GridItem;
