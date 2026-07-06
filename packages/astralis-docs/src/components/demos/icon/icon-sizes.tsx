"use client";

import { Icon, HStack } from "astralis-ui";
import { Sparkles } from "lucide-react";

export function IconSizes() {
  return (
    <HStack gap="4" alignItems="end">
      <Icon as={Sparkles} size="xs" />
      <Icon as={Sparkles} size="sm" />
      <Icon as={Sparkles} size="md" />
      <Icon as={Sparkles} size="lg" />
      <Icon as={Sparkles} size="xl" />
      {/* Or any explicit pixel value. */}
      <Icon as={Sparkles} size={40} />
    </HStack>
  );
}
