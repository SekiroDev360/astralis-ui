import type {  ElementType } from "react";
import type { BoxProps } from "../box";
import type { VariantProps } from "class-variance-authority";
import type { flexVariants, flexItemVariants } from "./flex.style";

type FlexVariantProps = VariantProps<typeof flexVariants>;
type FlexItemVariantProps = VariantProps<typeof flexItemVariants>;

interface FlexCustomProps {
  direction?: FlexVariantProps["direction"];
  justifyContent?: FlexVariantProps["justifyContent"];
  alignItems?: FlexVariantProps["alignItems"];
  alignContent?: FlexVariantProps["alignContent"];
  placeContent?: FlexVariantProps["placeContent"];
  placeItems?: FlexVariantProps["placeItems"];
  wrap?: FlexVariantProps["wrap"];
  gap?: FlexVariantProps["gap"];
  rowGap?: FlexVariantProps["rowGap"];
  columnGap?: FlexVariantProps["columnGap"];
}
interface FlexItemCustomProps {
  basis?: FlexItemVariantProps["basis"];
  flex?: FlexItemVariantProps["flex"];
  grow?: FlexItemVariantProps["grow"];
  shrink?: FlexItemVariantProps["shrink"];
  order?: FlexItemVariantProps["order"];
  alignSelf?: FlexItemVariantProps["alignSelf"];
  justifySelf?: FlexItemVariantProps["justifySelf"];
  placeSelf?: FlexItemVariantProps["placeSelf"];
}

export type FlexItemProps<T extends ElementType = "div"> = BoxProps<T> &
  FlexItemCustomProps;

export type FlexProps<T extends ElementType = "div"> = BoxProps<T> &
  FlexCustomProps;