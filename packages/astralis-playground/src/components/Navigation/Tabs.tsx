import { Tabs, Text } from "astralis-ui";

export default function TabsShowcase() {
  const horizontalTabs = [
    { value: "profile", label: "Profile Settings", content: "Update your name, picture, and public bio. Changes reflect instantly." },
    { value: "billing", label: "Billing Details", content: "Manage subscription plans, invoices, and credit card payments." },
    { value: "security", label: "Security & Keys", content: "Configure two-factor authentication, change password, and generate API keys.", disabled: true },
    { value: "notifications", label: "Notification Channels", content: "Choose email, Slack, or web push notification preferences." },
  ];

  const verticalTabs = [
    { value: "general", label: "General Config", content: "Define core app configs, metadata, and environment settings." },
    { value: "integrations", label: "Cloud Integrations", content: "Connect your workspace to GitHub, AWS, Vercel, and Google Cloud." },
    { value: "permissions", label: "Team Roles", content: "Invite members and define detailed viewer, editor, and admin access levels." },
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-12 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      {/* Horizontal Tabs Section */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Horizontal Navigation Tabs</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Fully interactive. Supports <span className="font-semibold text-green-600 dark:text-green-400">ArrowRight / ArrowLeft</span> to navigate, automatically skipping the disabled Security tab.
          </p>
        </div>

        <div className="p-4 border border-zinc-100 dark:border-zinc-800 rounded-lg bg-zinc-50/30 dark:bg-zinc-900/30">
          <Tabs defaultValue="profile" orientation="horizontal">
            <Tabs.List>
              {horizontalTabs.map((item) => (
                <Tabs.Trigger key={item.value} value={item.value} disabled={item.disabled}>
                  {item.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <div className="mt-4 p-5 bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm min-h-[100px] flex flex-col justify-center">
              {horizontalTabs.map((item) => (
                <Tabs.Content key={item.value} value={item.value}>
                  <h4 className="text-base font-medium text-zinc-900 dark:text-zinc-50">{item.label}</h4>
                  <Text element="p" size="sm" className="mt-1 text-zinc-500 dark:text-zinc-400">
                    {item.content}
                  </Text>
                </Tabs.Content>
              ))}
            </div>
          </Tabs>
        </div>
      </div>

      {/* Vertical Tabs Section */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Vertical Settings Tabs</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Loops around automatically. Supports <span className="font-semibold text-green-600 dark:text-green-400">ArrowDown / ArrowUp</span> key commands. Uses gorgeous soft green vertical highlights.
          </p>
        </div>

        <div className="p-4 border border-zinc-100 dark:border-zinc-800 rounded-lg bg-zinc-50/30 dark:bg-zinc-900/30">
          <Tabs defaultValue="general" orientation="vertical" loop={true} className="w-full">
            <Tabs.List className="w-64 shrink-0">
              {verticalTabs.map((item) => (
                <Tabs.Trigger key={item.value} value={item.value}>
                  {item.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <div className="flex-1 p-6 bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm min-h-[140px] flex flex-col justify-center">
              {verticalTabs.map((item) => (
                <Tabs.Content key={item.value} value={item.value}>
                  <h4 className="text-base font-medium text-zinc-900 dark:text-zinc-50">{item.label}</h4>
                  <Text element="p" size="sm" className="mt-1 text-zinc-500 dark:text-zinc-400">
                    {item.content}
                  </Text>
                </Tabs.Content>
              ))}
            </div>
          </Tabs>
        </div>
      </div>

    </div>
  );
}
