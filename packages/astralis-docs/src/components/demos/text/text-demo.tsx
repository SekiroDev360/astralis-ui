import { Text, VStack } from "astralis-ui";

export function TextDemo() {
  return (
    <VStack gap="1" maxW="md">
      <Text size="lg" weight="semibold">
        Typography that stays on scale
      </Text>
      <Text color="muted">
        Text is the prose primitive — size, weight, color and spacing come
        from the token scale, and every prop takes a responsive map.
      </Text>
      <Text size="sm" color="subtle" fontStyle="italic">
        Last updated three minutes ago
      </Text>
    </VStack>
  );
}
