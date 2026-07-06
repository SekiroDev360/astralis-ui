import { Button, HStack } from "astralis-ui";

export function ButtonRounded() {
  return (
    <HStack gap="3" wrap="wrap" justifyContent="center">
      <Button variant="surface" rounded="none">None</Button>
      <Button variant="surface" rounded="sm">Small</Button>
      <Button variant="surface" rounded="lg">Large</Button>
      <Button variant="surface" rounded="2xl">2XL</Button>
      <Button variant="surface" rounded="full">Full</Button>
    </HStack>
  );
}
