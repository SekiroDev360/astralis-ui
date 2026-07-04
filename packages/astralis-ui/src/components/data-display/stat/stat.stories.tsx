import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stat } from "./index";
import { Card } from "../card";
import { Box } from "../../layout/box";
import { HStack } from "../../layout/stack";

/**
 * Stat presents a single metric: `Stat.Label`, `Stat.Value`, `Stat.HelpText`,
 * and a coloured `Stat.Indicator` for trend direction.
 */
const meta: Meta<typeof Stat> = {
  title: "Components/Data Display/Stat",
  component: Stat,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Stat>;

export const Basic: Story = {
  render: () => (
    <Stat>
      <Stat.Label>Total Users</Stat.Label>
      <Stat.Value>24,521</Stat.Value>
      <Stat.HelpText>
        <Stat.Indicator type="increase">12.4%</Stat.Indicator> from last month
      </Stat.HelpText>
    </Stat>
  ),
};

/** Trend indicators colour by direction. */
export const Trends: Story = {
  render: () => (
    <HStack gap="10">
      <Stat>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Value>$48,392</Stat.Value>
        <Stat.HelpText><Stat.Indicator type="increase">5.8%</Stat.Indicator></Stat.HelpText>
      </Stat>
      <Stat>
        <Stat.Label>Churn Rate</Stat.Label>
        <Stat.Value>2.1%</Stat.Value>
        <Stat.HelpText><Stat.Indicator type="decrease">0.4%</Stat.Indicator></Stat.HelpText>
      </Stat>
    </HStack>
  ),
};

/** Stats sit naturally inside Cards for a dashboard. */
export const InCards: Story = {
  render: () => (
    <HStack gap="4">
      {[
        { label: "Total Users", value: "24,521", change: "12.4%", type: "increase" as const },
        { label: "Revenue", value: "$48,392", change: "5.8%", type: "increase" as const },
        { label: "Churn Rate", value: "2.1%", change: "0.4%", type: "decrease" as const },
      ].map((s) => (
        <Box key={s.label} style={{ width: 200 }}>
          <Card.Root>
            <Card.Body>
              <Stat>
                <Stat.Label>{s.label}</Stat.Label>
                <Stat.Value>{s.value}</Stat.Value>
                <Stat.HelpText><Stat.Indicator type={s.type}>{s.change}</Stat.Indicator> vs last month</Stat.HelpText>
              </Stat>
            </Card.Body>
          </Card.Root>
        </Box>
      ))}
    </HStack>
  ),
};
