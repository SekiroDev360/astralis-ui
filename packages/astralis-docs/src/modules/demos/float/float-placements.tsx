import { Float, Box, Center, Text } from "astralis-ui";

const placements = [
  "top-start", "top-center", "top-end",
  "middle-start", "middle-center", "middle-end",
  "bottom-start", "bottom-center", "bottom-end",
] as const;

export function FloatPlacements() {
  return (
    <Box position="relative" bg="subtle" w="full" maxW="sm" h="40" rounded="xl">
      {placements.map((placement) => (
        <Float key={placement} placement={placement}>
          <Center bg="brand-solid" px="2" h="5" rounded="full">
            <Text size="xs" color="inverted">{placement}</Text>
          </Center>
        </Float>
      ))}
    </Box>
  );
}
