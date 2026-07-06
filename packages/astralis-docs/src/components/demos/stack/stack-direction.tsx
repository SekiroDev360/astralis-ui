import { Stack, Box, Text, VStack } from "astralis-ui";

export function StackDirection() {
  return (
    <VStack gap="5" alignItems="stretch">
      <VStack gap="1" alignItems="stretch">
        <Text as="span" size="xs" color="muted">vertical (default)</Text>
        <Stack gap="2">
          <Box bg="cyan-subtle" px="4" py="2" rounded="md"><Text size="xs">One</Text></Box>
          <Box bg="cyan-muted" px="4" py="2" rounded="md"><Text size="xs">Two</Text></Box>
        </Stack>
      </VStack>
      <VStack gap="1" alignItems="stretch">
        <Text as="span" size="xs" color="muted">horizontal</Text>
        <Stack direction="horizontal" gap="2">
          <Box bg="cyan-subtle" px="4" py="2" rounded="md"><Text size="xs">One</Text></Box>
          <Box bg="cyan-muted" px="4" py="2" rounded="md"><Text size="xs">Two</Text></Box>
        </Stack>
      </VStack>
    </VStack>
  );
}
