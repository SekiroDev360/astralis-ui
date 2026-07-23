import { Grid, Center, Text } from "astralis-ui";

export function GridResponsive() {
  return (
    /* 1 column on mobile, 2 from md, 3 from lg. */
    <Grid columns={{ base: "1", md: "2", lg: "3" }} gap="3" w="full" maxW="md">
      {["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn"].map((planet) => (
        <Center key={planet} bg="blue-subtle" p="4" rounded="lg">
          <Text size="sm">{planet}</Text>
        </Center>
      ))}
    </Grid>
  );
}
