import { Text, VStack } from "astralis-ui";

export function TextStyling() {
  return (
    <VStack gap="2" alignItems="start">
      <Text casing="uppercase" letterSpacing="widest" size="xs" weight="medium" color="muted">
        Overline label
      </Text>
      <Text textDecoration="underline">Underlined for emphasis</Text>
      <Text textDecoration="line-through" color="subtle">
        Crossed off the list
      </Text>
      <Text fontFamily="mono" size="sm">
        fontFamily=&quot;mono&quot; without reaching for Code
      </Text>
      <Text color="success" weight="medium">
        Status colors come from the same token map
      </Text>
    </VStack>
  );
}
