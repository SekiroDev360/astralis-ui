"use client";

import { useState } from "react";
import { Radio, Text, VStack } from "astralis-ui";

export function RadioDemo() {
  const [plan, setPlan] = useState("pro");

  return (
    <VStack gap="3" alignItems="start">
      <Radio.Group value={plan} onChange={setPlan}>
        <Radio value="free">Free — 3 projects</Radio>
        <Radio value="pro">Pro — unlimited projects</Radio>
        <Radio value="team">Team — everything, plus SSO</Radio>
      </Radio.Group>
      <Text size="xs" color="muted">Selected plan: {plan}</Text>
    </VStack>
  );
}
