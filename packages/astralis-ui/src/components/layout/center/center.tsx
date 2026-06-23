import { forwardRef, type ElementType, type ReactNode, type Ref } from "react";
import type { CenterProps } from "./center.types";
import { astralisMerge } from "../../../utils/astralis-merge";
import { resolveStyleProps } from "../../../utils/responsive";
import { boxVariants, boxVariantMap } from "../box/box.styles";
import { BOX_VARIANT_KEYS } from "../box/box";

type CenterComponent = <T extends ElementType = "div">(
  props: CenterProps<T> & { ref?: Ref<any> },
) => ReactNode;

/** Centers its children on both axes (flex + items/justify center). Carries all Box props. */
const Center = forwardRef(
  <T extends ElementType = "div">(
    { as, className, children, ...props }: CenterProps<T>,
    ref: Ref<any>,
  ) => {
    const Element = (as || "div") as ElementType;

    const boxVariantProps: Record<string, any> = {};
    const htmlProps: Record<string, any> = {};
    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        if (BOX_VARIANT_KEYS.includes(key)) boxVariantProps[key] = (props as any)[key];
        else htmlProps[key] = (props as any)[key];
      }
    }

    return (
      <Element
        className={astralisMerge(
          resolveStyleProps(boxVariantProps, { maps: boxVariantMap, variants: boxVariants }),
          "astralis:flex astralis:items-center astralis:justify-center",
          className,
        )}
        ref={ref}
        {...htmlProps}
      >
        {children}
      </Element>
    );
  },
) as unknown as CenterComponent;

(Center as any).displayName = "Center";
export default Center;
