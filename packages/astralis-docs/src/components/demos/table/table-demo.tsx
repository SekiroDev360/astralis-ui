"use client";

import { Table, Badge, Box } from "astralis-ui";

const releases = [
  { version: "0.3.0", date: "Jun 28", status: "Stable", scheme: "green" },
  { version: "0.2.1", date: "Jun 14", status: "Stable", scheme: "green" },
  { version: "0.2.0", date: "Jun 02", status: "Deprecated", scheme: "orange" },
] as const;

export function TableDemo() {
  return (
    <Box w="full" maxW="md">
      <Table variant="outline" striped interactive>
        <Table.Header>
          <Table.Row>
            <Table.Head>Version</Table.Head>
            <Table.Head>Released</Table.Head>
            <Table.Head>Status</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {releases.map((release) => (
            <Table.Row key={release.version}>
              <Table.Cell>{release.version}</Table.Cell>
              <Table.Cell>{release.date}</Table.Cell>
              <Table.Cell>
                <Badge colorScheme={release.scheme}>{release.status}</Badge>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Caption>Astralis UI release history</Table.Caption>
      </Table>
    </Box>
  );
}
