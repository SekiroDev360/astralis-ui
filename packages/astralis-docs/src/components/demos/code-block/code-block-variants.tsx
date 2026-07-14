"use client";

import { CodeBlock, VStack } from "astralis-ui";

const variants = ["subtle", "outline", "solid"] as const;

export function CodeBlockVariants() {
  return (
    <VStack gap="4" alignItems="stretch" w="full" maxW="md">
      {variants.map((variant) => (
        <CodeBlock.Root key={variant} variant={variant} size="sm" code={`pnpm add astralis-ui  # ${variant}`}>
          <CodeBlock.Content>
            <CodeBlock.Code />
          </CodeBlock.Content>
        </CodeBlock.Root>
      ))}
    </VStack>
  );
}
