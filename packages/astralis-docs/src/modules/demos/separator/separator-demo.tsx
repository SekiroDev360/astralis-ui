import { Separator, Text, VStack } from "astralis-ui";

export function SeparatorDemo() {
  return (
    <VStack gap="3" alignItems="stretch" w="full" maxW="sm">
      <Text size="sm" weight="semibold">Astralis UI</Text>
      <Separator />
      <Text size="sm" color="muted">
        A dividing line with `role="separator"` built in — horizontal by
        default, one prop to go vertical.
      </Text>
    </VStack>
  );
}
