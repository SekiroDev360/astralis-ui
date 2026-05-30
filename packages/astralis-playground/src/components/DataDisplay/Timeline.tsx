import { useState } from "react";
import { Timeline, Text, Button } from "astralis-ui";

export default function TimelineShowcase() {
  const [isPending, setIsPending] = useState(true);
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [variant, setVariant] = useState<"subtle" | "outline" | "solid">("subtle");

  const timelineEvents = [
    {
      title: "Project Initiated",
      description: "Requirements gathered and architecture plan approved.",
      time: "9:00 AM",
      color: "success" as const,
      icon: (
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full p-1">
          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
        </svg>
      ),
    },
    {
      title: "Beta Version Released",
      description: "First public deployment completed and QA reporting verified.",
      time: "1:30 PM",
      color: "primary" as const,
      icon: (
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full p-1">
          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
        </svg>
      ),
    },
    {
      title: "Security Auditing",
      description: "External penetrative tests and compliance scans initialized.",
      time: "3:45 PM",
      color: "warning" as const,
      icon: (
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full p-1">
          <path d="M8 .5c-.662 0-1.77.249-2.813.525a61.11 61.11 0 0 0-2.772.815 1.75 1.75 0 0 0-1.228 1.54.75.75 0 0 0 .18.54l.06.06c.742.756 1.458 1.5 2.079 2.26C4.426 7.42 5 8.5 5 9.5c0 1.859-.974 3.88-2.453 5.51A.75.75 0 0 0 3.1 16c2.477-.074 4.542-.767 6-2.034a7.994 7.994 0 0 0 2.253-3.111C12.426 8.5 13 7.42 13 6.5c0-3.325-3.387-5.074-4.813-5.525C7.149.7 6.338.5 6 .5zm0 1.25V6.5c0 .354-.108.683-.292.953A4.978 4.978 0 0 1 6.5 9.5c0 1.344-.654 2.825-1.761 4.1C6.012 14.195 7.158 14.5 8.5 14.5a6.5 6.5 0 0 0 4-2.58A6.5 6.5 0 0 0 13.5 9.5c0-1.344-.654-2.825-1.76-4.1-1.107-1.275-1.74-2.756-1.74-4.1V1.75c0-.354-.108-.683-.293-.953A4.978 4.978 0 0 1 8.5.5c-1.344 0-2.825.654-4.1 1.76C3.125 3.367 2.812 3.68 2.812 4.033v4.734a6.5 6.5 0 0 0 2.58-4 6.5 6.5 0 0 0 2.58-4V1.75z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Timeline Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          A premium event history layout that scales with rich content, pending loading nodes, and horizontal orientations.
        </p>
      </div>

      {/* Controls Segment */}
      <div className="flex flex-wrap gap-4 p-4 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Size</span>
          <div className="flex gap-2">
            {(["sm", "md", "lg"] as const).map((sz) => (
              <Button
                key={sz}
                size="xs"
                variant={size === sz ? "primary" : "outline"}
                onClick={() => setSize(sz)}
              >
                {sz.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5 flex-1 min-w-[180px]">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Indicator Style</span>
          <div className="flex gap-2">
            {(["subtle", "outline", "solid"] as const).map((vt) => (
              <Button
                key={vt}
                size="xs"
                variant={variant === vt ? "primary" : "outline"}
                onClick={() => setVariant(vt)}
              >
                {vt.charAt(0).toUpperCase() + vt.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5 justify-center">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsPending((prev) => !prev)}
          >
            Toggle Pending Node
          </Button>
        </div>
      </div>

      {/* Grid of Timelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Interactive Vertical Timeline */}
        <div className="flex flex-col gap-4 p-6 border border-zinc-100 dark:border-zinc-800 rounded-lg bg-zinc-50/20 dark:bg-zinc-900/20">
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wide">
            Interactive Vertical Layout
          </h4>
          <Timeline size={size} variant={variant} pending={isPending ? "Deploying Release Package..." : false}>
            {timelineEvents.map((evt, idx) => (
              <Timeline.Item key={idx}>
                <Timeline.Connector>
                  <Timeline.Indicator color={evt.color} icon={evt.icon} />
                </Timeline.Connector>
                <Timeline.Content>
                  <div className="flex justify-between items-baseline gap-2">
                    <Timeline.Title>{evt.title}</Timeline.Title>
                    <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                      {evt.time}
                    </span>
                  </div>
                  <Timeline.Description>{evt.description}</Timeline.Description>
                </Timeline.Content>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>

        {/* Alternating & Custom Color Timeline */}
        <div className="flex flex-col gap-4 p-6 border border-zinc-100 dark:border-zinc-800 rounded-lg bg-zinc-50/20 dark:bg-zinc-900/20">
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wide">
            Alternating Placement Layout
          </h4>
          <Timeline size="md" variant="solid">
            <Timeline.Item placement="left">
              <Timeline.Connector>
                <Timeline.Indicator color="success" />
              </Timeline.Connector>
              <Timeline.Content>
                <Timeline.Title>Step 1: Code Review</Timeline.Title>
                <Timeline.Description>Pull requests reviewed and quality checks passed.</Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item placement="right">
              <Timeline.Connector>
                <Timeline.Indicator color="primary" />
              </Timeline.Connector>
              <Timeline.Content>
                <Timeline.Title>Step 2: Integration</Timeline.Title>
                <Timeline.Description>Modules merged into production main trunk branch.</Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item placement="left">
              <Timeline.Connector>
                <Timeline.Indicator color="#a855f7" /> {/* Custom Hex Purple Color */}
              </Timeline.Connector>
              <Timeline.Content>
                <Timeline.Title>Step 3: Verification</Timeline.Title>
                <Timeline.Description>Regression tests confirmed stable code behaviors.</Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </div>
      </div>

      {/* Horizontal Timeline Section */}
      <div className="flex flex-col gap-4 p-6 border border-zinc-100 dark:border-zinc-800 rounded-lg bg-zinc-50/20 dark:bg-zinc-900/20">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wide">
          Horizontal Flow Layout
        </h4>
        <div className="py-4 overflow-x-auto">
          <Timeline orientation="horizontal" size="md" variant="outline" className="min-w-[600px] w-full">
            <Timeline.Item>
              <Timeline.Connector>
                <Timeline.Indicator color="success" />
              </Timeline.Connector>
              <Timeline.Content className="text-center pt-2">
                <Timeline.Title>Phase 1</Timeline.Title>
                <Timeline.Description>Planning & Specs</Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item>
              <Timeline.Connector>
                <Timeline.Indicator color="primary" />
              </Timeline.Connector>
              <Timeline.Content className="text-center pt-2">
                <Timeline.Title>Phase 2</Timeline.Title>
                <Timeline.Description>Core Development</Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item>
              <Timeline.Connector>
                <Timeline.Indicator color="warning" />
              </Timeline.Connector>
              <Timeline.Content className="text-center pt-2">
                <Timeline.Title>Phase 3</Timeline.Title>
                <Timeline.Description>Beta Deployments</Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </div>
      </div>

    </div>
  );
}
