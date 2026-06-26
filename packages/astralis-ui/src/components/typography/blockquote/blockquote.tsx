import { forwardRef, type ElementType, type ReactNode, type Ref } from "react";
import type { BlockquoteProps } from "./blockquote.types";
import { astralisMerge } from "../../../utils/astralis-merge";
import { resolveStyleProps } from "../../../utils/responsive";
import { blockquoteVariants, blockquoteVariantMap } from "./blockquote.styles";
import { boxVariants, boxVariantMap } from "../../layout/box/box.styles";
import { BOX_VARIANT_KEYS } from "../../layout/box/box";

const VARIANT_KEYS = Object.keys(blockquoteVariantMap);

type BlockquoteComponent = <T extends ElementType = "blockquote">(
  props: BlockquoteProps<T> & { ref?: Ref<any> },
) => ReactNode;

/** A quotation block with a leading accent rule and optional `<cite>` attribution. */
const Blockquote = forwardRef(
  <T extends ElementType = "blockquote">(
    { as, className, children, cite, citeUrl, ...props }: BlockquoteProps<T>,
    ref: Ref<any>,
  ) => {
    const Element = (as || "blockquote") as ElementType;

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
        cite={citeUrl}
        className={astralisMerge(
          resolveStyleProps(variantProps, { maps: blockquoteVariantMap, variants: blockquoteVariants }),
          resolveStyleProps(boxVariantProps, { maps: boxVariantMap, variants: boxVariants }),
          className,
        )}
        ref={ref}
        {...htmlProps}
      >
        {children}
        {cite != null && (
          <cite className="astralis:mt-2 astralis:block astralis:text-sm astralis:not-italic astralis:text-label-muted">
            {cite}
          </cite>
        )}
      </Element>
    );
  },
) as unknown as BlockquoteComponent;

(Blockquote as any).displayName = "Blockquote";
export default Blockquote;
