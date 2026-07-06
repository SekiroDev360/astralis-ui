import { Box, Text } from "astralis-ui";

export function BoxAs() {
  return (
    /* Renders a semantic <aside>; any element or component works. */
    <Box as="aside" bg="blue-subtle" p="5" rounded="lg" maxW="md">
      <Text size="sm" weight="medium">
        Did you know?
      </Text>
      <Text size="sm" color="muted">
        Box is polymorphic — the `as` prop swaps the rendered element while
        keeping every style prop.
      </Text>
    </Box>
  );
}
