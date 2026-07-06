import { Blockquote, VStack } from "astralis-ui";

export function BlockquoteVariants() {
  return (
    <VStack gap="5" alignItems="stretch" w="full" maxW="md">
      <Blockquote variant="plain">
        plain — a leading rule and nothing else.
      </Blockquote>
      <Blockquote variant="subtle">
        subtle — the rule plus a tinted panel behind the quote.
      </Blockquote>
      <Blockquote variant="subtle" borderColor="brand-stroke">
        The rule color is just a Box prop — recolor it with borderColor.
      </Blockquote>
    </VStack>
  );
}
