import { forwardRef, type ElementType, type ReactNode, type Ref } from "react";
import type { CodeBlockProps } from "./code-block.types";
import { astralisMerge } from "../../../utils/astralis-merge";
import { resolveStyleProps } from "../../../utils/responsive";
import { splitVariantProps } from "../../../utils/split-variant-props";
import {
  codeBlockVariants,
  codeBlockVariantMap,
  codeBlockBodyVariants,
  codeBlockBodyMap,
} from "./code-block.styles";
import { boxVariants, boxVariantMap } from "../../layout/box/box.styles";
import { BOX_VARIANT_KEYS } from "../../layout/box/box";

const ROOT_VARIANT_KEYS = Object.keys(codeBlockVariantMap);
const BODY_VARIANT_KEYS = Object.keys(codeBlockBodyMap);

type CodeBlockComponent = <T extends ElementType = "div">(
  props: CodeBlockProps<T> & { ref?: Ref<any> },
) => ReactNode;

/** A scrollable, multi-line `<pre><code>` surface with an optional language header. */
/** macOS-style window dots — a small splash of colour that reads instantly as "editor". */
const TrafficLights = () => (
  <span className="astralis:flex astralis:items-center astralis:gap-1.5 astralis:me-1" aria-hidden="true">
    <span className="astralis:block astralis:size-3 astralis:rounded-full astralis:bg-red-400" />
    <span className="astralis:block astralis:size-3 astralis:rounded-full astralis:bg-yellow-400" />
    <span className="astralis:block astralis:size-3 astralis:rounded-full astralis:bg-green-400" />
  </span>
);

const CodeBlock = forwardRef(
  <T extends ElementType = "div">(
    { as, className, children, language, windowControls, highlightedHtml, ...props }: CodeBlockProps<T>,
    ref: Ref<any>,
  ) => {
    const Element = (as || "div") as ElementType;

    const [rootVariantProps, bodyVariantProps, boxVariantProps, htmlProps] = splitVariantProps(
      props as Record<string, unknown>,
      ROOT_VARIANT_KEYS,
      BODY_VARIANT_KEYS,
      BOX_VARIANT_KEYS,
    );

    return (
      <Element
        className={astralisMerge(
          resolveStyleProps(rootVariantProps, { maps: codeBlockVariantMap, variants: codeBlockVariants }),
          resolveStyleProps(boxVariantProps, { maps: boxVariantMap, variants: boxVariants }),
          className,
        )}
        ref={ref}
        {...htmlProps}
      >
        {(language != null || windowControls) && (
          // Divider uses the semantic stroke (theme-aware); the label inherits the
          // variant's own text colour, so it stays legible on every surface.
          <div className="astralis:flex astralis:items-center astralis:gap-2 astralis:px-4 astralis:py-2.5 astralis:text-xs astralis:font-mono astralis:font-medium astralis:border-b astralis:border-stroke-base astralis:select-none">
            {windowControls && <TrafficLights />}
            {language != null && <span className="astralis:opacity-higher">{language}</span>}
          </div>
        )}
        <pre
          className={resolveStyleProps(bodyVariantProps, {
            maps: codeBlockBodyMap,
            variants: codeBlockBodyVariants,
          })}
        >
          {highlightedHtml != null ? (
            <code dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
          ) : (
            <code>{children}</code>
          )}
        </pre>
      </Element>
    );
  },
) as unknown as CodeBlockComponent;

(CodeBlock as any).displayName = "CodeBlock";
export default CodeBlock;
