import { Box, HStack } from "astralis-ui";

export function BoxStyleProps() {
  return (
    <HStack gap="4" wrap="wrap" justifyContent="center">
      <Box bg="brand-subtle" size="16" rounded="md" />
      <Box bg="brand-muted" size="16" rounded="lg" />
      <Box bg="brand-solid" size="16" rounded="xl" shadow="md" />
      <Box bg="transparent" size="16" rounded="xl" border="thick" borderColor="brand-stroke" />
      <Box bg="inverted" size="16" rounded="full" />
    </HStack>
  );
}
