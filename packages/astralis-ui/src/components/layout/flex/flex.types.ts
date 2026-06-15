import type { ElementType } from "react";
import type { BoxProps } from "../box";
import type { VariantProps } from "class-variance-authority";
import type { flexVariants } from "./flex.style";

type FlexVariantProps = VariantProps<typeof flexVariants>;

interface FlexCustomProps {
  direction?: FlexVariantProps["direction"];
  justify?: FlexVariantProps["justify"];
  align?: FlexVariantProps["align"];
  wrap?: FlexVariantProps["wrap"];
  gap?: FlexVariantProps["gap"];
  rowGap?: FlexVariantProps["rowGap"];
  columnGap?: FlexVariantProps["columnGap"];
}

export type FlexProps<T extends ElementType = "div"> = BoxProps<T> &
  FlexCustomProps;
