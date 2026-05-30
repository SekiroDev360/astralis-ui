import { useState, Fragment } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table } from "./index";
import { Badge } from "../badge";
import { Checkbox } from "../../data-entry/checkbox";
import { Radio } from "../../data-entry/radio";
import { AstralisProvider } from "../../../theme";

/* ------------------------------------------------------------------ */
/* Meta                                                                 */
/* ------------------------------------------------------------------ */

const meta: Meta<typeof Table> = {
  title: "Components/Data Display/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Table is a flexible data-display component built on the **Compound API** pattern. Compose `<Table.Header>`, `<Table.Body>`, `<Table.Row>`, `<Table.Head>`, `<Table.Cell>` and more to build any table structure with full control over layout, content and behaviour.",
      },
    },
  },
  decorators: [
    (Story) => (
      <AstralisProvider>
        <div className="astralis-p-4">
          <Story />
        </div>
      </AstralisProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Table>;

/* ================================================================== */
/* Shared Data & Helpers                                               */
/* ================================================================== */

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "inactive" | "pending";
  commits: number;
}

const USERS: UserRecord[] = [
  {
    id: "u1",
    name: "Alex Harper",
    email: "alex@astralis.dev",
    role: "Engineering Lead",
    department: "Engineering",
    status: "active",
    commits: 245,
  },
  {
    id: "u2",
    name: "Samira Jones",
    email: "samira@astralis.dev",
    role: "Product Manager",
    department: "Product",
    status: "active",
    commits: 84,
  },
  {
    id: "u3",
    name: "Michael Chen",
    email: "michael@astralis.dev",
    role: "UX Designer",
    department: "Design",
    status: "inactive",
    commits: 12,
  },
  {
    id: "u4",
    name: "Dana Scully",
    email: "dana@astralis.dev",
    role: "Data Scientist",
    department: "Engineering",
    status: "active",
    commits: 312,
  },
  {
    id: "u5",
    name: "James Kirk",
    email: "james@astralis.dev",
    role: "DevOps Engineer",
    department: "Engineering",
    status: "pending",
    commits: 98,
  },
  {
    id: "u6",
    name: "Priya Patel",
    email: "priya@astralis.dev",
    role: "Frontend Dev",
    department: "Engineering",
    status: "active",
    commits: 176,
  },
  {
    id: "u7",
    name: "Lena Hoffman",
    email: "lena@astralis.dev",
    role: "Backend Dev",
    department: "Engineering",
    status: "active",
    commits: 203,
  },
  {
    id: "u8",
    name: "Omar Faruk",
    email: "omar@astralis.dev",
    role: "QA Engineer",
    department: "QA",
    status: "inactive",
    commits: 44,
  },
  {
    id: "u9",
    name: "Rosa Martinez",
    email: "rosa@astralis.dev",
    role: "Scrum Master",
    department: "Product",
    status: "active",
    commits: 31,
  },
  {
    id: "u10",
    name: "Yuki Tanaka",
    email: "yuki@astralis.dev",
    role: "ML Engineer",
    department: "Research",
    status: "pending",
    commits: 159,
  },
];

function StatusBadge({ status }: { status: UserRecord["status"] }) {
  if (status === "active")
    return (
      <Badge variant="success" size="sm">
        Active
      </Badge>
    );
  if (status === "inactive")
    return (
      <Badge variant="neutral" size="sm">
        Inactive
      </Badge>
    );
  return (
    <Badge variant="warning" size="sm">
      Pending
    </Badge>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <div className="astralis-h-8 astralis-w-8 astralis-shrink-0 astralis-rounded-full astralis-bg-primary-100 astralis-text-primary-700 dark:astralis-bg-primary-900 dark:astralis-text-primary-300 astralis-flex astralis-items-center astralis-justify-center astralis-font-semibold astralis-text-xs">
      {initials}
    </div>
  );
}

/** Simple pagination bar — fully controlled by the story */
function PaginationBar({
  page,
  pageSize,
  total,
  onChange,
}: {
  page: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const btn =
    "astralis-inline-flex astralis-items-center astralis-justify-center astralis-h-8 astralis-min-w-[2rem] astralis-px-2 astralis-rounded astralis-text-sm astralis-font-medium astralis-transition-colors astralis-border astralis-border-border-subtle";

  return (
    <div className="astralis-flex astralis-items-center astralis-justify-between astralis-px-1 astralis-py-3 astralis-text-sm astralis-text-content-secondary">
      <span>
        Showing {Math.min((page - 1) * pageSize + 1, total)}–
        {Math.min(page * pageSize, total)} of {total} rows
      </span>
      <div className="astralis-flex astralis-items-center astralis-gap-1">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
          className={`${btn} hover:astralis-bg-surface-raised disabled:astralis-opacity-40 disabled:astralis-cursor-not-allowed`}
        >
          ‹
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`${btn} ${p === page ? "astralis-bg-primary-600 astralis-text-white astralis-border-primary-600" : "hover:astralis-bg-surface-raised"}`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onChange(page + 1)}
          disabled={page >= totalPages}
          className={`${btn} hover:astralis-bg-surface-raised disabled:astralis-opacity-40 disabled:astralis-cursor-not-allowed`}
        >
          ›
        </button>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Stories                                                             */
/* ================================================================== */

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  render: () => (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Email</Table.Head>
          <Table.Head>Role</Table.Head>
          <Table.Head isNumeric>Commits</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {USERS.slice(0, 4).map((u) => (
          <Table.Row key={u.id}>
            <Table.Cell className="astralis-font-medium">{u.name}</Table.Cell>
            <Table.Cell>{u.email}</Table.Cell>
            <Table.Cell>{u.role}</Table.Cell>
            <Table.Cell isNumeric>{u.commits}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Basic table. Compose `<Table.Header>`, `<Table.Body>`, `<Table.Row>`, `<Table.Head>` and `<Table.Cell>` to build any structure.",
      },
    },
  },
};

/* ── Sizes ────────────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-8">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size}>
          <p className="astralis-mb-2 astralis-text-xs astralis-font-semibold astralis-text-content-secondary uppercase astralis-tracking-wide">
            {size === "sm"
              ? "Small"
              : size === "md"
                ? "Medium (default)"
                : "Large"}
          </p>
          <Table size={size} bordered>
            <Table.Header>
              <Table.Row>
                <Table.Head>Name</Table.Head>
                <Table.Head>Role</Table.Head>
                <Table.Head isNumeric>Commits</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {USERS.slice(0, 3).map((u) => (
                <Table.Row key={u.id}>
                  <Table.Cell className="astralis-font-medium">
                    {u.name}
                  </Table.Cell>
                  <Table.Cell>{u.role}</Table.Cell>
                  <Table.Cell isNumeric>{u.commits}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Three sizes: `sm`, `md` (default), `lg`. Size controls cell padding.",
      },
    },
  },
};

/* ── Variants ─────────────────────────────────────────────────────── */

export const Variants: Story = {
  render: () => (
    <div className="astralis-flex astralis-flex-col astralis-gap-8">
      {(["simple", "striped", "unstyled"] as const).map((variant) => (
        <div key={variant}>
          <p className="astralis-mb-2 astralis-text-xs astralis-font-semibold astralis-text-content-secondary uppercase astralis-tracking-wide">
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
            {variant === "simple" ? " (default)" : ""}
          </p>
          <Table variant={variant} bordered={variant !== "unstyled"}>
            <Table.Header>
              <Table.Row>
                <Table.Head>Name</Table.Head>
                <Table.Head>Department</Table.Head>
                <Table.Head>Status</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {USERS.slice(0, 4).map((u) => (
                <Table.Row key={u.id}>
                  <Table.Cell className="astralis-font-medium">
                    {u.name}
                  </Table.Cell>
                  <Table.Cell>{u.department}</Table.Cell>
                  <Table.Cell>
                    <StatusBadge status={u.status} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`simple` (default) — dividing lines only. `striped` — alternating row tints. `unstyled` — no decoration.",
      },
    },
  },
};

/* ── Bordered ─────────────────────────────────────────────────────── */

export const Bordered: Story = {
  render: () => (
    <Table bordered>
      <Table.Caption placement="top">Team Roster — Q1 2026</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Email</Table.Head>
          <Table.Head>Department</Table.Head>
          <Table.Head>Status</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {USERS.slice(0, 4).map((u) => (
          <Table.Row key={u.id}>
            <Table.Cell className="astralis-font-medium">{u.name}</Table.Cell>
            <Table.Cell>{u.email}</Table.Cell>
            <Table.Cell>{u.department}</Table.Cell>
            <Table.Cell>
              <StatusBadge status={u.status} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Add `bordered` for an outer container border. Use `<Table.Caption placement="top">` for a table title.',
      },
    },
  },
};

/* ── Overflow ─────────────────────────────────────────────────────── */

export const Overflow: Story = {
  render: () => (
    <Table bordered>
      <Table.Header>
        <Table.Row>
          <Table.Head style={{ minWidth: 160 }}>Name</Table.Head>
          <Table.Head style={{ minWidth: 220 }}>Email</Table.Head>
          <Table.Head style={{ minWidth: 160 }}>Role</Table.Head>
          <Table.Head style={{ minWidth: 140 }}>Department</Table.Head>
          <Table.Head style={{ minWidth: 110 }}>Status</Table.Head>
          <Table.Head isNumeric style={{ minWidth: 130 }}>
            Commits
          </Table.Head>
          <Table.Head isNumeric style={{ minWidth: 130 }}>
            Sprint Pts
          </Table.Head>
          <Table.Head isNumeric style={{ minWidth: 120 }}>
            PRs Merged
          </Table.Head>
          <Table.Head isNumeric style={{ minWidth: 110 }}>
            Reviews
          </Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {USERS.slice(0, 5).map((u) => (
          <Table.Row key={u.id}>
            <Table.Cell className="astralis-font-medium">{u.name}</Table.Cell>
            <Table.Cell>{u.email}</Table.Cell>
            <Table.Cell>{u.role}</Table.Cell>
            <Table.Cell>{u.department}</Table.Cell>
            <Table.Cell>
              <StatusBadge status={u.status} />
            </Table.Cell>
            <Table.Cell isNumeric className="astralis-font-mono">
              {u.commits}
            </Table.Cell>
            <Table.Cell isNumeric className="astralis-font-mono">
              {u.commits * 2}
            </Table.Cell>
            <Table.Cell isNumeric className="astralis-font-mono">
              {Math.floor(u.commits / 5)}
            </Table.Cell>
            <Table.Cell isNumeric className="astralis-font-mono">
              {Math.floor(u.commits / 3)}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "When a table has more columns than the viewport can fit, the outer wrapper automatically scrolls horizontally. Use `style={{ minWidth }}` on `<Table.Head>` to control column widths.",
      },
    },
  },
};

/* ── Sticky Header ────────────────────────────────────────────────── */

export const StickyHeader: Story = {
  render: () => (
    <Table bordered stickyHeader maxHeight={260}>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Email</Table.Head>
          <Table.Head>Department</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head isNumeric>Commits</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {USERS.map((u) => (
          <Table.Row key={u.id}>
            <Table.Cell className="astralis-font-medium">{u.name}</Table.Cell>
            <Table.Cell>{u.email}</Table.Cell>
            <Table.Cell>{u.department}</Table.Cell>
            <Table.Cell>
              <StatusBadge status={u.status} />
            </Table.Cell>
            <Table.Cell isNumeric className="astralis-font-mono">
              {u.commits}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pass `stickyHeader` and `maxHeight` to cap the table height and pin the `<Table.Header>` while the body rows scroll vertically.",
      },
    },
  },
};

/* ── Sticky Header + Column ───────────────────────────────────────── */

export const StickyHeaderAndColumn: Story = {
  render: () => (
    <Table bordered stickyHeader maxHeight={280}>
      <Table.Header>
        <Table.Row>
          <Table.Head sticky="left" style={{ minWidth: 180 }}>
            Name
          </Table.Head>
          <Table.Head style={{ minWidth: 220 }}>Email</Table.Head>
          <Table.Head style={{ minWidth: 160 }}>Role</Table.Head>
          <Table.Head style={{ minWidth: 140 }}>Department</Table.Head>
          <Table.Head style={{ minWidth: 110 }}>Status</Table.Head>
          <Table.Head isNumeric style={{ minWidth: 130 }}>
            Commits
          </Table.Head>
          <Table.Head isNumeric style={{ minWidth: 130 }}>
            Sprint Pts
          </Table.Head>
          <Table.Head isNumeric style={{ minWidth: 120 }}>
            PRs Merged
          </Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {USERS.map((u) => (
          <Table.Row key={u.id}>
            <Table.Cell sticky="left" className="astralis-font-medium">
              {u.name}
            </Table.Cell>
            <Table.Cell>{u.email}</Table.Cell>
            <Table.Cell>{u.role}</Table.Cell>
            <Table.Cell>{u.department}</Table.Cell>
            <Table.Cell>
              <StatusBadge status={u.status} />
            </Table.Cell>
            <Table.Cell isNumeric className="astralis-font-mono">
              {u.commits}
            </Table.Cell>
            <Table.Cell isNumeric className="astralis-font-mono">
              {u.commits * 2}
            </Table.Cell>
            <Table.Cell isNumeric className="astralis-font-mono">
              {Math.floor(u.commits / 5)}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Combine `stickyHeader` + `maxHeight` with `sticky="left"` on `<Table.Head>` and `<Table.Cell>` to pin both the header row and a column simultaneously.',
      },
    },
  },
};

/* ── Pagination ───────────────────────────────────────────────────── */

export const Pagination: Story = {
  render: () => {
    const PAGE_SIZE = 3;
    const [page, setPage] = useState(1);
    const pageRows = USERS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-0">
        <Table bordered>
          <Table.Header>
            <Table.Row>
              <Table.Head>Name</Table.Head>
              <Table.Head>Role</Table.Head>
              <Table.Head>Department</Table.Head>
              <Table.Head>Status</Table.Head>
              <Table.Head isNumeric>Commits</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {pageRows.map((u) => (
              <Table.Row key={u.id}>
                <Table.Cell>
                  <div className="astralis-flex astralis-items-center astralis-gap-3">
                    <Avatar name={u.name} />
                    <span className="astralis-font-medium">{u.name}</span>
                  </div>
                </Table.Cell>
                <Table.Cell>{u.role}</Table.Cell>
                <Table.Cell>{u.department}</Table.Cell>
                <Table.Cell>
                  <StatusBadge status={u.status} />
                </Table.Cell>
                <Table.Cell isNumeric className="astralis-font-mono">
                  {u.commits}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <PaginationBar
          page={page}
          pageSize={PAGE_SIZE}
          total={USERS.length}
          onChange={setPage}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pagination is handled externally — slice the data array based on your `page` state and render only that slice into `<Table.Body>`. Place any pagination UI below the table.",
      },
    },
  },
};

/* ── Selection (Checkbox) ─────────────────────────────────────────── */

export const SelectionCheckbox: Story = {
  render: () => {
    const [selected, setSelected] = useState<Set<string>>(new Set());

    const allIds = USERS.slice(0, 6).map((u) => u.id);
    const allChecked = allIds.every((id) => selected.has(id));
    const someChecked = !allChecked && allIds.some((id) => selected.has(id));

    const toggleAll = () => {
      setSelected(allChecked ? new Set() : new Set(allIds));
    };

    const toggle = (id: string) => {
      setSelected((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
    };

    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-3">
        {selected.size > 0 && (
          <div className="astralis-flex astralis-items-center astralis-gap-2 astralis-rounded-lg astralis-border astralis-border-border-subtle astralis-bg-surface-raised astralis-px-4 astralis-py-2 astralis-text-sm">
            <span className="astralis-font-medium">
              {selected.size} selected
            </span>
            <button
              onClick={() => setSelected(new Set())}
              className="astralis-ml-auto astralis-text-xs astralis-text-content-secondary hover:astralis-text-content-primary"
            >
              Clear
            </button>
          </div>
        )}
        <Table bordered>
          <Table.Header>
            <Table.Row>
              <Table.Head style={{ width: 44 }}>
                <Checkbox
                  size="sm"
                  checked={allChecked}
                  indeterminate={someChecked}
                  onChange={toggleAll}
                  aria-label="Select all"
                />
              </Table.Head>
              <Table.Head>Name</Table.Head>
              <Table.Head>Department</Table.Head>
              <Table.Head>Status</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {USERS.slice(0, 6).map((u) => {
              const isSelected = selected.has(u.id);
              return (
                <Table.Row key={u.id} selected={isSelected}>
                  <Table.Cell>
                    <Checkbox
                      size="sm"
                      checked={isSelected}
                      onChange={() => toggle(u.id)}
                      aria-label={`Select ${u.name}`}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <div className="astralis-flex astralis-items-center astralis-gap-3">
                      <Avatar name={u.name} />
                      <div className="astralis-flex astralis-flex-col">
                        <span className="astralis-font-medium">{u.name}</span>
                        <span className="astralis-text-xs astralis-text-content-secondary">
                          {u.role}
                        </span>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{u.department}</Table.Cell>
                  <Table.Cell>
                    <StatusBadge status={u.status} />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Multi-row selection using `<Checkbox>` from the library. Place checkboxes in the header and body cells, use `selected` on `<Table.Row>` to highlight selected rows. Manage state yourself.",
      },
    },
  },
};

/* ── Selection (Radio) ────────────────────────────────────────────── */

export const SelectionRadio: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string>("");
    const selectedUser = USERS.find((u) => u.id === selectedId);

    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-3">
        {selectedUser && (
          <div className="astralis-flex astralis-items-center astralis-gap-3 astralis-rounded-lg astralis-border astralis-border-border-subtle astralis-bg-surface-raised astralis-px-4 astralis-py-2 astralis-text-sm">
            <Avatar name={selectedUser.name} />
            <span>
              Selected: <strong>{selectedUser.name}</strong> —{" "}
              {selectedUser.role}
            </span>
          </div>
        )}
        <Table bordered>
          <Table.Header>
            <Table.Row>
              <Table.Head style={{ width: 44 }} />
              <Table.Head>Name</Table.Head>
              <Table.Head>Role</Table.Head>
              <Table.Head>Department</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {USERS.slice(0, 6).map((u) => {
              const isSelected = selectedId === u.id;
              return (
                <Table.Row key={u.id} selected={isSelected}>
                  <Table.Cell>
                    <Radio
                      size="sm"
                      name="table-row-radio"
                      value={u.id}
                      checked={isSelected}
                      onChange={() => setSelectedId(u.id)}
                      aria-label={`Select ${u.name}`}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <div className="astralis-flex astralis-items-center astralis-gap-3">
                      <Avatar name={u.name} />
                      <span className="astralis-font-medium">{u.name}</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{u.role}</Table.Cell>
                  <Table.Cell>{u.department}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Single-row selection using `<Radio>` from the library. Set `name` to the same string on every radio to link them. Use `selected` on `<Table.Row>` for the highlight.",
      },
    },
  },
};

/* ── Expandable Row ───────────────────────────────────────────────── */

export const ExpandableRow: Story = {
  render: () => {
    const [expanded, setExpanded] = useState<Set<string>>(new Set());

    const toggle = (id: string) =>
      setExpanded((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });

    return (
      <Table bordered>
        <Table.Header>
          <Table.Row>
            <Table.Head style={{ width: 40 }} />
            <Table.Head>Name</Table.Head>
            <Table.Head>Role</Table.Head>
            <Table.Head>Status</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {USERS.slice(0, 6).map((u) => {
            const isOpen = expanded.has(u.id);
            return (
              <Fragment key={u.id}>
                <Table.Row>
                  <Table.Cell>
                    <button
                      onClick={() => toggle(u.id)}
                      aria-expanded={isOpen}
                      aria-label={isOpen ? "Collapse row" : "Expand row"}
                      className="astralis-flex astralis-items-center astralis-justify-center astralis-w-6 astralis-h-6 astralis-rounded astralis-text-content-secondary hover:astralis-bg-surface-raised astralis-transition-colors"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          width: 14,
                          height: 14,
                          transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                          transition: "transform 0.2s ease",
                        }}
                      >
                        <polyline points="6 4 10 8 6 12" />
                      </svg>
                    </button>
                  </Table.Cell>
                  <Table.Cell className="astralis-font-medium">
                    {u.name}
                  </Table.Cell>
                  <Table.Cell>{u.role}</Table.Cell>
                  <Table.Cell>
                    <StatusBadge status={u.status} />
                  </Table.Cell>
                </Table.Row>
                {isOpen && (
                  <Table.ExpandedRow colSpan={4}>
                    <div className="astralis-grid astralis-grid-cols-3 astralis-gap-4 astralis-text-sm">
                      <div>
                        <span className="astralis-font-medium astralis-text-content-primary">
                          Email:{" "}
                        </span>
                        <span className="astralis-text-content-secondary">
                          {u.email}
                        </span>
                      </div>
                      <div>
                        <span className="astralis-font-medium astralis-text-content-primary">
                          Department:{" "}
                        </span>
                        <span className="astralis-text-content-secondary">
                          {u.department}
                        </span>
                      </div>
                      <div>
                        <span className="astralis-font-medium astralis-text-content-primary">
                          Commits (30d):{" "}
                        </span>
                        <span className="astralis-text-content-secondary astralis-font-mono">
                          {u.commits}
                        </span>
                      </div>
                    </div>
                  </Table.ExpandedRow>
                )}
              </Fragment>
            );
          })}
        </Table.Body>
      </Table>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Expandable rows using `<Table.ExpandedRow colSpan={n}>`. Manage expand state yourself and conditionally render the sub-row after each data row using `<Fragment key={...}>` to return multiple `<tr>` elements from the map.",
      },
    },
  },
};

/* ── Complex Dashboard ────────────────────────────────────────────── */

export const ComplexDashboard: Story = {
  render: () => {
    const PAGE_SIZE = 5;
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState<Set<string>>(new Set());

    const pageRows = USERS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    const pageIds = pageRows.map((u) => u.id);
    const allChecked = pageIds.every((id) => selected.has(id));
    const someChecked = !allChecked && pageIds.some((id) => selected.has(id));

    const toggleAll = () =>
      setSelected((prev) => {
        const next = new Set(prev);
        if (allChecked) pageIds.forEach((id) => next.delete(id));
        else pageIds.forEach((id) => next.add(id));
        return next;
      });

    const toggle = (id: string) =>
      setSelected((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });

    return (
      <div className="astralis-flex astralis-flex-col astralis-gap-3">
        {selected.size > 0 && (
          <div className="astralis-flex astralis-items-center astralis-gap-3 astralis-rounded-lg astralis-border astralis-border-border-subtle astralis-bg-surface-raised astralis-px-4 astralis-py-2 astralis-text-sm">
            <span className="astralis-font-medium">
              {selected.size} member{selected.size !== 1 ? "s" : ""} selected
            </span>
            <div className="astralis-ml-auto astralis-flex astralis-items-center astralis-gap-2">
              <button className="astralis-rounded astralis-bg-primary-600 astralis-px-3 astralis-py-1 astralis-text-xs astralis-font-medium astralis-text-white hover:astralis-bg-primary-700 astralis-transition-colors">
                Message
              </button>
              <button
                onClick={() => setSelected(new Set())}
                className="astralis-text-xs astralis-text-content-secondary hover:astralis-text-content-primary"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        <Table bordered size="sm">
          <Table.Header>
            <Table.Row>
              <Table.Head style={{ width: 44 }}>
                <Checkbox
                  size="sm"
                  checked={allChecked}
                  indeterminate={someChecked}
                  onChange={toggleAll}
                  aria-label="Select all"
                />
              </Table.Head>
              <Table.Head>Team Member</Table.Head>
              <Table.Head>Status</Table.Head>
              <Table.Head>Department</Table.Head>
              <Table.Head isNumeric>Commits (30d)</Table.Head>
              <Table.Head style={{ width: 80 }} />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {pageRows.map((u) => {
              const isSelected = selected.has(u.id);
              return (
                <Table.Row key={u.id} selected={isSelected}>
                  <Table.Cell>
                    <Checkbox
                      size="sm"
                      checked={isSelected}
                      onChange={() => toggle(u.id)}
                      aria-label={`Select ${u.name}`}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <div className="astralis-flex astralis-items-center astralis-gap-3">
                      <Avatar name={u.name} />
                      <div className="astralis-flex astralis-flex-col">
                        <span className="astralis-font-medium astralis-text-content-primary">
                          {u.name}
                        </span>
                        <span className="astralis-text-xs astralis-text-content-secondary">
                          {u.role}
                        </span>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <StatusBadge status={u.status} />
                  </Table.Cell>
                  <Table.Cell>{u.department}</Table.Cell>
                  <Table.Cell isNumeric className="astralis-font-mono">
                    {u.commits}
                  </Table.Cell>
                  <Table.Cell>
                    <button className="astralis-text-sm astralis-font-medium astralis-text-primary-600 hover:astralis-text-primary-700 astralis-transition-colors">
                      Edit
                    </button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.Cell
                colSpan={4}
                className="astralis-text-xs astralis-text-content-secondary"
              >
                {pageRows.length} rows shown
              </Table.Cell>
              <Table.Cell
                isNumeric
                className="astralis-font-mono astralis-font-medium"
              >
                Σ {pageRows.reduce((s, u) => s + u.commits, 0)}
              </Table.Cell>
              <Table.Cell />
            </Table.Row>
          </Table.Footer>
        </Table>

        <PaginationBar
          page={page}
          pageSize={PAGE_SIZE}
          total={USERS.length}
          onChange={(p) => {
            setSelected(new Set());
            setPage(p);
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Full compound dashboard combining checkbox selection (with indeterminate header), pagination, a footer summary row, avatar cells, and status badges — all assembled manually using the compound API.",
      },
    },
  },
};
