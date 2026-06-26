import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../text";
import { VStack } from "../../layout/stack";
import { Box } from "../../layout/box";
import { CodeBlock } from "./index";

/**
 * CodeBlock is a multi-line, horizontally-scrollable `<pre><code>` surface. `variant`
 * colours the container, `size` drives padding + font size, and `language` renders a
 * small header bar. Whitespace is preserved; long lines scroll rather than wrap.
 */
const meta: Meta<typeof CodeBlock> = {
  title: "Components/Typography/CodeBlock",
  component: CodeBlock,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: { type: "select" }, options: ["subtle", "solid", "outline"] },
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    language: { control: { type: "text" } },
    windowControls: { control: { type: "boolean" } },
    children: { control: { type: "text" } },
  },
  parameters: {
    docs: { description: { component: "A scrollable, multi-line code surface." } },
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

const SAMPLE = `import { Button } from "astralis-ui";

export function App() {
  return <Button variant="solid">Click me</Button>;
}`;

/** Interactive playground — adjust props in the Controls panel. */
export const Playground: Story = {
  args: { children: SAMPLE, variant: "subtle", size: "md" },
  render: (args) => (
    <Box w="full" maxW="2xl">
      <CodeBlock {...args} />
    </Box>
  ),
};

/** With a `language` header bar. */
export const WithLanguage: Story = {
  render: () => (
    <Box w="full" maxW="2xl">
      <CodeBlock language="tsx">{SAMPLE}</CodeBlock>
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
          <CodeBlock variant={v} language={v}>{SAMPLE}</CodeBlock>
        </Box>
      ))}
    </VStack>
  ),
};

/** The classic "editor" look: `variant="solid"` (inverted surface) + `windowControls` dots. */
export const Editor: Story = {
  render: () => (
    <Box w="full" maxW="2xl">
      <CodeBlock variant="solid" language="App.tsx" windowControls>{SAMPLE}</CodeBlock>
    </Box>
  ),
};

/** `windowControls` is independent of variant — here on the plain `subtle` surface. */
export const WindowControls: Story = {
  render: () => (
    <Box w="full" maxW="2xl">
      <CodeBlock variant="subtle" language="App.tsx" windowControls>{SAMPLE}</CodeBlock>
    </Box>
  ),
};

/**
 * Opt-in syntax highlighting via the `highlightedHtml` slot. Pass pre-tokenized HTML
 * (here hand-written; in a real app it would come from Shiki/Prism) and it renders raw
 * inside `<code>`. The library ships no highlighter — colour is the consumer's choice.
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
        <CodeBlock variant="solid" language="tsx" windowControls highlightedHtml={highlightedHtml} />
      </Box>
    );
  },
};

/** Long lines scroll horizontally; formatting is preserved. */
export const Scrolling: Story = {
  render: () => (
    <Box w="full" maxW="md">
      <CodeBlock language="bash">
        {`curl -X POST https://api.example.com/v1/resources --header "Authorization: Bearer TOKEN" --data '{"name":"astralis"}'`}
      </CodeBlock>
    </Box>
  ),
};
