import type { VariantProps } from "class-variance-authority";
import type { ElementType, ReactNode } from "react";
import type { BoxProps } from "../../layout/box";
import type { Responsive } from "../../../utils/responsive";
import type { listVariants } from "./list.styles";

/** `styleType` and `spacing` each accept a scalar token or a responsive map. */
type ListCustomProps = Responsive<VariantProps<typeof listVariants>>;

export type ListProps<T extends ElementType = "ul"> = BoxProps<T> & ListCustomProps;

interface ListItemCustomProps {
  /** Optional leading icon; suppresses the native marker and aligns content beside it. */
  icon?: ReactNode;
}

export type ListItemProps<T extends ElementType = "li"> = Omit<
  BoxProps<T>,
  keyof ListItemCustomProps
> &
  ListItemCustomProps;
