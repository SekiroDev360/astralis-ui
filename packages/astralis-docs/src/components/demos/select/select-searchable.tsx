"use client";

import { Select, Box } from "astralis-ui";

const options = [
  {
    group: "Frontend",
    options: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "svelte", label: "Svelte" },
    ],
  },
  {
    group: "Backend",
    options: [
      { value: "node", label: "Node.js" },
      { value: "elixir", label: "Elixir" },
      { value: "go", label: "Go" },
    ],
  },
];

export function SelectSearchable() {
  return (
    <Box w="full" maxW="3xs">
      <Select
        options={options}
        searchable
        clearable
        placeholder="Search frameworks…"
      />
    </Box>
  );
}
