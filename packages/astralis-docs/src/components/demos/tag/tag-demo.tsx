"use client";

import { useState } from "react";
import { Tag, HStack } from "astralis-ui";

export function TagDemo() {
  const [tags, setTags] = useState(["Design", "Engineering", "Research"]);

  return (
    <HStack gap="2" wrap="wrap" justifyContent="center">
      <Tag colorScheme="purple">Astralis</Tag>
      <Tag variant="outline" colorScheme="blue">v0.1</Tag>
      {tags.map((tag) => (
        <Tag key={tag} closable onClose={() => setTags(tags.filter((t) => t !== tag))}>
          {tag}
        </Tag>
      ))}
    </HStack>
  );
}
