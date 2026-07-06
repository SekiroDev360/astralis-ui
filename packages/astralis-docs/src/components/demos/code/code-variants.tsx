import { Code, HStack, VStack, Text } from "astralis-ui";

export function CodeVariants() {
  return (
    <VStack gap="5" alignItems="start">
      <VStack gap="1" alignItems="start">
        <Text as="span" size="xs" color="subtle">variants</Text>
        <HStack gap="3">
          <Code variant="subtle">subtle</Code>
          <Code variant="solid">solid</Code>
          <Code variant="outline">outline</Code>
        </HStack>
      </VStack>
      <VStack gap="1" alignItems="start">
        <Text as="span" size="xs" color="subtle">sizes</Text>
        <HStack gap="3" alignItems="center">
          <Code size="sm">size sm</Code>
          <Code size="md">size md</Code>
          <Code size="lg">size lg</Code>
        </HStack>
      </VStack>
    </VStack>
  );
}
