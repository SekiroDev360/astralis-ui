import { CodeBlockCode } from "./components/code-block-code";
import { CodeBlockContent } from "./components/code-block-content";
import { CodeBlockControl } from "./components/code-block-control";
import { CodeBlockCopyTrigger } from "./components/code-block-copy-trigger";
import { CodeBlockHeader } from "./components/code-block-header";
import { CodeBlockRoot } from "./components/code-block-root";
import { CodeBlockTitle } from "./components/code-block-title";
import { CodeBlockWindowControls } from "./components/code-block-window-controls";

export const CodeBlock = Object.assign(CodeBlockRoot, {
  Root: CodeBlockRoot,
  Header: CodeBlockHeader,
  Title: CodeBlockTitle,
  Control: CodeBlockControl,
  CopyTrigger: CodeBlockCopyTrigger,
  WindowControls: CodeBlockWindowControls,
  Content: CodeBlockContent,
  Code: CodeBlockCode,
});

export {
  CodeBlockRoot,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockControl,
  CodeBlockCopyTrigger,
  CodeBlockWindowControls,
  CodeBlockContent,
  CodeBlockCode,
};

export type {
  CodeBlockSize,
  CodeBlockVariant,
  CodeBlockRootProps,
  CodeBlockHeaderProps,
  CodeBlockTitleProps,
  CodeBlockControlProps,
  CodeBlockCopyTriggerProps,
  CodeBlockWindowControlsProps,
  CodeBlockContentProps,
  CodeBlockCodeProps,
} from "./code-block.types";
