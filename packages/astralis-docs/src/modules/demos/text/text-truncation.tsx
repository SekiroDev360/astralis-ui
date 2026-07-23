import { Text, VStack, Box } from "astralis-ui";

const long =
  "Space is big. You just won't believe how vastly, hugely, mind-bogglingly big it is. You may think it's a long way down the road to the chemist's, but that's just peanuts to space.";

export function TextTruncation() {
  return (
    <VStack gap="4" alignItems="stretch" w="full" maxW="xs">
      <Box>
        <Text size="xs" color="subtle" gutterBottom>truncate — one line, ellipsis</Text>
        <Text size="sm" truncate>{long}</Text>
      </Box>
      <Box>
        <Text size="xs" color="subtle" gutterBottom>lineClamp=&quot;3&quot;</Text>
        <Text size="sm" lineClamp="3">{long}</Text>
      </Box>
    </VStack>
  );
}
