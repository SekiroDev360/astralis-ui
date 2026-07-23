import { Float, Center, Box, Text } from "astralis-ui";

export function FloatDemo() {
  return (
    /* Float anchors to the nearest positioned ancestor. */
    <Box position="relative" bg="panel" p="6" rounded="xl" border="normal" borderColor="subtle" maxW="3xs">
      <Text size="sm" weight="semibold">Inbox</Text>
      <Text size="xs" color="muted">3 unread messages</Text>
      <Float placement="top-end">
        <Center bg="red-solid" size="6" rounded="full">
          <Text size="xs" color="inverted">3</Text>
        </Center>
      </Float>
    </Box>
  );
}
