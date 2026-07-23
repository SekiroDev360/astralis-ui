"use client";

import { Breadcrumb } from "astralis-ui";

export function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link isCurrent>Breadcrumb</Breadcrumb.Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}
