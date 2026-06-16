import { forwardRef, type ElementType, type ReactNode, type Ref } from "react";
import type { StackProps } from "./stack.types";
import Flex from "../flex";

type StackComponent = <T extends ElementType = "div">(
  props: StackProps<T> & { ref?: Ref<any> },
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

export const HStack = forwardRef((props: Omit<StackProps<any>, "direction">, ref: Ref<any>) => (
  <Stack ref={ref} direction="horizontal" alignItems="center" {...props} />
)) as unknown as Omit<StackComponent, "direction">;
(HStack as any).displayName = "HStack";

export const VStack = forwardRef((props: Omit<StackProps<any>, "direction">, ref: Ref<any>) => (
  <Stack ref={ref} direction="vertical" {...props} />
)) as unknown as Omit<StackComponent, "direction">;
(VStack as any).displayName = "VStack";

export default Stack