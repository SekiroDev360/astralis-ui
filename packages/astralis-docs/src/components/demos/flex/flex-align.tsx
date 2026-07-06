import { Flex, Box, Text, VStack } from "astralis-ui";

const justifyValues = ["start", "center", "end", "between", "around", "evenly"] as const;

export function FlexAlign() {
  return (
    <VStack gap="4" alignItems="stretch" w="full" maxW="md">
      {justifyValues.map((justify) => (
        <VStack key={justify} gap="1" alignItems="stretch">
          <Text as="span" size="xs" color="muted">
            justifyContent=&quot;{justify}&quot;
          </Text>
          <Flex justifyContent={justify} gap="2" bg="subtle" p="2" rounded="lg">
            <Box size="8" bg="brand-solid" rounded="md" />
            <Box size="8" bg="brand-muted" rounded="md" />
            <Box size="8" bg="brand-subtle" rounded="md" />
          </Flex>
        </VStack>
      ))}
    </VStack>
  );
}
