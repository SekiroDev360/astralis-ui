import { HStack, Progress } from "astralis-ui";

export function ProgressCircle() {
  return (
    <HStack gap="8" alignItems="center">
      <Progress shape="circle" value={25} size="sm" />
      <Progress shape="circle" value={62} showValueLabel />
      <Progress shape="circle" value={88} size="lg" colorScheme="purple" showValueLabel />
      <Progress shape="circle" />
    </HStack>
  );
}
