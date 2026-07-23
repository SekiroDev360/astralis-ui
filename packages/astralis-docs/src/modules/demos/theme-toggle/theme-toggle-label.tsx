import { ThemeToggle, HStack } from "astralis-ui";

export function ThemeToggleLabel() {
  return (
    <HStack gap="3" wrap="wrap" justifyContent="center">
      <ThemeToggle showLabel size="sm" />
      <ThemeToggle showLabel />
      <ThemeToggle showLabel size="lg" />
    </HStack>
  );
}
