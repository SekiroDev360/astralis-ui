"use client";

import { Box, CodeBlock } from "astralis-ui";

const example = `import { AstralisProvider } from "astralis-ui";
import "astralis-ui/styles.css";

export function App({ children }) {
  return <AstralisProvider>{children}</AstralisProvider>;
}`;

export function CodeBlockDemo() {
  return (
    <Box w="full">
      <CodeBlock.Root variant="solid" code={example}>
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
  );
}
