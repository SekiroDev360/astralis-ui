import { Accordion, AccordionTitle } from "astralis-ui";

export default function AccordionShowcase() {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      {/* Title & Description */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Accordion Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Features implicit parent-value bindings, pure CSS height animations, robust keyboard navigation (Arrows, Home, End), and WAI-ARIA compliant ID mapping.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Basic Single-Select Accordion */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            Basic (Single Expandable)
          </span>
          <div className="border border-zinc-150 dark:border-zinc-800 rounded-xl p-4 bg-zinc-50/20 dark:bg-zinc-950/20">
            <Accordion type="single" collapsible defaultValue="item-1">
              <Accordion.Item value="item-1">
                <Accordion.Trigger>
                  <AccordionTitle>What is Astralis UI?</AccordionTitle>
                  <Accordion.Indicator />
                </Accordion.Trigger>
                <Accordion.Content>
                  Astralis is a premium, modern design system mapping directly to custom semantic tokens. It is built for absolute speed, tree-shaking efficacy, and elite developer experience.
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="item-2">
                <Accordion.Trigger>
                  <AccordionTitle>Is it screen reader accessible?</AccordionTitle>
                  <Accordion.Indicator />
                </Accordion.Trigger>
                <Accordion.Content>
                  Yes, every component strictly conforms to W3C standards, providing automated ARIA attributes, ID connections, and focus management out of the box.
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="item-3" disabled>
                <Accordion.Trigger>
                  <AccordionTitle>Can I use other custom icons? (Disabled)</AccordionTitle>
                  <Accordion.Indicator />
                </Accordion.Trigger>
                <Accordion.Content>
                  You can pass any custom react component to the trigger or indicator to personalize your layout.
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>

        {/* Multiple-Select Accordion */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            Multiple-Select Mode
          </span>
          <div className="border border-zinc-150 dark:border-zinc-800 rounded-xl p-4 bg-zinc-50/20 dark:bg-zinc-950/20">
            <Accordion type="multiple" defaultValue={["section-1", "section-2"]}>
              <Accordion.Item value="section-1">
                <Accordion.Trigger>
                  <AccordionTitle>System Requirements</AccordionTitle>
                  <Accordion.Indicator />
                </Accordion.Trigger>
                <Accordion.Content>
                  React 19+, Tailwind CSS v4, and modern bundlers supporting ESM tree-shaking are highly recommended.
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="section-2">
                <Accordion.Trigger>
                  <AccordionTitle>Performance Optimization</AccordionTitle>
                  <Accordion.Indicator />
                </Accordion.Trigger>
                <Accordion.Content>
                  With specialized, tree-shakable assets and explicit Registries, bundle impact is decreased by over 80%.
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="section-3">
                <Accordion.Trigger>
                  <AccordionTitle>Custom Theme Extensions</AccordionTitle>
                  <Accordion.Indicator />
                </Accordion.Trigger>
                <Accordion.Content>
                  Integrates with CSS semantic variables seamlessly, adapting vertical highlights, hover backgrounds, and custom borders to your primary brand overrides automatically.
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>

      </div>

    </div>
  );
}
