"use client";

import { DataList, Badge, Box } from "astralis-ui";

export function DataListDemo() {
  return (
    <Box w="full" maxW="sm">
      <DataList>
        <DataList.Item>
          <DataList.Label>Name</DataList.Label>
          <DataList.Value>Sophie Durand</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Email</DataList.Label>
          <DataList.Value>sophie@astralis.dev</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Status</DataList.Label>
          <DataList.Value>
            <Badge colorScheme="green">Active</Badge>
          </DataList.Value>
        </DataList.Item>
      </DataList>
    </Box>
  );
}
