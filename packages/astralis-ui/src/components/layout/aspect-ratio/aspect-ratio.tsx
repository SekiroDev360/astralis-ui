import { forwardRef, type ElementType, type ReactNode, type Ref } from "react";
import type { AspectRatioProps } from "./aspect-ratio.types";
import { astralisMerge } from "../../../utils/astralis-merge";
import { resolveStyleProps } from "../../../utils/responsive";
import { aspectRatioVariants, aspectRatioVariantMap } from "./aspect-ratio.styles";
import { boxVariants, boxVariantMap } from "../box/box.styles";
import { BOX_VARIANT_KEYS } from "../box/box";

const VARIANT_KEYS = Object.keys(aspectRatioVariantMap);

type AspectRatioComponent = <T extends ElementType = "div">(
  props: AspectRatioProps<T> & { ref?: Ref<any> },
) => ReactNode;

const AspectRatio = forwardRef(
  <T extends ElementType = "div">(
    { children, as, className, ...props }: AspectRatioProps<T>,
    ref: Ref<any>,
  ) => {
    const Element = (as || "div") as ElementType;

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
        className={astralisMerge(
          resolveStyleProps(boxVariantProps, { maps: boxVariantMap, variants: boxVariants }),
          resolveStyleProps(variantProps, { maps: aspectRatioVariantMap, variants: aspectRatioVariants }),
          className,
        )}
        ref={ref}
        {...htmlProps}
      >
        {children}
      </Element>
    );
  },
) as unknown as AspectRatioComponent;

(AspectRatio as any).displayName = "AspectRatio";
export default AspectRatio;
