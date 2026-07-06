"use client";

import { Image, HStack } from "astralis-ui";

export function ImageFallback() {
  return (
    <HStack gap="4" wrap="wrap" justifyContent="center">
      {/* A broken src falls back to the default icon… */}
      <Image src="/does-not-exist.png" alt="Broken" width={140} height={90} rounded="lg" />
      {/* …or to whatever you pass as fallback. */}
      <Image
        src="/also-missing.png"
        alt="Broken with custom fallback"
        width={140}
        height={90}
        rounded="lg"
        fallback={<span>No image 😢</span>}
      />
    </HStack>
  );
}
