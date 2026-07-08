import { Progress, VStack } from "astralis-ui";

export function ProgressDemo() {
  return (
    <VStack gap="5" alignItems="stretch" className="astralis:w-full astralis:max-w-md">
      <Progress value={30} size="sm" />
      <Progress value={62} showValueLabel />
      <Progress value={88} size="lg" colorScheme="green" />
      <Progress />
    </VStack>
  );
}
