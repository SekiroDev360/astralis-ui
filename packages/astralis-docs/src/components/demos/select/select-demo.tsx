"use client";

import { useState } from "react";
import { Select, Box } from "astralis-ui";

const options = [
  { value: "figma", label: "Figma" },
  { value: "sketch", label: "Sketch" },
  { value: "penpot", label: "Penpot" },
];

export function SelectDemo() {
  const [tool, setTool] = useState<string | number | null>(null);

  return (
    <Box w="full" maxW="3xs">
      <Select
        options={options}
        value={tool}
        onChange={setTool}
        placeholder="Pick a design tool"
      />
    </Box>
  );
}
