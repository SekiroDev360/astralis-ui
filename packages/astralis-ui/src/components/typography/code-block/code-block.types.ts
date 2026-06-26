import type { VariantProps } from "class-variance-authority";
import type { ElementType, ReactNode } from "react";
import type { BoxProps } from "../../layout/box";
import type { Responsive } from "../../../utils/responsive";
import type { codeBlockVariants, codeBlockBodyVariants } from "./code-block.styles";

interface CodeBlockCustomProps {
  /** Optional language tag rendered as a small header above the code. */
  language?: ReactNode;
  /** Show macOS-style window dots in the header (works with any variant). */
  windowControls?: boolean;
  /**
   * Opt-in syntax-highlighting slot. Pass pre-tokenized HTML (e.g. the output of
   * Shiki/Prism in the consumer app) and it renders raw inside `<code>`, bypassing
   * `children`. The library stays dependency-free; highlighting is the consumer's call.
   */
  highlightedHtml?: string;
}

type CodeBlockBaseProps = CodeBlockCustomProps &
  Responsive<VariantProps<typeof codeBlockVariants>> &
  Responsive<VariantProps<typeof codeBlockBodyVariants>>;

export type CodeBlockProps<T extends ElementType = "div"> = Omit<
  BoxProps<T>,
  keyof CodeBlockBaseProps
> &
  CodeBlockBaseProps;
