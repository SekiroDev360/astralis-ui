import { HStack, Spinner } from "astralis-ui";

export function SpinnerDemo() {
  return (
    <HStack gap="6" alignItems="center">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </HStack>
  );
}
