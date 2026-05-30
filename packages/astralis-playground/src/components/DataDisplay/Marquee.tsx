import { useState } from "react";
import { Marquee, Card, Text, Button } from "astralis-ui";

export default function MarqueeShowcase() {
  const [speed, setSpeed] = useState(60);
  const [direction, setDirection] = useState<"left" | "right" | "up" | "down">("left");
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [gradient, setGradient] = useState(true);

  const sponsorLogos = [
    { name: "Google", logo: "G" },
    { name: "DeepMind", logo: "DM" },
    { name: "React", logo: "⚛" },
    { name: "Tailwind", logo: "⚡" },
    { name: "GitHub", logo: "🐙" },
    { name: "Vite", logo: "⚡" },
    { name: "TypeScript", logo: "TS" },
  ];

  const testimonials = [
    { user: "Sarah Jenkins", comment: "The response time on overlays is blazing fast. Absolutely love the pointer arrows." },
    { user: "David Miller", comment: "The design tokens made standardizing our light/dark mode switch effortless. Highly recommended." },
    { user: "Elena Rostova", comment: "Incredible attention to detail in compound component architectures. High-fidelity DX!" },
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Marquee Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          A premium fluid marquee scrolling track component supporting edge gradients, vertical/horizontal orientations, speed adjustments, and pause triggers.
        </p>
      </div>

      {/* Dynamic Controls Segment */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
        
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Direction</span>
          <div className="grid grid-cols-2 gap-1">
            {(["left", "right", "up", "down"] as const).map((dir) => (
              <Button
                key={dir}
                size="xs"
                variant={direction === dir ? "primary" : "outline"}
                onClick={() => setDirection(dir)}
              >
                {dir.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Speed ({speed}px/s)</span>
          <input
            type="range"
            min="20"
            max="150"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-green-600"
          />
        </div>

        <div className="flex flex-col gap-2 justify-center">
          <Button
            size="sm"
            variant={pauseOnHover ? "primary" : "outline"}
            onClick={() => setPauseOnHover((prev) => !prev)}
          >
            Pause on Hover: {pauseOnHover ? "ON" : "OFF"}
          </Button>
        </div>

        <div className="flex flex-col gap-2 justify-center">
          <Button
            size="sm"
            variant={gradient ? "primary" : "outline"}
            onClick={() => setGradient((prev) => !prev)}
          >
            Fade Gradients: {gradient ? "ON" : "OFF"}
          </Button>
        </div>

      </div>

      {/* Main Horizontal Showcase */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Seamless Partner Logo Scroll (Horizontal Flow)
        </h4>
        <div className="p-6 border border-zinc-150 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-950/20 rounded-xl">
          <Marquee
            speed={speed}
            direction={direction === "up" || direction === "down" ? "left" : direction}
            pauseOnHover={pauseOnHover}
            gradient={gradient}
            gap="2rem"
            className="py-2"
          >
            {sponsorLogos.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm text-zinc-800 dark:text-zinc-200 font-semibold"
              >
                <span className="text-primary-500 text-lg font-black">{item.logo}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>

      {/* Vertical Showcase testimonails */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Testimonials Marquee track */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Descriptive Testimonials Scroll (Vertical Flow)
          </h4>
          <div className="h-64 p-4 border border-zinc-150 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-950/20 rounded-xl overflow-hidden flex flex-col justify-center">
            <Marquee
              speed={40}
              direction="up"
              pauseOnHover={true}
              gradient={gradient}
              gap="1.5rem"
              className="h-full"
            >
              {testimonials.map((testi, idx) => (
                <Card key={idx} variant="outline" size="sm" className="bg-white dark:bg-zinc-800">
                  <Card.Body>
                    <Text size="sm" weight="bold" className="text-primary-500 mb-1">{testi.user}</Text>
                    <Text size="sm" className="text-zinc-600 dark:text-zinc-400 leading-snug">
                      "{testi.comment}"
                    </Text>
                  </Card.Body>
                </Card>
              ))}
            </Marquee>
          </div>
        </div>

        {/* Informative details */}
        <div className="flex flex-col gap-4 p-6 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl border border-zinc-200 dark:border-zinc-800 h-64 justify-center">
          <h5 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Theme Mask Overlay Blending</h5>
          <Text size="sm" className="text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
            By mapping the marquee's gradient colors to the library's base background CSS variable, the fade-out edges now blend flawlessly in both light and dark modes.
          </Text>
          <div className="flex gap-2 mt-2">
            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-green-500/10 text-green-500">
              Resolved Variable Contrast
            </span>
            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-blue-500/10 text-blue-500">
              Dark Mode Fade Fix
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
