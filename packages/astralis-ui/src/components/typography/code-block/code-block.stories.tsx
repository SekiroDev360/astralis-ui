import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../text";
import { VStack } from "../../layout/stack";
import { Box } from "../../layout/box";
import { CodeBlock } from "./index";

/**
 * CodeBlock is a compound, multi-line code surface. `Root` holds the source via
 * the `code` prop and provides it to the parts: `Header` (with `Title`,
 * `WindowControls` and a trailing `Control` slot), `CopyTrigger` and `Content`
 * wrapping `Code`. `variant` colours the container, `size` drives padding +
 * font size. Whitespace is preserved; long lines scroll rather than wrap.
 */
const meta: Meta<typeof CodeBlock.Root> = {
  title: "Components/Typography/CodeBlock",
  component: CodeBlock.Root,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: { type: "select" }, options: ["subtle", "solid", "outline"] },
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    code: { control: { type: "text" } },
  },
  parameters: {
    docs: { description: { component: "A compound, scrollable, multi-line code surface." } },
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlock.Root>;

const SAMPLE = `import { Button } from "astralis-ui";

export function App() {
  return <Button variant="solid">Click me</Button>;
}`;

/** Interactive playground — `code` flows from Root to `CodeBlock.Code` via context. */
export const Playground: Story = {
  args: { code: SAMPLE, variant: "subtle", size: "md" },
  render: (args) => (
    <Box w="full" maxW="2xl">
      <CodeBlock.Root {...args}>
        <CodeBlock.Content>
          <CodeBlock.Code />
        </CodeBlock.Content>
      </CodeBlock.Root>
    </Box>
  ),
};

/** A `Header` with a `Title` label. */
export const WithHeader: Story = {
  render: () => (
    <Box w="full" maxW="2xl">
      <CodeBlock.Root code={SAMPLE}>
        <CodeBlock.Header>
          <CodeBlock.Title>App.tsx</CodeBlock.Title>
        </CodeBlock.Header>
        <CodeBlock.Content>
          <CodeBlock.Code />
        </CodeBlock.Content>
      </CodeBlock.Root>
    </Box>
  ),
};

/** `CopyTrigger` copies Root's `code`; `Control` docks it to the end of the header row. */
export const WithCopyTrigger: Story = {
  render: () => (
    <Box w="full" maxW="2xl">
      <CodeBlock.Root variant="solid" code={SAMPLE}>
        <CodeBlock.Header>
          <CodeBlock.Title>App.tsx</CodeBlock.Title>
          <CodeBlock.Control>
            <CodeBlock.CopyTrigger />
          </CodeBlock.Control>
        </CodeBlock.Header>
        <CodeBlock.Content>
          <CodeBlock.Code />
        </CodeBlock.Content>
      </CodeBlock.Root>
    </Box>
  ),
};

/** `variant` colours the container. */
export const Variants: Story = {
  render: () => (
    <VStack gap="5" w="full" maxW="2xl" alignItems="stretch">
      {(["subtle", "solid", "outline"] as const).map((v) => (
        <Box key={v}>
          <Text size="xs" color="subtle" fontFamily="mono" gutterBottom>variant="{v}"</Text>
          <CodeBlock.Root variant={v} code={SAMPLE}>
            <CodeBlock.Header>
              <CodeBlock.Title>{v}</CodeBlock.Title>
            </CodeBlock.Header>
            <CodeBlock.Content>
              <CodeBlock.Code />
            </CodeBlock.Content>
          </CodeBlock.Root>
        </Box>
      ))}
    </VStack>
  ),
};

/** The classic "editor" look: `variant="solid"` + `WindowControls` dots + copy button. */
export const Editor: Story = {
  render: () => (
    <Box w="full" maxW="2xl">
      <CodeBlock.Root variant="solid" code={SAMPLE}>
        <CodeBlock.Header>
          <CodeBlock.WindowControls />
          <CodeBlock.Title>App.tsx</CodeBlock.Title>
          <CodeBlock.Control>
            <CodeBlock.CopyTrigger />
          </CodeBlock.Control>
        </CodeBlock.Header>
        <CodeBlock.Content>
          <CodeBlock.Code />
        </CodeBlock.Content>
      </CodeBlock.Root>
    </Box>
  ),
};

/**
 * Opt-in syntax highlighting via the `highlightedHtml` slot on `Code`. Pass
 * pre-tokenized HTML (here hand-written; in a real app it would come from
 * Shiki/Prism) and it renders raw. The library ships no highlighter — colour
 * is the consumer's choice. Root's `code` still powers the CopyTrigger.
 */
export const SyntaxHighlighting: Story = {
  render: () => {
    const highlightedHtml = [
      `<span style="color:var(--astralis-color-purple-300)">import</span> { <span style="color:var(--astralis-color-blue-300)">Button</span> } <span style="color:var(--astralis-color-purple-300)">from</span> <span style="color:var(--astralis-color-green-300)">"astralis-ui"</span>;`,
      ``,
      `<span style="color:var(--astralis-color-purple-300)">export function</span> <span style="color:var(--astralis-color-yellow-300)">App</span>() {`,
      `  <span style="color:var(--astralis-color-purple-300)">return</span> &lt;<span style="color:var(--astralis-color-red-300)">Button</span> <span style="color:var(--astralis-color-orange-300)">variant</span>=<span style="color:var(--astralis-color-green-300)">"solid"</span>&gt;Click me&lt;/<span style="color:var(--astralis-color-red-300)">Button</span>&gt;;`,
      `}`,
    ].join("\n");
    return (
      <Box w="full" maxW="2xl">
        <CodeBlock.Root variant="solid" code={SAMPLE}>
          <CodeBlock.Header>
            <CodeBlock.WindowControls />
            <CodeBlock.Title>tsx</CodeBlock.Title>
            <CodeBlock.Control>
              <CodeBlock.CopyTrigger />
            </CodeBlock.Control>
          </CodeBlock.Header>
          <CodeBlock.Content>
            <CodeBlock.Code highlightedHtml={highlightedHtml} />
          </CodeBlock.Content>
        </CodeBlock.Root>
      </Box>
    );
  },
};

/** Long lines scroll horizontally; formatting is preserved. */
export const Scrolling: Story = {
  render: () => (
    <Box w="full" maxW="md">
      <CodeBlock.Root code={`curl -X POST https://api.example.com/v1/resources --header "Authorization: Bearer TOKEN" --data '{"name":"astralis"}'`}>
        <CodeBlock.Header>
          <CodeBlock.Title>bash</CodeBlock.Title>
        </CodeBlock.Header>
        <CodeBlock.Content>
          <CodeBlock.Code />
        </CodeBlock.Content>
      </CodeBlock.Root>
    </Box>
  ),
};
