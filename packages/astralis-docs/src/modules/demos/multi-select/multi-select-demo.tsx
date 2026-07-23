"use client";

import { useState } from "react";
import { MultiSelect, Box } from "astralis-ui";

const skills = [
  { value: "ts", label: "TypeScript" },
  { value: "react", label: "React" },
  { value: "css", label: "CSS" },
  { value: "a11y", label: "Accessibility" },
  { value: "testing", label: "Testing" },
];

export function MultiSelectDemo() {
  const [selected, setSelected] = useState<Array<string | number>>(["ts", "react"]);

  return (
    <Box w="full" maxW="xs">
      <MultiSelect
        options={skills}
        value={selected}
        onChange={setSelected}
        placeholder="Pick your skills…"
      />
    </Box>
  );
}
