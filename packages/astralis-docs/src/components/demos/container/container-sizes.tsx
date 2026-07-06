import { Container, Text, VStack } from "astralis-ui";

const sizes = ["xs", "md", "2xl"] as const;

export function ContainerSizes() {
  return (
    <VStack gap="3" w="full" alignItems="stretch">
      {sizes.map((size) => (
        <Container key={size} maxW={size} bg="teal-subtle" py="3" rounded="lg">
          <Text size="xs">maxW=&quot;{size}&quot;</Text>
        </Container>
      ))}
    </VStack>
  );
}
