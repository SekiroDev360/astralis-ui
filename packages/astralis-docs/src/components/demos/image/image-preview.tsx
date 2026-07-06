"use client";

import { Image, Text, VStack, Box } from "astralis-ui";

export function ImagePreview() {
  return (
    <VStack gap="2">
      <Box w="56">
        {/* Click to open the built-in lightbox (zoom, rotate, Esc to close). */}
        <Image src="/placeholder.svg" alt="Preview me" aspectRatio="video" rounded="lg" preview />
      </Box>
      <Text size="xs" color="muted">Click the image to preview</Text>
    </VStack>
  );
}
