"use client";

import NextLink from "next/link";
import {
  Marquee, Button, Badge, Tag, Avatar, Switch, Checkbox, ThemeToggle, Code, HStack, Link,
} from "astralis-ui";
import { Reveal } from "./reveal";

/* Two opposing streams of real, rendered components. */
export function Showcase() {
  return (
    <section className="border-y border-stroke-subtle bg-surface-subtle/50 py-24 lg:py-28">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-12">
        <Reveal>
          <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-4xl font-semibold tracking-tight text-label">
                Fifty components, all real
              </h2>
              <p className="mt-4 max-w-xl text-lg text-label-muted">
                Nothing below is a screenshot — hover to pause, then go meet
                them in the docs.
              </p>
            </div>
            <Link as={NextLink} href="/docs/components/button" variant="underline" className="text-sm font-medium">
              Component docs →
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="flex flex-col gap-6">
        <Marquee speed={38} gap="1.25rem" pauseOnHover gradient>
          <Marquee.Item><Button size="sm">Deploy</Button></Marquee.Item>
          <Marquee.Item><Tag colorScheme="purple" closable>Design</Tag></Marquee.Item>
          <Marquee.Item><Badge colorScheme="green" variant="solid">Active</Badge></Marquee.Item>
          <Marquee.Item><Switch defaultChecked size="sm">Notifications</Switch></Marquee.Item>
          <Marquee.Item>
            <Avatar.Group max={3} size="xs">
              <Avatar name="Nova Starling" />
              <Avatar name="Alex Kim" />
              <Avatar name="Maria Lopez" />
              <Avatar name="Sam Patel" />
            </Avatar.Group>
          </Marquee.Item>
          <Marquee.Item><Button size="sm" variant="outline" colorScheme="gray">Cancel</Button></Marquee.Item>
          <Marquee.Item><Code>pnpm add astralis-ui</Code></Marquee.Item>
          <Marquee.Item><Badge colorScheme="blue" variant="outline">Beta</Badge></Marquee.Item>
        </Marquee>

        <Marquee speed={38} gap="1.25rem" pauseOnHover gradient reverse>
          <Marquee.Item><Checkbox defaultChecked size="sm">Remember me</Checkbox></Marquee.Item>
          <Marquee.Item><Button size="sm" variant="subtle" colorScheme="teal">Invite team</Button></Marquee.Item>
          <Marquee.Item><Tag variant="outline" colorScheme="blue">v0.1</Tag></Marquee.Item>
          <Marquee.Item><ThemeToggle size="sm" /></Marquee.Item>
          <Marquee.Item><Badge colorScheme="orange">Pending</Badge></Marquee.Item>
          <Marquee.Item>
            <HStack gap="2">
              <Avatar name="Jo Ellis" size="xs" />
              <Tag size="sm" colorScheme="pink">@jo</Tag>
            </HStack>
          </Marquee.Item>
          <Marquee.Item><Button size="sm" variant="link">Read the changelog</Button></Marquee.Item>
          <Marquee.Item><Checkbox indeterminate size="sm">Select all</Checkbox></Marquee.Item>
        </Marquee>
      </div>
    </section>
  );
}
