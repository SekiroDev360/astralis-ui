import { Grid, Center, Text } from "astralis-ui";

export function GridDemo() {
  return (
    <Grid columns="3" gap="3" w="full" maxW="md">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <Center key={n} bg="brand-subtle" p="4" rounded="lg">
          <Text size="sm">{n}</Text>
        </Center>
      ))}
    </Grid>
  );
}
