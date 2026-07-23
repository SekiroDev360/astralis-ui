"use client";

import { useState } from "react";
import { Checkbox, Text, VStack } from "astralis-ui";

export function CheckboxGroup() {
  const [selected, setSelected] = useState<string[]>(["react"]);

  return (
    <VStack gap="3" alignItems="start">
      <Checkbox.Group value={selected} onChange={setSelected}>
        <Checkbox value="react">React</Checkbox>
        <Checkbox value="vue">Vue</Checkbox>
        <Checkbox value="svelte">Svelte</Checkbox>
      </Checkbox.Group>
      <Text size="xs" color="muted">
        Selected: {selected.length ? selected.join(", ") : "none"}
      </Text>
    </VStack>
  );
}
