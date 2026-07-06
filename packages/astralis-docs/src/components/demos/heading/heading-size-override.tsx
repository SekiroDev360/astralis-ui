import { Heading, Text, VStack } from "astralis-ui";

export function HeadingSizeOverride() {
  return (
    /* Semantics and visuals are independent: pick the level for the
       document outline, the size for the design. */
    <VStack gap="1" alignItems="start">
      <Heading as="h2" size="6xl" letterSpacing="tighter">
        Visually huge
      </Heading>
      <Text color="muted" size="sm">
        …but still an h2 in the document outline.
      </Text>
    </VStack>
  );
}
