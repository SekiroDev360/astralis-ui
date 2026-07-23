"use client";

import Link from "next/link";
import { Button } from "astralis-ui";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";

/* Deterministic pseudo-random star positions (SSR-safe, no hydration drift). */
const stars = Array.from({ length: 36 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  size: 1 + ((i * 7) % 3),
  opacity: 0.25 + ((i * 13) % 50) / 100,
}));

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-36 lg:py-44">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {stars.map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-accent"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            }}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 mx-auto h-72 max-w-3xl rounded-full bg-accent-subtle blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-2xl flex-col items-center px-6 text-center">
        <Reveal>
          <h2 className="font-display text-balance text-5xl font-semibold tracking-tight text-label sm:text-6xl">
            Ship something <span className="text-gradient">stellar</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-pretty text-lg text-label-muted">
            Install the package, wrap your app in the provider, and every
            component on this site is yours.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button as={Link} href="/docs" size="lg" rounded="xl" rightIcon={<ArrowRight size={18} />}>
              Start building
            </Button>
            <Button as={Link} href="/docs/components/button" size="lg" rounded="xl" variant="text" colorScheme="gray">
              Read the docs
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
