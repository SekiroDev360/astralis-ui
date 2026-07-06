import { Box, Text } from "astralis-ui";

export function BoxResponsive() {
  return (
    <Box
      bg="green-subtle"
      rounded={{ base: "md", md: "2xl" }}
      p={{ base: "4", md: "8", lg: "12" }}
    >
      <Text size="sm" color="muted">
        Resize the window — padding and radius step up at md and lg.
      </Text>
    </Box>
  );
}
