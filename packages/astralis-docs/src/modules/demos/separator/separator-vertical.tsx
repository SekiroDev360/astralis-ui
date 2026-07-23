import { Separator, Text, HStack } from "astralis-ui";

export function SeparatorVertical() {
  return (
    <HStack gap="4" h="6">
      <Text size="sm">Docs</Text>
      <Separator orientation="vertical" />
      <Text size="sm">Components</Text>
      <Separator orientation="vertical" />
      <Text size="sm">Changelog</Text>
    </HStack>
  );
}
