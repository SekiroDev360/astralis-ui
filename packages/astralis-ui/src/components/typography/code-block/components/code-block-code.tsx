import type { Ref } from "react";
import { useCodeBlockContext } from "../code-block.context";
import type { CodeBlockCodeProps } from "../code-block.types";

export function CodeBlockCode({
  highlightedHtml,
  children,
  ref,
  ...rest
}: CodeBlockCodeProps & { ref?: Ref<HTMLElement> }) {
  const { code } = useCodeBlockContext();

  if (highlightedHtml != null) {
    return <code ref={ref} dangerouslySetInnerHTML={{ __html: highlightedHtml }} {...rest} />;
  }

  return (
    <code ref={ref} {...rest}>
      {children ?? code}
    </code>
  );
}

CodeBlockCode.displayName = "CodeBlock.Code";
