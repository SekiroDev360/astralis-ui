import { Button, Text, VStack, HStack } from "astralis-ui";

const variants = ["solid", "subtle", "surface", "outline", "text", "link"] as const;
const schemes = [
  "brand", "gray", "red", "orange", "yellow", "green",
  "teal", "blue", "cyan", "purple", "pink",
] as const;

export function ButtonColorSchemes() {
  return (
    <VStack gap="6" alignItems="stretch">
      {variants.map((variant) => (
        <VStack key={variant} gap="2" alignItems="stretch">
          <Text as="span" size="xs" weight="medium" color="muted">
            {variant}
          </Text>
          <HStack gap="2" wrap="wrap">
            {schemes.map((scheme) => (
              <Button key={scheme} size="xs" variant={variant} colorScheme={scheme}>
                {scheme}
              </Button>
            ))}
          </HStack>
        </VStack>
      ))}
    </VStack>
  );
}
