import { AspectRatio, Box } from "astralis-ui";

export function AspectRatioDemo() {
  return (
    <Box w="full" maxW="sm">
      <AspectRatio ratio="wide" rounded="xl" overflow="hidden">
        {/* The single child stretches to fill the frame; img/video get object-cover. */}
        <img src="/placeholder.svg" alt="A starfield gradient" />
      </AspectRatio>
    </Box>
  );
}
