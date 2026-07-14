import type { Ref } from "react";
import { useCodeBlockContext } from "../code-block.context";
import { codeBlockContentVariants } from "../code-block.styles";
import type { CodeBlockContentProps } from "../code-block.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function CodeBlockContent({
  className = "",
  style,
  children,
  ref,
  ...rest
}: CodeBlockContentProps & { ref?: Ref<HTMLPreElement> }) {
  const { size } = useCodeBlockContext();

  return (
    <pre ref={ref} className={astralisMerge(codeBlockContentVariants({ size }), className)} style={style} {...rest}>
      {children}
    </pre>
  );
}

CodeBlockContent.displayName = "CodeBlock.Content";
