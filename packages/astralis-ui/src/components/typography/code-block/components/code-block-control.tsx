import type { Ref } from "react";
import { codeBlockControlClasses } from "../code-block.styles";
import type { CodeBlockControlProps } from "../code-block.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function CodeBlockControl({
  className = "",
  style,
  children,
  ref,
  ...rest
}: CodeBlockControlProps & { ref?: Ref<HTMLDivElement> }) {
  return (
    <div ref={ref} className={astralisMerge(codeBlockControlClasses, className)} style={style} {...rest}>
      {children}
    </div>
  );
}

CodeBlockControl.displayName = "CodeBlock.Control";
