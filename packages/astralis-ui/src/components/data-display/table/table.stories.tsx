import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table } from "./index";
import { Badge } from "../badge";
import { Box } from "../../layout/box";

/**
 * Table is a semantic, styled `<table>` compound: `Table.Header`/`Body`/`Footer`,
 * `Table.Row`, `Table.Head`, `Table.Cell`, `Table.Caption`. Options: `variant`
 * (line/outline), `size`, `striped`, `interactive` hover, and `stickyHeader`.
 */
const meta: Meta<typeof Table> = {
  title: "Components/Data Display/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: { type: "inline-radio" }, options: ["line", "outline"] },
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    striped: { control: { type: "boolean" } },
    interactive: { control: { type: "boolean" } },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const rows = [
  { name: "Sophie Durand", role: "Design Lead", status: "Active", scheme: "green" as const },
  { name: "Alex Chen", role: "Engineering", status: "Active", scheme: "green" as const },
  { name: "Jordan Kim", role: "Product", status: "Away", scheme: "yellow" as const },
  { name: "Nina Bell", role: "Marketing", status: "Offline", scheme: "gray" as const },
];

const TableDemo = (args: Partial<React.ComponentProps<typeof Table>>) => (
  <Box style={{ maxWidth: 560 }}>
    <Table {...args}>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Role</Table.Head>
          <Table.Head>Status</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((r) => (
          <Table.Row key={r.name}>
            <Table.Cell>{r.name}</Table.Cell>
            <Table.Cell>{r.role}</Table.Cell>
            <Table.Cell><Badge colorScheme={r.scheme}>{r.status}</Badge></Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </Box>
);

export const Basic: Story = { render: () => <TableDemo /> };

export const Striped: Story = { render: () => <TableDemo striped /> };

export const Interactive: Story = { render: () => <TableDemo interactive /> };

export const Outline: Story = { render: () => <TableDemo variant="outline" striped /> };

export const Sizes: Story = {
  render: () => (
    <Box style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {(["sm", "md", "lg"] as const).map((s) => <TableDemo key={s} size={s} />)}
    </Box>
  ),
};

/** With a footer summary row and a caption. */
export const WithFooterAndCaption: Story = {
  render: () => (
    <Box style={{ maxWidth: 420 }}>
      <Table variant="outline">
        <Table.Caption placement="bottom">Q3 revenue by region</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head>Region</Table.Head>
            <Table.Head>Revenue</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row><Table.Cell>North</Table.Cell><Table.Cell>$48,200</Table.Cell></Table.Row>
          <Table.Row><Table.Cell>South</Table.Cell><Table.Cell>$31,900</Table.Cell></Table.Row>
          <Table.Row><Table.Cell>West</Table.Cell><Table.Cell>$27,450</Table.Cell></Table.Row>
        </Table.Body>
        <Table.Footer>
          <Table.Row><Table.Cell>Total</Table.Cell><Table.Cell>$107,550</Table.Cell></Table.Row>
        </Table.Footer>
      </Table>
    </Box>
  ),
};
