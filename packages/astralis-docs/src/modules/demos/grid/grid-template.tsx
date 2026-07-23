"use client";

import { Grid, Center, Text } from "astralis-ui";

export function GridTemplate() {
  return (
    /* templateAreas + Grid.Item area — the escape hatch for named layouts. */
    <Grid
      templateAreas={`"header header" "sidebar main" "footer footer"`}
      templateColumns="8rem 1fr"
      gap="3"
      w="full"
      maxW="md"
    >
      <Grid.Item area="header">
        <Center bg="green-solid" p="3" rounded="lg">
          <Text size="xs" color="inverted">header</Text>
        </Center>
      </Grid.Item>
      <Grid.Item area="sidebar">
        <Center bg="green-muted" p="3" rounded="lg" size="full" minH="20">
          <Text size="xs">sidebar</Text>
        </Center>
      </Grid.Item>
      <Grid.Item area="main">
        <Center bg="green-subtle" p="3" rounded="lg" size="full">
          <Text size="xs">main</Text>
        </Center>
      </Grid.Item>
      <Grid.Item area="footer">
        <Center bg="green-muted" p="3" rounded="lg">
          <Text size="xs">footer</Text>
        </Center>
      </Grid.Item>
    </Grid>
  );
}
