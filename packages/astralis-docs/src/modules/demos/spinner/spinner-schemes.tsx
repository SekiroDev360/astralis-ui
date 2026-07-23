import { HStack, Spinner } from "astralis-ui";

export function SpinnerSchemes() {
  return (
    <HStack gap="6" alignItems="center">
      <Spinner colorScheme="brand" />
      <Spinner colorScheme="blue" />
      <Spinner colorScheme="green" />
      <Spinner colorScheme="purple" />
      <Spinner colorScheme="gray" />
    </HStack>
  );
}
