import { forwardRef, type ElementType, type ReactNode, type Ref } from "react";
import type { SeparatorProps } from "./separator.types";
import { astralisMerge } from "../../../utils/astralis-merge";
import { resolveStyleProps } from "../../../utils/responsive";
import { separatorVariants, separatorVariantMap } from "./separator.styles";
import { boxVariants, boxVariantMap } from "../box/box.styles";
import { BOX_VARIANT_KEYS } from "../box/box";

const VARIANT_KEYS = Object.keys(separatorVariantMap);

type SeparatorComponent = <T extends ElementType = "div">(
  props: SeparatorProps<T> & { ref?: Ref<any> },
) => ReactNode;

const Separator = forwardRef(
  <T extends ElementType = "div">(
    { as, className, ...props }: SeparatorProps<T>,
    ref: Ref<any>,
  ) => {
    const Element = (as || "div") as ElementType;

    // Scalar orientation drives aria-orientation; a responsive value leaves it unset.
    const orientation = (props as any).orientation ?? "horizontal";
    const ariaOrientation = typeof orientation === "string" ? orientation : undefined;

    const variantProps: Record<string, any> = {};
    const boxVariantProps: Record<string, any> = {};
    const htmlProps: Record<string, any> = {};

    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        if (VARIANT_KEYS.includes(key)) variantProps[key] = (props as any)[key];
        else if (BOX_VARIANT_KEYS.includes(key)) boxVariantProps[key] = (props as any)[key];
        else htmlProps[key] = (props as any)[key];
      }
    }

    return (
      <Element
        role="separator"
        aria-orientation={ariaOrientation}
        className={astralisMerge(
          resolveStyleProps(variantProps, { maps: separatorVariantMap, variants: separatorVariants }),
          resolveStyleProps(boxVariantProps, { maps: boxVariantMap, variants: boxVariants }),
          className,
        )}
        ref={ref}
        {...htmlProps}
      />
    );
  },
) as unknown as SeparatorComponent;

(Separator as any).displayName = "Separator";
export default Separator;
