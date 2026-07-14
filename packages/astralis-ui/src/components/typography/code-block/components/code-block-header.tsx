import type { Ref } from "react";
import { codeBlockHeaderClasses } from "../code-block.styles";
import type { CodeBlockHeaderProps } from "../code-block.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function CodeBlockHeader({
  className = "",
  style,
  children,
  ref,
  ...rest
}: CodeBlockHeaderProps & { ref?: Ref<HTMLDivElement> }) {
  return (
    <div ref={ref} className={astralisMerge(codeBlockHeaderClasses, className)} style={style} {...rest}>
      {children}
    </div>
  );
}

CodeBlockHeader.displayName = "CodeBlock.Header";
