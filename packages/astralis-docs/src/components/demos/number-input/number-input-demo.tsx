import { NumberInput, VStack } from "astralis-ui";

export function NumberInputDemo() {
  return (
    <VStack gap="4" alignItems="stretch" className="astralis:w-full astralis:max-w-56">
      <NumberInput defaultValue={4} min={0} max={10} aria-label="Crew size" />
      <NumberInput defaultValue={2.5} step={0.5} precision={1} aria-label="Thrust (0.5 steps)" />
      <NumberInput defaultValue={7} hideSteppers aria-label="No steppers" />
      <NumberInput defaultValue={3} disabled aria-label="Disabled" />
    </VStack>
  );
}
