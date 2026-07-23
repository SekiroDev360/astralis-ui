import { Combobox, VStack } from "astralis-ui";

const FRAMEWORKS = [
  { label: "Next.js", value: "next" },
  { label: "Remix", value: "remix" },
  { label: "Astro", value: "astro" },
  { label: "Vite", value: "vite" },
  { label: "Gatsby", value: "gatsby", disabled: true },
];

const GROUPED = [
  { group: "Planets", options: [
    { label: "Mercury", value: "mercury" },
    { label: "Venus", value: "venus" },
    { label: "Mars", value: "mars" },
  ]},
  { group: "Moons", options: [
    { label: "Europa", value: "europa" },
    { label: "Titan", value: "titan" },
  ]},
];

export function ComboboxDemo() {
  return (
    <VStack gap="4" alignItems="stretch" className="astralis:w-full astralis:max-w-sm">
      <Combobox options={FRAMEWORKS} placeholder="Pick a framework…" clearable />
      <Combobox options={GROUPED} placeholder="Grouped options…" defaultValue="europa" clearable />
    </VStack>
  );
}
