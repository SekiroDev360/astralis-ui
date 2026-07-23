"use client";

import { Grid, Center, Text } from "astralis-ui";

export function GridSpan() {
  return (
    <Grid columns="4" rows="2" gap="3" w="full" maxW="md">
      <Grid.Item colSpan="2" rowSpan="2">
        <Center bg="orange-solid" rounded="lg" size="full" minH="24">
          <Text size="sm" color="inverted">2 × 2</Text>
        </Center>
      </Grid.Item>
      <Grid.Item colSpan="2">
        <Center bg="orange-muted" rounded="lg" p="4">
          <Text size="sm">2 × 1</Text>
        </Center>
      </Grid.Item>
      <Center bg="orange-subtle" rounded="lg" p="4">
        <Text size="sm">1</Text>
      </Center>
      <Center bg="orange-subtle" rounded="lg" p="4">
        <Text size="sm">1</Text>
      </Center>
    </Grid>
  );
}
