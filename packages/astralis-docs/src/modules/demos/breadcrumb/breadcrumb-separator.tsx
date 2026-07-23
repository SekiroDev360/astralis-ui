"use client";

import { Breadcrumb, Text } from "astralis-ui";

export function BreadcrumbSeparator() {
  return (
    <Breadcrumb separator={<Text size="sm" color="subtle">/</Text>}>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="#">astralis</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="#">packages</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link isCurrent>astralis-ui</Breadcrumb.Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}
