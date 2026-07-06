import { Code, Text, Box } from "astralis-ui";

export function CodeDemo() {
  return (
    <Box maxW="md">
      <Text>
        Install with <Code>pnpm add astralis-ui</Code>, import the stylesheet
        once, and wrap your app in <Code>AstralisProvider</Code>.
      </Text>
    </Box>
  );
}
