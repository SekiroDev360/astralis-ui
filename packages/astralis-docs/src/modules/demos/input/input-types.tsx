"use client";

import { useState } from "react";
import { Input, Text, VStack } from "astralis-ui";

export function InputTypes() {
  const [query, setQuery] = useState("");

  return (
    <VStack gap="4" alignItems="stretch" w="full" maxW="xs">
      <Input.Password placeholder="Password with visibility toggle" />
      <VStack gap="1" alignItems="stretch">
        <Input.Search
          placeholder="Search the docs…"
          showSearchButton
          onSearch={setQuery}
        />
        {query && (
          <Text size="xs" color="muted">Searched for “{query}”</Text>
        )}
      </VStack>
      <Input.TextArea placeholder="Short bio…" rows={3} maxLength={120} showCount />
    </VStack>
  );
}
