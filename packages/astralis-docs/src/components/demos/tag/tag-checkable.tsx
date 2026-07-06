"use client";

import { useState } from "react";
import { Tag, Text, VStack } from "astralis-ui";

export function TagCheckable() {
  const [topics, setTopics] = useState<Array<string | number>>(["react"]);

  return (
    <VStack gap="3" alignItems="center">
      <Tag.Group
        multiple
        value={topics}
        onChange={setTopics}
        options={[
          { label: "React", value: "react" },
          { label: "Vue", value: "vue" },
          { label: "Svelte", value: "svelte" },
          { label: "Solid", value: "solid" },
        ]}
      />
      <Text size="xs" color="muted">
        Following: {topics.length ? topics.join(", ") : "nothing yet"}
      </Text>
    </VStack>
  );
}
