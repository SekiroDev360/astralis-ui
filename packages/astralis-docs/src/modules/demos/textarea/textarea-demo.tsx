import { Textarea, VStack } from "astralis-ui";

export function TextareaDemo() {
  return (
    <VStack gap="4" alignItems="stretch" className="astralis:w-full astralis:max-w-md">
      <Textarea placeholder="Tell us about your mission…" />
      <Textarea placeholder="With a character count" showCount maxLength={200} defaultValue="Astralis launches in T-minus…" />
      <Textarea placeholder="Filled variant" variant="filled" rows={2} />
    </VStack>
  );
}
