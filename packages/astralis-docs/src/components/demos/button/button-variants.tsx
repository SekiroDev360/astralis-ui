import { Button, HStack } from "astralis-ui";

export function ButtonVariants() {
  return (
    <HStack gap="3" wrap="wrap" justifyContent="center">
      <Button variant="solid">Solid</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="surface">Surface</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="text">Text</Button>
      <Button variant="link">Link</Button>
    </HStack>
  );
}
