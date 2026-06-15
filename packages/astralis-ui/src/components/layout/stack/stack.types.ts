import type { ElementType } from "react";
import type { FlexProps } from "../flex";

interface StackCustomProps {
  direction?: "horizontal" | "vertical";
}

export type StackProps<T extends ElementType = "div"> = StackCustomProps &
  Omit<FlexProps<T>, "direction">;
