import { ThemeToggle, HStack } from "astralis-ui";

export function ThemeToggleVariants() {
  return (
    <HStack gap="3" wrap="wrap" justifyContent="center">
      <ThemeToggle variant="solid" />
      <ThemeToggle variant="subtle" />
      <ThemeToggle variant="outline" />
      <ThemeToggle variant="text" />
      <ThemeToggle variant="subtle" colorScheme="purple" showLabel />
      <ThemeToggle variant="outline" colorScheme="gray" rounded="full" />
    </HStack>
  );
}
