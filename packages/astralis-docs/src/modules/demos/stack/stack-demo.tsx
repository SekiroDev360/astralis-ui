import { VStack, Box, Text } from "astralis-ui";

export function StackDemo() {
  return (
    <VStack gap="3" alignItems="stretch" w="full" maxW="sm">
      {["Design review at 10:00", "Ship the docs site", "Water the plants"].map((task) => (
        <Box key={task} bg="panel" p="4" rounded="lg" border="normal" borderColor="subtle">
          <Text size="sm">{task}</Text>
        </Box>
      ))}
    </VStack>
  );
}
