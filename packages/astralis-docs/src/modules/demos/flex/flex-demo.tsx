import { Flex, Box, Text, Button } from "astralis-ui";

export function FlexDemo() {
  return (
    <Flex
      justifyContent="between"
      alignItems="center"
      gap="4"
      w="full"
      maxW="lg"
      bg="panel"
      p="4"
      rounded="xl"
      border="normal"
      borderColor="subtle"
    >
      <Flex alignItems="center" gap="3">
        <Box size="10" bg="brand-solid" rounded="full" />
        <Box>
          <Text size="sm" weight="semibold">Nova Starling</Text>
          <Text size="xs" color="muted">Product designer</Text>
        </Box>
      </Flex>
      <Button size="sm" variant="outline" colorScheme="gray">
        Follow
      </Button>
    </Flex>
  );
}
