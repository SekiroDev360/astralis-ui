import { forwardRef, type ReactNode, type Ref } from "react";
import type { HeadingElement, HeadingProps } from "./heading.types";
import Text from "../text";

type HeadingComponent = <T extends HeadingElement = "h2">(
  props: HeadingProps<T> & { ref?: Ref<any> },
) => ReactNode;

const Heading = forwardRef(
  <T extends HeadingElement = "h2">(
    { as, ...props }: HeadingProps<T>,
    ref: Ref<any>,
  ) => {
    const Element = as || "h2"

    return (
      <Text
        as={Element as any}
        ref={ref}
        fontFamily={"heading"}
        lineHeight={"tight"}
        letterSpacing={"tight"}
        {...props}
      />
    );
  },
) as unknown as HeadingComponent
(Heading as any).displayName = "Heading"

export default Heading