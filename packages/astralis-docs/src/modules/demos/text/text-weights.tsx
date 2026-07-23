import { Text, VStack } from "astralis-ui";

const weights = ["light", "normal", "medium", "semibold", "bold", "extrabold"] as const;

export function TextWeights() {
  return (
    <VStack gap="1" alignItems="start">
      {weights.map((weight) => (
        <Text key={weight} weight={weight}>
          Weight {weight}
        </Text>
      ))}
    </VStack>
  );
}
