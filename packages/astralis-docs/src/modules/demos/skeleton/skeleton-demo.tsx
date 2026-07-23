import { Box, HStack, Skeleton, VStack } from "astralis-ui";

export function SkeletonDemo() {
  return (
    <Box w="sm" maxW="full">
      <HStack gap="4" alignItems="center">
        <Skeleton variant="circle" className="astralis:size-12 astralis:shrink-0" />
        <VStack gap="2" alignItems="stretch" className="astralis:flex-1">
          <Skeleton variant="text" className="astralis:w-3/4" />
          <Skeleton variant="text" />
        </VStack>
      </HStack>
      <Skeleton variant="rect" className="astralis:mt-4 astralis:h-24" />
    </Box>
  );
}
