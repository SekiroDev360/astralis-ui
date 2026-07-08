import { Link, Text, VStack } from "astralis-ui";

export function LinkDemo() {
  return (
    <VStack gap="2" alignItems="start">
      <Text>
        Read the <Link href="/docs">getting-started guide</Link> before launch.
      </Text>
      <Text>
        Always underlined: <Link href="/docs" variant="underline">theming reference</Link>.
      </Text>
      <Text>
        External: <Link href="https://react.dev" external>react.dev</Link> — new tab, safe rel.
      </Text>
      <Text>
        Any hue: <Link href="/docs" colorScheme="purple">purple link</Link>,{" "}
        <Link href="/docs" colorScheme="green">green link</Link>.
      </Text>
    </VStack>
  );
}
