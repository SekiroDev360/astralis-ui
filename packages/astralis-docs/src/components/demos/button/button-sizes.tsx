import { Button, HStack } from "astralis-ui";

export function ButtonSizes() {
  return (
    <HStack gap="3" wrap="wrap" justifyContent="center">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra large</Button>
    </HStack>
  );
}
