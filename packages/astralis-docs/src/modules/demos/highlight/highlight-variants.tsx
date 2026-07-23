import { Highlight, Text, VStack } from "astralis-ui";

export function HighlightVariants() {
  return (
    <VStack gap="3" alignItems="start" maxW="md">
      <Text>
        <Highlight query={["planets", "moons"]}>
          Multiple queries: eight planets, hundreds of moons.
        </Highlight>
      </Text>
      <Text>
        <Highlight query="solid" variant="solid">
          The solid variant fills the mark with the full yellow.
        </Highlight>
      </Text>
      <Text>
        <Highlight query="CASE" ignoreCase={false}>
          Set ignoreCase to false and only exact CASE matches — not case — light up.
        </Highlight>
      </Text>
    </VStack>
  );
}
