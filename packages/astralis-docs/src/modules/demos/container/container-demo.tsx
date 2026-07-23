import { Container, Box, Text } from "astralis-ui";

export function ContainerDemo() {
  return (
    <Box bg="subtle" w="full" py="6" rounded="xl">
      <Container maxW="md" bg="panel" py="5" rounded="lg" border="normal" borderColor="subtle">
        <Text size="sm" weight="semibold">Centered content</Text>
        <Text size="sm" color="muted">
          A Container caps its width, centers itself with auto margins, and
          keeps gutter padding on small screens.
        </Text>
      </Container>
    </Box>
  );
}
