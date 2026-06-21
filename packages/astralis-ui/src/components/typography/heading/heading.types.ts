import type { TextProps } from "../text";

export type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type HeadingProps<T extends HeadingElement = "h2"> = Omit<
  TextProps<T>,
  "as" | "paragraph"
> & {
  as?: T;
};
