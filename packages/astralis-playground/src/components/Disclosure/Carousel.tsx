import { Carousel, Text } from "astralis-ui";

export default function CarouselShowcase() {
  const slides = [
    {
      title: "Vibrant Design System",
      description: "Astralis provides sleek, custom-theme-compliant UI components mapped directly to semantic CSS tokens.",
      bg: "from-green-500/10 to-emerald-600/15 dark:from-green-500/5 dark:to-emerald-500/5 border-green-200/50 dark:border-green-800/20",
      accent: "text-green-600 dark:text-green-400"
    },
    {
      title: "Tree-Shakable Architecture",
      description: "Explicit built-in Icon components reduce bundle sizes by up to 82%, maintaining speed and high performance.",
      bg: "from-blue-500/10 to-indigo-600/15 dark:from-blue-500/5 dark:to-indigo-500/5 border-blue-200/50 dark:border-blue-800/20",
      accent: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "AAA Web Accessibility",
      description: "Every component is meticulously designed to support W3C standards, keyboard tab navigation, and screen readers.",
      bg: "from-amber-500/10 to-orange-600/15 dark:from-amber-500/5 dark:to-orange-500/5 border-amber-200/50 dark:border-amber-800/20",
      accent: "text-amber-600 dark:text-amber-400"
    }
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-6 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Premium Dynamic Carousel</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Features rounded controls, built-in tree-shakable Chevrons, and our brand new <span className="font-semibold text-green-600 dark:text-green-400">&lt;Carousel.Indicators /&gt;</span> auto-generating sliding pills.
        </p>
      </div>

      <div className="relative border border-zinc-150 dark:border-zinc-800/80 rounded-xl overflow-hidden bg-zinc-50/20 dark:bg-zinc-950/20 p-2">
        <Carousel>
          <Carousel.Track>
            {slides.map((item, i) => (
              <Carousel.Slide key={i}>
                <div className={`h-64 flex flex-col justify-center items-center text-center p-8 bg-gradient-to-br ${item.bg} border rounded-lg shadow-sm transition-colors duration-200`}>
                  <span className={`text-xs font-bold uppercase tracking-widest ${item.accent} mb-2`}>
                    Feature {i + 1}
                  </span>
                  <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{item.title}</h4>
                  <Text element="p" size="sm" align="center" className="mt-2 text-zinc-500 dark:text-zinc-400 max-w-md">
                    {item.description}
                  </Text>
                </div>
              </Carousel.Slide>
            ))}
          </Carousel.Track>

          {/* Premium circular floating buttons with Chevron icons by default */}
          <Carousel.Prev />
          <Carousel.Next />

          {/* New auto-mapping sliding pills subcomponent */}
          <Carousel.Indicators />
        </Carousel>
      </div>
    </div>
  );
}
