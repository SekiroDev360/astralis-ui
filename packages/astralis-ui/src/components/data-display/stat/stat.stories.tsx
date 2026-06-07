import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stat } from "./index";

const meta: Meta<typeof Stat> = {
  title: "Components/Data Display/Stat",
  component: Stat,
};
export default meta;

type Story = StoryObj<typeof Stat>;

export const Default: Story = {
  render: () => (
    <Stat>
      <Stat.Label>Total Revenue</Stat.Label>
      <Stat.Value>$45,231</Stat.Value>
      <Stat.HelpText>
        <Stat.Indicator type="increase" /> 12% from last month
      </Stat.HelpText>
    </Stat>
  ),
};
