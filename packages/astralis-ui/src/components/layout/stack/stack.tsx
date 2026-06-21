import { forwardRef, type ElementType, type ReactNode, type Ref } from "react";
import type { StackProps } from "./stack.types";
import Flex from "../flex";

type StackComponent = <T extends ElementType = "div">(
  props: StackProps<T> & { ref?: Ref<any> },
) => ReactNode;

/** HStack/VStack are presets — `direction` is fixed, so it's omitted from their props. */
type StackPresetComponent = <T extends ElementType = "div">(
  props: Omit<StackProps<T>, "direction"> & { ref?: Ref<any> },
) => ReactNode;

const Stack = forwardRef(({ direction = "vertical", as, children, ...props }: StackProps<any>, ref: Ref<any>) => {
  const flexDirection = direction === 'vertical' ? 'column' : 'row'

  return (
    <Flex
      ref={ref}
      as={as}
      direction={flexDirection}
      {...props}
    >
      {children}
    </Flex>
  )
}) as unknown as StackComponent
(Stack as any).displayName = "Stack"

// `alignItems` is a default (overridable via props); `direction` is forced last so
// it always wins over any spread prop.
export const HStack = forwardRef((props: Omit<StackProps<any>, "direction">, ref: Ref<any>) => (
  <Stack ref={ref} alignItems="center" {...props} direction="horizontal" />
)) as unknown as StackPresetComponent;
(HStack as any).displayName = "HStack";

export const VStack = forwardRef((props: Omit<StackProps<any>, "direction">, ref: Ref<any>) => (
  <Stack ref={ref} {...props} direction="vertical" />
)) as unknown as StackPresetComponent;
(VStack as any).displayName = "VStack";

export default Stack