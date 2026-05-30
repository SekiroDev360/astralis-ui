import { useState } from "react";
import { Table, Text, Badge, Button } from "astralis-ui";

export default function TableShowcase() {
  const [size, setSize] = useState<"sm" | "md" | "lg">("sm");
  const [variant, setVariant] = useState<"simple" | "striped" | "unstyled">("simple");
  const [bordered, setBordered] = useState(true);
  const [columnBorder, setColumnBorder] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Record<number, boolean>>({ 1: true });

  const tableData = [
    { id: 101, user: "Alice Vance", email: "alice@astralis-ui.com", role: "Administrator", status: "Active", volume: "$12,430" },
    { id: 102, user: "Bob Miller", email: "bob@astralis-ui.com", role: "Billing Editor", status: "Pending", volume: "$8,500" },
    { id: 103, user: "Carol Elena", email: "carol@astralis-ui.com", role: "Contributor", status: "Active", volume: "$2,400" },
    { id: 104, user: "David Jenkins", email: "david@astralis-ui.com", role: "Viewer", status: "Suspended", volume: "$0" },
  ];

  const toggleSelectRow = (index: number) => {
    setSelectedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const statusBadge = (status: string) => {
    if (status === "Active") return <Badge colorScheme="success">Active</Badge>;
    if (status === "Pending") return <Badge colorScheme="warning">Pending</Badge>;
    return <Badge colorScheme="danger">Suspended</Badge>;
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Table Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          A premium responsive HTML table component supporting cell sizing, striped styling, sticky scroll headers, row selections, and sticky pinned columns.
        </p>
      </div>

      {/* Controls Segment */}
      <div className="flex flex-wrap gap-4 p-4 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
        
        <div className="flex flex-col gap-1.5 flex-1 min-w-[120px]">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Cell Size</span>
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
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Variant Style</span>
          <div className="flex gap-2">
            {(["simple", "striped", "unstyled"] as const).map((vt) => (
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
            variant={bordered ? "primary" : "outline"}
            onClick={() => setBordered((prev) => !prev)}
          >
            Outer Borders: {bordered ? "ON" : "OFF"}
          </Button>
        </div>

        <div className="flex flex-col gap-1.5 justify-center">
          <Button
            size="sm"
            variant={columnBorder ? "primary" : "outline"}
            onClick={() => setColumnBorder((prev) => !prev)}
          >
            Column Dividers: {columnBorder ? "ON" : "OFF"}
          </Button>
        </div>

      </div>

      {/* Main Interactive Table */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-baseline">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Interactive Row Selection & Formatting
          </h4>
          <span className="text-xs text-zinc-400 font-semibold uppercase">Click rows to toggle selection</span>
        </div>
        <Table size={size} variant={variant} bordered={bordered} columnBorder={columnBorder}>
          <Table.Header>
            <Table.Row>
              <Table.Head>ID</Table.Head>
              <Table.Head>User</Table.Head>
              <Table.Head>Email Address</Table.Head>
              <Table.Head>Assigned Role</Table.Head>
              <Table.Head>Status</Table.Head>
              <Table.Head isNumeric>Billing Volume</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tableData.map((item, idx) => (
              <Table.Row
                key={item.id}
                selected={selectedRows[idx]}
                onClick={() => toggleSelectRow(idx)}
                className="astralis-cursor-pointer"
              >
                <Table.Cell className="font-semibold text-zinc-400">{item.id}</Table.Cell>
                <Table.Cell className="font-bold">{item.user}</Table.Cell>
                <Table.Cell className="text-zinc-500">{item.email}</Table.Cell>
                <Table.Cell>{item.role}</Table.Cell>
                <Table.Cell>{statusBadge(item.status)}</Table.Cell>
                <Table.Cell isNumeric className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {item.volume}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Sticky Pinned Header Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-4">
        
        {/* Sticky Pinned Header */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Sticky Pinned Header Scroll (Y-Axis)
          </h4>
          <div className="border border-zinc-150 dark:border-zinc-800 rounded-lg overflow-hidden bg-zinc-50/10 dark:bg-zinc-950/10">
            <Table stickyHeader maxHeight={160} size="sm" variant="striped" bordered={false}>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Attribute</Table.Head>
                  <Table.Head>Status Metric</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell className="font-semibold">Network Inbound</Table.Cell>
                  <Table.Cell className="text-green-500 font-bold">12.8 Gbps (Healthy)</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="font-semibold">Disk Read Write</Table.Cell>
                  <Table.Cell className="text-green-500 font-bold">920 MB/s (Optimal)</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="font-semibold">CPU Core Load</Table.Cell>
                  <Table.Cell className="text-green-500 font-bold">14.2% Average</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="font-semibold">Port Allocation</Table.Cell>
                  <Table.Cell className="text-zinc-500 font-semibold">1,024 Bound Ports</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>

        {/* Sticky Pinned Columns (X-Axis) */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Sticky Pinned Left/Right Action Columns (X-Axis)
          </h4>
          <div className="border border-zinc-150 dark:border-zinc-800 rounded-lg overflow-hidden bg-zinc-50/10 dark:bg-zinc-950/10 max-w-[380px] w-full">
            <Table size="sm" variant="simple" bordered={false}>
              <Table.Header>
                <Table.Row>
                  <Table.Head sticky="left" className="bg-zinc-100 dark:bg-zinc-800 z-10 font-bold">Region</Table.Head>
                  <Table.Head>Server Node Name</Table.Head>
                  <Table.Head>Availability zone</Table.Head>
                  <Table.Head>Subnet Range</Table.Head>
                  <Table.Head sticky="right" className="bg-zinc-100 dark:bg-zinc-800 z-10 font-bold" isNumeric>Control</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell sticky="left" className="bg-white dark:bg-zinc-900 font-bold">us-east-1</Table.Cell>
                  <Table.Cell>node-east-01</Table.Cell>
                  <Table.Cell>us-east-1a</Table.Cell>
                  <Table.Cell>10.0.1.0/24</Table.Cell>
                  <Table.Cell sticky="right" className="bg-white dark:bg-zinc-900" isNumeric>
                    <Button size="xs" variant="outline">Boot</Button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell sticky="left" className="bg-white dark:bg-zinc-900 font-bold">eu-west-1</Table.Cell>
                  <Table.Cell>node-west-04</Table.Cell>
                  <Table.Cell>eu-west-1b</Table.Cell>
                  <Table.Cell>10.1.2.0/24</Table.Cell>
                  <Table.Cell sticky="right" className="bg-white dark:bg-zinc-900" isNumeric>
                    <Button size="xs" variant="outline">Boot</Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>

      </div>

    </div>
  );
}
