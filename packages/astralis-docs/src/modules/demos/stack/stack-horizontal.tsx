import { HStack, Box, Text, Button } from "astralis-ui";

export function StackHorizontal() {
  return (
    /* HStack centers its children vertically by default. */
    <HStack gap="4" bg="panel" p="4" rounded="xl" border="normal" borderColor="subtle">
      <Box size="12" bg="purple-solid" rounded="full" />
      <Box>
        <Text size="sm" weight="semibold">Orbit weekly</Text>
        <Text size="xs" color="muted">12 unread updates</Text>
      </Box>
      <Button size="sm" variant="subtle" colorScheme="purple">
        Open
      </Button>
    </HStack>
  );
}
