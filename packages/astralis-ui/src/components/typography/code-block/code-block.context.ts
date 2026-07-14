import { createContext, useContext } from "react";
import type { CodeBlockSize } from "./code-block.types";

interface CodeBlockContextValue {
  /** Source string from Root — read by Code (fallback render) and CopyTrigger. */
  code?: string;
  size: CodeBlockSize;
}

export const CodeBlockContext = createContext<CodeBlockContextValue>({ size: "md" });

export function useCodeBlockContext() {
  return useContext(CodeBlockContext);
}
