import type { Meta, StoryObj } from "@storybook/react-vite";
import StatusChip from "./StatusChip";

const meta: Meta<typeof StatusChip> = {
  title: "UI/StatusChip",
  component: StatusChip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "전시 진행 상태를 나타내는 칩 컴포넌트입니다.\n\n`inProgress`(진행중)는 보라색, `ended`(종료)는 회색으로 표시됩니다.",
      },
    },
  },
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
