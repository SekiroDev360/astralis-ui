import type { ElementType } from "react";
import type { BoxProps } from "../box";

/** Center adds no custom props — it's a Box that centers its children on both axes. */
export type CenterProps<T extends ElementType = "div"> = BoxProps<T>;
