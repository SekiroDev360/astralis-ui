import { useState } from "react";
import { DataList, Text, Badge, Avatar, Tag, Button } from "astralis-ui";

export default function DataListShowcase() {
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [variant, setVariant] = useState<"plain" | "subtle" | "outline">("outline");
  const [divided, setDivided] = useState(true);

  const productDetails = [
    { label: "Product Name", value: "Astralis Premium Cloud Platform", info: "Name used in invoicing documents" },
    { label: "Deployment Region", value: <Tag colorScheme="blue">us-east-1 (N. Virginia)</Tag> },
    { label: "Operational Status", value: <Badge variant="success">Healthy</Badge> },
    { label: "Platform Administrator", value: (
      <div className="flex items-center gap-2">
        <Avatar name="Paula Astralis" size="xs" />
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Paula Astralis</span>
      </div>
    ) },
    { label: "Service Allocation Price", value: <span className="font-bold text-zinc-900 dark:text-zinc-50">$499.00 / month</span> },
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">DataList Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          A premium key-value list component styled for profile details, system metadata, billing summaries, and settings checklists.
        </p>
      </div>

      {/* Control Segment */}
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
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Container Variant</span>
          <div className="flex gap-2">
            {(["plain", "subtle", "outline"] as const).map((vt) => (
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
            onClick={() => setDivided((prev) => !prev)}
          >
            {divided ? "Remove Dividers" : "Add Dividers"}
          </Button>
        </div>
      </div>

      {/* Interactive Main List */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Main Specification Sheet
        </h4>
        <div className="bg-zinc-50/10 dark:bg-zinc-900/10 rounded-lg p-2">
          <DataList size={size} variant={variant} divided={divided}>
            {productDetails.map((detail, idx) => (
              <DataList.Item key={idx}>
                <DataList.Label info={detail.info}>{detail.label}</DataList.Label>
                <DataList.Value>{detail.value}</DataList.Value>
              </DataList.Item>
            ))}
          </DataList>
        </div>
      </div>

      {/* Orientation Layouts Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        
        {/* Horizontal Plain List */}
        <div className="flex flex-col gap-4 p-6 border border-zinc-150 dark:border-zinc-800 rounded-lg bg-zinc-50/20 dark:bg-zinc-900/20">
          <h5 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wide">
            Horizontal Plain (Compact)
          </h5>
          <DataList size="sm" variant="plain" divided={false}>
            <DataList.Item>
              <DataList.Label>System CPU</DataList.Label>
              <DataList.Value>16 Cores Intel Xeon</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Memory</DataList.Label>
              <DataList.Value>64 GB DDR5 RAM</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>SSD Storage</DataList.Label>
              <DataList.Value>2 TB NVMe RAID 0</DataList.Value>
            </DataList.Item>
          </DataList>
        </div>

        {/* Vertical Divided List */}
        <div className="flex flex-col gap-4 p-6 border border-zinc-150 dark:border-zinc-800 rounded-lg bg-zinc-50/20 dark:bg-zinc-900/20">
          <h5 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wide">
            Vertical Stack Orientation
          </h5>
          <DataList size="sm" variant="plain" orientation="vertical" divided={true}>
            <DataList.Item>
              <DataList.Label info="Detailed notes explaining team commits.">Commit Guidelines</DataList.Label>
              <DataList.Value className="text-zinc-500 dark:text-zinc-400">
                All pull requests require standard format scopes like feat:, fix:, or chore: before merging.
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Access Keys Policy</DataList.Label>
              <DataList.Value className="text-zinc-500 dark:text-zinc-400">
                Private cloud API access keys undergo standard rotation schedules every 90 business days automatically.
              </DataList.Value>
            </DataList.Item>
          </DataList>
        </div>

      </div>

    </div>
  );
}
