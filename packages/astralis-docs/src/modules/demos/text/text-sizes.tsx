import { Text, VStack } from "astralis-ui";

const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"] as const;

export function TextSizes() {
  return (
    <VStack gap="2" alignItems="start">
      {sizes.map((size) => (
        <Text key={size} size={size}>
          The quick brown fox ({size})
        </Text>
      ))}
    </VStack>
  );
}
