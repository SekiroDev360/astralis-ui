"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  generateBrandShades, useTheme,
  Button, Card, Stat, Badge, Avatar, Switch, Slider, Tag, HStack, VStack,
} from "astralis-ui";
import { ArrowRight, Sparkles } from "lucide-react";
import { Entrance } from "./reveal";

const swatches = [
  // First entry = the library's actual default brand (yellow-500).
  { name: "Brand", hex: "#eab308" },
  { name: "Violet", hex: "#8b5cf6" },
  { name: "Blue", hex: "#3b82f6" },
  { name: "Green", hex: "#22c55e" },
  { name: "Rose", hex: "#f43f5e" },
  { name: "Cyan", hex: "#06b6d4" },
];

/**
 * Role tokens (brand-solid, brand-subtle, …) are substituted at :root, so
 * overriding only the primitive shades on a subtree never reaches them —
 * they must be re-declared here too, per theme (mirrors semantic.css).
 */
function brandOverride(hex: string, mode: "light" | "dark"): CSSProperties {
  const shades = generateBrandShades(hex) as Record<string, string>;
  const shade = (step: number) => shades[`--astralis-color-brand-${step}`];
  const roles =
    mode === "dark"
      ? { label: shade(300), subtle: shade(900), muted: shade(800), emphasized: shade(700), stroke: shade(400) }
      : { label: shade(700), subtle: shade(100), muted: shade(200), emphasized: shade(300), stroke: shade(500) };

  return {
    ...shades,
    "--astralis-color-brand-solid": shade(500),
    "--astralis-color-brand-label": roles.label,
    "--astralis-color-brand-subtle": roles.subtle,
    "--astralis-color-brand-muted": roles.muted,
    "--astralis-color-brand-emphasized": roles.emphasized,
    "--astralis-color-brand-stroke": roles.stroke,
    "--astralis-color-brand-ring": shade(500),
    "--astralis-color-accent-solid": shade(500),
    "--astralis-color-accent-label": roles.label,
    "--astralis-color-accent-subtle": roles.subtle,
    "--astralis-color-accent-muted": roles.muted,
    "--astralis-color-accent-emphasized": roles.emphasized,
    "--astralis-color-accent-stroke": roles.stroke,
    "--astralis-color-accent-ring": shade(500),
  } as CSSProperties;
}

