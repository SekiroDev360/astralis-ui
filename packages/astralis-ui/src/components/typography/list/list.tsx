import { forwardRef, type ElementType, type ReactNode, type Ref } from "react";
import type { ListProps } from "./list.types";
import { astralisMerge } from "../../../utils/astralis-merge";
import { resolveStyleProps } from "../../../utils/responsive";
import { listVariants, listVariantMap } from "./list.styles";
import { boxVariants, boxVariantMap } from "../../layout/box/box.styles";
import { BOX_VARIANT_KEYS } from "../../layout/box/box";

const VARIANT_KEYS = Object.keys(listVariantMap);

type ListComponent = <T extends ElementType = "ul">(
  props: ListProps<T> & { ref?: Ref<any> },
) => ReactNode;

/** Root of the List compound — renders a `<ul>` (or `<ol>` via `as`). */
const ListRoot = forwardRef(
  <T extends ElementType = "ul">(
    { as, className, children, ...props }: ListProps<T>,
    ref: Ref<any>,
  ) => {
    const Element = (as || "ul") as ElementType;

    const variantProps: Record<string, any> = {};
    const boxVariantProps: Record<string, any> = {};
    const htmlProps: Record<string, any> = {};

    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        const value = (props as any)[key];
        if (VARIANT_KEYS.includes(key)) variantProps[key] = value;
        else if (BOX_VARIANT_KEYS.includes(key)) boxVariantProps[key] = value;
        else htmlProps[key] = value;
      }
    }

    return (
      <Element
        className={astralisMerge(
          resolveStyleProps(variantProps, { maps: listVariantMap, variants: listVariants }),
          resolveStyleProps(boxVariantProps, { maps: boxVariantMap, variants: boxVariants }),
          className,
        )}
        ref={ref}
        {...htmlProps}
      >
        {children}
      </Element>
    );
  },
) as unknown as ListComponent;

(ListRoot as any).displayName = "List";
export default ListRoot;
