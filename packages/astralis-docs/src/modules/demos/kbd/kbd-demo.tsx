import { HStack, Kbd, Text } from "astralis-ui";

export function KbdDemo() {
  return (
    <HStack gap="6" alignItems="center" wrap="wrap">
      <HStack gap="1" alignItems="center">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </HStack>
      <HStack gap="1" alignItems="center">
        <Kbd>Ctrl</Kbd>
        <Text size="xs" color="subtle">+</Text>
        <Kbd>Shift</Kbd>
        <Text size="xs" color="subtle">+</Text>
        <Kbd>P</Kbd>
      </HStack>
      <HStack gap="1" alignItems="center">
        <Kbd size="sm">esc</Kbd>
        <Kbd size="md">tab</Kbd>
        <Kbd size="lg">enter</Kbd>
      </HStack>
    </HStack>
  );
}
