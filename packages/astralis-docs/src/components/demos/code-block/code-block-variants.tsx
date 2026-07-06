import { CodeBlock, VStack } from "astralis-ui";

export function CodeBlockVariants() {
  return (
    <VStack gap="4" alignItems="stretch" w="full" maxW="md">
      <CodeBlock variant="subtle" size="sm">
        {`pnpm add astralis-ui  # subtle`}
      </CodeBlock>
      <CodeBlock variant="outline" size="sm">
        {`pnpm add astralis-ui  # outline`}
      </CodeBlock>
      <CodeBlock variant="solid" size="sm">
        {`pnpm add astralis-ui  # solid`}
      </CodeBlock>
    </VStack>
  );
}
