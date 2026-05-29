import { BlockquoteCaption } from "./components/blockquote-caption";
import { BlockquoteContent } from "./components/blockquote-content";
import { BlockquoteIcon } from "./components/blockquote-icon";
import { BlockquoteRoot } from "./components/blockquote-root";

export const Blockquote = Object.assign(BlockquoteRoot, {
  Root: BlockquoteRoot,
  Content: BlockquoteContent,
  Caption: BlockquoteCaption,
  Icon: BlockquoteIcon,
});

export {
  BlockquoteRoot,
  BlockquoteContent,
  BlockquoteCaption,
  BlockquoteIcon,
};

export type {
  BlockquoteRootProps,
  BlockquoteContentProps,
  BlockquoteCaptionProps,
  BlockquoteIconProps,
  BlockquoteVariant,
  BlockquoteColorScheme,
  BlockquoteJustify,
} from "./blockquote.types";
