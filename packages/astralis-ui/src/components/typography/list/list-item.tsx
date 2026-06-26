import { forwardRef, type ElementType, type ReactNode, type Ref } from "react";
import type { ListItemProps } from "./list.types";
import { astralisMerge } from "../../../utils/astralis-merge";
import { resolveStyleProps } from "../../../utils/responsive";
import { boxVariants, boxVariantMap } from "../../layout/box/box.styles";
import { BOX_VARIANT_KEYS } from "../../layout/box/box";

type ListItemComponent = <T extends ElementType = "li">(
  props: ListItemProps<T> & { ref?: Ref<any> },
) => ReactNode;

/** A single `<li>`. With `icon`, it suppresses the native marker and renders the icon inline. */
const ListItem = forwardRef(
  <T extends ElementType = "li">(
    { as, className, children, icon, ...props }: ListItemProps<T>,
    ref: Ref<any>,
  ) => {
    const Element = (as || "li") as ElementType;

    const boxVariantProps: Record<string, any> = {};
    const htmlProps: Record<string, any> = {};
    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        const value = (props as any)[key];
        if (BOX_VARIANT_KEYS.includes(key)) boxVariantProps[key] = value;
        else htmlProps[key] = value;
      }
    }

    return (
      <Element
        className={astralisMerge(
          resolveStyleProps(boxVariantProps, { maps: boxVariantMap, variants: boxVariants }),
          icon != null
            ? "astralis:list-none astralis:flex astralis:items-start astralis:gap-2"
            : "",
          className,
        )}
        ref={ref}
        {...htmlProps}
      >
        {icon != null && (
          <span className="astralis:inline-flex astralis:shrink-0 astralis:items-center" aria-hidden="true">
            {icon}
          </span>
        )}
        {icon != null ? <span>{children}</span> : children}
      </Element>
    );
  },
) as unknown as ListItemComponent;

(ListItem as any).displayName = "List.Item";
export default ListItem;
