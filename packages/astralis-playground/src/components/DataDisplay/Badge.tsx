import { Badge, Button, Icon } from "astralis-ui";

export default function BadgeShowcase() {
  const colorSchemes = ["neutral", "primary", "success", "warning", "danger", "info"] as const;
  const sizes = ["xs", "sm", "md", "lg"] as const;

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      {/* Description */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Premium Badge Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Visual status chips and count markers. Supports colored fills, borders, count overflow boundaries, status animations, and corner ribbons.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* Subtle Colors */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            1. Subtle & Solid Variants
          </span>
          <div className="flex flex-col gap-4">
            {/* Subtle */}
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-xs text-zinc-400 w-16">Subtle:</span>
              {colorSchemes.map((scheme) => (
                <Badge key={scheme} variant={scheme}>
                  {scheme}
                </Badge>
              ))}
            </div>
            {/* Solid & Outline */}
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-xs text-zinc-400 w-16">Solid/Out:</span>
              <Badge variant="solid">Solid badge</Badge>
              <Badge variant="outline">Outline badge</Badge>
              <Badge variant="primary" icon={<Icon name="Check" size="xs" />}>
                Verified
              </Badge>
            </div>
          </div>
        </div>

        {/* Sizes Section */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            2. Badge Sizing Steps
          </span>
          <div className="flex flex-wrap gap-4 items-center">
            {sizes.map((sz) => (
              <div key={sz} className="flex items-center gap-2">
                <Badge size={sz} variant="primary">
                  Size {sz}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Status Badges Section */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            3. Status Badges (Online Pulse Indicators)
          </span>
          <div className="flex flex-wrap gap-6 items-center">
            <Badge.Status status="default" />
            <Badge.Status status="processing" />
            <Badge.Status status="success" label="Active" />
            <Badge.Status status="warning" label="Away" />
            <Badge.Status status="error" label="Failed" />
          </div>
        </div>

        {/* Notification Badges Section */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            4. Overlay Notifications (Counts & Dot Nodes)
          </span>
          <div className="flex flex-wrap gap-8 items-center">
            {/* Standard Button Count */}
            <Badge.Notification count={5}>
              <Button variant="outline">Notifications</Button>
            </Badge.Notification>

            {/* Overflow Limit */}
            <Badge.Notification count={120} overflowCount={99}>
              <Button variant="outline">Unread Messages</Button>
            </Badge.Notification>

            {/* Small Dot Overlay */}
            <Badge.Notification dot>
              <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg flex items-center justify-center">
                <Icon name="Laptop" size="sm" className="text-zinc-600 dark:text-zinc-300" />
              </div>
            </Badge.Notification>

            {/* Dynamic Colors */}
            <Badge.Notification count={8} color="success">
              <Button variant="outline">Completed Tasks</Button>
            </Badge.Notification>
          </div>
        </div>

        {/* Ribbon Overlay Section */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            5. Content Corner Ribbons (End / Start positions)
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Badge.Ribbon text="POPULAR" color="primary">
              <div className="p-6 bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-150 dark:border-zinc-800 rounded-lg h-36 flex flex-col justify-center gap-1">
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Professional Plan</h4>
                <p className="text-sm text-zinc-500">Perfect for scaling developer teams and advanced analytics.</p>
              </div>
            </Badge.Ribbon>

            <Badge.Ribbon text="NEW" color="success" placement="start">
              <div className="p-6 bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-150 dark:border-zinc-800 rounded-lg h-36 flex flex-col justify-center gap-1">
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Dynamic Shades v2</h4>
                <p className="text-sm text-zinc-500">Auto-convert base color codes to dynamic light and dark variables.</p>
              </div>
            </Badge.Ribbon>
          </div>
        </div>

      </div>

    </div>
  );
}
