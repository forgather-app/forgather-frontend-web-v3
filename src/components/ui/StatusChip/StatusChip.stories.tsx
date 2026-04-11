import type { Meta, StoryObj } from "@storybook/react-vite";
import StatusChip from "./StatusChip";

const meta: Meta<typeof StatusChip> = {
  title: "UI/StatusChip",
  component: StatusChip,
  argTypes: {
    status: {
      control: { type: "radio" },
      options: ["inProgress", "ended"],
      description: "전시 진행 상태",
    },
  },
};

export default meta;

type Story = StoryObj<typeof StatusChip>;

export const InProgress: Story = {
  args: {
    status: "inProgress",
  },
};

export const Ended: Story = {
  args: {
    status: "ended",
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <StatusChip status="inProgress" />
      <StatusChip status="ended" />
    </div>
  ),
};
