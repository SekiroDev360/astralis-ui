"use client";

import { DataList, Box } from "astralis-ui";

export function DataListVertical() {
  return (
    <Box w="full" maxW="sm">
      <DataList orientation="vertical" size="sm">
        <DataList.Item>
          <DataList.Label>Deployment region</DataList.Label>
          <DataList.Value>eu-central-1 (Frankfurt)</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Runtime</DataList.Label>
          <DataList.Value>Node 22 on the edge</DataList.Value>
        </DataList.Item>
      </DataList>
    </Box>
  );
}
