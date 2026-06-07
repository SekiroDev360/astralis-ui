import type { Meta, StoryObj } from "@storybook/react-vite";
import { Timeline } from "./index";

const meta: Meta<typeof Timeline> = {
  title: "Components/Data Display/Timeline",
  component: Timeline,
};
export default meta;

type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  render: () => (
    <Timeline>
      <Timeline.Item>
        <Timeline.Marker />
        <Timeline.Content>
          <h4 className="astralis-font-medium">
            Project created
          </h4>
          <p className="astralis-text-sm astralis-text-gray-600">
            Jan 10, 2024
          </p>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Marker />
        <Timeline.Content>
          <h4 className="astralis-font-medium">
            First milestone
          </h4>
          <p className="astralis-text-sm astralis-text-gray-600">
            Feb 2, 2024
          </p>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Marker />
        <Timeline.Content>
          <h4 className="astralis-font-medium">
            Launch
          </h4>
          <p className="astralis-text-sm astralis-text-gray-600">
            Mar 18, 2024
          </p>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  ),
};
