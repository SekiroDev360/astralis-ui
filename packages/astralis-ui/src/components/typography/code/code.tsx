import { forwardRef, type ElementType, type ReactNode, type Ref } from "react";
import type { CodeProps } from "./code.types";
import { astralisMerge } from "../../../utils/astralis-merge";
import { resolveStyleProps } from "../../../utils/responsive";
import { splitVariantProps } from "../../../utils/split-variant-props";
import { codeVariants, codeVariantMap } from "./code.styles";
import { boxVariants, boxVariantMap } from "../../layout/box/box.styles";
import { BOX_VARIANT_KEYS } from "../../layout/box/box";

const VARIANT_KEYS = Object.keys(codeVariantMap);

type CodeComponent = <T extends ElementType = "code">(
  props: CodeProps<T> & { ref?: Ref<any> },
) => ReactNode;

/** Inline code — a monospace `<code>` chip for snippets inside prose. */
const Code = forwardRef(
  <T extends ElementType = "code">(
    { as, className, children, ...props }: CodeProps<T>,
    ref: Ref<any>,
  ) => {
    const Element = (as || "code") as ElementType;

    const [variantProps, boxVariantProps, htmlProps] = splitVariantProps(
      props as Record<string, unknown>,
      VARIANT_KEYS,
      BOX_VARIANT_KEYS,
    );

    return (
      <Element
        className={astralisMerge(
          resolveStyleProps(variantProps, { maps: codeVariantMap, variants: codeVariants }),
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
) as unknown as CodeComponent;

(Code as any).displayName = "Code";
export default Code;
