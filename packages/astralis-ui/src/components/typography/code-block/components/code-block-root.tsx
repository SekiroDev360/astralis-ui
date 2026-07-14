import type { Ref } from "react";
import { CodeBlockContext } from "../code-block.context";
import { codeBlockRootVariants } from "../code-block.styles";
import type { CodeBlockRootProps } from "../code-block.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

export function CodeBlockRoot({
  variant = "subtle",
  size = "md",
  code,
  className = "",
  style,
  children,
  ref,
  ...rest
}: CodeBlockRootProps & { ref?: Ref<HTMLDivElement> }) {
  return (
    <CodeBlockContext.Provider value={{ code, size }}>
      <div
        ref={ref}
        className={astralisMerge(codeBlockRootVariants({ variant }), className)}
        style={style}
        {...rest}
      >
        {children}
      </div>
    </CodeBlockContext.Provider>
  );
}

CodeBlockRoot.displayName = "CodeBlock.Root";
