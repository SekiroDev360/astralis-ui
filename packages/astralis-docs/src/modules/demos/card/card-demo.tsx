"use client";

import { Card, Badge, Button, Text, Box } from "astralis-ui";

export function CardDemo() {
  return (
    <Box w="full" maxW="xs">
      <Card>
        <Card.Header extra={<Badge colorScheme="green">Operational</Badge>}>
          <Card.Title>Production cluster</Card.Title>
          <Card.Description>us-east-1 · 12 nodes</Card.Description>
        </Card.Header>
        <Card.Body>
          <Text size="sm" color="muted">
            All services healthy. Last incident 42 days ago.
          </Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="link" size="sm">View dashboard →</Button>
        </Card.Footer>
      </Card>
    </Box>
  );
}
