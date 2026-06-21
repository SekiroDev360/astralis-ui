import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../../typography";
import { Box } from "../box";
import { Flex } from "../flex";
import { Grid } from "./index";

/**
 * Grid is a Box that lays its children out with CSS Grid. Tokenized props cover the
 * common cases — `columns`, `rows`, `gap`, `flow`, and the full alignment set
 * (`justifyItems`/`alignItems`/`placeItems`, `justifyContent`/`alignContent`/`placeContent`).
 * For arbitrary tracks/areas, the string escape hatches `templateColumns`,
 * `templateRows` and `templateAreas` apply via inline style.
 *
 * `Grid.Item` handles placement: `colSpan`/`rowSpan`, `colStart`/`colEnd`,
 * `rowStart`/`rowEnd`, `alignSelf`/`justifySelf`/`placeSelf`, and `area`.
 */
const meta: Meta<typeof Grid> = {
  title: "Components/Layout/Grid",
  component: Grid,
  tags: ["autodocs"],
  argTypes: {
    columns: { control: { type: "select" }, options: ["1", "2", "3", "4", "6", "12"] },
    gap: { control: { type: "text" } },
    flow: { control: { type: "select" }, options: ["row", "col", "dense", "col-dense"] },
  },
  parameters: {
    docs: {
      description: { component: "A CSS Grid container with tokenized tracks plus raw-template escape hatches." },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

const Cell = ({ children }: { children?: React.ReactNode }) => (
  <Flex bg="brand-500" color="white" p="4" rounded="md" alignItems="center" justifyContent="center">
    <Text color="current" size="sm">{children}</Text>
  </Flex>
);

/** A simple 3-column grid. */
export const Usage: Story = {
  render: () => (
    <Grid columns="3" gap="3" w="full">
      {Array.from({ length: 6 }).map((_, i) => (
        <Cell key={i}>{i + 1}</Cell>
      ))}
    </Grid>
  ),
};

/** `columns` sets an equal-width column count. */
export const Columns: Story = {
  render: () => (
    <Grid gap="6" w="full">
      {(["2", "3", "4", "6"] as const).map((c) => (
        <Box key={c}>
          <Text size="sm" color="muted" gutterBottom>columns="{c}"</Text>
          <Grid columns={c} gap="2">
            {Array.from({ length: Number(c) }).map((_, i) => (
              <Cell key={i}>{i + 1}</Cell>
            ))}
          </Grid>
        </Box>
      ))}
    </Grid>
  ),
};

/** `gap` (and `rowGap`/`columnGap`) space the tracks. */
export const Gap: Story = {
  render: () => (
    <Grid gap="6" w="full">
      {(["1", "3", "6"] as const).map((g) => (
        <Box key={g}>
          <Text size="sm" color="muted" gutterBottom>gap="{g}"</Text>
          <Grid columns="4" gap={g}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Cell key={i}>{i + 1}</Cell>
            ))}
          </Grid>
        </Box>
      ))}
    </Grid>
  ),
};

/** `Grid.Item` spans columns and rows. */
export const Spanning: Story = {
  render: () => (
    <Grid columns="4" gap="3" w="full">
      <Grid.Item colSpan="2"><Cell>colSpan 2</Cell></Grid.Item>
      <Cell>1</Cell>
      <Cell>1</Cell>
      <Grid.Item colSpan="4"><Cell>colSpan 4 (full row)</Cell></Grid.Item>
      <Grid.Item rowSpan="2"><Flex bg="blue-solid" color="white" h="full" p="4" rounded="md" alignItems="center" justifyContent="center"><Text color="current" size="sm">rowSpan 2</Text></Flex></Grid.Item>
      <Cell>a</Cell>
      <Cell>b</Cell>
      <Cell>c</Cell>
      <Cell>d</Cell>
      <Cell>e</Cell>
      <Cell>f</Cell>
    </Grid>
  ),
};

/** `colStart`/`colEnd` place an item explicitly on the column lines. */
export const Placement: Story = {
  render: () => (
    <Grid columns="6" gap="3" w="full">
      <Grid.Item colStart="2" colEnd="6"><Cell>colStart 2 → colEnd 6</Cell></Grid.Item>
      <Grid.Item colStart="1" colEnd="3"><Cell>1 → 3</Cell></Grid.Item>
      <Grid.Item colStart="4" colEnd="7"><Cell>4 → 7</Cell></Grid.Item>
    </Grid>
  ),
};

/** Alignment: `justifyItems`/`alignItems` (and `place*`) position content within each cell. */
export const Alignment: Story = {
  render: () => (
    <Grid gap="6" w="full">
      {(["start", "center", "end"] as const).map((p) => (
        <Box key={p}>
          <Text size="sm" color="muted" gutterBottom>placeItems="{p}"</Text>
          <Grid columns="4" gap="2" placeItems={p} h="28" bg="subtle" rounded="lg" p="2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Box key={i} bg="brand-500" color="white" px="3" py="2" rounded="md"><Text color="current" size="sm">{i + 1}</Text></Box>
            ))}
          </Grid>
        </Box>
      ))}
    </Grid>
  ),
};

/** `templateColumns` is a raw-string escape hatch for arbitrary tracks like `"200px 1fr"`. */
export const TemplateColumns: Story = {
  render: () => (
    <Grid templateColumns="200px 1fr" gap="3" w="full">
      <Flex bg="blue-solid" color="white" p="4" rounded="md" alignItems="center" justifyContent="center"><Text color="current" size="sm">200px</Text></Flex>
      <Cell>1fr (fills the rest)</Cell>
    </Grid>
  ),
};

/** `templateAreas` + `Grid.Item area` build a named layout (header / sidebar / main / footer). */
export const TemplateAreas: Story = {
  render: () => (
    <Grid
      w="full"
      gap="3"
      templateColumns="160px 1fr"
      templateAreas={`"header header" "nav main" "footer footer"`}
    >
      <Grid.Item area="header"><Box bg="brand-500" color="white" p="4" rounded="md"><Text color="current" size="sm">header</Text></Box></Grid.Item>
      <Grid.Item area="nav"><Box bg="blue-solid" color="white" p="4" rounded="md" h="full"><Text color="current" size="sm">nav</Text></Box></Grid.Item>
      <Grid.Item area="main"><Box bg="subtle" border="normal" borderColor="muted" p="4" rounded="md" h="32"><Text size="sm">main</Text></Box></Grid.Item>
      <Grid.Item area="footer"><Box bg="muted" p="4" rounded="md"><Text size="sm">footer</Text></Box></Grid.Item>
    </Grid>
  ),
};

/** `columns` can be responsive — fewer columns on small screens. */
export const Responsive: Story = {
  render: () => (
    <Box w="full">
      <Text size="sm" color="muted" gutterBottom>{`columns={{ base: "1", sm: "2", lg: "4" }}`}</Text>
      <Grid columns={{ base: "1", sm: "2", lg: "4" }} gap="3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Cell key={i}>{i + 1}</Cell>
        ))}
      </Grid>
    </Box>
  ),
};
