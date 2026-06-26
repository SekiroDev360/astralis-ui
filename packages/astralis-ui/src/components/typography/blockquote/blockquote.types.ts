import type { VariantProps } from "class-variance-authority";
import type { ElementType, ReactNode } from "react";
import type { BoxProps } from "../../layout/box";
import type { Responsive } from "../../../utils/responsive";
import type { blockquoteVariants } from "./blockquote.styles";

interface BlockquoteCustomProps {
  /** Visible attribution, rendered beneath the quote as a `<cite>` line. */
  cite?: ReactNode;
  /** URL of the source, set as the native `cite` attribute on the element. */
  citeUrl?: string;
}

type BlockquoteBaseProps = BlockquoteCustomProps &
  Responsive<VariantProps<typeof blockquoteVariants>>;

export type BlockquoteProps<T extends ElementType = "blockquote"> = Omit<
  BoxProps<T>,
  keyof BlockquoteBaseProps
> &
  BlockquoteBaseProps;
