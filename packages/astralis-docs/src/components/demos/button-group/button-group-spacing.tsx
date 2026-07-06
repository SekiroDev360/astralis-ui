import { Button, ButtonGroup, Text, VStack } from "astralis-ui";

const spacings = ["none", "sm", "md", "lg"] as const;

export function ButtonGroupSpacing() {
  return (
    <VStack gap="5" alignItems="stretch">
      {spacings.map((spacing) => (
        <VStack key={spacing} gap="2" alignItems="stretch">
          <Text as="span" size="xs" weight="medium" color="muted">
            {spacing}
          </Text>
          <ButtonGroup spacing={spacing} variant="subtle" size="sm">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </VStack>
      ))}
    </VStack>
  );
}
