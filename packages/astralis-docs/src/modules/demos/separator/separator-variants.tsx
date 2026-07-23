import { Separator, Text, VStack } from "astralis-ui";

export function SeparatorVariants() {
  return (
    <VStack gap="5" alignItems="stretch" w="full" maxW="sm">
      <VStack gap="1" alignItems="stretch">
        <Text as="span" size="xs" color="muted">solid</Text>
        <Separator variant="solid" />
      </VStack>
      <VStack gap="1" alignItems="stretch">
        <Text as="span" size="xs" color="muted">dashed</Text>
        <Separator variant="dashed" />
      </VStack>
      <VStack gap="1" alignItems="stretch">
        <Text as="span" size="xs" color="muted">dotted</Text>
        <Separator variant="dotted" />
      </VStack>
      <VStack gap="1" alignItems="stretch">
        <Text as="span" size="xs" color="muted">colored via borderColor</Text>
        <Separator borderColor="brand-stroke" border="moderate" />
      </VStack>
    </VStack>
  );
}
