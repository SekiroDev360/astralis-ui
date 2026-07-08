import { forwardRef, type ElementType, type ReactNode, type Ref } from "react";
import type { BlockquoteProps } from "./blockquote.types";
import { astralisMerge } from "../../../utils/astralis-merge";
import { resolveStyleProps } from "../../../utils/responsive";
import { splitVariantProps } from "../../../utils/split-variant-props";
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

    const [variantProps, boxVariantProps, htmlProps] = splitVariantProps(
      props as Record<string, unknown>,
      VARIANT_KEYS,
      BOX_VARIANT_KEYS,
    );

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
