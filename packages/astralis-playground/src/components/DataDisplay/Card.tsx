import { Card, Text, Button, Badge } from "astralis-ui";

export default function CardShowcase() {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Card Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          A premium versatile content container supporting elevated depths, outline bounds, filled accents, hover actions, and header/body/footer structures.
        </p>
      </div>

      {/* Grid of Basic Card Variants */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Visual Variants & Sizes
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          {/* Elevated Card */}
          <Card variant="elevated" size="sm">
            <Card.Body>
              <Badge variant="primary" className="mb-2">Elevated</Badge>
              <Text weight="bold" size="md" className="mb-1">Project alpha</Text>
              <Text size="sm" className="text-zinc-500 dark:text-zinc-400">
                Small sized elevated depth card with shadow layers.
              </Text>
            </Card.Body>
          </Card>

          {/* Outlined Card */}
          <Card variant="outline" size="md">
            <Card.Body>
              <Badge variant="neutral" className="mb-2">Outline</Badge>
              <Text weight="bold" size="md" className="mb-1">Project beta</Text>
              <Text size="sm" className="text-zinc-500 dark:text-zinc-400">
                Medium sized outlined card with semantic border styling.
              </Text>
            </Card.Body>
          </Card>

          {/* Filled Card */}
          <Card variant="filled" size="lg">
            <Card.Body>
              <Badge variant="success" className="mb-2">Filled</Badge>
              <Text weight="bold" size="md" className="mb-1">Project gamma</Text>
              <Text size="sm" className="text-zinc-500 dark:text-zinc-400">
                Large sized filled card with sunken surface accenting.
              </Text>
            </Card.Body>
          </Card>

        </div>
      </div>

      {/* Interactive Cards and Hover Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* Interactive Hoverable Card */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Hover & Click Active Compression
          </h4>
          <Card variant="elevated" hoverable className="p-1 hover:astralis-border-primary-500 dark:hover:astralis-border-primary-500 transition-colors">
            <Card.Body>
              <div className="flex justify-between items-start gap-4 mb-2">
                <Text weight="bold" size="lg" className="text-zinc-900 dark:text-zinc-50">Click Me!</Text>
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500">Tactile Scaling</span>
              </div>
              <Text size="sm" className="text-zinc-500 dark:text-zinc-400">
                This elevated card is configured with hover scaling and active click compression (active:scale-[0.98]) matching premium button transitions. Click inside the card bounds to experience the tactile feedback.
              </Text>
            </Card.Body>
          </Card>
        </div>

        {/* Descriptive Card Structure */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Compound Card Structure
          </h4>
          <Card variant="elevated">
            <Card.Header extra={
              <Button size="xs" variant="outline">Settings</Button>
            }>
              <Card.Title>Cloud Server Deployment</Card.Title>
              <Card.Description>Production Instance node-081</Card.Description>
            </Card.Header>
            <Card.Body>
              <Text size="sm" className="text-zinc-500 dark:text-zinc-400">
                The primary cluster is operational. CPU consumption is locked at 12% across 16 active cores. Network latency benchmarks show healthy parameters.
              </Text>
            </Card.Body>
            <Card.Footer className="justify-between bg-zinc-50/50 dark:bg-zinc-950/20">
              <span className="text-xs font-bold uppercase tracking-wider text-green-500 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Active & Pinned
              </span>
              <div className="flex gap-2">
                <Button size="xs" variant="ghost">Reboot</Button>
                <Button size="xs" variant="primary">Access Console</Button>
              </div>
            </Card.Footer>
          </Card>
        </div>

      </div>

    </div>
  );
}
