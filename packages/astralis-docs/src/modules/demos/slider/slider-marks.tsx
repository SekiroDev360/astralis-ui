"use client";

import { Slider, Box } from "astralis-ui";

export function SliderMarks() {
  return (
    <Box w="full" maxW="xs" pb="4">
      <Slider
        min={0}
        max={100}
        step={25}
        defaultValue={50}
        colorScheme="purple"
        marks={[
          { value: 0, label: "Off" },
          { value: 25 },
          { value: 50, label: "Balanced" },
          { value: 75 },
          { value: 100, label: "Max" },
        ]}
      />
    </Box>
  );
}
