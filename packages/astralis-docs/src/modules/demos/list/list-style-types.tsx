"use client";

import { List, Text, Grid, VStack } from "astralis-ui";

const styleTypes = ["disc", "circle", "square", "decimal", "lower-alpha", "upper-roman"] as const;

export function ListStyleTypes() {
  return (
    <Grid columns={{ base: "2", md: "3" }} gap="6" w="full" maxW="md">
      {styleTypes.map((styleType) => (
        <VStack key={styleType} gap="1" alignItems="start">
          <Text as="span" size="xs" color="subtle">{styleType}</Text>
          {/* Ordered markers belong on an <ol> — as swaps the element. */}
          <List styleType={styleType} as={styleType === "disc" || styleType === "circle" || styleType === "square" ? "ul" : "ol"} spacing="1">
            <List.Item>One</List.Item>
            <List.Item>Two</List.Item>
            <List.Item>Three</List.Item>
          </List>
        </VStack>
      ))}
    </Grid>
  );
}
