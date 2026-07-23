"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Stat } from "astralis-ui";

const numbers = [
  { label: "Components", value: 50, suffix: "" },
  { label: "Color schemes", value: 11, suffix: "" },
  { label: "Live examples", value: 140, suffix: "+" },
  { label: "Build steps", value: 0, suffix: "" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? target : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const duration = 1200;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, reduce]);

  return (
    // The ref must sit on the element itself — useInView observes this node.
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function StatsStrip() {
  return (
    <section className="border-y border-stroke-subtle bg-surface-subtle/40">
      <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-x-8 gap-y-10 px-6 py-16 md:grid-cols-4 lg:px-12 lg:py-20">
        {numbers.map((item) => (
          <Stat key={item.label} className="text-center astralis:items-center astralis:gap-2">
            <Stat.Value className="font-display astralis:text-5xl astralis:tracking-tight">
              <CountUp target={item.value} suffix={item.suffix} />
            </Stat.Value>
            <Stat.Label>{item.label}</Stat.Label>
          </Stat>
        ))}
      </div>
    </section>
  );
}
