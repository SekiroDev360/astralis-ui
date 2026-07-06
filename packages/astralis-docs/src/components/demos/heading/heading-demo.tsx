import { Heading, VStack } from "astralis-ui";

const levels = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

export function HeadingDemo() {
  return (
    <VStack gap="2" alignItems="start">
      {levels.map((level) => (
        <Heading key={level} as={level}>
          Heading {level}
        </Heading>
      ))}
    </VStack>
  );
}
