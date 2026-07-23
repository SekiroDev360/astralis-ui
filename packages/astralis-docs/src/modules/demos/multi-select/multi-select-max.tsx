"use client";

import { MultiSelect, Box } from "astralis-ui";

const toppings = [
  { value: "mushroom", label: "Mushroom" },
  { value: "olive", label: "Olive" },
  { value: "basil", label: "Basil" },
  { value: "pepper", label: "Pepper" },
  { value: "onion", label: "Onion" },
  { value: "pineapple", label: "Pineapple", disabled: true },
];

export function MultiSelectMax() {
  return (
    <Box w="full" maxW="xs">
      {/* Capped at 3; the disabled option can't be chosen at all. */}
      <MultiSelect
        options={toppings}
        max={3}
        clearable
        colorScheme="green"
        placeholder="Up to three toppings…"
      />
    </Box>
  );
}
