import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check } from "lucide-react";
import { Tag } from "./index";
import { Icon } from "../../icon";
import { HStack, VStack } from "../../layout/stack";

/**
 * Tag is an interactive chip: it takes leading/trailing elements, an optional
 * remove button (`closable`), and comes with `Tag.Checkable` / `Tag.Group` for
 * selectable sets. Colour is driven by `colorScheme` (the accent channel).
 */
const meta: Meta<typeof Tag> = {
  title: "Components/Data Display/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: { type: "select" }, options: ["solid", "subtle", "surface", "outline"] },
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    colorScheme: {
      control: { type: "select" },
      options: ["gray", "brand", "red", "orange", "yellow", "green", "teal", "blue", "cyan", "purple", "pink"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Playground: Story = {
  args: { children: "Tag", variant: "subtle", colorScheme: "gray", size: "md" },
};

const VARIANTS = ["solid", "subtle", "surface", "outline"] as const;

export const Variants: Story = {
  render: () => (
    <HStack gap="3">
      {VARIANTS.map((v) => <Tag key={v} variant={v} colorScheme="blue">{v}</Tag>)}
    </HStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <HStack gap="3" alignItems="center">
      {(["sm", "md", "lg"] as const).map((s) => <Tag key={s} size={s} colorScheme="green">{s}</Tag>)}
    </HStack>
  ),
};

/** With a leading icon and a remove button. */
export const WithIconAndClose: Story = {
  render: () => {
    function Demo() {
      const [tags, setTags] = useState(["Design", "Engineering", "Product"]);
      return (
        <HStack gap="2">
          {tags.map((t) => (
            <Tag key={t} colorScheme="purple" startElement={<Icon as={Check} size="xs" />} closable onClose={() => setTags((prev) => prev.filter((x) => x !== t))}>
              {t}
            </Tag>
          ))}
        </HStack>
      );
    }
    return <Demo />;
  },
};

/** Selectable tags with single or multiple selection. */
export const Checkable: Story = {
  render: () => {
    function Demo() {
      const [multi, setMulti] = useState<(string | number)[]>(["React"]);
      const [single, setSingle] = useState<(string | number)[]>(["Small"]);
      return (
        <VStack gap="5" alignItems="start">
          <Tag.Group multiple value={multi} onChange={setMulti} options={["React", "Vue", "Svelte", "Solid"]} />
          <Tag.Group value={single} onChange={setSingle} colorScheme="green" options={["Small", "Medium", "Large"]} />
        </VStack>
      );
    }
    return <Demo />;
  },
};
