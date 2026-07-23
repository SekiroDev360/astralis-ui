"use client";

import { Card, Text, Grid } from "astralis-ui";

const variants = ["elevated", "outline", "filled"] as const;

export function CardVariants() {
  return (
    <Grid columns={{ base: "1", md: "3" }} gap="4" w="full" maxW="md">
      {variants.map((variant) => (
        <Card key={variant} variant={variant} size="sm" hoverable>
          <Card.Body>
            <Text size="sm" weight="medium">{variant}</Text>
            <Text size="xs" color="muted">hoverable — try me</Text>
          </Card.Body>
        </Card>
      ))}
    </Grid>
  );
}
