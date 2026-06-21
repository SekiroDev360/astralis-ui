import { forwardRef, type ElementType, type ReactNode, type Ref } from "react";
import type { GridProps } from "./grid.types";
import { astralisMerge } from "../../../utils/astralis-merge";
import { resolveStyleProps } from "../../../utils/responsive";
import { gridVariants, gridVariantMap } from "./grid.styles";
import { boxVariants, boxVariantMap } from "../box/box.styles";
import { BOX_VARIANT_KEYS } from "../box/box";

const VARIANT_KEYS = Object.keys(gridVariantMap);

type GridComponent = <T extends ElementType = "div">(
  props: GridProps<T> & { ref?: Ref<any> },
) => ReactNode;

const GridRoot = forwardRef(
  <T extends ElementType = "div">(
    {
      children,
      as,
      className,
      templateColumns,
      templateRows,
      templateAreas,
      style,
      ...props
    }: GridProps<T>,
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

    // Arbitrary track/area templates can't be tokenized — apply via inline style.
    const templateStyle =
      templateColumns || templateRows || templateAreas
        ? {
            ...(templateColumns ? { gridTemplateColumns: templateColumns } : {}),
            ...(templateRows ? { gridTemplateRows: templateRows } : {}),
            ...(templateAreas ? { gridTemplateAreas: templateAreas } : {}),
          }
        : undefined;

    return (
      <Element
        className={astralisMerge(
          resolveStyleProps(boxVariantProps, { maps: boxVariantMap, variants: boxVariants }),
          resolveStyleProps(variantProps, { maps: gridVariantMap, variants: gridVariants }),
          className,
        )}
        ref={ref}
        style={templateStyle ? { ...templateStyle, ...style } : style}
        {...htmlProps}
      >
        {children}
      </Element>
    );
  },
) as unknown as GridComponent;

(GridRoot as any).displayName = "Grid";
export default GridRoot;