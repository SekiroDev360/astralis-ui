"use client";

import { useState } from "react";
import { Slider, Text, VStack } from "astralis-ui";

export function SliderDemo() {
  const [volume, setVolume] = useState(40);

  return (
    <VStack gap="3" alignItems="stretch" w="full" maxW="xs">
      <Slider value={volume} onChange={setVolume} />
      <Text size="xs" color="muted">Volume: {volume}%</Text>
    </VStack>
  );
}
