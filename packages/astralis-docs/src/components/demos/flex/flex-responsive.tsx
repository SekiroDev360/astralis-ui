import { Flex, Box, Text } from "astralis-ui";

export function FlexResponsive() {
  return (
    /* Column on mobile, row from md up. */
    <Flex direction={{ base: "column", md: "row" }} gap="3" w="full" maxW="md">
      <Box bg="teal-subtle" p="4" rounded="lg">
        <Text size="sm">One</Text>
      </Box>
      <Box bg="teal-muted" p="4" rounded="lg">
        <Text size="sm">Two</Text>
      </Box>
      <Box bg="teal-emphasized" p="4" rounded="lg">
        <Text size="sm">Three</Text>
      </Box>
    </Flex>
  );
}
