"use client";

import { useState } from "react";
import { RangeSlider, Text, VStack } from "astralis-ui";

export function SliderRange() {
  const [range, setRange] = useState<[number, number]>([200, 600]);

  return (
    <VStack gap="3" alignItems="stretch" w="full" maxW="xs">
      <RangeSlider min={0} max={1000} step={50} value={range} onChange={setRange} />
      <Text size="xs" color="muted">
        Price: ${range[0]} – ${range[1]}
      </Text>
    </VStack>
  );
}
