import type { Ref } from "react";
import type { CodeBlockWindowControlsProps } from "../code-block.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

const dotClasses = "astralis:block astralis:size-3 astralis:rounded-full";

/** macOS-style window dots — a small splash of colour that reads instantly as "editor". */
export function CodeBlockWindowControls({
  className = "",
  style,
  ref,
  ...rest
}: CodeBlockWindowControlsProps & { ref?: Ref<HTMLSpanElement> }) {
  return (
    <span
      ref={ref}
      className={astralisMerge("astralis:flex astralis:items-center astralis:gap-1.5", className)}
      style={style}
      aria-hidden="true"
      {...rest}
    >
      <span className={`${dotClasses} astralis:bg-red-400`} />
      <span className={`${dotClasses} astralis:bg-yellow-400`} />
      <span className={`${dotClasses} astralis:bg-green-400`} />
    </span>
  );
}

CodeBlockWindowControls.displayName = "CodeBlock.WindowControls";
