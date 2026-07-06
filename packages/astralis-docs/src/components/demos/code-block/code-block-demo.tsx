import { CodeBlock } from "astralis-ui";

const example = `import { AstralisProvider } from "astralis-ui";
import "astralis-ui/styles.css";

export function App({ children }) {
  return <AstralisProvider>{children}</AstralisProvider>;
}`;

export function CodeBlockDemo() {
  return (
    <CodeBlock variant="solid" language="tsx" windowControls w="full" maxW="md">
      {example}
    </CodeBlock>
  );
}
