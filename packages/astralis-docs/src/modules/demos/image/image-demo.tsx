"use client";

import { Image, Box } from "astralis-ui";

export function ImageDemo() {
  return (
    <Box w="full" maxW="xs">
      <Image
        src="/placeholder.svg"
        alt="A starfield gradient"
        aspectRatio="video"
        rounded="xl"
        caption="Captions wrap the image in a semantic figure."
      />
    </Box>
  );
}
