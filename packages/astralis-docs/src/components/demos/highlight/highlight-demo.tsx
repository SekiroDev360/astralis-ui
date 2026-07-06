import { Highlight, Text, Box } from "astralis-ui";

export function HighlightDemo() {
  return (
    <Box maxW="md">
      <Text>
        <Highlight query="semantic tokens">
          Astralis paints every component with semantic tokens, so one brand
          color and a dark-mode class restyle the whole library.
        </Highlight>
      </Text>
    </Box>
  );
}
