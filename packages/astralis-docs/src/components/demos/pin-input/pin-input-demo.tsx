"use client";

import { useState } from "react";
import { PinInput, Text, VStack } from "astralis-ui";

export function PinInputDemo() {
  const [done, setDone] = useState(false);

  return (
    <VStack gap="3">
      <PinInput length={4} onComplete={() => setDone(true)} onChange={() => setDone(false)} />
      <Text size="xs" color={done ? "success" : "muted"}>
        {done ? "Code complete — verifying…" : "Paste works too — try it."}
      </Text>
    </VStack>
  );
}