export function Hero() {
  const [brand, setBrand] = useState(swatches[0].hex);
  const { resolvedTheme } = useTheme();
  const reduce = useReducedMotion();
  const brandStyle = brandOverride(brand, resolvedTheme);

  return (
    <section className="relative overflow-hidden" style={brandStyle}>
      {/* Layered backdrop: line grid + two drifting orbs that follow the brand */}
      <div aria-hidden="true" className="hero-grid absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 h-130 w-130 -translate-x-1/2 rounded-full opacity-20 blur-3xl transition-colors duration-700"
        style={{ backgroundColor: brand }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-40 h-96 w-96 translate-x-1/3 rounded-full opacity-10 blur-3xl transition-colors duration-700"
        style={{ backgroundColor: brand }}
      />

      <div className="relative mx-auto grid max-w-screen-xl items-center gap-16 px-6 pb-32 pt-20 lg:grid-cols-2 lg:px-12 lg:pb-40 lg:pt-24">
        {/* Copy + CTAs + picker */}
        <div className="flex flex-col items-start">
          <Entrance delay={0}>
            <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-stroke-subtle bg-surface/60 px-4 py-2 text-xs font-medium text-label-muted backdrop-blur">
              <Sparkles size={13} className="text-accent-label" />
              50 components · precompiled CSS · React 19
            </p>
          </Entrance>

          <Entrance delay={0.08}>
            <h1 className="font-display text-balance text-5xl font-semibold leading-[1.02] tracking-tight text-label sm:text-6xl">
              Interfaces with a<br />
              <span className="text-gradient">stellar finish</span>
            </h1>
          </Entrance>

          <Entrance delay={0.16}>
            <p className="mt-8 max-w-lg text-pretty text-lg leading-relaxed text-label-muted">
              A React component library on semantic tokens — one brand color
              restyles everything at runtime. Try it: this whole section is
              listening.
            </p>
          </Entrance>

          <Entrance delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-2.5" role="group" aria-label="Try a brand color">
              {swatches.map((swatch) => (
                <button
                  key={swatch.hex}
                  type="button"
                  aria-label={`Brand color ${swatch.name}`}
                  onClick={() => setBrand(swatch.hex)}
                  className={`size-9 cursor-pointer rounded-full transition-all duration-200 hover:scale-115 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring ${
                    brand === swatch.hex
                      ? "scale-110 ring-2 ring-accent-ring ring-offset-2 ring-offset-surface"
                      : "opacity-80 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: swatch.hex }}
                />
              ))}
              <label className="relative ml-1 flex size-9 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-dashed border-stroke-emphasized text-label-muted transition-all duration-200 hover:scale-110 hover:text-label">
                <span className="text-base leading-none">+</span>
                <input
                  type="color"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  aria-label="Pick a custom brand color"
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
              </label>
              <span className="ml-2 font-mono text-xs tabular-nums text-label-subtle">{brand}</span>
            </div>
          </Entrance>

          <Entrance delay={0.32}>
            <div className="mt-12 flex flex-wrap gap-4">
              <Button as={Link} href="/docs" size="lg" rounded="xl" rightIcon={<ArrowRight size={18} />}>
                Get started
              </Button>
              <Button as={Link} href="/docs/components/button" size="lg" rounded="xl" variant="outline" colorScheme="gray">
                Browse components
              </Button>
            </div>
          </Entrance>
        </div>

        {/* Live composition — floats gently; every accent tracks the brand */}
        <motion.div
          className="relative lg:pl-6"
          initial={reduce ? false : { opacity: 0, y: 40, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="animate-float-slow">
            <Card variant="elevated">
              <Card.Header extra={<Badge colorScheme="brand" variant="subtle">Live</Badge>}>
                <Card.Title>Mission control</Card.Title>
                <Card.Description>Recolored by the swatches — no rebuild</Card.Description>
              </Card.Header>
              <Card.Body>
                <VStack gap="5" alignItems="stretch">
                  <HStack gap="3" justifyContent="between">
                    <HStack gap="3">
                      <Avatar.Group max={3} size="sm">
                        <Avatar name="Nova Starling" />
                        <Avatar name="Alex Kim" />
                        <Avatar name="Maria Lopez" />
                        <Avatar name="Sam Patel" />
                      </Avatar.Group>
                      <Switch defaultChecked size="sm">Auto-deploy</Switch>
                    </HStack>
                    <Tag colorScheme="brand" size="sm">v0.1</Tag>
                  </HStack>

                  <Stat>
                    <Stat.Label>Weekly downloads</Stat.Label>
                    <Stat.Value>48,120</Stat.Value>
                    <Stat.HelpText>
                      <Stat.Indicator type="increase">18.9%</Stat.Indicator> vs last week
                    </Stat.HelpText>
                  </Stat>

                  <Slider defaultValue={64} showTooltip={false} size="sm" />
                </VStack>
              </Card.Body>
              <Card.Footer>
                <HStack gap="2">
                  <Button size="sm">Deploy</Button>
                  <Button size="sm" variant="subtle">Preview</Button>
                  <Button size="sm" variant="text" colorScheme="gray">Logs</Button>
                </HStack>
              </Card.Footer>
            </Card>
          </div>

          {/* Floating satellites */}
          <div className="animate-float-slower absolute -left-8 -top-6 hidden lg:block">
            <div className="rounded-2xl border border-stroke-subtle bg-panel/90 p-3 shadow-lg backdrop-blur">
              <Tag colorScheme="brand" variant="solid" size="sm">Shipped ✦</Tag>
            </div>
          </div>
          <div className="animate-float-slow absolute -bottom-8 -right-4 hidden lg:block" style={{ animationDelay: "1.6s" }}>
            <div className="flex items-center gap-2.5 rounded-2xl border border-stroke-subtle bg-panel/90 px-4 py-3 shadow-lg backdrop-blur">
              <Avatar name="Nova Starling" size="xs" />
              <span className="text-xs text-label-muted">Nova deployed <span className="font-medium text-accent-label">v0.1</span></span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
